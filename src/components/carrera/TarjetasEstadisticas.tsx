'use client';

import { motion } from 'framer-motion';

interface TarjetasEstadisticasProps {
    estadisticas: {
        total: number;
        superadas: number;
        creditosTotales: number;
        creditosSuperados: number;
        notaMedia: number;
        progresoGeneral: number;
    };
}

export default function TarjetasEstadisticas({ estadisticas }: TarjetasEstadisticasProps) {
    const tarjetas = [
        {
            titulo: 'Progreso General',
            valor: `${estadisticas.progresoGeneral.toFixed(0)}%`,
            icono: '📊',
            color: 'from-purple-500/20 to-purple-600/20',
            borderColor: 'border-purple-500/30'
        },
        {
            titulo: 'Asignaturas',
            valor: `${estadisticas.superadas}/${estadisticas.total}`,
            icono: '📚',
            color: 'from-blue-500/20 to-blue-600/20',
            borderColor: 'border-blue-500/30'
        },
        {
            titulo: 'Créditos ECTS',
            valor: `${estadisticas.creditosSuperados}/240`,
            icono: '🎓',
            color: 'from-green-500/20 to-green-600/20',
            borderColor: 'border-green-500/30'
        },
        {
            titulo: 'Nota Media',
            valor: estadisticas.notaMedia.toFixed(2),
            icono: '⭐',
            color: 'from-orange-500/20 to-orange-600/20',
            borderColor: 'border-orange-500/30'
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-4">
            {tarjetas.map((tarjeta, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`
                        relative overflow-hidden group
                        border border-[#2E2D2D] rounded-lg p-2 sm:p-5
                        bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px]
                        hover:border-[#EDEDED]/30
                        transition-all duration-300 cursor-pointer
                    `}
                >
                    <div>
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-[8px] sm:text-xs text-gray-100/60 font-medium uppercase tracking-wider leading-tight">{tarjeta.titulo}</p>
                            <span className="text-base sm:text-2xl group-hover:scale-110 transition-transform duration-300">{tarjeta.icono}</span>
                        </div>
                        <p className="text-xl sm:text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                            {tarjeta.valor}
                        </p>
                    </div>
                    
                </motion.div>
            ))}
        </div>
    );
}
