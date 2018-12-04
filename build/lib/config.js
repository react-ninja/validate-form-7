'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var FIELD_SHORTCODE = exports.FIELD_SHORTCODE = '<FIELD_TITLE>';
var CONFIG = exports.CONFIG = {
  REQUIRED: { name: 'required', msg: FIELD_SHORTCODE + ' should be required' },
  MATCHES: { name: 'matches', msg: FIELD_SHORTCODE + ' should be matches' },
  DIFFERS: { name: 'differs', msg: FIELD_SHORTCODE + ' should be differs' },
  MIN_LENGTH: { name: 'minLength', msg: FIELD_SHORTCODE + ' should be minLength' },
  MAX_LENGTH: { name: 'maxLength', msg: FIELD_SHORTCODE + ' should be maxLength' },
  EXACT_LENGTH: {
    name: 'exactLength',
    msg: FIELD_SHORTCODE + ' should be exactLength'
  },
  GREATER_THAN: {
    name: 'greaterThan',
    msg: FIELD_SHORTCODE + ' should be greaterThan'
  },
  GREATER_THAN_EQUAL_TO: {
    name: 'greaterThanEqualTo',
    msg: FIELD_SHORTCODE + ' should be greaterThanEqualTo'
  },
  LESS_THAN: { name: 'lessThan', msg: FIELD_SHORTCODE + ' should be lessThan' },
  LESS_THAN_EQUAL_TO: {
    name: 'lessThanEqualTo',
    msg: FIELD_SHORTCODE + ' should be lessThanEqualTo'
  },
  IN_LIST: { name: 'inList', msg: FIELD_SHORTCODE + ' should be inList' },
  ALPHA: { name: 'alpha', msg: FIELD_SHORTCODE + ' should be alpha' },
  ALPHA_NUMERIC: {
    name: 'alphaNumeric',
    msg: FIELD_SHORTCODE + ' should be alphaNumeric'
  },
  ALPHA_NUMERIC_SPACES: {
    name: 'alphaNumericSpaces',
    msg: FIELD_SHORTCODE + ' should be alphaNumericSpaces'
  },
  ALPHA_DASH: { name: 'alphaDash', msg: FIELD_SHORTCODE + ' should be alphaDash' },
  NUMERIC: { name: 'numeric', msg: FIELD_SHORTCODE + ' should be numeric' },
  INTEGER: { name: 'integer', msg: FIELD_SHORTCODE + ' should be integer' },
  DECIMAL: { name: 'decimal', msg: FIELD_SHORTCODE + ' should be decimal' },
  VALID_URL: { name: 'validUrl', msg: FIELD_SHORTCODE + ' should be validUrl' },
  VALID_EMAIL: {
    name: 'validEmail',
    msg: FIELD_SHORTCODE + ' should be validEmail'
  },
  VALID_IP: { name: 'validIP', msg: FIELD_SHORTCODE + ' should be validIP' },
  VALID_BASE_64: {
    name: 'validBase64',
    msg: FIELD_SHORTCODE + ' should be validBase64'
  }
};