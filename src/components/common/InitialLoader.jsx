import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./InitialLoader.css";

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3);
}

export default function InitialLoader({ loading }) {
    const reduceMotion = useReducedMotion();
    const [show, setShow] = useState(true);
    const [progressVal, setProgressVal] = useState(0);
    const [status, setStatus] = useState("Loading");
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef(null);

    const minimumDuration = reduceMotion ? 450 : 1900;
    const exitDelay = reduceMotion ? 100 : 350;

    useEffect(() => {
        if (show) {
            document.body.classList.add("is-loading");
            document.body.style.overflow = "hidden";
        } else {
            document.body.classList.remove("is-loading");
            document.body.style.overflow = "";
        }
        return () => {
            document.body.classList.remove("is-loading");
            document.body.style.overflow = "";
        };
    }, [show]);

    useEffect(() => {
        const startedAt = performance.now();
        let active = true;

        const update = (currentTime) => {
            if (!active) return;
            const elapsed = currentTime - startedAt;
            const timeRatio = Math.min(elapsed / minimumDuration, 1);
            
            const resourcesReady = !loading;
            
            let visualProgress;
            if (resourcesReady) {
                visualProgress = easeOutCubic(timeRatio);
            } else {
                visualProgress = easeOutCubic(timeRatio) * 0.92;
            }
            
            const safeValue = Math.max(0, Math.min(visualProgress, 1));
            setProgressVal(safeValue);

            const minimumTimeFinished = elapsed >= minimumDuration;

            if (resourcesReady && minimumTimeFinished) {
                setProgressVal(1);
                setStatus("Ready");
                setIsComplete(true);
                
                setTimeout(() => {
                    if (active) setShow(false);
                }, exitDelay);
                
                return;
            }

            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);

        return () => {
            active = false;
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [loading, minimumDuration, exitDelay]);

    const percentage = Math.round(progressVal * 100).toString().padStart(2, "0");

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    role="status"
                    aria-live="polite"
                    aria-label="Loading portfolio"
                    className={`premium-loader is-running ${isComplete ? "is-complete" : ""}`}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.025 }}
                    transition={{ duration: reduceMotion ? 0.3 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="loader-inner">
                        <div className="mark-stage" aria-hidden="true">
                            <div className="ambient-glow"></div>
                            <div className="orbit orbit-one"></div>
                            <div className="orbit orbit-two"></div>
                            <div className="orbit-dot"></div>
                            <div className="mark">
                                <svg viewBox="0 0 100 100">
                                    <path className="letter-segment segment-one" pathLength="100" d="M30 18 L30 82" />
                                    <path className="letter-segment segment-two" pathLength="100" d="M30 50 L72 18" />
                                    <path className="letter-segment segment-three" pathLength="100" d="M30 50 L72 82" />
                                    <circle className="center-dot" cx="30" cy="50" r="4.2" />
                                </svg>
                            </div>
                        </div>

                        <div className="loader-copy">
                            <p className="brand-name">Kushal</p>
                            <div className="loader-meta">
                                <span className="loader-status">{status}</span>
                                <span className="loader-percentage">{percentage}</span>
                            </div>
                            <div className="progress" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar" style={{ transform: `scaleX(${progressVal})` }}></div>
                            </div>
                            <p className="loader-caption">Backend · Development · Digital Experience</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
