import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import MostrarProyectos from './MostarProyectos';

export default async function ServerWrapper() {
    const supabase = createServerComponentClient({ cookies });

    // Consulta los últimos 4 proyectos ordenados por la fecha de creación
    const { data: projects, error } = await supabase
        .from('projects')
        .select('imagen') // Asegúrate de que el campo `imagen` existe en tu tabla
        .order('created_at', { ascending: true })
        .limit(4);

    if (error) {
        console.error("Error al obtener los proyectos:", error);
    }

    // Si no hay proyectos, envía un array vacío
    return <MostrarProyectos projects={projects || []} />;
}
