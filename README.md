# Calculator

This is a simple static calculator made with vanilla JS, plain CSS and HTML.

---

## Features

<img src="https://i.ibb.co/0DQHtgD/ezgif-3-2f86c3f200ae.gif">

It has all the features of a regular non-scientific calculator - brackets, division, multiplication, addition, subtraction and decimals, as well as `DEL` and `AC`.

It is responsive and optimised for touch-device users. Touch-device users are not allowed to type into the textarea as it can be quite distracting if they want to use the buttons instead. Non-touch-device users are allowed to type.

The `=` button is used to get the result of a calculation. Non-touch-device users can also press `Enter`. If the result is successful, the textarea would blink green, otherwise red.

---

## How it Works

First of all, the input is autocorrected and the brackets solved. Regexes are used to calculate the result. For each of the operators, in order of BIDMAS, a regex search is made. For each of the matches found for the operator regex, the numbers are extracted and calculated. In the input string, the match is replaced with the calculation of the numbers.

*Note: The regex for a decimal, negative, or scientific notation number is longer than `\d+`. `\d+` has been used just for explanation. It will only work for whole numbers.*
