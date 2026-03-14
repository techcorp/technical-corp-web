import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import ServicesPreview from "@/components/home/ServicesPreview";
import Process from "@/components/home/Process";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import LatestBlogs from "@/components/home/LatestBlogs";
import CTA from "@/components/home/CTA";

import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Partners />
      <ServicesPreview />
      <FeaturedProducts />
      <Process />
      <WhyChooseUs />
      <Testimonials />
      <LatestBlogs />
      <CTA />
    </div>
  );
}
