import _ from 'lodash';
import { FIELD_SHORTCODE, CONFIG } from './config.js';
class AttributeValidation {
  errors = [];
  /**
    Returns FALSE if the form element is empty.
  */
  isRequired = () => {
    this.logValidation('isRequired');
    if (typeof this.data === 'undefined') {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element does not match the one in the parameter.
    Format: matches[form_item]
  */
  isMatches = () => {
    const matchKey = this.details;
    if (
      matchKey &&
      (_.isUndefined(this.payloadData[matchKey]) ||
        this.payloadData[matchKey] !== this.data)
    ) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element does not differ from the one in the parameter.
    Format: differs[form_item]
  */
  isDiffers = () => {
    const matchKey = this.details;
    if (
      matchKey &&
      (_.isUndefined(this.payloadData[matchKey]) ||
        this.payloadData[matchKey] === this.data)
    ) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element is shorter than the parameter value.
    Format: min_length[3]
  */
  isMinLength = () => {
    const length = parseInt(this.details);
    if (!(_.isString(this.data) && this.data.length >= length)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element is longer than the parameter value.
    Format: max_length[12]
  */
  isMaxLength = () => {
    const length = parseInt(this.details);
    if (!(_.isString(this.data) && this.data.length <= length)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element is not exactly the parameter value.
    Format: exact_length[8]
  */
  isExactLength = () => {
    const length = parseInt(this.details);
    if (!(_.isString(this.data) && this.data.length === length)) {
      this.setErrorMessage(this.ruleName);
    }
  };
  /**
    Returns FALSE if the form element is less than or equal to the parameter
    value or not numeric.
    Format: greaterThan[8]
  */
  isGreaterThan = () => {
    const value = parseInt(this.details);
    if (!(_.isNumber(this.data) && this.data > value)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element is less than the parameter value, or not numeric.
    Format: greaterThan_equalTo[8]
  */
  isGreaterThanEqualTo = () => {
    const value = parseInt(this.details);
    if (!(_.isNumber(this.data) && this.data >= value)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element is greater than or equal to the parameter value or not numeric.
    Format: lessThan[8]
  */
  isLessThan = () => {
    const value = parseInt(this.details);
    if (!(_.isNumber(this.data) && this.data < value)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element is greater than the parameter value, or not numeric.
    Format: lessThan_equalTo[8]
  */
  isLessThanEqualTo = () => {
    const value = parseInt(this.details);
    if (!(_.isNumber(this.data) && this.data <= value)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element is not within a predetermined list.
    in_list[red,blue,green]
  */
  isInList = () => {
    let values = _.split(this.details, ',');
    if (_.isNumber(this.data)) {
      _.map(values, (val, key) => {
        values[key] = _.toNumber(val);
      });
      values = _.compact(values);
    }
    if (!_.includes(values, this.data)) {
      this.setErrorMessage(this.ruleName);
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
      this.setErrorMessage(this.ruleName);
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
      this.setErrorMessage(this.ruleName);
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
      this.setErrorMessage(this.ruleName);
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
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than numeric characters.
  */
  isNumeric = () => {
    const data = _.toNumber(this.data);
    if (_.isNaN(data)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than an integer.
  */
  isInteger = () => {
    if (!_.isInteger(this.data)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element contains anything other
    than a decimal number.
  */
  isDecimal = () => {
    if (!(_.isNumber(this.data) && this.data !== Math.floor(this.data))) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element does not contain a valid URL.
  */
  isValidURL = () => {
    const regexp = /((http|https):\/\/)?[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2}/;
    if (!(this.data.indexOf(' ') < 0 && regexp.test(this.data))) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the form element does not contain a valid email address.
  */
  isValidEmail = () => {
    const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regexp.test(this.data)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
  Returns FALSE if the supplied IP address is not valid. Accepts an
  optional parameter of ‘ipv4’ or ‘ipv6’ to specify an IP format.
  */
  isValidIP = () => {
    const regexp = /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/;
    if (!regexp.test(this.data)) {
      this.setErrorMessage(this.ruleName);
    }
  };

  /**
    Returns FALSE if the supplied string contains anything other
    than valid Base64 characters.
  */
  isValidBase64 = () => {
    const regexp = /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    if (!regexp.test(this.data)) {
      this.setErrorMessage(this.ruleName);
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

  setRule = (rules) => {
    this.rules = _.split(rules, '|');
  };

  setTitle = (title) => {
    this.title = title;
  };

  setErrorMessage = (rule) => {
    const config = _.find(CONFIG, (val) => rule === val.name);
    if (config) {
      const msg = _.replace(config.msg, FIELD_SHORTCODE, this.title);
      this.errors.push(msg);
    }
  };

  validateAttribute = () => {
    _.map(this.rules, (rule) => {
      let isValid = true;
      const config = _.split(rule, ':');
      this.ruleName = config[0];
      this.details = config[1] || null;
      switch (this.ruleName) {
        case CONFIG.REQUIRED.name:
          isValid = this.isRequired();
          break;

        case CONFIG.MATCHES.name:
          isValid = this.isMatches();
          break;

        case CONFIG.DIFFERS.name:
          isValid = this.isDiffers();
          break;

        case CONFIG.MIN_LENGTH.name:
          isValid = this.isMinLength();
          break;

        case CONFIG.MAX_LENGTH.name:
          isValid = this.isMaxLength();
          break;

        case CONFIG.EXACT_LENGTH.name:
          isValid = this.isExactLength();
          break;

        case CONFIG.GREATER_THAN.name:
          isValid = this.isGreaterThan();
          break;

        case CONFIG.GREATER_THAN_EQUAL_TO.name:
          isValid = this.isGreaterThanEqualTo();
          break;

        case CONFIG.LESS_THAN.name:
          isValid = this.isLessThan();
          break;

        case CONFIG.LESS_THAN_EQUAL_TO.name:
          isValid = this.isLessThanEqualTo();
          break;

        case CONFIG.IN_LIST.name:
          isValid = this.isInList();
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
