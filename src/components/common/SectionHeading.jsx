import { motion } from "framer-motion";
import { fadeUp, stagger } from "../../lib/animations";

function AnimatedHeading({ text, className }) {
  const words = text.split(" ");
  return (
    <motion.h2 variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 30, rotateX: -60, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="mr-[0.25em] inline-block origin-bottom"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export default function SectionHeading({ label, title, description, align = "left", icon, iconImage, reducedMotion }) {
  const isCentered = align === "center";

  return (
    <motion.div variants={fadeUp} className={isCentered ? "text-center" : ""}>
      <p
        className={`mb-3 ${
          (icon || iconImage) ? "inline-flex items-center gap-2" : ""
        } text-[10px] font-black uppercase tracking-[0.3em] text-[#a78d67] sm:text-[11px]`}
      >
        {iconImage ? (
          <img src={iconImage} alt="" className="w-5 h-5 object-contain" />
        ) : (
          icon
        )}
        {label}
      </p>
      
      {reducedMotion ? (
        <h2 className="font-serif text-3xl leading-tight text-[#211f1a] sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      ) : (
        <AnimatedHeading text={title} className="font-serif text-3xl leading-tight text-[#211f1a] sm:text-4xl lg:text-5xl" />
      )}
      
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#655d52] sm:text-[15px]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
