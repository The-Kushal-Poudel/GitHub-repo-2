import { motion } from "framer-motion";
import { fadeUp } from "../../lib/animations";

export default function SectionHeading({ label, title, description, align = "left", icon, iconImage }) {
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
      <h2 className="font-serif text-3xl leading-tight text-[#211f1a] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#655d52] sm:text-[15px]">
          {description}
        </p>
      )}
    </motion.div>
  );
}
