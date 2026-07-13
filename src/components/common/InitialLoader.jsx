import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function InitialLoader({ loading }) {
    const reduceMotion = useReducedMotion();

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[9999] grid place-items-center bg-[#f8f3eb]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full blur-lg bg-[#a78d67]/30 scale-150"></div>
                            <motion.div 
                                className="relative h-10 w-10 rounded-full border-[3px] border-[#e6ded0] border-t-[#a78d67]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
