import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Link } from 'next-view-transitions';
import { cookies } from "next/headers";

export default async function Blog() {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase.from('posts').select();

  return (
    <>
      <main className="
        mx-auto max-w-4xl bg-black bg-opacity-0
        lg:p-4 lg:mt-28 lg:w-[85%]
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 w-[90%]
      ">
        <h1 className="text-3xl md:text-5xl text-pretty font-semibold">Escribiendo sobre programación, tips, hobbies y cosas varias.</h1>
        <p className="text-sm md:text-base mt-3 text-pretty md:mt-6 text-gray-100/75">Si quieres saber más sobre mí y conocerme un poco mejor, este es el sitio indicado. Todos estos posts también están en mi LinkedIn por si prefieres echarle un ojo.</p>

        <section className='mt-12 pl-8 border-l border-white/25'>
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
                    <p className='text-sm text-gray-100/50 border-l-2 border-white/70 px-2 mb-4 h-5'>{fechaFormateada}</p>
                    <h1 className='font-semibold mb-1'>{post.titulo}</h1>
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
