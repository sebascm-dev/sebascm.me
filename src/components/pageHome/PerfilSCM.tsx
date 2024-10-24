import Image from "next/image";

import InstagramLink from "@/components/linksSociales/InstagramLink";
import XLink from "../linksSociales/XLink";
import GitHubLink from "../linksSociales/GitHubLink";
import SubstackLink from "../linksSociales/SubstackLink";
import LinkedinLink from "../linksSociales/LinkedinLink";
import MailLink from "../linksSociales/MailLink";
import ReadCVLink from "../linksSociales/ReadCVLink";

import Estudiando from "./EstadoActual/Estudiando";

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
            <p className="mt-1 text-[#D1D0D1]">Desarrollador Junior FullStack.</p>
            <p className="text-[#D1D0D1]">Actualmente estudiante en la Universidad de Huelva.</p>

            {/* AQUI VA EL ESTADO ACTUAL */}
            <Estudiando texto="Ingeniería Informática"/>
            {/* AQUI VA EL ESTADO ACTUAL */}

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