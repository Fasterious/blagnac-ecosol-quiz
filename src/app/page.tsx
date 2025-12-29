"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, X, Minus, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { questions } from "./data";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState(0); // -1 gauche, 0 neutre, 1 droite
  const [isFinished, setIsFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Calcul de l'avancement
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSwipe = (dir: number) => {
    setDirection(dir);
    
    // Logique de points : 
    // Droite (D'accord) = 1 pt
    // Centre (Neutre) = 0.5 pt
    // Gauche (Pas d'accord) = 0 pt
    let points = 0;
    if (dir === 1) points = 1;
    if (dir === 0) points = 0.5;

    // Délai pour l'animation
    setTimeout(() => {
      const newScore = score + points;
      setScore(newScore);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setDirection(0);
      } else {
        setIsFinished(true);
        // Calculer le pourcentage final pour le confetti
        const finalPercent = Math.round((newScore / questions.length) * 100);
        setTimeout(() => {
          if (finalPercent > 50) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }, 300);
      }
    }, 200);
  };

  const getFinalMessage = () => {
    const percent = Math.round((score / questions.length) * 100);
    if (percent >= 80) return { title: "C'est un Match ! 💚", text: "Vous êtes totalement en phase avec le programme EcoSol. Blagnac a besoin de vous !", color: "text-green-600" };
    if (percent >= 50) return { title: "On est sur la bonne voie ! 🤔", text: "Vous partagez l'essentiel de nos valeurs pour un Blagnac plus vert et solidaire.", color: "text-blue-600" };
    return { title: "Des avis divergents...", text: "C'est ça la démocratie ! Certaines de nos propositions pourraient quand même vous surprendre.", color: "text-orange-600" };
  };

  const handleShare = async () => {
    const percent = Math.round((score / questions.length) * 100);
    const text = `Je matche à ${percent}% avec le futur de Blagnac ! Fais le test EcoSol toi aussi :`;
    const url = "https://blagnac-ecosol-2026.fr"; // Mettre l'URL finale ici

    if (navigator.share) {
      try {
        await navigator.share({ title: "Mon Match EcoSol", text, url });
      } catch (err) {
        console.error("Erreur partage", err);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        alert("Lien copié dans le presse-papier !");
      });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous connecterez une API (ex: Formspree, Brevo ou votre propre API)
    // Pour l'instant, on simule :
    setEmailSent(true);
    console.log("Email capturé:", email);
  };

  // --- ECRAN DE RESULTAT ---
  if (isFinished) {
    const percent = Math.round((score / questions.length) * 100);
    const msg = getFinalMessage();

    return (
      <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Votre Résultat</h1>
          
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="#e2e8f0" strokeWidth="10" fill="transparent" />
              <circle cx="80" cy="80" r="70" stroke="#16a34a" strokeWidth="10" fill="transparent" 
                strokeDasharray={440} 
                strokeDashoffset={440 - (440 * percent) / 100} 
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-4xl font-black text-green-600">{percent}%</span>
          </div>

          <div>
            <h2 className={`text-xl font-bold ${msg.color} mb-2`}>{msg.title}</h2>
            <p className="text-gray-600">{msg.text}</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            {!emailSent ? (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Restons en contact pour la suite !</p>
                <input 
                  type="email" 
                  placeholder="votre@email.com" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                  Rejoindre le mouvement <ChevronRight size={20}/>
                </button>
              </form>
            ) : (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                Merci ! On vous recontacte très vite.
              </div>
            )}
          </div>

          <button onClick={handleShare} className="w-full border-2 border-green-600 text-green-600 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-50 transition">
            <Share2 size={20}/> Partager mon score
          </button>
          
          <a href="https://blagnac-ecosol-2026.fr/" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-green-600 underline mt-4">
            Lire le programme complet
          </a>
        </div>
      </main>
    );
  }

  // --- ECRAN DU QUIZ ---
  const currentQ = questions[currentIndex];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-500 to-teal-700 flex flex-col items-center justify-center p-4 overflow-hidden">
      
      {/* Header */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center text-white/90">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wider opacity-75">{currentQ.theme}</span>
          <span className="font-bold">Question {currentIndex + 1}/{questions.length}</span>
        </div>
        <div className="h-10 w-10 rounded-full border-2 border-white/30 flex items-center justify-center font-bold">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md relative h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ 
              x: direction === 1 ? 500 : direction === -1 ? -500 : 0, 
              y: direction === 0 ? -500 : 0,
              opacity: 0, 
              rotate: direction === 1 ? 20 : direction === -1 ? -20 : 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-center items-center text-center cursor-grab"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wide">
                {currentQ.theme}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-6">
              {currentQ.text}
            </h2>
            
            <p className="text-sm text-gray-400 mt-auto">
              EcoSol Blagnac 2026
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="w-full max-w-md mt-8 grid grid-cols-3 gap-6">
        <button 
          onClick={() => handleSwipe(-1)}
          className="group flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-full bg-white text-red-500 shadow-lg flex items-center justify-center text-2xl group-active:scale-90 transition transform hover:bg-red-50">
            <X size={32} />
          </div>
          <span className="text-white text-sm font-medium opacity-80">Pas d'accord</span>
        </button>

        <button 
          onClick={() => handleSwipe(0)}
          className="group flex flex-col items-center gap-2 mt-4"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 text-white backdrop-blur-sm flex items-center justify-center group-active:scale-90 transition transform hover:bg-white/30">
            <Minus size={24} />
          </div>
          <span className="text-white text-sm font-medium opacity-80">Neutre</span>
        </button>

        <button 
          onClick={() => handleSwipe(1)}
          className="group flex flex-col items-center gap-2"
        >
          <div className="w-16 h-16 rounded-full bg-white text-green-600 shadow-lg flex items-center justify-center text-2xl group-active:scale-90 transition transform hover:bg-green-50">
            <Check size={32} />
          </div>
          <span className="text-white text-sm font-medium opacity-80">D'accord</span>
        </button>
      </div>

    </main>
  );
}


