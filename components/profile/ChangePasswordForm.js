import { useRef } from "react";
import styles from "./ChangePasswordForm.module.css";

const ChangePasswordForm = (event) => {
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();

    const handleSubmit = () => {
        event.preventDefault();

        const enteredOldPassword = oldPasswordRef.current.value;
        const enteredNewPassword = newPasswordRef.current.value;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.control}>
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" ref={newPasswordRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="old-password">Old Password</label>
            <input type="password" id="old-password" ref={oldPasswordRef} />
          </div>
          <div className={styles.action}>
            <button>Change Password</button>
          </div>
        </form>
      );
}

export default ChangePasswordForm;