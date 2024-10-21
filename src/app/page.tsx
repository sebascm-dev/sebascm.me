import PerfilSCM from "@/components/pageHome/PerfilSCM";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="
        mx-auto bg-black bg-opacity-20
        lg:p-4 lg:mt-28 lg:w-4/5
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 w-[90%]
        ">

        {/* COMPONENTE SIMPLE DE MI PERFIL */}
        <PerfilSCM />
      </main>
    </>
  );
}
