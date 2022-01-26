import { useRef } from "react";
import styles from "./NewsletterRegistration.module.css";

const NewsletterRegistration = () => {

    // use REF since we are only accessing the email input once i.e.
    // during submission
    const emailRef = useRef();

    const registrationHandler = async (event) => {
        event.preventDefault();
    
        // fetch user input (state or refs)
        const enteredEmail = emailRef.current.value;
        // optional: validate input
        // send valid data to API

        const postResponse = await fetch("/api/newsletter", {
            method: "POST",
            body: JSON.stringify({email: enteredEmail}),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await postResponse.json();
        // console.log({data});
        emailRef.current.value = "";
    }

    return (
        <section className={styles.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={styles.control}>
                    <input
                        type='email'
                        id='email'
                        ref={emailRef}
                        placeholder='Your email'
                        aria-label='Your email'
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    )
}

export default NewsletterRegistration;