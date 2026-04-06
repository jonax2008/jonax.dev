"use client";

import { useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import AdBanner from "@/components/AdBanner";

type Phase = "setup" | "drawing" | "done";

interface DrawState {
  pool: string[];           // names still available
  currentPrize: number;    // 1-based prize index
  currentAttempt: number;  // 1-based attempt within this prize
  eliminated: string[];    // discarded in the CURRENT prize round (for display)
  allUsed: string[];       // all names drawn across ALL rounds (eliminated + winners)
  winners: string[];       // confirmed winners so far
}

const fireConfetti = () =>
  confetti({ particleCount: 160, spread: 90, origin: { y: 0.55 } });

export default function RifasPage() {
  const [names, setNames] = useState("");
  const [numWinners, setNumWinners] = useState(1);
  const [attempts, setAttempts] = useState(3);

  const [phase, setPhase] = useState<Phase>("setup");
  const [draw, setDraw] = useState<DrawState | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [lastDrawn, setLastDrawn] = useState<{ name: string; isWinner: boolean } | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getNameList = useCallback(
    () =>
      names
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean),
    [names]
  );

  // ── Validate & start ──────────────────────────────────────────────
  const handleStart = () => {
    const list = getNameList();
    if (list.length < 2) { alert("Ingresa al menos 2 nombres."); return; }
    if (numWinners >= list.length) { alert("El número de ganadores debe ser menor que la lista."); return; }
    if (attempts < 1) { alert("El número de intentos debe ser al menos 1."); return; }
    if (numWinners * attempts > list.length) {
      alert(`Con ${numWinners} premios y ${attempts} intentos necesitas al menos ${numWinners * attempts} participantes.`);
      return;
    }

    const shuffled = [...list].sort(() => Math.random() - 0.5);
    setDraw({
      pool: shuffled,
      currentPrize: 1,
      currentAttempt: 1,
      eliminated: [],
      allUsed: [],
      winners: [],
    });
    setLastDrawn(null);
    setDisplayName("");
    setPhase("drawing");
  };

  // ── Draw one name ─────────────────────────────────────────────────
  const handleDraw = useCallback(() => {
    if (!draw || spinning) return;

    const { pool, currentAttempt, currentPrize, eliminated, allUsed, winners } = draw;
    const isWinningAttempt = currentAttempt === attempts;

    setSpinning(true);
    setLastDrawn(null);

    let count = 0;
    const totalSpins = 28;

    intervalRef.current = setInterval(() => {
      setDisplayName(pool[Math.floor(Math.random() * pool.length)]);
      count++;

      if (count >= totalSpins) {
        clearInterval(intervalRef.current!);

        // Pick a random name from the pool
        const pickedIndex = Math.floor(Math.random() * pool.length);
        const picked = pool[pickedIndex];
        const newPool = pool.filter((_, i) => i !== pickedIndex);

        setDisplayName(picked);
        setSpinning(false);
        setLastDrawn({ name: picked, isWinner: isWinningAttempt });

        if (isWinningAttempt) {
          const newWinners = [...winners, picked];
          const newAllUsed = [...allUsed, picked];
          fireConfetti();

          if (newWinners.length === numWinners) {
            setDraw({ ...draw, pool: newPool, winners: newWinners, allUsed: newAllUsed, eliminated: [] });
            setPhase("done");
          } else {
            // Next prize — pool already excludes ALL previously drawn names
            setDraw({
              pool: newPool,
              currentPrize: currentPrize + 1,
              currentAttempt: 1,
              eliminated: [],
              allUsed: newAllUsed,
              winners: newWinners,
            });
          }
        } else {
          // Eliminated — remove from pool permanently
          setDraw({
            ...draw,
            pool: newPool,
            currentAttempt: currentAttempt + 1,
            eliminated: [...eliminated, picked],
            allUsed: [...allUsed, picked],
          });
        }
      }
    }, 55);
  }, [draw, spinning, attempts, numWinners]);

  const handleReset = () => {
    setPhase("setup");
    setDraw(null);
    setLastDrawn(null);
    setDisplayName("");
  };

  // ── Setup screen ──────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <>
        <title>Sorteador de Nombres Online Gratis | Jonax.dev</title>
        <div className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🎲 Sorteador de Nombres</h1>
          <p className="text-gray-500 mb-8">
            Sortea nombre por nombre. Tú decides cuántos intentos antes de revelar al ganador.
          </p>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Lista de participantes <span className="text-gray-400 font-normal">(uno por línea)</span>
            </label>
            <textarea
              className="w-full h-36 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              placeholder={"Ana García\nCarlos López\nMaría Rodríguez\n..."}
              value={names}
              onChange={(e) => setNames(e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">
              {getNameList().length} participante{getNameList().length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Número de premios
              </label>
              <input
                type="number" min={1} max={20} value={numWinners}
                onChange={(e) => setNumWinners(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                El ganador sale en el intento #
              </label>
              <input
                type="number" min={1} max={50} value={attempts}
                onChange={(e) => setAttempts(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <p className="text-xs text-gray-400 mt-1">
                {attempts === 1
                  ? "El primero en salir gana."
                  : `Los primeros ${attempts - 1} son descartados. El #${attempts} gana.`}
              </p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all"
          >
            Iniciar sorteo →
          </button>

          <SeoFaq />
        </div>
      </>
    );
  }

  // ── Drawing screen ────────────────────────────────────────────────
  const isWinnerJustDrawn = lastDrawn?.isWinner === true;
  const isDone = phase === "done";

  return (
    <>
      <title>Sorteador de Nombres Online Gratis | Jonax.dev</title>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">🎲 Sorteador</h1>
          <button
            onClick={handleReset}
            className="text-sm text-gray-400 hover:text-indigo-600 underline"
          >
            Reiniciar
          </button>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {Array.from({ length: numWinners }).map((_, i) => {
            const prizeNum = i + 1;
            const won = draw!.winners[i];
            const isCurrent = draw!.currentPrize === prizeNum && !isDone;
            return (
              <div
                key={i}
                className={`flex-1 min-w-[80px] rounded-xl border-2 px-3 py-2 text-center text-xs font-semibold transition-all ${
                  won
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : isCurrent
                    ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                    : "border-gray-200 bg-white text-gray-400"
                }`}
              >
                {won ? (
                  <>🏆 {won}</>
                ) : (
                  <>Premio {prizeNum}{isCurrent ? ` — intento ${draw!.currentAttempt}/${attempts}` : ""}</>
                )}
              </div>
            );
          })}
        </div>

        {/* Animation display */}
        <div className="rounded-2xl bg-white border border-gray-200 p-8 text-center shadow-sm mb-5 min-h-[180px] flex flex-col items-center justify-center">
          {spinning ? (
            <>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Sorteando...</p>
              <p className="text-4xl font-extrabold text-indigo-600 animate-pulse">{displayName}</p>
            </>
          ) : lastDrawn ? (
            <>
              {lastDrawn.isWinner ? (
                <>
                  <p className="text-xs text-emerald-500 uppercase tracking-widest font-bold mb-2">
                    ¡Ganador del Premio {draw!.winners.length}!
                  </p>
                  <p className="text-4xl font-extrabold text-emerald-600 mb-1">{lastDrawn.name}</p>
                  <p className="text-xs text-gray-400">Intento #{attempts} — ¡es el elegido! 🎉</p>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                    Intento #{draw!.currentAttempt - 1} — descartado
                  </p>
                  <p className="text-3xl font-extrabold text-gray-300 line-through">{lastDrawn.name}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Siguiente: intento #{draw!.currentAttempt} de {attempts}
                  </p>
                </>
              )}
            </>
          ) : (
            <p className="text-gray-400 text-sm">
              Presiona <span className="font-semibold text-indigo-500">Sortear intento</span> para comenzar
            </p>
          )}
        </div>

        {/* Eliminated list — current round */}
        {draw!.eliminated.length > 0 && (
          <div className="mb-3 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Descartados — Premio {draw!.currentPrize}
            </p>
            <div className="flex flex-wrap gap-2">
              {draw!.eliminated.map((name, i) => (
                <span key={i} className="text-xs bg-white border border-gray-200 text-gray-400 line-through rounded-lg px-2 py-1">
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* All used names from previous rounds */}
        {draw!.allUsed.filter(n => !draw!.eliminated.includes(n) && !draw!.winners.includes(n)).length > 0 && (
          <div className="mb-5 rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Ya no participan — rondas anteriores
            </p>
            <div className="flex flex-wrap gap-2">
              {draw!.allUsed
                .filter(n => !draw!.eliminated.includes(n) && !draw!.winners.includes(n))
                .map((name, i) => (
                  <span key={i} className="text-xs bg-white border border-gray-100 text-gray-300 line-through rounded-lg px-2 py-1">
                    {name}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Action button */}
        {isDone ? (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center mb-6">
            <p className="text-lg font-extrabold text-emerald-700 mb-3">🎉 Sorteo finalizado</p>
            <div className="space-y-1 mb-4">
              {draw!.winners.map((w, i) => (
                <p key={i} className="text-sm font-semibold text-emerald-800">
                  🏆 Premio {i + 1}: {w}
                </p>
              ))}
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              Nuevo sorteo
            </button>
          </div>
        ) : (
          <button
            onClick={handleDraw}
            disabled={spinning || isWinnerJustDrawn}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all active:scale-95 ${
              isWinnerJustDrawn
                ? "bg-emerald-500 text-white cursor-default"
                : "bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60 disabled:cursor-not-allowed"
            }`}
          >
            {spinning
              ? "Sorteando..."
              : isWinnerJustDrawn
              ? draw!.winners.length < numWinners
                ? "Continuar con el siguiente premio →"
                : "¡Todos los premios entregados!"
              : `🎲 Sortear intento #${draw!.currentAttempt}`}
          </button>
        )}

        {/* Continue to next prize after winner drawn */}
        {isWinnerJustDrawn && !isDone && draw!.winners.length < numWinners && (
          <button
            onClick={() => setLastDrawn(null)}
            className="w-full mt-3 py-3 rounded-xl border-2 border-indigo-200 text-indigo-600 font-bold text-base hover:bg-indigo-50 transition-all"
          >
            Siguiente premio (Premio {draw!.currentPrize}) →
          </button>
        )}

        <div className="mt-8">
          <AdBanner slot="1234567890" format="horizontal" />
        </div>

        <SeoFaq />
      </div>
    </>
  );
}

function SeoFaq() {
  return (
    <section className="mt-12 prose prose-sm max-w-none text-gray-600">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Preguntas frecuentes: ¿Cómo hacer un sorteo transparente online?
      </h2>
      <div className="space-y-5">
        <div>
          <h3 className="font-semibold text-gray-800">¿Qué significa &quot;el ganador sale en el intento #X&quot;?</h3>
          <p>
            Es la dinámica clásica de &quot;el quinto en salir gana&quot;. Si configuras 5 intentos,
            los primeros 4 nombres sorteados quedan descartados y el quinto es el ganador.
            Esto añade emoción y transparencia al sorteo.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">¿Este sorteador es realmente aleatorio?</h3>
          <p>
            Sí. Cada intento extrae un nombre al azar del grupo restante usando{" "}
            <code>Math.random()</code>. Una vez descartado, ese nombre no puede volver a salir,
            garantizando equidad en todo el proceso.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">¿Cómo garantizo la transparencia ante mi audiencia?</h3>
          <p>
            Graba tu pantalla o comparte el link de Jonax.dev con tu audiencia para que vean
            el proceso en tiempo real, intento por intento.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">¿Puedo sortear múltiples premios?</h3>
          <p>
            Sí. Configura el número de premios y el sorteo repetirá el proceso automáticamente
            para cada uno, removiendo a los ganadores anteriores del grupo.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">¿Mis datos son privados?</h3>
          <p>
            Absolutamente. Los nombres nunca salen de tu navegador. No almacenamos ni
            transmitimos ninguna información personal.
          </p>
        </div>
      </div>
    </section>
  );
}
