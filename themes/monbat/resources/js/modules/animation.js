import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export const contentAnimations = (
  target,
  trigger,
  startTl = "top center",
  fade,
  duration,
  delay,
  typeY,
  typeX
) => {
  const animation = gsap
    .timeline({ ease: 'ease' })
    .from(target, {
        y: typeY,
        x: typeX,
        opacity: fade,
        delay: delay,
        duration: duration,
    })
    .to(target, {
        y: 0,
        x: 0,
        opacity: 1,
    });

  ScrollTrigger.create({
    trigger: trigger,
    start: startTl,
    animation: animation,
    toggleActions: "play none none none",
  });
};

export const staggerFadeAnimation = (contentAnimation, trigger, startTl, duration, stagger) => {
  const animation = gsap.timeline({ ease: 'ease' })
  .from(contentAnimation, {
    opacity: 0,
    duration,
    stagger,
  })
  .to(contentAnimation, { opacity: 1 });

  ScrollTrigger.create({
    trigger: trigger,
    start: startTl,
    animation: animation,
    toggleActions: "play none none none",
  });
}

export const initContentAnimations = () => {
    const contentAnimation = document.querySelectorAll('.sk-content-animation__wrapp');
    if(!contentAnimation);

    [...contentAnimation].map(anim => {
        const delay = anim.dataset.skDelay;
        const duration = anim.dataset.skDuration;
        const typeX = anim.dataset.skTypex;
        const typeY = anim.dataset.skTypey;
        const fade = anim.dataset.skFade === 'fade' ? 0 : 1;

        contentAnimations(anim, anim.parentNode, "top 85%", fade, duration, delay, typeY, typeX);
    });
};

export const perfomanceIndicatorAnimation = () => {
  const perfomance = document.querySelectorAll('.perfomance-indicators');
  if(!perfomance) return;

  [...perfomance].map(item => {
    const contentAnimation = item.querySelectorAll('.perfomance-indicators__item');
    const arrows = item.querySelectorAll('.perfomance-indicators__arrow');
    const duration = 0.8;
    staggerFadeAnimation(contentAnimation, item, "top 85%", duration, duration);
    staggerFadeAnimation(arrows, item, "top 85%", duration, duration);
  });
}

export const strategyAccordionSticky = () => {
  const headerHeight = document.querySelector("header.header").offsetHeight;

  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".strategy-accordion__main",
      start: `top ${headerHeight}px`,
      scrub: true,
      toggleClass: { className: 'fixed', targets: '.strategy-accordion' },
    },
  });
}
