'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HomeContextProvider } from '../Context/HomeContext';
import { ArrowDownRight, Play, RefreshCw, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';

function HeaderWithVideo() {
  const heroRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-text > *',
        { autoAlpha: 0, y: 40, rotateX: -20 },
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        widgetRef.current,
        { autoAlpha: 0, x: 40, y: 20 },
        { autoAlpha: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.8 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <HomeContextProvider>
      <div ref={heroRef} className="relative w-full min-h-[105vh] bg-[#0A0F0B] overflow-hidden flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Subtle Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F0B]/80 via-transparent to-[#0A0F0B]/90" />
          <div className="absolute inset-0 bg-[#0A0F0B]/20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-20 md:pt-32">

          <div className="hero-text max-w-4xl relative z-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-secondary" />
              <span className="text-secondary tracking-[0.2em] font-bold text-sm">PREMIUM GLOBAL LOGISTICS</span>
            </div>

            <h1 className="font-heading font-black italic uppercase leading-[0.85] text-5xl md:text-7xl lg:text-[9rem] tracking-tighter text-white mb-2">
              DELIVERED
            </h1>
            <h1 className="font-heading font-black italic uppercase leading-[0.85] text-5xl md:text-7xl lg:text-[9rem] tracking-tighter text-secondary mb-10">
              AT YOUR DOOR
            </h1>

            <p className="text-lg text-white/80 max-w-xl font-medium leading-relaxed mb-12">
              We deliver high-priority, zero-delay logistics directly to your destination within hours. Your cargo doesn&apos;t wait, and neither do we.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/ship">
                <button className="group flex items-center gap-4 bg-secondary text-primary px-8 py-5 rounded-[2rem] font-heading font-black italic uppercase text-lg tracking-wide hover:scale-105 active:scale-95 transition-all shadow-glow-secondary">
                  SHIP TOMORROW
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105">
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Track Your Package Widget */}
          <div
            ref={widgetRef}
            className="relative lg:absolute lg:right-10 lg:bottom-10 z-30 w-full max-w-[440px] mt-20 lg:mt-0"
          >
            <div className="glass bg-[#E6DDD4]/90 backdrop-blur-2xl rounded-[2.5rem] p-8 pb-10 shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Header row */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white/40 text-primary uppercase text-[10px] font-bold tracking-widest backdrop-blur-md">
                  LIVE TRACKING
                </div>
              </div>

              <h3 className="font-heading font-black italic text-3xl text-primary uppercase tracking-tighter mb-2">
                TRACK YOUR PACKAGE
              </h3>
              <p className="text-primary/70 text-xs font-medium mb-6 leading-relaxed">
                Enter your tracking number for real-time shipment status updates.
              </p>

              <TrackingForm />
            </div>

            {/* Overlapping mini widget */}
            <div className="absolute -bottom-16 -left-12 lg:-bottom-24 lg:-left-20 glass bg-[#F8F5F2]/95 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl w-64 rotate-[-4deg] -z-10">
              <div className="w-10 h-10 rounded-full bg-[#1e2d21] text-[#71a179] flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black italic text-primary text-xl uppercase tracking-tight mb-2">
                98% ON TIME
              </h4>
              <p className="text-xs text-primary/70 font-medium leading-relaxed">
                Our advanced routing ensures packages retain maximum priority for immediate delivery.
              </p>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold transform -rotate-90 origin-left mb-12 translate-x-1">
            SCROLL
          </span>
          <div className="w-px h-16 bg-white/10 relative overflow-hidden rounded-full">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/40 animate-scroll-line rounded-full" />
          </div>
        </div>
      </div>
    </HomeContextProvider>
  );
}

function TrackingForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = e.target.tracking.value.trim();
    if (val) {
      // Direct redirect to the tracking details page
      window.location.href = `/Track/${encodeURIComponent(val)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        id="tracking"
        name="tracking"
        type="text"
        placeholder="e.g. KD-2026-XXXXXXXX"
        className="w-full bg-white/60 backdrop-blur border border-primary/15 rounded-2xl px-5 py-4 text-primary font-bold text-sm placeholder:text-primary/35 placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary transition-all"
        autoComplete="off"
        spellCheck="false"
      />
      <button
        type="submit"
        className="w-full bg-primary text-secondary font-heading font-black italic uppercase tracking-widest text-sm py-4 rounded-2xl hover:bg-secondary hover:text-primary transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md"
      >
        TRACK SHIPMENT →
      </button>
      <p className="text-center text-primary/80 text-[10px] font-bold tracking-widest uppercase pt-1">
        or{' '}
        <a href="/Track" className="underline underline-offset-2 hover:text-secondary transition-colors">
          open full tracking page
        </a>
      </p>
    </form>
  );
}

export default HeaderWithVideo;
