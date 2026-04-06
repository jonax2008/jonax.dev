"use client";

import { useState, useCallback } from "react";
import AdBanner from "@/components/AdBanner";

type Card = {
  id: number;
  value: number;
  flipped: boolean;
  matched: boolean;
};

const PAIR_OPTIONS = [4, 6, 8, 12];

const PASTEL_COLORS = [
  "bg-pink-200",
  "bg-purple-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-orange-200",
  "bg-teal-200",
  "bg-indigo-200",
  "bg-rose-200",
  "bg-lime-200",
  "bg-cyan-200",
  "bg-fuchsia-200",
];

function createDeck(pairs: number): Card[] {
  const numbers = Array.from({ length: pairs }, (_, i) => i + 1);
  const doubled = [...numbers, ...numbers];
  const shuffled = doubled.sort(() => Math.random() - 0.5);
  return shuffled.map((value, id) => ({ id, value, flipped: false, matched: false }));
}

export default function MemoramaPage() {
  const [pairs, setPairs] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const startGame = (p: number) => {
    setPairs(p);
    setCards(createDeck(p));
    setSelected([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  };

  const handleFlip = useCallback(
    (id: number) => {
      if (locked) return;
      const card = cards[id];
      if (card.flipped || card.matched || selected.includes(id)) return;

      const newSelected = [...selected, id];
      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = newSelected;
        if (cards[a].value === card.value) {
          // match
          setCards((prev) => {
            const updated = prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c));
            if (updated.every((c) => c.matched)) setWon(true);
            return updated;
          });
          setSelected([]);
        } else {
          // no match — flip back after delay
          setLocked(true);
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === a || c.id === b ? { ...c, flipped: false } : c
              )
            );
            setSelected([]);
            setLocked(false);
          }, 1000);
        }
      }
    },
    [cards, selected, locked]
  );

  const cols = pairs === 4 ? "grid-cols-4" : pairs === 6 ? "grid-cols-4" : pairs === 8 ? "grid-cols-4" : "grid-cols-6";

  if (pairs === null) {
    return (
      <>
        <title>Memorama de Números para Niños | Jonax.dev</title>
        <div className="max-w-lg mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">🧠 Memorama de Números</h1>
          <p className="text-gray-500 mb-10">¿Cuántos pares quieres jugar?</p>
          <div className="grid grid-cols-2 gap-4">
            {PAIR_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => startGame(p)}
                className="py-6 rounded-2xl bg-white border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-700 font-extrabold text-2xl transition-all hover:scale-105 shadow-sm"
              >
                {p} pares
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Memorama de Números para Niños | Jonax.dev</title>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">🧠 Memorama</h1>
            <p className="text-sm text-gray-400">{pairs} pares · {moves} movimientos</p>
          </div>
          <button
            onClick={() => setPairs(null)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
          >
            Cambiar nivel
          </button>
        </div>

        {/* Win banner */}
        {won && (
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-yellow-100 to-green-100 border border-yellow-200 p-5 text-center">
            <p className="text-3xl mb-1">🎉</p>
            <p className="text-xl font-extrabold text-gray-900">¡Felicidades!</p>
            <p className="text-sm text-gray-600 mb-3">
              Completaste el juego en <strong>{moves} movimientos</strong>
            </p>
            <button
              onClick={() => startGame(pairs)}
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              Jugar de nuevo
            </button>
          </div>
        )}

        {/* Board */}
        <div className={`grid ${cols} gap-3`}>
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              disabled={card.matched || locked}
              className={`aspect-square rounded-2xl text-2xl font-extrabold transition-all duration-300 border-2 ${
                card.matched
                  ? `${PASTEL_COLORS[card.value - 1]} border-transparent opacity-60 scale-95`
                  : card.flipped
                  ? `${PASTEL_COLORS[card.value - 1]} border-transparent scale-105 shadow-md`
                  : "bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-transparent"
              }`}
            >
              {card.flipped || card.matched ? card.value : "?"}
            </button>
          ))}
        </div>

        {/* Ad banner — below game, non-intrusive */}
        <div className="mt-8">
          <AdBanner slot="3456789012" format="horizontal" />
        </div>
      </div>
    </>
  );
}
