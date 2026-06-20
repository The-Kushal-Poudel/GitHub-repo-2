import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Trash2, AlertCircle, CheckCircle, XCircle } from "lucide-react";


export default function Reviews() {
  const { authenticatedFetch } = useAdminAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/reviews"));
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      } else {
        throw new Error("Failed to load reviews.");
      }
    } catch (err) {
      console.error(err);
      setErrorText("Could not load reviews from server.");
    } finally {
      setLoading(false);
    }
  }

  const handleToggleApproval = async (review) => {
    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/reviews/${review.id}`), {
        method: "PUT",
        body: JSON.stringify({ is_approved: !review.is_approved }),
      });

      if (res.ok) {
        const updated = await res.json();
        setReviews((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        );
      } else {
        throw new Error("Failed to update approval status.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) return;

    try {
      const res = await authenticatedFetch(apiUrl(`/api/admin/reviews/${id}`), {
        method: "DELETE",
      });

      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        throw new Error("Delete failed.");
      }
    } catch (err) {
      alert("Failed to delete review. " + err.message);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#151412]">Manage Reviews</h1>
          <p className="mt-2 text-sm text-[#655d52]">View, approve, and delete submitted reviews.</p>
        </div>
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
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review</th>
                <th className="px-6 py-4">Social Link</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6ded0]">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[#8c806f] italic">
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-[#f8f3eb]/20">
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#151412]">{review.name}</p>
                      {review.role && <p className="text-xs text-[#8c806f]">{review.role}</p>}
                    </td>
                    <td className="px-6 py-4 font-semibold">{review.rating} / 5</td>
                    <td className="px-6 py-4 max-w-xs truncate" title={review.text}>
                      {review.text}
                    </td>
                    <td className="px-6 py-4">
                      {review.social_link ? (
                        <a
                          href={review.social_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Link
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {review.is_approved ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                          <CheckCircle size={12} /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">
                          <AlertCircle size={12} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleApproval(review)}
                          className={`rounded p-1.5 transition-colors ${
                            review.is_approved
                              ? "text-yellow-600 hover:bg-yellow-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                          title={review.is_approved ? "Revoke Approval" : "Approve Review"}
                        >
                          {review.is_approved ? <XCircle size={16} /> : <CheckCircle size={16} />}
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="rounded p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete review"
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
    </div>
  );
}
