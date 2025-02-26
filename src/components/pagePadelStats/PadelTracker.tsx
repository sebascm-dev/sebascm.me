"use client";

import { useState, useEffect } from "react";
import { Volleyball } from "lucide-react";
import { motion } from "framer-motion";

type DayStatus = {
  date: string;
  played: boolean;
  resultados: number[]; // Lista de resultados para un mismo día
};

interface MatchPadel {
  fechaPartido: string; // Formato recibido: yyyy-mm-dd
  resultado: number; // 1 = Partido Ganado, 0 = Partido Perdido, 2 = Entrenamiento, 3 = Torneo
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const COLOR_MAP: Record<number, string> = {
  0: "#ed5c53", // Partido Perdido
  1: "#64a377", // Partido Ganado
  2: "#b5b670", // Entrenamiento
  3: "#4285F4"  // Torneo
};

// Función para formatear una fecha local a dd-mm-yyyy
function formatLocalDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Función para convertir la fecha del backend de yyyy-mm-dd a dd-mm-yyyy
function convertBackendDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

// Variantes para cada cuadrito usando la función de variantes con parámetro custom (índice)
const squareVariants = {
  hidden: { scale: 0 },
  animate: (custom: number) => ({
    scale: [0, 1.25, 1],
    transition: {
      delay: custom * 0.007,
      duration: 0.3,
      times: [0, 0.5, 1],
    },
  }),
};

export default function PadelTracker({ matchpadel = [] }: { matchpadel: MatchPadel[] }) {
  const [days, setDays] = useState<DayStatus[]>([]);

  useEffect(() => {
    if (!matchpadel || !Array.isArray(matchpadel) || matchpadel.length === 0) {
      setDays([]);
      return;
    }

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364);

    const playedDates = new Map<string, number[]>();
    matchpadel.forEach(match => {
      const dateFormatted = convertBackendDate(match.fechaPartido);
      if (!playedDates.has(dateFormatted)) {
        playedDates.set(dateFormatted, []);
      }
      playedDates.get(dateFormatted)!.push(match.resultado);
    });

    const daysArray = Array.from({ length: 365 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = formatLocalDate(date);

      return {
        date: dateString,
        played: playedDates.has(dateString),
        resultados: playedDates.get(dateString) ?? [],
      };
    });

    setDays(daysArray);
  }, [matchpadel]);

  const totalGanados = days.reduce((acc, day) => acc + day.resultados.filter(r => r === 1).length, 0);
  const totalPerdidos = days.reduce((acc, day) => acc + day.resultados.filter(r => r === 0).length, 0);
  const totalEntrenamiento = days.reduce((acc, day) => acc + day.resultados.filter(r => r === 2).length, 0);

  return (
    <div className="relative min-h-[400px] md:min-h-72 lg:min-h-64 border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
      <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1 mb-4">
        <Volleyball className="w-5 h-5 text-white" />
        <p className="mt-0.5 font-bold text-sm text-white">Padel Game Tracker</p>
      </header>

      <p className="my-4 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">
        Últimos 365 Días de Actividad
      </p>

      <div className="flex flex-col">
        <div className="flex mb-1">
          {MONTHS.map((month) => (
            <div key={month} className="flex-1 text-center text-xs text-gray-100/50">
              {month}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap">
        {days.map((day, index) => {
          const ganados = day.resultados.filter(r => r === 1).length;
          const perdidos = day.resultados.filter(r => r === 0).length;
          const entrenamientos = day.resultados.filter(r => r === 2).length;
          const torneos = day.resultados.filter(r => r === 3).length;

          const titleParts = [];
          if (ganados > 0) titleParts.push(`Ganados: ${ganados}`);
          if (perdidos > 0) titleParts.push(`Perdidos: ${perdidos}`);
          if (entrenamientos > 0) titleParts.push(`Entrenamientos: ${entrenamientos}`);
          if (torneos > 0) titleParts.push(`Torneos: ${torneos}`);

          return (
            <motion.div
              key={day.date}
              custom={index}
              initial="hidden"
              animate="animate"
              variants={squareVariants}
              className="w-3 h-3 m-[1px] rounded-sm cursor-pointer scale-100 hover:scale-125 transition-transform duration-300"
              style={{
                background: day.resultados.length > 1
                  ? `conic-gradient(${day.resultados.map((r, i) => `${COLOR_MAP[r] || '#6B7280'} ${(i / day.resultados.length) * 100}%, ${COLOR_MAP[r] || '#6B7280'} ${(i + 1) / day.resultados.length * 100}%`).join(", ")})`
                  : day.resultados.length === 1
                    ? COLOR_MAP[day.resultados[0]] || '#6B7280'
                    : "#2E2D2D",
              }}
              title={`${day.date}: ${day.played ? titleParts.join(", ") : "Sin Jugar"}`}
            ></motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-end text-xs text-gray-100/50 absolute bottom-4 right-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 m-[1px] rounded-sm bg-[#64a377]"></div>
          <span className="ml-1 mt-0.5">Ganados: {totalGanados}</span>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <div className="w-3 h-3 m-[1px] rounded-sm bg-[#ed5c53]"></div>
          <span className="ml-1 mt-0.5">Perdidos: {totalPerdidos}</span>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <div className="w-3 h-3 m-[1px] rounded-sm bg-[#b5b670]"></div>
          <span className="ml-1 mt-0.5">Entrenamiento: {totalEntrenamiento}</span>
        </div>
      </div>
    </div >
  );
}