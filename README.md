# Calculator
This is a simple static calculator made with vanilla JS, plain CSS and HTML.

## Features
<img src="https://i.ibb.co/0DQHtgD/ezgif-3-2f86c3f200ae.gif">

It has all the features of a regular non-scientific calculator - brackets, division, multiplication, addition, subtraction and decimals, as well as `DEL` and `AC`.

It is responsive and optimised for touch-device users. They can only change the cursor position and input using the buttons in the calculator. Non-touch-device users on the other hand can type freely.

The `=` button is used to get the result of a calculation. Non-touch-device users can also press `Enter`. If the result is successful, the input area would blink green. If otherwise, it would blink red.

## Architecture
A textarea is used for receiving input. It listens to the `onkeydown` event to check if the user presses `Enter`. If so, the result is shown.

Buttons are used to append to the caret position in the textarea, except for the `DEL` and `AC` keys.

Regexes are used for calculation. There is a regex for each operator and an `operate` function. For every match of the operator's regex, the numbers found in the match are passed into the operate function using the spread operator.

## Styling
It uses grid-template-areas to arrange the buttons and the textarea. The background uses linear-gradient. The buttons have a hover effect which is disabled on touch devices because of sticky hover effects.
