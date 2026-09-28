import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "../common/Container";

const accentBorders = ["border-t-[#4f73ff]", "border-t-[#ff7858]", "border-t-[#caff4f]", "border-t-[#9ed7ff]"];

export default function About({ about, profile, reducedMotion }) {
  return (
    <section id="about" className="border-b border-[#152238]/10 bg-[#fffaf3] py-18 text-[#152238] sm:py-22 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ff7858]">{about.label}</p>
            <h2 className="mt-4 max-w-4xl text-balance text-[2.8rem] font-black leading-[.92] tracking-[-.06em] sm:text-6xl lg:text-[5.9rem]">{about.title}</h2>
          </div>
          <div>
            <p className="max-w-2xl text-[16px] leading-8 text-[#152238]/58">{about.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#152238]/35">
              {profile.location && <span>{profile.location}</span>}
              {profile.availability && <span className="inline-flex items-center gap-2 text-[#152238]/55"><span className="h-1.5 w-1.5 rounded-full bg-[#4f73ff]" />{profile.availability}</span>}
            </div>
          </div>
        </div>

        <div className="mt-14 grid overflow-hidden rounded-[30px] border border-[#152238]/10 bg-[#f6f0e7] lg:grid-cols-[.72fr_1.28fr]">
          <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden border-b border-[#152238]/10 p-7 lg:border-b-0 lg:border-r lg:p-9">
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#4f73ff]/10" aria-hidden="true" />
            <div className="absolute bottom-10 right-9 h-20 w-20 rounded-full bg-[#caff4f]" aria-hidden="true" />
            <p className="relative z-10 max-w-md text-[1.45rem] font-semibold leading-[1.34] tracking-[-.035em] text-[#152238]/88 sm:text-[1.7rem]">
              I care about the part after the mockup — when workflows, edge cases and business rules have to hold up in the real product.
            </p>

            <div className="relative z-10 mt-10 flex items-center gap-4">
              <img src={profile.image} alt={profile.name} loading="lazy" decoding="async" className="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <p className="text-sm font-black tracking-[-.02em]">{profile.name}</p>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.1em] text-[#4f73ff]">LinkedIn <ArrowUpRight size={12} /></a>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2">
            {about.principles.map((item, index) => (
              <motion.article
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group min-h-[220px] border-t-4 ${accentBorders[index % accentBorders.length]} p-7 sm:min-h-[250px] sm:p-8 ${index % 2 === 0 ? "sm:border-r sm:border-r-[#152238]/10" : ""} ${index < 2 ? "border-b border-b-[#152238]/10" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[9px] font-black tracking-[0.16em] text-[#152238]/28">{item.number}</span>
                  <span className="h-2 w-2 rounded-full bg-[#152238]/12 transition duration-300 group-hover:scale-150 group-hover:bg-[#4f73ff]" />
                </div>
                <div className="mt-10">
                  <h3 className="text-xl font-black tracking-[-.035em]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#152238]/52">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
