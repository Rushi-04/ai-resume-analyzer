import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter"

export const meta = () => ([
    {title: 'RESUMIND | Auth'},
    {name: 'description', content: 'Log into your account'},
])

const Auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();
    useEffect(() => {
            if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className="gradient-border shadow-lg">
            <section className="flex flex-col gap-2 bg-white rounded-2xl p-6">
                <div className="flex flex-col items-center text-center">
                    <p className="max-sm:text-[3rem] text-4xl text-gradient leading-tight xl:tracking-[-2px] font-semibold">Welcome</p>
                    <p className="max-sm:text-xl text-2xl text-dark-200">Log In to Continue your Job Journey</p>
                </div>
                
                <div className="flex items-center justify-center">
                    {isLoading ? (
                        <button className="auth-button animate-pulse">
                            <p>Signing you in...</p>
                        </button>
                    ) : (
                        <>
                        {auth.isAuthenticated ? (
                            <button className="auth-button" onClick={auth.signOut}>
                                <p>Log Out</p>
                            </button>
                        ) : (
                            <button className="auth-button" onClick={auth.signIn}>
                                <p>Log In</p>
                            </button>
                        )}
                        </>
                    )}
                </div>
            </section>

        </div>
    </main>
  )
}

export default Auth