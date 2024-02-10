/*

# Minimal Example for Demonstrating the Usage of Faddy's Scenarist

`Scenarist` is an asynchronous function exported as a default from `'@faddys/scenarist'` module.
The module can be installed using `npm` as follows:

```sh
npm i @faddys/scenarist
```

Then, it can be imported as follows:

*/

import Scenarist from '@faddys/scenarist';

/*

A new play can be produced for a scenario by calling the `Scenarist` function and passing the scenario as the first parameter.
A scenario passed to `Scenarist` can either be recursive or playable.
A playable scenario is a function, while a playable one is an object.

## Producing a Play for a Playable Scenario

*/

const playableScenario = function playableScenario ( $playableScenario, ... directions ) {



};
const $playableScenario = await Scenarist ( playableScenario );
const { play, resolution } = await $playableScenario ();

/*

## Producing a Play for a Recursive Scenario

To produce a new play for a recursive scenario, a scenario should be written as follows:

*/

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
