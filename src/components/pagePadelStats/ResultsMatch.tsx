"use client"

import { useState, useRef } from "react"
import { Trophy, Calendar, Clock, Dumbbell, Crown, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toPng } from 'html-to-image'

// Asegúrate de que estas propiedades coincidan con tu BD
interface MatchPadel {
    id: number
    fechaPartido: string        // "YYYY-MM-DD"
    horaPartido?: string | null // "HH:MM:SS"
    set1?: string | null        // Ej: "6-2" o "6/2"
    set2?: string | null
    set3?: string | null
    resultado: number           // 0 = Perdido, 1 = Ganado, 2 = Entrenamiento, 3 = Torneo
}

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export default function ResultsMatch({ matchpadel = [] }: { matchpadel: MatchPadel[] }) {
    const [activeMatchId, setActiveMatchId] = useState<number | null>(null)
    const [isCapturing, setIsCapturing] = useState(false)
    const matchRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

    const handleClickMatch = (matchId: number) => {
        setActiveMatchId(matchId)
        // Ocultar el tooltip después de 3 segundos
        setTimeout(() => setActiveMatchId(null), 3000)
    }

    const handleShare = async (matchId: number) => {
        const matchElement = matchRefs.current[matchId]
        if (!matchElement) return
        
        try {
            // Primero activamos isCapturing para ocultar el tooltip
            setIsCapturing(true)
            setActiveMatchId(null) // Ocultar tooltip inmediatamente
            
            // Esperamos a que el tooltip desaparezca
            await new Promise(resolve => setTimeout(resolve, 150))
            
            // Hacer scroll al principio del elemento
            matchElement.scrollIntoView({ behavior: 'instant', block: 'start' })
            
            // Esperar a que el scroll termine
            await new Promise(resolve => setTimeout(resolve, 300))
            
            // Obtener dimensiones reales del elemento
            const rect = matchElement.getBoundingClientRect()
            
            const dataUrl = await toPng(matchElement, {
                cacheBust: true,
                backgroundColor: '#1C1C1C',
                pixelRatio: 2,
                skipFonts: false,
                width: rect.width,
                height: rect.height,
                style: {
                    margin: '0',
                    padding: '0',
                }
            })
            
            setIsCapturing(false)

            const response = await fetch(dataUrl)
            const blob = await response.blob()
            const file = new File([blob], 'resultado-partido.png', { type: 'image/png' })

            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Resultado del Partido',
                    text: 'Mira el resultado de mi partido de pádel',
                })
            } else {
                const link = document.createElement('a')
                link.download = 'resultado-partido.png'
                link.href = dataUrl
                link.click()
            }
        } catch (error) {
            console.error('Error al compartir:', error)
            setIsCapturing(false)
        }
    }

    return (
        <div className="space-y-4">
            {matchpadel.map((match) => {
                const { id, fechaPartido, horaPartido, set1, set2, set3, resultado } = match

                // 1. Formatear fecha (ejemplo: "02 Oct 2025")
                const date = new Date(fechaPartido)
                const day = String(date.getDate()).padStart(2, '0')
                const month = MESES[date.getMonth()]
                const year = date.getFullYear()
                const dateFormatted = `${day} ${month} ${year}`

                // 2. Formatear la hora ("HH:MM:SS" -> "HH:MM")
                const timeFormatted = horaPartido
                    ? horaPartido.slice(0, 5)
                    : "00:00"

                // 3. Preparar sets (solo los que no sean null)
                const rawSets = [set1, set2, set3].filter(Boolean) as string[]

                // Función para dividir un set en [score1, score2]
                function parseSet(setString: string) {
                    if (setString.includes("-")) {
                        return setString.split("-")
                    } else if (setString.includes("/")) {
                        return setString.split("/")
                    } else {
                        return [setString, ""]
                    }
                }

                // 4. Asignar etiqueta, colores e icono según resultado
                let label = ""
                const borderColor = "border-[#2E2D2D]"
                let bgColor = ""
                let textColor = "text-white"
                let iconColor = "text-white"
                let ResultIcon = Trophy

                switch (resultado) {
                    case 0:
                        label = "Derrota"
                        textColor = "text-red-500"
                        iconColor = "text-red-500"
                        bgColor = "bg-red-500/10"
                        ResultIcon = Trophy
                        break
                    case 1:
                        label = "Victoria"
                        textColor = "text-green-500"
                        iconColor = "text-green-500"
                        bgColor = "bg-green-500/10"
                        ResultIcon = Trophy
                        break
                    case 2:
                        label = "Entrenamiento"
                        textColor = "text-yellow-500"
                        iconColor = "text-yellow-500"
                        bgColor = "bg-yellow-500/10"
                        ResultIcon = Dumbbell
                        break
                    case 3:
                        label = "Competición"
                        textColor = "text-blue-500"
                        iconColor = "text-blue-500"
                        bgColor = "bg-blue-500/10"
                        ResultIcon = Crown
                        break
                    default:
                        label = "Desconocido"
                        textColor = "text-gray-500"
                        iconColor = "text-gray-500"
                        bgColor = "bg-gray-500/10"
                        ResultIcon = Trophy
                        break
                }


                return (
                    <div
                        key={id}
                        ref={(el) => { matchRefs.current[id] = el }}
                        onClick={() => handleClickMatch(id)}
                        className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300 cursor-pointer"
                    >
                        {/* Encabezado: fecha, hora y estado */}
                        <div className="flex justify-between items-center mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.5rem' }}>
                            {/* Fecha y hora */}
                            <div className={`flex items-center gap-3 ${isCapturing ? 'mt-4' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div className={`flex items-center gap-1.5 ${isCapturing ? 'ml-8' : ''}`}>
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-300">{dateFormatted}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-300">{timeFormatted}</span>
                                </div>
                            </div>

                            {/* Etiqueta del resultado */}
                            <div className={`flex items-center gap-2 ${borderColor} rounded-full px-3 py-1 ${bgColor} ${isCapturing ? 'mt-4' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <ResultIcon className={`w-4 h-4 ${iconColor}`} />
                                <span className={`text-sm font-medium ${textColor}`}>{label}</span>
                            </div>
                        </div>

                        {/* Sets */}
                        <div className={`flex justify-center items-center ${isCapturing ? 'ml-8' : ''}`}>
                            {rawSets.map((set, index) => {
                                const [score1, score2] = parseSet(set)
                                // Convertir a número para comparar
                                const num1 = parseInt(score1)
                                const num2 = parseInt(score2)
                                const score1Class = num1 >= num2 ? "text-xl md:text-3xl font-bold text-white" : "text-md md:text-xl"
                                const score2Class = num2 > num1 ? "text-xl md:text-3xl font-bold text-white" : "text-md md:text-xl"

                                return (
                                    <div key={index} className="flex items-center mt-2">
                                        <div className="flex flex-col items-center bg-[#2E2D2D] rounded-xl px-5 py-2 md:px-6 md:py-3">
                                            <span className={`${score1Class} text-gray-100/50`}>{score1}</span>
                                            <span className={`${score2Class} text-gray-100/50`}>{score2}</span>
                                        </div>
                                        {index < rawSets.length - 1 && (
                                            <div className="h-px w-12 bg-[#2E2D2D] mx-4"></div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Tooltip flotante para compartir con animación */}
                        {!isCapturing && (
                            <AnimatePresence mode="wait">
                                {activeMatchId === id && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleShare(id)
                                        }}
                                        className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#2E2D2D] border border-[#EDEDED]/20 rounded-lg px-3 py-2 shadow-xl hover:bg-[#3E3D3D] transition-colors cursor-pointer z-10"
                                    >
                                        <Share2 className="w-4 h-4 text-white" />
                                        <span className="text-sm text-white font-medium">Compartir</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
