import React, { useEffect, useRef, useState } from 'react';
import Card from '../Cards/CarouselCard';


type CarouselProps = {
  items: Array<{ title: string; description: string; imageUrl: string }>;
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const itemsPerPage = 3; // Adjust as necessary for responsive design
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const maxPage = Math.ceil(items.length / itemsPerPage) - 1;

  const updateCenterIndex = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const cardWidth = containerRef.current.offsetWidth / itemsPerPage;
      const newCenterIndex = Math.round(scrollLeft / cardWidth);
      setCenterIndex(newCenterIndex+1);
      // Update the current page as well
      setCurrentPage(Math.floor(newCenterIndex / itemsPerPage));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
      const newTimeout = setTimeout(() => {
        updateCenterIndex();
      }, 150);
      setScrollTimeout(newTimeout);
    };

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener('scroll', handleScroll);

    return () => {
      currentContainer?.removeEventListener('scroll', handleScroll);
      if (scrollTimeout !== null) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  // Pagination click handler
  const goToPage = (pageNumber: number) => {
    const newCenterIndex = pageNumber * itemsPerPage;
    setCenterIndex(newCenterIndex);
    setCurrentPage(pageNumber);
    if (containerRef.current) {
      const newScrollLeft = (containerRef.current.offsetWidth / itemsPerPage) * newCenterIndex;
      containerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-2"
        style={{
          paddingTop: '30px',
          scrollSnapType: 'x mandatory',
          // Hide the scrollbar
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
        }}
      >
        {items.map((item, index) => {
          const scale = index === centerIndex ? 'scale(1.1)' : 'scale(1)';
          return (
            <div
              key={index}
              className="flex-none snap-center transition-transform duration-300"
              style={{
                marginBottom: '33px',
                minWidth: '33%',
                transform: scale,
                scrollSnapAlign: 'center',
              }}
            >
              <Card {...item} />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxPage + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-2 h-2 rounded-full ${index === currentPage ? 'bg-blue-500' : 'bg-gray-300'} mx-1`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Hide scrollbar for Chrome, Safari and Opera */}
      <style jsx global>{`
        .carousel-container::-webkit-scrollbar {
          display: none; // For Chrome, Safari, and Opera
        }
      `}</style>
    </div>
  );
};

export default Carousel;
