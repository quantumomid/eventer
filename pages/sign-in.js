import { useState } from "react";
import SignInForm from "../components/sign-in/SignInForm";
import styles from "../styles/SignInPage.module.css";

const SignInPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formInputs, setFormInputs] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleSignInSwitch = () => {
        setIsLogin((currentState) => !currentState);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInputs(current => ({
            ...current, 
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formInputs);
    }

    return (
        <section className={styles.pageContainer}>
            <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
            <SignInForm 
                isLogin={isLogin} 
                formInputs={formInputs}
                handleSubmit={handleSubmit} 
                handleChange={handleChange}
            />
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