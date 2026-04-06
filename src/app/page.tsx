import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jonax.dev — Herramientas gratuitas online",
  description:
    "Sorteador de nombres, equivalencias musicales y juego de memoria. Herramientas gratuitas y fáciles de usar.",
};

const tools = [
  {
    href: "/rifas",
    emoji: "🎲",
    title: "Sorteador de Nombres",
    description:
      "Realiza sorteos justos y transparentes. Pega tu lista de participantes, elige el número de ganadores y deja que la suerte decida.",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    accent: "text-indigo-600",
  },
  {
    href: "/musica",
    emoji: "🎵",
    title: "Equivalencias Musicales",
    description:
      "Aprende cómo se dividen las figuras musicales. Herramienta visual e interactiva para estudiantes de música de todos los niveles.",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    accent: "text-emerald-600",
  },
  {
    href: "/memorama",
    emoji: "🧠",
    title: "Memorama de Números",
    description:
      "Juego de memoria con números para niños. Elige cuántos pares quieres y a practicar. ¡Perfecto para aprender jugando!",
    bg: "bg-rose-50",
    border: "border-rose-100",
    accent: "text-rose-600",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Herramientas gratuitas para{" "}
          <span className="text-indigo-600">todos</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Sorteos, música y juegos educativos. Sin registros, sin costos, directo al grano.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`group rounded-2xl border ${tool.border} ${tool.bg} p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
          >
            <div className="text-4xl mb-4">{tool.emoji}</div>
            <h2 className={`text-lg font-bold text-gray-900 mb-2 group-hover:${tool.accent} transition-colors`}>
              {tool.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
            <div className={`mt-4 text-sm font-semibold ${tool.accent}`}>
              Usar herramienta →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
