import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

export default function About({ about, profile, reducedMotion }) {
  return (
    <section
      id="about"
      className="border-b border-white/[0.08] bg-[#191b1a] py-16 text-white sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid gap-8 border-b border-white/[0.1] pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20 lg:pb-14">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#91a6f0]">
              {about.label}
            </p>
            <h2 className="mt-3 max-w-2xl text-balance text-[2.25rem] font-black leading-[0.96] tracking-[-0.055em] sm:mt-4 sm:text-5xl lg:text-6xl">
              {about.title}
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
              {about.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/34">
              {profile.location && <span>{profile.location}</span>}
              {profile.availability && (
                <span className="inline-flex items-center gap-2 text-white/52">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#91a6f0]" />
                  {profile.availability}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-between border-b border-white/[0.1] py-8 lg:border-b-0 lg:border-r lg:py-10 lg:pr-12">
            <div>
              <p className="max-w-sm text-[1.35rem] font-semibold leading-[1.35] tracking-[-0.035em] text-white/86 sm:text-2xl">
                I care about the part after the mockup — when workflows, edge cases and business rules have to hold up in the real product.
              </p>
            </div>

            <div className="mt-9 flex items-center gap-4 sm:mt-12">
              <img
                src={profile.image}
                alt={profile.name}
                className="h-12 w-12 rounded-xl object-cover grayscale-[12%]"
              />
              <div>
                <p className="text-sm font-bold tracking-[-0.02em]">{profile.name}</p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.11em] text-white/35 transition-colors hover:text-white"
                >
                  LinkedIn <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:pl-12">
            {about.principles.map((item, index) => (
              <motion.article
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.045 }}
                className={`group relative min-h-[190px] border-white/[0.09] py-7 sm:min-h-[220px] sm:px-7 sm:py-8 ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } ${index < 2 ? "border-b" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[9px] font-black tracking-[0.16em] text-white/22">
                    {item.number}
                  </p>
                  <span className="mt-1 h-px w-7 bg-white/12 transition-all duration-300 group-hover:w-10 group-hover:bg-[#91a6f0]/60" />
                </div>

                <div className="mt-8 sm:mt-10">
                  <h3 className="text-[1.12rem] font-bold tracking-[-0.03em] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/46">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
