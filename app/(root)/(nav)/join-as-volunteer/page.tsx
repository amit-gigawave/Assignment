import React from "react";
import Hero from "./components/Hero";
// import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";

export const runtime = "edge";

const Page = () => {
  return (
    <section className="px-8 md:px-16 lg:px-24 h-fit pb-10 space-y-10">
      <Hero />
      <ContactForm />
      {/* <FAQ /> */}
    </section>
  );
};

export default Page;
