/* jshint esversion: 6 */
/* eslint-env browser */

import { resetSearchResults } from './search';

/**
 * Menu Init
 */
exports.menuInit = function menuInit() {
  const closeButton = document.getElementById('close-button');
  const footerContainer = document.getElementById('footer-inner-container');
  const innerMenuContainer = document.getElementById('inner-menu-container');
  const navContainer = document.getElementById('nav-container');
  const navToggle = document.getElementById('nav-toggle');
  const menuContainer = document.getElementById('menu-container');
  const menuLinks = document.getElementById('menu-links');
  const menuOverlay = document.getElementById('menu-overlay');
  const outterContainer = document.getElementById('outter-container');
  const searchBox = document.getElementById('search-box');
  const searchButton = document.getElementById('search-menu-button');
  const searchContainer = document.getElementById('search-container');
  const searchCloseButton = document.getElementById('search-close-button');
  const searchResults = document.getElementById('search-results');

  function hideSearch() {
    searchContainer.classList.add('loading');
    menuLinks.classList.remove('hidden');
    searchResults.classList.remove('show-results');
    setTimeout(() => {
      searchContainer.classList.add('hidden');
      menuLinks.classList.remove('search-open');
      innerMenuContainer.classList.remove('search-active');
      resetSearchResults();
    }, 200);
  }

  function showSearch() {
    menuLinks.classList.add('search-open');
    setTimeout(() => {
      searchContainer.classList.remove('hidden');
      menuLinks.classList.add('hidden');
    }, 450);
    setTimeout(() => {
      searchContainer.classList.remove('loading');
    }, 500);
  }

  function showOverlay() {
    menuOverlay.classList.add('show');
    setTimeout(() => {
      menuOverlay.classList.add('menu-open');
    }, 100);
  }

  function hideOverlay() {
    menuContainer.classList.remove('open');
    menuOverlay.classList.remove('menu-open');
    navToggle.classList.remove('menu-open');
    navContainer.classList.remove('menu-open');
    footerContainer.classList.remove('menu-open');
    if (outterContainer !== null) {
      outterContainer.classList.remove('menu-open');
    }
    setTimeout(() => {
      menuOverlay.classList.remove('show');
      if (searchContainer !== null) {
        resetSearchResults();
        hideSearch();
        if (searchBox !== null) {
          searchBox.onblur();
        }
      }
    }, 900);
  }

  navToggle.addEventListener('click', () => {
    if (navToggle.classList.contains('menu-open')) {
      hideOverlay();
    } else {
      menuContainer.classList.toggle('open');
      navContainer.classList.toggle('menu-open');
      footerContainer.classList.toggle('menu-open');
      navToggle.classList.toggle('menu-open');
      showOverlay();
      if (outterContainer !== null) {
        outterContainer.classList.toggle('menu-open');
      }
    }
  }, false);

  searchButton.addEventListener('click', () => {
    showSearch();
  });

  searchCloseButton.addEventListener('click', () => {
    hideSearch();
  });

  closeButton.addEventListener('click', () => {
    hideOverlay();
  });

  menuOverlay.addEventListener('click', () => {
    hideOverlay();
  }, false);
};
