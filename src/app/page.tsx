import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { DailySpecial } from '@/components/sections/daily-special';
import { Gallery } from '@/components/sections/gallery';
import { Location } from '@/components/sections/location';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <DailySpecial />
      <Gallery />
      <Location />
    </>
  );
}
