import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<{username: string} | null>(null)
  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage){
    const user = localStorage.getItem('user');
    if (user === null) {
      router.push('/login')
    } else {
      setUser(JSON.parse(user))
    }
  }
  }, [router])
  if (user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Welcome&nbsp;
            <code className="font-mono font-bold">{user.username}</code>
          </p>
        </div>
        <h1 className={`mb-3 text-2xl font-semibold`}> You are logged In </h1>
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Click the button below to logout
          </p>
          <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            onClick={handleLogout}>
            Logout{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </button>  
        </div>
      </main>
    )  
  }
  return;
 }
