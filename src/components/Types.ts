export type Todo = {
  id: number
  title: string
  content: string
}

export type Comment = {
  id: number
  body: string
  todo_id: number
}
