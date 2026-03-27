// @TODO to make it implement its abstract interface
// export class TodosLocalStorageService extends TodosService {
//   storageKey = 'todos'
//
//   findAll(): Promise<Todo[]> {
//     return new Promise((resolve) => {
//       const saved = localStorage.getItem(this.storageKey)
//       if (!saved) return resolve([])
//
//       try {
//         resolve(JSON.parse(saved) as Todo[])
//       } catch (error) {
//         if (error instanceof Error) {
//           console.error('Error parsing todos', error.message)
//         }
//         return resolve([])
//       }
//     })
//   }
//
//   async create(todo: Todo): Promise<Todo> {
//     return this.findAll().then((todos) => {
//       todos.push(todo)
//       localStorage.setItem(this.storageKey, JSON.stringify(todos))
//       return todo
//     })
//   }
//
//   upsert(todos: Todo[]): Promise<Todo> {
//     return new Promise((resolve) => {
//       localStorage.setItem(this.storageKey, JSON.stringify(todos))
//       resolve(todos[0]) // to be fixed
//     })
//   }
// }
