import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import angelImg from "../../assets/angel.jpg";
import devilImg from "../../assets/devil.jpg";

const MESSAGES = [
    "Awakening spirits...",
    "Balancing light and dark...",
    "Summoning creativity...",
    "Preparing your portfolio...",
    "Almost ready..."
];

/**
 * Next-Level Intro Screen
 * Features a playful clash between Angel and Devil characters.
 */
export default function IntroScreen({ name = "Kushal", reducedMotion, dataReady = false }) {
    const [visible, setVisible] = useState(true);
    const [minTimePassed, setMinTimePassed] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isClashing, setIsClashing] = useState(false);

    // Minimum display time
    useEffect(() => {
        const t = setTimeout(() => setMinTimePassed(true), 2000);
        return () => clearTimeout(t);
    }, []);

    // Cycle messages
    useEffect(() => {
        if (isClashing || !visible) return;
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 600);
        return () => clearInterval(interval);
    }, [isClashing, visible]);

    // Handle clash sequence when data is ready
    useEffect(() => {
        if (minTimePassed && dataReady && !isClashing) {
            setIsClashing(true);
        }
    }, [minTimePassed, dataReady, isClashing]);

    // Handle visibility after clash
    useEffect(() => {
        if (isClashing) {
            // Wait for clash animation to finish before hiding the screen
            const t = setTimeout(() => {
                setVisible(false);
            }, 800); // Clash duration
            
            return () => clearTimeout(t);
        }
    }, [isClashing]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        background: "#0d0c0a", // Darker background for contrast
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {/* Background glows */}
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                        <motion.div
                            animate={{ opacity: isClashing ? 0 : 0.5, scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{
                                position: "absolute",
                                left: "20%",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                height: 400,
                                borderRadius: "50%",
                                background: "rgba(255, 255, 255, 0.1)",
                                filter: "blur(80px)",
                            }}
                        />
                        <motion.div
                            animate={{ opacity: isClashing ? 0 : 0.5, scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                            style={{
                                position: "absolute",
                                right: "20%",
                                top: "50%",
                                transform: "translate(50%, -50%)",
                                width: 400,
                                height: 400,
                                borderRadius: "50%",
                                background: "rgba(255, 0, 0, 0.1)",
                                filter: "blur(80px)",
                            }}
                        />
                    </div>

                    {/* Characters Container */}
                    <div style={{ position: "relative", width: "100%", maxWidth: 600, height: 300, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        
                        {/* Angel (Left) */}
                        <motion.div
                            initial={{ x: -200, opacity: 0 }}
                            animate={isClashing ? { x: 200, scale: 1.2, rotate: 15 } : { x: 0, opacity: 1, y: [0, -15, 0] }}
                            transition={isClashing 
                                ? { duration: 0.4, ease: "easeIn" } 
                                : { x: { duration: 0.8, ease: "easeOut" }, opacity: { duration: 0.8 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }
                            }
                            style={{ zIndex: 2 }}
                        >
                            <img 
                                src={angelImg} 
                                alt="Angel" 
                                style={{ width: 150, height: "auto", objectFit: "contain", dropShadow: "0 0 20px rgba(255,255,255,0.5)" }} 
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div style="width:120px;height:120px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#000;font-weight:bold;">Angel</div>';
                                }}
                            />
                        </motion.div>

                        {/* Flash on Clash */}
                        <AnimatePresence>
                            {isClashing && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 20, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                                    style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: "50%",
                                        width: 100,
                                        height: 100,
                                        marginLeft: -50,
                                        marginTop: -50,
                                        borderRadius: "50%",
                                        background: "#fff",
                                        zIndex: 3,
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Devil (Right) */}
                        <motion.div
                            initial={{ x: 200, opacity: 0 }}
                            animate={isClashing ? { x: -200, scale: 1.2, rotate: -15 } : { x: 0, opacity: 1, y: [0, 15, 0] }}
                            transition={isClashing 
                                ? { duration: 0.4, ease: "easeIn" } 
                                : { x: { duration: 0.8, ease: "easeOut" }, opacity: { duration: 0.8 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 } }
                            }
                            style={{ zIndex: 2 }}
                        >
                            <img 
                                src={devilImg} 
                                alt="Devil" 
                                style={{ width: 150, height: "auto", objectFit: "contain", dropShadow: "0 0 20px rgba(255,0,0,0.5)" }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div style="width:120px;height:120px;background:#ff0000;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;">Devil</div>';
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Progress Text and Loading Bar */}
                    <motion.div
                        animate={{ opacity: isClashing ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: 40, textAlign: "center", zIndex: 1 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={messageIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    fontSize: 16,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#a78d67",
                                    margin: "0 0 20px",
                                    fontWeight: 500,
                                }}
                            >
                                {MESSAGES[messageIndex]}
                            </motion.p>
                        </AnimatePresence>

                        {/* Loading Bar linking the two sides */}
                        <div style={{ width: 240, height: 2, background: "rgba(167,141,103,0.2)", borderRadius: 2, overflow: "hidden", margin: "0 auto" }}>
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                style={{ height: "100%", background: "#a78d67", borderRadius: 2 }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}