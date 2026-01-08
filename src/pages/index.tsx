import  { useState, useMemo } from 'react';
import { Heart, Sparkles, Lock, Unlock } from 'lucide-react';
import { JSX } from 'react';
interface Particle {
    id: number;
    x: number;
    y: number;
}

interface Secret {
    symbol: string;
    hint: string;
    content: string;
}


const backgroundParticlesData = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3
}));


function App(): JSX.Element {
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [showFinal, setShowFinal] = useState<boolean>(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const backgroundParticles = useMemo(() => backgroundParticlesData, []);
    // Personalize aqui com sua mensagem!
    const secret: Secret = {
        symbol: '💖',
        hint: 'Uma Mensagem Especial',
        content: 'Desde o momento que te conheci, minha vida ganhou um novo significado. Você é a razão do meu sorriso, a luz dos meus dias, e a pessoa que me faz querer ser melhor a cada dia. Te amo mais do que as palavras podem expressar.'
    };

    const handleReveal = (): void => {
        if (!isRevealed) {
            setIsRevealed(true);

            // Criar partículas de comemoração
            const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * 100,
                y: Math.random() * 100
            }));
            setParticles(newParticles);

            setTimeout(() => {
                setParticles([]);
                setShowFinal(true);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-950 via-purple-950 to-indigo-950 text-white font-light relative overflow-hidden flex items-center justify-center p-6">

            {/* Partículas flutuantes de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {backgroundParticles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`
                        }}
                    />
                ))}
            </div>

            {/* Partículas de celebração */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute pointer-events-none animate-ping"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                >
                    <Sparkles className="w-6 h-6 text-pink-400" />
                </div>
            ))}

            {/* Conteúdo principal */}
            <div className="max-w-4xl w-full">

                {/* Header */}
                <header className="text-center mb-12">
                    <div className="inline-block">
                        <div className="text-xs tracking-[0.5em] text-rose-300 mb-4 flex items-center gap-2 justify-center">
                            <Sparkles className="w-4 h-4" />
                            UMA MENSAGEM ESPECIAL PARA VOCÊ
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-thin tracking-wider mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200">
                            Para Meu Amor
                        </h1>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
                    </div>
                </header>

                {/* Carta principal */}
                <div className="flex justify-center mb-12">
                    <div
                        onClick={handleReveal}
                        className={`relative w-full max-w-2xl h-96 rounded-3xl cursor-pointer overflow-hidden transition-all duration-1000 transform hover:scale-105 ${isRevealed
                            ? 'bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30 border-2 border-pink-300/70 shadow-2xl shadow-pink-500/50'
                            : 'bg-white/10 border-2 border-white/20 hover:border-pink-300/50 backdrop-blur-sm'
                            }`}
                    >
                        {/* Símbolo de fundo */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${isRevealed ? 'opacity-10 scale-150' : 'opacity-40 scale-100'
                            }`}>
                            <span className="text-[12rem]">
                                {isRevealed ? secret.symbol : '💌'}
                            </span>
                        </div>

                        {/* Estado bloqueado */}
                        {!isRevealed && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <Lock className="w-20 h-20 text-rose-300 mb-6 animate-pulse" />
                                <h2 className="text-3xl tracking-wide text-white/80 mb-3">
                                    {secret.hint}
                                </h2>
                                <p className="text-rose-200/60 text-sm tracking-wider">
                                    Clique para revelar ✨
                                </p>
                            </div>
                        )}

                        {/* Conteúdo revelado */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center px-12 transition-all duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}>
                            <Unlock className="w-12 h-12 text-pink-300 mb-6" />
                            <h2 className="text-2xl tracking-wide text-pink-200 mb-6">
                                {secret.hint}
                            </h2>
                            <p className="text-center text-rose-100 leading-relaxed text-lg max-w-xl">
                                {secret.content}
                            </p>
                        </div>

                        {/* Brilho ao revelar */}
                        {isRevealed && (
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-pink-500/10 to-transparent animate-pulse pointer-events-none" />
                        )}
                    </div>
                </div>

                {/* Mensagem final */}
                {showFinal && (
                    <div className="animate-fade-in">
                        <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-2 border-pink-300/50 backdrop-blur-lg shadow-2xl shadow-pink-500/30">
                            <Heart className="w-16 h-16 mx-auto mb-6 text-pink-300 animate-pulse" />
                            <h2 className="text-3xl md:text-4xl font-thin mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200">
                                Te Amo Infinitamente
                            </h2>
                            <p className="text-lg text-rose-100 leading-relaxed mb-6">
                                Cada momento ao seu lado é um presente que guardo no coração
                            </p>
                            <div className="flex items-center justify-center gap-2 text-rose-300">
                                <Heart className="w-5 h-5 fill-current" />
                                <span className="text-sm tracking-widest">PARA SEMPRE SEU</span>
                                <Heart className="w-5 h-5 fill-current" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-12 text-center text-rose-300/60 text-xs tracking-[0.3em]">
                    FEITO COM AMOR PARA VOCÊ ✨
                </footer>
            </div>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
        </div>
    );
}

export default App;