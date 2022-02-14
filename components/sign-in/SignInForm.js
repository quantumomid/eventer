import styles from "./SignInForm.module.css";

const LogInForm = ({ isLogin, formInputs, handleChange, handleSubmit }) => {
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.control}>
                <label htmlFor='email'>Your Email</label>
                <input name="email" type='email' id='email' value={formInputs.email} onChange={handleChange} required />
            </div>
            <div className={styles.control}>
                <label htmlFor='password'>Your Password</label>
                <input name="password" type='password' id='password' value={formInputs.password} onChange={handleChange} required />
            </div>
            {
                !isLogin
                    &&
                <div className={styles.control}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input name="confirmPassword" type='password' id='confirmPassword' value={formInputs.confirmPassword} onChange={handleChange} required />
                </div>
            }
            <button type="submit" className={styles.button}>{isLogin ? 'Login' : 'Create Account'}</button>
        </form>
    )
}

export default LogInForm;