import { z } from 'zod'

export const UserSchema = z
  .object({
    fullname: z
      .string({
        required_error: 'Name is Required',
      })
      .min(5, {
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
      .max(10, { message: 'Name cannot exceed 8 characters' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
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
    confirmpassword: z.string({
      required_error: 'Confirm password is required',
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    path: ['confirmpassword'],
    message: 'Passwords must be same',
  })
