import { motion } from "framer-motion";

export default function Button({
  as = "a",
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const MotionTag = motion[as];
  const styles =
    variant === "secondary"
      ? "border border-[#beb3a2] bg-white/30 text-[#1d1b17] hover:bg-white"
      : "bg-[#151412] text-white hover:bg-[#292723]";

  return (
    <MotionTag
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center gap-3 rounded-md px-6 py-3.5 text-sm font-semibold transition ${styles} ${className}`}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
