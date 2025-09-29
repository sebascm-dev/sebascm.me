'use client';

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
    estado?: string;
    turno?: string;
    matriculacion?: string;
    url?: string;
    profesor_responsable?: string;
    mail_profesor?: string;
    telefono_profesor?: string;
    despacho?: string;
    tutorias?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
}

interface TarjetaAsignaturaProps {
    asignatura: Asignatura;
    onEditar: (asignatura: Asignatura) => void;
    onEliminar: (id: number) => void;
    onToggleSuperada: (asignatura: Asignatura) => void;
    onToggleCursando: (asignatura: Asignatura) => void;
    onToggleSuspensa: (asignatura: Asignatura) => void;
}

export default function TarjetaAsignatura({ asignatura, onEditar, onEliminar, onToggleSuperada, onToggleCursando, onToggleSuspensa }: TarjetaAsignaturaProps) {
    const colorCaracter: Record<string, string> = {
        'Básico': 'text-blue-400',
        'Obligatorio': 'text-green-400',
        'Optativo': 'text-purple-400'
    };

    const colorNota = (nota?: number) => {
        if (!nota) return 'text-gray-100/50';
        if (nota >= 9) return 'text-green-400';
        if (nota >= 7) return 'text-blue-400';
        if (nota >= 5) return 'text-yellow-400';
        return 'text-red-400';
    };

    // Colores por rama/especialidad
    const getBorderColor = () => {
        if (!asignatura.especialidad || asignatura.especialidad === '' || asignatura.especialidad === 'Común') {
            return 'border-l-gray-500/50'; // Troncal/Común
        }
        if (asignatura.especialidad === 'Ingeniería del Software') {
            return 'border-l-blue-500'; // Software = Azul
        }
        if (asignatura.especialidad === 'Ingeniería de Computadores') {
            return 'border-l-orange-500'; // Computadores = Naranja
        }
        if (asignatura.especialidad === 'Computación') {
            return 'border-l-purple-500'; // Computación = Morado
        }
        if (asignatura.especialidad === 'Todas') {
            return 'border-l-green-500'; // Optativas de todas = Verde
        }
        return 'border-l-gray-500/50';
    };

    const getRamaInfo = () => {
        if (!asignatura.especialidad || asignatura.especialidad === '' || asignatura.especialidad === 'Común') {
            return { nombre: 'Troncal', color: 'text-gray-500/40' };
        }
        if (asignatura.especialidad === 'Ingeniería del Software') {
            return { nombre: 'Software', color: 'text-blue-500/40' };
        }
        if (asignatura.especialidad === 'Ingeniería de Computadores') {
            return { nombre: 'Computadores', color: 'text-orange-500/40' };
        }
        if (asignatura.especialidad === 'Computación') {
            return { nombre: 'Computación', color: 'text-purple-500/40' };
        }
        if (asignatura.especialidad === 'Todas') {
            return { nombre: 'Optativa', color: 'text-green-500/40' };
        }
        return { nombre: 'Común', color: 'text-gray-500/40' };
    };

    const ramaInfo = getRamaInfo();

    // Determinar color de fondo según estado
    const getBackgroundColor = () => {
        if (asignatura.superada) {
            return 'bg-green-500/10';
        }
        if (asignatura.estado === 'Cursando') {
            return 'bg-blue-500/10';
        }
        if (asignatura.estado === 'Suspensa') {
            return 'bg-red-500/10';
        }
        return '';
    };

    return (
        <div 
            onClick={() => onEditar(asignatura)}
            className={`
                flex items-center gap-2 px-3 py-1.5 border-b border-l-2 border-[#2E2D2D] 
                hover:bg-[#1C1C1C]/50 transition-colors duration-200 cursor-pointer
                ${getBorderColor()}
                ${getBackgroundColor()}
            `}
        >
            {/* Checkbox - Completada */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleSuperada(asignatura);
                }}
                className="shrink-0"
                title={asignatura.superada ? 'Marcar como no superada' : 'Marcar como superada'}
            >
                {asignatura.superada ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l2 2l4 -4" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-100/30 hover:text-gray-100/60">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    </svg>
                )}
            </button>

            {/* Checkbox - Cursando */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleCursando(asignatura);
                }}
                className={`shrink-0 w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    asignatura.estado === 'Cursando'
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-100/30 hover:border-blue-400/50 hover:bg-blue-500/10'
                }`}
                title={asignatura.estado === 'Cursando' ? 'Dejar de cursar' : 'Marcar como cursando'}
            >
                {asignatura.estado === 'Cursando' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                )}
            </button>

            {/* Checkbox - Suspensa */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleSuspensa(asignatura);
                }}
                className={`shrink-0 w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    asignatura.estado === 'Suspensa'
                        ? 'bg-red-500 border-red-500'
                        : 'border-gray-100/30 hover:border-red-400/50 hover:bg-red-500/10'
                }`}
                title={asignatura.estado === 'Suspensa' ? 'Quitar suspensa' : 'Marcar como suspensa'}
            >
                {asignatura.estado === 'Suspensa' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                )}
            </button>

            {/* Nombre */}
            <div className="flex-1 min-w-0 flex items-center gap-2">
                <h3 className="text-xs font-medium text-white truncate">
                    {asignatura.nombre}
                </h3>
                <span className={`text-[9px] font-medium ${ramaInfo.color} uppercase tracking-wider shrink-0`}>
                    {ramaInfo.nombre}
                </span>
            </div>

            {/* Carácter */}
            <div className="hidden md:block shrink-0">
                <span className={`text-[10px] font-medium ${colorCaracter[asignatura.caracter]}`}>
                    {asignatura.caracter === 'Básico' ? 'B' : asignatura.caracter === 'Obligatorio' ? 'O' : 'Op'}
                </span>
            </div>

            {/* ECTS */}
            <div className="hidden sm:block shrink-0 text-right min-w-[40px]">
                <span className="text-[10px] text-gray-100/75">
                    {asignatura.ects}
                </span>
            </div>

            {/* Nota */}
            <div className="hidden lg:block shrink-0 text-right min-w-[45px]">
                {asignatura.superada && asignatura.nota !== undefined && asignatura.nota !== null ? (
                    <span className={`text-xs font-bold ${colorNota(asignatura.nota)}`}>
                        {asignatura.nota.toFixed(2)}
                    </span>
                ) : (
                    <span className="text-[10px] text-gray-100/30">-</span>
                )}
            </div>

            {/* Especialidad */}
            {asignatura.especialidad && asignatura.especialidad !== 'Común' && asignatura.especialidad !== '' && (
                <div className="hidden xl:block shrink-0 max-w-[100px]">
                    <span className="text-[10px] text-gray-100/60 truncate block">
                        {asignatura.especialidad === 'Ingeniería del Software' ? 'Software' : 
                         asignatura.especialidad === 'Ingeniería de Computadores' ? 'Comp.' :
                         asignatura.especialidad === 'Computación' ? 'Comput.' : asignatura.especialidad}
                    </span>
                </div>
            )}

            {/* Acciones */}
            <div className="flex gap-1 shrink-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEliminar(asignatura.id);
                    }}
                    className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors duration-200"
                    title="Eliminar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
