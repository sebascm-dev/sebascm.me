import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface PostProps {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: PostProps) {
  const supabase = createServerComponentClient({ cookies });

  // Extrae la ID del slug
  const postId = params.slug.split("-")[0];

  const { data: post } = await supabase
    .from('posts')
    .select()
    .eq('id', postId)
    .single();

  if (!post) {
    return notFound();
  }

  const fecha = new Date(post.fechaLanzamiento);
  const opciones = { day: '2-digit', month: 'long', year: 'numeric' } as const;
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

  // Dividir las tags y generar spans
  const tagsArray = post.tags.split(',').map((tag: string) => tag.trim());

  return (
    <main className="mx-auto max-w-2xl bg-black bg-opacity-0
        lg:p-4 lg:mt-28 lg:w-[85%]
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 w-[90%]">

      <p className='text-sm text-gray-100/50 border-l-2 border-white/70 px-2 mb-4 h-5'>{fechaFormateada}</p>

      <h1 className="text-4xl mt-6 font-bold">{post.titulo}</h1>

      <section className='flex flex-row gap-6'>
        <div className='flex flex-row gap-1 items-center mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 18l0 -3" /><path d="M10 18l0 -6" /><path d="M14 18l0 -9" /><path d="M18 18l0 -12" /></svg>
          <p className='text-xs mt-[1px] text-gray-100/85'>{post.visitas} visitas</p>
        </div>
        <div className='flex flex-row gap-1.5 items-center mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>
          <p className='text-xs mt-[1px] text-gray-100/85'>Tiempo de lectura: {post.minutosRead} min</p>
        </div>
      </section>

      <div className='flex flex-wrap gap-2 mt-5'>
        {tagsArray.map((tag: string, index: number) => (
          <span key={index} className='border border-[#2E2D2D] px-2 py-2 text-xs font-semibold text-[#EDEDED]/80 rounded-md'>#{tag}</span>
        ))}
      </div>

      <p className='mt-10 text-pretty text-gray-100/60'>{post.descripcion}</p>

      <hr
        className="my-16 border-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400/40 to-transparent"
      />

      <p>{post.contenido}</p>
    </main>
  );
}
