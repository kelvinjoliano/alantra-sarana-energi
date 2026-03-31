import Hero from "@/section/Hero";
import StatsSection from "@/section/Stats";
import FeaturesSection from "@/section/Feature";
import PartnersSection from "@/section/Partners";
import TestimonialsSection from "@/section/Testimonial";
import CTASection from "@/section/Cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
