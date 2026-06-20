import { useEffect, useState } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Save, AlertCircle, CheckCircle2 } from "lucide-react";
import ImageUpload from "../components/ImageUpload";


const textFields = [
  ["site", "Logo / footer / brand"],
  ["hero", "Hero text, buttons, floating chips"],
  ["about", "About heading, description, cards"],
  ["techStack", "Skill section heading"],
  ["projectsSection", "Projects section text"],
  ["blogsSection", "Blogs section text"],
  ["journeySection", "Experience section text"],
  ["faqSection", "FAQ section text"],
  ["reviewsSection", "Reviews section text"],
  ["contact", "Contact section text/image"],
  ["seo", "SEO title, description, Open Graph image"],
  ["theme", "Theme colors"],
];

const sectionKeys = [
  "about", "techStack", "projectsSection", "blogsSection", 
  "journeySection", "faqSection", "reviewsSection", "contact"
];

function toJson(value) {
  return JSON.stringify(value ?? {}, null, 2);
}

export default function Settings() {
  const { authenticatedFetch } = useAdminAuth();
  const [settings, setSettings] = useState({});
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await authenticatedFetch(apiUrl("/api/admin/settings"));
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load settings.");
        setSettings(data);
        const nextDrafts = {};
        textFields.forEach(([key]) => {
          nextDrafts[key] = toJson(data[key]);
        });
        setDrafts(nextDrafts);
      } catch (err) {
        setStatus({ type: "error", message: err.message || "Could not load settings." });
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  function updateDraft(key, value) {
    setDrafts((current) => ({ ...current, [key]: value }));
  }

  function handleIconUpload(key, url) {
    try {
      const currentJson = JSON.parse(drafts[key] || "{}");
      if (url) {
        currentJson.iconImage = url;
      } else {
        delete currentJson.iconImage;
      }
      updateDraft(key, toJson(currentJson));
    } catch {
      alert(`Cannot upload icon: The JSON in ${key} is currently invalid. Please fix it first.`);
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const payload = {};
      for (const [key] of textFields) {
        try {
          payload[key] = JSON.parse(drafts[key] || "{}");
        } catch {
          throw new Error(`Invalid JSON in ${key}. Please fix it before saving.`);
        }
      }

      const res = await authenticatedFetch(apiUrl("/api/admin/settings"), {
        method: "PUT",
        body: JSON.stringify({ settings: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save settings.");
      setSettings(data);
      setStatus({ type: "success", message: "Settings saved successfully." });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Could not save settings." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={saveSettings} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#a78d67]">Fully dynamic fields</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#151412]">Site Settings</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6d6358]">
            Edit every public text, button, section title, SEO value, and theme token here. These JSON blocks feed the React frontend through the Laravel API.
          </p>
        </div>
        <button disabled={saving || loading} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#151412] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#a78d67] disabled:opacity-60">
          <Save size={16} /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {status && (
        <div className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold ${status.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
          {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {status.message}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-[#e6ded0] bg-white p-8 text-center text-sm text-[#8c806f]">Loading settings...</div>
      ) : (
        <div className="grid gap-5">
          {textFields.map(([key, label]) => (
            <section key={key} className="rounded-xl border border-[#e6ded0] bg-white p-5 shadow-xl shadow-black/5">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#151412]">{label}</h2>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a78d67]">{key}</p>
                </div>
                {settings[key] && <span className="rounded-full bg-[#f8f3eb] px-3 py-1 text-xs font-bold text-[#6d6358]">Editable JSON</span>}
              </div>
              <textarea
                value={drafts[key] || "{}"}
                onChange={(event) => updateDraft(key, event.target.value)}
                className="min-h-[220px] w-full rounded-lg border border-[#e6ded0] bg-[#fbf8f2] p-4 font-mono text-xs leading-6 text-[#2a2824] outline-none focus:border-[#a78d67]"
                spellCheck="false"
              />
              {sectionKeys.includes(key) && (
                <div className="mt-4 border-t border-[#e6ded0] pt-4">
                  <ImageUpload
                    label={`${label} Icon`}
                    value={(() => {
                      try {
                        return JSON.parse(drafts[key] || "{}").iconImage || "";
                      } catch {
                        return "";
                      }
                    })()}
                    onUpload={(url) => handleIconUpload(key, url)}
                    previewType="image"
                  />
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </form>
  );
}
