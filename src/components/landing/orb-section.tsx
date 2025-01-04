import Image from 'next/image';

const slides = [
  {
    src: '/news5.jpg',
    index: 1,
  },
  {
    src: '/news7.jpg',
    index: 2,
  },
  {
    src: '/news4.jpg',
    index: 3,
  },
];

export function OrbSection() {
  return (
    <div className='container mx-auto px-4 py-16 bg-gradient-to-b from-green-100 via-green-200 to-green-100 contain-content'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {slides.map((obj) => (
          <div
            key={obj.index}
            className='relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm p-4 aspect-square transform hover:scale-105 transition-transform duration-300 shadow-lg'>
            <div className='relative w-full h-60'>
              <Image
                src={obj.src}
                alt={`Nature orb ${obj.index}`}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw'
                className='rounded-2xl object-cover'
              />
            </div>
            <h1>heloods</h1>
            <p>somretgs </p>
          </div>
        ))}
      </div>
    </div>
  );
}
