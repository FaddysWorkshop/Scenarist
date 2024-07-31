import Scenarist from '@faddys/scenarist';

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

export default scenario;