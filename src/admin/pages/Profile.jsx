import { useState, useEffect } from "react";
import { apiUrl } from "../../config/api.js";
import { useAdminAuth } from "../hooks/useAdminAuth";
import ImageUpload from "../components/ImageUpload";
import { AlertCircle, Save, CheckCircle } from "lucide-react";


export default function Profile() {
  const { authenticatedFetch } = useAdminAuth();
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    location: "",
    email: "",
    phone: "",
    image_url: "",
    cv_url: "",
    github_url: "",
    linkedin_url: "",
    availability: "Available for work",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(apiUrl("/api/profile"));
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || "",
            role: data.role || "",
            location: data.location || "",
            email: data.email || "",
            phone: data.phone || "",
            image_url: data.image_url || "",
            cv_url: data.cv_url || "",
            github_url: data.github_url || "",
            linkedin_url: data.linkedin_url || "",
            availability: data.availability || "Available for work",
            bio: data.bio || "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageUpload = (url) => {
    setProfile((prev) => ({ ...prev, image_url: url }));
  };

  const handleCvUpload = (url) => {
    setProfile((prev) => ({ ...prev, cv_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setErrors({});

    try {
      const res = await authenticatedFetch(apiUrl("/api/admin/profile"), {
        method: "PUT",
        body: JSON.stringify(profile),
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
        throw new Error(data.message || "Failed to update profile.");
      }

      setMessage({ type: "success", text: "Profile updated successfully!" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#a78d67] border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#151412]">Profile Settings</h1>
          <p className="mt-2 text-sm text-[#655d52]">Update your basic bio details, contacts, and CV link.</p>
        </div>
      </div>

      {message && (
        <div className={`mb-6 rounded-lg p-4 text-sm font-medium flex items-center gap-2 ${
          message.type === "success"
            ? "bg-green-50 text-green-800"
            : "bg-red-50 text-red-700"
        }`}>
          {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Main Info */}
          <div className="space-y-6 rounded-xl border border-[#e6ded0] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#151412] border-b border-[#e6ded0] pb-3">
              Personal Info
            </h2>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              />
              {errors.name && <p className="mt-1 text-xs text-red-700 font-medium">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                Professional Role
              </label>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              />
              {errors.role && <p className="mt-1 text-xs text-red-700 font-medium">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                Availability Status
              </label>
              <select
                name="availability"
                value={profile.availability}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              >
                <option value="Available for work">Available for work</option>
                <option value="Busy / Employed">Busy / Employed</option>
                <option value="Open to freelance">Open to freelance</option>
              </select>
              {errors.availability && <p className="mt-1 text-xs text-red-700 font-medium">{errors.availability}</p>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              />
              {errors.location && <p className="mt-1 text-xs text-red-700 font-medium">{errors.location}</p>}
            </div>
          </div>

          {/* Contact and Links */}
          <div className="space-y-6 rounded-xl border border-[#e6ded0] bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#151412] border-b border-[#e6ded0] pb-3">
              Contacts & Links
            </h2>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              />
              {errors.email && <p className="mt-1 text-xs text-red-700 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-700 font-medium">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                GitHub Profile URL
              </label>
              <input
                type="url"
                name="github_url"
                value={profile.github_url}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              />
              {errors.github_url && <p className="mt-1 text-xs text-red-700 font-medium">{errors.github_url}</p>}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                name="linkedin_url"
                value={profile.linkedin_url}
                onChange={handleChange}
                className="h-11 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
              />
              {errors.linkedin_url && <p className="mt-1 text-xs text-red-700 font-medium">{errors.linkedin_url}</p>}
            </div>
          </div>
        </div>

        {/* Media and Bio */}
        <div className="space-y-6 rounded-xl border border-[#e6ded0] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#151412] border-b border-[#e6ded0] pb-3">
            Media & Bio
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <ImageUpload
              label="Profile Picture"
              value={profile.image_url}
              onUpload={handleImageUpload}
              accept="image/*"
              previewType="image"
            />

            <ImageUpload
              label="CV File (PDF/Image)"
              value={profile.cv_url}
              onUpload={handleCvUpload}
              accept="application/pdf,image/*"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-[0.18em] text-[#8c806f] mb-2">
              Biography
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              required
              rows={6}
              className="w-full resize-none rounded-md border border-[#e9e2d7] bg-white p-4 text-sm outline-none transition focus:border-[#a78d67]"
            />
            {errors.bio && <p className="mt-1 text-xs text-red-700 font-medium">{errors.bio}</p>}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex h-12 items-center gap-2 rounded-md bg-[#151412] px-6 text-sm font-semibold text-white transition hover:bg-[#a78d67] disabled:cursor-not-allowed disabled:opacity-75"
          >
            <Save size={16} />
            <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
