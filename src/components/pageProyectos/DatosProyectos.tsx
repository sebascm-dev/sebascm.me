import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";

export default async function DatosProyectos() {
    const supabase = createServerComponentClient({ cookies });

    // Consulta el total de proyectos
    const { data: totalProjects, error: totalError } = await supabase
        .from('projects')
        .select('id', { count: 'exact' });

    // Consulta clientes satisfechos (idClients no es null)
    const { data: satisfiedClients, error: clientsError } = await supabase
        .from('projects')
        .select('idCliente', { count: 'exact' })
        .not('idCliente', 'is', null);

    // Consulta proyectos personales (idClients es null)
    const { data: personalProjects, error: personalError } = await supabase
        .from('projects')
        .select('idCliente', { count: 'exact' })
        .is('idCliente', null);

    // Determina el total de proyectos de empresas (igual a clientes satisfechos)
    const companyProjects = satisfiedClients?.length || 0;

    // Manejo de errores (opcional)
    if (totalError || clientsError || personalError) {
        console.error('Error fetching data:', { totalError, clientsError, personalError });
        return <p>Error al cargar los datos.</p>;
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            <article className="text-center text-sm font-semibold text-[#daffca] border border-[#203f13] rounded-md p-2 bg-[#203f13]/50 shadow-lg backdrop-blur-[2px] hover:border-[#99ff99]/30 transition-colors duration-300">
                Clientes Satisfechos: {satisfiedClients?.length || 0}
            </article>
            <article className="text-center text-sm font-semibold text-[#cae7ff] border border-[#193e57] rounded-md p-2 bg-[#193e57]/50 shadow-lg backdrop-blur-[2px] hover:border-[#99ccff]/30 transition-colors duration-300">
                Total de Proyectos: {totalProjects?.length || 0}
            </article>
            <article className="text-center text-sm font-semibold text-[#f5ffca] border border-[#575119] rounded-md p-2 bg-[#575119]/50 shadow-lg backdrop-blur-[2px] hover:border-[#ffff99]/30 transition-colors duration-300">
                Proyectos Personales: {personalProjects?.length || 0}
            </article>
            <article className="text-center text-sm font-semibold text-[#ffe2ca] border border-[#574119] rounded-md p-2 bg-[#574119]/50 shadow-lg backdrop-blur-[2px] hover:border-[#ffcc99]/30 transition-colors duration-300">
                Proyectos de Empresas: {companyProjects}
            </article>
        </section>
    );
}
