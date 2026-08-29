import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export function useCyberAnimation(
    containerRef: RefObject<HTMLDivElement | null>,
    beamsContainerRef: RefObject<HTMLDivElement | null>,
    sideLabelRef: RefObject<HTMLSpanElement | null>
) {
    useEffect(() => {
        const timer = setTimeout(() => {
            const chars = document.querySelectorAll(".cyber-char");
            const parent = containerRef.current;
            if (!parent || !beamsContainerRef.current) return;
            const parentRect = parent.getBoundingClientRect();

            const tl = gsap.timeline();

            gsap.set(".cyber-char", { opacity: 0 });
            gsap.set(".cyber-dot", { opacity: 0, x: -20 });
            gsap.set(".cyber-side-label", { opacity: 0 });
            gsap.set(".cyber-scroll", { opacity: 0, y: 20 });

            for (let p = 0; p < 20; p++) {
                const particle = document.createElement("div");
                const isLine = Math.random() > 0.5;
                const width = isLine ? Math.floor(Math.random() * 40) + 15 : Math.floor(Math.random() * 8) + 3;
                const height = isLine ? 1 : Math.floor(Math.random() * 8) + 3;
                
                particle.className = "absolute bg-white pointer-events-none opacity-0 z-10";
                particle.style.width = `${width}px`;
                particle.style.height = `${height}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                beamsContainerRef.current?.appendChild(particle);
                
                gsap.fromTo(particle,
                    { opacity: 0, scaleX: 0.1 },
                    {
                        opacity: () => Math.random() * 0.9 + 0.1,
                        scaleX: () => Math.random() > 0.5 ? 2.5 : 0.4,
                        x: () => (Math.random() - 0.5) * 60,
                        duration: Math.random() * 0.4 + 0.1,
                        delay: Math.random() * 0.6,
                        ease: "none",
                        repeat: Math.floor(Math.random() * 2) + 1,
                        yoyo: true,
                        onComplete: () => { particle.remove(); }
                    }
                );
            }

            const cryptoWords = [
                "SYS_DECRYPT_SEQ", "SIG_ERR_RECOVERY", "0x3F2A4D", "SYSTEM_UP_200",
                "MEM_SYNC_OK", "DECRYPT_CORE_ONLINE", "NET_ACTIVE_P2P", "DAFT_PUNK_LOAD"
            ];
            for (let w = 0; w < 6; w++) {
                const label = document.createElement("div");
                label.className = "absolute text-white/30 font-mono text-[8px] tracking-[0.2em] pointer-events-none uppercase z-10 select-none";
                label.style.left = `${10 + Math.random() * 80}%`;
                label.style.top = `${25 + Math.random() * 50}%`;
                
                beamsContainerRef.current?.appendChild(label);
                
                const word = cryptoWords[Math.floor(Math.random() * cryptoWords.length)];
                const scrambleObj = { val: 0 };
                
                gsap.fromTo(label,
                    { opacity: 0 },
                    {
                        opacity: 0.4,
                        duration: 0.2,
                        delay: Math.random() * 0.5,
                        onStart: () => {
                            gsap.to(scrambleObj, {
                                val: 1,
                                duration: 0.8,
                                ease: "none",
                                onUpdate: () => {
                                    let result = "";
                                    const glyphs = "0123456789ABCDEF!@#%&*";
                                    for (let i = 0; i < word.length; i++) {
                                        if (word[i] === "_" || word[i] === " ") {
                                            result += word[i];
                                        } else if (Math.random() < scrambleObj.val) {
                                            result += word[i];
                                        } else {
                                            result += glyphs[Math.floor(Math.random() * glyphs.length)];
                                        }
                                    }
                                    label.textContent = result;
                                }
                            });
                        },
                        onComplete: () => {
                            gsap.to(label, {
                                opacity: 0,
                                duration: 0.2,
                                delay: 0.4,
                                onComplete: () => { label.remove(); }
                            });
                        }
                    }
                );
            }

            chars.forEach((charEl) => {
                const char = charEl.getAttribute("data-char");
                if (!char) return;

                const rect = charEl.getBoundingClientRect();
                const relativeX = rect.left + rect.width / 2 - parentRect.left;

                const beam = document.createElement("div");
                beam.className = "absolute w-[2px] h-[180px] opacity-0 pointer-events-none rounded-full z-10";
                beam.style.left = `${relativeX}px`;

                const beamColor = "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8), transparent)";
                beam.style.background = beamColor;
                beam.style.boxShadow = "0 0 16px rgba(255, 255, 255, 0.9), 0 0 32px rgba(255, 255, 255, 0.5)";

                beamsContainerRef.current?.appendChild(beam);

                const beamDelay = Math.random() * 0.4;

                tl.fromTo(beam, 
                    { top: "-180px", opacity: 0 },
                    { 
                        top: "100%", 
                        opacity: 1, 
                        duration: 1.4, 
                        ease: "power2.inOut",
                        onStart: () => { gsap.set(beam, { opacity: 1 }); },
                        onComplete: () => { beam.remove(); }
                    },
                    beamDelay
                );

                const decryptDelay = beamDelay + 0.5;
                const glyphs = "$@#%&?*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ░▒▓█";
                const scrambleObj = { val: 0 };

                tl.to(scrambleObj, {
                    val: 1,
                    duration: 0.9,
                    ease: "none",
                    onStart: () => {
                        gsap.set(charEl, { opacity: 1 });
                    },
                    onUpdate: () => {
                        if (scrambleObj.val < 1) {
                            if (Math.random() < 0.15) {
                                charEl.textContent = char;
                            } else {
                                const randomChar = glyphs[Math.floor(Math.random() * glyphs.length)];
                                charEl.textContent = randomChar;
                            }
                            (charEl as HTMLElement).style.color = "#ffffff";
                            (charEl as HTMLElement).style.filter = "drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))";
                        } else {
                            charEl.textContent = char;
                            (charEl as HTMLElement).style.color = "";
                            (charEl as HTMLElement).style.filter = "";
                        }
                    },
                    onComplete: () => {
                        charEl.textContent = char;
                        (charEl as HTMLElement).style.color = "";
                        (charEl as HTMLElement).style.filter = "";
                    }
                }, decryptDelay);
            });

            tl.to(".cyber-dot", {
                opacity: 0.6,
                x: 0,
                duration: 1.0,
                stagger: 0.1,
                ease: "power2.out"
            }, 0.8);

            const sideLabelEl = sideLabelRef.current;
            if (sideLabelEl) {
                const originalText = "About the duo";
                const sideGlyphs = "@#%&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const sideObj = { val: 0 };
                
                tl.to(sideObj, {
                    val: 1,
                    duration: 1.4,
                    ease: "none",
                    onStart: () => {
                        gsap.set(sideLabelEl, { opacity: 0.4 });
                    },
                    onUpdate: () => {
                        let result = "";
                        for (let i = 0; i < originalText.length; i++) {
                            if (originalText[i] === " ") {
                                result += " ";
                            } else if (Math.random() < sideObj.val) {
                                result += originalText[i];
                            } else {
                                result += sideGlyphs[Math.floor(Math.random() * sideGlyphs.length)];
                            }
                        }
                        sideLabelEl.textContent = result;
                    },
                    onComplete: () => {
                        sideLabelEl.textContent = originalText;
                    }
                }, 0.6);
            }

            tl.to(".cyber-scroll", {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(".cyber-scroll-dot", {
                        y: 5,
                        duration: 1.0,
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut"
                    });
                }
            }, 1.2);

        }, 50);

        return () => clearTimeout(timer);
    }, [containerRef, beamsContainerRef, sideLabelRef]);
}
