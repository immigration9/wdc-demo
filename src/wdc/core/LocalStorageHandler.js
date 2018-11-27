"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearStorage = exports.removeFromStorage = exports.saveToStorage = exports.loadFromStorage = void 0;

var loadFromStorage = function loadFromStorage(key) {
  if (isStorageAvailable('localStorage')) {
    return localStorage.getItem(key);
  } else {
    storageError();
  }
};

exports.loadFromStorage = loadFromStorage;

var saveToStorage = function saveToStorage(key, value) {
  if (isStorageAvailable('localStorage')) {
    return localStorage.setItem(key, value);
  } else {
    storageError();
  }
};

exports.saveToStorage = saveToStorage;

var removeFromStorage = function removeFromStorage(key) {
  if (isStorageAvailable('localStorage')) {
    return localStorage.removeItem(key);
  } else {
    storageError();
  }
};

exports.removeFromStorage = removeFromStorage;

var clearStorage = function clearStorage() {
  if (isStorageAvailable('localStorage')) {
    return localStorage.clear();
  } else {
    storageError();
  }
};

exports.clearStorage = clearStorage;

function storageError() {
  throw new Error("\n      You are currently using an outdated version of this browser.\n      localStorage only works with modern browsers which supports HTML5 standards.\n      Please use another browser, such as Chrome or Firefox.\n    ");
}
/**
 * Function to detect whether if localStorage is available for that specific browser.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */


function isStorageAvailable(type) {
  var storage;

  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    if (e instanceof ReferenceError) {
      return true;
    } else {
      return e instanceof DOMException && ( // everything except Firefox
      e.code === 22 || // Firefox
      e.code === 1014 || // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' || // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
    }
  }
}