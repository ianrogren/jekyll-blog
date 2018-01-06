/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */

import Typed from 'typed.js';

require('./css/sass/bundle.scss');

const vvaves = {};

vvaves.init = () => {
  const aboutScript = require('./javascript/about');
  const aboutPage = document.getElementById('about-page');
  const html = document.getElementsByTagName('html');
  const menu = document.getElementById('menu-container');
  const menuScript = require('./javascript/menu');
  const pageNotFound = document.getElementById('not-found');
  const pageTransitions = require('./javascript/transitions');
  const search = require('./javascript/search');

  // About Page
  if (aboutPage !== null) {
    aboutScript.aboutInit();
    document.getElementsByTagName('body')[0].classList.add('about-body');

    if (document.getElementById('typed') !== null) {
      const typed = new Typed('#typed', {
        strings: [
          '<span class="typed code">code.</span><i class="fa fa-code" aria-hidden="true"></i>',
          '<span class="typed hack-things">hack things.</span><i class="fa fa-wrench" aria-hidden="true"></i>',
          '<span class="typed climb-rocks">climb rocks.</span><i class="fa fa-hand-rock-o" aria-hidden="true"></i></span>',
          '<span class="typed brew-beer">brew beer.</span><i class="fa fa-beer" aria-hidden="true"></i>',
        ],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 2500,
        loop: true,
        cursorChar: '',
      });
    }
  }

  // Page Not Found
  if (pageNotFound !== null) {
    const timer = document.getElementById('timer');
    if (timer !== null) {
      const countDown = (count) => {
        let timeCheck = count;
        const countCheck = setInterval(() => {
          if (timeCheck > 0) {
            timeCheck -= 1;
          } else {
            clearInterval(countCheck);
            html[0].classList.add('fade-site-out');
            setTimeout(() => {
              window.location = '/';
            }, 500);
          }
          timer.innerHTML = timeCheck;
        }, 1000);
      };
      countDown(10);
    }
  }

  // Load Menu & Search
  if (menu !== null) {
    menuScript.menuInit();
    window.onload = () => {
      search.searchInit();
    };
  }

  pageTransitions.buildTransitions();
};

document.addEventListener('DOMContentLoaded', () => {
  vvaves.init();
});
