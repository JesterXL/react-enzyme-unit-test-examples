# Pure Class

The dat-ui folder contains the basic Enzyme / Jest tests where you:

1. create a `shallow` rendered component
2. call the method on the `instance` with stub data
3. test if the `result` data is what you expect with the stubbed input

This is more isolated than side effects as you're not testing if the JSX wiring works. You're just testing the JavaScript class methods in a pure as possible fashion. By default, a lot of functions/methods used in classes do not return values, nor accept inputs. To do this style, you'll need to start having methods accept inputs, and return outputs, while still being friendly with the OOP style of coding.

Note this example abstracts `setState` since in React, by default, it always returns `undefined`. Since this is typically the last function you call, we need to abstract it to allow us to return what we sent it (like `identity`) so we don't have to manually return the value each time.

More details [here](https://gist.github.com/JesterXL/3def2d5fbcd32f6df225493d5ec889c2).