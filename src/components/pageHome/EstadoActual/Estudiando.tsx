interface EstudiandoProps {
    texto: string;
}

export default function Estudiando({ texto }: EstudiandoProps) {
    return (
        <span className="relative mt-4 inline-flex items-center gap-x-1.5 border-[1px] border-purple-900/30 py-1 px-2 rounded-md text-xs font-medium bg-purple-800/10 text-purple-300/50">
            <span className="absolute size-2 inline-block rounded-full bg-purple-400/50"></span>
            <span className="animate-ping size-2 inline-block rounded-full bg-purple-500/75"></span>
            {texto}
        </span>
    )
}