import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import React from "react";

const Hero = () => {
  return (
    <section className="p-10 pb-16 md:pb-24 md:pt-40 flex flex-col gap-6 items-center">
      <CustomBreadcrumb />
      <h3 className="text-4xl md:text-6xl font-bold leading-tight text-center text-secondary-foreground">
        Daanakarma Sevak:
      </h3>
      <p className="max-w-6xl text-center">
        Since 2006 Venkata Rama Kumar a Native from India has been travelling in
        US performing various jobs and helping clients with software
        implementations. One day when returning on a flight he was struck with
        the Idea of DaanaKarma. Since then he had been reaching many people,
        finally in 2025 he dream has come true with couple of young developers
        and volunteers(Sevaks). Person of Sunyam which refers to
        &quot;Emptiness,&quot; &quot;openness,&quot; &quot;nothingness,&quot;
        &quot;non-substantiality,&quot; &quot;relativity,&quot; and &quot;the
        inexhaustible&quot; This will be enchanting journey for all the souls.
      </p>
      <h3 className="text-3xl md:text-5xl font-bold leading-tight text-center text-secondary-foreground">
        Volunteer/Sevak:
      </h3>
      <p className="max-w-6xl text-center">
        Volunteers and sevaks are an essential part of our society. They are the
        people who make the world a better place. A volunteer is typically
        someone who offers their time and skills to an organization or cause
        without expecting anything in return. They may be motivated by a desire
        to help others, to make a difference in the world, or to gain new skills
        and experience.
      </p>

      {/* New About US Section */}
      <div className="max-w-6xl mt-12">
        <h3 className="text-4xl md:text-6xl font-bold leading-tight text-center text-secondary-foreground mb-8">
          About US
        </h3>

        <div className="space-y-6">
          <p>
            Starting a charity organization is a significant undertaking, and
            choosing the name Daanakarma reflects a beautiful and meaningful
            philosophy. Here&apos;s why that name is powerful and some things to
            consider as we move forward:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-2xl font-bold mb-4">
              Why &quot;Daanakarma&quot; is a strong name:
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Meaningful:</strong> Combines two Sanskrit words:
                <ul className="list-[circle] list-inside ml-6">
                  <li>
                    <strong>Dāna (दान):</strong> Generosity, giving without
                    expectation
                  </li>
                  <li>
                    <strong>Karma (कर्म):</strong> Action and its consequences
                  </li>
                </ul>
              </li>
              <li>
                <strong>Mission-driven:</strong> Clearly communicates charitable
                focus
              </li>
              <li>
                <strong>Spiritual resonance:</strong> Embodies deeper ethical
                purpose
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-2xl font-bold mb-4">
              Our Strategic Foundations:
            </h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Focused impact:</strong> Targeting poverty alleviation
                and education
              </li>
              <li>
                <strong>Legal integrity:</strong> Registered non-profit with
                transparent governance
              </li>
              <li>
                <strong>Digital presence:</strong> Robust platform for global
                outreach
              </li>
              <li>
                <strong>Sustainable funding:</strong> Multi-channel fundraising
                strategy
              </li>
              <li>
                <strong>Accountability:</strong> Regular impact reporting and
                financial audits
              </li>
              <li>
                <strong>Expert team:</strong> Combining experience with youthful
                innovation
              </li>
            </ul>
          </div>

          <p className="text-center italic mt-8">
            Through Daanakarma, we aim to create a global movement of conscious
            giving, where every action creates ripples of positive change. Join
            us in this journey to transform lives through compassionate service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
