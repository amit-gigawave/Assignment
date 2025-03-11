
export const runtime = "edge";

const Page = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-secondary/5 px-4 py-8 md:p-10  md: pt-24 lg:pt-40">
      <div className="mx-auto max-w-7xl space-y-12 lg:space-y-16 flex flex-col justify-center">
        <div className="space-y-6 text-center mx-auto">
          {/* <CustomBreadcrumb /> */}
          
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <h3 className="text-3xl md:text-5xl font-bold leading-tight text-center text-secondary-foreground">
            About US
          </h3>

            <div className="space-y-6 flex flex-col">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto ">
                Starting a charity organization is a significant undertaking, and
                choosing the name Daanakarma reflects a beautiful and meaningful
                philosophy. Here&apos;s why that name is powerful and some things to
                consider as we move forward:
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
                
                <div className="rounded-xl  bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-md h-full ">
                    <h4 className="text-base md:text-xl font-bold mb-6 text-secondary-foreground text-start">
                      Why &quot;Daanakarma&quot; is a strong name:
                    </h4>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 block h-2 w-2 rounded-full bg-primary"></span>
                        <div className="space-y-3 text-start">
                          <strong className="text-secondary-foreground">Meaningful:</strong> Combines two Sanskrit words:
                          <ul className="mt-2 ml-4 space-y-2">
                            <li className="flex items-start space-x-2">
                              <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                              <span><strong className="text-secondary-foreground">Dāna (दान):</strong> Generosity, giving without expectation</span>
                            </li>
                            <li className="flex items-start space-x-2">
                              <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-primary/70"></span>
                              <span><strong className="text-secondary-foreground">Karma (कर्म):</strong> Action and its consequences</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 block h-2 w-2 rounded-full bg-primary"></span>
                        <div>
                          <strong className="text-secondary-foreground">Mission-driven:</strong> Clearly communicates charitable focus
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="mt-1.5 block h-2 w-2 rounded-full bg-primary"></span>
                        <div>
                          <strong className="text-secondary-foreground">Spiritual resonance:</strong> Embodies deeper ethical purpose
                        </div>
                      </li>
                    </ul>
                </div>

                  <div className="rounded-xl bg-card p-6 md:p-8 shadow-sm transition-all hover:shadow-md h-full">
                    <h4 className="text-base md:text-xl font-bold mb-6 text-secondary-foreground text-start">
                      Our Strategic Foundations:
                    </h4>
                    <ul className="space-y-4 text-muted-foreground">
                      {[
                        { title: "Focused impact", desc: "Targeting poverty alleviation and education" },
                        { title: "Legal integrity", desc: "Registered non-profit with transparent governance" },
                        { title: "Digital presence", desc: "Robust platform for global outreach" },
                        { title: "Sustainable funding", desc: "Multi-channel fundraising strategy" },
                        { title: "Accountability", desc: "Regular impact reporting and financial audits" },
                        { title: "Expert team", desc: "Combining experience with youthful innovation" }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="mt-1.5 block h-2 w-2 rounded-full bg-primary"></span>
                          <div>
                            <strong className="text-secondary-foreground">{item.title}:</strong> {item.desc}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

              </div>
            </div>

        </div>
         
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-10">
            <h3 className="text-xl md:text-3xl font-bold leading-tight text-center text-secondary-foreground">
              Daanakarma Sevak
            </h3>
            <p className="mx-auto max-w-4xl text-center text-sm md:text-base text-muted-foreground leading-relaxed">
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
          </div>
        </div>
        

        <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h3 className="text-xl md:text-3xl  font-bold leading-tight text-center text-secondary-foreground">
            Volunteer/Sevak
          </h3>
          <p className="mx-auto max-w-4xl text-center text-sm md:text-base text-muted-foreground leading-relaxed">
            Volunteers and sevaks are an essential part of our society. They are the
            people who make the world a better place. A volunteer is typically
            someone who offers their time and skills to an organization or cause
            without expecting anything in return. They may be motivated by a desire
            to help others, to make a difference in the world, or to gain new skills
            and experience.
          </p>
        </div>
      </div>
      <p className="mx-auto pt-20 max-w-4xl text-center text-sm md:text-base italic text-muted-foreground leading-relaxed">
            Through Daanakarma, we aim to create a global movement of conscious
            giving, where every action creates ripples of positive change. Join
            us in this journey to transform lives through compassionate service.
          </p>
    </section>
  );
};

export default Page;
