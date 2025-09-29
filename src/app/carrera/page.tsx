import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import DashboardCarrera from '@/components/carrera/DashboardCarrera';

export default async function CarreraPage() {
    const supabase = createServerComponentClient({ cookies });
    
    const { data: asignaturas, error } = await supabase
        .from('asignaturas')
        .select('*')
        .order('curso', { ascending: true })
        .order('cuatrimestre', { ascending: true });

    if (error) {
        console.error('Error al obtener asignaturas:', error);
    }

    return (
        <main className="
            mx-auto max-w-7xl bg-black bg-opacity-0
            lg:p-4 lg:mt-28 lg:w-[90%]
            md:p-4 md:mt-20 md:w-[90%]
            mt-16 w-[95%] mb-32
        ">
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl text-pretty font-semibold text-white">
                    Mi Carrera Universitaria
                </h1>
                <p className="text-xs md:text-sm mt-2 text-pretty text-gray-100/75">
                    Seguimiento de mi progreso en Ingeniería Informática - Universidad de Huelva
                </p>
            </header>

            <DashboardCarrera asignaturas={asignaturas || []} />
        </main>
    );
}
