# Scenarist; For Writing Playable Scenarios

## Installation & Usage

Scenarist is a JavaScript function exported as default from the `'@faddys/scenarist'` module.
The module can be installed using NPM by running the following command from the project's directory to be added to it's list of dependencies:

```bash
npm i @faddys/scenarist
```

It creates a play function for a scenario provided to it as the first parameter.
The play function can then be called to play directions from the scenario based on the parameters passed to it.
A production object can be  provided to Scenarist as an optional second parameter while creating a new play providing further control over it.

## Importing Scenarist

```js
import Scenarist from '@faddys/scenarist';
```

## The Hello World Play

```js
import Scenarist from '@faddys/scenarist';

// Provide Scenarist with scenario object for the hello world play:

const play = Scenarist ( {

// Add a direction for 'hello' by adding a property named $hello.
// Whenever this direction is called, the scenarist's greeting will be printed:

$hello () { console .log ( 'Hello World! This is Scenarist!' ) }

} );

// Now, the hello world play is ready.
// Play the 'hello' direction by calling the play function, passing 'hello' as the first parameter:

play ( 'hello' );

// 'Hello World! This is Scenarist!' is printed on the console.
```
