// Simple version of anime.js for demo purposes
const anime = (function() {
  'use strict';

  function createAnimation(params) {
    const targets = typeof params.targets === 'string' 
      ? document.querySelectorAll(params.targets)
      : params.targets;

    const duration = params.duration || 1000;
    const easing = params.easing || 'linear';
    const loop = params.loop || false;
    const direction = params.direction || 'normal';
    
    const animations = Array.from(targets).map(target => {
      const animation = target.animate([
        { transform: 'translate(0) rotate(0)' },
        { 
          transform: `translateX(${params.translateX || 0}px) rotate(${params.rotate || '0deg'})`
        }
      ], {
        duration,
        easing,
        iterations: loop ? Infinity : 1,
        direction
      });

      return animation;
    });

    return {
      play() {
        animations.forEach(a => a.play());
      },
      pause() {
        animations.forEach(a => a.pause());
      }
    };
  }

  return createAnimation;
})();

if (typeof module !== 'undefined') {
  module.exports = anime;
} else {
  window.anime = anime;
}