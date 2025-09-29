'use client';

import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface GraficoNotasProps {
    distribucionNotas: {
        aprobadas: number;
        cursando: number;
        suspensas: number;
        sinCursar: number;
    };
}

export default function GraficoNotas({ distribucionNotas }: GraficoNotasProps) {
    const data = {
        labels: ['Aprobadas', 'Cursando', 'Suspensas', 'Sin Cursar'],
        datasets: [
            {
                label: 'Asignaturas',
                data: [
                    distribucionNotas.aprobadas,
                    distribucionNotas.cursando,
                    distribucionNotas.suspensas,
                    distribucionNotas.sinCursar
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',   // green - Aprobadas
                    'rgba(59, 130, 246, 0.8)',  // blue - Cursando
                    'rgba(239, 68, 68, 0.8)',   // red - Suspensas
                    'rgba(156, 163, 175, 0.8)'  // gray - Sin Cursar
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(156, 163, 175, 1)'
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#EDEDED',
                    padding: 8,
                    font: {
                        size: 10
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1C1C1C',
                titleColor: '#EDEDED',
                bodyColor: '#D1D0D1',
                borderColor: '#2E2D2D',
                borderWidth: 1,
                padding: 12,
                displayColors: true
            }
        }
    };

    const total = Object.values(distribucionNotas).reduce((a, b) => a + b, 0);

    return (
        <div className="border border-[#2E2D2D] rounded-lg p-6 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300 h-full">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-blue-400">📈</span>
                Estado de Asignaturas
            </h3>
            <div className="h-52 relative">
                {total > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-full"
                    >
                        <Doughnut data={data} options={options} />
                    </motion.div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-100/50 text-center">
                            No hay notas registradas aún
                        </p>
                    </div>
                )}
            </div>

            {total > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 grid grid-cols-2 gap-3"
                    >
                        <div className="relative group overflow-hidden text-center p-3 bg-gradient-to-br from-green-500/20 to-green-600/5 border border-green-500/30 rounded-lg hover:border-green-400/50 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-2xl font-bold text-green-400 relative z-10">{distribucionNotas.aprobadas}</p>
                            <p className="text-[10px] text-gray-100/75 font-medium relative z-10">Aprobadas</p>
                        </div>
                        <div className="relative group overflow-hidden text-center p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 rounded-lg hover:border-blue-400/50 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-2xl font-bold text-blue-400 relative z-10">{distribucionNotas.cursando}</p>
                            <p className="text-[10px] text-gray-100/75 font-medium relative z-10">Cursando</p>
                        </div>
                </motion.div>
            )}
        </div>
    );
}
