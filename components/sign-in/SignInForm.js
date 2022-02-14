import styles from "./SignInForm.module.css";

const LogInForm = ({ isLogin }) => {
    return (
        <form className={styles.form}>
            <div className={styles.control}>
                <label htmlFor='email'>Your Email</label>
                <input type='email' id='email' required />
            </div>
            <div className={styles.control}>
                <label htmlFor='password'>Your Password</label>
                <input type='password' id='password' required />
            </div>
            {
                !isLogin
                    &&
                <div className={styles.control}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' required />
                </div>
            }
        </form>
    )
}

export default LogInForm;