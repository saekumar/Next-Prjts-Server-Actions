'use server'

import prisma from '@/lib/prisma'
import { User } from '@/types/UserTypes'

export async function createUser(userData: User) {
  try {
    const res = await prisma.user.create({
      data: {
        fullname: userData.fullname,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmpassword: userData.confirmpassword,
      },
    })

    return { message: 'User Registered Sucessfully', res }
  } catch (error) {
    console.error(error)
    return { message: 'Error creating user' }
  }
}

export async function checkUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return { message: 'Invalid Email.Please Register first' }
    } else {
      if (user.password !== password) {
        return { message: 'Incorrect password or Email' }
      } else {
        return { message: 'Logged in successfully', user }
      }
    }
  } catch (error) {
    return { message: 'Something went wrong' }
  }
}
