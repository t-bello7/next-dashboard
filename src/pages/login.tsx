import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login  = () => {
    const router = useRouter()
    const [user, setUser] = useState<{userName: string} | null>(null);
    const [err, setErr] = useState<string>();
    const [userData, setUserData] = useState<{username: string, password: string}> ({
        username: '',
        password: '',
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            username : e.target.name === 'username' ? e.target.value : userData['username'] ,
            password: e.target.name === 'password' ? e.target.value : userData['password']
        })
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (typeof window !== 'undefined' && window.localStorage){
            const userDatastr = localStorage.getItem('userData');
            if (userDatastr) {
                const savedUserData = JSON.parse(userDatastr);
                if (savedUserData['username'] === userData['username'] && savedUserData['password'] === userData['password']){
                    localStorage.setItem('user', JSON.stringify({username: userData['username']}))
                    router.push('/')
                } else {
                    setErr('Invalid Login')
                }
            }
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage){
            let user = localStorage.getItem('user');
            if(user) {
                setUser(JSON.parse(user))
                router.push('/')
            }
    }
    }, [router])
    if (user) {
        return;
    }
    return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
                <h1> Log In</h1>
                <form className="flex flex-col" onSubmit={handleFormSubmit}>
                    <label> Username </label>
                    <input name="username" value={userData.username} onChange={handleChange} className="text-black"/>
                    <label> Password </label>
                    <input name="password" value={userData.password} onChange={handleChange} className="text-black"/>
                    { err && <p> {err} </p>}
                    <button type="submit"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                        Log In
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                        -&gt;
                        </span>
                    </button> 
                </form>
                <p> Don&apos;t have an account ? <Link href="/register">   Sign Up </Link> </p>
            </main>)
}

export default Login;