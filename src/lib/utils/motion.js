import { animate, inView, stagger } from 'motion';

const easing = [0.22, 1, 0.36, 1];

export function setupReveal(selector = '[data-reveal]') {
  const elements = Array.from(document.querySelectorAll(selector));
  const cleanups = elements.map((element) =>
    inView(
      element,
      () => {
        const staggerSelector = element instanceof HTMLElement ? element.dataset.stagger : '';
        const targets =
          staggerSelector && element instanceof HTMLElement
            ? Array.from(element.querySelectorAll(staggerSelector))
            : [element];

        animate(
          targets,
          {
            opacity: [0, 1],
            transform: ['translateY(28px)', 'translateY(0px)'],
            filter: ['blur(10px)', 'blur(0px)']
          },
          {
            duration: 0.9,
            delay: targets.length > 1 ? stagger(0.08) : 0,
            easing
          }
        );
      },
      { amount: 0.24 }
    )
  );

  return () => {
    cleanups.forEach((cleanup) => cleanup?.());
  };
}

export function animateOpening(node) {
  const intro = node.querySelectorAll('[data-opening-item]');
  const guestWords = node.querySelectorAll('.guest-word');

  animate(
    intro,
    {
      opacity: [0, 1],
      transform: ['translateY(30px)', 'translateY(0px)'],
      filter: ['blur(12px)', 'blur(0px)']
    },
    { duration: 0.95, delay: stagger(0.12), easing }
  );

  if (guestWords.length) {
    animate(
      guestWords,
      { transform: ['translateY(105%)', 'translateY(0%)'] },
      { duration: 0.8, delay: stagger(0.06, { start: 0.35 }), easing }
    );
  }
}

export function animateModal(node, visible) {
  return animate(
    node,
    visible
      ? { opacity: [0, 1], transform: ['translateY(18px) scale(0.98)', 'translateY(0px) scale(1)'] }
      : { opacity: [1, 0], transform: ['translateY(0px) scale(1)', 'translateY(12px) scale(0.98)'] },
    { duration: 0.32, easing }
  );
}
