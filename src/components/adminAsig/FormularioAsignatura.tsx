'use client';

import { useState, useEffect } from 'react';

interface Asignatura {
    id?: number;
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

interface FormularioAsignaturaProps {
    asignatura: Asignatura | null;
    onGuardar: (asignatura: Partial<Asignatura>) => void;
    onCancelar: () => void;
}

export default function FormularioAsignatura({ asignatura, onGuardar, onCancelar }: FormularioAsignaturaProps) {
    const [formData, setFormData] = useState<Partial<Asignatura>>({
        nombre: '',
        codigo: '',
        caracter: 'Obligatorio',
        ects: 6,
        curso: 1,
        cuatrimestre: 1,
        especialidad: '',
        materia: '',
        modulo: '',
        descripcion: '',
        superada: false,
        nota: undefined,
        convocatoria: undefined,
        anio_academico: ''
    });

    useEffect(() => {
        if (asignatura) {
            setFormData(asignatura);
        }
    }, [asignatura]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'number') {
            setFormData({ ...formData, [name]: value === '' ? undefined : Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGuardar(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="border border-[#2E2D2D] rounded-md p-6 bg-[#1C1C1C] backdrop-blur-[2px]">
            <h2 className="text-2xl font-bold text-white mb-6">
                {asignatura ? 'Editar Asignatura' : 'Nueva Asignatura'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Nombre */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Código */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Código
                    </label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Carácter */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Carácter *
                    </label>
                    <select
                        name="caracter"
                        value={formData.caracter}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="Básico">Básico</option>
                        <option value="Obligatorio">Obligatorio</option>
                        <option value="Optativo">Optativo</option>
                    </select>
                </div>

                {/* ECTS */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        ECTS *
                    </label>
                    <input
                        type="number"
                        name="ects"
                        value={formData.ects}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.5"
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Curso */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Curso *
                    </label>
                    <select
                        name="curso"
                        value={formData.curso}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="1">1º</option>
                        <option value="2">2º</option>
                        <option value="3">3º</option>
                        <option value="4">4º</option>
                    </select>
                </div>

                {/* Cuatrimestre */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Cuatrimestre *
                    </label>
                    <select
                        name="cuatrimestre"
                        value={formData.cuatrimestre}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="1">Primer</option>
                        <option value="2">Segundo</option>
                    </select>
                </div>

                {/* Especialidad */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Especialidad
                    </label>
                    <select
                        name="especialidad"
                        value={formData.especialidad || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="">Común</option>
                        <option value="Ingeniería del Software">Ingeniería del Software</option>
                        <option value="Ingeniería de Computadores">Ingeniería de Computadores</option>
                        <option value="Computación">Computación</option>
                        <option value="Todas">Todas</option>
                    </select>
                </div>

                {/* Materia */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Materia
                    </label>
                    <input
                        type="text"
                        name="materia"
                        value={formData.materia || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Módulo */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Módulo
                    </label>
                    <input
                        type="text"
                        name="modulo"
                        value={formData.modulo || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Año Académico */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Año Académico
                    </label>
                    <input
                        type="text"
                        name="anio_academico"
                        value={formData.anio_academico || ''}
                        onChange={handleChange}
                        placeholder="2024/2025"
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Superada */}
                <div className="flex items-center mt-7">
                    <input
                        type="checkbox"
                        name="superada"
                        checked={formData.superada}
                        onChange={handleChange}
                        className="size-4 mr-2"
                    />
                    <label className="text-sm font-medium text-gray-100/75">
                        Superada
                    </label>
                </div>

                {/* Nota */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Nota
                    </label>
                    <input
                        type="number"
                        name="nota"
                        value={formData.nota || ''}
                        onChange={handleChange}
                        min="0"
                        max="10"
                        step="0.01"
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Convocatoria */}
                <div>
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Convocatoria
                    </label>
                    <input
                        type="number"
                        name="convocatoria"
                        value={formData.convocatoria || ''}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Descripción */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-100/75 mb-2">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion || ''}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 bg-[#2E2D2D] border border-[#2E2D2D] rounded-md text-white focus:outline-none focus:border-orange-500"
                    />
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 mt-6">
                <button
                    type="button"
                    onClick={onCancelar}
                    className="px-4 py-2 bg-[#2E2D2D] hover:bg-[#3E3D3D] text-white rounded-md transition-colors duration-300"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold transition-colors duration-300"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
}
