'use client';

import Image from "next/image";

import InstagramLink from "@/components/linksSociales/InstagramLink";
import XLink from "../linksSociales/XLink";
import GitHubLink from "../linksSociales/GitHubLink";
import SubstackLink from "../linksSociales/SubstackLink";
import LinkedinLink from "../linksSociales/LinkedinLink";
import MailLink from "../linksSociales/MailLink";
import ReadCVLink from "../linksSociales/ReadCVLink";

export default function PerfilSCM() {
    return (
        <section>
            <div className="size-16 relative">
                <Image
                    src="/images/avatares/avatar_scm.webp"
                    fill
                    style={{ objectFit: "cover" }}
                    alt="Imagen de perfil de sebascm-dev"
                    className="rounded-full border-[2px] border-[#27272A] border-opacity-100"
                />
            </div>


            <h1 className="font-bold text-2xl mt-2">Sebastián Contreras</h1>
            <p className="mt-1 text-[#D1D0D1]">Soy un Desarrollador Junior FullStack (Huelva).</p>
            <p className="text-[#D1D0D1]">Actualmente cursando Ingeniería Informática.</p>

            <span className="relative mt-4 inline-flex items-center gap-x-1.5 border-[1px] border-green-900/30 py-1 px-2 rounded-md text-xs font-medium bg-green-800/10 text-green-500/50">
                <span className="absolute size-2 inline-block rounded-full bg-[#A2E635]/50"></span>
                <span className="animate-ping size-2 inline-block rounded-full bg-[#A2E635]/75"></span>
                Disponible
            </span>

            <footer className="flex flex-row gap-4 mt-4">
                <GitHubLink />
                <LinkedinLink />
                <SubstackLink />
                <ReadCVLink />
                <InstagramLink />
                <XLink />
                <MailLink />
            </footer>

        </section>
    );
}