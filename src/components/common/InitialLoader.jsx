import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./InitialLoader.css";

export default function InitialLoader({ loading }) {
    const reduceMotion = useReducedMotion();
    const [show, setShow] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef(null);

    // Timings
    const introDuration = reduceMotion ? 400 : 1500; // Draw time + dramatic pause
    const zoomDuration = reduceMotion ? 100 : 850;   // Matches cinematicZoom CSS duration

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [show]);

    useEffect(() => {
        const startedAt = performance.now();
        let active = true;

        const update = (currentTime) => {
            if (!active) return;
            const elapsed = currentTime - startedAt;
            
            const resourcesReady = !loading;
            const introFinished = elapsed >= introDuration;

            // Trigger the cinematic zoom once data is loaded AND intro has finished
            if (resourcesReady && introFinished && !isComplete) {
                setIsComplete(true);
                
                // Allow CSS cinematic zoom animation to play, then unmount
                setTimeout(() => {
                    if (active) setShow(false);
                }, zoomDuration);
                
                return;
            }

            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);

        return () => {
            active = false;
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [loading, isComplete, introDuration, zoomDuration]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    role="status"
                    aria-live="polite"
                    aria-label="Loading portfolio"
                    className={`cinematic-loader is-running ${isComplete ? "is-complete" : ""}`}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                >
                    <div className="mark-container">
                        <div className="mark">
                            <svg viewBox="0 0 100 100">
                                {/* Left Vertical - drops down */}
                                <path className="letter-segment segment-one" pathLength="100" d="M25 15 L25 85" />
                                {/* Top Diagonal - shoots out */}
                                <path className="letter-segment segment-two" pathLength="100" d="M25 50 L75 15" />
                                {/* Bottom Diagonal - shoots down */}
                                <path className="letter-segment segment-three" pathLength="100" d="M25 50 L75 85" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
