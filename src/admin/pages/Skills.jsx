import { useEffect, useState } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Plus, Edit2, Trash2, Save, X, AlertCircle } from "lucide-react";


const initialForm = {
  label: "",
  icon: "",
  sort_order: 0,
};

export default function Skills() {
  const { authenticatedFetch } = useAdminAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    setLoading(true);
    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/skills"));
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load skills.");
      setSkills(data);
    } catch (err) {
      setErrorText(err.message || "Could not load skills.");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setCurrentId(null);
    setForm({ ...initialForm, sort_order: skills.length + 1 });
    setErrors({});
    setModalOpen(true);
  }

  function openEdit(skill) {
    setCurrentId(skill.id);
    setForm({
      label: skill.label || "",
      icon: skill.icon || "",
      sort_order: skill.sort_order || 0,
    });
    setErrors({});
    setModalOpen(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "sort_order" ? Number(value) : value,
    }));
  }

  async function saveSkill(event) {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setErrorText("");

    try {
      const url = currentId
        ? apiUrl(`/api/admin/skills/${currentId}`)
        : apiUrl("/api/admin/skills");
      const method = currentId ? "PUT" : "POST";
      const res = await authenticatedFetch(url, {
        method,
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || "Failed to save skill.");
      }
      setModalOpen(false);
      await loadSkills();
    } catch (err) {
      setErrorText(err.message || "Could not save skill.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteSkill(id) {
    if (!confirm("Delete this skill?")) return;
    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/skills/${id}`), {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete skill.");
      await loadSkills();
    } catch (err) {
      setErrorText(err.message || "Could not delete skill.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#a78d67]">Dynamic content</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#151412]">Skills</h1>
          <p className="mt-2 text-sm text-[#6d6358]">Manage the skills shown in the scrolling tech stack section.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#151412] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#a78d67]"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {errorText && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          <AlertCircle size={16} /> {errorText}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-[#e6ded0] bg-white shadow-xl shadow-black/5">
        <table className="min-w-full divide-y divide-[#eee6da] text-sm">
          <thead className="bg-[#f8f3eb] text-left text-xs uppercase tracking-[0.18em] text-[#8c806f]">
            <tr>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4">Label</th>
              <th className="px-5 py-4">Icon</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0e8dc]">
            {loading ? (
              <tr><td colSpan="4" className="px-5 py-8 text-center text-[#8c806f]">Loading skills...</td></tr>
            ) : skills.length === 0 ? (
              <tr><td colSpan="4" className="px-5 py-8 text-center text-[#8c806f]">No skills found.</td></tr>
            ) : skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-[#fbf7f0]">
                <td className="px-5 py-4 font-bold text-[#151412]">{skill.sort_order}</td>
                <td className="px-5 py-4 font-semibold text-[#151412]">{skill.label}</td>
                <td className="px-5 py-4 text-[#6d6358]">{skill.icon || "—"}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(skill)} className="rounded-md border border-[#e6ded0] p-2 text-[#151412] hover:bg-[#f8f3eb]" aria-label="Edit skill">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => deleteSkill(skill.id)} className="rounded-md border border-red-200 p-2 text-red-700 hover:bg-red-50" aria-label="Delete skill">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4">
          <form onSubmit={saveSkill} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-[#151412]">{currentId ? "Edit Skill" : "Add Skill"}</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-md p-2 text-[#6d6358] hover:bg-[#f8f3eb]">
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f]">Skill Label</label>
                <input name="label" value={form.label} onChange={handleChange} className="h-11 w-full rounded-lg border border-[#e6ded0] px-4 text-sm outline-none focus:border-[#a78d67]" placeholder="React" />
                {errors.label && <p className="mt-1 text-xs text-red-700">{errors.label[0]}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f]">Icon Name</label>
                <input name="icon" value={form.icon} onChange={handleChange} className="h-11 w-full rounded-lg border border-[#e6ded0] px-4 text-sm outline-none focus:border-[#a78d67]" placeholder="Code" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f]">Sort Order</label>
                <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} className="h-11 w-full rounded-lg border border-[#e6ded0] px-4 text-sm outline-none focus:border-[#a78d67]" />
              </div>
            </div>

            <button disabled={saving} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#151412] text-sm font-bold text-white transition hover:bg-[#a78d67] disabled:opacity-60">
              <Save size={16} /> {saving ? "Saving..." : "Save Skill"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
