import ContactHero from "@/section/contact/ContactHero";
import ContactInfo from "@/section/contact/ContactInfo";
import ContactForm from "@/section/contact/ContactForm";
import ContactMap from "@/section/contact/ContactMap";
import ContactFAQ from "@/section/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <section className="bg-[#1a2332]">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactMap />
        </div>
      </section>
      <ContactFAQ />
    </main>
  );
}
