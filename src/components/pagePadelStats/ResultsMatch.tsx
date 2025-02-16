"use client"

import { Trophy, Calendar, Clock, Dumbbell, Crown } from "lucide-react"

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

export default function ResultsMatch({ matchpadel = [] }: { matchpadel: MatchPadel[] }) {
    return (
        <div className="space-y-8 mt-4 md:mt-8 w-full lg:w-[50%]">
            {matchpadel.map((match) => {
                const { id, fechaPartido, horaPartido, set1, set2, set3, resultado } = match

                // 1. Formatear fecha (ejemplo: "05/03/23")
                const dateFormatted = new Date(fechaPartido).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                })

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
                        label = "Torneo"
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
                        className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300"
                    >
                        {/* Encabezado: fecha, hora y estado */}
                        <div className="flex justify-between items-center">
                            {/* Fecha y hora */}
                            <div className="flex items-center md:gap-4">
                                <div className={`flex items-center gap-1 md:gap-2 ${borderColor} rounded-full md:px-3 py-1`}>
                                    <Calendar className="w-4 h-4 text-gray-100/50" />
                                    <span className="text-sm text-white">{dateFormatted}</span>
                                </div>
                                <div className={`flex items-center gap-1 md:gap-2 ${borderColor} rounded-full px-2 md:px-3 py-1`}>
                                    <Clock className="w-4 h-4 text-gray-100/50" />
                                    <span className="text-sm text-white">{timeFormatted}</span>
                                </div>
                            </div>

                            {/* Etiqueta del resultado */}
                            <div className={`flex items-center gap-2 ${borderColor} rounded-full px-3 py-1 ${bgColor}`}>
                                <ResultIcon className={`w-4 h-4 ${iconColor}`} />
                                <span className={`text-sm font-medium ${textColor}`}>{label}</span>
                            </div>
                        </div>

                        {/* Sets */}
                        <div className="flex justify-center items-center">
                            {rawSets.map((set, index) => {
                                const [score1, score2] = parseSet(set)
                                // Convertir a número para comparar
                                const num1 = parseInt(score1)
                                const num2 = parseInt(score2)
                                const score1Class = num1 >= num2 ? "text-xl md:text-3xl font-bold text-white" : "text-md md:text-xl"
                                const score2Class = num2 > num1 ? "text-xl md:text-3xl font-bold text-white" : "text-md md:text-xl"

                                return (
                                    <div key={index} className="flex items-center mt-6">
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
                    </div>
                )
            })}
        </div>
    )
}
