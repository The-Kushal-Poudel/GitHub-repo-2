import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Save, AlertCircle } from "lucide-react";


const initialForm = {
  question: "",
  answer: "",
  sort_order: 0,
  is_active: true,
};

export default function Faqs() {
  const { authenticatedFetch } = useAdminAuth();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    loadFaqs();
  }, []);

  async function loadFaqs() {
    setLoading(true);
    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/faqs"));
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      } else {
        throw new Error("Failed to load FAQs.");
      }
    } catch (err) {
      console.error(err);
      setErrorText("Could not load FAQs from server.");
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

  const handleOpenEdit = (faq) => {
    setErrors({});
    setCurrentId(faq.id);
    setForm({
      question: faq.question || "",
      answer: faq.answer || "",
      sort_order: faq.sort_order || 0,
      is_active: faq.is_active !== false,
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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ? This action cannot be undone.")) return;

    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/faqs/${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      } else {
        throw new Error("Delete failed.");
      }
    } catch (err) {
      alert("Failed to delete FAQ. " + err.message);
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
      ? apiUrl(`/api/admin/faqs/${currentId}`)
      : apiUrl("/api/admin/faqs");

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
      loadFaqs();
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
          <h1 className="font-serif text-3xl font-bold text-[#151412]">Manage FAQs</h1>
          <p className="mt-2 text-sm text-[#655d52]">Add, edit, or delete items from your Frequently Asked Questions section.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#151412] px-5 text-sm font-semibold text-white transition hover:bg-[#a78d67]"
        >
          <Plus size={16} />
          <span>Add FAQ</span>
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
                <th className="px-6 py-4">Question</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6ded0]">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-[#8c806f] italic">
                    No FAQs found. Add your first FAQ to get started!
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-[#f8f3eb]/20">
                    <td className="px-6 py-4 font-bold text-[#151412] max-w-[300px] truncate">{faq.question}</td>
                    <td className="px-6 py-4 font-semibold">{faq.sort_order}</td>
                    <td className="px-6 py-4">
                      {faq.is_active ? (
                        <Eye size={17} className="text-[#a78d67]" />
                      ) : (
                        <EyeOff size={17} className="text-gray-400" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(faq)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit FAQ"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete FAQ"
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
          <div className="my-8 w-full max-w-xl rounded-2xl border border-[#e6ded0] bg-white p-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex items-center justify-between border-b border-[#e6ded0] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#151412]">
                {currentId ? "Edit FAQ" : "New FAQ"}
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
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  required
                  className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.question && <p className="mt-1 text-xs text-red-700 font-medium">{errors.question}</p>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Answer
                </label>
                <textarea
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-md border border-[#e9e2d7] bg-white p-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.answer && <p className="mt-1 text-xs text-red-700 font-medium">{errors.answer}</p>}
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

                <div className="flex flex-col justify-end pb-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="is_active"
                      name="is_active"
                      checked={form.is_active}
                      onChange={handleChange}
                      className="h-5 w-5 rounded border-[#e9e2d7] text-[#a78d67] focus:ring-[#a78d67]"
                    />
                    <label htmlFor="is_active" className="text-sm font-semibold text-[#151412]">
                      Make this FAQ active
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
                  <span>{saving ? "Saving..." : "Save FAQ"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
