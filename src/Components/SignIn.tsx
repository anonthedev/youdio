'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { useState } from 'react';
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from '../../supabase';
import { useEffect, useState } from 'react';

export default function SignIn() {
    const [redirectURL, setRedirectURL] = useState("")
    const windowAvailable = typeof window !== "undefined";
    useEffect(()=>{
        if (windowAvailable) {
            setRedirectURL(`${window.location.protocol + "//" + window.location.hostname}/auth/callback`)
        }
    }, [windowAvailable])

    return (
        <section className='h-screen flex items-center justify-center'>
            <div className='w-96 bg-slate-900 p-8 rounded-xl'>
                <Auth
                    supabaseClient={supabase}
                    view="magic_link"
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    showLinks={false}
                    providers={[]}
                    redirectTo={redirectURL}
                />
            </div>
        </section>
    )
}
