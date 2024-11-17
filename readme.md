# jsresult.js 
  <br>
A JavaScript utility that provides Result and Option types inspired by Rust, enabling safer error handling and value checking without exceptions.

## Features
Result Type: Encapsulates successful (Ok) and failed (Err) computations.
Option Type: Represents a value that can be present (Some) or absent (None).
Automatic Error Handling: wrapWithResult function wraps your functions to automatically handle errors and exceptional values.
Value Existence Checking: wrapWithOption function wraps your functions to handle undefined and null values gracefully.
Installation
Since this package is not published on npm, you can clone it directly from GitHub:

```bash
git clone https://github.com/yourusername/jsresult.git
```
Include the jsresult.js file in your project.

## Usage
Importing
```javascript
import { Result, Option, wrapWithResult, wrapWithOption } from './jsresult.js';
```

## Examples
Using wrapWithResult
The wrapWithResult function allows you to wrap your existing functions to automatically handle errors and exceptional cases. It converts your function's return value into a Result object.

Note: wrapWithResult treats almost all exceptional cases as errors, including undefined, null, NaN, Infinity, and -Infinity. Be cautious when using it, as normal values that fall into these categories will be considered errors.

Example:

```javascript
import { wrapWithResult } from './jsresult.js';

// Original business logic function
function divide(a, b) {
  return a / b; // Simple division
}

// Wrap the function to handle errors automatically
const safeDivide = wrapWithResult(divide);

const result1 = safeDivide(10, 2); // Result.Ok(5)
const result2 = safeDivide(10, 0); // Result.Err('Function returned Infinity or -Infinity')
const result3 = safeDivide(0, 0);  // Result.Err('Function returned NaN')
const result4 = safeDivide(undefined, 2); // Result.Err('Function returned NaN')

console.log(result1.isOk() ? `Success: ${result1.unwrap()}` : `Error: ${result1.error.message}`);
// Output: Success: 5

console.log(result2.isOk() ? `Success: ${result2.unwrap()}` : `Error: ${result2.error.message}`);
// Output: Error: Function returned Infinity or -Infinity

console.log(result3.isOk() ? `Success: ${result3.unwrap()}` : `Error: ${result3.error.message}`);
// Output: Error: Function returned NaN

console.log(result4.isOk() ? `Success: ${result4.unwrap()}` : `Error: ${result4.error.message}`);
// Output: Error: Function returned NaN
```
Using wrapWithOption
The wrapWithOption function wraps your functions to handle undefined and null values gracefully by converting them into Option.None.

Example:

```javascript
import { wrapWithOption } from './jsresult.js';

// Original function to get a property from an object
function getProperty(obj, key) {
  return obj[key];
}

// Wrap the function to handle undefined and null values
const safeGetProperty = wrapWithOption(getProperty);

const obj = { a: 42, b: null };

const option1 = safeGetProperty(obj, 'a'); // Option.Some(42)
const option2 = safeGetProperty(obj, 'b'); // Option.None
const option3 = safeGetProperty(obj, 'c'); // Option.None

console.log(option1.isSome() ? `Value: ${option1.unwrap()}` : 'No value');
// Output: Value: 42

console.log(option2.isSome() ? `Value: ${option2.unwrap()}` : 'No value');
// Output: No value

console.log(option3.isSome() ? `Value: ${option3.unwrap()}` : 'No value');
// Output: No value
```
Handling Results and Options
Both Result and Option types come with utility methods to help you handle the values:

isOk(), isErr() for Result
isSome(), isNone() for Option
unwrap() to get the value or throw an error if not present
unwrapOr(defaultValue) to get the value or a default
map() and andThen() for chaining operations
Example with Chaining:

```javascript
import { Result } from './jsresult.js';

const result = Result.Ok(10)
  .map(value => value * 2)          // Result.Ok(20)
  .andThen(value => value > 15 ? Result.Ok(value - 5) : Result.Err('Value too small')); // Result.Ok(15)

console.log(result.isOk() ? `Final Value: ${result.unwrap()}` : `Error: ${result.error}`);
// Output: Final Value: 15
```
**Important Notes**
Caution with wrapWithResult
Exception Handling: wrapWithResult treats undefined, null, NaN, Infinity, and -Infinity as errors. If your function might return these values intentionally, consider handling them before wrapping or using wrapWithOption instead.
Error Propagation: Any exceptions thrown within your function will be caught and converted into a Result.Err.
When to Use Option vs Result
Use Option when you are only concerned with the presence or absence of a value.
Use Result when you need to handle errors and success values explicitly, especially when dealing with computations that might fail.
Including in HTML
If you prefer to use jsresult.js directly in an HTML file, you can include it using a <script> tag:

```html
<!DOCTYPE html>
<html>
<head>
  <title>jsresult Example</title>
</head>
<body>
  <script type="module">
    import { wrapWithResult } from './jsresult.js';

    function divide(a, b) {
      return a / b;
    }

    const safeDivide = wrapWithResult(divide);

    const result = safeDivide(10, 0);

    if (result.isOk()) {
      console.log(`Success: ${result.unwrap()}`);
    } else {
      console.error(`Error: ${result.error.message}`);
    }
  </script>
</body>
</html>
```
Ensure that jsresult.js is in the same directory or adjust the path accordingly.

Cloning and Using the Project
Since the project is hosted on GitHub, you can clone it and include it in your project:

```bash
코드 복사
git clone https://github.com/yourusername/jsresult.git
```
Include jsresult.js in your project files and import it as shown in the examples.

## Conclusion
jsresult.js provides a way to handle errors and optional values in JavaScript functions elegantly, inspired by Rust's Result and Option types. By wrapping your functions, you can focus on business logic while jsresult.js handles error checking and value existence.

Happy coding!