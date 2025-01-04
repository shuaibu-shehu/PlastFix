import Image from 'next/image';
import React from 'react';

export default function Resource() {
  return (
    <div className='max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      {/* Title Section */}
      <h1 className='text-3xl font-semibold text-green-600 mb-6'>
        Reducing Plastic Waste: Protecting Ecosystems and Wildlife
      </h1>

      {/* Environmental Impact Section */}
      <div className='mb-8 border-b pb-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-1/3'>
            <img
              src='/news1.jpg'
              alt='Plastic pollution in ocean'
              className='rounded-lg shadow-md w-full h-64 object-cover'
            />
          </div>
          <div className='md:w-2/3'>
            <h2 className='text-2xl font-medium text-gray-800 mb-3'>
              Environmental Impact
            </h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              Plastic pollution affects over 267 species worldwide, including
              86% of sea turtles, 44% of seabirds, and 43% of marine mammals. By
              2050, ocean plastic may outweigh all ocean fish if current trends
              continue. Annually, up to 12 million metric tons of plastic enter
              our oceans, equivalent to over 100,000 blue whales.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              The impact extends beyond marine environments, affecting
              freshwater systems, soil quality, and air pollution through
              microplastic particles. Studies show that plastic debris has been
              found in the most remote areas of the planet, from the depths of
              the Mariana Trench to the peaks of the Himalayas.
            </p>
          </div>
        </div>
      </div>

      {/* Wildlife Protection Section */}
      <div className='mb-8 border-b pb-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-2/3'>
            <h2 className='text-2xl font-medium text-gray-800 mb-3'>
              Wildlife Protection
            </h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              Reducing plastic waste prevents wildlife entanglement and
              accidental ingestion. Plastic ingestion can cause intestinal
              blockages and death in animals. Decreasing plastic pollution helps
              preserve biodiversity and maintain ecological balance.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              Recent studies indicate that over 700 species of marine animals
              have been affected by plastic pollution. Sea turtles mistake
              plastic bags for jellyfish, birds feed plastic pieces to their
              chicks, and whales accumulate massive amounts of plastic in their
              digestive systems. The impact extends to microscopic organisms,
              affecting the base of the food chain and potentially disrupting
              entire ecosystems.
            </p>
          </div>
          <div className='md:w-1/3'>
            <img
              src='/news5.jpg'
              alt='Wildlife affected by plastic'
              className='rounded-lg shadow-md w-full h-64 object-cover'
            />
          </div>
        </div>
      </div>

      {/* Ecosystem Conservation Section */}
      <div className='mb-8 border-b pb-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-1/3'>
            <img
              src='/news4.jpg'
              alt='Healthy ecosystem'
              className='rounded-lg shadow-md w-full h-64 object-cover'
            />
          </div>
          <div className='md:w-2/3'>
            <h2 className='text-2xl font-medium text-gray-800 mb-3'>
              Ecosystem Conservation
            </h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              Less plastic waste means cleaner habitats for marine and
              terrestrial species. Reducing microplastics in soil benefits
              earthworms and other soil fauna, crucial for healthy ecosystems.
              Cleaner waterways and oceans support the health of coral reefs and
              other aquatic ecosystems.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              Healthy ecosystems are interconnected networks where every species
              plays a vital role. Plastic pollution disrupts these delicate
              relationships by altering habitat structures, contaminating food
              sources, and changing chemical compositions of environments. For
              example, coral reefs exposed to plastic waste show increased
              disease rates and decreased growth, affecting thousands of marine
              species that depend on these ecosystems.
            </p>
          </div>
        </div>
      </div>

      {/* Pollution Prevention Section */}
      <div className='mb-8 border-b pb-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-2/3'>
            <h2 className='text-2xl font-medium text-gray-800 mb-3'>
              Pollution Prevention
            </h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              Reducing plastic use decreases toxic chemical leaching into soil
              and water. Fewer microplastics in the environment means less
              contamination in food chains. Cleaner landscapes and waterways
              enhance natural beauty and recreational value.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              Plastic pollution prevention extends beyond visible waste.
              Microplastics, particles smaller than 5mm, have been found in
              rainwater, drinking water, and even human blood. These particles
              can carry harmful chemicals and accumulate in living organisms. By
              preventing plastic pollution at its source, we can reduce the
              long-term impact of these invisible threats.
            </p>
          </div>
          <div className='md:w-1/3'>
            <img
              src='/news3.jpg'
              alt='Clean environment'
              className='rounded-lg shadow-md w-full h-64 object-cover'
            />
          </div>
        </div>
      </div>

      {/* Climate Impact Section */}
      <div className='mb-8 border-b pb-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-1/3'>
            <img
              src='/news7.jpg'
              alt='Climate change impact'
              className='rounded-lg shadow-md w-full h-64 object-cover'
            />
          </div>
          <div className='md:w-2/3'>
            <h2 className='text-2xl font-medium text-gray-800 mb-3'>
              Climate Impact
            </h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              Lowering plastic production and disposal reduces greenhouse gas
              emissions. Decreased plastic waste helps ecosystems adapt to
              climate change more effectively.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              The plastic industry contributes significantly to global
              greenhouse gas emissions throughout its lifecycle. From extraction
              of raw materials to manufacturing and disposal, plastic production
              is estimated to emit 850 million tons of greenhouse gases
              annually. Additionally, as plastic breaks down in the environment,
              it releases methane and ethylene, further contributing to global
              warming.
            </p>
          </div>
        </div>
      </div>

      {/* Human Health Benefits Section */}
      <div className='mb-8 border-b pb-8'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='md:w-2/3'>
            <h2 className='text-2xl font-medium text-gray-800 mb-3'>
              Human Health Benefits
            </h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              Reducing plastic waste minimizes toxic exposure from plastic
              production and degradation. Cleaner food and water sources ensure
              safer consumption for humans.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              The health implications of plastic pollution are far-reaching.
              Studies have found microplastics in human placentas, lungs, and
              bloodstreams. Chemical additives in plastics, such as phthalates
              and BPA, are linked to various health issues including hormonal
              disruption, developmental problems, and certain cancers. By
              reducing plastic waste, we protect not only environmental health
              but human health for generations to come.
            </p>
          </div>
          <div className='md:w-1/3'>
            <img
              src='/api/placeholder/400/300'
              alt='Human health impact'
              className='rounded-lg shadow-md w-full h-64 object-cover'
            />
          </div>
        </div>
      </div>

      {/* Citations Section */}
      <div className='bg-gray-50 p-4 rounded-lg'>
        <h3 className='text-lg font-medium text-gray-800 mb-4'>Citations:</h3>
        <ul className='list-inside space-y-2'>
          {/* Previous citations remain the same */}
          <li>
            <a
              href='https://www.worldwildlife.org/initiatives/plastics'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [1] World Wildlife - Plastics Initiative
            </a>
          </li>
          <li>
            <a
              href='https://repurpose.global/blog/post/what-is-the-effect-of-plastic-in-forests-and-wildlife'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [2] Repurpose Global - Plastic Effects in Forests and Wildlife
            </a>
          </li>
          <li>
            <a
              href='https://timesofindia.indiatimes.com/etimes/trending/10-easy-ways-to-reduce-plastic-pollution-the-impact-and-reasons-of-reducing-plastic-pollution/articleshow/114186355.cms'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [3] Times of India - Easy Ways to Reduce Plastic Pollution
            </a>
          </li>
          <li>
            <a
              href='https://cei.org/studies/how-plastics-benefit-wildlife-and-the-environment/'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [4] Competitive Enterprise Institute - Plastics Benefits to
              Wildlife and the Environment
            </a>
          </li>
          <li>
            <a
              href='https://www.keepbritaintidy.org/get-involved/support-our-campaigns/plastic-challenge/impact-wildlife'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [5] Keep Britain Tidy - Plastic Challenge Impact on Wildlife
            </a>
          </li>
          <li>
            <a
              href='https://www.palletmach.com/faq/top-8-benefits-of-reducing-plastic-waste.html'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [6] PalletMach - Benefits of Reducing Plastic Waste
            </a>
          </li>
          <li>
            <a
              href='https://www.perchenergy.com/blog/environment/plastic-pollution-impact-environment-wildlife-human-health'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [7] Perch Energy - Plastic Pollution Impact on Environment and
              Wildlife
            </a>
          </li>
          <li>
            <a
              href='https://environment.co/the-benefits-of-reducing-plastic-waste/'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [8] Environment.co - Benefits of Reducing Plastic Waste
            </a>
          </li>
          <li>
            <a
              href='https://www.unep.org/plastic-pollution'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [9] UNEP - Plastic Pollution
            </a>
          </li>
          <li>
            <a
              href='https://www.tutorchase.com/answers/ib/ess/why-is-reducing-plastic-waste-crucial-for-ecosystems'
              className='text-green-500 hover:text-green-700 transition-colors'
              target='_blank'
              rel='noopener noreferrer'>
              [10] TutorChase - Why Reducing Plastic Waste is Crucial for
              Ecosystems
            </a>
          </li>
          {/* ... (rest of the citations remain unchanged) ... */}
        </ul>
      </div>
    </div>
  );
}
