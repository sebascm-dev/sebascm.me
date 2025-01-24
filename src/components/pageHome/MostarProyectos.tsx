import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Link } from 'next-view-transitions';
import { cookies } from "next/headers";

export default async function MostrarProyectos() {
    const supabase = createServerComponentClient({ cookies });
    
    // Consulta los últimos 4 proyectos ordenados por la fecha de creación
    const { data: projects, error } = await supabase
        .from('projects')
        .select('imagen') // Asegúrate de que el campo `imagen` existe en tu tabla `projects`
        .order('created_at', { ascending: false })
        .limit(4);

    // Manejo de errores
    if (error) {
        console.error("Error al obtener los proyectos:", error);
        return <p>Error al cargar los proyectos.</p>;
    }

    return (
        <section className="relative flex flex-col border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300 group">
            <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                <p className="mt-0.5 font-bold text-sm text-white">Proyectos</p>
            </header>
            <div className="relative w-full h-52 overflow-hidden group-hover:blur-sm transition-all duration-300">
                <div className="relative w-full h-full flex flex-row gap-2 justify-center items-center">
                    {projects.map((project, index) => (
                        <img
                            key={index}
                            src={project.imagen} // Imagen dinámica desde la base de datos
                            alt={`Proyecto ${index + 1}`}
                            className={`absolute aspect-video h-36 object-cover rounded-lg shadow-lg transform transition-all duration-300 ${
                                index === 0
                                    ? "rotate-[-5deg] -translate-x-5"
                                    : index === 1
                                    ? "rotate-[32deg]"
                                    : index === 2
                                    ? "rotate-[-32deg] translate-x-10"
                                    : "rotate-[7deg] translate-x-1"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link href="/proyectos" className="px-6 py-2 font-semibold text-white bg-[#2E2D2D]/30 rounded-lg shadow-lg hover:bg-[#2E2D2D] transition-all duration-300">
                    Ver Proyectos
                </Link>
            </div>
        </section>
    );
}

