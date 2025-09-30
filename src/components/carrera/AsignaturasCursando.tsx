'use client';

import { motion } from 'framer-motion';

interface Asignatura {
    id: number;
    nombre: string;
    caracter: string;
    ects: number;
    curso: number;
    cuatrimestre: number;
    especialidad?: string;
    estado?: string;
    anio_academico?: string;
    turno?: string;
    nota?: number;
    superada: boolean;
}

interface AsignaturasCursandoProps {
    asignaturas: Asignatura[];
}

export default function AsignaturasCursando({ asignaturas }: AsignaturasCursandoProps) {
    // Filtrar asignaturas que están en estado "Cursando" o que no están superadas y tienen estado activo
    const asignaturasCursando = asignaturas.filter(a => 
        a.estado === 'Cursando' || 
        (a.anio_academico === '2024-2025' && !a.superada)
    );

    const totalCreditos = asignaturasCursando.reduce((sum, a) => sum + Number(a.ects), 0);

    // Colores por rama
    const getBorderColor = (especialidad?: string) => {
        if (!especialidad || especialidad === '' || especialidad === 'Común') {
            return 'border-gray-500/50';
        }
        if (especialidad === 'Ingeniería del Software') {
            return 'border-blue-500';
        }
        if (especialidad === 'Ingeniería de Computadores') {
            return 'border-orange-500';
        }
        if (especialidad === 'Computación') {
            return 'border-purple-500';
        }
        if (especialidad === 'Todas') {
            return 'border-green-500';
        }
        return 'border-gray-500/50';
    };

    const getRamaColor = (especialidad?: string) => {
        if (!especialidad || especialidad === '' || especialidad === 'Común') {
            return 'text-gray-500/40';
        }
        if (especialidad === 'Ingeniería del Software') {
            return 'text-blue-500/40';
        }
        if (especialidad === 'Ingeniería de Computadores') {
            return 'text-orange-500/40';
        }
        if (especialidad === 'Computación') {
            return 'text-purple-500/40';
        }
        if (especialidad === 'Todas') {
            return 'text-green-500/40';
        }
        return 'text-gray-500/40';
    };

    const getRamaNombre = (especialidad?: string) => {
        if (!especialidad || especialidad === '' || especialidad === 'Común') {
            return 'TRONCAL';
        }
        if (especialidad === 'Ingeniería del Software') {
            return 'SOFTWARE';
        }
        if (especialidad === 'Ingeniería de Computadores') {
            return 'COMPUTADORES';
        }
        if (especialidad === 'Computación') {
            return 'COMPUTACIÓN';
        }
        if (especialidad === 'Todas') {
            return 'OPTATIVA';
        }
        return 'COMÚN';
    };

    if (asignaturasCursando.length === 0) {
        return (
            <div className="border border-[#2E2D2D] rounded-lg p-3 sm:p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300">
                <h3 className="text-xs sm:text-sm font-bold text-white mb-3 uppercase tracking-wide flex items-center gap-2">
                    <span className="text-lg sm:text-xl">📚</span>
                    Cursando este año
                </h3>
                <p className="text-xs text-gray-100/50 text-center py-4">
                    No hay asignaturas marcadas como cursando actualmente
                </p>
            </div>
        );
    }

    return (
        <div className="border border-[#2E2D2D] rounded-lg p-2 sm:p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300">
            {/* Header compacto */}
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent border-l-2 border-blue-500 rounded-r px-2 py-1.5 mb-2">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[10px] sm:text-sm font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                        <span className="text-base sm:text-xl">📚</span>
                        <span className="hidden sm:inline">Cursando este año</span>
                        <span className="sm:hidden">Cursando</span>
                    </h3>
                    <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.5 text-[8px] sm:text-[10px] rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold">
                            {asignaturasCursando.length}
                        </span>
                        <span className="px-1.5 py-0.5 text-[8px] sm:text-[10px] rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold">
                            {totalCreditos}
                        </span>
                    </div>
                </div>
            </div>

            {/* Lista compacta */}
            <div className="space-y-1.5">
                {asignaturasCursando.map((asignatura, index) => (
                    <motion.div
                        key={asignatura.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                            group relative overflow-hidden
                            flex items-center gap-2 
                            px-2 py-1.5 sm:py-2 border-l-2 border border-[#2E2D2D]
                            bg-[#1C1C1C]/30 rounded
                            hover:bg-[#1C1C1C]/60 hover:border-[#EDEDED]/20
                            transition-all duration-200
                            ${getBorderColor(asignatura.especialidad)}
                        `}
                    >
                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[10px] sm:text-sm font-semibold text-white truncate leading-tight">
                                {asignatura.nombre}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[7px] sm:text-[9px] font-bold ${getRamaColor(asignatura.especialidad)} uppercase tracking-wider`}>
                                    {getRamaNombre(asignatura.especialidad)}
                                </span>
                                <span className="text-[7px] sm:text-[9px] text-gray-100/50">
                                    {asignatura.curso}º·C{asignatura.cuatrimestre}
                                </span>
                            </div>
                        </div>

                        {/* ECTS compacto */}
                        <div className="shrink-0">
                            <span className="text-[10px] sm:text-xs font-bold text-orange-400 px-1.5 py-0.5 rounded bg-orange-500/20 border border-orange-500/30">
                                {asignatura.ects}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
