export default function UltimoPost() {
    return (
        <section className="w-[50%] border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-[274px]">
            <header className="flex flex-row gap-2 items-center border border-[#2E2D2D] rounded-2xl w-fit px-3 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
                <p className="mt-0.5 font-bold text-sm">Último Post</p>
            </header>

            <p className="my-4 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">
                6 de Noviembre de 2024
            </p>

            <h1 className="text-base text-[#EDEDED] font-semibold">Construyendo una Galería de Imágenes Interactiva al Estilo de la App de Fotos del iPhone con Next.js y Framer Motion</h1>

            <div className="flex flex-row gap-1.5 my-2 line-clamp-1">
                <p className="border border-[#2E2D2D] px-2 py-1 text-xs font-semibold text-[#EDEDED]/80 w-fit rounded-md">#DesarrolloWeb</p>
                <p className="border border-[#2E2D2D] px-2 py-1 text-xs font-semibold text-[#EDEDED]/80 w-fit rounded-md">#IA</p>
                <p className="border border-[#2E2D2D] px-2 py-1 text-xs font-semibold text-[#EDEDED]/80 w-fit rounded-md">#FullStack</p>
                <p className="border border-[#2E2D2D] px-2 py-1 text-xs font-semibold text-[#EDEDED]/80 w-fit rounded-md">#FullStack</p>
                <p className="border border-[#2E2D2D] px-2 py-1 text-xs font-semibold text-[#EDEDED]/80 w-fit rounded-md">#Programadores</p>
            </div>

            <p className="text-xs text-gray-100/50 text-pretty line-clamp-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi excepturi sed nostrum, hic atque porro fugit magnam, optio nam pariatur numquam culpa quam quidem, eum facere! Repellat, odit! Voluptatum, architecto. Lorem ipsum fnrje nopfg0eirt ngirn gnrgeo gng gneong ngoeng ogoeng dolor sit amet consectetur adipisicing elit. Mollitia omnis aliquam, eius repudiandae ea animi libero repellendus tempora voluptate consequuntur est nobis quam delectus cupiditate provident voluptas aliquid excepturi laboriosam?</p>
        </section>
    );
}