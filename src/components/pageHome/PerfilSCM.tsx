'use client';

import Image from "next/image";

import TypewriterComponent from "typewriter-effect";

const typewriterOptions = {
    strings: [
        "Ingeniero de Software.",
        "Estudiante de la Universidad de Huelva (UHU)",
        "Amante del café.",
        "Desarrollador FullStack.",
        "Administrador de Base de Datos.",
    ],
    autoStart: true,
    loop: true,
};

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
            <p className="text-xs text-gray-300 opacity-45 -mt-0.5">Actualmente estudiando Ingeniería Informática.</p>
            <p className="text-lg">
                <TypewriterComponent options={typewriterOptions} />
            </p>
        </section>
    );
}
