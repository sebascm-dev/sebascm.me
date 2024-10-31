import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Link } from 'next-view-transitions';
import { cookies } from "next/headers";

export default async function Blog() {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase
    .from('posts')
    .select()
    .order('created_at', { ascending: false })

  return (
    <>
      <main className="
        mx-auto max-w-6xl bg-black bg-opacity-0
        lg:p-4 lg:mt-28 lg:w-[85%]
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 w-[90%]
      ">
        <h1 className="text-3xl md:text-5xl text-pretty font-semibold text-white">Escribiendo sobre programación, tips, hobbies y cosas varias.</h1>
        <p className="text-sm md:text-base mt-3 text-pretty md:mt-6 text-gray-100/75">Si quieres saber más sobre mí y conocerme un poco mejor, este es el sitio indicado. Todos estos posts también están en mi LinkedIn por si prefieres echarle un ojo.</p>

        <section className='mt-12 md:pl-8 md:border-l md:border-white/25'>
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
                <Link href={`/blog/posts/${post.id}-${encodeURIComponent(post.titulo)}`} key={post.id}>
                  <article className='border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] hover:border-[#EDEDED]/30 transition-colors duration-300 mb-6'>
                    <header className='flex flex-row justify-between'>
                      <p className='text-sm text-gray-100/50 border-l-2 border-white/70 px-2 mb-4 h-5'>{fechaFormateada}</p>
                      <div className='flex flex-row gap-2'>
                        <div className='flex flex-row gap-0.5 items-center -mt-4'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-5">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M6 18l0 -3" />
                            <path d="M10 18l0 -6" />
                            <path d="M14 18l0 -9" />
                            <path d="M18 18l0 -12" />
                          </svg>
                          <p className='text-xs mt-[1px] text-gray-100/85 tabular-nums'>{post.visitas}</p>
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
                          <p className='mt-[1px] text-xs tabular-nums text-gray-100/85'>{post.likes}</p>
                        </div>
                      </div>
                    </header>
                    <h1 className='font-semibold mb-1 text-white'>{post.titulo}</h1>
                    <div className='flex flex-wrap gap-1 mb-2'>
                      {tagsArray.map((tag: string, index: number) => (
                        <span key={index} className='border border-[#2E2D2D] px-2 py-1 text-xs font-semibold text-[#EDEDED]/80 rounded-md'>#{tag}</span>
                      ))}
                    </div>
                    <p className='text-sm text-gray-100/50 text-pretty line-clamp-4 mt-2'>{post.descripcion}</p>
                  </article>
                </Link>
              );
            })
          }
        </section>
      </main>
    </>
  );
}
