import CyberTitle from "../components/ui/CyberTitle";
import CyberScroll from "../components/ui/CyberScroll";

export default function Test() {
    return (
        <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center pt-24 text-white overflow-hidden border-4 border-dashed border-red-500/50">
            <h1 className="absolute top-4 left-4 text-xs font-mono text-red-500">// ISOLATED_TEST_ENVIRONMENT</h1>
            
            <div className="relative w-full h-[60vh] border border-white/20 mb-8 overflow-hidden bg-black flex items-center justify-center">
                <CyberTitle words={["TEST", "MODE"]} />
            </div>

            <div className="relative h-32 w-32 border border-white/20 flex items-center justify-center">
                <p className="text-xs absolute top-2">Scroll Icon</p>
                <div style={{ opacity: 1, y: 0 }} className="cyber-scroll absolute bottom-5 flex flex-col items-center gap-1">
                    <div className="w-[1px] h-4 bg-white opacity-30" />
                    <div className="w-4 h-4 rounded-full border border-white opacity-40 flex items-center justify-center">
                        <div className="w-[3px] h-[3px] rounded-full bg-white opacity-70" />
                    </div>
                </div>
            </div>
        </div>
    );
}
