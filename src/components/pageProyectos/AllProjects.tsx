import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Link } from 'next-view-transitions';
import { cookies } from "next/headers";

export default async function UltimoPost() {
    const supabase = createServerComponentClient({ cookies });
    const { data: projects } = await supabase
        .from('projects')
        .select()
        .order('created_at', { ascending: false })

    return (
        <>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-28'>
                {projects?.map((project) => {
                    // Convertir la fecha a un objeto Date
                    const fecha = new Date(project.fecFin);
                    // Formatear la fecha
                    const opciones = { day: '2-digit', month: 'long', year: 'numeric' } as const;
                    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

                    return (
                        <article
                            key={project.id}
                            className='relative w-full border border-[#2E2D2D] rounded-lg p-0.5 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-all duration-300 mb-6 flex flex-col md:flex-row gap-2'
                        >
                            <div>
                                <img
                                    src={project.imagen}
                                    alt={project.titulo}
                                    className='aspect-video object-cover h-auto rounded-md opacity-100 hover:opacity-10 transition-opacity duration-300 z-30'
                                />
                            </div>

                            <div className='flex flex-row gap-2 absolute top-[24px] md:top-[22px] right-3 -z-10'>
                                <div className='flex flex-row gap-0.5 items-center -mt-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-5">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M6 18l0 -3" />
                                        <path d="M10 18l0 -6" />
                                        <path d="M14 18l0 -9" />
                                        <path d="M18 18l0 -12" />
                                    </svg>
                                    <p className='text-xs mt-[1px] text-gray-100/85 tabular-nums'>{project.visitas}</p>
                                </div>
                                <div className='flex flex-row gap-0.5 items-center -mt-4'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none" // Cambiar el color según el estado
                                        stroke="orange"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`icon icon-tabler icons-tabler-outline icon-tabler-heart transition-colors duration-300`}
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                    </svg>
                                    <p className='mt-[1px] text-xs tabular-nums text-gray-100/85'>{project.likes}</p>
                                </div>
                            </div>

                            <p className='absolute top-[5.5px] left-2 text-sm text-gray-100/50 border-l-2 border-white/70 px-2 mb-4 h-5 -z-10'>
                                {fechaFormateada}
                            </p>

                            <h1 className='absolute top-9 left-2 line-clamp-1 text-sm font-semibold text-white -z-10'>{project.titulo}</h1>

                            <p className=' absolute top-12 left-2 text-sm text-gray-100/50 text-pretty mb-10 line-clamp-4 mt-2 -z-10'>
                                {project.descripcion}
                            </p>
                            
                            <div className='flex flex-row gap-2 absolute bottom-1 left-2 -z-10'>
                                {['skill1', 'skill2', 'skill3', 'skill4', 'skill5'].map((skill, index) => (
                                    <img
                                        key={index}
                                        src={project[skill]}
                                        alt={skill}
                                        className='size-5 opacity-60 scale-100 hover:scale-110 hover:opacity-75 transition-transform duration-300'
                                    />
                                ))}
                            </div>

                            <div className='absolute bottom-[9px] right-2 flex flex-row gap-2'>
                                <div className="bg-transparent rounded-md size-5">
                                    <a
                                        href={project.github}
                                        target="_blank"

                                        className="flex items-center justify-center cursor-pointer rounded-md text-neutral-800 hover:text-neutral-100 font-medium scale-100 hover:scale-110 transition-transform duration-300 relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-[#D1D0D1] data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-[#D1D0D1] data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                                        data-tooltip="GitHub"
                                    >
                                        <svg
                                            viewBox="0 0 256 250"
                                            width="30"
                                            height="30"
                                            fill="#D1D0D1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            preserveAspectRatio="xMidYMid"
                                        >
                                            <path
                                                d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            <Link
                                href={`/proyectos/${project.enlace}`}
                                className='absolute text-sm bottom-1 right-10 text-[#EDEDED]/80 scale-100 hover:text-[#EDEDED]/100 hover:scale-105 transition-all duration-300'
                            >
                                WebSite
                            </Link>

                            <Link
                                href={`/proyectos/${project.id}-${encodeURIComponent(project.titulo)}`}
                                className='absolute text-sm bottom-1 right-[105px] text-[#EDEDED]/80 scale-100 hover:text-[#EDEDED]/100 hover:scale-105 transition-all duration-300'
                            >
                                Leer más
                            </Link>

                        </article>
                    );
                })}
            </section>
        </>
    );
}
