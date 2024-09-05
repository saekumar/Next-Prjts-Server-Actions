import { z } from 'zod'

export const registerFormschema = z
  .object({
    // validate here for each field
    name: z
      .string({
        required_error: 'Name is Required',
      })
      .min(3, {
        message: 'Name must be atleast 3 characters',
      })
      .max(20, { message: 'Name cannot exceed 20 characters' }),
    username: z
      .string({
        required_error: 'Username is Required',
      })
      .min(3, {
        message: 'Username must be atleast 3 characters',
      })
      .max(20, { message: 'Name cannot exceed 8 characters' }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({ message: 'Not a valid Mail' }),
    password: z
      .string({
        required_error: 'password is Required',
      })
      .min(8, { message: 'password must be atleast 8 characters' })
      .regex(/[a-z]/, {
        message: 'Password must include at least one Lowercase',
      })
      .regex(/[A-Z]/, {
        message: 'Password must include at least one Uppercase',
      })
      .regex(/[0-9]/, {
        message: 'Password must include at least one Number',
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must include at least one Special character',
      }),
    confirmPassword: z.string({
      required_error: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must be same',
  })

export const blogSchema = z.object({
  title: z
    .string({
      required_error: 'Title must not be empty',
    })
    .max(10, { message: 'Title should be max 10 characters' })
    .min(5, { message: 'Title must be atleast 5 characters' }),
  description: z
    .string({
      required_error: 'Description should not be empty',
    })
    .min(50, { message: 'Description should be atleast 50 characters' }),
})
