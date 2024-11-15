import DatosProyectos from "@/components/pageProyectos/DatosProyectos";
import Skills from "@/components/pageProyectos/Skills";

export default function proyectos() {
    return (
        <main className="
        mx-auto max-w-6xl bg-black bg-opacity-0
        lg:p-4 lg:mt-28 lg:w-[85%]
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 w-[90%]
        ">
            <h1 className="text-3xl md:text-5xl text-pretty font-semibold text-white">Proyectos realizados durante mi carrera.</h1>
            <p className="text-sm md:text-base mt-3 text-pretty md:mt-6 text-gray-100/75">¿No sabes por dónde empezar? He trabajado en montones de pequeños y grandes proyectos a lo largo de los años, pero estos son los que más me enorgullecen. Muchos de ellos son privados y no podré mostrarlos a continuación.</p>

            <DatosProyectos />

            <Skills />
        </main>
    )
}