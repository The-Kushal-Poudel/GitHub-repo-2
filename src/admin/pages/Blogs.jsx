import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Plus, Edit2, Trash2, Check, X, Save, AlertCircle, Calendar } from "lucide-react";


const initialForm = {
  title: "",
  category: "",
  description: "",
  content: "",
  link: "",
  published_at: "",
  is_published: false,
  sort_order: 0,
};

export default function Blogs() {
  const { authenticatedFetch } = useAdminAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    setLoading(true);
    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/blogs"));
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        throw new Error("Failed to load blogs.");
      }
    } catch (err) {
      console.error(err);
      setErrorText("Could not load blogs from server.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setForm({
      ...initialForm,
      published_at: new Date().toISOString().split("T")[0],
    });
    setErrors({});
    setCurrentId(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setErrors({});
    setCurrentId(blog.id);
    setForm({
      title: blog.title || "",
      category: blog.category || "",
      description: blog.description || "",
      content: blog.content || "",
      link: blog.link || "",
      published_at: blog.published_at
        ? new Date(blog.published_at).toISOString().split("T")[0]
        : "",
      is_published: blog.is_published === true,
      sort_order: blog.sort_order || 0,
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

  const handleTogglePublish = async (blog) => {
    const nextPublishedState = !blog.is_published;
    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/blogs/${blog.id}`), {
        method: "PUT",
        body: JSON.stringify({
          title: blog.title,
          category: blog.category,
          description: blog.description,
          content: blog.content,
          link: blog.link,
          published_at: blog.published_at
            ? new Date(blog.published_at).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          is_published: nextPublishedState,
          sort_order: blog.sort_order,
        }),
      });

      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? { ...b, is_published: nextPublishedState } : b))
        );
      } else {
        throw new Error("Failed to toggle publish state.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) return;

    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/blogs/${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        throw new Error("Delete failed.");
      }
    } catch (err) {
      alert("Failed to delete blog. " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const formattedPayload = {
      ...form,
      sort_order: Number(form.sort_order),
      link: form.link.trim() || null,
      published_at: form.published_at ? form.published_at : null,
    };

    const isEdit = currentId !== null;
    const url = isEdit
      ? apiUrl(`/api/admin/blogs/${currentId}`)
      : apiUrl("/api/admin/blogs");

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
      loadBlogs();
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
          <h1 className="font-serif text-3xl font-bold text-[#151412]">Manage Blogs</h1>
          <p className="mt-2 text-sm text-[#655d52]">Add, draft, edit, or publish articles on your writing feed.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#151412] px-5 text-sm font-semibold text-white transition hover:bg-[#a78d67]"
        >
          <Plus size={16} />
          <span>Add Blog</span>
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
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Published Date</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6ded0]">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[#8c806f] italic">
                    No blogs found. Add your first post to get started!
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-[#f8f3eb]/20">
                    <td className="px-6 py-4 font-bold text-[#151412]">{blog.title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-[#f0eadf] px-2.5 py-0.5 text-xs font-semibold text-[#a78d67]">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {blog.published_at ? (
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#a78d67]" />
                          <span>{new Date(blog.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-xs">none</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold">{blog.sort_order}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition ${
                          blog.is_published
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {blog.is_published ? (
                          <>
                            <Check size={12} /> Published
                          </>
                        ) : (
                          <>
                            <X size={12} /> Draft
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(blog)}
                          className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit blog"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete blog"
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
          <div className="my-8 w-full max-w-3xl rounded-2xl border border-[#e6ded0] bg-white p-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="mb-6 flex items-center justify-between border-b border-[#e6ded0] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#151412]">
                {currentId ? "Edit Blog Post" : "Write Blog Post"}
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
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    placeholder="React, Laravel, Core Java"
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.category && <p className="mt-1 text-xs text-red-700 font-medium">{errors.category}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    External Article URL (optional)
                  </label>
                  <input
                    type="url"
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    placeholder="https://medium.com/..."
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.link && <p className="mt-1 text-xs text-red-700 font-medium">{errors.link}</p>}
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

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    name="published_at"
                    value={form.published_at}
                    onChange={handleChange}
                    className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                  />
                  {errors.published_at && <p className="mt-1 text-xs text-red-700 font-medium">{errors.published_at}</p>}
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={form.is_published}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-[#e9e2d7] text-[#a78d67] focus:ring-[#a78d67]"
                  />
                  <label htmlFor="is_published" className="text-sm font-semibold text-[#151412]">
                    Publish immediately (is_published)
                  </label>
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
                  rows={2}
                  className="w-full resize-none rounded-md border border-[#e9e2d7] bg-white p-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.description && <p className="mt-1 text-xs text-red-700 font-medium">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                  Blog Content (Markdown)
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={10}
                  placeholder="# My blog post title..."
                  className="w-full font-mono rounded-md border border-[#e9e2d7] bg-white p-4 text-sm outline-none transition focus:border-[#a78d67]"
                />
                {errors.content && <p className="mt-1 text-xs text-red-700 font-medium">{errors.content}</p>}
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
                  <span>{saving ? "Saving..." : "Save Blog"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
