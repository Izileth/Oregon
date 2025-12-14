import React, { useState } from 'react';

function App() {
 const [revealedSections, setRevealedSections] = useState<{ [key: number]: boolean }>({});
  const secrets = [
    { id: 1, title: 'ᚦ', hint: 'O Início', content: 'Todo conhecimento exige um sacrifício inicial: o abandono da ignorância.' },
    { id: 2, title: 'ᚲ', hint: 'A Chave', content: 'A chave não abre portas externas, mas destranca aquilo que foi selado na mente.' },
    { id: 3, title: 'ᚨ', hint: 'O Portal', content: 'Há passagens que só se revelam quando o observador está preparado.' },
    { id: 4, title: 'ᚱ', hint: 'O Guardião', content: 'Nem todo guardião impede a entrada. Alguns testam a intenção.' },
    { id: 5, title: 'ᚹ', hint: 'A Profecia', content: 'O destino não é escrito — ele é decifrado.' },
    { id: 6, title: 'ᛉ', hint: 'O Enigma', content: 'A resposta correta raramente é a mais óbvia.' },
    { id: 7, title: 'ᚾ', hint: 'A Sombra', content: 'Aquilo que você evita encarar é onde o poder se esconde.' },
    { id: 8, title: 'ᛟ', hint: 'O Ritual', content: 'Repetição transforma intenção em realidade.' },
    { id: 9, title: 'ᛞ', hint: 'A Revelação', content: 'Conhecer a verdade é perder o direito à ilusão.' }
  ];

  const handleMouseEnter = (id: number) => {
    setRevealedSections(prev => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id: number) => {
    setRevealedSections(prev => ({ ...prev, [id]: false }));
  };

  const totalRevealed = Object.values(revealedSections).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-black text-white font-light tracking-wide">

      {/* Contador Arcano */}
      <div className="fixed top-8 right-8 z-50 text-right">
        <div className="text-xs tracking-[0.4em] text-gray-500 mb-1">
          CONHECIMENTO DESVENDADO
        </div>
        <div className="text-4xl font-thin">
          {totalRevealed}/{secrets.length}
        </div>
      </div>

      {/* Header */}
      <header className="pt-28 pb-20 text-center">
        <div className="text-xs tracking-[0.5em] text-gray-500 mb-4">
          REGISTRO ARCANO
        </div>
        <h1 className="text-6xl font-thin tracking-[0.3em] mb-6">
          RUNAS
        </h1>
        <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <p className="text-gray-400 text-sm mt-8 max-w-xl mx-auto">
          Passe o cursor. Cada símbolo guarda um fragmento do conhecimento esquecido.
        </p>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {secrets.map(secret => {
            const isRevealed = revealedSections[secret.id];

            return (
              <div
                key={secret.id}
                onMouseEnter={() => handleMouseEnter(secret.id)}
                onMouseLeave={() => handleMouseLeave(secret.id)}
                className="relative h-72 border border-white/10 cursor-pointer overflow-hidden transition-all duration-700 hover:border-white"
              >

                {/* Selo rúnico de fundo */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                  isRevealed ? 'opacity-5' : 'opacity-20'
                }`}>
                  <span className="text-[10rem] font-bold text-white">
                    {secret.title}
                  </span>
                </div>

                {/* Cabeçalho */}
                <div className="absolute top-6 left-6 right-6 z-10">
                  <div className="text-xs tracking-widest text-gray-500 mb-2">
                    RUNA #{secret.id.toString().padStart(2, '0')}
                  </div>
                  <h2 className="text-xl tracking-wider">
                    {isRevealed ? secret.hint : '???'}
                  </h2>
                </div>

                {/* Conteúdo */}
                <div className={`absolute inset-0 flex items-center justify-center px-8 transition-all duration-700 ${
                  isRevealed ? 'opacity-100' : 'opacity-0'
                }`}>
                  <p className="text-center text-gray-300 leading-relaxed">
                    {secret.content}
                  </p>
                </div>

                {/* Indicador */}
                <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs tracking-widest">
                  <span className={`${isRevealed ? 'text-white' : 'text-gray-600'}`}>
                    {isRevealed ? 'DESVENDADO' : 'SELADO'}
                  </span>
                </div>

                {/* Aura de ativação */}
                {isRevealed && (
                  <div className="absolute inset-0 border border-white/30 pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Revelação final */}
        {totalRevealed === secrets.length && (
          <div className="mt-20 text-center">
            <div className="inline-block px-12 py-8 border border-white">
              <div className="text-xs tracking-[0.4em] mb-3">
                CONHECIMENTO COMPLETO
              </div>
              <p className="text-2xl font-thin">
                A Verdade Não Pode Ser Desconhecida
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-600 text-xs tracking-[0.4em]">
        ACESSO PERMITIDO APENAS AOS QUE BUSCAM
      </footer>
    </div>
  );
}

export default App;
