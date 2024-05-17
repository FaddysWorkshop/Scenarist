import Scenarist from '@faddys/scenarist';

( await Scenarist ( {

$_director: await Scenarist ( {

$_director ( $, input ) {

console .log ( '#externalScenario', input );

}

} )

} ) ) ( "Hello World! This is Faddy's Scenarist in solidarity with The People of Palestine against israel till their whole land is FREE!" );
