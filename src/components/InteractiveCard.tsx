'use client'
import { useState } from 'react';

export default function InteractiveCard({children}:{children : React.ReactNode}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className={`bg-gray-900 rounded-xl shadow-lg overflow-hidden w-full h-[400px] ${
                isHovered 
                    ? 'shadow-xl shadow-amber-500/10 border border-amber-500/20' 
                    : 'shadow-md border border-gray-800'
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-4px)' : 'none',
            }}
        >
            {children}
        </div>
    )
}