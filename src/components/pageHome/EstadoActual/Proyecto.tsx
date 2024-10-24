interface ProyectoProps{
    texto: string
}

export default function Proyecto({texto}: ProyectoProps) {
    return (
        <span className="relative mt-4 inline-flex items-center gap-x-1.5 border-[1px] border-orange-900/30 py-1 px-2 rounded-md text-xs font-medium bg-orange-800/10 text-orange-300/50">
            <span className="absolute size-2 inline-block rounded-full bg-orange-400/50"></span>
            <span className="animate-ping size-2 inline-block rounded-full bg-orange-500/75"></span>
            {texto}
        </span>
    )
}