'use client'
import {useReducer, useEffect} from 'react';
import Card from '@/components/Card'
import Link from 'next/link';
import Image from 'next/image';

export default function CardPanel() {
    const ratingReducer = (ratingList:Map<string,number>,action:{type:string, venueName:string,value:number}) => {
        switch(action.type) {
            case 'add': {
                return new Map(ratingList.set(action.venueName, action.value));
            }
            case 'remove': {
                ratingList.delete(action.venueName);
                return new Map(ratingList);
            }
            default: {
                return ratingList;
            }
        }
    };
    
    const [ratingList, dispathRating] = useReducer(ratingReducer, new Map<string,number>());
    
    const mockVenueRepo = [
        {vid:"001", venueName:"The Bloom Pavilion", imgSrc:"/img/bloom.jpg"},
        {vid:"002", venueName:"Spark Space", imgSrc:"/img/sparkspace.jpg"},
        {vid:"003", venueName:"The Grand Table", imgSrc:"/img/grandtable.jpg"}
    ];
    
    useEffect(() => {
        for(const venue of mockVenueRepo) {
            dispathRating({type:'add', venueName:venue.venueName, value:0});
        }
    },[]);
    
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-inner w-[80vw]">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Venues</h2>
            
            <div className="flex flex-col items-center gap-10 mb-5">
                {
                    mockVenueRepo.map((venueItem) => (
                        <Link href={`venue/${venueItem.vid}`} className="w-[400px]" key={venueItem.vid}>
                            <Card 
                                imgSrc={venueItem.imgSrc} 
                                venueName={venueItem.venueName} 
                                onRating={(venueName:string, value:number) => 
                                    dispathRating({type:'add', venueName:venueName, value:value})
                                }
                            />
                        </Link>
                    ))
                }
            </div>
            
            {ratingList.size > 0 && (
                <div className="w-full mt-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                Venue List with Ratings: {ratingList.size}
                            </h2>
                            <span className="px-3 py-1 bg-amber-500 text-gray-900 rounded-full text-sm font-semibold">
                                {ratingList.size}
                            </span>
                        </div>
                        
                        <ul className="space-y-3">
                            {Array.from(ratingList).map(([key, value]) => (
                                <li
                                    key={key}
                                    data-testid={key}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    onClick={() => dispathRating({type:'remove', venueName:key, value:value})}
                                >
                                    <span className="font-medium">{key}</span>
                                    <div className="flex items-center">
                                        <div className="mr-2 font-bold text-amber-500">
                                            {value}
                                        </div>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="h-5 w-5 text-gray-400"
                                            viewBox="0 0 20 20" 
                                            fill="currentColor"
                                        >
                                            <path 
                                                fillRule="evenodd" 
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                                clipRule="evenodd" 
                                            />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}