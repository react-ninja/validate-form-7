import { expect } from 'chai';
import validation, { validateEntity } from '../src/index';

describe('Verify Required Validation', () => {

  it('should return required errorwith validateEntity', () => {
    const resp = validateEntity('', 'required');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field is required.');

    const resp2 = validateEntity('hi Ahsan', 'required');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return required error', () => {
    const data = {
      _id: '5bf56a5fc384b83ef6e11071',
      _phils: '22',
    };
    const config = {
      _id: 'required',
      _phils: { rules: 'required', title: 'Phils'}
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return required error', () => {
    const data = {
      _idr: '5bf56a5fc384b83ef6e11071',
      _phils: '',
    };
    const config = {
      _id: 'required',
      _phils: { rules: 'required', title: 'Phils'}
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(2);
    expect(resp.errorsList[0]).to.equal('The _id field is required.');
    expect(resp.errorsList[1]).to.equal('The Phils field is required.');
  });
});

describe('Verify Field Match Validation', () => {

  it('should not return matches error', () => {
    const data = {
      _id: '5bf56a5fc384b83ef6e11071',
      _idx: '5bf56a5fc384b83ef6e11071',
    };
    const config = {
      _id: { rules: 'required', title: 'ID' },
      _idx: { rules: 'required|matches:_id', title: 'IDX' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return matches error', () => {
    const data = {
      _id: '5bf56a5fc384b83ef6e11071',
      _idx: '5bf56a5fc384b83ef6e11071s',
    };
    const config = {
      _id: { rules: 'required', title: 'ID' },
      _idr: { rules: 'required', title: 'IDR' },
      _idx: { rules: 'required|matches:_idr', title: 'IDX' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(2);
    expect(resp.errorsList[0]).to.equal('The IDR field is required.');
    expect(resp.errorsList[1]).to.equal('The IDX field does not match the IDR field.');
  });
});

describe('Verify Field Differs Validation', () => {
  it('should return differs error', () => {
    const data = {
      _id: '5bf56a5fc384b83ef6e11071',
      _idx: '5bf56a5fc384b83ef6e11071',
    };
    const config = {
      _id: { rules: 'required', title: 'ID' },
      _idx: { rules: 'required|differs:_id', title: 'IDX' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The IDX field must differ from the ID field.');
  });

  it('should not return differs error', () => {
    const data = {
      _id: '5bf56a5fc384b83ef6e11071',
      _idx: '5bf56a5fc384b83ef6e11071s',
    };
    const config = {
      _id: { rules: 'required', title: 'ID' },
      _idx: { rules: 'required|differs:_id', title: 'IDX' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });
});

describe('Verify Field Min Length Validation', () => {
  it('should return minLength error with validateEntity', () => {
    const resp = validateEntity('iuih787878', 'minLength:500');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must be at least 500 characters in length.');
  });

  it('should return minLength error', () => {
    const data = {
      markus: '1234',
    };
    const config = {
      markus: { rules: 'required|minLength:5', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must be at least 5 characters in length.');
  });

  it('should not return minLength error', () => {
    const data = {
      markus: '1234',
    };
    const config = {
      markus: { rules: 'required|minLength:4', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });
});

describe('Verify Field Max Length Validation', () => {
  it('should return maxLength error with validateEntity', () => {
    const resp = validateEntity('iuih787878', 'maxLength:5');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field cannot exceed 5 characters in length.');

    const resp2 = validateEntity('1234', 'maxLength:5');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should return maxLength error', () => {
    const data = {
      markus: '1234',
    };
    const config = {
      markus: { rules: 'required|maxLength:3', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field cannot exceed 3 characters in length.');
  });

  it('should not return maxLength error', () => {
    const data = {
      markus: '1234',
    };
    const config = {
      markus: { rules: 'required|maxLength:4', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });
});

describe('Verify Field Exact Length Validation', () => {
  it('should return exactLength error with validateEntity', () => {
    const resp = validateEntity('iuih787878', 'exactLength:5');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must be exactly 5 characters in length.');

    const resp2 = validateEntity('12345', 'exactLength:5');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should return exactLength error', () => {
    const data = {
      markus: '1234',
    };
    const config = {
      markus: { rules: 'required|exactLength:3', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must be exactly 3 characters in length.');
  });

  it('should not return exactLength error', () => {
    const data = {
      markus: '1234',
    };
    const config = {
      markus: { rules: 'required|exactLength:4', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });
});

describe('Verify Field Value for greaterThan Validation', () => {
  it('should return greaterThan error with validateEntity', () => {
    const resp = validateEntity('7', 'greaterThan:55');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a number greater than 55.');

    const resp2 = validateEntity('50', 'greaterThan:5');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should return greaterThan error', () => {
    const data = {
      markus: 1234,
    };
    const config = {
      markus: { rules: 'required|greaterThan:1235', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a number greater than 1235.');
  });

  it('should not return greaterThan error', () => {
    const data = {
      markus: 1234,
    };
    const config = {
      markus: { rules: 'required|greaterThan:1233', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });
});

describe('Verify Field Value for greaterThanEqualTo Validation', () => {

  it('should return greaterThanEqualTo error with validateEntity', () => {
    const resp = validateEntity('52', 'greaterThanEqualTo:55');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a number greater than or equal to 55.');

    const resp2 = validateEntity('5', 'greaterThanEqualTo:5');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return greaterThanEqualTo error', () => {
    const data = {
      markus: 1234,
      markhor: 1234,
    };
    const config = {
      markus: { rules: 'required|greaterThanEqualTo:1234', title: 'Markus' },
      markus: { rules: 'required|greaterThanEqualTo:1233', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return greaterThanEqualTo error', () => {
    const data = {
      markus: 1234,
    };
    const config = {
      markus: { rules: 'required|greaterThanEqualTo:1235', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a number greater than or equal to 1235.');
  });
});

describe('Verify Field Value for lessThan Validation', () => {
  it('should return lessThan error with validateEntity', () => {
    const resp = validateEntity('57', 'lessThan:55');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a number less than 55.');

    const resp2 = validateEntity('2', 'lessThan:5');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return lessThan error', () => {
    const data = {
      markus: 1234,
    };
    const config = {
      markus: { rules: 'required|lessThan:1235', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return lessThan error', () => {
    const data = {
      markus: 1234,
    };
    const config = {
      markus: { rules: 'required|lessThan:1233', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a number less than 1233.');
  });
});

describe('Verify Field Value for lessThanEqualTo Validation', () => {
  it('should return lessThan error with validateEntity', () => {
    const resp = validateEntity('57', 'lessThanEqualTo:55');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a number less than or equal to 55.');

    const resp2 = validateEntity('5', 'lessThanEqualTo:5');
    expect(resp2.errorsList.length).to.equal(0);
  });


  it('should not return lessThanEqualTo error', () => {
    const data = {
      markus: 1234,
      markhor: 1234,
    };
    const config = {
      markus: { rules: 'required|lessThanEqualTo:1234', title: 'Markus' },
      markus: { rules: 'required|lessThanEqualTo:1235', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return lessThanEqualTo error', () => {
    const data = {
      markus: 1234,
    };
    const config = {
      markus: { rules: 'required|lessThanEqualTo:1233', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a number less than or equal to 1233.');
  });
});

describe('Verify Field Value for inList Validation', () => {
  it('should return inList error with validateEntity', () => {
    const resp = validateEntity('66', 'inList:55,67,88');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must be one of: 55,67,88.');

    const resp2 = validateEntity('5', 'inList:5,9,0');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return inList error', () => {
    const data = {
      markus: 7,
      markhor: 'seven',
    };
    const config = {
      markus: { rules: 'required|inList:1,2,3,4,5,6,7', title: 'Markus' },
      markhor: {
        rules: 'required|inList:one,two,three,four,five,six,seven',
        title: 'Markhor',
      },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return inList error for number format', () => {
    const data = {
      markus: 7,
      markhor: 'seven',
    };
    const config = {
      markus: { rules: 'required|inList:1,2,3,4,5,6,9', title: 'Markus' },
      markhor: {
        rules: 'required|inList:one,two,three,four,five,six,seven',
        title: 'Markhor',
      },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must be one of: 1,2,3,4,5,6,9.');
  });

  it('should return inList error for alpha format', () => {
    const data = {
      markus: 7,
      markhor: 'seven',
    };
    const config = {
      markus: { rules: 'required|inList:1,2,3,4,5,6,7', title: 'Markus' },
      markhor: {
        rules: 'required|inList:one,two,three,four,five,six,nine',
        title: 'Markhor',
      },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
  });

  it('should return inList error for alpha & numeric format', () => {
    const data = {
      markus: 7,
      markhor: 'seven',
    };
    const config = {
      markus: { rules: 'required|inList:1,2,3,4,5,6,9', title: 'Markus' },
      markhor: {
        rules: 'required|inList:one,two,three,four,five,six,nine',
        title: 'Markhor',
      },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(2);
  });
});

describe('Verify Field Value for alphabetic Validation', () => {
  it('should return alpha error with validateEntity', () => {
    const resp = validateEntity('66', 'alpha');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field may only contain alphabetical characters.');

    const resp2 = validateEntity('abc', 'alpha');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for alpha', () => {
    const data = {
      markus: 'sevenTurnMyth',
    };
    const config = {
      markus: { rules: 'required|alpha', title: 'Markhor' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for alpha', () => {
    const data = {
      markus: 'sevenShouldProduceError7',
    };
    const config = {
      markus: { rules: 'required|alpha', title: 'Markhor' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markhor field may only contain alphabetical characters.');
  });

});

describe('Verify Field Value for alphaNumeric Validation', () => {

  it('should return alphaNumeric error with validateEntity', () => {
    const resp = validateEntity('66?', 'alphaNumeric');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field may only contain alpha-numeric characters.');

    const resp2 = validateEntity('abc7788', 'alphaNumeric');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for alphaNumeric', () => {
    const data = {
      markus: 'sevenTurnMyth88',
    };
    const config = {
      markus: { rules: 'required|alphaNumeric', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for alphaNumeric', () => {
    const data = {
      markus: 'QuestionShouldproduceError?',
    };
    const config = {
      markus: { rules: 'required|alphaNumeric', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field may only contain alpha-numeric characters.');
  });

});

describe('Verify Field Value for alphaNumericSpaces Validation', () => {

  it('should return alphaNumericSpaces error with validateEntity', () => {
    const resp = validateEntity('abc 66?', 'alphaNumericSpaces');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field may only contain alpha-numeric characters and spaces.');

    const resp2 = validateEntity('abc 7788', 'alphaNumericSpaces');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for alphaNumericSpaces', () => {
    const data = {
      markus: 'seven Turn Myth 88',
    };
    const config = {
      markus: { rules: 'required|alphaNumericSpaces', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for alphaNumericSpaces', () => {
    const data = {
      markus: 'Question Should produce Error ?',
    };
    const config = {
      markus: { rules: 'required|alphaNumericSpaces', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field may only contain alpha-numeric characters and spaces.');
  });

});

describe('Verify Field Value for alphaDash Validation', () => {

  it('should return alphaDash error with validateEntity', () => {
    const resp = validateEntity('abc 66 ?', 'alphaDash');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field may only contain alpha-numeric characters, underscores, and dashes.');

    const resp2 = validateEntity('abc-7788', 'alphaDash');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for alphaDash', () => {
    const data = {
      markus: 'abc-def-333_444_ghi',
    };
    const config = {
      markus: { rules: 'required|alphaDash', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for alphaDash', () => {
    const data = {
      markus: 'abc-def-333_444_ghi?',
    };
    const config = {
      markus: { rules: 'required|alphaDash', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field may only contain alpha-numeric characters, underscores, and dashes.');
  });

});



describe('Verify Field Value for numeric Validation', () => {

  it('should return numeric error with validateEntity', () => {
    const resp = validateEntity('abc 66 ?', 'numeric');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain only numbers.');

    const resp2 = validateEntity('7788', 'numeric');
    expect(resp2.errorsList.length).to.equal(0);
  });


  it('should not return any error for numeric', () => {
    const data = {
      markus: '12345',
    };
    const config = {
      markus: { rules: 'required|numeric', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for numeric', () => {
    const data = {
      markus: '12345a',
    };
    const config = {
      markus: { rules: 'required|numeric', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain only numbers.');
  });

});

describe('Verify Field Value for integer Validation', () => {

  it('should return integer error with validateEntity', () => {
    const resp = validateEntity('12345a', 'integer');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain an integer.');

    const resp2 = validateEntity(7788, 'integer');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for integer', () => {
    const data = {
      markus: 12345,
    };
    const config = {
      markus: { rules: 'required|integer', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for numeric', () => {
    const data = {
      markus: '12345a',
    };
    const config = {
      markus: { rules: 'required|integer', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain an integer.');
  });

});

describe('Verify Field Value for decimal Validation', () => {

  it('should return integer error with validateEntity', () => {
    const resp = validateEntity('12345.9', 'decimal');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a decimal number.');

    const resp2 = validateEntity(7788.3, 'decimal');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for decimal', () => {
    const data = {
      markus: 12345.9,
    };
    const config = {
      markus: { rules: 'required|decimal', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for decimal', () => {
    const data = {
      markus: 12345,
    };
    const config = {
      markus: { rules: 'required|decimal', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a decimal number.');
  });

});

describe('Verify Field Value for validUrl Validation', () => {

  it('should return integer error with validUrl', () => {
    const resp = validateEntity('url', 'validUrl');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a valid URL.');

    const resp2 = validateEntity('http://google.com', 'validUrl');
    expect(resp2.errorsList.length).to.equal(0);
  });


  it('should return integer error with validateEntity', () => {
    const resp = validateEntity('website', 'integer');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain an integer.');

    const resp2 = validateEntity(7788.0, 'integer');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for validUrl', () => {
    const data = {
      markus: 'www.msn.us',
    };
    const config = {
      markus: { rules: 'required|validUrl', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for validUrl', () => {
    const data = {
      markus: 'http://google',
    };
    const config = {
      markus: { rules: 'required|validUrl', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a valid URL.');
  });

});


describe('Verify Field Value for validEmail Validation', () => {

  it('should return integer error with validEmail', () => {
    const resp = validateEntity('email', 'validEmail');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a valid email address.');

    const resp2 = validateEntity('ahsan@gmail.com', 'validEmail');
    expect(resp2.errorsList.length).to.equal(0);
  });

  it('should not return any error for validEmail', () => {
    const data = {
      markus: 'bb@msn.com',
    };
    const config = {
      markus: { rules: 'required|validEmail', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for validEmail', () => {
    const data = {
      markus: 'bb@msn',
    };
    const config = {
      markus: { rules: 'required|validEmail', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a valid email address.');
  });

});

describe('Verify Field Value for validIP Validation', () => {

  it('should return integer error with validIP', () => {
    const resp = validateEntity('ip', 'validIP');
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The field must contain a valid IP.');

    const resp2 = validateEntity('0.255.23.44', 'validIP');
    expect(resp2.errorsList.length).to.equal(0);
  });


  it('should not return any error for validIP', () => {
    const data = {
      markus: '0.255.23.44',
    };
    const config = {
      markus: { rules: 'required|validIP', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(0);
  });

  it('should return error for validIP', () => {
    const data = {
      markus: '988656756545354',
    };
    const config = {
      markus: { rules: 'required|validIP', title: 'Markus' },
    };
    const resp = validation(data, config);
    expect(resp.errorsList.length).to.equal(1);
    expect(resp.errorsList[0]).to.equal('The Markus field must contain a valid IP.');
  });

});

// describe('Verify Field Value for validBase64 Validation', () => {
//
//   it('should not return any error for validBase64', () => {
//     const data = {
//       markus: 'RGFuJ3MgVG9vbHMgYXJlIGNvb2wh',
//     };
//     const config = {
//       markus: { rules: 'required|validBase64', title: 'Markus' },
//     };
//     const resp = validation(data, config);
//     expect(resp.errorsList.length).to.equal(0);
//   });
//
//   it('should return error for validBase64', () => {
//     const data = {
//       markus: 'RGFuJ3MgVG9vbHMgYXJlIGNvb2wh',
//     };
//     const config = {
//       markus: { rules: 'required|validBase64', title: 'Markus' },
//     };
//     const resp = validation(data, config);
//     expect(resp.errorsList.length).to.equal(1);
//   });
//
// });
