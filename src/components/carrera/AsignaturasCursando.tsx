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
            <div className="border border-[#2E2D2D] rounded-lg p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300">
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                    📚 Cursando este año
                </h3>
                <p className="text-xs text-gray-100/50 text-center py-4">
                    No hay asignaturas marcadas como cursando actualmente
                </p>
            </div>
        );
    }

    return (
        <div className="border border-[#2E2D2D] rounded-lg p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    📚 Cursando este año
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-gray-100/75">
                    <span>{asignaturasCursando.length} asignaturas</span>
                    <span className="text-orange-400 font-bold">{totalCreditos} ECTS</span>
                </div>
            </div>

            <div className="space-y-2">
                {asignaturasCursando.map((asignatura, index) => (
                    <motion.div
                        key={asignatura.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                            flex items-center gap-2 px-3 py-2 border-l-2 border-b border-[#2E2D2D]
                            bg-[#1C1C1C]/30 rounded-r
                            hover:bg-[#1C1C1C]/60 transition-colors duration-200
                            ${getBorderColor(asignatura.especialidad)}
                        `}
                    >
                        {/* Nombre y Rama */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="text-xs font-medium text-white truncate">
                                    {asignatura.nombre}
                                </h4>
                                <span className={`text-[9px] font-medium ${getRamaColor(asignatura.especialidad)} uppercase tracking-wider shrink-0`}>
                                    {getRamaNombre(asignatura.especialidad)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[9px] text-gray-100/50">
                                    {asignatura.curso}º Curso · {asignatura.cuatrimestre}º Cuatr.
                                </span>
                            </div>
                        </div>

                        {/* ECTS */}
                        <div className="shrink-0">
                            <span className="text-[10px] font-bold text-orange-400">
                                {asignatura.ects} ECTS
                            </span>
                        </div>

                        {/* Turno */}
                        {asignatura.turno && (
                            <div className="hidden sm:block shrink-0">
                                <span className="text-[9px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                                    {asignatura.turno}
                                </span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
