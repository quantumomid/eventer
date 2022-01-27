import { useContext, useRef } from "react";
import styles from "./NewsletterRegistration.module.css";
import NotificationContext from "../../store/NotificationContext";

const NewsletterRegistration = () => {

    const notificationCtx = useContext(NotificationContext);

    // use REF since we are only accessing the email input once i.e.
    // during submission
    const emailRef = useRef();

    const registrationHandler = async (event) => {
        event.preventDefault();
    
        // fetch user input (state or refs)
        const enteredEmail = emailRef.current.value;
        
        // trigger notification to show pending state
        notificationCtx.showNotification({
            title: "Signing up.....",
            message: "Registering for newsletter.",
            status: "pending"
        });

        try {
            // send valid data to API
            const postResponse = await fetch("/api/newsletter", {
                method: "POST",
                body: JSON.stringify({email: enteredEmail}),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await postResponse.json();

            // This is to account for status code errors which are NOT
            // always catched by the try-catch block
            if(!postResponse.ok) throw Error(data.message);

            notificationCtx.showNotification({
                title: "Signed up!",
                message: "Registered successfully.",
                status: "success"
            });
        } catch (error) {
            notificationCtx.showNotification({
                title: "Error!",
                message: error.message || "Something went wrong :(",
                status: "error"
            });
        }
        
        emailRef.current.value = "";
    }

    return (
        <section className={styles.newsletter}>
            <h1>Sign up to stay updated!</h1>
            <form onSubmit={registrationHandler} className={styles.form}>
                <input
                    type='email'
                    id='email'
                    ref={emailRef}
                    placeholder='Your email'
                    aria-label='Your email'
                />
                <button>Register</button>
            </form>
        </section>
    )
}

export default NewsletterRegistration;