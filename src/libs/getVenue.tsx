import Venue from "@/app/(venueinfo)/venue/page";

export default async function getVenue(vid:string):Promise<VenueJson>{
    let response = await fetch(`https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${vid}`);
    if(!response.ok){
        throw new Error("Failed to fetch venue");
    }
    return await response.json();
}