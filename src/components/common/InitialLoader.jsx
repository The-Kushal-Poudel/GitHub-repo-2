import { useEffect, useState, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import "./InitialLoader.css";

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function easeOutQuart(value) {
    return 1 - Math.pow(1 - value, 4);
}

export default function InitialLoader({ loading }) {
    const reduceMotion = useReducedMotion();
    const [show, setShow] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [progressVal, setProgressVal] = useState(0);
    const [status, setStatus] = useState("Drawing identity");
    const frameRef = useRef(null);
    const revealTimer = useRef(null);
    const hideTimer = useRef(null);

    const minimumDuration = reduceMotion ? 600 : 3200;
    const revealDuration = reduceMotion ? 320 : 950;

    useEffect(() => {
        if (show) {
            document.body.classList.add("is-loading-tech");
        } else {
            document.body.classList.remove("is-loading-tech");
        }
        return () => {
            document.body.classList.remove("is-loading-tech");
        };
    }, [show]);

    const finishNow = useCallback(() => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        if (revealTimer.current) clearTimeout(revealTimer.current);
        
        setProgressVal(1);
        setStatus("Ready");
        setIsExiting(true);

        hideTimer.current = setTimeout(() => {
            setShow(false);
        }, revealDuration + 350);
    }, [revealDuration]);

    useEffect(() => {
        const startedAt = performance.now();
        let active = true;

        const update = (currentTime) => {
            if (!active) return;
            const elapsed = currentTime - startedAt;
            const timeRatio = clamp(elapsed / minimumDuration, 0, 1);
            
            const resourcesReady = !loading;
            
            const target = resourcesReady
                ? easeOutQuart(timeRatio)
                : easeOutQuart(timeRatio) * 0.92;

            setProgressVal(prev => {
                // Smooth interpolation for the progress bar
                const next = prev + (target - prev) * 0.11;
                
                const percentage = Math.round(next * 100);
                if (percentage < 38) {
                    setStatus("Drawing identity");
                } else if (percentage < 78) {
                    setStatus("Assembling stack");
                } else if (percentage < 100) {
                    setStatus("Preparing portfolio");
                } else {
                    setStatus("Ready");
                }

                return next;
            });

            if (resourcesReady && elapsed >= minimumDuration) {
                setProgressVal(1);
                setStatus("Ready");
                
                revealTimer.current = setTimeout(() => {
                    if (active) {
                        setIsExiting(true);
                        hideTimer.current = setTimeout(() => {
                            if (active) setShow(false);
                        }, revealDuration + 350);
                    }
                }, reduceMotion ? 60 : 220);
                
                return;
            }

            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);

        return () => {
            active = false;
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            if (revealTimer.current) clearTimeout(revealTimer.current);
            if (hideTimer.current) clearTimeout(hideTimer.current);
        };
    }, [loading, minimumDuration, revealDuration, reduceMotion]);

    if (!show) return null;

    const percentage = Math.round(progressVal * 100).toString().padStart(2, "0");

    const handleImageLoad = (e) => {
        e.target.classList.add('loaded');
    };

    return (
        <div
            className={`intro ${isExiting ? "is-exiting" : ""}`}
            role="status"
            aria-live="polite"
            aria-label="Opening Kushal's portfolio"
        >
            <div className="ambient-light" aria-hidden="true"></div>

            <div className="reveal-panel left" aria-hidden="true"></div>
            <div className="reveal-panel right" aria-hidden="true"></div>

            <div className="intro-content">
                <div className="identity-stage" aria-hidden="true">
                    <div className="core-glow"></div>

                    <div className="tech-orbit">
                        <div className="tech-node" title="Java">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="" onLoad={handleImageLoad} />
                            <span className="tech-fallback">Java</span>
                        </div>
                        <div className="tech-node" title="Spring Boot">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="" onLoad={handleImageLoad} />
                            <span className="tech-fallback">Spring</span>
                        </div>
                        <div className="tech-node" title="Laravel">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="" onLoad={handleImageLoad} />
                            <span className="tech-fallback">Laravel</span>
                        </div>
                        <div className="tech-node" title="React">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="" onLoad={handleImageLoad} />
                            <span className="tech-fallback">React</span>
                        </div>
                        <div className="tech-node" title="MySQL">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="" onLoad={handleImageLoad} />
                            <span className="tech-fallback">MySQL</span>
                        </div>
                        <div className="tech-node" title="PHP">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" alt="" onLoad={handleImageLoad} />
                            <span className="tech-fallback">PHP</span>
                        </div>
                    </div>

                    <div className="monogram">
                        <svg viewBox="0 0 100 100">
                            <path className="stroke stroke-one" pathLength="100" d="M30 18 L30 82" />
                            <path className="stroke stroke-two" pathLength="100" d="M30 50 L72 18" />
                            <path className="stroke stroke-three" pathLength="100" d="M30 50 L72 82" />
                            <circle className="center-dot" cx="30" cy="50" r="4.2" />
                        </svg>
                    </div>
                </div>

                <p className="intro-name">Kushal</p>
                <p className="intro-role">Backend · Full‑Stack · Systems</p>

                <div className="progress-wrap">
                    <div className="progress-meta">
                        <span id="statusText">{status}</span>
                        <span id="percentage">{percentage}</span>
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{ transform: `scaleX(${progressVal})` }}></div>
                    </div>
                </div>

                <button className="skip-button" type="button" onClick={finishNow}>
                    Skip intro
                </button>
            </div>
        </div>
    );
}
