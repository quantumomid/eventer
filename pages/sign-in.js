import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignInForm from "../components/sign-in/SignInForm";
import styles from "../styles/SignInPage.module.css";
import { signIn } from "next-auth/client";
import NotificationContext from "../store/NotificationContext";
import { getSession } from "next-auth/client";

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
    const notificationCtx = useContext(NotificationContext);
    const [isLogin, setIsLogin] = useState(true);
    const [formInputs, setFormInputs] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      getSession().then((session) => {
        if (session) {
          router.replace("/");
        } else {
          setIsLoading(false);
        }
      });
    }, [router]);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }

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

            // trigger notification to show pending state
            notificationCtx.showNotification({
                title: "Signing in.....",
                message: "Logging you in.",
                status: "pending"
            });

            const result = await signIn("credentials", {
                redirect: false,
                email: formInputs.email,
                password: formInputs.password,
            });
            // console.log(result);

            //Success - then redirect to profile page
            if (!result.error) {
                notificationCtx.showNotification({
                    title: "Logged in!",
                    message: "Sign in was successfully.",
                    status: "success"
                });
                // set some auth state
                router.replace("/profile");
            } else {
                notificationCtx.showNotification({
                    title: "Error!",
                    message: result.error || "Something went wrong :(",
                    status: "error"
                });
            }

        } else {
            // Register

            if (formInputs.password !== formInputs.confirmPassword){
                throw Error("Passwords do not match");
            }

            // trigger notification to show pending state
            notificationCtx.showNotification({
                title: "Registering.....",
                message: "We are attempting to register you as a user.",
                status: "pending"
            });

            try {
                const result = await createUser(formInputs.email, formInputs.password);
                notificationCtx.showNotification({
                    title: "Signed up!",
                    message: "Your registration was successful ☺.",
                    status: "success"
                });
                router.reload();
              } catch (error) {
                // console.log(error);
                notificationCtx.showNotification({
                    title: "Error!",
                    message: error.message || "Something went wrong 😭",
                    status: "error"
                });
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