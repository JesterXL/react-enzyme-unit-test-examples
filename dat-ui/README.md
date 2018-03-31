# Pure

The dat-ui folder contains the basic Enzyme / Jest tests where you:

1. call a function with stubbed input
2. test if the `result` data is what you expect with the stubbed input

Standard Functional Programming method of testing pure functions.

In a pure React way, you instead simply write functions, and bind to them in your JSX. My friend [Steven Sacks](https://twitter.com/stevensacks) has pointed out I could simply use the [Recompose](https://github.com/acdlite/recompose), but you'd still have to be ok with the`this` keyword. Hard to get around `this` with managed components, and some of the React projects that try to make the React component class methods fully pure functions show promise instead of going [full-Thermite](https://github.com/paf31/purescript-thermite).

More details [here](https://gist.github.com/JesterXL/3def2d5fbcd32f6df225493d5ec889c2).