import Scenarist from '@faddys/scenarist';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const $ = Symbol .for;
const $cart = await Scenarist ( Object .assign ( async function FaddysBreakfastCart ( $cart ) {

const cart = this;
const { order, cli } = cart;
const { resolution: selection } = await $cart ( $ ( 'selection' ) );

if ( ! selection )
return $cart ( $ ( 'close' ) );

const { resolution: answer } = await $cart ( $ ( 'ask' ) );

if ( answer > 0 && answer <= selection .answers .length )
$cart ( $ ( 'add' ) );

else
$cart ( $ ( 'repeat' ) );

return $cart ();

}, {

cli: createInterface ( { input, output } ),
order: {},
selections: [

{

label: 'drink',
question: "Would you like to have Coffee or Tea?",
answers: [ 'Coffee', 'Tea' ]

}, {

label: 'milk',
question: "Would you like to add milk?",
answers: [ 'Yes', 'No' ]

}, {

label: 'Sugar',
question: "How about sugar?",
answers: [ 'No', 'lightly sweet', 'regular', 'sweet' ]

}

],

$_selection () {

return this .selection = this .selections .shift ();

},

$_repeat () {

this .selections .unshift ( this .selection );
this .selection = undefined;

},

async $_ask () {

const { cli, selection } = this;

return this .answer = parseInt (

await cli .question ( `${ selection .question }

${ selection .answers .map ( ( answer, index ) => `${ index + 1 }. ${ answer }` ) .join ( '\n' ) }

Your answer: ` )

) || Infinity;

},

$_add () {

const { answer, order, selection } = this;

order [ selection .label ] = selection .answers [ answer - 1 ];

},

$_close () {

const { cli, order } = this;

console .log ( "Here;s your order!" );

for ( const item in order )
console .log ( item + ':', order [ item ] );

cli .close ();

}

} ) );

$cart ();
