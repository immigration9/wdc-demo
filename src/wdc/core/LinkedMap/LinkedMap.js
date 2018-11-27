"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Enumer = _interopRequireWildcard(require("./Enumer"));

var _LinkedEntry = _interopRequireDefault(require("./LinkedEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_CAPACITY = 101;
var DEFAULT_LOAD_FACTOR = 0.75;
var MODE = {
  FORCE_FIRST: 0,
  FORCE_LAST: 1,
  FIRST: 2,
  LAST: 3
};

var LinkedMap = function LinkedMap(initCapacity, loadFactor) {
  var _this = this;

  _classCallCheck(this, LinkedMap);

  _defineProperty(this, "hash", function (key) {
    return Math.abs(key);
  });

  _defineProperty(this, "keyType", function (t) {
    if (t === 'string') {
      _this.hash = function (str) {
        var hash = 0;
        if (str === null || str.length === 0) return hash;

        for (var i = 0; i < str.length; i++) {
          var char = str.charAtCode(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
        }

        return Math.abs(hash);
      };
    } else {
      _this.hash = function (key) {
        return Math.abs(key);
      };
    }

    return _this;
  });

  _defineProperty(this, "keys", function () {
    return new _Enumer.default(_this, _Enumer.TYPE.KEYS);
  });

  _defineProperty(this, "values", function () {
    return new _Enumer.default(_this, _Enumer.TYPE.VALUES);
  });

  _defineProperty(this, "entries", function () {
    return new _Enumer.default(_this, _Enumer.TYPE.ENTRIES);
  });

  _defineProperty(this, "isEmpty", function () {
    return _this.size() === 0;
  });

  _defineProperty(this, "isFull", function () {
    return _this.max > 0 && _this.max <= _this.count;
  });

  _defineProperty(this, "put", function (key, value) {
    return _this._put(key, value, MODE.LAST);
  });

  _defineProperty(this, "putLast", function (key, value) {
    return _this._put(key, value, MODE.FORCE_LAST);
  });

  _defineProperty(this, "putFirst", function (key, value) {
    return _this._put(key, value, MODE.FORCE_FIRST);
  });

  _defineProperty(this, "putAll", function (other) {
    if (other === null) {
      return null;
    }

    var it = other.entries();

    while (it.hasMoreElements()) {
      var e = it.nextElement();

      _this.put(e.getKey(), e.getValue());
    }
  });

  _defineProperty(this, "_put", function (key, value, m, noover) {
    if (noover && _this.max > 0 && _this.size() > _this.max) {
      return null;
    }

    var tab = _this.table;
    var index = _this.hash(key) % tab.length;

    for (var _e = tab[index]; _e !== null && typeof _e !== 'undefined'; _e = _e.next) {
      if (_e.key === key) {
        var old = _e.value;
        _e.value = value;

        switch (m) {
          case MODE.FORCE_FIRST:
            if (_this.header.link_next !== _e) {
              _this.unchain(_e);

              _this.chain(_this.header, _this.header.link_next, _e);
            }

            break;

          case MODE.FORCE_LAST:
            if (_this.header.link_prev !== _e) {
              _this.unchain(_e);

              _this.chain(_this.header.link_prev, _this.header, _e);
            }

            break;
        }

        return old;
      }
    }

    if (_this.max > 0) {
      switch (m) {
        case MODE.FORCE_FIRST:
        case MODE.FIRST:
          while (_this.count >= _this.max) {
            var k = _this.header.link_prev.key;

            var v = _this.remove(k);

            _this.overflowed(k, v);
          }

          break;

        case MODE.FORCE_LAST:
        case MODE.LAST:
          while (_this.count >= _this.max) {
            var _k = _this.header.link_next.key;

            var _v = _this.remove(_k);

            _this.overflowed(_k, _v);
          }

          break;
      }
    }

    if (_this.count >= _this.threshold) {
      _this.rehash();

      tab = _this.table;
      index = _this.hash(key) % tab.length;
    }

    var e = _this.createLinkedEntry(key, value, tab[index]);

    tab[index] = e;

    switch (m) {
      case MODE.FORCE_FIRST:
      case MODE.FIRST:
        _this.chain(_this.header, _this.header.link_next, e);

        break;

      case MODE.FORCE_LAST:
      case MODE.LAST:
        _this.chain(_this.header.link_prev, _this.header, e);

        break;
    }

    _this.count++;
    return null;
  });

  _defineProperty(this, "overflowed", function (key, value) {});

  _defineProperty(this, "chain", function (link_prev, link_next, e) {
    e.link_prev = link_prev;
    e.link_next = link_next;
    link_prev.link_next = e;
    link_next.link_prev = e;
  });

  _defineProperty(this, "unchain", function (e) {
    e.link_prev.link_next = e.link_next;
    e.link_next.link_prev = e.link_prev;
    e.link_prev = null;
    e.link_next = null;
  });

  _defineProperty(this, "intern", function (key) {
    if (!key) return;
    return _this._intern(key.toString(), MODE.LAST);
  });

  _defineProperty(this, "_intern", function (key, m) {
    if (!key) return;
    var tab = _this.table;
    var index = _this.hash(key) % tab.length;

    for (var _e2 = tab[index]; _e2 !== null && typeof _e2 !== 'undefined'; _e2 = _e2.next) {
      if (_e2.key === key) {
        var old = _e2.value;

        switch (m) {
          case MODE.FORCE_FIRST:
            if (_this.header.link_next !== _e2) {
              _this.unchain(_e2);

              _this.chain(_this.header, _this.header.link_next, _e2);
            }

            break;

          case MODE.FORCE_LAST:
            if (_this.header.link_prev !== _e2) {
              _this.unchain(_e2);

              _this.chain(_this.header.link_prev, _this.header, _e2);
            }

            break;
        }

        return old;
      }
    }

    var value = _this.create(key);

    if (value === null) {
      return null;
    }

    if (_this.max > 0) {
      switch (m) {
        case MODE.FORCE_FIRST:
        case MODE.FIRST:
          while (_this.count >= _this.max) {
            var k = _this.header.link_prev.key;

            var v = _this.remove(k);

            _this.overflowed(k, v);
          }

          break;

        case MODE.FORCE_LAST:
        case MODE.LAST:
          while (_this.count >= _this.max) {
            var _k2 = _this.header.link_next.key;

            var _v2 = _this.remove(_k2);

            _this.overflowed(_k2, _v2);
          }

          break;
      }
    }

    if (_this.count >= _this.threshold) {
      _this.rehash();

      tab = _this.table;
      index = _this.hash(key) % tab.length;
    }

    var e = _this.createLinkedEntry(key, value, tab[index]);

    tab[index] = e;

    switch (m) {
      case MODE.FORCE_FIRST:
      case MODE.FIRST:
        _this.chain(_this.header, _this.header.link_next, e);

        break;

      case MODE.FORCE_LAST:
      case MODE.LAST:
        _this.chain(_this.header.link_prev, _this.header, e);

        break;
    }

    _this.count++;
    return value;
  });

  _defineProperty(this, "remove", function (key) {
    if (key === null) {
      return null;
    }

    var tab = _this.table;
    var index = _this.hash(key) % tab.length;

    for (var e = tab[index], prev = null; e !== null && typeof e !== 'undefined'; prev = e, e = e.next) {
      if (e.key === key) {
        if (prev !== null) {
          prev.next = e.next;
        } else {
          tab[index] = e.next;
        }

        _this.count--;
        var oldValue = e.value;
        e.value = null;

        _this.unchain(e);

        return oldValue;
      }
    }

    return null;
  });

  _defineProperty(this, "removeFirst", function () {
    if (_this.isEmpty()) {
      return null;
    }

    return _this.remove(_this.header.link_next.key);
  });

  _defineProperty(this, "removeLast", function () {
    if (_this.isEmpty()) {
      return null;
    }

    return _this.remove(_this.header.link_prev.key);
  });

  _defineProperty(this, "clear", function () {
    _this.table = _this.table.map(function (tb) {
      return null;
    });
    _this.header.link_next = _this.header.link_prev = _this.header;
    _this.count = 0;
  });

  _defineProperty(this, "sort", function (f) {
    if (_this.size() <= 1) {
      return _this;
    }

    var ent = [];

    var it = _this.entries();

    for (var i = 0; it.hasMoreElements(); i++) {
      ent[i] = it.nextElement();
    }

    _this.clear();

    ent.sort(f);
    var len = ent.length;

    for (var _i = 0; _i < len; _i++) {
      _this.put(ent[_i].key, ent[_i].value);
    }
  });

  _defineProperty(this, "setMax", function (max) {
    _this.max = max;
    return _this;
  });

  _defineProperty(this, "containsKey", function (key) {
    if (key === null) {
      return false;
    }

    var tab = _this.table;
    var index = _this.hash(key) % tab.length;

    for (var e = tab[index]; e !== null && typeof e !== 'undefined'; e = e.next) {
      if (e.key === key) {
        return true;
      }
    }

    return false;
  });

  _defineProperty(this, "get", function (key) {
    if (key === null) {
      return null;
    }

    var tab = _this.table;
    var index = _this.hash(key) % tab.length;

    for (var e = tab[index]; e !== null && typeof e !== 'undefined'; e = e.next) {
      if (e.key === key) {
        return e.value;
      }
    }

    return null;
  });

  _defineProperty(this, "getFirstKey", function () {
    if (_this.isEmpty()) {
      return null;
    }

    return _this.header.link_next.key;
  });

  _defineProperty(this, "getLastKey", function () {
    if (_this.isEmpty()) {
      return null;
    }

    return _this.header.link_prev.key;
  });

  _defineProperty(this, "getLastValue", function () {
    if (_this.isEmpty()) {
      return null;
    }

    return _this.header.link_prev.value;
  });

  _defineProperty(this, "rehash", function () {});

  _defineProperty(this, "getEnumer", function (map, type) {
    return new _Enumer.default(map, type);
  });

  _defineProperty(this, "createLinkedEntry", function (key, value, next) {
    return new _LinkedEntry.default(key, value, next);
  });

  _defineProperty(this, "toString", function () {
    var str = '';

    var it = _this.entries();

    str += '{';

    for (var i = 0; it.hasMoreElements(); i++) {
      var e = it.nextElement();

      if (i > 0) {
        str += ", ";
      }

      str += "".concat(e.getKey(), "=").concat(e.getValue());
    }

    str += '}';
    return str;
  });

  this.initCapacity = initCapacity || DEFAULT_CAPACITY;
  this.loadFactor = loadFactor || DEFAULT_LOAD_FACTOR;
  this.threshold = parseInt(this.initCapacity * this.loadFactor);
  this.table = new Array(this.initCapacity);
  this.header = this.createLinkedEntry(null, null, null);
  this.header.link_next = this.header.link_prev = this.header;
  this.count = 0;
  this.max = 0;
};

var _default = LinkedMap;
exports.default = _default;