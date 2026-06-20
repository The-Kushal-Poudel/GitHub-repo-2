import { motion } from "framer-motion";

export default function SocialButton({ children, href, label }) {
  const isExternal = href?.startsWith("http");

  return (
    <motion.a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      whileHover={{ y: -7, scale: 1.08, rotate: 4 }}
      whileTap={{ scale: 0.92 }}
      className="grid h-10 w-10 place-items-center rounded-full border border-[#e6ded0] bg-white text-[#151412] shadow-sm transition hover:border-[#b59a71] hover:text-[#b59a71]"
    >
      {children}
    </motion.a>
  );
}
