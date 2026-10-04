import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin once safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Ensure smooth rendering
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };

export interface GsapScrollOptions {
  /** Selector for section header / title elements to animate */
  headerSelector?: string;
  /** Selector for grid/cards to stagger and float up with 3D perspective */
  cardsSelector?: string;
  /** Selector for parallax floating background elements (ambient lights, badges, grids) */
  parallaxSelector?: string;
  /** Selector for 3D visual mockups or interactive illustration */
  visualSelector?: string;
  /** Stagger interval between cards in seconds (default 0.1) */
  cardStagger?: number;
  /** Card initial Y offset in px (default 50) */
  cardYOffset?: number;
  /** 3D rotation angle in degrees on X axis (default 6) */
  rotate3DX?: number;
  /** Parallax intensity for background decor (default 25) */
  parallaxDistance?: number;
  /** Enable continuous scrub parallax on scroll */
  enableParallax?: boolean;
}

/**
 * Custom React hook that applies GSAP ScrollTrigger 3D float-in,
 * staggered card elevation, and continuous parallax depth to a section.
 */
export function useGsapSection<T extends HTMLElement = HTMLElement>(
  _options: GsapScrollOptions = {}
) {
  // Scroll-triggered section animations intentionally disabled.
  // The section ref is preserved so existing components require no changes.
  return useRef<T | null>(null);
}

/**
 * Interactive 3D Parallax Mouse Tilt hook for premium tactile card feel.
 */
export function useGsap3DTilt<T extends HTMLElement = HTMLElement>(intensity = 10) {
  const cardRef = useRef<T | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let bounds: DOMRect;

    const handleMouseEnter = () => {
      bounds = card.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width - 0.5) * 2;
      const yPct = (mouseY / bounds.height - 0.5) * 2;

      gsap.to(card, {
        rotateY: xPct * intensity,
        rotateX: -yPct * intensity,
        transformPerspective: 1000,
        z: 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(card);
    };
  }, [intensity]);

  return cardRef;
}
