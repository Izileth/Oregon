export default function CyberTitle({ words }: { words: string[] }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-2">
            <h1
                className="cyber-title text-white font-black uppercase leading-none select-none text-center flex flex-wrap justify-center"
                style={{
                    fontSize: "clamp(52px, 16vw, 200px)",
                    letterSpacing: "-0.02em",
                    fontFamily: "'Arial Black', 'Arial', sans-serif",
                    textShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.4)",
                }}
            >
                {words.map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-block whitespace-nowrap mx-[0.1em]">
                        {word.split("").map((char, charIdx) => (
                            <span
                                key={charIdx}
                                className="cyber-char inline-block opacity-0"
                                data-char={char}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                ))}
            </h1>
        </div>
    );
}
