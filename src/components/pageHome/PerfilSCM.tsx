import Image from "next/image"

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
            <p>Ingeniero de Software</p>
        </section>
    )
}
