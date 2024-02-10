# Faddy's Scenarist

**Faddy's Scenarist** is a flexible, scenario-based JavaScript framework, designed to be compatible with various JavaScript runtime environments.
Its development in vanilla JavaScript makes it adaptable for diverse platforms, broadening its application scope.
Meaning that it can be used in:

- Web Browsers that support JavaScript to write web client apps,
- Node.js runtime environments to write web server and command-line apps,
- NativeScript to write mobile apps,
- and so on.

The essence of Scenarist lies in its ability to implement scenarios, ranging from simple to complex.
These scenarios consist of 'directions', which are specific actions or sequences within the framework.
Scenarist's central function, the 'Scenarist' function, processes these scenarios and enables the execution of these directions.

```js
/*
#


*/

import Scenarist from '@faddys/scenarist';

// To produce a new play, a scenario should be written as follows:
const recursiveScenario = {

$_producer ( $recursiveScenario, production ) {

const recursiveScenario = this;
const {

// - A reference to the play function.
play,

// - The scenario passed as the first parameter.
scenario,

// - The stamp used to access the production object. It can either be provided as a property of the optional object, passed as the second parameter, named stamp or it will be assigned a new unique symbol value.

stamp,

// - A reference to the play that played this scenario.

player,

// - A reference to the pilot play which is the root for all the played scenarios.

pilot,

// - The location at which the scenario is played.
location,

// - The setting which is the production for the playing scenario. It can be changed later on to play the same scenario within a different production.
setting

} = production;

},

$displayableScenario1: 10.07,
$displayableScenario2: "Hello World! This is Faddy's Scenarist in solidarity with the People of Palestine against israel till whole land is FREE!",
$displayableScenario3: true,
$displayableScenario4: Symbol ( 'Resistance' ),

$playableScenario ( $recursiveScenario, ... directions ) {

const recursiveScenario = this;

}

};


```

To activate a direction, the 'play' function is used, where a direction is triggered by passing its name as the first parameter.
The recursive nature of Scenarist becomes evident here: if the direction is a scenario itself, this contained scenario is played.
Further, to execute a direction within this nested scenario, its name is passed as the second parameter to the play function.
This process can be repeated, delving deeper into nested scenarios, with each level requiring an additional parameter in the play function to access its directions.

This structure allows for intricate, multi-layered interactions and functionalities within an application, offering developers the flexibility to create complex, nested scenarios.
Scenarist's design empowers developers to script and manage a wide range of application processes and behaviors, leveraging its recursive capabilities for depth and complexity in functionality.

## Installing Scenarist

Scenarist is a JavaScript function exported as default from the `'@faddys/scenarist'` module.
The module can be installed using NPM by running the following command from the project's directory to be added to it's list of dependencies:

```bash
npm i @faddys/scenarist
```

## Importing Scenarist

```js
import Scenarist from '@faddys/scenarist';
```

## Writing a Basic Hello World Play

Scenarist creates a play function for a scenario provided to it as the first parameter.
The play function can then be called to play directions from the scenario based on the parameters passed to it.

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
