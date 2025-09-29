import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import AsignaturasAdmin from '@/components/adminAsig/AsignaturasAdmin';
import LogoutButton from '@/components/auth/LogoutButton';
import { redirect } from 'next/navigation';

export default async function AdminAsigPage() {
    const supabase = createServerComponentClient({ cookies });
    
    // Verificar autenticación
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        redirect('/login');
    }

    const { data: asignaturas, error } = await supabase
        .from('asignaturas')
        .select('*')
        .order('curso', { ascending: true })
        .order('cuatrimestre', { ascending: true })
        .order('nombre', { ascending: true });

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
            <header className="mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl text-pretty font-semibold text-white">
                            Administración de Asignaturas
                        </h1>
                        <p className="text-sm md:text-base mt-3 text-pretty md:mt-6 text-gray-100/75">
                            Gestiona las asignaturas de tu carrera de Ingeniería Informática en la Universidad de Huelva.
                        </p>
                    </div>
                    <LogoutButton />
                </div>
            </header>

            <AsignaturasAdmin asignaturas={asignaturas || []} />
        </main>
    );
}
