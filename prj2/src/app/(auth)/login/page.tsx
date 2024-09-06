import { LoginPage } from '@/components/auth/login/LoginPage'
import React from 'react'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginPage />
    </div>
  )
}

export default Login
