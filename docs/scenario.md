# Scenario

A scenario is an object or a function. a play handles the scenario differently according to its type.

## Instance Properties

A scenario could have any properties, but adding some special properties allow the play function to utilize the scenario properly.
Any property starting with a `$` is treated specially by the play function.
If a property's value is a function or an object, the play function treats it accordingly, else the value is returned.

- Directions
  - have the following syntax: `$` + `direction_name`
- Symbol Directions
  - have the following syntax: `$` + `_` + `direction_name`
- Director
  - has the following syntax: `$_director`
  - if the play function is provided a direction that does not exist in the scenario, the director is used instead.

## Examples

- Using a regular direction

    ```js
        const MyScenario = {
            $greeting: function (){
                console.log('hello hamada')
            }
        }

        const play = Scenarist(MyScenario)
        play('greeting') // hello hamada
    ```

- Using a symbol direction

    ```js
        const MyScenario = {
            $greeting: function (){
                console.log('hello hamada')
            },
            $_add: function (play, arg1, arg2){
                return arg1 + arg2
            }
        }

        const play = Scenarist(MyScenario)
        console.log(play(Symbol.for('add')), 1, 2) // 3
    ```

- Using the director

    ```js
        const MyScenario = {
            $_director: function (play, arg1){
                console.log('the director says hi to ' + arg1 + ', and ' + arg2)
            },
            $greeting: function (){
                console.log('hello hamada')
            },
            $_add: function (play, arg1, arg2){
                return arg1 + arg2
            },
        }

        const play = Scenarist(MyScenario)
        play('hamada', 'hemdan') // the director says hi to hamada, and hemdan
    ```
