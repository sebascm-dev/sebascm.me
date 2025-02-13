import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import StatsMatch from "./StatsMatch";

export default async function FetchPadelStatsMatch() {
  // 1. Create the Supabase client on the server
  const supabase = createServerComponentClient({ cookies });

  // 2. Fetch your data
  const { data: matchpadel, error } = await supabase
    .from("matchpadel")
    .select("*")
    .order("fechaPartido", { ascending: true })
    .limit(365);
    
  // 3. If error or no data, pass an empty array to avoid `.map` on undefined
  if (error || !matchpadel) {
    console.error("Error al obtener las fechas de los partidos:", error);
    return <StatsMatch matchpadel={[]} />;
  }

  // 4. Otherwise pass the array to the client component
  return <StatsMatch matchpadel={matchpadel} />;
}
