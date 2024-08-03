import Scenarist from '@faddys/scenarist';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

await Scenarist ( class Note {

static $_producer ( $ ) {

if ( this .interface )
return;

this .interface = createInterface ( { input, output } )
.on ( 'line', argv => $ ( Symbol .for ( 'main' ), ... argv .trim () .split ( /\s+/ ) ) );

this .interface .prompt ();

}

static $_main ( $, ... argv ) {

$ ( ... argv )
.then ( output => {

if ( typeof output === 'string' )
console .log ( output );

else if ( typeof output ?.[ 1 ] === 'string' )
console .log ( output ?.[ 1 ] );

} )
.catch ( error => console .error ( error ?.message || error ) )
.finally ( () => this .interface .prompt () );

}

constructor ( ... argv ) { this .argv = argv }

async $_producer ( $ ) { return await $ ( ... this .argv ) }

async $_director ( $, ... argv ) {

return ! argv .length ? this .content : this .content = argv .join ( ' ' );

}

[ '$+' ] = Note

} );
