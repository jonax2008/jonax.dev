"use client";

import { useState } from "react";
import AdBanner from "@/components/AdBanner";

// SVG note icons — drawn to work on all browsers/fonts
function NoteIcon({ id, color = "currentColor" }: { id: string; color?: string }) {
  const w = 48;
  const h = 56;
  // Shared oval dimensions
  const cx = 16, cy = 44, rx = 13, ry = 9;

  switch (id) {
    case "redonda":
      // Open oval, no stem
      return (
        <svg width={w} height={h} viewBox="0 0 48 56" fill="none">
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={color} strokeWidth="3" fill="none" />
        </svg>
      );
    case "blanca":
      // Open oval + stem
      return (
        <svg width={w} height={h} viewBox="0 0 48 56" fill="none">
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={color} strokeWidth="3" fill="none" />
          <line x1={cx + rx - 1} y1={cy} x2={cx + rx - 1} y2={cy - 36} stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "negra":
      // Filled oval + stem
      return (
        <svg width={w} height={h} viewBox="0 0 48 56" fill="none">
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} />
          <line x1={cx + rx - 1} y1={cy} x2={cx + rx - 1} y2={cy - 36} stroke={color} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "corchea":
      // Filled oval + stem + one flag
      return (
        <svg width={w} height={h} viewBox="0 0 48 56" fill="none">
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} />
          <line x1={cx + rx - 1} y1={cy} x2={cx + rx - 1} y2={cy - 36} stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d={`M${cx + rx - 1} ${cy - 36} Q${cx + rx + 18} ${cy - 26} ${cx + rx + 8} ${cy - 16}`} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "semicorchea":
      // Filled oval + stem + two flags
      return (
        <svg width={w} height={h} viewBox="0 0 48 56" fill="none">
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} />
          <line x1={cx + rx - 1} y1={cy} x2={cx + rx - 1} y2={cy - 36} stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d={`M${cx + rx - 1} ${cy - 36} Q${cx + rx + 18} ${cy - 26} ${cx + rx + 8} ${cy - 16}`} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M${cx + rx - 1} ${cy - 26} Q${cx + rx + 18} ${cy - 16} ${cx + rx + 8} ${cy - 6}`} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

// Internal values: Redonda = 16 units (for math). Display uses universal fractions.
const FIGURES = [
  { id: "redonda",    label: "Redonda",    value: 16, fraction: "1",    fractionLabel: "unidad",        color: "bg-amber-100 border-amber-300 text-amber-800",   svgColor: "#92400e" },
  { id: "blanca",     label: "Blanca",     value: 8,  fraction: "1/2",  fractionLabel: "medio",         color: "bg-sky-100 border-sky-300 text-sky-800",         svgColor: "#075985" },
  { id: "negra",      label: "Negra",      value: 4,  fraction: "1/4",  fractionLabel: "cuarto",        color: "bg-violet-100 border-violet-300 text-violet-800", svgColor: "#4c1d95" },
  { id: "corchea",    label: "Corchea",    value: 2,  fraction: "1/8",  fractionLabel: "octavo",        color: "bg-emerald-100 border-emerald-300 text-emerald-800", svgColor: "#064e3b" },
  { id: "semicorchea",label: "Semicorchea",value: 1,  fraction: "1/16", fractionLabel: "dieciseisavo",  color: "bg-rose-100 border-rose-300 text-rose-800",      svgColor: "#881337" },
] as const;

// Converts internal units to a human-readable fractional string.
// Largest unit shown: cuartos (÷4). Smallest: dieciseisavos (÷1).
function formatRemaining(units: number): string {
  if (units <= 0) return "";
  if (units % 4 === 0) {
    const n = units / 4;
    return `${n} ${n === 1 ? "cuarto" : "cuartos"}`;
  }
  return `${units} ${units === 1 ? "dieciseisavo" : "dieciseisavos"}`;
}

type FigureId = (typeof FIGURES)[number]["id"];

const BASE_FIGURES: FigureId[] = ["redonda", "blanca", "negra"];
const FILL_FIGURES: FigureId[] = ["blanca", "negra", "corchea", "semicorchea"];

export default function MusicaPage() {
  const [base, setBase] = useState<FigureId>("redonda");
  const [added, setAdded] = useState<FigureId[]>([]);

  const baseFigure = FIGURES.find((f) => f.id === base)!;
  const totalFill = added.reduce((acc, id) => acc + FIGURES.find((f) => f.id === id)!.value, 0);
  const remaining = baseFigure.value - totalFill;
  const progress = Math.min((totalFill / baseFigure.value) * 100, 100);
  const isFull = totalFill === baseFigure.value;
  const isOver = totalFill > baseFigure.value;

  const addFigure = (id: FigureId) => {
    const fig = FIGURES.find((f) => f.id === id)!;
    if (totalFill + fig.value <= baseFigure.value) {
      setAdded((prev) => [...prev, id]);
    }
  };

  const reset = () => setAdded([]);

  const availableFills = FILL_FIGURES.filter((id) => {
    const fig = FIGURES.find((f) => f.id === id)!;
    return fig.value <= baseFigure.value && fig.value < baseFigure.value;
  });

  return (
    <>
      <title>Equivalencias Musicales Interactivas | Jonax.dev</title>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🎵 Equivalencias Musicales</h1>
        <p className="text-gray-500 mb-8">
          Elige una figura base y combina figuras menores hasta completar su valor.
        </p>

        {/* Base selector */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">Figura base:</p>
          <div className="flex gap-3 flex-wrap">
            {BASE_FIGURES.map((id) => {
              const fig = FIGURES.find((f) => f.id === id)!;
              return (
                <button
                  key={id}
                  onClick={() => { setBase(id); reset(); }}
                  className={`flex flex-col items-center px-5 py-3 rounded-xl border-2 transition-all font-semibold text-sm ${
                    base === id
                      ? `${fig.color} scale-105 shadow`
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <NoteIcon id={fig.id} color={base === id ? fig.svgColor : "#9ca3af"} />
                  {fig.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-gray-700">
              {baseFigure.label} <span className="font-normal text-gray-400">({baseFigure.fraction} — 1 {baseFigure.fractionLabel})</span>
            </span>
            <span className={isOver ? "text-red-500 font-bold" : isFull ? "text-emerald-600 font-bold" : "text-gray-400"}>
              {isFull ? "¡Completo! 🎉" : isOver ? "¡Te pasaste!" : `Faltan ${formatRemaining(remaining)}`}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full transition-all duration-300 ${
                isOver ? "bg-red-400" : isFull ? "bg-emerald-400" : "bg-indigo-400"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Added figures */}
          {added.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {added.map((id, i) => {
                const fig = FIGURES.find((f) => f.id === id)!;
                return (
                  <span key={i} className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-semibold ${fig.color}`}>
                    <NoteIcon id={fig.id} color={fig.svgColor} />
                    {fig.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Fill buttons */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Agregar figura:</p>
          <div className="flex gap-3 flex-wrap">
            {availableFills.map((id) => {
              const fig = FIGURES.find((f) => f.id === id)!;
              const canAdd = totalFill + fig.value <= baseFigure.value;
              return (
                <button
                  key={id}
                  onClick={() => addFigure(id)}
                  disabled={!canAdd || isFull}
                  className={`flex flex-col items-center px-4 py-2 rounded-xl border-2 text-xs font-semibold transition-all ${
                    canAdd && !isFull
                      ? `${fig.color} hover:scale-105 hover:shadow`
                      : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  <NoteIcon id={fig.id} color={canAdd && !isFull ? fig.svgColor : "#d1d5db"} />
                  {fig.label}
                  <span className="text-xs opacity-60">({fig.fraction})</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={reset}
          className="text-sm text-gray-400 hover:text-indigo-600 underline"
        >
          Reiniciar
        </button>

        {/* Equivalences table */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Figura</th>
                <th className="text-center px-4 py-3">Símbolo</th>
                <th className="text-center px-4 py-3">Valor</th>
                <th className="text-center px-4 py-3">Nombre</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FIGURES.map((fig) => (
                <tr key={fig.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{fig.label}</td>
                  <td className="px-4 py-3 flex justify-center"><NoteIcon id={fig.id} color={fig.svgColor} /></td>
                  <td className="px-4 py-3 text-center font-mono text-gray-700">{fig.fraction}</td>
                  <td className="px-4 py-3 text-center text-gray-500 capitalize">{fig.fractionLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ad */}
        <div className="mt-8">
          <AdBanner slot="2345678901" format="horizontal" />
        </div>

        {/* SEO Guide — 400 words */}
        <section className="mt-12 text-gray-600 text-sm leading-relaxed space-y-4">
          <h2 className="text-xl font-bold text-gray-900">
            Guía Completa de Figuras y Tiempos Musicales
          </h2>
          <p>
            Las figuras musicales son los símbolos que utilizamos en la notación musical para
            indicar la <strong>duración</strong> de cada nota. Entender sus equivalencias es
            fundamental para leer partituras, componer y tocar cualquier instrumento con ritmo
            correcto. A continuación te explicamos cada figura, cuánto dura y cómo se relaciona
            con las demás.
          </p>
          <h3 className="font-semibold text-gray-800">La Redonda: la figura más larga</h3>
          <p>
            La <strong>redonda</strong> (whole note en inglés) es la figura de mayor duración en
            el sistema de notación moderno. Su valor equivale a <strong>4 tiempos</strong> en un
            compás de 4/4, o más precisamente, a 4 negras. Visualmente es un óvalo hueco sin
            plica (el palito vertical). Cuando ves una redonda, debes sostener la nota durante
            todo el compás.
          </p>
          <h3 className="font-semibold text-gray-800">La Blanca: media redonda</h3>
          <p>
            La <strong>blanca</strong> (half note) vale la mitad de una redonda: 2 tiempos. Se
            distingue de la redonda porque tiene una plica. Para &quot;llenar&quot; el valor de
            una redonda necesitas <strong>2 blancas</strong>. Es muy común en géneros tranquilos
            como baladas y piezas clásicas lentas.
          </p>
          <h3 className="font-semibold text-gray-800">La Negra: la unidad de tiempo</h3>
          <p>
            La <strong>negra</strong> (quarter note) es la figura que más frecuentemente se usa
            como unidad de pulso. Vale 1 tiempo en la mayoría de los compases (4/4, 3/4, 2/4).
            Una redonda equivale a <strong>4 negras</strong> y una blanca equivale a{" "}
            <strong>2 negras</strong>. Cuando un metrónomo marca el tempo, generalmente lo hace
            en negras.
          </p>
          <h3 className="font-semibold text-gray-800">La Corchea: la mitad de una negra</h3>
          <p>
            La <strong>corchea</strong> (eighth note) dura la mitad de una negra. Se reconoce
            por tener una plica con un corchete (o &quot;rabo&quot;) al final. Necesitas{" "}
            <strong>8 corcheas</strong> para completar una redonda y <strong>2 corcheas</strong>{" "}
            para equivaler a una negra. Son muy usadas en ritmos ágiles como el rock, la cumbia
            y la música pop.
          </p>
          <h3 className="font-semibold text-gray-800">La Semicorchea: rapidez y agilidad</h3>
          <p>
            La <strong>semicorchea</strong> (sixteenth note) dura la mitad de una corchea y la
            cuarta parte de una negra. Tiene dos corchetes en su plica. Son frecuentes en
            melodías rápidas, solos de guitarra y pasajes de virtuosismo. Se necesitan{" "}
            <strong>16 semicorcheas</strong> para completar una redonda.
          </p>
          <h3 className="font-semibold text-gray-800">Cómo usar esta herramienta para aprender</h3>
          <p>
            Selecciona una figura base (Redonda, Blanca o Negra) y luego ve agregando figuras
            menores hasta completar el valor total. Esta práctica visual te ayuda a interiorizar
            las relaciones matemáticas entre figuras. Con el tiempo, reconocerás de forma
            intuitiva cuántas corcheas caben en una blanca, o cuántas semicorcheas equivalen a
            una negra, lo cual es esencial para improvisar y leer partituras con fluidez.
          </p>
        </section>
      </div>
    </>
  );
}
