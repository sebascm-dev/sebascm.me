import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";

import InstagramLink from "@/components/linksSociales/InstagramLink";
import XLink from "../linksSociales/XLink";
import GitHubLink from "../linksSociales/GitHubLink";
import SubstackLink from "../linksSociales/SubstackLink";
import LinkedinLink from "../linksSociales/LinkedinLink";
import MailLink from "../linksSociales/MailLink";
import ReadCVLink from "../linksSociales/ReadCVLink";

import Estudiando from "./EstadoActual/Estudiando";

export default async function PerfilSCM() {
    const supabase = createServerComponentClient({ cookies })
    const { data: datosPersonal } = await supabase.from('me').select()

    const calcularEdad = (fechaNacimiento: string | number | Date) => {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mesActual = hoy.getMonth();
        const mesNacimiento = nacimiento.getMonth();

        // Ajustar la edad si el cumpleaños no ha ocurrido aún este año
        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };

    return (
        <section>
            {datosPersonal?.map((dato) => (
                <div key={dato.id}> {/* Asigna una clave única si es necesario */}
                    <div className="size-16 relative">
                        <img
                            src="/images/avatares/avatar_scm.webp"
                            alt="Imagen de perfil de sebascm-dev"
                            className="rounded-full border-[2px] border-[#27272A] border-opacity-100 object-cover"
                            style={{ width: '100%', height: '100%' }} // Estilos de tamaño ajustados
                        />
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                        <h1 className="font-bold text-2xl mt-2 text-white">{dato.nombre} {dato.apellido1}</h1>
                        <p className='text-[12px] mt-4 text-gray-100/50'>{calcularEdad(dato.f_nacimiento)} años</p>
                    </div>
                    <p className="mt-1 text-[#D1D0D1] max-w-sm">{dato.descripcion1}</p>
                    <p className="mt-1 text-[#D1D0D1] max-w-sm">{dato.descripcion2}</p>

                    {/* Estado actual */}
                    <Estudiando texto={dato.estado} />

                    <footer className="flex flex-row gap-4 mt-4">
                        <GitHubLink />
                        <LinkedinLink />
                        <SubstackLink />
                        <ReadCVLink />
                        <InstagramLink />
                        <XLink />
                        <MailLink />
                    </footer>

                </div>
            ))}
        </section>
    );
}
