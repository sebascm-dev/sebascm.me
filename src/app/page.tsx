import Experiencia from "@/components/pageHome/Experiencia";
import MostrarProyectos from "@/components/pageHome/MostarProyectos";
import PerfilSCM from "@/components/pageHome/PerfilSCM";
import UltimoPost from "@/components/pageHome/UltimoPost";

export default function Home() {
  return (
    <>
      <main className="
        mx-auto max-w-6xl bg-black bg-opacity-0
        lg:p-4 lg:mt-28 lg:w-[85%]
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 w-[90%]
        ">

        {/* COMPONENTE SIMPLE DE MI PERFIL */}
        <PerfilSCM />

        <section className="mt-32 flex flex-col md:flex-row justify-between gap-4 mb-4">
          <UltimoPost />
          <Experiencia />
        </section>
        
        <section className="grid grid-cols-3 gap-4 mb-32">
          <MostrarProyectos />
          <MostrarProyectos />
          <MostrarProyectos />
        </section>
      </main>
    </>
  );
}
