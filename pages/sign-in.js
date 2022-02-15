import { useState } from "react";
import { useRouter } from "next/router";
import SignInForm from "../components/sign-in/SignInForm";
import styles from "../styles/SignInPage.module.css";
import { signIn } from "next-auth/client";

const createUser = async (email, password) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
  
    return data;
}

const SignInPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formInputs, setFormInputs] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const router = useRouter();

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Check whether logging in or registering
        if (isLogin){
            //Sign in user
            // console.log("Attempt Log in");
            const result = await signIn("credentials", {
                redirect: false,
                email: formInputs.email,
                password: formInputs.password,
            });
            // console.log(result);

            //Success - then redirect to profile page
            if (!result.error) {
                // set some auth state
                router.replace("/profile");
            }

        } else {
            // Register

            if (formInputs.password !== formInputs.confirmPassword){
                throw Error("Passwords do not match");
            }

            try {
                const result = await createUser(formInputs.email, formInputs.password);
                console.log(result);
              } catch (error) {
                console.log(error);
            }
        }
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