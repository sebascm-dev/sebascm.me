"use client"

import { Sparkles } from "lucide-react"
import { useMemo, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface MatchPadel {
  fechaPartido: string
  resultado: number // 1 = Ganado, 0 = Perdido, 2 = Entrenamiento, 3 = Torneo
}

// Componente para animar un número de 0 hasta "value"
function AnimatedNumber({ value }: { value: number }) {
  // Motion value que inicia en 0
  const count = useMotionValue(0)
  // Transform para redondear el valor a entero
  const rounded = useTransform(count, (latest) => Math.floor(latest))

  // Cada vez que "value" cambie, animamos de 0 hasta "value"
  useEffect(() => {
    const controls = animate(count, value, { duration: 3 })
    return controls.stop
  }, [value, count])

  // Renderizamos el valor redondeado
  return <motion.span>{rounded}</motion.span>
}

export default function StatsWidget({ matchpadel = [] }: { matchpadel: MatchPadel[] }) {
  // Calculamos las estadísticas de forma dinámica
  const stats = useMemo(() => {
    // 1. Filtramos solo los partidos (ganados o perdidos)
    const onlyMatches = matchpadel.filter(
      (match) => match.resultado === 0 || match.resultado === 1
    )

    // 2. Total de partidos (ganados o perdidos)
    const totalGames = onlyMatches.length

    // 3. Partidos ganados en total
    const totalWins = onlyMatches.filter((match) => match.resultado === 1).length

    // 4. Eficacia total
    const totalWinRate = totalGames > 0
      ? Math.round((totalWins / totalGames) * 100)
      : 0

    // 5. Últimos 30 partidos
    const last30Matches = onlyMatches.slice(-30)
    const last30Games = last30Matches.length
    const last30Wins = last30Matches.filter((match) => match.resultado === 1).length
    const last30WinRate = last30Games > 0
      ? Math.round((last30Wins / last30Games) * 100)
      : 0

    // 6. Últimos 15 partidos
    const last15Matches = onlyMatches.slice(-15)
    const last15Games = last15Matches.length
    const last15Wins = last15Matches.filter((match) => match.resultado === 1).length
    const last15WinRate = last15Games > 0
      ? Math.round((last15Wins / last15Games) * 100)
      : 0

    return {
      totalGames,
      totalWins,
      totalWinRate,
      last30Games,
      last30Wins,
      last30WinRate,
      last15Games,
      last15Wins,
      last15WinRate,
    }
  }, [matchpadel])

  return (
    <div suppressHydrationWarning className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-full flex flex-col hover:border-[#EDEDED]/30 transition-colors duration-300">
      <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1 mb-6">
        <Sparkles className="w-5 h-5 text-white" />
        <p className="mt-0.5 font-bold text-sm text-white">Estadísticas Generales</p>
      </header>

      <article className="flex flex-col gap-4 flex-1 justify-between">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-3 gap-4">
          {/* Totales: ganados/totales */}
          <div className="text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-2">
              Totales
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-white">
                <AnimatedNumber value={stats.totalWins} />
              </span>
              <span className="text-sm text-gray-500 font-medium">
                /<AnimatedNumber value={stats.totalGames} />
              </span>
            </div>
          </div>

          {/* Últimos 30: ganados/totales */}
          <div className="text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-2">
              Últimos 30
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-white">
                <AnimatedNumber value={stats.last30Wins} />
              </span>
              <span className="text-sm text-gray-500 font-medium">
                /<AnimatedNumber value={stats.last30Games} />
              </span>
            </div>
          </div>

          {/* Últimos 15: ganados/totales */}
          <div className="text-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-2">
              Últimos 15
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-white">
                <AnimatedNumber value={stats.last15Wins} />
              </span>
              <span className="text-sm text-gray-500 font-medium">
                /<AnimatedNumber value={stats.last15Games} />
              </span>
            </div>
          </div>
        </div>

        {/* Separador */}
        <hr className="border-t border-[#2E2D2D]" />

        {/* Círculos de eficacia */}
        <div className="grid grid-cols-3 gap-3">
          {/* Círculo de eficacia total */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  className="stroke-[#2E2D2D]"
                  strokeWidth="5"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  className="stroke-blue-500"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 220" }}
                  animate={{ strokeDasharray: `${stats.totalWinRate * 2.2}, 220` }}
                  transition={{ duration: 3 }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">
                  <AnimatedNumber value={stats.totalWinRate} />%
                </span>
                <span className="text-[7px] text-gray-400 uppercase tracking-wider">
                  Eficacia
                </span>
                <span className="text-[6px] text-gray-500">
                  Total
                </span>
              </div>
            </div>
          </div>

          {/* Círculo de eficacia últimos 30 */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  className="stroke-[#2E2D2D]"
                  strokeWidth="5"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  className="stroke-green-500"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 220" }}
                  animate={{ strokeDasharray: `${stats.last30WinRate * 2.2}, 220` }}
                  transition={{ duration: 3 }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">
                  <AnimatedNumber value={stats.last30WinRate} />%
                </span>
                <span className="text-[7px] text-gray-400 uppercase tracking-wider">
                  Eficacia
                </span>
                <span className="text-[6px] text-gray-500">
                  Últimos 30
                </span>
              </div>
            </div>
          </div>

          {/* Círculo de eficacia últimos 15 */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  className="stroke-[#2E2D2D]"
                  strokeWidth="5"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  className="stroke-yellow-500"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 220" }}
                  animate={{ strokeDasharray: `${stats.last15WinRate * 2.2}, 220` }}
                  transition={{ duration: 3 }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-white">
                  <AnimatedNumber value={stats.last15WinRate} />%
                </span>
                <span className="text-[7px] text-gray-400 uppercase tracking-wider">
                  Eficacia
                </span>
                <span className="text-[6px] text-gray-500">
                  Últimos 15
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
