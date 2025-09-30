"use client"

import { Sparkles, Medal } from "lucide-react"
import { useMemo, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface MatchPadel {
  fechaPartido: string
  resultado: number // 1 = Ganado, 0 = Perdido, 2 = Entrenamiento, 3 = Torneo
}

// Función para obtener el color según el porcentaje
function getColorByPercentage(percentage: number): string {
  if (percentage === 100) return "stroke-yellow-400"
  if (percentage >= 85) return "stroke-green-400"
  if (percentage >= 65) return "stroke-blue-400"
  if (percentage >= 50) return "stroke-cyan-400"
  if (percentage >= 40) return "stroke-yellow-300"
  if (percentage >= 20) return "stroke-orange-400"
  return "stroke-red-400"
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

    // 7. Calcular racha de victorias consecutivas
    let currentStreak = 0
    for (let i = onlyMatches.length - 1; i >= 0; i--) {
      if (onlyMatches[i].resultado === 1) {
        currentStreak++
      } else {
        break
      }
    }

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
      currentStreak,
    }
  }, [matchpadel])

  return (
    <div suppressHydrationWarning className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-full flex flex-col hover:border-[#EDEDED]/30 transition-colors duration-300">
      <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1 mb-6">
        <Sparkles className="w-5 h-5 text-white" />
        <p className="mt-0.5 font-bold text-sm text-white">Estadísticas Generales</p>
      </header>

      <article className="flex flex-col gap-2 flex-1 justify-center">
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

        {/* Indicador de racha */}
        <div className="relative flex flex-col items-center gap-3 py-2">
          {/* Línea conectora */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[1px]">
            <div className="h-full bg-gradient-to-r from-transparent via-[#2E2D2D] to-transparent"></div>
          </div>

          {/* Burbujas */}
          <div className="relative flex items-center justify-center gap-6">
            {[1, 2, 3, 4, 5].map((level) => (
              <motion.div
                key={level}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: stats.currentStreak >= 5 && stats.currentStreak >= level ? [1, 1.2, 1] : 1,
                }}
                transition={{ 
                  delay: level * 0.1, 
                  type: "spring", 
                  stiffness: 200,
                  repeat: stats.currentStreak >= 5 ? Infinity : 0,
                  repeatDelay: 0.5,
                  duration: 0.6
                }}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  stats.currentStreak >= level
                    ? stats.currentStreak >= 5
                      ? "bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 shadow-[0_0_15px_rgba(251,146,60,0.8)]"
                      : "bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    : "bg-[#2E2D2D]"
                }`}
              >
                {/* Efecto de brillo para racha de 5 */}
                {stats.currentStreak >= 5 && stats.currentStreak >= level && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-orange-500"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: level * 0.2,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Texto de racha */}
          <motion.p 
            className="text-[8px] text-gray-400 uppercase tracking-wider relative z-10"
            animate={{
              color: stats.currentStreak >= 5 ? "#fb923c" : "#9ca3af"
            }}
          >
            Racha: {stats.currentStreak} {stats.currentStreak === 1 ? "victoria" : "victorias"}
          </motion.p>
        </div>

        {/* Círculos de eficacia */}
        <div className="grid grid-cols-3 gap-3">
          {/* Círculo de eficacia total */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              {stats.totalWinRate === 100 ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    duration: 1.5 
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Medal className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
                  </motion.div>
                </motion.div>
              ) : (
                <>
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
                      className={getColorByPercentage(stats.totalWinRate)}
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
                </>
              )}
            </div>
          </div>

          {/* Círculo de eficacia últimos 30 */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              {stats.last30WinRate === 100 ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    duration: 1.5 
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Medal className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
                  </motion.div>
                </motion.div>
              ) : (
                <>
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
                      className={getColorByPercentage(stats.last30WinRate)}
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
                </>
              )}
            </div>
          </div>

          {/* Círculo de eficacia últimos 15 */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              {stats.last15WinRate === 100 ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    duration: 1.5 
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Medal className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
                  </motion.div>
                </motion.div>
              ) : (
                <>
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
                      className={getColorByPercentage(stats.last15WinRate)}
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
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
