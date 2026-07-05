import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Loader2, RefreshCw, FileText, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function PortfolioColdStartLoader({
    loading,
    error = null,
    hasCachedData = false,
    onRetry,
    onContinue,
}) {
    const reduceMotion = useReducedMotion();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (loading || error) {
            setVisible(true);
        } else {
            // Add a small delay for a smoother transition when data finishes loading
            const timer = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [loading, error]);

    const handleRetry = () => {
        onRetry?.();
    };

    const handleContinue = () => {
        setVisible(false);
        onContinue?.();
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="
                        fixed inset-0 z-[9999] grid place-items-center
                        bg-[#f8f3eb]/80 p-4 backdrop-blur-xl sm:p-6
                    "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: reduceMotion ? 0.1 : 0.32,
                    }}
                    aria-live="polite"
                    aria-busy={loading}
                >
                    <motion.section
                        className="
                            w-full max-w-[420px] overflow-hidden rounded-[24px]
                            border border-[#e6ded0] bg-[#fffdf9] p-8
                            shadow-[0_38px_100px_rgba(72,59,40,.12)] text-center
                        "
                        initial={
                            reduceMotion
                                ? false
                                : { y: 16, scale: 0.985 }
                        }
                        animate={{ y: 0, scale: 1 }}
                        exit={
                            reduceMotion
                                ? undefined
                                : { y: 10, scale: 0.985 }
                        }
                    >
                        {error ? (
                            <div className="flex flex-col items-center">
                                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
                                    <AlertCircle size={28} />
                                </div>
                                <h2 className="mb-3 font-serif text-2xl font-bold tracking-tight text-[#211f1a]">
                                    Connection Error
                                </h2>
                                <p className="mb-8 text-[15px] text-[#655d52]">
                                    The portfolio server could not be reached or returned an error.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3 w-full">
                                    <button
                                        type="button"
                                        onClick={handleRetry}
                                        className="
                                            flex-1 inline-flex justify-center items-center gap-2
                                            rounded-xl bg-[#151412]
                                            px-4 py-3.5 text-sm font-semibold
                                            text-white transition
                                            hover:bg-[#a78d67]
                                        "
                                    >
                                        <RefreshCw size={16} />
                                        Retry Connection
                                    </button>
                                    {hasCachedData && (
                                        <button
                                            type="button"
                                            onClick={handleContinue}
                                            className="
                                                flex-1 inline-flex justify-center items-center gap-2
                                                rounded-xl border border-[#d8ccbb]
                                                bg-white px-4 py-3.5 text-sm
                                                font-semibold text-[#151412] transition
                                                hover:bg-gray-50
                                            "
                                        >
                                            <FileText size={16} />
                                            Use Cached Content
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-4">
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 rounded-full blur-md bg-[#a78d67]/20"></div>
                                    <Loader2 className="relative h-12 w-12 animate-spin text-[#a78d67]" />
                                </div>
                                <h2 className="mb-2 font-serif text-2xl font-bold tracking-tight text-[#211f1a]">
                                    Loading Portfolio
                                </h2>
                                <p className="text-[15px] text-[#655d52]">
                                    Retrieving the latest profile data...
                                </p>
                            </div>
                        )}
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
    );
}