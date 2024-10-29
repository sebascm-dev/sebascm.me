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

  return (
    <main className="mx-auto max-w-4xl p-4">
      <h1 className="text-4xl font-bold">{post.titulo}</h1>
      <p className="text-gray-500 text-sm mt-1">{fechaFormateada}</p>
      <div className="mt-6 text-lg">
        <p>{post.descripcion}</p>
        <p className="mt-4">{post.contenido}</p>
      </div>
    </main>
  );
}
