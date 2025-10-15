"use client";

import { useState, useEffect, useRef } from "react";
import { Volleyball, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Modal from 'react-modal';
import ResultsMatch from './ResultsMatch';
import { toPng } from 'html-to-image';

type DayStatus = {
  date: string;
  played: boolean;
  resultados: number[]; // Lista de resultados para un mismo día
};

interface MatchPadel {
  id: number; // Unique identifier for the match
  fechaPartido: string; // Formato recibido: yyyy-mm-dd
  resultado: number; // 1 = Partido Ganado, 0 = Partido Perdido, 2 = Entrenamiento, 3 = Torneo
  horaPartido?: string | null; // Formato recibido: hh:mm:ss
}

const MONTHS = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayStatus | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const trackerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchpadel || !Array.isArray(matchpadel) || matchpadel.length === 0) {
      setDays([]);
      return;
    }

    const today = new Date();
    
    // Total de días a mostrar (52 semanas = 364 días)
    const totalDays = 52 * 7;
    
    // Fecha de inicio: retroceder 364 días desde hoy
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalDays + 1);
    
    // Ajustar para empezar en lunes (día 1)
    const startDayOfWeek = startDate.getDay();
    const daysToMonday = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    startDate.setDate(startDate.getDate() - daysToMonday);
    
    // Calcular cuántos días incluir hasta hoy desde el domingo de inicio
    const endDate = new Date(today);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const playedDates = new Map<string, number[]>();
    matchpadel.forEach(match => {
      const dateFormatted = convertBackendDate(match.fechaPartido);
      if (!playedDates.has(dateFormatted)) {
        playedDates.set(dateFormatted, []);
      }
      playedDates.get(dateFormatted)!.push(match.resultado);
    });

    // Crear array de días desde startDate hasta hoy
    const daysArray = Array.from({ length: daysDiff }, (_, i) => {
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

  const openModal = (day: DayStatus) => {
    setSelectedDay(day);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDay(null);
  };

  const handleShare = async () => {
    if (!trackerRef.current) return;

    try {
      // Ocultar el botón antes de capturar
      setIsCapturing(true);
      
      // Esperar a que se oculte el botón
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const dataUrl = await toPng(trackerRef.current, {
        cacheBust: true,
        backgroundColor: '#1C1C1C',
        pixelRatio: 2,
        skipFonts: false,
      });

      // Mostrar el botón de nuevo
      setIsCapturing(false);

      // Convertir dataUrl a blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'padel-tracker.png', { type: 'image/png' });

      // Intentar usar Web Share API si está disponible
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mi Padel Tracker',
          text: 'Mira mi seguimiento de partidos de pádel',
        });
      } else {
        // Fallback: descargar la imagen
        const link = document.createElement('a');
        link.download = 'padel-tracker.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      setIsCapturing(false);
    }
  };

  // Organizar días en semanas (cada semana = 7 días en columna, empezando en lunes)
  const allWeeks = [];
  for (let i = 0; i < days.length; i += 7) {
    allWeeks.push(days.slice(i, i + 7));
  }

  // Desktop: últimos 10 meses (~43 semanas), Mobile: últimas 13 semanas
  const weeksDesktop = allWeeks.slice(-43);
  const weeksMobile = allWeeks.slice(-13);

  // Calcular etiquetas de meses para desktop
  const monthLabelsDesktop: Array<{ month: string; weekIndex: number } | null> = [];
  let lastMonthDesktop = -1;
  
  weeksDesktop.forEach((week, index) => {
    if (week.length === 0) {
      monthLabelsDesktop.push(null);
      return;
    }
    
    const firstDay = week[0].date;
    const [day, month] = firstDay.split('-');
    const currentMonth = parseInt(month) - 1;
    
    if (currentMonth !== lastMonthDesktop && parseInt(day) <= 7) {
      monthLabelsDesktop.push({ month: MONTHS[currentMonth], weekIndex: index });
      lastMonthDesktop = currentMonth;
    } else {
      monthLabelsDesktop.push(null);
    }
  });

  return (
    <div ref={trackerRef} className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-full flex flex-col hover:border-[#EDEDED]/30 transition-colors duration-300">
      <header className="flex flex-row gap-2 items-center justify-between mb-6">
        <div className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1">
          <Volleyball className="w-5 h-5 text-white" />
          <p className="mt-0.5 font-bold text-sm text-white">Padel Game Tracker</p>
        </div>
        {!isCapturing && (
          <button
            onClick={handleShare}
            className="p-2 rounded-lg border border-[#2E2D2D] bg-[#1C1C1C]/50 hover:bg-[#2E2D2D]/50 transition-colors duration-200 group"
            title="Compartir marcador"
          >
            <Share2 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
          </button>
        )}
      </header>

      <p className="mb-4 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">
        <span className="hidden lg:inline">Últimos 10 Meses de Actividad</span>
        <span className="lg:hidden">Últimas 13 Semanas de Actividad</span>
      </p>

      {/* Desktop: Columnas verticales (semanas) */}
      <div className="hidden lg:block overflow-x-auto pb-2 flex-1">
        <div className="flex gap-2 w-full">
          {/* Días de la semana a la izquierda */}
          <div className="flex flex-col justify-between pr-2 flex-shrink-0">
            <div className="h-5"></div>
            {WEEKDAYS.map((day) => (
              <div key={day} className="h-[14px] text-[10px] text-gray-400 flex items-center">
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            {/* Etiquetas de meses arriba */}
            <div className="flex justify-between mb-1.5 h-5">
              {monthLabelsDesktop.map((label, index) => (
                <div 
                  key={index} 
                  className="text-[10px] text-gray-400 flex items-start"
                  style={{ 
                    width: `${100 / weeksDesktop.length}%`,
                    visibility: label ? 'visible' : 'hidden'
                  }}
                >
                  {label ? label.month : ''}
                </div>
              ))}
            </div>

            {/* Grid de semanas (columnas) */}
            <div className="grid mr-2 gap-[4px]" style={{ gridTemplateColumns: `repeat(${weeksDesktop.length}, 1fr)` }}>
              {weeksDesktop.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[4px]">
                  {week.map((day, dayIndex) => {
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
                        custom={weekIndex * 7 + dayIndex}
                        initial="hidden"
                        animate="animate"
                        variants={squareVariants}
                        className="w-full aspect-square rounded-[2px] cursor-pointer hover:ring-2 hover:ring-white/40 transition-all duration-200"
                        style={{
                          background: day.resultados.length > 1
                            ? `conic-gradient(${day.resultados.map((r, i) => `${COLOR_MAP[r] || '#6B7280'} ${(i / day.resultados.length) * 100}%, ${COLOR_MAP[r] || '#6B7280'} ${(i + 1) / day.resultados.length * 100}%`).join(", ")})`
                            : day.resultados.length === 1
                              ? COLOR_MAP[day.resultados[0]] || '#6B7280'
                              : "#1a1a1a",
                          border: day.resultados.length === 0 ? '1px solid #2a2a2a' : 'none',
                        }}
                        title={`${day.date}: ${day.played ? titleParts.join(", ") : "Sin Jugar"}`}
                        onClick={() => openModal(day)}
                      ></motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Filas horizontales (2 semanas por fila) */}
      <div className="lg:hidden pb-2 flex-1">
        <div className="flex flex-col gap-1.5 w-full -ml-4">
          {/* Días de la semana arriba (2 veces) */}
          <div className="flex w-full">
            <div className="w-10 flex-shrink-0"></div> {/* Espacio para meses */}
            <div className="flex-1 grid grid-cols-14 gap-[2px]">
              {[...WEEKDAYS, ...WEEKDAYS].map((day, idx) => (
                <div key={idx} className="text-[8px] text-gray-400 text-center">
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Grid de semanas (filas con 2 semanas cada una) */}
          <div className="flex flex-col gap-[2px]">
            {weeksMobile.reduce((rows: Array<{ weeks: Array<Array<{date: string, played: boolean, resultados: number[]}>>, rowIndex: number }>, week, weekIndex) => {
              // Agrupar de 2 en 2
              if (weekIndex % 2 === 0) {
                const nextWeek = weeksMobile[weekIndex + 1] || [];
                rows.push({ weeks: [week, nextWeek], rowIndex: Math.floor(weekIndex / 2) });
              }
              return rows;
            }, []).map(({ weeks, rowIndex }) => {
              // Obtener etiqueta de mes para la primera semana del par
              const firstDay = weeks[0][0]?.date;
              let monthLabel = '';
              if (firstDay) {
                const [, month] = firstDay.split('-');
                const currentMonth = parseInt(month) - 1;
                const prevRowIndex = rowIndex - 1;
                if (prevRowIndex >= 0) {
                  const prevWeeks = weeksMobile.slice(prevRowIndex * 2, prevRowIndex * 2 + 2);
                  const prevFirstDay = prevWeeks[0]?.[0]?.date;
                  if (prevFirstDay) {
                    const [, prevMonth] = prevFirstDay.split('-');
                    const prevMonthNum = parseInt(prevMonth) - 1;
                    if (currentMonth !== prevMonthNum) {
                      monthLabel = MONTHS[currentMonth];
                    }
                  }
                } else if (rowIndex === 0) {
                  monthLabel = MONTHS[currentMonth];
                }
              }

              return (
                <div key={rowIndex} className="flex w-full items-center">
                  {/* Etiqueta de mes */}
                  <div className="w-10 flex-shrink-0 text-[8px] text-gray-400 text-right pr-2">
                    {monthLabel}
                  </div>

                  {/* 2 semanas en una fila (14 días) */}
                  <div className="flex-1 grid grid-cols-14 gap-[2px]">
                    {weeks.map((week: Array<{date: string, played: boolean, resultados: number[]}>, weekIdx: number) => 
                      week.map((day: {date: string, played: boolean, resultados: number[]}, dayIndex: number) => {
                        const ganados = day.resultados.filter((r: number) => r === 1).length;
                        const perdidos = day.resultados.filter((r: number) => r === 0).length;
                        const entrenamientos = day.resultados.filter((r: number) => r === 2).length;
                        const torneos = day.resultados.filter((r: number) => r === 3).length;

                        const titleParts = [];
                        if (ganados > 0) titleParts.push(`Ganados: ${ganados}`);
                        if (perdidos > 0) titleParts.push(`Perdidos: ${perdidos}`);
                        if (entrenamientos > 0) titleParts.push(`Entrenamientos: ${entrenamientos}`);
                        if (torneos > 0) titleParts.push(`Torneos: ${torneos}`);

                        return (
                          <motion.div
                            key={day.date}
                            custom={rowIndex * 14 + weekIdx * 7 + dayIndex}
                            initial="hidden"
                            animate="animate"
                            variants={squareVariants}
                            className="w-full aspect-square rounded-[1px] cursor-pointer hover:ring-1 hover:ring-white/40 transition-all duration-200"
                            style={{
                              background: day.resultados.length > 1
                                ? `conic-gradient(${day.resultados.map((r: number, i: number) => `${COLOR_MAP[r] || '#6B7280'} ${(i / day.resultados.length) * 100}%, ${COLOR_MAP[r] || '#6B7280'} ${(i + 1) / day.resultados.length * 100}%`).join(", ")})`
                                : day.resultados.length === 1
                                  ? COLOR_MAP[day.resultados[0]] || '#6B7280'
                                  : "#1a1a1a",
                              border: day.resultados.length === 0 ? '1px solid #2a2a2a' : 'none',
                            }}
                            title={`${day.date}: ${day.played ? titleParts.join(", ") : "Sin Jugar"}`}
                            onClick={() => openModal(day)}
                          ></motion.div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-[10px] text-gray-400 mt-4 gap-3 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#64a377]"></div>
          <span>Ganados: {totalGanados}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#ed5c53]"></div>
          <span>Perdidos: {totalPerdidos}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#b5b670]"></div>
          <span>Entrenamiento: {totalEntrenamiento}</span>
        </div>
      </div>

      {selectedDay && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Resultados del Día"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="-mt-8">
              <ResultsMatch matchpadel={matchpadel.filter(match => convertBackendDate(match.fechaPartido) === selectedDay.date).sort((a, b) => new Date(`${a.fechaPartido}T${a.horaPartido}`).getTime() - new Date(`${b.fechaPartido}T${b.horaPartido}`).getTime())} />
            </div>
          </motion.div>
        </Modal>
      )}
    </div>
  );
}