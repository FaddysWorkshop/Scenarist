# Faddy's Scenarist
## Vanilla JavaScript Framework for Writing Displayable, Playable and Recursive Scenarios

In Solidarity with The People of Palestine till Their Whole Land is FREE!

Work of [Faddy Michel](https://github.com/faddymichel)

## Why `Scenarist`?

As a blind person,
who also experienced different levels of vision in the past,
I found that the main issue causing limitations in accessibility to apps in different operating systems and platforms is that I'm limited to scenarios,
most probably written by sighted people,
that don't fit my physical and mental capabilities.
To fix this silly issue, there must be a way for the user to write their own scenarios that satisfy their needs without waiting for developers to do so.
But, to get to this point, a framework is needed for developers to be able to write scenarios in the first place;
here comes `Scenarist`!

## Why Vanilla Javascript?

Vanilla JavaScript was chosen to be the language of `Scenarist` for the following reasons:

- it's supported cross-platform and widely used in app development whether for shell, web, mobile, desktop, server, IoT, and the list will keep going.
- It's a functional programming language, so it's perfect for writing playable scenarios.
- It's an object-oriented programming language, so it's perfect for writing displayable and recursive scenarios.

## Usage

`Scenarist` is a function that binds itself to a scenario object containing the directions it can play.
Everytime `Scenarist` is called, The parameters passed to the function instructs it on which direction within the scenario should be played.

For example, a basic `hello` scenario may be written as follows.

### Basic Hello Example

```roll
?# mkdir -p examples/hello ; cat - > examples/hello/basic.mjs
The above line instructs Faddy's Roll to write the following example to ./examples/basic/hello.mjs
```

```js
+== Disregard this line. It instructs Faddy's Roll to start writing to the example file starting from the following line.

import Scenarist from '@faddys/scenarist';

const scenarist = await Scenarist ( {

// A direction is just an object property whose name must start with $ (dollar sign) followed by the desired name for the direction,
// To create a new direction named 'hello', a property named '$hello' is added to the scenario object:
$hello: "Hello World! This is Faddy's Scenarist in Solidarity with The People of Palestine till Their Whole Land is FREE!"

} );

console .log ( await scenarist ( 'hello' ) );

-== Disregard this line. It instructs Faddy's Roll to stop writing to the example file.
```

```roll
?# if [ "`node examples/hello/basic.mjs`" == "Hello World! This is Faddy's Scenarist in Solidarity with The People of Palestine till Their Whole Land is FREE!" ] ; then echo "test passed" ; fi

The above line instructs Faddy's Roll to run the example using Node.js.
The following should be displayed:
Hello World! This is Faddy's Scenarist in Solidarity with The People of Palestine till Their Whole Land is FREE!
```

In this example, a basic scenario is passed to `Scenarist` to return `scenarist`, a version of itself after being bound to this scenario.
The scenario has only one direction named 'hello'.
But, for `Scenarist` to understand that a property, belonging to the scenario object, is a direction,
the property name must start with $ (dollar sign) followed by the direction name;
`$hello` in this case.
Finally, `scenarist` is called passing `'hello'` as the first and only parameter.
This instructs `scenarist` to play the direction named `'hello'`.
This direction takes `scenarist` directly to the string value:
`"Hello World! This is Faddy's Scenarist in Solidarity with The People of Palestine till Their Whole Land is FREE!"`,
which is passed right away to the `console.log` function to be displayed.

## Implementation

### Example: Hello World

```roll
/ ?# cat - > examples/hello
```

```roll
+==
const scenario = {

greeting: 'Hello',
$greeting ( scenarist, ... greeting ) {

this .greeting = ( greeting .join ( ' ' ) ) .length ? greeting : this .greeting;

return scenarist ();

},

name: 'World',
$name ( scenarist, ... name ) {

this .name = ( name = name .join ( ' ' ) ) .length ? name : this .name;

return scenarist ();

},

$_introduction: "This is Faddy's Scenarist in Solidarity with The People of Palestine till Their Whole Land is FREE!",

async $_director ( scenarist ) {

return `${ this .greeting } ${ this .name }! ${ await scenarist( Symbol .for ( 'introduction' ) ) }`;

}

};
-==
```

```roll
?# cat - > source.js
```

```roll
+==
const _ = {

signature: Symbol ( '@faddys/scenarist/signature' ),
story: Symbol ( '@faddys/scenarist/story' ),
setting: Symbol ( '@faddys/scenarist/setting' )

};
-==
```

The `_` object contains secret symbols used through out the code.
This way `Scenarist` and the plays it writes are guaranteed to run in directions private to it.
Every time a secret symbol from this object is used in the code, an explanation of it's purpose will be provided.

### Declaration of `Scenarist`

`Scenarist` is just an asynchronous Javascript function.
All the parameters passed to the function is kept in the `order` array;
which in turn instruct `Scenarist` on how to act.

```roll
++= const Scenarist = async function Scenarist ( ... order ) {
```

### Asking `Scenarist` to Start a New `story`

The`story` object is where Scenarist lives.
At first, `Scenarist` is free and is not bound to a `story`.
When calling `Scenarist` passing a `scenario` as the first parameter,
`Scenarist` will create a new `story` object and bind itself to it;
meaning that the `this` keyword will refer to the `story`.
To make sure that `Scenarist` is still free and not bound to a `story`,
it checks if the `this` object owns a property whose key is the secret symbol (`_ .story`) and it's value is set to `tru`.

```roll
++= if ( ! this ?.[ _ .story ] )
```

The scenario is passed as the first parameter to Scenarist.
A scenario must either be object (recursive).

```roll
++= if ( [ 'object', 'function' ] .includes ( typeof order [ 0 ] ) ) {
```

The play is created by binding Scenarist to a story object (the `this` keyword will be assigned this value).
Contents of the story object are as follows:

```roll
++= const story = {};
```

- The value of the property whose key is the secret story symbol is set to true,
  this way Scenarist knows that it's bound to a story and can play directions within a scenario.

```roll
++= story [ _ .story ] = true;
```

- The plot of a story holds all the nested scenario directions; it can be considered as a cache for it's nested scenarios.

```roll
++= story .plot = new Map ();
```

- The production object which controls how `scenarist` plays directions within the scenario.

```roll
++= let production = story .production = {};
```

```roll
++= let scenarist = production .scenarist = Scenarist .bind ( story );
```

```roll
++= production .scenario = order [ 0 ];
```

- The stamp used to access the production object. It can either be provided as a property of the optional object, passed as the second parameter, named stamp or it will be assigned a new unique symbol value.

```roll
++= production .stamp = order [ 1 ] ?.stamp || Symbol ( '@faddys/scenarist/stamp' );
```

- A reference to the `scenarist` that played this scenario (undefined in case of root scenarios).

```roll
++= production .player = order [ 1 ] ?.player;
```

- A reference to the pilot `scenarist` which is the root for all the played scenarios

```roll
++= production .pilot = order [ 1 ] ?.pilot || scenarist;
```

- The setting which is the production for the playing scenario. It can be changed later on to play the same scenario within a different production.

```roll
++= production .setting = order [ 1 ] ?.[ _ .setting ];
```

```roll
++=
Object .defineProperties ( scenarist, {

name: { value: '@faddys/scenarist' },
[ Symbol .for ( '@faddys/scenarist' ) ]: { value: signature => signature === _ .signature ? true : false }

} );
-==
```

Note: The name property of the newly created `scenarist` function is modified for debugging purposes;
like when using `console .log ( scenarist )` to print the function showing it's name.

Before returning it, the producer symbol direction will be called with the production object passed as a parameter.

```roll
+==
if ( production .scenario .$_producer )
await scenarist ( Symbol .for ( 'producer' ), production );
-==
```

```roll
++= return scenarist;
```

```roll
++= }
```

The logic of the `scenarist` function starts here;
meaning that a direction in this scenario is about to be played.

Note: The `scenarist` function is the `Scenarist` function but bound to a story object. So, it can not be used to create new $s other than the nested $s created in case of recursive scenarios.

```roll
+==
let { production, plot } = this;
let { scenarist, stamp, scenario, player, pilot, setting } = production;
-==
```

Retrieve the direction from the order; which is the array containing all the parameters passed to the `scenarist` function.

```roll
++= let [ direction ] = order;
```

```roll
++= let conflict, $direction;
```

```roll
+==
if ( direction === stamp )
return production;
-==
```

```roll
+==
else if (

[ 'string', 'number' ] .includes ( typeof direction )
&& direction ?.[ 0 ] !== '_'
&& typeof scenario ?.[ $direction = '$' + direction ] !== 'undefined'

) {

conflict = scenario [ $direction ];

order .shift ();

}
-==
```

```roll
+==
else if (

typeof direction === 'symbol'
&& ( $direction = Symbol .keyFor ( direction ) )
&& typeof scenario ?.[ $direction = '$_' + $direction ] !== 'undefined'

) {

conflict = scenario [ $direction ];

order .shift ();

}
-==
```

```roll
+==
else if ( typeof scenario === 'function' ) {

if ( scenario === scenario ?.prototype ?.constructor )
return await Scenarist ( new scenario ( ... order ), {

stamp,
player: scenarist,
pilot: player === undefined ? undefined : pilot,
[ _ .setting ]: setting

} );

else {

if ( typeof scenario [ Symbol .for ( '@faddys/scenarist' ) ] !== 'function' || ! scenario [ Symbol .for ( '@faddys/scenarist' ) ] ( _ .signature ) )
order .unshift ( ( setting ?.scenarist || player ) || scenarist );

return await scenario .call ( setting ?.scenario || ( await ( typeof player === 'function' ? player : scenarist ) ( stamp ) ) .scenario, ... order );

}

}
-==
```

```roll
+==
else if ( typeof scenario .$_director !== undefined ) {

conflict = scenario .$_director;
direction = Symbol .for ( 'director' );

}
-==
```

```roll
+==
else
throw Object .assign ( Error ( `Unknown direction: [ ${ direction } ]` ), {

direction,
code: Symbol .for ( 'senarist/error/unknown-direction' )

} );
-==
```

```roll
+==
switch ( typeof conflict ) {

case 'object':
case 'function':

if ( ! conflict )
return conflict;

if ( ! plot .get ( conflict ) )
plot .set ( conflict, await Scenarist ( conflict, {

stamp,
player: scenarist,
pilot,
[ _ .setting ]: setting

} ) );

scenarist = plot .get ( conflict );

return scenarist ( ... order );

}
-==
```

```roll
++= return conflict;
```

```roll
++= };
```

## Exporting `Scenarist`

### As an ECMAScript Module

```roll
?# cat source.js > index.mjs
?# echo >> index.mjs
?# echo 'export default Scenarist;' >> index.mjs
```

### As a CommonJS Module

```roll
?# cat source.js > index.cjs
?# echo >> index.cjs
?# echo 'module .exports = Scenarist' >> index.cjs
```

## Examples

```roll
?# cat - > examples/.generate.mjs
```

```roll
+==
import Scenarist from '@faddys/scenarist';
import { parse } from 'node:path';
import { readFile, writeFile, rm } from 'node:fs/promises';

await Scenarist ( new class Generator {

$_producer ( $ ) {

$ ( ... process .argv .slice ( 2 ) );

}

async $_director ( $, ... argv ) {

if ( ! argv .length )
return;

const path = argv .shift ();

$ ( ... argv );

const scenario = await readFile ( path );

await Promise .all ( [

this .nodeECMAScript ( path, scenario )

] );

rm ( path );

}

async nodeECMAScript ( path, scenario ) {

writeFile ( path + '.mjs', `

import Scenarist from '@faddys/scenarist';

${ scenario }

export default scenario;

` .trim () );

}

} );
-==
```

```roll
/ ?# cd examples ; node ./.generate.mjs `ls`
```

const server = createInterface ( {

input, output,
prompt: '#order: '

} ) .on ( 'line', async line => {

const start = Date .now ();
const resolution = await scenarist ( ... line .trim () .split ( /\s+/ ) );
const time = Date .now () - start;

console .log ( resolution );
console .error ( '#time', time + 'ms' );

server .prompt ();

} );

server .prompt ();


` .trim () );

}

} );
-==
```

## `README` as a `roll`

Thanks to [Faddy's Roll](https://github.com/FaddysWorkshop/Roll),
this `README` contains not only the documentation of `Scenarist`,
but also the source code and detailed explanation of the logic.
Meaning that The `roll` command can be run against this `README`
to export `Scenarist` in different forms suiting various JavaScript runtimes,
and generate documentation, examples and tests.

[Faddy's Roll](https://github.com/FaddysWorkshop/Roll) can be installed using the `npm` command ass follows:

```sh
sudo npm i -g @faddys/roll
```

When, the `roll` command is available:

```sh
# Assuming that the current working directory is Scenarist's root directory
roll README.md
```

## Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>
