import FetchPadelResultsMatch from "@/components/pagePadelStats/FetchPadelResultsMatch";
import FetchPadelSetsChart from "@/components/pagePadelStats/FetchPadelSetsChart";
import FetchPadelStatsMatch from "@/components/pagePadelStats/FetchPadelStatsMatch";
import FetchPadelTracker from "@/components/pagePadelStats/FetchPadelTracker";

export default function padelstats() {
    return (
        <main className="
        mx-auto max-w-6xl bg-black bg-opacity-0
        lg:p-4 lg:mt-28 lg:w-[85%]
        md:p-4 md:mt-20 md:w-[85%]
        mt-16 mb-32 w-[90%]
        ">
            <section className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="w-full lg:w-[70%]">
                    <FetchPadelTracker />
                </div>
                <div className="w-full lg:w-[30%]">
                    <FetchPadelStatsMatch />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2">
                    <FetchPadelSetsChart />

                    <div className="mt-8 hidden lg:grid grid-cols-2 gap-4">
                        <article className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
                            <p className="mb-2 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">NOX ML10 Limited Edition</p>
                            <div className="flex justify-center items-center">
                                <img src="/images/stack-padel/pala.webp" className="h-44 object-cover" alt="pala de padel" />
                            </div>
                        </article>
                        <article className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
                            <p className="mb-2 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">NOX AT10 Competition XL</p>
                            <div className="flex justify-center items-center">
                                <img src="/images/stack-padel/paletero.webp" className="h-44 object-cover -z-20" alt="pala de padel" />
                            </div>
                        </article>

                    </div>
                </div>


                <div className="w-full lg:w-1/2">
                    <FetchPadelResultsMatch />

                    <div className="mt-8 lg:hidden grid grid-cols-2 gap-4">
                        <article className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
                            <p className="mb-2 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">NOX ML10 Limited Edition</p>
                            <div className="flex justify-center items-center">
                                <img src="/images/stack-padel/pala.webp" className="h-44 object-cover" alt="pala de padel" />
                            </div>
                        </article>
                        <article className="relative border border-[#2E2D2D] rounded-md p-4 bg-[#1C1C1C]/50 shadow-lg backdrop-blur-[2px] h-fit hover:border-[#EDEDED]/30 transition-colors duration-300">
                            <p className="mb-2 text-sm text-gray-100/50 border-l-2 border-white/70 px-1.5 h-5">NOX AT10 Competition XL</p>
                            <div className="flex justify-center items-center">
                                <img src="/images/stack-padel/paletero.webp" className="h-44 object-cover -z-20" alt="pala de padel" />
                            </div>
                        </article>
                    </div>
                </div>

            </section>
        </main>
    )
}