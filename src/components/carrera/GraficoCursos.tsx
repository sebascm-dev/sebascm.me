'use client';

import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ProgresoCurso {
    curso: number;
    total: number;
    superadas: number;
    porcentaje: number;
}

interface GraficoCursosProps {
    progresoPorCurso: ProgresoCurso[];
}

export default function GraficoCursos({ progresoPorCurso }: GraficoCursosProps) {
    const data = {
        labels: progresoPorCurso.map(c => `${c.curso}º Curso`),
        datasets: [
            {
                label: 'Superadas',
                data: progresoPorCurso.map(c => c.superadas),
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
            },
            {
                label: 'Pendientes',
                data: progresoPorCurso.map(c => c.total - c.superadas),
                backgroundColor: 'rgba(107, 114, 128, 0.5)',
                borderColor: 'rgba(107, 114, 128, 1)',
                borderWidth: 2,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#EDEDED',
                    padding: 15,
                    font: {
                        size: 13
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1C1C1C',
                titleColor: '#EDEDED',
                bodyColor: '#D1D0D1',
                borderColor: '#2E2D2D',
                borderWidth: 1,
                padding: 12
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    color: 'rgba(46, 45, 45, 0.5)'
                },
                ticks: {
                    color: '#D1D0D1'
                }
            },
            y: {
                stacked: true,
                grid: {
                    color: 'rgba(46, 45, 45, 0.5)'
                },
                ticks: {
                    color: '#D1D0D1',
                    stepSize: 1
                }
            }
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-[#2E2D2D] rounded-lg p-6 bg-[#1C1C1C]/50 backdrop-blur-[2px]"
        >
            <h3 className="text-xl font-bold text-white mb-6">
                Asignaturas por Curso
            </h3>
            
            <div className="h-80">
                <Bar data={data} options={options} />
            </div>
        </motion.div>
    );
}
