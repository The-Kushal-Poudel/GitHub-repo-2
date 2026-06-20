import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { fadeUp, stagger } from "../../lib/animations";

export default function FAQ({ faqSection, reducedMotion }) {
  const [openId, setOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const displayItems = showAll ? faqSection.items : faqSection.items.slice(0, 6);

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-y border-[#e6ded0] bg-[#f8f3eb] py-12 lg:py-14"
    >
      {/* Subtle radial dot background */}
      <div
        className="absolute inset-0 opacity-[0.25] [background-image:radial-gradient(#c9b99a_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden="true"
      />

      {/* Decorative floating ring */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { rotate: -360 }
        }
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 top-14 h-44 w-44 rounded-full border border-dashed border-[#d6c7ad] opacity-50"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="mb-10 text-center"
        >
          <SectionHeading
            label={faqSection.label}
            title={faqSection.title}
            description={faqSection.description}
            align="center"
            icon={<HelpCircle size={15} aria-hidden="true" />}
            iconImage={faqSection.iconImage}
          />
        </motion.div>

        <motion.div
          variants={stagger}
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
            <AnimatePresence initial={false}>
              {displayItems.length === 0 ? (
                <motion.div variants={fadeUp} className="col-span-1 md:col-span-2 py-8 text-center">
                  <p className="text-sm font-semibold text-[#8c806f] italic">Be the first to ask a question!</p>
                </motion.div>
              ) : (
              displayItems.map((item) => {
                const isOpen = openId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    className={`group rounded-2xl border transition-all duration-300 ${isOpen
                      ? "border-[#a78d67]/40 bg-white shadow-lg shadow-black/5"
                      : "border-[#e6ded0] bg-white/55 shadow-sm hover:bg-white hover:shadow-md hover:shadow-black/5"
                      }`}
                  >
                    <button
                      onClick={() => toggle(item.id)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="text-[15px] font-bold leading-snug text-[#211f1a] sm:text-base">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0eadf] text-[#1c1a17] transition-colors group-hover:bg-[#1c1a17] group-hover:text-white"
                      >
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.25, delay: 0.05 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                            <div className="mb-3 h-px w-12 bg-[#a78d67]/30" />
                            <p className="text-sm leading-7 text-[#655d52]">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
            </AnimatePresence>
          </div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
            {faqSection.items.length > 6 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="rounded-full border border-[#a78d67] bg-transparent px-8 py-3 text-sm font-bold text-[#a78d67] transition hover:bg-[#a78d67] hover:text-white"
              >
                {showAll ? "Show Less" : "View More FAQs"}
              </button>
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};  
