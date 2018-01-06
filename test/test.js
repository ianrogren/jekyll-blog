/* jshint esversion: 6 */
/* eslint-disable global-require */
/* global describe it */

/**
 * Search Tests
 */
const assert = require('chai').assert;
const search = require('../webpack/javascript/search');
const about = require('../webpack/javascript/about');

const searchJson = [
  {
    title: 'Test title',
    content: 'Test content',
    link: 'Test link',
    date: '2017-08-14 10:24:32 -0700',
    excerpt: 'Test excerpt',
    tags: 'Test',
  },
];

const searchArray = [
  'Test title',
  'Test link',
  'Test excerpt',
];

describe('Parse JSON', () => {
  describe('parseJson without variables.', () => {
    it('should return false', () => {
      assert.equal(search.parseJson(), false);
    });
  });

  describe('parseJson with JSON but no search text.', () => {
    it('should return false.', () => {
      assert.equal(search.parseJson(searchJson), false);
    });
  });

  describe('parseJson with search text but no JSON.', () => {
    it('should return false.', () => {
      assert.equal(search.parseJson('test'), false);
    });
  });

  describe('parseJson with valid variables with results.', () => {
    const test = search.parseJson(searchJson, 'Test');
    it('should return an array.', () => {
      assert.typeOf(test, 'array');
    });
    it('should have an array length of three', () => {
      assert.lengthOf(test[0], 3);
    });
    it('should have an array length of three', () => {
      assert.equal(test[0], searchArray);
    });
  });

  describe('parseJson with valid variables and no results.', () => {
    const test = search.parseJson(searchJson, 'aaaaaa');
    it('should return an array', () => {
      assert.typeOf(test, 'array');
    });
    it('should be an empty array', () => {
      assert.lengthOf(test, 0);
    });
  });
});


describe('Conduct Search', () => {
  describe('conductSearch without variables.', () => {
    it('should return false', () => {
      assert.equal(search.conductSearch(), false);
    });
  });

  describe('conductSearch with JSON but no search text.', () => {
    it('should return false', () => {
      assert.equal(search.conductSearch(searchJson), false);
    });
  });

  describe('conductSearch with search text but no JSON.', () => {
    it('should return false', () => {
      assert.equal(search.conductSearch('test'), false);
    });
  });

  describe('conductSearch with valid inputs but no results.', () => {
    const test = search.conductSearch(searchJson, 'aaaaaa');
    it('should return a string of markup', () => {
      assert.typeOf(test, 'string');
    });
    it('should be equal to <li id="no-results">Nothing found.</li>', () => {
      assert.equal(test, '<li id="no-results">Nothing found.</li>');
    });
  });

  describe('conductSearch with valid inputs with results.', () => {
    const test = search.conductSearch(searchJson, 'aaaaaa');
    it('should return a string of markup', () => {
      assert.typeOf(test, 'string');
    });
    it('should be equal to <li id="no-results">Nothing found.</li>', () => {
      assert.equal(test, '<li id="no-results">Nothing found.</li>');
    });
  });
});
