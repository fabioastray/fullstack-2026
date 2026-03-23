* Used Claude to generate exercises, review answers and provide solutions. Resolved 9 our of 10 exercises:
     1. Type a UserCard component that receives a name (string), age (number), and optional avatarUrl. Render nothing if
     name is empty.
     ```tsx
     interface UserCardInfo {
             name: string
             age: number
             avatarUrl?: string
         }

          function UserCard(props: UserCardInfo) {
          if (!props.name) {
          return null
          }
            
              return (
                  <div></div>
              )
          }
     ```

     2. Type a Button component that accepts all native HTML <button> attributes plus a custom variant prop: "primary" | "danger" | "ghost".
     ```tsx
         interface CustomHTMLButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
             variant: 'primary' | 'danger' | 'ghost'
        }

         function Button(props: CustomHTMLButton) {
             return null
         }
     ```
     3. Type a List<T> generic component that receives items: T[] and a renderItem: (item: T) => JSX.Element function. Use it
       with both a string[] and a User[].
     ```tsx
           interface User {
               name: string
           }
    
          interface ItemsListProps<T> {
              items: T[]
              renderItem: (item: T) => JSX.Element
          }
        
          const itemsList = <T>(props: ItemsListProps<T>) => {
        
          }
        
          const items: string[] = ['a', 'b', 'c']
          const users: User[] = [
               {name: 'Fabio'}
          ]
          const renderItem = <T>(item: T): JSX.Element => JSX.Element()
        
          itemsList({items, renderItem})
          itemsList({items: users, renderItem})
     ```

     4. You fetch /api/users and get back { data: [...], total: number, page: number }. Type the full response and a
        fetchUsers async function that returns it.
     ```typescript
        interface UserResponse {
            data: User[]
            total: number
            page: number
        }

       const fetchUsers = async (): Promise<UserResponse | null> => {
           try {
           const response = await fetch('/api/users')
    
               if (!response.ok) return null
    
               return await response.json() as UserResponse
           } catch (ex: unknown) {
               if (ex instanceof Error) console.log(ex.message)
               return null
           }
    
       }
     ```

     5. Type an API response that can either succeed { status: "ok", user: User } or fail { status: "error", message:
         string }. Write a function that handles both cases with no any.
     ```typescript
     enum ApiResponseStatus {
         OK = 'ok',
         ERROR = 'error'
     }

     interface ApiSuccessResponse {
         status: ApiResponseStatus.OK,
         user: User
     }
    
     interface ApiErrorResponse {
         status: ApiResponseStatus.ERROR,
         message: string
     }
    
     type ApiResponse = ApiSuccessResponse | ApiErrorResponse
    
     const onApiResponse = (response: ApiResponse): User | null => {
         switch (response.status) {
             case ApiResponseStatus.OK:
                 return response.user
             case ApiResponseStatus.ERROR:
                 console.error('Error status received with message', response.message)
             return null
         }
     }
     ```
     6. Given a raw JSON user object from PHP that has created_at as a string, type both the raw API shape and a mapped
          domain type where createdAt is a Date. Write the mapping function.
     ```typescript
     interface UserApiResponse {
         name: string
         created_at: string
     }

     interface UserDTO {
         name: string
         createdAt: Date
     }
    
     const fromUserApiResponse = (user: UserApiResponse): UserDTO => {
         return {
             name: user.name,
             createdAt: new Date(user.created_at)
         }
     }
     ```

     7. Type a groupBy<T> function: takes an array and a key-selector function, returns a Record where each key maps to an
        array of items.
     ```typescript
     interface UserRecord {
        name: string
        role: string
     }
    
     const groupBy = <T, K extends PropertyKey>(
         array: T[],
         keySelectorFn: (item: T) => K
     ): Record<K, T[]> => {
         const groups = {} as Record<K, T[]>
    
         return array.reduce((prev, curr) => {
             const groupingValue: K = keySelectorFn(curr)
    
             if (prev[groupingValue] === undefined) {
                 prev[groupingValue] = []
             }
    
             prev[groupingValue].push(curr)
    
             return prev
         }, groups)
     }
    
     const usersRecords: UserRecord[] = [
         {name: 'Fabio', role: 'admin'},
         {name: 'Jess', role: 'user'},
         {name: 'Adis', role: 'user'},
     ]
    
     groupBy(usersRecords, (item: UserRecord) => item.role)
     ```
  
     8. Type an event handler factory: makeChangeHandler(setter: ...) that returns an onChange handler compatible
        with `<input>`. The setter should update a string state.
        ** I couldn't resolve it

     9. You have a NestJS controller that receives a body with email and password. Type the DTO class (no decorators needed)
        so that both fields are required strings and the controller method
        is fully typed.
     ```typescript
     interface LoginRequestDTO {
          email: string
          password: string
     }
     ```

     10. Type a withCache<T> higher-order function: takes an async function fn: () => Promise<T> and a TTL in seconds,
         returns a new async function with the same signature that caches the
         result in memory.
     ```typescript
      const withCache = async <T>(fn: () => Promise<T>, ttl: number): () => Promise<T> => {
          let cache: T | undefined
          let cachedAt: number | undefined

          return async () => {
              const now = Date.now()
              if (cache !== undefined && cachedAt !== undefined && now - cachedAt < ttl * 1000) {
                  return cache
              }

              cache = await fn()
              cachedAt = now

              return cache
          }
      }
      ```
  
* Used Claude to generate a basic React todo list component, review it and make suggestions to its implementation which i applied

* I liked how it can read the opened files and reach its related ones for providing the answers

* I still prefer Perplexity's friendlier language, changed Claude's settings to improve it