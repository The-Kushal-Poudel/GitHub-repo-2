import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Branded intro screen shown until API data is ready.
 * Waits for dataReady prop to be true, with a minimum display
 * time of 1500ms so the animation always plays fully.
 * Respects reduced-motion preference — skips animation immediately.
 */
export default function IntroScreen({ name = "Kushal", reducedMotion, dataReady = false }) {
    const [visible, setVisible] = useState(true);
    const [minTimePassed, setMinTimePassed] = useState(false);

    useEffect(() => {
        if (reducedMotion) {
            setVisible(false);
            return;
        }
        const t = setTimeout(() => setMinTimePassed(true), 1500);
        return () => clearTimeout(t);
    }, [reducedMotion]);

    useEffect(() => {
        if (minTimePassed && dataReady) {
            setVisible(false);
        }
    }, [minTimePassed, dataReady]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "#201d18",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Animated background blobs matching Hero's style */}
                    <div
                        aria-hidden="true"
                        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
                    >
                        <motion.div
                            animate={{ x: [0, 60, -20, 0], y: [0, -50, 30, 0], scale: [1, 1.15, 0.95, 1] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: "absolute",
                                left: -80,
                                top: 40,
                                width: 280,
                                height: 280,
                                borderRadius: "50%",
                                background: "rgba(167,141,103,0.18)",
                                filter: "blur(60px)",
                            }}
                        />
                        <motion.div
                            animate={{ x: [0, -80, 30, 0], y: [0, 45, -35, 0], scale: [1, 0.9, 1.18, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: "absolute",
                                right: -80,
                                top: 80,
                                width: 320,
                                height: 320,
                                borderRadius: "50%",
                                background: "rgba(167,141,103,0.12)",
                                filter: "blur(60px)",
                            }}
                        />
                        {/* Rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: "absolute",
                                left: "calc(50% - 160px)",
                                top: "calc(50% - 160px)",
                                width: 320,
                                height: 320,
                                borderRadius: "50%",
                                border: "1px solid rgba(167,141,103,0.2)",
                            }}
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: "absolute",
                                left: "calc(50% - 220px)",
                                top: "calc(50% - 220px)",
                                width: 440,
                                height: 440,
                                borderRadius: "50%",
                                border: "1px dashed rgba(167,141,103,0.12)",
                            }}
                        />
                    </div>

                    {/* Logo / name */}
                    <motion.div
                        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                background: "#a78d67",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 20px",
                                fontSize: 24,
                                fontWeight: 500,
                                color: "#f8f3eb",
                                fontFamily: "serif",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {name.charAt(0)}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                fontSize: 13,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#a78d67",
                                margin: "0 0 10px",
                                fontWeight: 500,
                            }}
                        >
                            Portfolio
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                                fontWeight: 500,
                                color: "#f8f3eb",
                                margin: 0,
                                fontFamily: "serif",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.1,
                            }}
                        >
                            {name}
                        </motion.h1>
                    </motion.div>

                    {/* Bottom loading bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                        style={{
                            position: "absolute",
                            bottom: 48,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 120,
                            zIndex: 1,
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: 1,
                                background: "rgba(167,141,103,0.25)",
                                borderRadius: 1,
                                overflow: "hidden",
                            }}
                        >
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.9, duration: 1.4, ease: "easeInOut" }}
                                style={{ height: "100%", background: "#a78d67", borderRadius: 1 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}