"use client"

import { Sparkles, Medal, Share2 } from "lucide-react"
import { useMemo, useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { toPng } from 'html-to-image'

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

// Función para obtener el color hex según el porcentaje
function getColorHex(percentage: number): string {
  if (percentage === 100) return "#facc15" // yellow-400
  if (percentage >= 85) return "#4ade80" // green-400
  if (percentage >= 65) return "#60a5fa" // blue-400
  if (percentage >= 50) return "#22d3ee" // cyan-400
  if (percentage >= 40) return "#fde047" // yellow-300
  if (percentage >= 20) return "#fb923c" // orange-400
  return "#f87171" // red-400
}

// Componente para círculo de progreso (estático o animado)
function ProgressCircle({ percentage, isStatic }: { percentage: number; isStatic: boolean }) {
  const strokeDasharray = `${percentage * 2.2}, 220`
  const colorClass = getColorByPercentage(percentage)
  const colorHex = getColorHex(percentage)
  
  return (
    <svg className="w-full h-full transform -rotate-90">
      <circle
        cx="40"
        cy="40"
        r="35"
        fill="none"
        stroke="#2E2D2D"
        strokeWidth="5"
      />
      {isStatic ? (
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke={colorHex}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
        />
      ) : (
        <motion.circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          className={colorClass}
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ strokeDasharray: "0, 220" }}
          animate={{ strokeDasharray }}
          transition={{ duration: 3 }}
        />
      )}
    </svg>
  )
}

export default function StatsWidget({ matchpadel = [] }: { matchpadel: MatchPadel[] }) {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Marcar animaciones como completadas después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Función para compartir estadísticas como imagen
  const handleShare = async () => {
    if (!statsRef.current) return
    
    try {
      // Ocultar el botón antes de capturar
      setIsCapturing(true)
      
      // Esperar a que se oculte el botón
      await new Promise(resolve => setTimeout(resolve, 50))
      
      const dataUrl = await toPng(statsRef.current, {
        cacheBust: true,
        backgroundColor: '#1C1C1C',
        pixelRatio: 2,
        skipFonts: false,
      })

      // Mostrar el botón de nuevo
      setIsCapturing(false)

      // Convertir dataUrl a blob
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      const file = new File([blob], 'estadisticas-padel.png', { type: 'image/png' })

      // Intentar usar Web Share API si está disponible
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Mis Estadísticas de Pádel',
          text: 'Mira mis estadísticas de pádel',
        })
      } else {
        // Fallback: descargar la imagen
        const link = document.createElement('a')
        link.download = 'estadisticas-padel.png'
        link.href = dataUrl
        link.click()
      }
    } catch (error) {
      console.error('Error al compartir:', error)
      setIsCapturing(false)
    }
  }

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
    <div ref={statsRef} suppressHydrationWarning className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-full flex flex-col hover:border-[#EDEDED]/30 transition-colors duration-300">
      <header className="flex flex-row gap-2 items-center justify-between mb-6">
        <div className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1">
          <Sparkles className="w-5 h-5 text-white" />
          <p className="mt-0.5 font-bold text-sm text-white">Estadísticas Generales</p>
        </div>
        
        {/* Botón de compartir imagen */}
        {!isCapturing && (
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border border-[#2E2D2D] hover:border-[#EDEDED]/50 transition-all duration-300"
          >
            <Share2 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </motion.button>
        )}
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
                {animationComplete ? stats.totalWins : <AnimatedNumber value={stats.totalWins} />}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                /{animationComplete ? stats.totalGames : <AnimatedNumber value={stats.totalGames} />}
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
                {animationComplete ? stats.last30Wins : <AnimatedNumber value={stats.last30Wins} />}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                /{animationComplete ? stats.last30Games : <AnimatedNumber value={stats.last30Games} />}
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
                {animationComplete ? stats.last15Wins : <AnimatedNumber value={stats.last15Wins} />}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                /{animationComplete ? stats.last15Games : <AnimatedNumber value={stats.last15Games} />}
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
                  scale: animationComplete ? 1 : (stats.currentStreak >= 5 && stats.currentStreak >= level ? [1, 1.2, 1] : 1),
                }}
                transition={{ 
                  delay: level * 0.1, 
                  type: "spring", 
                  stiffness: 200,
                  repeat: animationComplete ? 0 : (stats.currentStreak >= 5 ? Infinity : 0),
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
                {stats.currentStreak >= 5 && stats.currentStreak >= level && !animationComplete && (
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
          <p 
            className="text-[8px] uppercase tracking-wider relative z-10"
            style={{ 
              color: stats.currentStreak >= 5 ? "#fb923c" : "#9ca3af" 
            }}
          >
            Racha: {stats.currentStreak} {stats.currentStreak === 1 ? "victoria" : "victorias"}
          </p>
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
                      rotate: animationComplete ? 0 : [0, -10, 10, -10, 0],
                      scale: animationComplete ? 1 : [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: animationComplete ? 0 : Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Medal className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <ProgressCircle percentage={stats.totalWinRate} isStatic={animationComplete} />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {animationComplete ? stats.totalWinRate : <AnimatedNumber value={stats.totalWinRate} />}%
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
                      rotate: animationComplete ? 0 : [0, -10, 10, -10, 0],
                      scale: animationComplete ? 1 : [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: animationComplete ? 0 : Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Medal className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <ProgressCircle percentage={stats.last30WinRate} isStatic={animationComplete} />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {animationComplete ? stats.last30WinRate : <AnimatedNumber value={stats.last30WinRate} />}%
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
                      rotate: animationComplete ? 0 : [0, -10, 10, -10, 0],
                      scale: animationComplete ? 1 : [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: animationComplete ? 0 : Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Medal className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]" />
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <ProgressCircle percentage={stats.last15WinRate} isStatic={animationComplete} />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {animationComplete ? stats.last15WinRate : <AnimatedNumber value={stats.last15WinRate} />}%
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
