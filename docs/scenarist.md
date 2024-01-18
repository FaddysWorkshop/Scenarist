# Module: `@faddys/scenarist`

## Install

```bash
npm i @faddys/scenarist
```

## Function: `Scenarist`

### Syntax

```js
import Scenarist from '@faddys/scenarist';

// A scenario can either be an object:

const scenario = {

// Directions are added

// String directions can be added like this:

$stringDirectionToBooleanValue: true,
$stringDirectionToNumberValue: 10.07,
$stringDirectionToStringValue: 'Palestine',
$stringDirectionToSymbolValue: Symbol ( 'Resistance Till Whole Land Is Free Again' ),

//

};
const play = Scenarist ( scenario, play );
```

#### Parameters

##### `scenario` (required)

##### `production` (optional)

### Description

Scenarist can be called to create a play function for a scenario passed as the first parameter:

```js
import Scenarist from '@faddys/scenarist';

// Get a scenario someway and provide it to Scenarist to create a new play for that scenario:

const play = Scenarist ( scenario );
```

## How to Write and Play Scenario Directions from a Scenarist's Play

The `play` function can be called to play different directions from the scenario passed to Scenarist upon creation based on the parameters passed to it.

The passed scenario can either be a function or object.

### Playing Directions from a Scenario Function

If the scenario is a function,

### Playing Directions from a Scenario Object

If the scenario is an object, a property within this scenario (not just the owned ones) is considered a direction if the property's name starts with a $ (dollar sign).
A direction name, to be passed as the first parameter to the play function, can either be a string or symbol.

#### String Direction Name

String direction name is written by prefixing the name of the property representing the direction in the scenario object with a `$` (dollar sign).
For example, if we want to write a scenario having a direction named `'hello'`, and then play it by passing the direction name as the first parameter to the play function:

```js
import Scenarist from '@faddys/scenarist';

const scenario = {

// Since the desired direction name is 'hello', add a property to the scenario object and name it $hello:

$hello () {

console .log ( "Hello World! This is Faddy's Scenarist!" );

}

};

// Let Scenarist create the play function for that scenario:

const play = Scenarist ( scenario );

// Play the 'hello' direction:

play ( 'hello' ); // The 'hello' direction is called!

// Output on console:
/*
Hello World! This is Faddy's Scenarist!
*/
```

#### Symbol Direction Name

Symbol direction name is written by prefixing the name of the property representing the direction in the scenario object with a `$_` (dollar sign followed by underscore).The direction can then be played by calling the play function while providing the symbol returned from calling `Symbol .for ( directionName )`, where `directionName` is the variable having the value of the direction name.

```js
import Scenarist from '@faddys/scenarist';

const scenario = {

// Since the desired string direction name is 'hello', add a property to the scenario object and name it $hello:

$hello () {

console .log ( "Hello World! This is Faddy's Scenarist greeting you from a direction having a string name!" );

},

// Since the desired symbol direction name is 'hello', add a property to the scenario object and name it $_hello:

$_hello () {

console .log ( "Hello World! This is Faddy's Scenarist greeting you from a direction having a symbol name!" );

}

};

// Let Scenarist create the play function for that scenario:

const play = Scenarist ( scenario );

// Play the 'hello' string direction:

play ( 'hello' );

// Play the 'hello' symbol direction:

play ( Symbol .for ( 'hello' ) );

// Output on console:
/*
Hello World! This is Faddy's Scenarist greeting you from a direction having a string name!
Hello World! This is Faddy's Scenarist greeting you from a direction having a symbol name!
*/
```

#### Straight Directions

If the value of the property, in case it is a scenario direction, is `'string'`, `'number'`, `'boolean'` or `'symbol'`, the value will be returned directly.
For example, let's write a scenario that illustrates how straight directions is written:

```js
import Scenarist from '@faddys/scenarist';

// Let Scenarist create the play function for the following scenario having only straight directions:

const play = Scenarist ( {

// Example for a straight direction named 'Palestine' and directs to a symbol:

$Palestine: Symbol .for ( 'RESISTANCE Till Whole Land is FREE!' ),

// Example for a straight direction named 'israel' and directs to a boolean

$israel: false,

// Example for a straight direction named 'question' and directs to a string

$question: 'Why israel?',

// Example for a straight direction named 'resistance' and directs to a number

$resistance: 10.07

} );

// Play the different straight directions that we wrote above and log the values, they direct to to, the console

for ( const direction of [ 'resistance', 'Palestine', 'question', 'israel' ] )
console .log (

direction + ': ', play ( direction )

);

// Output on console:
/*
resistance:  10.07
Palestine:  Symbol(RESISTANCE Till Whole Land is FREE!)
question:  Why israel?
israel:  false
*/
```

If the type of the property (in case it is a direction) is object, then the direction is pointing to a nested play whose scenario is that object.
For example, let's write a play whose scenario has directions pointing to nested plays:

```js
import Scenarist from '@faddys/scenarist';

const play = Scenarist ( {

$Palestine: {



},
$israel: {



}

} );

If the type of the property (in case it is a direction) is a function, the function will be called and the rest of the parameters that were passed to the play function will be passed to that called function.

