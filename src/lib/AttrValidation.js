import _ from 'lodash';
import { FIELD_SHORTCODE, FIELD_SHORTCODE_2, CONFIG } from './config.js';
class AttributeValidation {
  errors = [];
  /**
    Returns FALSE if the form element is empty.
  */
  isRequired = () => {
    this.logValidation('isRequired');
    if (!(typeof this.data !== 'undefined' && _.trim(_.toString(this.data)).length > 0)) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element does not match the one in the parameter.
    Format: matches[form_item]
  */
  isMatches = (fieldKey) => {
    if (
      fieldKey &&
      (_.isUndefined(this.payloadData[fieldKey]) ||
        this.payloadData[fieldKey] !== this.data)
    ) {
      let fieldName = '';
      if(this.payloadConfig[fieldKey]){
        fieldName = this.payloadConfig[fieldKey].title || fieldKey;
      }
      this.setErrorMessage(this.ruleName, this.title, fieldName);
    }
  };

  /**
    Returns FALSE if the form element does not differ from the one in the parameter.
    Format: differs[form_item]
  */
  isDiffers = (fieldKey) => {
    if (
      fieldKey &&
      (_.isUndefined(this.payloadData[fieldKey]) ||
        this.payloadData[fieldKey] === this.data)
    ) {
      let fieldName = '';
      if(this.payloadConfig[fieldKey]){
        fieldName = this.payloadConfig[fieldKey].title || fieldKey;
      }
      this.setErrorMessage(this.ruleName, this.title, fieldName);
    }
  };

  /**
    Returns FALSE if the form element is shorter than the parameter value.
    Format: min_length[3]
  */
  isMinLength = (minLength) => {
    const length = parseInt(minLength);
    if (!(_.toString(this.data).length >= length)) {
      this.setErrorMessage(this.ruleName, this.title, minLength);
    }
  };

  /**
    Returns FALSE if the form element is longer than the parameter value.
    Format: max_length[12]
  */
  isMaxLength = (maxLength) => {
    const length = parseInt(maxLength);
    if (!(_.toString(this.data).length <= length)) {
      this.setErrorMessage(this.ruleName, this.title, maxLength);
    }
  };

  /**
    Returns FALSE if the form element is not exactly the parameter value.
    Format: exact_length[8]
  */
  isExactLength = (exactLength) => {
    const length = parseInt(exactLength);
    if (!(_.toString(this.data).length === length)) {
      this.setErrorMessage(this.ruleName, this.title, exactLength);
    }
  };
  /**
    Returns FALSE if the form element is less than or equal to the parameter
    value or not numeric.
    Format: greaterThan[8]
  */
  isGreaterThan = (value) => {
    if (!(_.isNumber(this.data) && this.data > parseInt(value))) {
      this.setErrorMessage(this.ruleName, this.title, value);
    }
  };

  /**
    Returns FALSE if the form element is less than the parameter value, or not numeric.
    Format: greaterThan_equalTo[8]
  */
  isGreaterThanEqualTo = (value) => {
    if (!(_.isNumber(this.data) && this.data >= parseInt(value))) {
      this.setErrorMessage(this.ruleName, this.title, value);
    }
  };

  /**
    Returns FALSE if the form element is greater than or equal to the parameter value or not numeric.
    Format: lessThan[8]
  */
  isLessThan = (value) => {
    if (!(_.isNumber(this.data) && this.data < parseInt(value))) {
      this.setErrorMessage(this.ruleName, this.title, value);
    }
  };

  /**
    Returns FALSE if the form element is greater than the parameter value, or not numeric.
    Format: lessThan_equalTo[8]
  */
  isLessThanEqualTo = (value) => {
    if (!(_.isNumber(this.data) && this.data <= parseInt(value))) {
      this.setErrorMessage(this.ruleName, this.title, value);
    }
  };

  /**
    Returns FALSE if the form element is not within a predetermined list.
    in_list[red,blue,green]
  */
  isInList = (items) => {
    let values = _.split(items, ',');
    if (_.isNumber(this.data)) {
      _.map(values, (val, key) => {
        values[key] = _.toNumber(val);
      });
      values = _.compact(values);
    }
    if (!_.includes(values, this.data)) {
      this.setErrorMessage(this.ruleName, this.title, items);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than alphabetical characters.
  */
  isAlpha = () => {
    const regEx = /^\s*([a-zA-Z]+)\s*$/i;
    const isValid = regEx.test(this.data);
    if (!isValid) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than alpha-numeric characters.
  */
  isAlphaNumeric = () => {
    const regEx = /^\s*([0-9a-zA-Z]+)\s*$/i;
    const isValid = regEx.test(this.data);
    if (!isValid) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element contains anything other than alpha-numeric
     characters or spaces. Should be used after trim to avoid spaces
     at the beginning or end.
  */
  isAlphaNumericSpaces = () => {
    const regEx = /^\s*([0-9a-zA-Z\s]+)\s*$/i;
    const isValid = regEx.test(this.data);
    if (!isValid) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than alpha-numeric characters, underscores or dashes.
  */
  isAlphaDash = () => {
    const regEx = /^\s*([0-9a-zA-Z-_]+)\s*$/i;
    const isValid = regEx.test(this.data);
    if (!isValid) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than numeric characters.
  */
  isNumeric = () => {
    const data = _.toNumber(this.data);
    if (_.isNaN(data)) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than an integer.
  */
  isInteger = () => {
    if (!_.isInteger(this.data)) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than a decimal number.
  */
  isDecimal = () => {
    if (!(_.isNumber(this.data) && this.data !== Math.floor(this.data))) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element does not contain a valid URL.
  */
  isValidURL = () => {
    const regexp = /((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/;
    if (!(this.data.indexOf(' ') < 0 && regexp.test(this.data))) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the form element does not contain a valid email address.
  */
  isValidEmail = () => {
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(this.data)) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
  Returns FALSE if the supplied IP address is not valid. Accepts an
  optional parameter of ‘ipv4’ or ‘ipv6’ to specify an IP format.
  */
  isValidIP = () => {
    const regexp = /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/;
    if (!regexp.test(this.data)) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  /**
    Returns FALSE if the supplied string contains anything other
    than valid Base64 characters.
  */
  isValidBase64 = () => {
    const regexp = /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    if (!regexp.test(this.data)) {
      this.setErrorMessage(this.ruleName, this.title);
    }
  };

  logValidation = (str) => {
    // console.log('logValidation::::', str);
  };

  setData = (data) => {
    this.data = data;
  };

  setPayloadData = (data) => {
    this.payloadData = data;
  };

  setPayloadConfig = (config) => {
    this.payloadConfig = config;
  };

  setRule = (rules) => {
    this.rules = _.split(rules, '|');
  };

  setTitle = (title) => {
    this.title = title;
  };

  setErrorMessage = (rule, title = '', attribute = '') => {
    const config = _.find(CONFIG, (val) => rule === val.name);
    if (config) {
      let msg = _.replace(config.msg, FIELD_SHORTCODE, title);
      msg = _.replace(msg, FIELD_SHORTCODE_2, attribute);
      this.errors.push(msg);
    }
  };

  validateAttribute = () => {
    _.map(this.rules, (rule) => {
      let isValid = true;
      const config = _.split(rule, ':');
      this.ruleName = config[0];
      const val = config[1] || null;
      switch (this.ruleName) {
        case CONFIG.REQUIRED.name:
          isValid = this.isRequired();
          break;

        case CONFIG.MATCHES.name:
          isValid = this.isMatches(val);
          break;

        case CONFIG.DIFFERS.name:
          isValid = this.isDiffers(val);
          break;

        case CONFIG.MIN_LENGTH.name:
          isValid = this.isMinLength(val);
          break;

        case CONFIG.MAX_LENGTH.name:
          isValid = this.isMaxLength(val);
          break;

        case CONFIG.EXACT_LENGTH.name:
          isValid = this.isExactLength(val);
          break;

        case CONFIG.GREATER_THAN.name:
          isValid = this.isGreaterThan(val);
          break;

        case CONFIG.GREATER_THAN_EQUAL_TO.name:
          isValid = this.isGreaterThanEqualTo(val);
          break;

        case CONFIG.LESS_THAN.name:
          isValid = this.isLessThan(val);
          break;

        case CONFIG.LESS_THAN_EQUAL_TO.name:
          isValid = this.isLessThanEqualTo(val);
          break;

        case CONFIG.IN_LIST.name:
          isValid = this.isInList(val);
          break;

        case CONFIG.ALPHA.name:
          isValid = this.isAlpha();
          break;

        case CONFIG.ALPHA_NUMERIC.name:
          isValid = this.isAlphaNumeric();
          break;

        case CONFIG.ALPHA_NUMERIC_SPACES.name:
          isValid = this.isAlphaNumericSpaces();
          break;

        case CONFIG.ALPHA_DASH.name:
          isValid = this.isAlphaDash();
          break;

        case CONFIG.NUMERIC.name:
          isValid = this.isNumeric();
          break;

        case CONFIG.INTEGER.name:
          isValid = this.isInteger();
          break;

        case CONFIG.DECIMAL.name:
          isValid = this.isDecimal();
          break;

        case CONFIG.VALID_URL.name:
          isValid = this.isValidURL();
          break;

        case CONFIG.VALID_EMAIL.name:
          isValid = this.isValidEmail();
          break;

        case CONFIG.VALID_IP.name:
          isValid = this.isValidIP();
          break;

        case CONFIG.VALID_BASE_64.name:
          isValid = this.isValidBase64();
          break;
        default:
          isValid = true;
      }
    });
  };
}

export default AttributeValidation;
