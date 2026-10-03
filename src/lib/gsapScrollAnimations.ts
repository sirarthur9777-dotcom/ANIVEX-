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
  options: GsapScrollOptions = {}
) {
  const sectionRef = useRef<T | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect user's accessibility preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const {
      headerSelector = '.gsap-header',
      cardsSelector = '.gsap-card',
      parallaxSelector = '.gsap-parallax',
      visualSelector = '.gsap-3d-visual',
      cardStagger = 0.1,
      cardYOffset = 50,
      rotate3DX = 6,
      parallaxDistance = 30,
      enableParallax = true,
    } = options;

    const ctx = gsap.context(() => {
      // 1. Section Header 3D Reveal & Float Up
      const headerElements = el.querySelectorAll(headerSelector);
      if (headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          {
            opacity: 0,
            y: 35,
            rotateX: rotate3DX,
            transformPerspective: 1000,
            transformOrigin: '50% 100%',
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Cards Staggered 3D Float Up with Spatial Perspective
      const cards = el.querySelectorAll(cardsSelector);
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: cardYOffset,
            z: -40,
            rotateX: rotate3DX * 1.2,
            scale: 0.96,
            transformPerspective: 1200,
            transformOrigin: 'center bottom',
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.95,
            stagger: cardStagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0] || el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Continuous 3D Parallax on Scroll (Foreground Visuals & Background Lighting)
      if (enableParallax) {
        const parallaxItems = el.querySelectorAll(parallaxSelector);
        parallaxItems.forEach((item, index) => {
          const speedMultiplier = (index % 2 === 0 ? 1 : -0.7) * (parallaxDistance / 25);
          gsap.fromTo(
            item,
            { y: -parallaxDistance * speedMultiplier * 0.5 },
            {
              y: parallaxDistance * speedMultiplier,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        });

        const visuals = el.querySelectorAll(visualSelector);
        visuals.forEach((visual) => {
          gsap.fromTo(
            visual,
            {
              y: 30,
              rotateX: rotate3DX,
              rotateY: -2,
              transformPerspective: 1000,
            },
            {
              y: -30,
              rotateX: -rotate3DX,
              rotateY: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        });
      }
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    options.headerSelector,
    options.cardsSelector,
    options.parallaxSelector,
    options.visualSelector,
    options.cardStagger,
    options.cardYOffset,
    options.rotate3DX,
    options.parallaxDistance,
    options.enableParallax,
  ]);

  return sectionRef;
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
