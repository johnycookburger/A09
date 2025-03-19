import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Venue(){
    const venuesJson = getVenues();
    return(
        <main className="text-center p-5 flex flex-col items-center gap-5 flex-wrap">
            <h1 className="text-2xl font-medium">Select Venue</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <VenueCatalog venuesJson={venuesJson} />
            </Suspense>
        </main>
    );
}