import React, { useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    } from "@firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [newAccount, setAccount] = useState(true);
    const [error, seterror] = useState("");

    function onChange(event) {
        if (event.target.name === 'email') {
            setEmail(event.target.value)
        }
        else {
            setpassword(event.target.value)
        }
    }

    const authService = getAuth()
    async function onSubmit(event) {
        console.log(`email : ${email} password:${password}`)
        //웹사이트가 새로고침되어 저장된 state값들이 사라지는걸 막는다.
        event.preventDefault();
        if (!email.includes('@')) {
            alert('email 형식이 아닙니다.')
        }
        else if (password.length < 6) {
            alert('비밀번호는 6자리 이상이어야 합니다.')
        }
        else {
            try {
                let data
                if (newAccount) {
                    data = await createUserWithEmailAndPassword(authService, email, password);
                } else {
                    data = await signInWithEmailAndPassword(authService, email, password);
                }
                console.log(data)
            }
            catch (error) {
                seterror(error.message)
            }
        }
    }
    const toggleAccount = () => setAccount((newAccount) => !newAccount)

    const onSocialClick = async (event) => {
        const name = event.target.name

        let provider;

        if (name === 'google') {
            provider = new GoogleAuthProvider();
        }
        else if (name === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService,provider);
    }


   
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' type='text' placeholder="Email" required value={email} onChange={onChange} />
                <input name='password' type='password' placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name='google'>Continue with Google</button>
                <button onClick={onSocialClick} name='github'>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;