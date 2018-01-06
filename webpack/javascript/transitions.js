/* jshint esversion: 6 */
/* eslint-env browser */

/**
 * Build Transitions
 */
exports.buildTransitions = function buildTransitions() {
  const links = document.getElementsByTagName('a');
  const html = document.getElementsByTagName('html');

  [].forEach.call(links, (link) => {
    if (window.location.hostname === link.hostname || !link.hostname.length) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const url = link.href;
        if (url !== null && url !== '') {
          html[0].classList.add('fade-site-out');
          setTimeout(() => {
            window.location = url;
          }, 500);
        }
      });
    }
  });
};
