'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Asignatura {
    id: number;
    nombre: string;
    caracter: string;
    ects: number;
    curso: number;
    cuatrimestre: number;
    especialidad?: string;
    superada: boolean;
    nota?: number;
}

interface ListaAsignaturasProps {
    asignaturas: Asignatura[];
}

export default function ListaAsignaturas({ asignaturas }: ListaAsignaturasProps) {
    const [filtro, setFiltro] = useState<'todas' | 'superadas' | 'pendientes'>('todas');

    const asignaturasFiltradas = asignaturas.filter(a => {
        if (filtro === 'superadas') return a.superada;
        if (filtro === 'pendientes') return !a.superada;
        return true;
    });

    // Ordenar por nota (descendente) para superadas
    const asignaturasOrdenadas = [...asignaturasFiltradas].sort((a, b) => {
        if (filtro === 'superadas' && a.nota && b.nota) {
            return b.nota - a.nota;
        }
        return 0;
    });

    const colorNota = (nota?: number) => {
        if (!nota) return 'text-gray-100/50';
        if (nota >= 9) return 'text-green-400';
        if (nota >= 7) return 'text-blue-400';
        if (nota >= 5) return 'text-yellow-400';
        return 'text-red-400';
    };

    const colorCaracter: Record<string, string> = {
        'Básico': 'border-blue-500/50 bg-blue-500/10 text-blue-400',
        'Obligatorio': 'border-green-500/50 bg-green-500/10 text-green-400',
        'Optativo': 'border-purple-500/50 bg-purple-500/10 text-purple-400'
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-[#2E2D2D] rounded-lg p-3 sm:p-6 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300"
        >
            <div className="flex flex-col gap-3 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-xl font-bold text-white">
                    Asignaturas ({asignaturasOrdenadas.length})
                </h3>
                
                <div className="grid grid-cols-3 gap-2 w-full">
                    <button
                        onClick={() => setFiltro('todas')}
                        className={`px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
                            filtro === 'todas'
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-[#2E2D2D] text-gray-100/75 hover:bg-[#3E3D3D]'
                        }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setFiltro('superadas')}
                        className={`px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
                            filtro === 'superadas'
                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                : 'bg-[#2E2D2D] text-gray-100/75 hover:bg-[#3E3D3D]'
                        }`}
                    >
                        Superadas
                    </button>
                    <button
                        onClick={() => setFiltro('pendientes')}
                        className={`px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold rounded-lg transition-all duration-200 ${
                            filtro === 'pendientes'
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                : 'bg-[#2E2D2D] text-gray-100/75 hover:bg-[#3E3D3D]'
                        }`}
                    >
                        Pendientes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 max-h-[500px] sm:max-h-96 overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-[#2E2D2D] scrollbar-track-transparent hover:scrollbar-thumb-[#3E3D3D]">
                {asignaturasOrdenadas.map((asignatura, index) => (
                    <motion.div
                        key={asignatura.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className={`
                            p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02]
                            ${asignatura.superada 
                                ? 'border-green-500/30 bg-green-500/5 hover:border-green-500/50' 
                                : 'border-[#2E2D2D] bg-[#2E2D2D]/30 hover:bg-[#2E2D2D]/50'
                            }
                        `}
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-tight">
                                {asignatura.nombre}
                            </h4>
                            {asignatura.superada && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 shrink-0">
                                    <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.1"/>
                                    <path d="M9 12l2 2l4 -4" />
                                </svg>
                            )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border font-medium ${colorCaracter[asignatura.caracter]}`}>
                                {asignatura.caracter === 'Básico' ? 'B' : asignatura.caracter === 'Obligatorio' ? 'Oblig.' : 'Opt.'}
                            </span>
                            <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border border-orange-500/30 bg-orange-500/10 text-orange-400 font-semibold">
                                {asignatura.ects} ECTS
                            </span>
                            <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border border-[#2E2D2D] bg-[#1C1C1C]/50 text-gray-100/75">
                                {asignatura.curso}º-C{asignatura.cuatrimestre}
                            </span>
                        </div>

                        {asignatura.superada && asignatura.nota !== undefined && asignatura.nota !== null && (
                            <div className="mt-2 pt-2 border-t border-[#2E2D2D]/50 flex items-center justify-between">
                                <span className="text-[9px] sm:text-[10px] text-gray-100/50 uppercase tracking-wide font-semibold">Nota</span>
                                <p className={`text-lg sm:text-xl font-bold ${colorNota(asignatura.nota)}`}>
                                    {asignatura.nota.toFixed(2)}
                                </p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {asignaturasOrdenadas.length === 0 && (
                <div className="text-center py-12 sm:py-8 text-gray-100/50">
                    <p className="text-xs sm:text-sm">No hay asignaturas {filtro === 'superadas' ? 'superadas' : filtro === 'pendientes' ? 'pendientes' : ''} para mostrar.</p>
                </div>
            )}
        </motion.div>
    );
}
