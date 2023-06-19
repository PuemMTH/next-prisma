/**
 * Model Todo
 * 
 */
export interface Todo {
  id: string;
  created: string;
  text: string;
  completed: boolean;
}


/**
 * Model User
 * 
 * @param id -  The id of the user.
 * @param createdAt -  The date and time when the user was created.
 * @param email -  The email of the user.
 * @param name -  The name of the user.
 * @param password -  The password of the user.
 * @param verified -  The verified status of the user.
 */
export interface User {
  id: string
  createdAt: Date
  email: string
  name: string | null
  password: string
  verified: boolean
}