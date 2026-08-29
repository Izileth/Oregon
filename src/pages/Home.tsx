import { useRef } from "react";
import { useCyberAnimation } from "../hooks/useCyberAnimation";
import CyberTitle from "../components/ui/CyberTitle";
import CyberScroll from "../components/ui/CyberScroll";
import CyberDecorations from "../components/ui/CyberDecorations";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const beamsContainerRef = useRef<HTMLDivElement>(null);
    const sideLabelRef = useRef<HTMLSpanElement>(null);

    const words = ["DAFT", "PUNK"];

    useCyberAnimation(containerRef, beamsContainerRef, sideLabelRef);

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center">
            {/* Background effects */}
            <div ref={beamsContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-20" />

            {/* Sidebar and dot decorations */}
            <CyberDecorations sideLabelRef={sideLabelRef} />

            {/* Title */}
            <CyberTitle words={words} />

            {/* Scroll Indication */}
            <CyberScroll />
        </div>
    );
}
