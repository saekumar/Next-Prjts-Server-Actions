'use client'
import { Button } from '../ui/button'
import { TypewriterEffectSmooth } from '../ui/typewriter-effect'
import { useRouter } from 'next/navigation'
const TypeWriterComponent = () => {
  const router = useRouter()
  const words = [
    {
      text: 'Build',
    },
    {
      text: 'awesome',
    },
    {
      text: 'Blogs',
    },
    {
      text: 'with',
    },
    {
      text: 'SaeNius.',
      className: 'text-blue-500 dark:text-blue-500',
    },
  ]
  return (
    <div className="flex flex-col items-center justify-center  ">
      {' '}
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm hover:text-gray-950">
          Add blog
        </Button>
        <Button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm"
          onClick={() => router.push('/register')}
        >
          Signup
        </Button>
      </div>
    </div>
  )
}
export default TypeWriterComponent
