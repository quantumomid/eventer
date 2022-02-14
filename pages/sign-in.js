import { useState } from "react";
import SignInForm from "../components/sign-in/SignInForm";
import styles from "../styles/SignInPage.module.css";

const SignInPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSignInSwitch = () => {
        setIsLogin((currentState) => !currentState);
    }

    return (
        <section className={styles.pageContainer}>
            <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
            <SignInForm isLogin={isLogin} />
            <button className={styles.button}>{isLogin ? 'Login' : 'Create Account'}</button>
            <button type="button" className={styles.toggle} onClick={handleSignInSwitch}>
                {
                    isLogin 
                        ?
                    "Create new account" 
                        :
                    "Login with existing account"
                }
            </button>
        </section>
    )
}

export default SignInPage;