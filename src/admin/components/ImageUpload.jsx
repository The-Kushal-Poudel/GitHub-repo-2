import { useState, useRef, useId } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { Upload, X } from "lucide-react";


export default function ImageUpload({ value, onUpload, label = "Upload File", accept = "image/*,application/pdf", previewType = "auto" }) {
  const { authenticatedFetch } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const inputId = useId();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isAllowedFile = file.type.startsWith("image/") || file.type === "application/pdf";
    if (!isAllowedFile) {
      setError("Please select an image or PDF file.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await authenticatedFetch(apiUrl("/api/admin/upload"), {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload image.");
      }

      onUpload(data.url);
    } catch (err) {
      setError(err.message || "Something went wrong uploading the image.");
    } finally {
      setLoading(false);
      // Reset the file input so the same file can be re-selected
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    onUpload("");
  };

  const handleDropzoneClick = () => {
    // Fallback: programmatically trigger file input if label-input association fails
    if (!loading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <span className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
        {label}
      </span>

      {error && (
        <div className="mb-3 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {value ? (
        <div className="relative mt-2 flex max-w-[280px] items-center gap-4 rounded-lg border border-[#e6ded0] bg-white p-3 shadow-sm">
          {(previewType === "image" || (previewType === "auto" && !value.toLowerCase().endsWith(".pdf"))) ? (
            <img
              src={value}
              alt="Uploaded preview"
              className="h-16 w-24 rounded object-cover"
            />
          ) : (
            <div className="grid h-16 w-24 place-items-center rounded bg-[#f8f3eb] text-xs font-black text-[#a78d67]">PDF</div>
          )}
          <div className="flex-1 min-w-0">
            <p className="truncate text-xs font-medium text-[#5f574d]">{value}</p>
          </div>
          <button
            onClick={handleClear}
            className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700 shadow-md transition-colors"
            title="Remove image"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={handleDropzoneClick}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleDropzoneClick(); }}
          className="flex h-36 w-full max-w-[380px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e6ded0] bg-white hover:bg-[#f0eadf]/40 transition-colors"
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#a78d67] border-t-transparent" />
              <span className="text-xs text-[#8c806f]">Uploading image...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <Upload className="mb-3 h-8 w-8 text-[#a78d67]" />
              <p className="mb-1 text-sm text-[#5f574d]">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[#8c806f]">PNG, JPG, GIF, WEBP, SVG or PDF (MAX. 5MB)</p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input — always rendered so ref is always available */}
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={loading}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
