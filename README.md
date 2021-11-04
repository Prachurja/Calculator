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

The `Operator` class has a regex and an `operate` method. The `operate` method takes in an input string and finds all regex matches for the `Operator`. For each of the regex matches, all the numbers are taken and passed into the `solve` method from by the class parameters. In the input string, the regex match is replaced with the result we got from the `solve` method. This step is repeated until there are no more matches for the `Operator` regex.

In the code, there is a list of `Operator`s (ordered by `BIDMAS`). The `calculate` method iterates through the list. For each `Operator`, the `operate` method is called on the input string (which is firstly auto-corrected and the brackets solved using the same `calculate` method (recursion)). The input string is then returned.
