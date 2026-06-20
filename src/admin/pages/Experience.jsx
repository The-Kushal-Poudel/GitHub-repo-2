import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Plus, Edit2, Trash2, X, Save, AlertCircle, Briefcase, GraduationCap, Laptop } from "lucide-react";


const initialForm = {
  title: "",
  company: "",
  year_label: "",
  icon: "Briefcase",
  description: "",
  sort_order: 0,
};

const iconOptions = [
  { label: "Briefcase (Job)", value: "Briefcase", component: Briefcase },
  { label: "Graduation Cap (Education)", value: "GraduationCap", component: GraduationCap },
  { label: "Laptop (Projects / Freelance)", value: "Laptop", component: Laptop },
];

export default function Experience() {
  const { authenticatedFetch } = useAdminAuth();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    loadExperiences();
  }, []);

  async function loadExperiences() {
    setLoading(true);
    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/experience"));
      if (res.ok) {
        const data = await res.json();
        setExperiences(data);
      } else {
        throw new Error("Failed to load experiences.");
      }
    } catch (err) {
      console.error(err);
      setErrorText("Could not load experiences from server.");
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

  const handleOpenEdit = (exp) => {
    setErrors({});
    setCurrentId(exp.id);
    setForm({
      title: exp.title || "",
      company: exp.company || "",
      year_label: exp.year_label || "",
      icon: exp.icon || "Briefcase",
      description: exp.description || "",
      sort_order: exp.sort_order || 0,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this experience? This action cannot be undone.")) return;

    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/experience/${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        setExperiences((prev) => prev.filter((exp) => exp.id !== id));
      } else {
        throw new Error("Delete failed.");
      }
    } catch (err) {
      alert("Failed to delete experience. " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const formattedPayload = {
      ...form,
      sort_order: Number(form.sort_order),
    };

    const isEdit = currentId !== null;
    const url = isEdit
      ? apiUrl(`/api/admin/experience/${currentId}`)
      : apiUrl("/api/admin/experience");

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
      loadExperiences();
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
          <h1 className="font-serif text-3xl font-bold text-[#151412]">Manage Experience</h1>
          <p className="mt-2 text-sm text-[#655d52]">Add, edit, or delete items from your educational and professional timeline.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#151412] px-5 text-sm font-semibold text-white transition hover:bg-[#a78d67]"
        >
          <Plus size={16} />
          <span>Add Experience</span>
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
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Title / Role</th>
                <th className="px-6 py-4">Institution / Company</th>
                <th className="px-6 py-4">Timeline</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6ded0]">
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[#8c806f] italic">
                    No experience records found. Add your first timeline item to get started!
                  </td>
                </tr>
              ) : (
                experiences.map((exp) => {
                  const matchingIconOpt = iconOptions.find((opt) => opt.value === exp.icon);
                  const Icon = matchingIconOpt ? matchingIconOpt.component : Briefcase;

                  return (
                    <tr key={exp.id} className="hover:bg-[#f8f3eb]/20">
                      <td className="px-6 py-4">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#f0eadf] text-[#a78d67]">
                          <Icon size={15} />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#151412]">{exp.title}</td>
                      <td className="px-6 py-4">{exp.company}</td>
                      <td className="px-6 py-4">{exp.year_label}</td>
                      <td className="px-6 py-4 font-semibold">{exp.sort_order}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(exp)}
                            className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit experience"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(exp.id)}
                            className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete experience"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit/Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-xl rounded-2xl border border-[#e6ded0] bg-white p-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex items-center justify-between border-b border-[#e6ded0] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#151412]">
                {currentId ? "Edit Experience" : "Add Experience"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full p-1 text-[#8c806f] hover:bg-[#f0eadf]/60 hover:text-[#151412]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Title / Role
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Backend Java Developer Intern"
                  className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.title && <p className="mt-1 text-xs text-red-700 font-medium">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  placeholder="FoneNxt"
                  className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.company && <p className="mt-1 text-xs text-red-700 font-medium">{errors.company}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    Timeline (Year Label)
                  </label>
                  <input
                    type="text"
                    name="year_label"
                    value={form.year_label}
                    onChange={handleChange}
                    required
                    placeholder="January 7, 2024 - April 4, 2024"
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.year_label && <p className="mt-1 text-xs text-red-700 font-medium">{errors.year_label}</p>}
                </div>

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
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Timeline Node Icon
                </label>
                <select
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  required
                  className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.icon && <p className="mt-1 text-xs text-red-700 font-medium">{errors.icon}</p>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Description / Bullet Points
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Summarize your key responsibilities, learnings, or course highlights."
                  className="w-full resize-none rounded-md border border-[#e9e2d7] bg-white p-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.description && <p className="mt-1 text-xs text-red-700 font-medium">{errors.description}</p>}
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
                  <span>{saving ? "Saving..." : "Save Experience"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
