'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _config = require('./config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttributeValidation = function AttributeValidation() {
  var _this = this;

  _classCallCheck(this, AttributeValidation);

  this.errors = [];

  this.isRequired = function () {
    _this.logValidation('isRequired');
    if (!(typeof _this.data !== 'undefined' && _lodash2.default.trim(_lodash2.default.toString(_this.data)).length > 0)) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isMatches = function (fieldKey) {
    if (fieldKey && (_lodash2.default.isUndefined(_this.payloadData[fieldKey]) || _this.payloadData[fieldKey] !== _this.data)) {
      var fieldName = '';
      if (_this.payloadConfig[fieldKey]) {
        fieldName = _this.payloadConfig[fieldKey].title || fieldKey;
      }
      _this.setErrorMessage(_this.ruleName, _this.title, fieldName);
    }
  };

  this.isDiffers = function (fieldKey) {
    if (fieldKey && (_lodash2.default.isUndefined(_this.payloadData[fieldKey]) || _this.payloadData[fieldKey] === _this.data)) {
      var fieldName = '';
      if (_this.payloadConfig[fieldKey]) {
        fieldName = _this.payloadConfig[fieldKey].title || fieldKey;
      }
      _this.setErrorMessage(_this.ruleName, _this.title, fieldName);
    }
  };

  this.isMinLength = function (minLength) {
    var length = parseInt(minLength);
    if (!(_lodash2.default.toString(_this.data).length >= length)) {
      _this.setErrorMessage(_this.ruleName, _this.title, minLength);
    }
  };

  this.isMaxLength = function (maxLength) {
    var length = parseInt(maxLength);
    if (!(_lodash2.default.toString(_this.data).length <= length)) {
      _this.setErrorMessage(_this.ruleName, _this.title, maxLength);
    }
  };

  this.isExactLength = function (exactLength) {
    var length = parseInt(exactLength);
    if (!(_lodash2.default.toString(_this.data).length === length)) {
      _this.setErrorMessage(_this.ruleName, _this.title, exactLength);
    }
  };

  this.isGreaterThan = function (value) {
    if (!(_this.data && _lodash2.default.toNumber(_this.data) > parseInt(value))) {
      _this.setErrorMessage(_this.ruleName, _this.title, value);
    }
  };

  this.isGreaterThanEqualTo = function (value) {
    if (!(_this.data && _lodash2.default.toNumber(_this.data) >= parseInt(value))) {
      _this.setErrorMessage(_this.ruleName, _this.title, value);
    }
  };

  this.isLessThan = function (value) {
    if (!(_this.data && _lodash2.default.toNumber(_this.data) < parseInt(value))) {
      _this.setErrorMessage(_this.ruleName, _this.title, value);
    }
  };

  this.isLessThanEqualTo = function (value) {
    if (!(_this.data && _lodash2.default.toNumber(_this.data) <= parseInt(value))) {
      _this.setErrorMessage(_this.ruleName, _this.title, value);
    }
  };

  this.isInList = function (items) {
    var values = _lodash2.default.split(items, ',');
    if (_lodash2.default.isNumber(_this.data)) {
      _lodash2.default.map(values, function (val, key) {
        values[key] = _lodash2.default.toNumber(val);
      });
      values = _lodash2.default.compact(values);
    }
    if (!_lodash2.default.includes(values, _this.data)) {
      _this.setErrorMessage(_this.ruleName, _this.title, items);
    }
  };

  this.isAlpha = function () {
    var regEx = /^\s*([a-zA-Z]+)\s*$/i;
    var isValid = regEx.test(_this.data);
    if (!isValid) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isAlphaNumeric = function () {
    var regEx = /^\s*([0-9a-zA-Z]+)\s*$/i;
    var isValid = regEx.test(_this.data);
    if (!isValid) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isAlphaNumericSpaces = function () {
    var regEx = /^\s*([0-9a-zA-Z\s]+)\s*$/i;
    var isValid = regEx.test(_this.data);
    if (!isValid) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isAlphaDash = function () {
    var regEx = /^\s*([0-9a-zA-Z-_]+)\s*$/i;
    var isValid = regEx.test(_this.data);
    if (!isValid) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isNumeric = function () {
    var data = _lodash2.default.toNumber(_this.data);
    if (_lodash2.default.isNaN(data)) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isInteger = function () {
    if (!_lodash2.default.isInteger(_this.data)) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isDecimal = function () {
    if (!(_lodash2.default.isNumber(_this.data) && _this.data !== Math.floor(_this.data))) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isValidURL = function () {
    var regexp = /((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/;
    if (!(_this.data.indexOf(' ') < 0 && regexp.test(_this.data))) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isValidEmail = function () {
    var regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(_this.data)) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isValidIP = function () {
    var regexp = /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/;
    if (!regexp.test(_this.data)) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.isValidBase64 = function () {
    var regexp = /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    if (!regexp.test(_this.data)) {
      _this.setErrorMessage(_this.ruleName, _this.title);
    }
  };

  this.logValidation = function (str) {
    // console.log('logValidation::::', str);
  };

  this.setData = function (data) {
    _this.data = data;
  };

  this.setPayloadData = function (data) {
    _this.payloadData = data;
  };

  this.setPayloadConfig = function (config) {
    _this.payloadConfig = config;
  };

  this.setRule = function (rules) {
    _this.rules = _lodash2.default.split(rules, '|');
  };

  this.setTitle = function (title) {
    _this.title = title;
  };

  this.setErrorMessage = function (rule) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var attribute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var config = _lodash2.default.find(_config.CONFIG, function (val) {
      return rule === val.name;
    });
    if (config) {
      var msg = _lodash2.default.replace(config.msg, _config.FIELD_SHORTCODE, title);
      msg = _lodash2.default.replace(msg, _config.FIELD_SHORTCODE_2, attribute);
      msg = _lodash2.default.replace(msg, '  ', '');
      _this.errors.push(msg);
    }
  };

  this.validateAttribute = function () {
    _lodash2.default.map(_this.rules, function (rule) {
      var isValid = true;
      var config = _lodash2.default.split(rule, ':');
      _this.ruleName = config[0];
      var val = config[1] || null;
      switch (_this.ruleName) {
        case _config.CONFIG.REQUIRED.name:
          isValid = _this.isRequired();
          break;

        case _config.CONFIG.MATCHES.name:
          isValid = _this.isMatches(val);
          break;

        case _config.CONFIG.DIFFERS.name:
          isValid = _this.isDiffers(val);
          break;

        case _config.CONFIG.MIN_LENGTH.name:
          isValid = _this.isMinLength(val);
          break;

        case _config.CONFIG.MAX_LENGTH.name:
          isValid = _this.isMaxLength(val);
          break;

        case _config.CONFIG.EXACT_LENGTH.name:
          isValid = _this.isExactLength(val);
          break;

        case _config.CONFIG.GREATER_THAN.name:
          isValid = _this.isGreaterThan(val);
          break;

        case _config.CONFIG.GREATER_THAN_EQUAL_TO.name:
          isValid = _this.isGreaterThanEqualTo(val);
          break;

        case _config.CONFIG.LESS_THAN.name:
          isValid = _this.isLessThan(val);
          break;

        case _config.CONFIG.LESS_THAN_EQUAL_TO.name:
          isValid = _this.isLessThanEqualTo(val);
          break;

        case _config.CONFIG.IN_LIST.name:
          isValid = _this.isInList(val);
          break;

        case _config.CONFIG.ALPHA.name:
          isValid = _this.isAlpha();
          break;

        case _config.CONFIG.ALPHA_NUMERIC.name:
          isValid = _this.isAlphaNumeric();
          break;

        case _config.CONFIG.ALPHA_NUMERIC_SPACES.name:
          isValid = _this.isAlphaNumericSpaces();
          break;

        case _config.CONFIG.ALPHA_DASH.name:
          isValid = _this.isAlphaDash();
          break;

        case _config.CONFIG.NUMERIC.name:
          isValid = _this.isNumeric();
          break;

        case _config.CONFIG.INTEGER.name:
          isValid = _this.isInteger();
          break;

        case _config.CONFIG.DECIMAL.name:
          isValid = _this.isDecimal();
          break;

        case _config.CONFIG.VALID_URL.name:
          isValid = _this.isValidURL();
          break;

        case _config.CONFIG.VALID_EMAIL.name:
          isValid = _this.isValidEmail();
          break;

        case _config.CONFIG.VALID_IP.name:
          isValid = _this.isValidIP();
          break;

        case _config.CONFIG.VALID_BASE_64.name:
          isValid = _this.isValidBase64();
          break;
        default:
          isValid = true;
      }
    });
  };
}
/**
  Returns FALSE if the form element is empty.
*/


/**
  Returns FALSE if the form element does not match the one in the parameter.
  Format: matches[form_item]
*/


/**
  Returns FALSE if the form element does not differ from the one in the parameter.
  Format: differs[form_item]
*/


/**
  Returns FALSE if the form element is shorter than the parameter value.
  Format: min_length[3]
*/


/**
  Returns FALSE if the form element is longer than the parameter value.
  Format: max_length[12]
*/


/**
  Returns FALSE if the form element is not exactly the parameter value.
  Format: exact_length[8]
*/

/**
  Returns FALSE if the form element is less than or equal to the parameter
  value or not numeric.
  Format: greaterThan[8]
*/


/**
  Returns FALSE if the form element is less than the parameter value, or not numeric.
  Format: greaterThan_equalTo[8]
*/


/**
  Returns FALSE if the form element is greater than or equal to the parameter value or not numeric.
  Format: lessThan[8]
*/


/**
  Returns FALSE if the form element is greater than the parameter value, or not numeric.
  Format: lessThan_equalTo[8]
*/


/**
  Returns FALSE if the form element is not within a predetermined list.
  in_list[red,blue,green]
*/


/**
  Returns FALSE if the form element contains anything other
  than alphabetical characters.
*/


/**
  Returns FALSE if the form element contains anything other
  than alpha-numeric characters.
*/


/**
  Returns FALSE if the form element contains anything other than alpha-numeric
   characters or spaces. Should be used after trim to avoid spaces
   at the beginning or end.
*/


/**
  Returns FALSE if the form element contains anything other
  than alpha-numeric characters, underscores or dashes.
*/


/**
  Returns FALSE if the form element contains anything other
  than numeric characters.
*/


/**
  Returns FALSE if the form element contains anything other
  than an integer.
*/


/**
  Returns FALSE if the form element contains anything other
  than a decimal number.
*/


/**
  Returns FALSE if the form element does not contain a valid URL.
*/


/**
  Returns FALSE if the form element does not contain a valid email address.
*/


/**
Returns FALSE if the supplied IP address is not valid. Accepts an
optional parameter of ‘ipv4’ or ‘ipv6’ to specify an IP format.
*/


/**
  Returns FALSE if the supplied string contains anything other
  than valid Base64 characters.
*/
;

exports.default = AttributeValidation;