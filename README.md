Validate Form 7 provides a comprehensive data validation that helps minimize the amount of code you’ll write.


#### Example
```
const data = {
      _id: '5bf56a5fc384b83ef6e11071',
      _idx: '5bf56a5fc384b83ef6e11071',
    };
const config = {
      _id: { rules: 'required', title: 'ID' },
      _idx: { rules: 'required|matches:_id', title: 'IDX' },
    };
const resp = validation(data, config);
```

### Config Reference

|Attribute|Required|Description|Example|
|--- |--- |--- |--- |
|**rules**|Yes|You can set as many validation rules as you need for a given field in rules attribute |rules: 'required|minLength:4'|
|**title**|No|A “human” name for this field, which will be inserted into the error message. For example, if your field is named “user” you might give it a human name of “Username”.|title: 'FIELD NAME'|




### Validation Response

##### errors
``Default Value: Empty Object {}``
errors attribute provides the object of invalid field(s) and each field contains the error message(s).
##### errorsList
``Default Value: Empty Array []``
errorsList attribute provides the array of error messages of all invalid field(s).


|Attribute|Required|Description|Example|
|--- |--- |--- |--- |
|**rules**|Yes|You can set as many validation rules as you need for a given field in rules attribute. Validation rules, as a string list separated by a pipe \"\|" |rules: 'required|minLength:4'|
|**title**|No|A “human” name for this field, which will be inserted into the error message. For example, if your field is named “user” you might give it a human name of “Username”.|title: 'FIELD NAME'|


##### Example
```
const data = {
      ryan: 'this is ryan',
      markhor: 'this is markhor',
      markus: 'this is markus',
    };
    const config = {
      ryan: { rules: 'required|minLength:4', title: 'Ryan' },
      markhor: { rules: 'required|minLength:40', title: 'Markhor' },
      markus: { rules: 'required|maxLength:4', title: 'Markus' },
    };
    const resp = validation(data, config);
    console.log(resp);
```
##### Response

```
{
  errorsList:
   [
    'The Markhor field must be at least 40 characters in length.',
    'The Markus field cannot exceed 4 characters in length.'
    ],
  errors:
   {
     markhor: [ 'The Markhor field must be at least 40 characters in length.' ],
     markus: [ 'The Markus field cannot exceed 4 characters in length.' ],
   }
}
```



### Rule Reference
The following is a list of all the native rules that are available to use:

|Rule|Parameter|Description|Example|
|--- |--- |--- |--- |
|**required**|No|Returns FALSE if the form element is empty.||
|**matches**|Yes|Returns FALSE if the form element does not match the one in the parameter.|matches:form_item|
|**differs**|Yes|Returns FALSE if the form element does not differ from the one in the parameter.|differs:form_item|
|**minLength**|Yes|Returns FALSE if the form element is shorter than the parameter value.|minLength:3|
|**maxLength**|Yes|Returns FALSE if the form element is longer than the parameter value.|maxLength:12|
|**exactLength**|Yes|Returns FALSE if the form element is not exactly the parameter value.|exactLength:8|
|**greaterThan**|Yes|Returns FALSE if the form element is less than or equal to the parameter value or not numeric.|greaterThan:8|
|**greaterThanEqualTo**|Yes|Returns FALSE if the form element is less than the parameter value, or not numeric.|greaterThanEqualTo:8|
|**lessThan**|Yes|Returns FALSE if the form element is greater than or equal to the parameter value or not numeric.|lessThan:8|
|**lessThanEqualTo**|Yes|Returns FALSE if the form element is greater than the parameter value, or not numeric.|lessThanEqualTo:8|
|**inList**|Yes|Returns FALSE if the form element is not within a predetermined list.|inList:red,blue,green|
|**alpha**|No|Returns FALSE if the form element contains anything other than alphabetical characters.||
|**alphaNumeric**|No|Returns FALSE if the form element contains anything other than alpha-numeric characters.||
|**alphaNumericSpaces**|No|Returns FALSE if the form element contains anything other than alpha-numeric characters or spaces. Should be used after trim to avoid spaces at the beginning or end.||
|**alphaDash**|No|Returns FALSE if the form element contains anything other than alpha-numeric characters, underscores or dashes.||
|**numeric**|No|Returns FALSE if the form element contains anything other than numeric characters.||
|**integer**|No|Returns FALSE if the form element contains anything other than an integer.||
|**decimal**|No|Returns FALSE if the form element contains anything other than a decimal number.||
|**validUrl**|No|Returns FALSE if the form element does not contain a valid URL.||
|**validEmail**|No|Returns FALSE if the form element does not contain a valid email address.||
|**validIP**|Yes|Returns FALSE if the supplied IP address is not valid. Accepts an optional parameter of ‘ipv4’ to specify an IP format.||
