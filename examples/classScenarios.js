import Scenarist from '@faddys/scenarist';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const $ = await Scenarist ( class Cart {

constructor ( { name, service } ) {

const cart = this;

cart .name = name;
cart .service = service;

}

get $_introduction () {

const cart = this;

return `This is ${ cart .name }'s ${ cart .service } Cart!
How may I help you?`;

}

async $_producer ( $ ) {

const cart = this;
const waiter = cart .waiter = createInterface ( { input, output } )
.on ( 'line', order => $ ( Symbol .for ( 'serve' ), order ) );

cart .$ = $;

console .log ( await $ ( Symbol .for ( 'introduction' ) ) );

waiter .setPrompt ( '\n' + waiter .getPrompt () );
waiter .prompt ();

}

async $_serve ( $, order ) {

const cart = this;
try {

let response = await cart .$ ( ... order .split ( /\s+/ ) );

if ( typeof response === 'function' ) {

cart .$ = response;
response = await cart .$ ( Symbol .for ( 'introduction' ) );

}

if ( response ?.length )
console .log ( response );

} catch ( issues ) {

if ( issues instanceof Array )
for ( const issue of issues )
console .error ( issue );

else
console .error ( issues );

}

cart .waiter .prompt ();

}

$_director ( $ ) {

throw 'Pardon me! This is a waste of time!';

}

$order = class Order {

constructor ( ... line ) {

console .log ( line );

}

$_producer ( $, { pilot } ) {

this .cart = pilot;

}

$_introduction = 'new order'

$done () {

return this .cart;

}

}

} );

$ ( {

name: 'Faddy',
service: 'Breakfast'

} );
