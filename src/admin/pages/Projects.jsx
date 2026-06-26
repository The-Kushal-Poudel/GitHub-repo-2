import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import ImageUpload from "../components/ImageUpload";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, AlertCircle } from "lucide-react";


const initialForm = {
  title: "",
  slug: "",
  description: "",
  role: "",
  tech_stack: "",
  features: "",
  github_link: "",
  live_link: "",
  images: [],
  status: "",
  sort_order: 0,
  is_visible: true,
};

export default function Projects() {
  const { authenticatedFetch } = useAdminAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null); // null for create, number for edit
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/projects"));
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        throw new Error("Failed to load projects.");
      }
    } catch (err) {
      console.error(err);
      setErrorText("Could not load projects from server.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setForm(initialForm);
    setErrors({});
    setCurrentId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setErrors({});
    setCurrentId(project.id);
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      description: project.description || "",
      role: project.role || "",
      tech_stack: Array.isArray(project.tech_stack)
        ? project.tech_stack.join(", ")
        : "",
      features: Array.isArray(project.features)
        ? project.features.join("\n")
        : "",
      github_link: project.github_link || "",
      live_link: project.live_link || "",
      images: Array.isArray(project.images) && project.images.length > 0 ? project.images : [],
      status: project.status || "",
      sort_order: project.sort_order || 0,
      is_visible: project.is_visible !== false,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageUpload = (url) => {
    setForm((prev) => ({ ...prev, image_url: url }));
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/projects/${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        throw new Error("Delete failed.");
      }
    } catch (err) {
      alert("Failed to delete project. " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    // Process tech_stack and features into arrays
    const formattedPayload = {
      ...form,
      tech_stack: form.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      features: form.features
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      sort_order: Number(form.sort_order),
      github_link: form.github_link.trim() || null,
      live_link: form.live_link.trim() || null,
      status: form.status.trim() || null,
    };

    const isEdit = currentId !== null;
    const url = isEdit
      ? apiUrl(`/api/admin/projects/${currentId}`)
      : apiUrl("/api/admin/projects");

    try {
      const res = await authenticatedFetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(formattedPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const formErrors = {};
          Object.keys(data.errors).forEach((key) => {
            formErrors[key] = data.errors[key][0];
          });
          setErrors(formErrors);
          throw new Error(data.message || "Validation failed.");
        }
        throw new Error(data.message || "Operation failed.");
      }

      setModalOpen(false);
      loadProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#151412]">Manage Projects</h1>
          <p className="mt-2 text-sm text-[#655d52]">Add, edit, or delete items from your featured projects grid.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#151412] px-5 text-sm font-semibold text-white transition hover:bg-[#a78d67]"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </button>
      </div>

      {errorText && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700 flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{errorText}</span>
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#a78d67] border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#e6ded0] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm text-[#5f574d]">
            <thead className="bg-[#f8f3eb] text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] border-b border-[#e6ded0]">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Visible</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6ded0]">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-[#8c806f] italic">
                    No projects found. Add your first project to get started!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#f8f3eb]/20">
                    <td className="px-6 py-4">
                      {project.images && project.images.length > 0 && project.images[0].url ? (
                        <img
                          src={project.images[0].url}
                          alt={project.images[0].alt || project.title}
                          className="h-10 w-16 rounded object-cover border border-[#e6ded0]"
                        />
                      ) : (
                        <div className="flex h-10 w-16 items-center justify-center rounded border border-[#e6ded0] bg-gray-50 text-gray-400">
                          No Pic
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#151412]">{project.title}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate">
                      {Array.isArray(project.tech_stack) ? project.tech_stack.join(" / ") : ""}
                    </td>
                    <td className="px-6 py-4 font-semibold">{project.sort_order}</td>
                    <td className="px-6 py-4">
                      {project.status ? (
                        <span className="inline-block rounded-full bg-[#f0eadf] px-2.5 py-0.5 text-xs font-semibold text-[#a78d67]">
                          {project.status}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">none</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {project.is_visible ? (
                        <Eye size={17} className="text-[#a78d67]" />
                      ) : (
                        <EyeOff size={17} className="text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit project"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-[#e6ded0] bg-white p-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex items-center justify-between border-b border-[#e6ded0] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#151412]">
                {currentId ? "Edit Project" : "New Project"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full p-1 text-[#8c806f] hover:bg-[#f0eadf]/60 hover:text-[#151412]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-700 font-medium">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    required
                    placeholder="my-project-slug"
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.slug && <p className="mt-1 text-xs text-red-700 font-medium">{errors.slug}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    placeholder="Full-stack Developer"
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.role && <p className="mt-1 text-xs text-red-700 font-medium">{errors.role}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    Launch Status / Badge
                  </label>
                  <input
                    type="text"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    placeholder="Launching Soon"
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.status && <p className="mt-1 text-xs text-red-700 font-medium">{errors.status}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full resize-none rounded-md border border-[#e9e2d7] bg-white p-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.description && <p className="mt-1 text-xs text-red-700 font-medium">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  name="tech_stack"
                  value={form.tech_stack}
                  onChange={handleChange}
                  required
                  placeholder="Laravel, React, Tailwind CSS"
                  className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.tech_stack && <p className="mt-1 text-xs text-red-700 font-medium">{errors.tech_stack}</p>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Key Features (one per line)
                </label>
                <textarea
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Role-based admin access&#10;Dynamic package management"
                  className="w-full resize-none rounded-md border border-[#e9e2d7] bg-white p-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.features && <p className="mt-1 text-xs text-red-700 font-medium">{errors.features}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    GitHub Repository Link
                  </label>
                  <input
                    type="url"
                    name="github_link"
                    value={form.github_link}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.github_link && <p className="mt-1 text-xs text-red-700 font-medium">{errors.github_link}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    Live Production Link
                  </label>
                  <input
                    type="url"
                    name="live_link"
                    value={form.live_link}
                    onChange={handleChange}
                    placeholder="https://mywebsite.com"
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.live_link && <p className="mt-1 text-xs text-red-700 font-medium">{errors.live_link}</p>}
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f]">
                    Project Images
                  </label>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, images: [...prev.images, { url: "", alt: "" }] }))}
                    className="text-xs font-semibold text-[#a78d67] hover:text-[#151412] transition-colors"
                  >
                    + Add Image
                  </button>
                </div>
                
                <div className="space-y-4 mb-5">
                  {form.images.map((img, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border border-[#e9e2d7] rounded-lg bg-[#f8f3eb]/50">
                      <div className="flex-1">
                        <ImageUpload
                          label={`Image ${index + 1}`}
                          value={img.url}
                          onUpload={(url) => {
                            const newImages = [...form.images];
                            newImages[index].url = url;
                            setForm(prev => ({ ...prev, images: newImages }));
                          }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-end">
                        <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={img.alt}
                          onChange={(e) => {
                            const newImages = [...form.images];
                            newImages[index].alt = e.target.value;
                            setForm(prev => ({ ...prev, images: newImages }));
                          }}
                          placeholder="Image description"
                          className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                        />
                      </div>
                      <div className="flex flex-col justify-end pb-1">
                         <button
                           type="button"
                           onClick={() => {
                             const newImages = form.images.filter((_, i) => i !== index);
                             setForm(prev => ({ ...prev, images: newImages }));
                           }}
                           className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                           title="Remove Image"
                         >
                           <Trash2 size={18} />
                         </button>
                      </div>
                    </div>
                  ))}
                  {form.images.length === 0 && (
                    <div className="text-sm text-[#8c806f] italic p-6 text-center border border-dashed border-[#e9e2d7] rounded-lg">
                      No images added yet. Click "+ Add Image" above.
                    </div>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                      Sorting Order
                    </label>
                    <input
                      type="number"
                      name="sort_order"
                      value={form.sort_order}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                    />
                    {errors.sort_order && <p className="mt-1 text-xs text-red-700 font-medium">{errors.sort_order}</p>}
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="is_visible"
                      name="is_visible"
                      checked={form.is_visible}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-[#e9e2d7] text-[#a78d67] focus:ring-[#a78d67]"
                    />
                    <label htmlFor="is_visible" className="text-sm font-semibold text-[#151412]">
                      Make this project visible publicly
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#e6ded0] pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-11 rounded-md border border-[#e6ded0] px-5 text-sm font-semibold text-[#5f574d] hover:bg-[#f8f3eb] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-11 items-center gap-2 rounded-md bg-[#151412] px-6 text-sm font-semibold text-white transition hover:bg-[#a78d67] disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <Save size={16} />
                  <span>{saving ? "Saving..." : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
