import Scenarist from '@faddys/scenarist';
import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';

const $ = await Scenarist ( {

interface: createInterface ( {

input, output,
prompt: 'Say hello!\n'

} ),

$_producer ( $ ) {

const { interface } = this;

this .interface .on ( 'line', line => $ ( ... line .trim () .toLowerCase () .split ( /\s+/ ) ) );
this .interface .prompt ();

},

$hello () {

console .log ( "Hello World! This is Faddy's Scenarist in solidarity with The People of Palestine against israel till their whole land is FREE!" );

this .interface .prompt ();

},

get $hi () { return this .$hello },

$_director () {

console .error ( "I didn't quite catch that!" );

this .interface .prompt ();

}

} );
