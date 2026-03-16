'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  ShieldCheck,
  Rocket,
  Globe,
  ArrowRight,
  Store,
  Package,
  Users,
  Truck,
  Zap,
  Search,
  Star,
} from 'lucide-react';

/* ─── Reusable primitives ───────────────────────────────────────────── */

/** Slides in from the left, centres, then drifts right + italicises */
function SlideAcrossText({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ x: -120, opacity: 0 }}
      animate={
        inView
          ? {
              x: [null, 0, 60],
              opacity: [null, 1, 1],
              fontStyle: ['normal', 'normal', 'italic'],
            }
          : {}
      }
      transition={{
        delay,
        duration: 1.2,
        times: [0, 0.45, 1],
        ease: ['easeOut', 'easeInOut'],
      }}
    >
      {children}
    </motion.div>
  );
}

/** Simple fade + slide-up on scroll */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Slides from left */
function SlideLeft({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ x: -80, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Slides from right */
function SlideRight({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ x: 80, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal scroll strip (lazy-loaded via IntersectionObserver) ── */
function HorizontalScrollStrip({ items }: { items: { icon: React.ReactNode; label: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: false, margin: '0px' });

  return (
    <div ref={trackRef} className="overflow-hidden py-4 relative">
      {/* gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex gap-6 will-change-transform"
        animate={inView ? { x: ['0%', '-50%'] } : { x: '0%' }}
        transition={{
          duration: 28,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{ width: 'max-content' }}
      >
        {/* duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-6 py-3 rounded-full border-2 border-border bg-card text-foreground font-semibold text-sm whitespace-nowrap select-none"
          >
            <span className="text-primary">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Stat counter card ─────────────────────────────────────────────── */
function StatCard({
  number,
  label,
  icon,
  delay,
}: {
  number: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className="relative group flex flex-col items-center gap-3 p-8 border-2 border-border bg-card rounded-2xl overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, borderColor: 'var(--lupa-primary)' }}
    >
      {/* outline accent circle */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-500" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-2 border-primary/10 group-hover:border-primary/30 transition-colors duration-500" />

      <div className="text-primary">{icon}</div>
      <div className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
        {number}
      </div>
      <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground text-center">
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Value card ────────────────────────────────────────────────────── */
function ValueCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className="relative group p-8 border-2 border-border bg-card rounded-2xl overflow-hidden cursor-default"
      initial={{ x: -60, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ delay, duration: 0.65, ease: 'easeOut' }}
      whileHover={{ x: 6 }}
    >
      {/* left accent bar */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-primary origin-top"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      />

      <div className="flex items-start gap-5">
        <div className="p-3 rounded-xl border-2 border-primary/30 bg-brand-50 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Timeline item ─────────────────────────────────────────────────── */
function TimelineItem({
  year,
  title,
  description,
  delay,
  side,
}: {
  year: string;
  title: string;
  description: string;
  delay: number;
  side: 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className={`flex items-start gap-6 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      <motion.div
        className={`flex-1 p-6 border-2 border-border bg-card rounded-2xl ${side === 'right' ? 'text-right' : ''}`}
        initial={{ x: side === 'left' ? -60 : 60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ delay, duration: 0.65, ease: 'easeOut' }}
        whileHover={{ borderColor: 'var(--lupa-primary)' }}
      >
        <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">{year}</div>
        <div className="text-lg font-bold text-foreground mb-2">{title}</div>
        <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
      </motion.div>

      {/* dot */}
      <motion.div
        className="relative flex-none mt-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
      >
        <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background ring-offset-2 ring-offset-primary/20" />
      </motion.div>

      <div className="flex-1" />
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function AboutSection() {
  const t = useTranslations('about');
  const locale = useLocale();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stripItems = [
    { icon: <Store className="w-4 h-4" />, label: t('strip.stores') },
    { icon: <Package className="w-4 h-4" />, label: t('strip.products') },
    { icon: <Users className="w-4 h-4" />, label: t('strip.customers') },
    { icon: <Truck className="w-4 h-4" />, label: t('strip.deliveries') },
    { icon: <Star className="w-4 h-4" />, label: t('strip.reviews') },
    { icon: <Zap className="w-4 h-4" />, label: t('strip.speed') },
    { icon: <Search className="w-4 h-4" />, label: t('strip.discovery') },
    { icon: <ShieldCheck className="w-4 h-4" />, label: t('strip.trust') },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* dot grid bg */}
        <div className="absolute inset-0 [background-image:radial-gradient(var(--lupa-foreground)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] opacity-[0.04]" />

        {/* decorative outline rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-primary/5 pointer-events-none" />

        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* eyebrow */}
          <SlideLeft delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-primary/40 text-primary text-xs font-black uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('hero.eyebrow')}
            </span>
          </SlideLeft>

          {/* main headline — slide across animation */}
          <SlideAcrossText delay={0.25} className="text-5xl md:text-8xl font-black tracking-tighter text-foreground leading-none mb-6">
            {t('hero.title')}
          </SlideAcrossText>

          <FadeUp delay={0.6}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              {t('hero.description')}
            </p>
          </FadeUp>

          <FadeUp delay={0.8}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/stores/register`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest hover:bg-primary-hover transition-colors"
              >
                {t('hero.ctaStore')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-foreground text-foreground font-black text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
              >
                {t('hero.ctaShop')}
              </Link>
            </div>
          </FadeUp>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ── 2. MARQUEE STRIP ─────────────────────────────────────── */}
      <section className="py-6 border-y-2 border-border bg-background">
        <HorizontalScrollStrip items={stripItems} />
      </section>

      {/* ── 3. STATS ─────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <SlideAcrossText delay={0} className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
              {t('stats.title')}
            </SlideAcrossText>
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground max-w-xl mx-auto">{t('stats.subtitle')}</p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard number="500+" label={t('stats.stores')} icon={<Store className="w-6 h-6" />} delay={0.0} />
            <StatCard number="50K+" label={t('stats.products')} icon={<Package className="w-6 h-6" />} delay={0.1} />
            <StatCard number="100K+" label={t('stats.customers')} icon={<Users className="w-6 h-6" />} delay={0.2} />
            <StatCard number="1M+" label={t('stats.deliveries')} icon={<Truck className="w-6 h-6" />} delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── 4. MISSION — split layout ────────────────────────────── */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <SlideLeft delay={0}>
              <span className="text-xs font-black uppercase tracking-widest text-primary">
                {t('mission.eyebrow')}
              </span>
            </SlideLeft>
            <SlideAcrossText delay={0.1} className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
              {t('mission.title')}
            </SlideAcrossText>
            <FadeUp delay={0.35}>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('mission.description')}
              </p>
            </FadeUp>
          </div>

          {/* right: big outlined quote */}
          <SlideRight delay={0.2}>
            <div className="relative p-10 border-2 border-primary/30 rounded-3xl bg-card overflow-hidden">
              {/* decorative large quote mark */}
              <div className="absolute -top-6 -left-4 text-[10rem] font-black text-primary/10 leading-none select-none pointer-events-none">
                "
              </div>
              <p className="relative text-xl md:text-2xl font-semibold text-foreground leading-relaxed italic">
                {t('mission.quote')}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">
                  JS
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{t('team.founder.name')}</div>
                  <div className="text-xs text-muted-foreground">{t('team.founder.role')}</div>
                </div>
              </div>
            </div>
          </SlideRight>
        </div>
      </section>

      {/* ── 5. VALUES ────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4">
            <SlideAcrossText delay={0} className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
              {t('values.title')}
            </SlideAcrossText>
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground max-w-lg">{t('values.subtitle')}</p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={<ShieldCheck className="w-5 h-5" />}
              title={t('values.trust.title')}
              description={t('values.trust.description')}
              delay={0}
            />
            <ValueCard
              icon={<Rocket className="w-5 h-5" />}
              title={t('values.innovation.title')}
              description={t('values.innovation.description')}
              delay={0.15}
            />
            <ValueCard
              icon={<Globe className="w-5 h-5" />}
              title={t('values.community.title')}
              description={t('values.community.description')}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ── 6. TIMELINE ──────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <SlideAcrossText delay={0} className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
              {t('timeline.title')}
            </SlideAcrossText>
          </div>

          {/* vertical line */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <div className="space-y-10">
              <TimelineItem year="2022" title={t('timeline.y2022.title')} description={t('timeline.y2022.description')} delay={0} side="left" />
              <TimelineItem year="2023" title={t('timeline.y2023.title')} description={t('timeline.y2023.description')} delay={0.1} side="right" />
              <TimelineItem year="2024" title={t('timeline.y2024.title')} description={t('timeline.y2024.description')} delay={0.1} side="left" />
              <TimelineItem year="2025" title={t('timeline.y2025.title')} description={t('timeline.y2025.description')} delay={0.1} side="right" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TEAM ──────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <SlideAcrossText delay={0} className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
              {t('team.title')}
            </SlideAcrossText>
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground max-w-lg mx-auto">{t('team.subtitle')}</p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { key: 'founder', initials: 'JS', delay: 0 },
              { key: 'cto', initials: 'MS', delay: 0.15 },
              { key: 'design', initials: 'PC', delay: 0.3 },
            ].map(({ key, initials, delay }) => (
              <FadeUp key={key} delay={delay}>
                <motion.div
                  className="group relative p-8 border-2 border-border bg-card rounded-2xl text-center space-y-4 overflow-hidden"
                  whileHover={{ borderColor: 'var(--lupa-primary)', y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* outline circle deco */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-2 border-primary/10 group-hover:border-primary/30 transition-colors duration-500" />

                  <div className="relative w-20 h-20 mx-auto rounded-full bg-brand-50 border-2 border-primary/30 group-hover:border-primary flex items-center justify-center transition-colors duration-300">
                    <span className="text-xl font-black text-primary">{initials}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {t(`team.${key}.name` as any)}
                    </h3>
                    <p className="text-sm text-primary font-semibold uppercase tracking-widest">
                      {t(`team.${key}.role` as any)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`team.${key}.bio` as any)}
                  </p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA ───────────────────────────────────────────────── */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#1e1145]">
        {/* outline grid */}
        <div className="absolute inset-0 [background-image:linear-gradient(var(--lupa-brand-300)/8%_1px,transparent_1px),linear-gradient(90deg,var(--lupa-brand-300)/8%_1px,transparent_1px)] [background-size:60px_60px]" />

        {/* outline circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-500/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-500/10 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
          <SlideAcrossText delay={0} className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-none">
            {t('cta.title')}
          </SlideAcrossText>

          <FadeUp delay={0.3}>
            <p className="text-lg text-brand-300 leading-relaxed max-w-xl mx-auto">
              {t('cta.description')}
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/stores/register`}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-white text-[#1e1145] font-black text-sm uppercase tracking-widest hover:bg-brand-100 transition-colors"
              >
                {t('cta.joinStore')} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border-2 border-white/30 text-white font-black text-sm uppercase tracking-widest hover:border-white/70 transition-colors"
              >
                {t('cta.startShopping')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
