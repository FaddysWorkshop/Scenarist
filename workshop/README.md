# Source Code of Faddy's Scenarist

```roll
?# cat - > source.js
```

## Declaration of The `Scenarist` Function

`Scenarist` is an asynchronous Javascript function.
All the parameters passed to the function is kept in the `order` array;
which in turn instruct `Scenarist` on how to act.

```roll
++= const Scenarist = async function Scenarist ( ... order ) {
```

## Checking if `Scenarist` is Free or Bound

At first, `Scenarist` is free, meaning that the `this` keyword does not refer to a `version` of `Scenarist`.
When calling `Scenarist`, while it's still free, passing a `scenario` as the first parameter,
`Scenarist` will create a new `version` object and bind itself to it;
meaning that the `this` keyword will refer to the `version` object.
To make sure that `Scenarist` is still free and not bound to a `version` object,
it checks if the `this` object owns a property whose key is the secret symbol `_.bound` [(Refer to the Secret Symbols section for more information)](#secret-symbols)

```roll
++= if ( ! this ?.[ _ .bound ] )
```

### If `Scenarist` is Free

`Scenarist` is then waiting to create a `version` object around an input `scenario` to be bound to it.
The `scenario` is passed as the first parameter to `Scenarist`,
and it's type must either be `'object'` or `'function'`,
otherwise a `TypeError` will be thrown.

```roll
+==

if ( ! [ 'object', 'function' ] .includes ( typeof order [ 0 ] ) )
throw TypeError ( `Scenarist expects either an object or function scenario as the first parameter passed to it while it's  still unbound to a scenario.
Instead, the following was passed: ${ order [ 0 ] }` );

else {
-==
```

A new `version` object is created

```roll
++= const version = {};
```

```roll
++= let scenarist = production .scenarist = Scenarist .bind ( version );
```

The newly created `version` object is initialized with the following properties:

* The `plot` of the `version` for holding all the nested scenario directions; it can be considered as a cache.

```roll
++= version .plot = new Map ();
```

* The `production` object which controls how `scenarist` plays directions within the `scenario`.

```roll
++= let production = version .production = {};
```

Now, it's time for `Scenarist` to bind itself to the `version` object.

```roll
++= let scenarist = production .scenarist = Scenarist .bind ( version );
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

Note: The `scenarist` function is the `Scenarist` function but bound to a version object. So, it can not be used to create new $s other than the nested $s created in case of recursive scenarios.

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

## Secret Symbols

```roll
+==
const _ = {

signature: Symbol ( '@faddys/scenarist/signature' ),
bound: Symbol ( '@faddys/scenarist/version' ),
setting: Symbol ( '@faddys/scenarist/setting' )

};
-==
```

The `_` object contains secret symbols used through out the code.
This way `Scenarist` and the plays it writes are guaranteed to run in directions private to it.
Every time a secret symbol from this object is used in the code, an explanation of it's purpose is provided.

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

## `README` as a `roll`

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
