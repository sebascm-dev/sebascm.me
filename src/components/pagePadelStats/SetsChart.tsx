"use client"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Estructura del partido
interface MatchPadel {
  id: number
  fechaPartido: string        // "YYYY-MM-DD"
  horaPartido?: string | null // "HH:MM:SS"
  set1?: string | null        // Ej: "6-2"
  set2?: string | null
  set3?: string | null
  resultado: number           // 0 = Perdido, 1 = Ganado, 2 = Entrenamiento, 3 = Torneo
}

// Registrar ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Función para extraer sets de un string como "6-2" y contar los ganados
const contarSets = (set: string | null | undefined): { total: number; ganados: number } => {
  if (!set) return { total: 0, ganados: 0 }
  const [juegosGanados, juegosPerdidos] = set.split(/[-/]/).map(Number)
  return {
    total: 1,
    ganados: juegosGanados > juegosPerdidos ? 1 : 0,
  }
}

// Procesar datos dinámicamente
const generateData = (matchpadel: MatchPadel[]) => {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const currentMonth = new Date().getMonth() // 0 = Enero, 11 = Diciembre

  // Inicializar contadores
  const setsTotalesPorMes = Array(12).fill(0)
  const setsGanadosPorMes = Array(12).fill(0)

  matchpadel.forEach(match => {
    const monthIndex = new Date(match.fechaPartido).getMonth() // 0 = Enero, 11 = Diciembre
    if (monthIndex >= 0 && monthIndex < 12) {
      const { total: total1, ganados: ganados1 } = contarSets(match.set1)
      const { total: total2, ganados: ganados2 } = contarSets(match.set2)
      const { total: total3, ganados: ganados3 } = contarSets(match.set3)

      setsTotalesPorMes[monthIndex] += total1 + total2 + total3
      setsGanadosPorMes[monthIndex] += ganados1 + ganados2 + ganados3
    }
  })

  // Reorganizar meses para que el actual esté a la izquierda y los anteriores detrás
  const orderedLabels = []
  const orderedSetsTotales = []
  const orderedSetsGanados = []

  for (let i = 0; i < 12; i++) {
    const index = (currentMonth - i + 12) % 12 // Ajusta los índices para que sean correctos
    orderedLabels.unshift(months[index])
    orderedSetsTotales.unshift(setsTotalesPorMes[index])
    orderedSetsGanados.unshift(setsGanadosPorMes[index])
  }

  return {
    labels: orderedLabels,
    datasets: [
      {
        label: "Sets Totales",
        data: orderedSetsTotales,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Sets Ganados",
        data: orderedSetsGanados,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  }
}

export default function SetsChart({ matchpadel = [] }: { matchpadel: MatchPadel[] }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1A1A1A",
        titleColor: "white",
        bodyColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "#2E2D2D",
        borderWidth: 1,
        padding: 10,
        displayColors: true,
      },
    },
  }

  return (
    <div className="relative max-h-[350px] border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">

      <article>
        <p className="mb-6 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">SETS</p>

        <div className="h-[133px] w-full">
          <Line data={generateData(matchpadel)} options={options} />
        </div>

        {/* Leyenda */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-100/50">Totales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-100/50">Ganados</span>
          </div>
        </div>
      </article>
    </div>
  )
}
