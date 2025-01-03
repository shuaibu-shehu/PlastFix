import Image from 'next/image';
import {useEffect, useState} from 'react';

const slides = [
  {
    src: '/news5.jpg',
    title: 'Plastic Pollution Impact on Wildlife and Ecosystems',
    url: 'https://www.worldwildlife.org/initiatives/plastics',
  },
  {
    src: '/news7.jpg',
    title: 'Plastic Pollution Impact on Environment, Wildlife & Human Health',
    url: 'https://news-site.com/story2',
  },
  {
    src: '/news4.jpg',
    title:
      'The Rise of Zero-Waste Cleaning: Innovative Solutions for a Sustainable Future',
    url: 'https://checksammy.com/blog/green-cleaning/',
  },
  {
    src: '/news1.jpg',
    title: 'The Plastic Pollution Crisis',
    url: 'https://earth.org/plastic-pollution-statistics/',
  },
  {
    src: '/news2.jpg',
    title: 'Recycling and Waste Management',
    url: 'https://www.oecd.org/en/about/news/press-releases/2022/02/plastic-pollution-is-growing-relentlessly-as-waste-management-and-recycling-fall-short.html',
  },
];

export default function Newsfeed() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className='relative size-36 w-full bg-blue-300 h-[230px] md:h-[450px] md:col-span-1 overflow-hidden rounded-xl'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out cursor-pointer 
              ${hoveredIndex === index ? 'scale-105' : 'scale-100'}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%) ${
                hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
              }`,
            }}
            onClick={() => handleClick(slide.url)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                hoveredIndex === index ? 'bg-black/0' : 'bg-black/10'
              } z-10`}
            />
            <Image
              src={slide.src}
              alt={`News image ${index + 1}`}
              fill
              className='object-cover transition-transform duration-500'
              priority={index === 0}
            />
            <div className='absolute top-12 left-4 right-4 z-20'>
              <h2
                className={`text-white text-xl md:text-2xl font-bold drop-shadow-lg transition-all duration-300 ${
                  hoveredIndex === index
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-2 opacity-90'
                }`}>
                {slide.title}
              </h2>
            </div>
          </div>
        ))}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20'>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
