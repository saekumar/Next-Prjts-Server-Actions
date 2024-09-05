import { z } from 'zod'

export const PostSchema = z.object({
  title: z
    .string({
      required_error: 'Title is Required',
    })
    .min(5, { message: 'Title should be atleast 5 characters' })
    .max(10, { message: 'Title should be less than 10 characters' }),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(10, { message: 'Desccription should be atleast 10 characters' })
    .max(1000, { message: 'Desccription should be less than 1000 characters' }),
})
