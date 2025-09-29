'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import FormularioAsignatura from './FormularioAsignatura';
import TarjetaAsignatura from './TarjetaAsignatura';
import FiltrosAsignaturas from './FiltrosAsignaturas';

interface Asignatura {
    id: number;
    nombre: string;
    codigo?: string;
    caracter: string;
    ects: number;
    curso: number;
    cuatrimestre: number;
    especialidad?: string;
    materia?: string;
    modulo?: string;
    descripcion?: string;
    superada: boolean;
    nota?: number;
    convocatoria?: number;
    anio_academico?: string;
}

interface AsignaturasAdminProps {
    asignaturas: Asignatura[];
}

export default function AsignaturasAdmin({ asignaturas: asignaturasIniciales }: AsignaturasAdminProps) {
    const [asignaturas, setAsignaturas] = useState<Asignatura[]>(asignaturasIniciales);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [asignaturaEditando, setAsignaturaEditando] = useState<Asignatura | null>(null);
    const [ramaElegida, setRamaElegida] = useState<string>('');
    const [filtros, setFiltros] = useState({
        curso: 0,
        cuatrimestre: 0,
        caracter: 'Todos',
        superada: 'Todos',
        especialidad: 'Todas'
    });
    const supabase = createClientComponentClient();

    // Cargar rama elegida desde localStorage
    useEffect(() => {
        const ramaGuardada = localStorage.getItem('ramaElegida');
        if (ramaGuardada) {
            setRamaElegida(ramaGuardada);
        }
    }, []);

    // Guardar rama elegida en localStorage
    const handleCambiarRama = (rama: string) => {
        setRamaElegida(rama);
        localStorage.setItem('ramaElegida', rama);
    };

    // Filtrar asignaturas según rama elegida
    const asignaturasVisibles = ramaElegida 
        ? asignaturas.filter(asig => {
            // Mostrar solo asignaturas troncales/comunes y de la rama elegida
            return !asig.especialidad || 
                   asig.especialidad === '' || 
                   asig.especialidad === 'Común' || 
                   asig.especialidad === ramaElegida ||
                   asig.especialidad === 'Todas';
        })
        : asignaturas;

    // Filtrar asignaturas con filtros adicionales
    const asignaturasFiltradas = asignaturasVisibles.filter(asig => {
        if (filtros.curso !== 0 && asig.curso !== filtros.curso) return false;
        if (filtros.cuatrimestre !== 0 && asig.cuatrimestre !== filtros.cuatrimestre) return false;
        if (filtros.caracter !== 'Todos' && asig.caracter !== filtros.caracter) return false;
        if (filtros.superada === 'Si' && !asig.superada) return false;
        if (filtros.superada === 'No' && asig.superada) return false;
        if (filtros.especialidad !== 'Todas' && asig.especialidad !== filtros.especialidad) return false;
        return true;
    });

    // Estadísticas basadas en asignaturas visibles
    const totalAsignaturas = asignaturasVisibles.length;
    const asignaturasSuperadas = asignaturasVisibles.filter(a => a.superada).length;
    const creditosTotales = 240; // Total necesario para graduarse
    const creditosSuperados = asignaturasVisibles.filter(a => a.superada).reduce((sum, a) => sum + Number(a.ects), 0);
    const notaMedia = asignaturasVisibles.filter(a => a.superada && a.nota).length > 0
        ? (asignaturasVisibles.filter(a => a.superada && a.nota).reduce((sum, a) => sum + Number(a.nota || 0), 0) / asignaturasVisibles.filter(a => a.superada && a.nota).length).toFixed(2)
        : '0.00';

    const handleCrear = () => {
        setAsignaturaEditando(null);
        setMostrarFormulario(true);
    };

    const handleEditar = (asignatura: Asignatura) => {
        setAsignaturaEditando(asignatura);
        setMostrarFormulario(true);
    };

    const handleEliminar = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta asignatura?')) return;

        const { error } = await supabase
            .from('asignaturas')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar la asignatura');
            return;
        }

        setAsignaturas(asignaturas.filter(a => a.id !== id));
    };

    const handleGuardar = async (asignatura: Partial<Asignatura>) => {
        if (asignaturaEditando) {
            // Actualizar
            const { data, error } = await supabase
                .from('asignaturas')
                .update(asignatura)
                .eq('id', asignaturaEditando.id)
                .select()
                .single();

            if (error) {
                console.error('Error al actualizar:', error);
                alert('Error al actualizar la asignatura');
                return;
            }

            setAsignaturas(asignaturas.map(a => a.id === asignaturaEditando.id ? data : a));
        } else {
            // Crear
            const { data, error } = await supabase
                .from('asignaturas')
                .insert(asignatura)
                .select()
                .single();

            if (error) {
                console.error('Error al crear:', error);
                alert('Error al crear la asignatura');
                return;
            }

            setAsignaturas([...asignaturas, data]);
        }

        setMostrarFormulario(false);
        setAsignaturaEditando(null);
    };

    const handleToggleSuperada = async (asignatura: Asignatura) => {
        const { data, error } = await supabase
            .from('asignaturas')
            .update({ superada: !asignatura.superada })
            .eq('id', asignatura.id)
            .select()
            .single();

        if (error) {
            console.error('Error al actualizar:', error);
            return;
        }

        setAsignaturas(asignaturas.map(a => a.id === asignatura.id ? data : a));
    };

    const handleToggleCursando = async (asignatura: Asignatura) => {
        const nuevoEstado = asignatura.estado === 'Cursando' ? null : 'Cursando';
        
        const { data, error } = await supabase
            .from('asignaturas')
            .update({ estado: nuevoEstado })
            .eq('id', asignatura.id)
            .select()
            .single();

        if (error) {
            console.error('Error al actualizar:', error);
            return;
        }

        setAsignaturas(asignaturas.map(a => a.id === asignatura.id ? data : a));
    };

    const handleToggleSuspensa = async (asignatura: Asignatura) => {
        const nuevoEstado = asignatura.estado === 'Suspensa' ? null : 'Suspensa';
        
        const { data, error } = await supabase
            .from('asignaturas')
            .update({ estado: nuevoEstado })
            .eq('id', asignatura.id)
            .select()
            .single();

        if (error) {
            console.error('Error al actualizar:', error);
            return;
        }

        setAsignaturas(asignaturas.map(a => a.id === asignatura.id ? data : a));
    };

    return (
        <div>
            {/* Selector de Especialidad */}
            <section className="mb-6 border-2 border-orange-500/30 rounded-lg p-4 bg-gradient-to-r from-orange-500/10 to-transparent">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                            🎯 Mi Especialidad
                        </h3>
                        <p className="text-[10px] text-gray-100/60">
                            Selecciona tu rama para ver solo las asignaturas relevantes (240 ECTS totales)
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleCambiarRama('Ingeniería del Software')}
                            className={`px-3 py-2 text-xs font-medium rounded transition-all duration-300 ${
                                ramaElegida === 'Ingeniería del Software'
                                    ? 'bg-blue-500 text-white border-2 border-blue-400'
                                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20'
                            }`}
                        >
                            Software
                        </button>
                        <button
                            onClick={() => handleCambiarRama('Ingeniería de Computadores')}
                            className={`px-3 py-2 text-xs font-medium rounded transition-all duration-300 ${
                                ramaElegida === 'Ingeniería de Computadores'
                                    ? 'bg-orange-500 text-white border-2 border-orange-400'
                                    : 'bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20'
                            }`}
                        >
                            Computadores
                        </button>
                        <button
                            onClick={() => handleCambiarRama('Computación')}
                            className={`px-3 py-2 text-xs font-medium rounded transition-all duration-300 ${
                                ramaElegida === 'Computación'
                                    ? 'bg-purple-500 text-white border-2 border-purple-400'
                                    : 'bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20'
                            }`}
                        >
                            Computación
                        </button>
                        {ramaElegida && (
                            <button
                                onClick={() => handleCambiarRama('')}
                                className="px-3 py-2 text-xs font-medium rounded bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all duration-300"
                            >
                                ✕ Ver todas
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Estadísticas */}
            <section className="grid grid-cols-5 gap-3 mb-6">
                <div className="border border-[#2E2D2D] rounded px-4 py-2 bg-[#1C1C1C]/50 text-center">
                    <p className="text-[10px] text-gray-100/50 mb-1 uppercase tracking-wide">Total</p>
                    <p className="text-xl font-bold text-white">{totalAsignaturas}</p>
                </div>
                <div className="border border-[#2E2D2D] rounded px-4 py-2 bg-[#1C1C1C]/50 text-center">
                    <p className="text-[10px] text-gray-100/50 mb-1 uppercase tracking-wide">Superadas</p>
                    <p className="text-xl font-bold text-green-400">{asignaturasSuperadas}</p>
                </div>
                <div className="border border-[#2E2D2D] rounded px-4 py-2 bg-[#1C1C1C]/50 text-center">
                    <p className="text-[10px] text-gray-100/50 mb-1 uppercase tracking-wide">Créditos</p>
                    <p className="text-xl font-bold text-white">{creditosSuperados}/{creditosTotales}</p>
                </div>
                <div className="border border-[#2E2D2D] rounded px-4 py-2 bg-[#1C1C1C]/50 text-center">
                    <p className="text-[10px] text-gray-100/50 mb-1 uppercase tracking-wide">Media</p>
                    <p className="text-xl font-bold text-blue-400">{notaMedia}</p>
                </div>
                <div className="border border-[#2E2D2D] rounded px-4 py-2 bg-[#1C1C1C]/50 text-center">
                    <p className="text-[10px] text-gray-100/50 mb-1 uppercase tracking-wide">Progreso</p>
                    <p className="text-xl font-bold text-purple-400">{((creditosSuperados / creditosTotales) * 100).toFixed(0)}%</p>
                </div>
            </section>

            {/* Leyenda de colores y estados */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
                {/* Colores de rama */}
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500/50"></div>
                    <span className="text-gray-100/60">Troncal</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-100/60">Software</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-100/60">Computadores</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span className="text-gray-100/60">Computación</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-gray-100/60">Optativas</span>
                </div>
                
                {/* Separador */}
                <div className="w-px h-4 bg-gray-100/20"></div>
                
                {/* Estados */}
                <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M9 12l2 2l4 -4" />
                    </svg>
                    <span className="text-gray-100/60">Superada</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border-2 bg-blue-500 border-blue-500"></div>
                    <span className="text-gray-100/60">Cursando</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border-2 bg-red-500 border-red-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </div>
                    <span className="text-gray-100/60">Suspensa</span>
                </div>
            </div>

            {/* Botón crear + Filtros */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
                <button
                    onClick={handleCrear}
                    className="px-3 py-1.5 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded font-medium transition-colors duration-300"
                >
                    + Nueva
                </button>

                <FiltrosAsignaturas filtros={filtros} setFiltros={setFiltros} />
            </div>

            {/* Formulario Modal */}
            {mostrarFormulario && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <FormularioAsignatura
                            asignatura={asignaturaEditando}
                            onGuardar={handleGuardar}
                            onCancelar={() => {
                                setMostrarFormulario(false);
                                setAsignaturaEditando(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Lista de asignaturas agrupadas por curso y cuatrimestre */}
            <div className="space-y-6">
                {[1, 2, 3, 4].map(curso => (
                    <div key={curso}>
                        {[1, 2].map(cuatrimestre => {
                            const asignaturasGrupo = asignaturasFiltradas.filter(
                                a => a.curso === curso && a.cuatrimestre === cuatrimestre
                            );

                            if (asignaturasGrupo.length === 0) return null;

                            return (
                                <div key={`${curso}-${cuatrimestre}`} className="mb-6">
                                    <h2 className="text-sm font-bold text-white mb-2 px-4 py-1.5 bg-[#1C1C1C]/30 border-l-2 border-orange-500">
                                        {curso}º - C{cuatrimestre}
                                    </h2>
                                    <div className="border border-[#2E2D2D] rounded-md bg-[#1C1C1C]/20 overflow-hidden">
                                        {/* Encabezado de la tabla */}
                                        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#2E2D2D] bg-[#1C1C1C]/50">
                                            <div className="w-5 shrink-0"></div>
                                            <div className="w-4 shrink-0"></div>
                                            <div className="w-4 shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[10px] font-bold text-gray-100/50 uppercase">Asignatura</span>
                                            </div>
                                            <div className="hidden md:block shrink-0">
                                                <span className="text-[10px] font-bold text-gray-100/50 uppercase">Tipo</span>
                                            </div>
                                            <div className="hidden sm:block shrink-0 text-right min-w-[40px]">
                                                <span className="text-[10px] font-bold text-gray-100/50 uppercase">ECTS</span>
                                            </div>
                                            <div className="hidden lg:block shrink-0 text-right min-w-[45px]">
                                                <span className="text-[10px] font-bold text-gray-100/50 uppercase">Nota</span>
                                            </div>
                                            <div className="hidden xl:block shrink-0 max-w-[100px]">
                                                <span className="text-[10px] font-bold text-gray-100/50 uppercase">Especialidad</span>
                                            </div>
                                            <div className="flex gap-1 shrink-0">
                                                <div className="w-[22px]"></div>
                                            </div>
                                        </div>
                                        
                                        {/* Lista de asignaturas */}
                                        {asignaturasGrupo.map(asignatura => (
                                            <TarjetaAsignatura
                                                key={asignatura.id}
                                                asignatura={asignatura}
                                                onEditar={handleEditar}
                                                onEliminar={handleEliminar}
                                                onToggleSuperada={handleToggleSuperada}
                                                onToggleCursando={handleToggleCursando}
                                                onToggleSuspensa={handleToggleSuspensa}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {asignaturasFiltradas.length === 0 && (
                <div className="text-center py-16 text-gray-100/50">
                    <p>No hay asignaturas que coincidan con los filtros.</p>
                </div>
            )}
        </div>
    );
}
