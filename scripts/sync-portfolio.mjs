import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const backendBase = (process.env.PORTFOLIO_API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');
const snapshotPath = path.join(root, 'src', 'data', 'cmsSnapshot.json');
const mediaRoot = path.join(root, 'public', 'cms-media');

let copiedMedia = 0;
const copiedBySource = new Map();

function isLocalStorageUrl(value) {
  if (typeof value !== 'string' || !value) return false;
  if (value.startsWith('/storage/') || value.startsWith('storage/')) return true;

  try {
    const url = new URL(value);
    const backend = new URL(backendBase);
    const sameBackend = url.hostname === backend.hostname && url.port === backend.port;
    return sameBackend && url.pathname.startsWith('/storage/');
  } catch {
    return false;
  }
}

function storageSourceUrl(value) {
  if (value.startsWith('/storage/')) return `${backendBase}${value}`;
  if (value.startsWith('storage/')) return `${backendBase}/${value}`;
  return value;
}

function storageRelativePath(value) {
  const source = storageSourceUrl(value);
  const url = new URL(source);
  const marker = '/storage/';
  const index = url.pathname.indexOf(marker);
  if (index === -1) throw new Error(`Not a Laravel storage URL: ${value}`);

  const relative = decodeURIComponent(url.pathname.slice(index + marker.length));
  const normalized = path.posix.normalize(relative).replace(/^\.\.\/(?:\.\.\/)*|^\/+/, '');

  if (!normalized || normalized.startsWith('..')) {
    throw new Error(`Unsafe storage path returned by backend: ${value}`);
  }

  return normalized;
}

async function copyMedia(value) {
  const sourceUrl = storageSourceUrl(value);
  const relative = storageRelativePath(value);

  if (copiedBySource.has(relative)) return copiedBySource.get(relative);
  const destination = path.join(mediaRoot, ...relative.split('/'));
  const publicUrl = `/cms-media/${relative.split('/').map(encodeURIComponent).join('/')}`;

  const response = await fetch(sourceUrl, {
    headers: { Accept: '*/*' },
  });

  if (!response.ok) {
    throw new Error(`Could not copy ${sourceUrl} (${response.status} ${response.statusText})`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, bytes);

  copiedMedia += 1;
  copiedBySource.set(relative, publicUrl);
  return publicUrl;
}

async function rewriteLocalMedia(value) {
  if (Array.isArray(value)) {
    return Promise.all(value.map(rewriteLocalMedia));
  }

  if (value && typeof value === 'object') {
    const result = {};
    for (const [key, child] of Object.entries(value)) {
      result[key] = await rewriteLocalMedia(child);
    }
    return result;
  }

  if (isLocalStorageUrl(value)) {
    return copyMedia(value);
  }

  return value;
}

async function main() {
  console.log(`Syncing portfolio from ${backendBase} ...`);

  const response = await fetch(`${backendBase}/api/portfolio`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Portfolio API returned ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  // Rebuild this folder every sync so deleted/replaced screenshots also disappear
  // from the Git-tracked frontend snapshot.
  await rm(mediaRoot, { recursive: true, force: true });
  await mkdir(mediaRoot, { recursive: true });

  const snapshot = await rewriteLocalMedia(payload);

  await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

  const counts = {
    projects: Array.isArray(snapshot.projects) ? snapshot.projects.length : 0,
    blogs: Array.isArray(snapshot.blogs) ? snapshot.blogs.length : 0,
    experience: Array.isArray(snapshot.experience) ? snapshot.experience.length : 0,
    skills: Array.isArray(snapshot.skills) ? snapshot.skills.length : 0,
  };

  console.log('Portfolio snapshot updated successfully.');
  console.log(`  Projects:   ${counts.projects}`);
  console.log(`  Blogs:      ${counts.blogs}`);
  console.log(`  Experience: ${counts.experience}`);
  console.log(`  Skills:     ${counts.skills}`);
  console.log(`  Media copied: ${copiedMedia}`);
  console.log(`  Snapshot: ${path.relative(root, snapshotPath)}`);
  console.log(`  Media:    ${path.relative(root, mediaRoot)}`);
  console.log('\nNext: npm run build, then commit and push the changed snapshot/media files.');
}

main().catch((error) => {
  console.error('\nPortfolio sync failed.');
  console.error(error?.message || error);
  console.error('\nMake sure Laravel is running at http://127.0.0.1:8000, or set PORTFOLIO_API_URL.');
  process.exitCode = 1;
});
