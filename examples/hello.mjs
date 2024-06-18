import Scenarist from '../index.mjs';

const scenarist = await Scenarist ( new class Greeter {

$name ( scenarist, ... name ) {

this .name = name .join ( ' ' );

}

async $_producer ( scenarist ) {

await scenarist ( 'name', ... process .argv .slice ( 2 ) );
await scenarist ();

}

$_director () {

console .log ( `Hello ${ this .name || 'World' }! This is Faddy's Scenarist in Solidarity with The People of Palestine till Their Whole Land is FREE!` );

}

} );
