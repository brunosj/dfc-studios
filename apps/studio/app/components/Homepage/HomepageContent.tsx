import React from 'react';
import { Homepage, Service, Testimonial } from '@payload-types';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import ClientsSection from './ClientsSection';
interface HomepageContentProps {
  homepage: Homepage;
  services?: Service[];
  testimonials?: Testimonial[];
}

const HomepageContent: React.FC<HomepageContentProps> = ({
  homepage,
  services = [],
  // testimonials = [],
}) => {
  return (
    <article className='relative'>
      {/* Homepage-specific decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Dot pattern */}
        <div className='absolute top-[58%] left-[5%] w-[400px] h-[400px] opacity-10 dark:opacity-5 hidden lg:block 2xl:top-[62%]'>
          <svg
            width='100%'
            height='100%'
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
          >
            <pattern
              id='dot-pattern'
              x='0'
              y='0'
              width='10'
              height='10'
              patternUnits='userSpaceOnUse'
            >
              <circle cx='2' cy='2' r='1' fill='currentColor' />
            </pattern>
            <rect width='100%' height='100%' fill='url(#dot-pattern)' />
          </svg>
        </div>
      </div>

      <HeroSection homepage={homepage} />
      <ServicesSection homepage={homepage} services={services} />
      {/* <ClientsSection homepage={homepage} testimonials={testimonials} /> */}
      <ClientsSection homepage={homepage} />
    </article>
  );
};

export default HomepageContent;
