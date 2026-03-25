* How components are composed in your Todo app?
  * we have a smart component(app) responsible for fetching the items, sort and provide them to its children
  * child components receive the items, present them and allow to add, edit, remove and toggle them by notifying the parent via events. they are: 
    * the todo-list, responsible for listing the todos and initializing new ones
    * the todo-stats, responsible for computing the statistics
  * a grand children component is the todo-item, whose responsibility is to display one entity/item and buffer its changes so that they are only emitted/commited if the user triggered the right trigger allowing to not been over reactive nor handle dismissals at the top level
* How filters work and how the Filter union type helps?
  * the union allows to define a specific set of values that would be used to make sure whichever uses it provides only the expected values
  * the filters i implemented are like computed fns
* How persistence works (localStorage + useEffect)?
  * a fn is responsible for fetching the initial items/todos from the localStorage to be provided as the initial state
  * useEffect watches the items for changes and automatically executes a callback to store them again to the localStorage
* Where you used AI today (filters, effect, styling) and how you verified the output?
  * mostly for optimizations, guiding on unknown ways to implement something and with the styling