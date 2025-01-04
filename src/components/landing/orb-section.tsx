import Image from 'next/image';

const slides = [
  {
    src: '/log.png', // Replace with the correct image path for this feature
    title: 'Daily Plastic Usage Logger',
    description:
      'Track your daily plastic usage by categorizing items into single-use plastics, recyclables, and non-recyclables. Stay aware of your consumption patterns to make conscious choices.',
    index: 1,
  },
  {
    src: '/report.png', // Replace with the correct image path for this feature
    title: 'Weekly Report Generator',
    description:
      'Analyze weekly trends in your plastic consumption, discover areas for improvement, and see the environmental impact of your usage. Get actionable insights for a sustainable lifestyle.',
    index: 2,
  },
  {
    src: '/tips.jpg', // Replace with the correct image path for this feature
    title: 'Practical Waste Reduction Tips',
    description:
      'Learn practical ways to reduce waste, like switching to biodegradable packaging, reusable containers, and bulk purchasing. Small changes can make a big difference!',
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
            <h2 className='mt-4 text-lg font-bold'>{obj.title}</h2>
            <p className='mt-2 text-gray-700'>{obj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
