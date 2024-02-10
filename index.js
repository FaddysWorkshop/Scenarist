/*

# Faddy's Scenarist
## Vanilla JavaScript Framework for Writing Recursive, Displayable and Playable Scenarios

As a blind person,
who also experienced different levels of vision in the past,
I found that the main issue causing limitations in accessibility to apps in different operating systems and platforms is that I'm limited to scenarios,
most probably written by sighted people,
that don't fit my physical and mental capabilities.
To fix this silly issue, there must be a way for the user to write their own scenarios that satisfy their needs without waiting for developers to do so.
But, to get to this point, a framework is needed for developers to be able to write scenarios in the first place;
here comes Scenarist.

Vanilla JavaScript was chosen to be the language of Scenarist for the following reasons:

- it's widely used in app development whether for shell, web, mobile, desktop, server, IoT, and the list will keep going.
- It's a functional programming language, so it's perfect for writing playable scenarios.
- It's an object-oriented programming language, so it's perfect for writing recursive scenarios.

This file contains the code of Scenarist and detailed explanation of it's logic.

*/

const _ = {

story: Symbol ( 'senarist/$story' ),
location: Symbol ( 'senarist/$location' ),
setting: Symbol ( 'scenarist/$setting' )

};

/*

The `_` object contains secret symbols used through out the code.
This way Scenarist and it's $s are guaranteed to $ in directions private to it.
Every time a secret symbol from this object is used in the code, an explanation of it's purpose will be provided.

*/


export default async function Scenarist ( ... order ) {

/*

The module exports only the `Scenarist` asynchronous function.
Meaning that Scenarist can be imported as follows:

```js
import Scenarist from '@faddys/scenarist';
```

All the parameters passed to the function is kept in the `order` array.

*/

if ( ! this ?.[ _ .story ] )

/*

`Scenarist` and the `$` functions it produces are the same function at the end.
They only differ is that the `this` keyword, in case of `Scenarist`, is not assigned a story object; acting as the environment where a scenario occurs.
`Scenarist` checks if it's free or inside a `$` by checking 

Before Scenarist start $ing directions, it makes sure that it's bound to a story object.
The Story is where Scenarist lives.
This is done by checking for the value of the story's property whose key is set to the secret story symbol.
If the value is not set to true, Scenarist will create a $ function in case a scenario is provided as the first parameter.

*/

if ( ! this ?.[ _ .story ] )

/*

The scenario is passed as the first parameter to Scenarist.
A scenario must either be object (recursive):

```js
const $ = Scenarist ( {

// Recursive Scenario

} );
```

Or, function (playable):

```js
const $ = Scenarist ( function scenario ( $, ... directions ) {

// Playable Scenario

} );
```

*/

if ( [ 'object', 'function' ] .includes ( typeof order [ 0 ] ) ) {

/*

The $ is created by binding Scenarist to a story object (the `this` keyword will be assigned this value).
Contents of the story object are as follows:

*/

const production = {};
let $ = Scenarist .bind ( {

// - The value of the property whose key is the secret story symbol is set to true, this way Scenarist knows that it's bound to a story and can $ directions within a scenario.

[ _ .story ]: true,

// - The plot of a story holds all the nested scenario directions; it can be considered as a cache for it's nested scenarios.

plot: new Map (),

// - The production object which controls how Scenarist $s directions within the scenario.

production

} );

/*

Also, A new scenario's production object will be initialized with the following content:

*/

Object .assign ( production, {

// - A reference to the $ function.

$,

// - The scenario.

scenario: order [ 0 ],

// - The stamp used to access the production object. It can either be provided as a property of the optional object, passed as the second parameter, named stamp or it will be assigned a new unique symbol value.

stamp: order [ 1 ] ?.stamp || Symbol ( 'scenarist/stamp/' ),

// - A reference to the $ that $ed this scenario (undefined in case of root scenarios).

$er: order [ 1 ] ?.$er,

// - A reference to the pilot $ which is the root for all the $ed scenarios (undefined in case of the root scenario).

pilot: order [ 1 ] ?.pilot || $,

// - The location at which the scenario is $ed (empty array in case of root scenarios, and in case of nested scenarios, it'll be filled with the directions that lead to this scenario).

location: order [ 1 ] ?.[ _ .location ] || [],

// - The setting which is the production for the $ing scenario. It can be changed later on to $ the same scenario within a different production.

setting: order [ 1 ] ?.[ _ .setting ]

} );

Object .defineProperty ( $, 'name', { value: 'scenarist/$' } );

// Note: The name property of the newly created $ function is modified for debugging purposes; like when using `console .log ( $ )` to print the function showing it's name.

/*

Now, the new $ function is ready.
Before returning it, the producer symbol direction will be called with the production object passed as a parameter.

```js
const $ = Scenarist ( {

$_producer ( $, production ) {

// This function is executed upon creation of the $ function for this scenario.

},

// ... Other directions in this scenario can be written here

} );
```

*/

if ( production .scenario .$_producer )
await $ ( Symbol .for ( 'producer' ), production );

return $;

// The logic of the `Scenarist` function ends here by returning the `$` function created for the passed scenario.

}

else
throw TypeError ( "Scenarist: 'scenario' must be either an 'object' or 'function'." );

/*

/*

The logic of the `$` function starts here;
meaning that a direction in this scenario is about to be $ed.

Note: The `$` function is the `Scenarist` function but bound to a story object. So, it can not be used to create new $s other than the nested $s created in case of recursive scenarios.

*/

let { production, plot } = this;

let { $, stamp, scenario, location, $er, pilot, setting } = production;

// Retrieve the direction from the order; which is the array containing all the parameters passed to the $ function.

let [ direction ] = order;
let conflict, $direction;

if ( direction === stamp )
return {

$,
resolution: production

};

else if (

[ 'string', 'number' ] .includes ( typeof direction )
&& direction ?.[ 0 ] !== '_'
&& typeof scenario ?.[ $direction = '$' + direction ] !== 'undefined'

) {

conflict = scenario [ $direction ];

order .shift ();

}

else if (

typeof direction === 'symbol'
&& ( $direction = Symbol .keyFor ( direction ) )
&& typeof scenario ?.[ $direction = '$_' + $direction ] !== 'undefined'

) {

conflict = scenario [ $direction ];

order .shift ();

}

else if ( typeof scenario === 'function' )
return {

$,
resolution: await scenario .call ( setting ?.scenario || ( await ( typeof $er === 'function' ? $er : $ ) ( stamp ) ) .resolution .scenario, setting ?.$ || $er, ... order )

};

else if ( typeof scenario .$_director !== undefined ) {

conflict = scenario .$_director;
direction = Symbol .for ( 'director' );

}

else
throw Object .assign ( Error ( `Unknown direction: [ ${ [ ... location, direction ] .join ( ' ' ) } ]` ), {

direction,
location,
code: Symbol .for ( 'senarist/error/unknown-direction' )

} );

switch ( typeof conflict ) {

case 'object':
case 'function':

if ( ! conflict )
return {

$,
resolution: conflict

};

if ( ! plot .get ( conflict ) )
plot .set ( conflict, await Scenarist ( conflict, {

stamp,
$er: $,
pilot,
[ _ .location ]: [ ... location, direction ],
[ _ .setting ]: setting

} ) );

$ = plot .get ( conflict );

if ( typeof conflict === 'object' )
( await $ ( stamp ) ) .location = [ ... location, direction ];

return $ ( ... order );

}

return {

$,
resolution: conflict

};

};
