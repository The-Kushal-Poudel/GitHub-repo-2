import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, StarHalf, Quote } from "lucide-react";
import Container from "../common/Container";
import { fadeUp, popIn, stagger } from "../../lib/animations";
import ReviewForm from "./ReviewForm";

function StarRating({ rating, reducedMotion }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <motion.span
          key={`full-${i}`}
          initial={reducedMotion ? false : { scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Star size={16} className="fill-[#d4a853] text-[#d4a853]" />
        </motion.span>
      ))}
      {hasHalf && (
        <motion.span
          initial={reducedMotion ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: fullStars * 0.06, duration: 0.4, type: "spring" }}
        >
          <StarHalf size={16} className="fill-[#d4a853] text-[#d4a853]" />
        </motion.span>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-[#d6cfc0]" />
      ))}
    </div>
  );
}

function AverageRatingBadge({ reviews, reducedMotion }) {
  if (!reviews || reviews.length === 0) return null;

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <motion.div
      variants={fadeUp}
      className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6"
    >
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-5xl font-bold text-[#211f1a]">
          {avg.toFixed(1)}
        </span>
        <span className="text-sm font-semibold text-[#8c806f]">/ 5</span>
      </div>

      <div className="flex flex-col items-center gap-1 sm:items-start">
        <StarRating rating={avg} reducedMotion={reducedMotion} />
        <span className="text-xs font-semibold text-[#8c806f]">
          Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </span>
      </div>
    </motion.div>
  );
}

export default function Reviews({ reviewsSection, reducedMotion }) {
  const [showAll, setShowAll] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const displayItems = showAll ? reviewsSection.items : reviewsSection.items.slice(0, 3);
  
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showForm]);
  
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#151513] py-12 text-white lg:py-14"
    >
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]"
        aria-hidden="true"
      />

      {/* Glow accent */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, 1.15, 1], opacity: [0.06, 0.15, 0.06] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 bottom-10 h-72 w-72 rounded-full bg-[#b9a17a] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className={`mb-3 ${reviewsSection.iconImage ? "inline-flex items-center justify-center gap-2 w-full" : ""} text-[10px] font-black uppercase tracking-[0.3em] text-[#b9a17a] sm:text-[11px]`}
          >
            {reviewsSection.iconImage && (
              <img src={reviewsSection.iconImage} alt="" className="w-5 h-5 object-contain" />
            )}
            {reviewsSection.label}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mb-4 font-serif text-3xl sm:text-4xl lg:text-5xl"
          >
            {reviewsSection.title}
          </motion.h2>
          {reviewsSection.description && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-[15px]"
            >
              {reviewsSection.description}
            </motion.p>
          )}

          <AverageRatingBadge
            reviews={reviewsSection.items}
            reducedMotion={reducedMotion}
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          <AnimatePresence initial={false}>
            {displayItems.length === 0 ? (
              <motion.div variants={fadeUp} className="col-span-full py-12 text-center">
                <p className="text-lg font-medium text-white/60 italic">Be the first to add a review!</p>
              </motion.div>
            ) : (
            displayItems.map((review) => (
            <motion.div
              key={review.id}
              variants={popIn}
              whileHover={
                reducedMotion
                  ? undefined
                  : { y: -12, scale: 1.025, transition: { type: "spring", stiffness: 220, damping: 16 } }
              }
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-sm backdrop-blur-sm transition hover:border-white/20 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-black/20 sm:p-6"
            >
              {/* Quote icon */}
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-[#b9a17a]/15 text-[#b9a17a] transition group-hover:bg-[#b9a17a] group-hover:text-[#151513]">
                <Quote size={18} />
              </div>

              {/* Stars */}
              <div className="mb-4">
                <StarRating rating={review.rating} reducedMotion={reducedMotion} />
              </div>

              {/* Review text */}
              <p className="mb-5 min-h-[72px] text-sm leading-7 text-white/70 italic">
                "{review.text}"
              </p>

              {/* Divider */}
              <div className="mb-4 h-px w-full bg-white/10" />

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#b9a17a] to-[#8b7455] text-sm font-bold text-[#151513]">
                  {review.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{review.name}</p>
                  {review.role && (
                    <p className="text-xs text-white/45">{review.role}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
          )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {reviewsSection.items.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-full border border-[#b9a17a] bg-transparent px-8 py-3 text-sm font-bold text-[#b9a17a] transition hover:bg-[#b9a17a] hover:text-[#151513]"
            >
              {showAll ? "Show Less" : "View More Reviews"}
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full bg-[#b9a17a] px-8 py-3 text-sm font-bold text-[#151513] transition hover:bg-white hover:shadow-lg hover:shadow-white/10"
          >
            {showForm ? "Cancel Review" : "Leave a Review"}
          </button>
        </motion.div>

        {/* The Review Form Popup Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1a1a18] shadow-2xl"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                  aria-label="Close modal"
                >
                  &times;
                </button>
                <ReviewForm reducedMotion={reducedMotion} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
