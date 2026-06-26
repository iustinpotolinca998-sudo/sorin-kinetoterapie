"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wires Lenis smooth scrolling into GSAP's ticker and ScrollTrigger.
 *
 * This is the foundation the scroll-scrubbed hero (Sprint 2) sits on: Lenis
 * becomes the single source of scroll truth and feeds ScrollTrigger.update on
 * every frame, while GSAP's ticker drives Lenis' RAF loop. No content
 * animations live here yet — only the plumbing.
 *
 * `prefers-reduced-motion` is honoured by skipping Lenis entirely, so the
 * visitor gets plain native scrolling.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      // power3.inOut-flavoured easing, matching lib/motion.ts.
      easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      smoothWheel: true,
      // Route in-page hash CTAs (#programare, #metoda) through Lenis so they glide.
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
