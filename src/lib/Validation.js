import _ from 'lodash';
import AttrValidation from './AttrValidation';

class Validator {
  data = [];
  errors = {};
  config = {};
  schemaProperties = {};

  setData = (data) => {
    this.data = data;
  };

  setConfig = (config) => {
    this.config = config;
  };

  run = () => {
    if (this.config) {
      _.map(this.config, (config, key) => {
        if (_.isObject(config)) {
          const { title, rules } = config;
        }
        const title =
          _.isObject(config) && config.title && config.title !== ''
            ? config.title
            : key;

        let rules = null;
        if (_.isObject(config) && config.rules && config.rules !== '') {
          rules = config.rules;
        } else {
          if (_.isString(config)) {
            rules = config;
          }
        }
        if (rules) {
          const attrValidation = new AttrValidation();
          attrValidation.setData(this.data[key]);
          attrValidation.setPayloadData(this.data);
          attrValidation.setRule(rules);
          attrValidation.setTitle(title);
          attrValidation.validateAttribute();
          if (attrValidation.errors.length) {
            this.errors[key] = attrValidation.errors;
          }
        }
      });
    }
  };

  getErrorsList = () => {
    let errors = [];
    _.map(this.errors, (val) => {
      errors = _.union(errors, val);
    });
    return errors;
  };

  getReport = () => {
    return {
      errorsList: this.getErrorsList(),
      errors: this.errors,
      count: this.errors.length,
      data: this.data,
      config: this.config,
    };
  };
}

export const validate = (data, config) => {
  const validator = new Validator();
  validator.setData(data);
  validator.setConfig(config);
  validator.run();

  return validator.getReport();
};
