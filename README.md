# Calculator

This is a simple static calculator made with vanilla JS, plain CSS and HTML.

---

## Features

<img src="https://i.ibb.co/0DQHtgD/ezgif-3-2f86c3f200ae.gif">

It has all the features of a regular non-scientific calculator - brackets, division, multiplication, addition, subtraction and decimals, as well as `DEL` and `AC`. The `=` button is used to get the result. The buttons all have a hover effect. If the result is successful, the textarea would blink green, otherwise red.

---

## How it Works

Each operator is assigned an `operate` function and a regex. For each of the operators, the input string is searched for the operator regex. For each of the regex matches, in the input, the match is replaced with the output of the `operate` function called on the match.

*Disclaimer: You might get some weird results if you do floating point math. For instance, [if you add `0.1` to `0.2`, it returns `0.30000000000000004`](https://javascript.plainenglish.io/why-0-1-0-2-0-3-in-javascript-d7e218224a72).*

<img src="https://i.ibb.co/fdwgR8t/Screenshot-2021-11-04-105739.png" height=80>
