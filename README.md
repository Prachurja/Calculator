# Calculator

This is a simple static calculator made with vanilla JS, plain CSS and HTML.

---

## Features

<img src="https://user-images.githubusercontent.com/87853925/140263057-988349c4-7852-4c55-a6b4-981b1eddd946.gif">

It has all the features of a regular non-scientific calculator - brackets, division, multiplication, addition, subtraction and decimals, as well as `DEL` and `AC`. The `=` button is used to get the result. The buttons all have a hover effect. If the result is successful, the textarea would blink green, otherwise red.

---

## How it Works

First of all, the input string is auto-corrected and the brackets solved. It iterates over a list of `Operator`s. Each `Operator` has an `operate` function. In the input, the match is replaced with the output of the `operate` function called on the match.

<img src="https://user-images.githubusercontent.com/87853925/140262989-141964da-3e36-46a9-9b3d-a9ee5b161f42.png" height=120>

---

## Disclaimer

You might get some weird results for floating point math. For instance, [if you add `0.1` to `0.2`, it returns `0.30000000000000004`](https://javascript.plainenglish.io/why-0-1-0-2-0-3-in-javascript-d7e218224a72).*

<img src="https://user-images.githubusercontent.com/87853925/140262893-fc1e61bb-1f5c-46e5-8fb9-e78d442a9359.png" height=80>
