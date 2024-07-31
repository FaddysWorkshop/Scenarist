
import Scenarist from '@faddys/scenarist';

const scenarist = await Scenarist ( {

// A direction is just an object property whose name must start with $ (dollar sign) followed by the desired name for the direction,
// To create a new direction named 'hello', a property named '$hello' is added to the scenario object:
$hello: "Hello World! This is Faddy's Scenarist in Solidarity with The People of Palestine till Their Whole Land is FREE!"

} );

console .log ( await scenarist ( 'hello' ) );
