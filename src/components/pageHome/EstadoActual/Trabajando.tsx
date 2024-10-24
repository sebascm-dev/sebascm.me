interface TrabajandoProps{
    texto: string
}

export default function Trabajando({texto}: TrabajandoProps) {
    return (
        <span className="relative mt-4 inline-flex items-center gap-x-1.5 border-[1px] border-red-900/30 py-1 px-2 rounded-md text-xs font-medium bg-red-800/10 text-red-300/50">
            <span className="absolute size-2 inline-block rounded-full bg-red-400/50"></span>
            <span className="animate-ping size-2 inline-block rounded-full bg-red-500/75"></span>
            Actualmente en {texto}
        </span>
    )
}