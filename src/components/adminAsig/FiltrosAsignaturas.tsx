'use client';

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

    return (
        <div className="flex flex-wrap gap-2">
            {/* Curso */}
            <select
                value={filtros.curso}
                onChange={(e) => handleChange('curso', Number(e.target.value))}
                className="px-2 py-1 text-xs bg-[#2E2D2D] border border-[#2E2D2D] rounded text-white focus:outline-none focus:border-orange-500"
            >
                <option value="0">Todos</option>
                <option value="1">1º</option>
                <option value="2">2º</option>
                <option value="3">3º</option>
                <option value="4">4º</option>
            </select>

            {/* Cuatrimestre */}
            <select
                value={filtros.cuatrimestre}
                onChange={(e) => handleChange('cuatrimestre', Number(e.target.value))}
                className="px-2 py-1 text-xs bg-[#2E2D2D] border border-[#2E2D2D] rounded text-white focus:outline-none focus:border-orange-500"
            >
                <option value="0">C1 y C2</option>
                <option value="1">C1</option>
                <option value="2">C2</option>
            </select>

            {/* Carácter */}
            <select
                value={filtros.caracter}
                onChange={(e) => handleChange('caracter', e.target.value)}
                className="px-2 py-1 text-xs bg-[#2E2D2D] border border-[#2E2D2D] rounded text-white focus:outline-none focus:border-orange-500"
            >
                <option value="Todos">Todos</option>
                <option value="Básico">Básico</option>
                <option value="Obligatorio">Obligatorio</option>
                <option value="Optativo">Optativo</option>
            </select>

            {/* Superada */}
            <select
                value={filtros.superada}
                onChange={(e) => handleChange('superada', e.target.value)}
                className="px-2 py-1 text-xs bg-[#2E2D2D] border border-[#2E2D2D] rounded text-white focus:outline-none focus:border-orange-500"
            >
                <option value="Todos">Todas</option>
                <option value="Si">✓</option>
                <option value="No">Pendientes</option>
            </select>

            {/* Especialidad */}
            <select
                value={filtros.especialidad}
                onChange={(e) => handleChange('especialidad', e.target.value)}
                className="px-2 py-1 text-xs bg-[#2E2D2D] border border-[#2E2D2D] rounded text-white focus:outline-none focus:border-orange-500"
            >
                <option value="Todas">Todas</option>
                <option value="">Común</option>
                <option value="Ingeniería del Software">Software</option>
                <option value="Ingeniería de Computadores">Computadores</option>
                <option value="Computación">Computación</option>
            </select>

            {/* Limpiar filtros */}
            <button
                onClick={limpiarFiltros}
                className="px-2 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors duration-300"
            >
                ✕
            </button>
        </div>
    );
}
