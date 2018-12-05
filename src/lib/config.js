export const FIELD_SHORTCODE = ':attribute';
export const FIELD_SHORTCODE_2 = ':attribute0';
export const CONFIG = {
  REQUIRED: { name: 'required', msg: `The ${FIELD_SHORTCODE} field is required.` },
  MATCHES: { name: 'matches', msg: `The ${FIELD_SHORTCODE} field does not match the ${FIELD_SHORTCODE_2} field.` },
  DIFFERS: { name: 'differs', msg: `The ${FIELD_SHORTCODE} field must differ from the ${FIELD_SHORTCODE_2} field.` },
  MIN_LENGTH: { name: 'minLength', msg: `The ${FIELD_SHORTCODE} field must be at least ${FIELD_SHORTCODE_2} characters in length.` },
  MAX_LENGTH: { name: 'maxLength', msg: `The ${FIELD_SHORTCODE} field cannot exceed ${FIELD_SHORTCODE_2} characters in length.` },
  EXACT_LENGTH: {
    name: 'exactLength',
    msg: `The ${FIELD_SHORTCODE} field must be exactly ${FIELD_SHORTCODE_2} characters in length.`,
  },
  GREATER_THAN: {
    name: 'greaterThan',
    msg: `The ${FIELD_SHORTCODE} field must contain a number greater than ${FIELD_SHORTCODE_2}.`,
  },
  GREATER_THAN_EQUAL_TO: {
    name: 'greaterThanEqualTo',
    msg: `The ${FIELD_SHORTCODE} field must contain a number greater than or equal to ${FIELD_SHORTCODE_2}.`,
  },
  LESS_THAN: { name: 'lessThan', msg: `The ${FIELD_SHORTCODE} field must contain a number less than ${FIELD_SHORTCODE_2}.` },
  LESS_THAN_EQUAL_TO: {
    name: 'lessThanEqualTo',
    msg: `The ${FIELD_SHORTCODE} field must contain a number less than or equal to ${FIELD_SHORTCODE_2}.`,
  },
  IN_LIST: { name: 'inList', msg: `The ${FIELD_SHORTCODE} field must be one of: ${FIELD_SHORTCODE_2}.` },
  ALPHA: { name: 'alpha', msg: `The ${FIELD_SHORTCODE} field may only contain alphabetical characters.` },
  ALPHA_NUMERIC: {
    name: 'alphaNumeric',
    msg: `The ${FIELD_SHORTCODE} field may only contain alpha-numeric characters.`,
  },
  ALPHA_NUMERIC_SPACES: {
    name: 'alphaNumericSpaces',
    msg: `The ${FIELD_SHORTCODE} field may only contain alpha-numeric characters and spaces.`,
  },
  ALPHA_DASH: { name: 'alphaDash', msg: `The ${FIELD_SHORTCODE} field may only contain alpha-numeric characters, underscores, and dashes.` },
  NUMERIC: { name: 'numeric', msg: `The ${FIELD_SHORTCODE} field must contain only numbers.` },
  INTEGER: { name: 'integer', msg: `The ${FIELD_SHORTCODE} field must contain an integer.` },
  DECIMAL: { name: 'decimal', msg: `The ${FIELD_SHORTCODE} field must contain a decimal number.` },
  VALID_URL: { name: 'validUrl', msg: `The ${FIELD_SHORTCODE} field must contain a valid URL.` },
  VALID_EMAIL: {
    name: 'validEmail',
    msg: `The ${FIELD_SHORTCODE} field must contain a valid email address.`,
  },
  VALID_IP: { name: 'validIP', msg: `The ${FIELD_SHORTCODE} field must contain a valid IP.` },
  VALID_BASE_64: {
    name: 'validBase64',
    msg: `The ${FIELD_SHORTCODE} field must contain a valid Base64 format.`,
  },
};
