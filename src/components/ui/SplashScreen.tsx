import { useEffect, useMemo, useState } from "react";

const MATRIX_CHARS = "01アイウエオカキクケコ";

interface MatrixColumn {
    id: number;
    left: number;
    delay: number;
    duration: number;
    char: string;
}

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [progress, setProgress] = useState(0);

    const matrixColumns = useMemo<MatrixColumn[]>(() => {
        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 3,
            duration: 3 + Math.random() * 3,
            char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
        }));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onFinish, 500);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 6) + 3;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 bg-black text-white z-50 overflow-hidden flex items-center justify-center">
            {/* Matrix minimalista */}
            <div className="absolute inset-0 pointer-events-none">
                {matrixColumns.map((col) => (
                    <div
                        key={col.id}
                        className="absolute text-white/10 animate-matrix"
                        style={{
                            left: `${col.left}%`,
                            animationDelay: `${col.delay}s`,
                            animationDuration: `${col.duration}s`,
                            fontSize: "12px",
                        }}
                    >
                        {col.char}
                    </div>
                ))}
            </div>

            {/* Loader */}
            <div className="relative z-10 flex flex-col items-center gap-5 w-64">
                <span className="text-[10px] tracking-[0.35em] uppercase text-white/60">
                    carregando conteúdo
                </span>

                <div className="w-full h-px bg-white/20">
                    <div
                        className="h-full bg-white transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <span className="text-[10px] text-white/40 tracking-widest">
                    {progress}%
                </span>
            </div>

            <style>{`
        @keyframes matrix {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(120vh);
            opacity: 1;
          }
        }
        .animate-matrix {
          animation-name: matrix;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
}
