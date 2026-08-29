export default function CyberScroll() {
    return (
        <div className="cyber-scroll absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 opacity-0">
            <div className="w-[1px] h-4 bg-white opacity-30" />
            <div className="w-4 h-4 rounded-full border border-white opacity-40 flex items-center justify-center">
                <div className="cyber-scroll-dot w-[3px] h-[3px] rounded-full bg-white opacity-70" />
            </div>
        </div>
    );
}
