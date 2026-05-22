import { inView, animate, stagger } from 'motion';

export function setupReveal() {
  inView('[data-reveal]', (element) => {
    animate(
      element,
      { 
        opacity: [0, 1], 
        transform: ['translateY(40px)', 'translateY(0)'],
        filter: ['blur(4px)', 'blur(0px)']
      },
      { 
        duration: 1.2, 
        easing: [0.16, 1, 0.3, 1] // Custom very smooth easing curve
      }
    );
    
    // Once revealed, keep it visible
    return () => {}; 
  }, { margin: '-100px' });
}

export function staggerChildren(containerSelector, childSelector, options = {}) {
  const {
    delay = 0.15,
    duration = 1.0,
    distance = 30
  } = options;

  inView(containerSelector, (element) => {
    const children = element.querySelectorAll(childSelector);
    if (!children.length) return;

    animate(
      children,
      { 
        opacity: [0, 1], 
        transform: [`translateY(${distance}px)`, 'translateY(0)'] 
      },
      { 
        delay: stagger(delay),
        duration: duration, 
        easing: [0.16, 1, 0.3, 1]
      }
    );
  }, { margin: '-50px' });
}

export function setupParallax() {
  // Simple parallax for elements with data-parallax
  const handleScroll = () => {
    const scrolled = window.scrollY;
    const elements = document.querySelectorAll('[data-parallax]');
    
    elements.forEach(el => {
      const speed = el.dataset.speed || 0.2;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}
