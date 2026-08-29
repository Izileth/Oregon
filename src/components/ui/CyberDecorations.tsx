import { RefObject } from "react";

interface Props {
    sideLabelRef: RefObject<HTMLSpanElement | null>;
}

export default function CyberDecorations({ sideLabelRef }: Props) {
    return (
        <>
            <div className="hidden sm:flex absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
                {[0, 1, 2].map((i) => (
                    <span key={i} className="cyber-dot text-white text-[9px] tracking-widest opacity-0">·</span>
                ))}
            </div>

            <div className="hidden sm:flex absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-30">
                <span
                    ref={sideLabelRef}
                    className="cyber-side-label text-white text-[8px] tracking-[0.25em] uppercase opacity-0 font-light"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                    About the duo
                </span>
            </div>
        </>
    );
}
