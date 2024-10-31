import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Link } from 'next-view-transitions';
import { cookies } from "next/headers";

export default async function UltimoPost() {

    const supabase = createServerComponentClient({ cookies })
    const { data: posts } = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false })
        .limit(1);
    return (
        <>
            {
                posts?.map((post) => {
                    // Convertir la fecha a un objeto Date
                    const fecha = new Date(post.fechaLanzamiento);
                    // Formatear la fecha
                    const opciones = { day: '2-digit', month: 'long', year: 'numeric' } as const;
                    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

                    // Dividir las tags y generar spans
                    const tagsArray = post.tags.split(',').map((tag: string) => tag.trim());
                    return (
                        <section key={post.id} className="cursor-pointer md:w-[50%] border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
                            <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
                                <p className="mt-0.5 font-bold text-sm text-white">Último Post</p>
                            </header>

                            <Link href={`/blog/posts/${post.id}-${encodeURIComponent(post.titulo)}`}>
                                <p className="my-4 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">
                                    {fechaFormateada}
                                </p>
                                <h1 className="text-base text-[#EDEDED] font-semibold">{post.titulo}</h1>
                                <div className='flex flex-wrap gap-1 mb-4 mt-1'>
                                    {tagsArray.map((tag: string, index: number) => (
                                        <span key={index} className='border border-[#2E2D2D] px-2 py-1 text-xs font-semibold text-[#EDEDED]/80 rounded-md'>#{tag}</span>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-100/50 text-pretty line-clamp-4">{post.descripcion}</p>
                            </Link>
                        </section>
                    )
                })
            }
        </>
    );
}