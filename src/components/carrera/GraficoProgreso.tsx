'use client';

import { motion } from 'framer-motion';

interface ProgresoCurso {
    curso: number;
    total: number;
    superadas: number;
    porcentaje: number;
}

interface GraficoProgresoProps {
    progresoPorCurso: ProgresoCurso[];
    progresoGeneral: number;
}

export default function GraficoProgreso({ progresoPorCurso, progresoGeneral }: GraficoProgresoProps) {
    return (
        <div className="border border-[#2E2D2D] rounded-lg p-3 sm:p-6 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300 h-full">
            <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="text-purple-400">📊</span>
                Progreso por Curso
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
                {progresoPorCurso.map((curso, index) => (
                    <div key={curso.curso}>
                        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                            <span className="text-[10px] sm:text-xs text-gray-100/90 font-medium">
                                {curso.curso}º Curso <span className="text-gray-100/50">({curso.superadas}/{curso.total})</span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-white bg-white/5 px-1.5 sm:px-2 py-0.5 rounded">
                                {curso.porcentaje.toFixed(0)}%
                            </span>
                        </div>
                        
                        <div className="relative h-2 sm:h-2.5 bg-gradient-to-r from-[#2E2D2D] to-[#1C1C1C] rounded-full overflow-hidden shadow-inner">
                            <motion.div
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, 
                                        ${index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : index === 2 ? '#8b5cf6' : '#f59e0b'}, 
                                        ${index === 0 ? '#059669' : index === 1 ? '#2563eb' : index === 2 ? '#7c3aed' : '#d97706'}
                                    )`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${curso.porcentaje}%` }}
                                transition={{ 
                                    duration: 1, 
                                    delay: index * 0.2,
                                    ease: 'easeOut'
                                }}
                            />
                        </div>
                    </div>
                ))}
                
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#2E2D2D]">
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2">
                            <motion.span 
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500"
                                animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [1, 0.5, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            ></motion.span>
                            Progreso Total
                        </span>
                        <motion.span 
                            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 1.2,
                                type: "spring",
                                bounce: 0.4
                            }}
                        >
                            {progresoGeneral.toFixed(0)}%
                        </motion.span>
                    </div>
                    
                    <div className="relative h-3 sm:h-4 bg-gradient-to-r from-[#2E2D2D] to-[#1C1C1C] rounded-full overflow-hidden shadow-lg border border-orange-500/20">
                        {/* Barra de progreso principal */}
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 shadow-lg shadow-orange-500/50"
                            initial={{ width: 0 }}
                            animate={{ width: `${progresoGeneral}%` }}
                            transition={{ 
                                duration: 2, 
                                delay: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            style={{ minWidth: '12px' }}
                        >
                            {/* Capa de brillo superior */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
