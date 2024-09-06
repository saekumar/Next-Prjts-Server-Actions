'use client'

type UserDetailsType = {
  id: string
  fullname: string
  username: string
  email: string
  password: string
  confirmpassword: string
}

export const UserDetails = () => {
  let userDetails: UserDetailsType | null = null

  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      userDetails = JSON.parse(storedUser)
    } catch (error) {
      console.error('Error parsing user details from localStorage', error)
    }
  }

  const user = userDetails

  return user
}
