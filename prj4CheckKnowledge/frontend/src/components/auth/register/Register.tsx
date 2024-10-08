'use client'
import React, { useState } from 'react'
import { Input } from '../../acer/input'
import { Label } from '../../acer/label'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { UserSchema } from '@/schemas/UserSchema'
import { Eye, EyeOff } from 'lucide-react'

// Type definition for form fields
type RegisterUser = {
  fullname: string
  username: string
  email: string
  password: string
  confirmpassword: string
}

export default function SignupFormDemo() {
  const router = useRouter()
  const [viewPass, setViewPass] = useState(false)

  // Hook form configuration with zod resolver for validation
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterUser>({
    resolver: zodResolver(UserSchema),
  })

  const handleClick = async (userData: RegisterUser) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/user', {
        name: userData.fullname,
        email: userData.email,
        username: userData.username,
        password: userData.password,
      })
      console.log(res)
      if (res.status === 201) {
        toast.success('User Registered Successfully')
        router.push('/')
      } else {
        toast.error(`${res.data.data.mesaage}`)
      }
      reset()
    } catch (error) {
      toast.error(`${(error as any)?.response?.data?.message}`)
      console.error(error)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to SaeNius
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Register to SaeNius to explore blogs across the world
      </p>

      <form className="my-8" onSubmit={handleSubmit(handleClick)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Full name</Label>
            <Input
              id="fullname"
              placeholder="Saikumar Puppala"
              type="text"
              {...register('fullname')}
            />
            {errors.fullname && (
              <p className="text-sm text-red-600">{errors.fullname.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname"> Username</Label>
            <Input
              id="username"
              placeholder="@saurden07"
              type="text"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              type={viewPass ? 'text' : 'password'}
              {...register('password')}
            />
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setViewPass(!viewPass)}
            >
              {viewPass ? <Eye /> : <EyeOff />}
            </span>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword">Password again</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="password"
            {...register('confirmpassword')}
          />
          {errors.confirmpassword && (
            <p className="text-sm text-red-600">
              {errors.confirmpassword.message}
            </p>
          )}
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Sign up'}
          <BottomGradient />
        </button>
      </form>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  )
}
