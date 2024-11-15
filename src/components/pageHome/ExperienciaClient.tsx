"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

// Definición de la interfaz para las experiencias
interface Experience {
    id: number;
    nombre: string;
    puesto: string;
    tiempo: string;
    imagen: string;
    descripcion: string; // Asegúrate de que este campo existe en tu base de datos
}

interface ExperienciaClientProps {
    experiences: Experience[];
}

const ExperienciaClient: React.FC<ExperienciaClientProps> = ({ experiences }) => {
    // Estado para controlar la experiencia seleccionada y la visibilidad del modal
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para manejar el clic en una experiencia
    const handleExperienceClick = (exp: Experience) => {
        if (selectedExperience?.id === exp.id) {
            setIsModalOpen(false); // Cierra el modal si ya está abierto
            setSelectedExperience(null);
        } else {
            setSelectedExperience(exp); // Abre la experiencia seleccionada
            setIsModalOpen(true); // Abre el modal
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExperience(null);
    };

    return (
        <section className="relative flex flex-col md:w-[50%] border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300">
            <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                <p className="mt-0.5 font-bold text-sm text-white">Experiencia</p>
            </header>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 mt-4 mb-10 max-h-28 overflow-y-auto">
                {
                    experiences?.map((exp) => (
                        <article
                            key={exp.id}
                            className="cursor-pointer hover:bg-zinc-800/50 backdrop-blur-sm rounded-md transition-colors duration-300 p-1"
                            onClick={() => handleExperienceClick(exp)}
                        >
                            <header className="flex flex-row items-center gap-2" onClick={() => handleExperienceClick(exp)}>
                                <motion.img
                                    src={exp.imagen}
                                    alt={exp.nombre}
                                    className="size-10 object-cover shadow-lg rounded-md"
                                    layoutId={`image-${exp.id}`}
                                />
                                <div>
                                    <motion.h1 className='text-white' layoutId={`nombre-${exp.id}`}>
                                        {exp.nombre}
                                    </motion.h1>
                                    <motion.p className="text-sm text-gray-100/50" layoutId={`tiempo-${exp.id}`}>
                                        {exp.tiempo}
                                    </motion.p>
                                </div>
                            </header>
                        </article>
                    ))
                }
            </div>
            <footer className='flex flex-row justify-around absolute bottom-2 left-0 right-0 text-white'>
                <a href='https://read.cv/sebascm' className='border border-[#2E2D2D] p-1 text-sm w-[47%] flex flex-row gap-2 items-center justify-center rounded-sm hover:border-[#EDEDED]/30 transition-all duration-300 hover:scale-105'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-script"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 20h-11a3 3 0 0 1 0 -6h11a3 3 0 0 0 0 6h1a3 3 0 0 0 3 -3v-11a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v8" /></svg>
                    <p className=''>Read.cv</p>
                </a>
                <a href='/documentos/sebascm-cv.pdf' target='_blank' download="Curriculum Sebastián Contreras Marín.pdf" className='border border-[#2E2D2D] p-1 text-sm w-[47%] flex flex-row gap-2 items-center justify-center rounded-sm hover:border-[#EDEDED]/30 transition-all duration-300 hover:scale-105'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                    <p className=''>Descargar CV</p>
                </a>
            </footer>

            {/* Modal */}
            {isModalOpen && selectedExperience && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 p-2 backdrop-blur-sm bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="rounded-lg z-40 p-2 pt-6 shadow-lg backdrop-blur-md bg-[#1E1E1E]/80 border border-[#2E2D2D] w-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="absolute top-0 right-2 text-gray-500" onClick={closeModal}>
                            &times; {/* Icono para cerrar el modal */}
                        </button>
                        <header className='flex flex-row justify-between items-start relative'>
                            <div className='flex flex-row items-center gap-2'>
                                <motion.img
                                    src={selectedExperience.imagen}
                                    alt=""
                                    className='size-8 object-cover rounded-md shadow-lg md:size-12'
                                    layoutId={`image-${selectedExperience.id}`}
                                />
                                <div>
                                    <motion.h2
                                        className="text-sm md:text-lg font-semibold text-white"
                                        layoutId={`nombre-${selectedExperience.id}`}
                                    >
                                        {selectedExperience.nombre}
                                    </motion.h2>
                                    <motion.h3
                                        className='text-xs md:text-sm text-gray-100/70'
                                        layoutId={`puesto-${selectedExperience.id}`}
                                    >
                                        {selectedExperience.puesto}
                                    </motion.h3>
                                </div>
                            </div>
                            <motion.p
                                className='text-xs absolute top-0 right-0 text-gray-100/70'
                                layoutId={`tiempo-${selectedExperience.id}`}
                            >
                                {selectedExperience.tiempo}
                            </motion.p>
                        </header>

                        {/* Contenedor para el contenido desplazable */}
                        <div className=" mt-2 max-h-60 overflow-y-auto">
                            <p className='text-[#dfdfdf] text-xs md:text-sm text-pretty'>{selectedExperience.descripcion}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};

export default ExperienciaClient;
