# Production

Production object works as a store for plays.

## Instance Properties

- play
  - play is the current play function.
- stamp
  - A stamp is a value used to retrieve the production object from a play.
- scenario
  - This is the provided scenario.
- player
  - A player is the parent play function.
- pilot
  - A pilot is the root play function.
- location
  - A location is a list of directions, ordered by access time.
- setting
  - A setting is a production object that the user could provide to extend the functionality of the play.

## Examples

- Retrieving a production object

    ```js
        const MyScenario = {
            $greeting: function (){
                console.log('hello hamada')
            },
        }

        const play = Scenarist(MyScenario, {stamp: 'mystamp'})
        const production = play('mystamp')
    ```

- Retrieving a nested production object:

    ```js
        const MyScenario = {
            $greeting: function (){
                console.log('hello hamada')
            },
            $string: {
                $lower: function(play, arg1){
                    return arg1.toLowerCase()
                }
            }
        }

        const play = Scenarist(MyScenario, {stamp: 'mystamp'})
        const rootProduction = play('mystamp')
        const nestedProduction =  play('string', 'mystamp')
    ```

- Showing current location

    ```js
        const MyScenario = {
            $greeting: function () {
                console.log('hello hamada')
            },
            $string: {
                $lower: function (play, arg1) {
                    return arg1.toLowerCase()
                }
            }
        }

        const play = Scenarist(MyScenario, { stamp: 'mystamp' })
        console.log(play('mystamp').location) // []
        console.log(play('string', 'mystamp').location) // [ 'string' ]
        console.log(play('string', 'lower', 'mystamp').location) // [ 'string', 'lower' ]
    ```
