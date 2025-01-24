import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";

export default async function Skills() {
    const supabase = createServerComponentClient({ cookies });

    // Consulta el total de proyectos
    const { data: skills } = await supabase
        .from('skills')
        .select('*');

    return (
        <section className="flex flex-wrap lg:justify-around gap-2 mb-4">
            {
                skills?.map((skill) => (
                    <img src={skill.imagen} key={skill.id} className='size-6 hidden md:block opacity-25 scale-100 hover:scale-110 hover:opacity-75 transition-transform duration-300' alt={skill.nombre} />
                ))
            }
        </section>
    )
}