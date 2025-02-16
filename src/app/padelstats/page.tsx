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
            <FetchPadelTracker />
            <section className="flex flex-col lg:flex-row gap-4">
                <div className="wfull lg:w-1/2">
                    <FetchPadelStatsMatch />
                </div>
                <div className="wfull lg:w-1/2">
                    <FetchPadelSetsChart />
                    <FetchPadelResultsMatch />
                </div>
            </section>
        </main>
    )
}