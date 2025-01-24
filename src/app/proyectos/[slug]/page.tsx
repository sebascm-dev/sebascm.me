import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { marked } from 'marked';
import LikeButtonProject from '@/components/pageProyectos/LikeButtonProject';

interface ProjectProps {
  params: {
    slug: string;
  };
}

export default async function Project({ params }: ProjectProps) {
  const supabase = createServerComponentClient({ cookies });

  const projectId = params.slug.split("-")[0];

  // Obtener el proyecto
  const { data: project, error: fetchError } = await supabase
    .from('projects')
    .select()
    .eq('id', projectId)
    .single();

  if (fetchError || !project) {
    console.error("Error al obtener el proyecto:", fetchError?.message);
    return notFound();
  }

  // Actualizar las visitas
  const visitasActualizadas = project.visitas ? project.visitas + 1 : 1;

  const { error: updateError } = await supabase
    .from('projects')
    .update({ visitas: visitasActualizadas })
    .eq('id', projectId);

  if (updateError) {
    console.error("Error al actualizar las visitas:", updateError.message);
    return;
  }

  // Formatear fecha
  const fecha = new Date(project.fechaLanzamiento);
  const opciones = { day: '2-digit', month: 'long', year: 'numeric' } as const;
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

  const tagsArray = project.tags.split(',').map((tag: string) => tag.trim());

  // Convertir el contenido Markdown en HTML
  const contenidoHtml = marked(project.contenido);

  return (
    <main className="mx-auto max-w-2xl bg-black bg-opacity-0
        lg:p-4 lg:mt-28 lg:w-[85%]
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 w-[90%]">

      <p className='text-sm text-gray-100/50 border-l-2 border-white/70 px-2 mb-4 h-5 tabular-nums'>{fechaFormateada}</p>

      <h1 className="text-4xl mt-6 font-bold text-white">{project.titulo}</h1>
      <section className='flex flex-row gap-2 md:gap-6'>
        <div className='flex flex-row gap-1 items-center mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-5">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 18l0 -3" />
            <path d="M10 18l0 -6" />
            <path d="M14 18l0 -9" />
            <path d="M18 18l0 -12" />
          </svg>
          <p className='text-xs mt-[1px] text-gray-100/85 tabular-nums'>{visitasActualizadas} visitas</p>
        </div>
        <div className='flex flex-row gap-1.5 items-center mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 7v5l3 3" />
          </svg>
          <p className='text-xs mt-[1px] text-gray-100/85'>Tiempo de lectura: {project.lecturaTime} min</p>
        </div>
        <LikeButtonProject projectId={projectId} initialLikes={project.likes} />
      </section>

      <div className='flex flex-wrap gap-2 mt-5'>
        {tagsArray.map((tag: string, index: number) => (
          <span key={index} className='border border-[#2E2D2D] px-2 py-2 text-xs font-semibold text-[#EDEDED]/80 rounded-md'>#{tag}</span>
        ))}
      </div>

      <p className='mt-10 text-pretty text-gray-100/60'>{project.descripcion}</p>

      <hr className="my-16 border-0 h-[1px] bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />

      {/* Renderiza el contenido Markdown convertido en HTML y aplica el estilo `prose` */}
      <article className="
          prose
          prose-invert 
          max-w-none
          prose-sm
          md:prose-base
          dark:prose-invert
          prose-h1:font-bold prose-h1:text-2xl md:prose-h1:text-5xl prose-h1:mt-12 prose-h1:mb-2 prose-h1:text-white
          prose-h2:font-bold prose-h2:text-xl md:prose-h2:text-4xl prose-h2:mt-10 prose-h2:mb-2 prose-h2:text-white
          prose-h3:font-bold prose-h3:text-lg md:prose-h3:text-3xl prose-h3:mt-8 prose-h3:mb-2 prose-h3:text-white
          prose-h4:font-bold prose-h4:text-base md:prose-h4:text-2xl prose-h4:mb-2 prose-h4:text-white
          prose-p:text-pretty prose-p:text-sm md:prose-p:text-base
          prose-strong:text-sm md:prose-strong:text-base prose-strong:text-white
          prose-em:text-sm md:prose-em:text-base prose-em:text-white
          prose-a:bg-gray-100
          prose-a:dark:bg-[#24292E]
          prose-a:dark:text-gray-300
          prose-a:font-medium
          prose-a:me-2
          prose-a:opacity-90
          prose-a:px-2
          prose-a:py-0.5
          prose-a:rounded
          prose-a:text-gray-800
          prose-a:text-xs
          prose-a:no-underline
          prose-a:italic
          prose-ul:text-sm md:prose-ul:text-base
          prose-ol:text-sm md:prose-ol:text-base
          prose-li:text-sm md:prose-li:text-base
          prose-code:text-sm md:prose-code:text-base
          md:prose-blockquote:text-base
          prose-blockquote:bg-[#898a7e50]
          prose-blockquote:border-amber-200
          prose-blockquote:border-l-1
          prose-blockquote:px-4
          prose-blockquote:py-[1px]
          prose-blockquote:rounded-md
          prose-blockquote:shadow-xl
          prose-blockquote:text-amber-200
          prose-blockquote:text-sm
          prose-img:rounded-md prose-img:aspect-auto" dangerouslySetInnerHTML={{ __html: contenidoHtml }}></article>

      <footer className='mt-10 mb-32 flex flex-row items-center gap-2'>
        <div className='size-16 relative'>
          <img
            src="/images/avatares/avatar_scm.webp"
            alt="Imagen de perfil de sebascm-dev"
            className="rounded-full border-[2px] border-[#27272A] border-opacity-100 object-cover"
            style={{ width: '100%', height: '100%' }} // Estilos de tamaño ajustados
          />
        </div>
        <div>
          <p className='text-lg font-semibold text-white'>Sebastián Contreras Marín</p>
          <p className='text-xs text-gray-100/50'>Estudiante de Ingeniería Informática</p>
        </div>
      </footer>
    </main>
  );
}
