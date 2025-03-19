import getVenue from '@/libs/getVenue';
import Image from 'next/image';
import Link from 'next/link';

export default async function VenueDetailPage({params}:{params:{vid:string}}) {
    const venueJson = await getVenue(params.vid);
    const venue = venueJson.data as any as VenueItem;
    
    return(
        <main className="min-h-screen p-5 pt-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <Link 
                        href="/venue" 
                        className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Venues
                    </Link>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-full">
                            <Image
                                src={venue.picture}
                                alt={venue.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500 text-white mb-2">
                                    ฿{venue.dailyrate.toLocaleString()} / day
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                                {venue.name}
                            </h1>
                            
                            <div className="h-1 w-16 bg-amber-500 mb-6 rounded-full"></div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Address</p>
                                        <p className="text-gray-800 dark:text-white">{venue.address}</p>
                                        <p className="text-gray-800 dark:text-white">{venue.district}, {venue.postalcode}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Contact</p>
                                        <p className="text-gray-800 dark:text-white">{venue.tel}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Daily Rate</p>
                                        <p className="text-gray-800 dark:text-white">฿{venue.dailyrate.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <Link href="/booking" legacyBehavior>
                                    <a className="inline-block py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        Book This Venue
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}