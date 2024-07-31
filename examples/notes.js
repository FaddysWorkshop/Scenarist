import Scenarist from '@faddys/scenarist';
import { createInterface } from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

await Scenarist ( class Note {

static $_producer ( $ ) {

this .interface = createInterface ( { input, output } )
.on ( 'line', argv => $ ( Symbol .for ( 'main' ), ... argv .trim () .split ( /\s+/ ) ) );

this .interface .prompt ();

}

static $_main ( $, ... argv ) {

$ ( ... argv )
.then ( output => ( typeof output === 'string' ? console .log ( output ) : undefined ) )
.catch ( error => console .error ( error ) )
.finally ( () => this .interface .prompt () );

}

constructor ( ... argv ) { this .argv = argv }

async $_producer ( $ ) { await $ ( ... this .argv ) }

$_director ( $, ... argv ) {

if ( ! argv .length )
return this .content;

this .content = argv .join ( ' ' );

}

} );
