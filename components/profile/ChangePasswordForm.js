import { useContext, useRef } from "react";
import NotificationContext from "../../store/NotificationContext";
import styles from "./ChangePasswordForm.module.css";

const ChangePasswordForm = ({ handlePasswordChange }) => {
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();

    const notificationCtx = useContext(NotificationContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        // trigger notification to show pending state
        notificationCtx.showNotification({
          title: "Changing password.....",
          message: "Attempting to change your password.",
          status: "pending"
        });

        const enteredOldPassword = oldPasswordRef.current.value;
        const enteredNewPassword = newPasswordRef.current.value;
        const enteredConfirmNewPassword = confirmNewPasswordRef.current.value;

        if(enteredNewPassword !== enteredConfirmNewPassword) {
          notificationCtx.showNotification({
            title: "Error!",
            message: "Passwords do not match - please try again :(",
            status: "error"
          });
          throw Error("Passwords do not match - please try again");
        }

        try {
          handlePasswordChange({ 
            oldPassword: enteredOldPassword,
            newPassword: enteredNewPassword
          });

          notificationCtx.showNotification({
            title: "Password changed!",
            message: "Password was changed successfully.",
            status: "success"
          });
        } catch (error) {
          notificationCtx.showNotification({
            title: "Error!",
            message: result.error || "Something went wrong :(",
            status: "error"
        });
        }

        // Reset inputs
        oldPasswordRef.current.value = "";
        newPasswordRef.current.value = "";
        confirmNewPasswordRef.current.value = "";

    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.control}>
            <label htmlFor="old-password">Old Password</label>
            <input type="password" id="old-password" ref={oldPasswordRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" ref={newPasswordRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="confirm-new-password">Confirm New Password</label>
            <input type="password" id="confirm-new-password" ref={confirmNewPasswordRef} />
          </div>
          <div className={styles.action}>
            <button>Change Password</button>
          </div>
        </form>
      );
}

export default ChangePasswordForm;