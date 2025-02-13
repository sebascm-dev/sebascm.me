"use client";

import { useState, useEffect } from "react";
import { Volleyball } from "lucide-react";
import { motion } from "framer-motion";

type DayStatus = {
  date: string;
  played: boolean;
  resultado?: number; // 1 = Partido Ganado, 0 = Partido Perdido, 2 = Entrenamiento, 3 = Torneo
};

interface MatchPadel {
  fechaPartido: string; // Formato recibido: yyyy-mm-dd
  resultado: number; // 1 = Partido Ganado, 0 = Partido Perdido, 2 = Entrenamiento, 3 = Torneo
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

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
      // Cada cuadrito espera un retardo basado en su índice
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

    // Obtenemos la fecha de hoy y calculamos la fecha de inicio (hace 364 días)
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364);

    // Creamos un Map para asociar cada fecha jugada con su resultado
    const playedDates = new Map<string, number>();
    matchpadel.forEach(match => {
      const dateFormatted = convertBackendDate(match.fechaPartido);
      playedDates.set(dateFormatted, match.resultado);
    });

    // Generamos los últimos 365 días en formato dd-mm-yyyy
    const daysArray = Array.from({ length: 365 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateString = formatLocalDate(date);

      return {
        date: dateString,
        played: playedDates.has(dateString),
        resultado: playedDates.get(dateString),
      };
    });

    setDays(daysArray);
  }, [matchpadel]);

  // Calcular totales de cada tipo de actividad
  const totalGanados = days.filter(day => day.played && day.resultado === 1).length;
  const totalPerdidos = days.filter(day => day.played && day.resultado === 0).length;
  const totalEntrenamiento = days.filter(day => day.played && day.resultado === 2).length;
  const totalTorneo = days.filter(day => day.played && day.resultado === 3).length;

  return (
    <div className="relative min-h-[400px] md:min-h-72 lg:min-h-64 border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
      <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1 mb-4">
        <Volleyball className="w-5 h-5 text-white" />
        <p className="mt-0.5 font-bold text-sm text-white">Padel Game Tracker</p>
      </header>

      <article className="">
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

          {/* Contenedor de cuadritos con min-height para reservar el espacio */}
          <div className="flex flex-wrap">
            {days.map((day, index) => (
              <motion.div
                key={day.date}
                custom={index} // Pasamos el índice para usarlo en el retardo
                initial="hidden"
                animate="animate"
                variants={squareVariants}
                className={`w-3 h-3 m-[1px] rounded-sm cursor-pointer scale-100 hover:scale-125 transition-transform duration-300 ${
                  day.played
                    ? day.resultado === 0
                      ? "bg-red-500"
                      : day.resultado === 2
                        ? "bg-yellow-500"
                        : day.resultado === 3
                          ? "bg-blue-500"
                          : "bg-green-500"
                    : "bg-[#2E2D2D]"
                }`}
                title={`${day.date}: ${day.played
                  ? day.resultado === 0
                    ? "Partido Perdido"
                    : day.resultado === 2
                      ? "Entrenamiento"
                      : day.resultado === 3
                        ? "Torneo"
                        : "Partido Ganado"
                  : "Sin Jugar"
                }`}
              ></motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end text-xs text-gray-100/50 absolute bottom-4 right-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 m-[1px] rounded-sm bg-green-500"></div>
            <span className="ml-1 mt-0.5">Ganados: {totalGanados}</span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <div className="w-3 h-3 m-[1px] rounded-sm bg-red-500"></div>
            <span className="ml-1 mt-0.5">Perdidos: {totalPerdidos}</span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <div className="w-3 h-3 m-[1px] rounded-sm bg-yellow-500"></div>
            <span className="ml-1 mt-0.5">Entrenamiento: {totalEntrenamiento}</span>
          </div>
        </div>
      </article>
    </div>
  );
}
