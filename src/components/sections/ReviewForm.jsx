import { motion } from "framer-motion";
import { Send, Star } from "lucide-react";
import { fadeUp } from "../../lib/animations";
import { useReviewForm } from "../../hooks/useReviewForm";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs font-semibold text-red-400">
      {message}
    </p>
  );
}

export default function ReviewForm({ reducedMotion }) {
  const {
    errors,
    form,
    handleChange,
    handleSubmit,
    setRating,
    isSubmitting,
    status,
  } = useReviewForm();

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full p-6 sm:p-8"
      noValidate
    >
      <div className="mb-6 text-center">
        <h3 className="font-serif text-2xl text-white">Leave a Review</h3>
        <p className="mt-2 text-sm text-white/60">
          Share your experience working with me.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="review-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#b9a17a]">
            Your Name <span className="text-red-400">*</span>
          </label>
          <motion.input
            id="review-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            whileFocus={reducedMotion ? undefined : { scale: 1.01 }}
            className="h-12 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-[#b9a17a] focus:bg-white/10"
            placeholder="John Doe"
            aria-invalid={Boolean(errors.name)}
          />
          <FieldError message={errors.name} />
        </div>

        <div>
          <label htmlFor="review-role" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#b9a17a]">
            Your Role / Company
          </label>
          <motion.input
            id="review-role"
            name="role"
            value={form.role}
            onChange={handleChange}
            whileFocus={reducedMotion ? undefined : { scale: 1.01 }}
            className="h-12 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-[#b9a17a] focus:bg-white/10"
            placeholder="CEO at TechCorp (Optional)"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#b9a17a]">
          Rating <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                size={24}
                className={`transition-colors ${
                  star <= form.rating
                    ? "fill-[#d4a853] text-[#d4a853]"
                    : "text-white/20"
                }`}
              />
            </button>
          ))}
        </div>
        <FieldError message={errors.rating} />
      </div>

      <div className="mt-5">
        <label htmlFor="review-text" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#b9a17a]">
          Your Review <span className="text-red-400">*</span>
        </label>
        <motion.textarea
          id="review-text"
          name="text"
          value={form.text}
          onChange={handleChange}
          whileFocus={reducedMotion ? undefined : { scale: 1.01 }}
          className="h-28 w-full resize-none rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[#b9a17a] focus:bg-white/10"
          placeholder="How was your experience working with me?"
          aria-invalid={Boolean(errors.text)}
        />
        <FieldError message={errors.text} />
      </div>

      <div className="mt-5 rounded-lg border border-[#b9a17a]/20 bg-[#b9a17a]/5 p-4">
        <label htmlFor="social-link" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#b9a17a]">
          Social Media Link <span className="text-red-400">*</span>
        </label>
        <p className="mb-3 text-sm text-white/70">
          Please provide a link to your LinkedIn, Facebook, Instagram, Twitter, or GitHub profile to verify you are a real person.
        </p>
        <motion.input
          id="social-link"
          name="social_link"
          type="url"
          value={form.social_link}
          onChange={handleChange}
          whileFocus={reducedMotion ? undefined : { scale: 1.01 }}
          className="h-12 w-full rounded-md border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-[#b9a17a] focus:bg-white/10"
          placeholder="https://facebook.com/yourname"
          aria-invalid={Boolean(errors.social_link)}
        />
        <FieldError message={errors.social_link} />
      </div>

      {status && (
        <p
          role="status"
          className={`mt-5 rounded-md px-4 py-3 text-sm font-semibold ${
            status.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {status.message}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={reducedMotion || isSubmitting ? undefined : { y: -2, scale: 1.02 }}
        whileTap={isSubmitting ? undefined : { scale: 0.98 }}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#b9a17a] text-sm font-bold text-[#151513] transition hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
        <Send size={16} />
      </motion.button>
    </motion.form>
  );
}
