import { animate, inView, stagger } from 'motion';

export function animateHero(nodes) {
  if (!nodes.length) {
    return () => {};
  }

  animate(
    nodes,
    { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
    { duration: 0.9, delay: stagger(0.12), easing: [0.22, 1, 0.36, 1] }
  );

  return () => {};
}

export function revealOnView(selector) {
  return inView(selector, (element) => {
    animate(
      element,
      { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0px)'] },
      { duration: 0.8, easing: [0.22, 1, 0.36, 1] }
    );
  });
}

export function staggerChildren(parent, selector) {
  return inView(parent, () => {
    const items = Array.from(parent.querySelectorAll(selector));
    animate(
      items,
      { opacity: [0, 1], transform: ['translateY(26px)', 'translateY(0px)'] },
      { duration: 0.8, delay: stagger(0.1), easing: [0.22, 1, 0.36, 1] }
    );
  });
}

export function parallax(node, target, distance = 80) {
  function update() {
    const rect = target.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
    const offset = progress * distance * -1;
    node.style.transform = `translate3d(0, ${offset}px, 0)`;
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
}
