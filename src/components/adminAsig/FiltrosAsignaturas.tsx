'use client';

import { useState } from 'react';

interface Filtros {
    curso: number;
    cuatrimestre: number;
    caracter: string;
    superada: string;
    especialidad: string;
}

interface FiltrosAsignaturasProps {
    filtros: Filtros;
    setFiltros: (filtros: Filtros) => void;
}

export default function FiltrosAsignaturas({ filtros, setFiltros }: FiltrosAsignaturasProps) {
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    
    const handleChange = (name: string, value: string | number) => {
        setFiltros({ ...filtros, [name]: value });
    };

    const limpiarFiltros = () => {
        setFiltros({
            curso: 0,
            cuatrimestre: 0,
            caracter: 'Todos',
            superada: 'Todos',
            especialidad: 'Todas'
        });
    };

    // Verificar si hay filtros activos
    const hayFiltrosActivos = filtros.curso !== 0 || 
                              filtros.cuatrimestre !== 0 || 
                              filtros.caracter !== 'Todos' || 
                              filtros.superada !== 'Todos' || 
                              filtros.especialidad !== 'Todas';

    const contarFiltrosActivos = () => {
        let count = 0;
        if (filtros.curso !== 0) count++;
        if (filtros.cuatrimestre !== 0) count++;
        if (filtros.caracter !== 'Todos') count++;
        if (filtros.superada !== 'Todos') count++;
        if (filtros.especialidad !== 'Todas') count++;
        return count;
    };

    return (
        <div className="w-full md:w-auto">
            {/* Botón para mostrar/ocultar filtros en móvil */}
            <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="md:hidden w-full px-3 py-2 text-xs font-medium bg-[#2E2D2D] hover:bg-[#3E3D3D] text-white rounded-lg border border-gray-100/10 transition-colors duration-200 flex items-center justify-between"
            >
                <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16"/>
                        <circle cx="8" cy="6" r="2" fill="currentColor"/>
                        <circle cx="16" cy="12" r="2" fill="currentColor"/>
                        <circle cx="12" cy="18" r="2" fill="currentColor"/>
                    </svg>
                    Filtros
                    {hayFiltrosActivos && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-orange-500 text-white rounded-full">
                            {contarFiltrosActivos()}
                        </span>
                    )}
                </span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className={`transition-transform duration-200 ${mostrarFiltros ? 'rotate-180' : ''}`}
                >
                    <path d="M6 9l6 6l6 -6"/>
                </svg>
            </button>

            {/* Panel de filtros */}
            <div className={`${mostrarFiltros ? 'block' : 'hidden'} md:block mt-2 md:mt-0`}>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 p-3 md:p-0 bg-[#1C1C1C]/50 md:bg-transparent rounded-lg border border-[#2E2D2D] md:border-0">
                    {/* Curso */}
                    <div className="relative">
                        <label className="block md:hidden text-[9px] font-bold text-gray-100/50 uppercase tracking-wide mb-1 ml-1">Curso</label>
                        <select
                            value={filtros.curso}
                            onChange={(e) => handleChange('curso', Number(e.target.value))}
                            className={`w-full sm:w-auto px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                                filtros.curso !== 0
                                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                                    : 'bg-[#2E2D2D] border-gray-100/10 text-white hover:bg-[#3E3D3D]'
                            }`}
                        >
                            <option value="0">📚 Todos los cursos</option>
                            <option value="1">1º Curso</option>
                            <option value="2">2º Curso</option>
                            <option value="3">3º Curso</option>
                            <option value="4">4º Curso</option>
                        </select>
                    </div>

                    {/* Cuatrimestre */}
                    <div className="relative">
                        <label className="block md:hidden text-[9px] font-bold text-gray-100/50 uppercase tracking-wide mb-1 ml-1">Cuatrimestre</label>
                        <select
                            value={filtros.cuatrimestre}
                            onChange={(e) => handleChange('cuatrimestre', Number(e.target.value))}
                            className={`w-full sm:w-auto px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                                filtros.cuatrimestre !== 0
                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                    : 'bg-[#2E2D2D] border-gray-100/10 text-white hover:bg-[#3E3D3D]'
                            }`}
                        >
                            <option value="0">📅 Todos</option>
                            <option value="1">C1 (Sep-Ene)</option>
                            <option value="2">C2 (Feb-Jun)</option>
                        </select>
                    </div>

                    {/* Carácter */}
                    <div className="relative">
                        <label className="block md:hidden text-[9px] font-bold text-gray-100/50 uppercase tracking-wide mb-1 ml-1">Tipo</label>
                        <select
                            value={filtros.caracter}
                            onChange={(e) => handleChange('caracter', e.target.value)}
                            className={`w-full sm:w-auto px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                                filtros.caracter !== 'Todos'
                                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                    : 'bg-[#2E2D2D] border-gray-100/10 text-white hover:bg-[#3E3D3D]'
                            }`}
                        >
                            <option value="Todos">🏷️ Todos los tipos</option>
                            <option value="Básico">Básico</option>
                            <option value="Obligatorio">Obligatorio</option>
                            <option value="Optativo">Optativo</option>
                        </select>
                    </div>

                    {/* Superada */}
                    <div className="relative">
                        <label className="block md:hidden text-[9px] font-bold text-gray-100/50 uppercase tracking-wide mb-1 ml-1">Estado</label>
                        <select
                            value={filtros.superada}
                            onChange={(e) => handleChange('superada', e.target.value)}
                            className={`w-full sm:w-auto px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                                filtros.superada !== 'Todos'
                                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                    : 'bg-[#2E2D2D] border-gray-100/10 text-white hover:bg-[#3E3D3D]'
                            }`}
                        >
                            <option value="Todos">📊 Todas</option>
                            <option value="Si">✓ Superadas</option>
                            <option value="No">⏳ Pendientes</option>
                        </select>
                    </div>

                    {/* Limpiar filtros */}
                    {hayFiltrosActivos && (
                        <button
                            onClick={limpiarFiltros}
                            className="w-full sm:w-auto px-3 py-2 text-xs font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5"
                            title="Limpiar todos los filtros"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6l-12 12M6 6l12 12"/>
                            </svg>
                            <span className="hidden sm:inline">Limpiar</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
