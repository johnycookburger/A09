'use client'
import styles from './card.module.css';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import {Rating} from '@mui/material'
import {useState} from 'react';

export default function Card({venueName, imgSrc, onRating}:{venueName:string, imgSrc:string, onRating?:Function}) {
    const [value, setValue] = useState<number|null>(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return(
        <InteractiveCard>
            <div className={styles.cardimg}>
                <div 
                    className={`absolute inset-0 bg-gray-800 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
                    style={{ transition: 'opacity 0.3s ease' }}
                />
                <Image 
                    src={imgSrc}
                    alt="Service Picture"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <div className={styles.cardtext}>
                <h2 className="text-xl font-bold mb-2 text-white">{venueName}</h2>
                <div className="h-1 w-12 bg-amber-500 rounded-full mb-3"></div>
            </div>
            { onRating ?
                <div 
                    onClick={(event) => {event.stopPropagation();}}
                    className="p-3 border-t border-gray-700"
                >
                    <div className="flex items-center justify-center">
                        <Rating 
                            data-testid={venueName + " Rating"} 
                            name={venueName + " Rating"} 
                            id={venueName + " Rating"} 
                            value={value} 
                            onChange={(event, newValue) => { 
                                setValue(newValue); 
                                event.stopPropagation(); 
                                onRating(venueName, newValue);
                            }}
                            sx={{
                                '& .MuiRating-iconFilled': {
                                    color: '#FFA500',
                                },
                                '& .MuiRating-iconHover': {
                                    color: '#FFB733',
                                }
                            }}
                        />
                    </div>
                </div> : ''
            }
        </InteractiveCard>
    )
}