/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */

/**
 * Parse Json
 *
 * @param array searchData
 * @param string searchText
 *
 * @return array searchReturnData
 */
export function parseJson(searchData, searchText) {
  const searchReturnData = [];

  // Check variable inputs
  if (searchData == null
    || searchData.length === 0
    || searchText == null) {
    return false;
  }

  for (let x = 0; x < searchData.length; x++) {
    if (searchData[x].title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    || searchData[x].tags.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    || searchData[x].content.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
      searchReturnData.push([searchData[x].title, searchData[x].link, searchData[x].excerpt]);
    }
  }
  return searchReturnData;
}

/**
 * Reset Search Results
 */
export function resetSearchResults() {
  const innerMenuContainer = document.getElementById('inner-menu-container');
  const searchBox = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (innerMenuContainer !== null) {
    innerMenuContainer.classList.remove('search-active');
  }

  if (searchBox !== null) {
    searchBox.value = '';
  }

  if (searchResults !== null) {
    searchResults.classList.remove('show-results');
    setTimeout(() => {
      searchResults.innerHTML = '';
    }, 200);
  }
}

/**
 * Conduct Search
 *
 * @param array searchData
 * @param string searchText
 *
 * @return searchReturn
 */
export function conductSearch(searchData, searchText) {
  let searchReturn = '';

  // Check variable inputs
  if (searchData == null
    || searchData.length === 0
    || searchText == null) {
    return false;
  }

  if (searchText !== '') {
    const searchResponse = parseJson(searchData, searchText);
    if (searchResponse.length > 0) {
      for (let x = 0; x < searchResponse.length; x++) {
        searchReturn += `<li><a href="${searchResponse[x][1]}">${searchResponse[x][0]}</a><span class="result-excerpt">${searchResponse[x][2]}</span></li>`;
      }
    } else {
      searchReturn = '<li id="no-results">Nothing found.</li>';
    }
  } else {
    resetSearchResults();
  }
  return searchReturn;
}

/**
 * Search Init
 */
exports.searchInit = function searchInit() {
  const request = new XMLHttpRequest();

  request.onreadystatechange = () => {
    if (request.status >= 200 && request.status < 400) {
      let searching = false;
      let searchResponse = null;
      let searchReturn = null;
      const searchResults = document.getElementById('search-results');
      const innerMenuContainer = document.getElementById('inner-menu-container');
      const searchBox = document.getElementById('search-input');
      const searchContainer = document.getElementById('search-container');
      const searchJsonData = JSON.parse(request.responseText);

      // Instant searh keybinding
      searchContainer.addEventListener('keyup', () => {
        innerMenuContainer.classList.add('search-active');
        searchBox.classList.add('loading');

        if (searching === false) {
          searching = true;
        } else {
          window.clearTimeout(searchResponse);
        }

        searchResponse = setTimeout(() => {
          searchReturn = conductSearch(searchJsonData, searchBox.value);
          searchResults.innerHTML = `<ul>${searchReturn}</ul>`;
          setTimeout(() => {
            searchResults.classList.add('show-results');
          }, 50);
          searching = false;
        }, 500);
      });
    }
  };

  request.open('GET', '/feed.json', true);
  request.send();
};
