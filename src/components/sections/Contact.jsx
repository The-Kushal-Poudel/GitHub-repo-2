import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, Zap } from "lucide-react";
import Container from "../common/Container";
import SocialButton from "../common/SocialButton";
import { GitHubIcon, LinkedInIcon } from "../../lib/icons";
import { fadeLeft, fadeRight } from "../../lib/animations";
import { useContactForm } from "../../hooks/useContactForm";

function FieldError({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-xs font-semibold text-red-700">
      {message}
    </p>
  );
}

export default function Contact({ contactData, profile, reducedMotion }) {
  const { errors, form, handleChange, handleSubmit, isSubmitting, status } = useContactForm({
    recipientEmail: profile.email,
    subjectPrefix: contactData.emailSubjectPrefix,
  });

  return (
    <section id="contact" className="relative overflow-hidden bg-[#f8f3eb]">
      <motion.div
        animate={reducedMotion ? undefined : { rotate: [0, 12, -12, 0], y: [0, -18, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-8 top-12 hidden rounded-2xl border border-[#e6ded0] bg-white/50 p-4 text-[#a78d67] shadow-xl shadow-black/5 lg:block"
        aria-hidden="true"
      >
        <Zap size={28} />
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, x: 80 }}
        whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 hidden h-full w-[32%] lg:block"
      >
        <motion.img
          src={contactData.image}
          alt={contactData.imageAlt}
          loading="lazy"
          width="900"
          height="600"
          whileHover={reducedMotion ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.8 }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      <Container className="relative grid gap-8 py-12 lg:grid-cols-[0.72fr_1.28fr] lg:py-14">
        <motion.div variants={fadeLeft} initial={reducedMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <p className={`mb-3 ${contactData.iconImage ? "inline-flex items-center gap-2" : ""} text-[10px] font-black uppercase tracking-[0.3em] text-[#a78d67] sm:text-[11px]`}>
            {contactData.iconImage && (
              <img src={contactData.iconImage} alt="" className="w-5 h-5 object-contain" />
            )}
            {contactData.label}
          </p>
          <h2 className="font-serif text-3xl leading-tight text-[#211f1a] lg:text-[38px]">{contactData.title}</h2>

          <div className="mt-7 space-y-4 text-sm text-[#5f574d]">
            <motion.p whileHover={reducedMotion ? undefined : { x: 8 }} className="flex items-center gap-3">
              <Mail size={17} className="text-[#a78d67]" aria-hidden="true" /> {profile.email}
            </motion.p>
            <motion.p whileHover={reducedMotion ? undefined : { x: 8 }} className="flex items-center gap-3">
              <Phone size={17} className="text-[#a78d67]" aria-hidden="true" /> {profile.phone}
            </motion.p>
            <motion.p whileHover={reducedMotion ? undefined : { x: 8 }} className="flex items-center gap-3">
              <MapPin size={17} className="text-[#a78d67]" aria-hidden="true" /> {profile.location}
            </motion.p>
          </div>

          <div className="mt-6 flex gap-3">
            <SocialButton href={profile.github} label="Open Kushal Poudel GitHub profile">
              <GitHubIcon size={17} />
            </SocialButton>
            <SocialButton href={profile.linkedin} label="Open Kushal Poudel LinkedIn profile">
              <LinkedInIcon size={17} />
            </SocialButton>
            <SocialButton href={`mailto:${profile.email}`} label="Email Kushal Poudel">
              <Mail size={17} aria-hidden="true" />
            </SocialButton>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          variants={fadeRight}
          initial={reducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={reducedMotion ? undefined : { y: -8 }}
          className="relative z-10 rounded-xl border border-[#e6ded0] bg-white/80 p-5 shadow-2xl shadow-black/5 backdrop-blur-xl lg:mr-[22%] lg:p-6"
          noValidate
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="sr-only">Your name</label>
              <motion.input
                id="contact-name"
                whileFocus={reducedMotion ? undefined : { scale: 1.02 }}
                name="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className="h-12 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                placeholder={contactData.namePlaceholder}
                autoComplete="name"
              />
              <FieldError id="contact-name-error" message={errors.name} />
            </div>

            <div>
              <label htmlFor="contact-email" className="sr-only">Email address</label>
              <motion.input
                id="contact-email"
                whileFocus={reducedMotion ? undefined : { scale: 1.02 }}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className="h-12 w-full rounded-md border border-[#e9e2d7] bg-white px-4 text-sm outline-none transition focus:border-[#a78d67]"
                placeholder={contactData.emailPlaceholder}
                autoComplete="email"
              />
              <FieldError id="contact-email-error" message={errors.email} />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contact-message" className="sr-only">Project message</label>
            <motion.textarea
              id="contact-message"
              whileFocus={reducedMotion ? undefined : { scale: 1.01 }}
              name="message"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className="h-32 w-full resize-none rounded-md border border-[#e9e2d7] bg-white px-4 py-4 text-sm outline-none transition focus:border-[#a78d67]"
              placeholder={contactData.messagePlaceholder}
            />
            <FieldError id="contact-message-error" message={errors.message} />
          </div>

          {status && (
            <p
              role="status"
              className={`mt-4 rounded-md px-4 py-3 text-sm font-semibold ${
                status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              {status.message}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={reducedMotion || isSubmitting ? undefined : { y: -4, scale: 1.02 }}
            whileTap={isSubmitting ? undefined : { scale: 0.96 }}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#151412] text-sm font-semibold text-white transition hover:bg-[#2a2824] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? contactData.submittingText : contactData.buttonText}
            <ArrowRight size={16} aria-hidden="true" />
          </motion.button>
        </motion.form>
      </Container>
    </section>
  );
}
