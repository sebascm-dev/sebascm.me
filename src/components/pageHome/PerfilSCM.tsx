'use client';

import Image from "next/image";

export default function PerfilSCM() {
    return (
        <section>
            <div className="size-16 relative">
                <Image
                    src="/images/avatares/avatar_scm.webp"
                    layout="fill"
                    objectFit="cover"
                    alt="Imagen de perfil de sebascm-dev"
                    className="rounded-full border-[2px] border-[#27272A] border-opacity-100"
                />
            </div>


            <h1 className="font-bold text-2xl mt-2">Sebastián Contreras</h1>
            <p className="mt-1 text-[#D1D0D1]">Soy un Desarrollador Junior FullStack con sede en Huelva.</p>
            <p className="text-[#D1D0D1]">Actualmente cursando Ingeniería Informática.</p>

            <span className="relative mt-4 inline-flex items-center gap-x-1.5 border-[1px] border-green-900/30 py-1 px-2 rounded-md text-xs font-medium bg-green-800/10 text-green-500/50">
                <span className="absolute size-2 inline-block rounded-full bg-[#A2E635]/50"></span>
                <span className="animate-ping size-2 inline-block rounded-full bg-[#A2E635]/75"></span>
                Disponible
            </span>
        </section>
    );
}