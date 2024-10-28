interface DisponibleProps{
    texto: string
}

export default function Disponible({texto}: DisponibleProps) {
    return (
        <span className="relative mt-4 inline-flex items-center gap-x-1.5 border-[1px] border-green-900/30 py-1 px-2 rounded-md text-xs font-medium bg-green-800/10 text-green-500/50">
            <span className="absolute size-2 inline-block rounded-full bg-[#A2E635]/50"></span>
            <span className="animate-ping size-2 inline-block rounded-full bg-[#A2E635]/75"></span>
            {texto}
        </span>
    )
}