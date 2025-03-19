"use client";
import styles from "./banner.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const coverImg = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];
  const [index, setIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  
  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextImage();
    }, 6000);
    
    return () => clearInterval(timer);
  }, [index]);

  const handlePrevImage = () => {
    setIsTextVisible(false);
    setTimeout(() => {
      setIndex(prev => prev === 0 ? coverImg.length - 1 : prev - 1);
      setIsTextVisible(true);
    }, 300);
  };

  const handleNextImage = () => {
    setIsTextVisible(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % coverImg.length);
      setIsTextVisible(true);
    }, 300);
  };

  return (
    <div className={styles.banner}>
      {coverImg.map((img, i) => (
        <div 
          key={img} 
          className={`${styles.imageContainer} ${i === index ? styles.activeImage : ''}`}
        >
          <Image
            src={img}
            alt={`Banner ${i + 1}`}
            fill={true}
            priority={i === 0}
            quality={90}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
      
      <button 
        className={`${styles.slideButton} ${styles.prevButton}`}
        onClick={handlePrevImage}
        aria-label="Previous image"
      >
        ‹
      </button>
      
      <button 
        className={`${styles.slideButton} ${styles.nextButton}`}
        onClick={handleNextImage}
        aria-label="Next image"
      >
        ›
      </button>
      
      <div className={`${styles.bannerText} ${!isTextVisible ? styles.bannerTextHidden : ''}`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Where Every Event Finds Its Venue
        </h1>
        <p className="text-xl md:text-2xl">
          Looking for the perfect place to host your next event? <br /> Our
          venue offers a stylish and spacious setting for all kinds of
          gatherings, <br /> including weddings, corporate events, birthdays,
          and private parties.
        </p>
        <button
          className={styles.actionButton}
          onClick={(e) => {
            e.preventDefault();
            router.push("/venue");
          }}
        >
          Explore Venues
        </button>
      </div>
      
      {session ? (
        <div className="z-30 absolute top-5 right-10 font-semibold text-white text-xl">
          Welcome {session.user?.name}
        </div>
      ) : null}
      
      <div className={styles.dots}>
        {coverImg.map((_, i) => (
          <div 
            key={i} 
            className={`${styles.dot} ${i === index ? styles.activeDot : ''}`}
            onClick={() => {
              setIsTextVisible(false);
              setTimeout(() => {
                setIndex(i);
                setIsTextVisible(true);
              }, 300);
            }}
          />
        ))}
      </div>
    </div>
  );
}