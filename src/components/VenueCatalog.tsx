import getVenues from "@/libs/getVenues";
import Link from "next/link";
import Card from "./Card";

export default async function VenueCatalog({venuesJson}:{venuesJson:Promise<VenueJson>}) {
    const venue = await venuesJson;
    
    return(
        <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    Explore {venue.count} models in our Catalog
                </h1>
                <div className="h-1 w-20 bg-amber-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Discover the perfect venue for your next event.
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                {
                    venue.data.map((venueItem:VenueItem) => (
                        <Link href={`venue/${venueItem.id}`} className="w-full" key={venueItem.id}>
                            <Card imgSrc={venueItem.picture} venueName={venueItem.name}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}