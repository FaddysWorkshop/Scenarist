import Scenarist from '@faddys/scenarist';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const $ = await Scenarist ( {

bot: createInterface ( {

input, output,
prompt: 'Say hello!\n'

} ),

$_producer ( $ ) {

const { bot } = this;

this .bot .on ( 'line', line => $ ( ... line .trim () .toLowerCase () .split ( /\s+/ ) ) );
this .bot .prompt ();

},

$hello () {

console .log ( "Hello World! This is Faddy's Scenarist in solidarity with The People of Palestine against israel till their whole land is FREE!" );

this .bot .prompt ();

},

get $hi () { return this .$hello },

$_director () {

console .error ( "I didn't quite catch that!" );

this .bot .prompt ();

}

} );
