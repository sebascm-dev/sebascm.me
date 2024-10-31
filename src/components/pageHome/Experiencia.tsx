import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import ExperienciaClient from './ExperienciaClient'; // Importa el componente cliente

export default async function Experiencia() {
    const supabase = createServerComponentClient({ cookies });
    const { data: experiences } = await supabase
    .from('experiences')
    .select()
    .order('created_at', { ascending: false });

    return (
        <ExperienciaClient experiences={experiences || []} /> // Pasa los datos al componente cliente
    );
}
