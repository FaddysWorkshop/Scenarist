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