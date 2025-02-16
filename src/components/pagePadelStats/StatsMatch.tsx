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

    // 4. Últimos 10 partidos
    const last10Matches = onlyMatches.slice(-25)
    const last10Games = last10Matches.length
    const last10Wins = last10Matches.filter((match) => match.resultado === 1).length
    const last10WinRate = last10Games > 0
      ? Math.round((last10Wins / last10Games) * 100)
      : 0

    // 5. Últimos 3 partidos (corregido: slice(-3) en lugar de -10)
    const last3Matches = onlyMatches.slice(-25)
    const last3Wins = last3Matches.filter((match) => match.resultado === 1).length

    return {
      totalGames,
      last10Games,
      totalWins,
      last3Wins,
      last10WinRate,
    }
  }, [matchpadel])

  return (
    <div suppressHydrationWarning className="relative mt-8 border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
      <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1">
        <Sparkles className="w-5 h-5 text-white" />
        <p className="mt-0.5 font-bold text-sm text-white">Estadísticas Generales</p>
      </header>

      <article>
        <div className="grid grid-cols-3">
          {/* Columna izquierda */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-white">
                <AnimatedNumber value={stats.totalGames} />
              </p>
              <p className="text-xs text-gray-100/50 uppercase tracking-wider mt-1">
                Totales
              </p>
            </div>
            <div className="text-center mt-4 border-t border-[#2E2D2D] pt-4 w-full">
              <p className="text-xl md:text-2xl font-bold text-white">
                <AnimatedNumber value={stats.last10Games} />
              </p>
              <p className="text-xs text-gray-100/50 uppercase tracking-wider mt-1">
                Últimos
              </p>
            </div>
          </div>

          {/* Columna central */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <p className="text-2xl md:text-4xl font-bold text-white">
                <AnimatedNumber value={stats.totalWins} />
              </p>
              <p className="text-xs text-gray-100/50 uppercase tracking-wider mt-1">
                Ganados
              </p>
            </div>
            <div className="text-center mt-4 border-t border-[#2E2D2D] pt-4 w-full">
              <p className="text-xl md:text-2xl font-bold text-white">
                <AnimatedNumber value={stats.last3Wins} />
              </p>
              <p className="text-xs text-gray-100/50 uppercase tracking-wider mt-1">
                Ganados
              </p>
            </div>
          </div>

          {/* Columna derecha - Círculo de eficacia */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="relative size-36">
              {/* Versión para pantallas medianas/grandes */}
              <svg className="w-full hidden md:block lg:block h-full transform -rotate-90">
                {/* Círculo de fondo */}
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  fill="none"
                  className="stroke-[#2E2D2D]"
                  strokeWidth="8"
                />
                {/* Círculo de progreso animado */}
                <motion.circle
                  cx="72"
                  cy="72"
                  r="60"
                  fill="none"
                  className="stroke-green-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 314" }}
                  animate={{ strokeDasharray: `${stats.last10WinRate * 3.14}, 314` }}
                  transition={{ duration: 3 }}
                />
              </svg>

              {/* Versión para pantallas pequeñas */}
              <svg className="w-full block md:hidden lg:hidden h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="50"
                  fill="none"
                  className="stroke-[#2E2D2D]"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="72"
                  cy="72"
                  r="50"
                  fill="none"
                  className="stroke-green-500"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 314" }}
                  animate={{ strokeDasharray: `${stats.last10WinRate * 3.14}, 314` }}
                  transition={{ duration: 3 }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  <AnimatedNumber value={stats.last10WinRate} />%
                </span>
                <span className="text-xs text-gray-100/50 uppercase tracking-wider mt-1">
                  Eficacia
                </span>
                <span className="text-[0.65rem] text-gray-100/50">
                  Últimos 10
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
