import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";
import {
    Check,
    CloudUpload,
    Code2,
    Database,
    FileText,
    RefreshCw,
    Server,
    ShieldCheck,
    Wifi,
} from "lucide-react";

const STAGES = [
    {
        label: "Edge",
        detail: "Request routing",
        start: 4,
        end: 24,
        icon: CloudUpload,
    },
    {
        label: "Server",
        detail: "Instance wake-up",
        start: 24,
        end: 52,
        icon: Server,
    },
    {
        label: "Database",
        detail: "Secure handshake",
        start: 52,
        end: 78,
        icon: Database,
    },
    {
        label: "Content",
        detail: "Portfolio records",
        start: 78,
        end: 100,
        icon: FileText,
    },
];

function getCurrentIcon(progress, timedOut, complete) {
    if (complete) return Check;
    if (timedOut) return RefreshCw;
    if (progress >= 78) return FileText;
    if (progress >= 52) return Database;
    if (progress >= 24) return Server;
    if (progress >= 4) return CloudUpload;

    return Wifi;
}

export default function PortfolioColdStartLoader({
    loading,
    error = null,
    hasCachedData = false,
    onRetry,
    onContinue,
    appearanceDelay = 500,
    timeoutDelay = 12000,
}) {
    const reduceMotion = useReducedMotion();

    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [message, setMessage] = useState(
        "Preparing secure connection…",
    );
    const [timedOut, setTimedOut] = useState(false);
    const [complete, setComplete] = useState(false);

    const timersRef = useRef([]);
    const intervalRef = useRef(null);
    const visibleRef = useRef(false);

    const updateVisibility = useCallback((value) => {
        visibleRef.current = value;
        setVisible(value);
    }, []);

    const clearTimers = useCallback(() => {
        timersRef.current.forEach((timer) => {
            window.clearTimeout(timer);
        });

        timersRef.current = [];

        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const schedule = useCallback((callback, delay) => {
        const timer = window.setTimeout(callback, delay);
        timersRef.current.push(timer);

        return timer;
    }, []);

    useEffect(() => {
        clearTimers();

        if (loading) {
            const startedAt = performance.now();

            updateVisibility(false);
            setProgress(0);
            setElapsedSeconds(0);
            setComplete(false);
            setTimedOut(false);
            setMessage("Preparing secure connection…");

            intervalRef.current = window.setInterval(() => {
                const elapsed = (performance.now() - startedAt) / 1000;
                setElapsedSeconds(elapsed);
            }, 100);

            schedule(() => {
                updateVisibility(true);
                setProgress(8);
                setMessage("Connecting to the portfolio service…");
            }, appearanceDelay);

            schedule(() => {
                setProgress(22);
                setMessage("Request routed through edge network…");
            }, appearanceDelay + 800);

            schedule(() => {
                setProgress(41);
                setMessage("Starting backend instance…");
            }, appearanceDelay + 2100);

            schedule(() => {
                setProgress(64);
                setMessage("Opening secure database connection…");
            }, appearanceDelay + 4000);

            schedule(() => {
                setProgress(84);
                setMessage("Retrieving portfolio records…");
            }, appearanceDelay + 6500);

            schedule(() => {
                setProgress(94);
                setMessage("Finalizing your portfolio…");
            }, appearanceDelay + 9000);

            schedule(() => {
                updateVisibility(true);
                setTimedOut(true);
                setProgress((current) => Math.max(current, 68));
                setMessage(
                    "The free server is taking longer than expected.",
                );
            }, timeoutDelay);

            return clearTimers;
        }

        if (error) {
            updateVisibility(true);
            setComplete(false);
            setTimedOut(true);
            setProgress((current) => Math.max(current, 68));
            setMessage(
                "The portfolio server could not be reached.",
            );

            return clearTimers;
        }

        if (visibleRef.current) {
            setProgress(100);
            setComplete(true);
            setTimedOut(false);
            setMessage("Portfolio ready.");

            schedule(() => {
                updateVisibility(false);
            }, 750);
        }

        return clearTimers;
    }, [
        appearanceDelay,
        clearTimers,
        error,
        loading,
        schedule,
        timeoutDelay,
        updateVisibility,
    ]);

    const handleRetry = () => {
        setTimedOut(false);
        setComplete(false);
        setProgress(8);
        setMessage("Retrying secure connection…");

        onRetry?.();
    };

    const handleContinue = () => {
        updateVisibility(false);
        onContinue?.();
    };

    const value = Math.max(0, Math.min(100, progress));
    const CurrentIcon = getCurrentIcon(
        value,
        timedOut,
        complete,
    );

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
              w-full max-w-[720px] overflow-hidden rounded-[28px]
              border border-[#e6ded0] bg-[#fffdf9]
              shadow-[0_38px_100px_rgba(72,59,40,.17)]
            "
                        initial={
                            reduceMotion
                                ? false
                                : {
                                    y: 16,
                                    scale: 0.985,
                                }
                        }
                        animate={{
                            y: 0,
                            scale: 1,
                        }}
                        exit={
                            reduceMotion
                                ? undefined
                                : {
                                    y: 10,
                                    scale: 0.985,
                                }
                        }
                    >
                        <header
                            className="
                flex items-center justify-between gap-4
                border-b border-[#eee6da]
                bg-[#f8f3eb]/50 px-5 py-5 sm:px-6
              "
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="
                    grid h-10 w-10 shrink-0 place-items-center
                    rounded-xl border border-[#ddcfbc]
                    bg-gradient-to-br from-white to-[#f4ecdf]
                    text-[#a78d67] shadow-sm
                  "
                                >
                                    <Code2 size={19} strokeWidth={1.8} />
                                </div>

                                <div>
                                    <p
                                        className="
                      m-0 font-serif text-[17px] font-bold
                      text-[#151412]
                    "
                                    >
                                        Kushal Portfolio
                                    </p>

                                    <p className="mt-1 text-[10px] text-[#8c806f]">
                                        Secure content initialization
                                    </p>
                                </div>
                            </div>

                            <div
                                className="
                  hidden items-center gap-2 rounded-full
                  border border-[#e6ded0] bg-white px-3 py-2
                  text-[11px] tabular-nums text-[#8c806f]
                  shadow-sm sm:flex
                "
                            >
                                <span
                                    className="
                    h-2 w-2 animate-pulse rounded-full
                    bg-[#b69a70]
                    shadow-[0_0_0_5px_rgba(182,154,112,.12)]
                  "
                                />

                                {elapsedSeconds.toFixed(1)}s
                            </div>
                        </header>

                        <div className="p-5 sm:p-6">
                            <div
                                className="
                  flex items-start justify-between gap-6
                  max-sm:flex-col
                "
                            >
                                <div>
                                    <h2
                                        className="
                      m-0 font-serif text-3xl font-bold
                      tracking-[-0.035em] text-[#211f1a]
                    "
                                    >
                                        Preparing your portfolio
                                    </h2>

                                    <p
                                        className="
                      mt-3 max-w-lg text-sm leading-7
                      text-[#655d52]
                    "
                                    >
                                        Connecting to the free backend and
                                        retrieving your latest projects, profile,
                                        and experience.
                                    </p>
                                </div>

                                <div
                                    className="
                    flex shrink-0 items-baseline gap-1
                    tabular-nums
                  "
                                >
                                    <motion.strong
                                        key={Math.round(value)}
                                        className="
                      text-[42px] font-black
                      tracking-[-0.055em] text-[#151412]
                    "
                                        initial={
                                            reduceMotion
                                                ? false
                                                : {
                                                    y: 5,
                                                    opacity: 0.5,
                                                }
                                        }
                                        animate={{
                                            y: 0,
                                            opacity: 1,
                                        }}
                                    >
                                        {Math.round(value)}
                                    </motion.strong>

                                    <span
                                        className="
                      text-xs font-black text-[#a78d67]
                    "
                                    >
                                        %
                                    </span>
                                </div>
                            </div>

                            <div
                                className="
                  mt-6 rounded-[22px] border border-[#e6ded0]
                  bg-gradient-to-b from-white to-[#fbf7f0]
                  p-4
                  shadow-[0_10px_30px_rgba(89,70,44,.045)]
                "
                            >
                                <div
                                    className="
                    relative h-3.5 rounded-full
                    border border-[#dfd4c4] bg-[#efe7dc]
                    shadow-inner shadow-[#513f2b]/10
                  "
                                >
                                    <div
                                        className="
                      absolute inset-[3px] rounded-full
                      opacity-60
                    "
                                        style={{
                                            backgroundImage:
                                                "repeating-linear-gradient(90deg, transparent 0 34px, rgba(112,91,60,.07) 34px 35px)",
                                        }}
                                    />

                                    <motion.div
                                        className={`
                      absolute inset-y-[2px] left-[2px]
                      overflow-hidden rounded-full
                      ${complete
                                                ? "bg-gradient-to-r from-[#3f7655] via-[#5f9b72] to-[#8eb99a]"
                                                : "bg-gradient-to-r from-[#8f7652] via-[#a78d67] to-[#d6bd93]"
                                            }
                    `}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        transition={{
                                            duration: reduceMotion ? 0.05 : 0.82,
                                            ease: [0.22, 0.8, 0.2, 1],
                                        }}
                                        style={{
                                            boxShadow: complete
                                                ? "0 0 18px rgba(77,140,103,.20)"
                                                : "0 0 18px rgba(167,141,103,.24), 0 4px 14px rgba(117,91,55,.13)",
                                        }}
                                    >
                                        {!reduceMotion && !complete && (
                                            <motion.span
                                                className="
                          absolute inset-0
                          bg-gradient-to-r
                          from-transparent via-white/70
                          to-transparent
                        "
                                                animate={{
                                                    x: ["-120%", "145%"],
                                                }}
                                                transition={{
                                                    duration: 1.75,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        )}
                                    </motion.div>

                                    <motion.span
                                        className={`
                      absolute top-1/2 h-5 w-5
                      -translate-x-1/2 -translate-y-1/2
                      rounded-full border-[3px] border-white
                      ${complete
                                                ? "bg-[#4d8c67]"
                                                : "bg-[#151412]"
                                            }
                    `}
                                        animate={{ left: `${value}%` }}
                                        transition={{
                                            duration: reduceMotion ? 0.05 : 0.82,
                                            ease: [0.22, 0.8, 0.2, 1],
                                        }}
                                        style={{
                                            boxShadow: complete
                                                ? "0 0 0 5px rgba(77,140,103,.10), 0 7px 18px rgba(77,140,103,.18)"
                                                : "0 0 0 5px rgba(167,141,103,.12), 0 7px 18px rgba(66,51,31,.22)",
                                        }}
                                    />
                                </div>

                                <div
                                    className="
                    mt-5 grid grid-cols-2 gap-3
                    md:grid-cols-4
                  "
                                >
                                    {STAGES.map((stage) => {
                                        const Icon = stage.icon;
                                        const isComplete = value >= stage.end;
                                        const isActive =
                                            value >= stage.start &&
                                            value < stage.end;

                                        return (
                                            <div
                                                key={stage.label}
                                                className={`
                          flex items-center gap-2.5 rounded-2xl
                          border p-3 transition
                          ${isComplete
                                                        ? "border-[#cadccf] bg-[#f6fbf7]"
                                                        : isActive
                                                            ? "-translate-y-0.5 border-[#cbb89b] bg-[#fcf6ec] shadow-[0_10px_24px_rgba(104,81,49,.07)]"
                                                            : "border-[#eee6da] bg-white"
                                                    }
                        `}
                                            >
                                                <div
                                                    className={`
                            grid h-9 w-9 shrink-0
                            place-items-center rounded-xl border
                            ${isComplete
                                                            ? "border-[#4d8c67] bg-[#4d8c67] text-white"
                                                            : isActive
                                                                ? "border-[#a78d67] bg-[#a78d67] text-white"
                                                                : "border-[#e7dece] bg-[#faf6ef] text-[#9b8f7c]"
                                                        }
                          `}
                                                >
                                                    <Icon
                                                        size={17}
                                                        strokeWidth={1.8}
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p
                                                        className={`
                              m-0 truncate text-[10px]
                              font-black uppercase
                              tracking-[0.08em]
                              ${isComplete
                                                                ? "text-[#4c765d]"
                                                                : isActive
                                                                    ? "text-[#5e4c34]"
                                                                    : "text-[#8c806f]"
                                                            }
                            `}
                                                    >
                                                        {stage.label}
                                                    </p>

                                                    <p
                                                        className="
                              mt-1 truncate text-[9px]
                              text-[#aaa090]
                            "
                                                    >
                                                        {stage.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div
                                className="
                  mt-5 flex items-center justify-between gap-5
                  max-sm:flex-col max-sm:items-start
                "
                            >
                                <div
                                    className="
                    flex min-w-0 items-center gap-2.5
                  "
                                >
                                    <div
                                        className="
                      grid h-9 w-9 shrink-0 place-items-center
                      rounded-xl border border-[#ddcfbc]
                      bg-[#fbf6ee] text-[#a78d67]
                    "
                                    >
                                        <CurrentIcon
                                            size={16}
                                            strokeWidth={1.8}
                                        />
                                    </div>

                                    <p
                                        className="
                      m-0 truncate text-sm text-[#554e44]
                    "
                                    >
                                        {message}
                                    </p>
                                </div>

                                <div
                                    className="
                    flex shrink-0 items-center gap-2
                    text-[10px] font-black uppercase
                    tracking-[0.1em] text-[#8c806f]
                  "
                                >
                                    <span
                                        className="
                      grid h-7 w-7 place-items-center
                      rounded-lg border border-[#e6ded0]
                      bg-white text-[#746650]
                    "
                                    >
                                        <ShieldCheck
                                            size={14}
                                            strokeWidth={1.8}
                                        />
                                    </span>

                                    TLS protected
                                </div>
                            </div>

                            {timedOut && (
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={handleRetry}
                                        className="
                      inline-flex items-center gap-2
                      rounded-xl bg-[#151412]
                      px-4 py-3 text-sm font-semibold
                      text-white transition
                      hover:bg-[#a78d67]
                    "
                                    >
                                        <RefreshCw size={15} />
                                        Retry connection
                                    </button>

                                    {hasCachedData && (
                                        <button
                                            type="button"
                                            onClick={handleContinue}
                                            className="
                        inline-flex items-center gap-2
                        rounded-xl border border-[#d8ccbb]
                        bg-white px-4 py-3 text-sm
                        font-semibold text-[#151412]
                      "
                                        >
                                            <FileText size={15} />
                                            Use cached content
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.section>
                </motion.div>
            )}
        </AnimatePresence>
    );
}