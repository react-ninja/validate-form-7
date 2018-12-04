'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AttrValidation = require('./AttrValidation');

var _AttrValidation2 = _interopRequireDefault(_AttrValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function Validator() {
  var _this = this;

  _classCallCheck(this, Validator);

  this.data = [];
  this.errors = {};
  this.config = {};
  this.schemaProperties = {};

  this.setData = function (data) {
    _this.data = data;
  };

  this.setConfig = function (config) {
    _this.config = config;
  };

  this.run = function () {
    if (_this.config) {
      _lodash2.default.map(_this.config, function (config, key) {
        if (_lodash2.default.isObject(config)) {
          var _title = config.title,
              _rules = config.rules;
        }
        var title = _lodash2.default.isObject(config) && config.title && config.title !== '' ? config.title : key;

        var rules = null;
        if (_lodash2.default.isObject(config) && config.rules && config.rules !== '') {
          rules = config.rules;
        } else {
          if (_lodash2.default.isString(config)) {
            rules = config;
          }
        }
        if (rules) {
          var attrValidation = new _AttrValidation2.default();
          attrValidation.setData(_this.data[key]);
          attrValidation.setPayloadData(_this.data);
          attrValidation.setRule(rules);
          attrValidation.setTitle(title);
          attrValidation.validateAttribute();
          if (attrValidation.errors.length) {
            _this.errors[key] = attrValidation.errors;
          }
        }
      });
    }
  };

  this.getErrorsList = function () {
    var errors = [];
    _lodash2.default.map(_this.errors, function (val) {
      errors = _lodash2.default.union(errors, val);
    });
    return errors;
  };

  this.getReport = function () {
    return {
      errorsList: _this.getErrorsList(),
      errors: _this.errors,
      count: _this.errors.length,
      data: _this.data,
      config: _this.config
    };
  };
};

var validate = exports.validate = function validate(data, config) {
  var validator = new Validator();
  validator.setData(data);
  validator.setConfig(config);
  validator.run();

  return validator.getReport();
};