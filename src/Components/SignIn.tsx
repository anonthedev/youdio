'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { useState } from 'react';
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from '../../supabase';

export default function SignIn() {
    // const supabase = createClientComponentClient();
    // const [email, setEmail] = useState('')
    // async function userSignIn() {
    //     let { data, error } = await supabase.auth.signInWithOtp({
    //         email: email,
    //         options: {
    //             emailRedirectTo: 'https://localhost:3000/dashboard'
    //         }
    //     })

    //     console.log(data)
    // }

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
                    redirectTo="http://localhost:3000/auth/callback"
                />
            </div>
        </section>
    )
}
