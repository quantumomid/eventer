import styles from "./Notification.module.css";

const Notification = ({ title, message, status }) => {

    let statusStyles = "";

    if (status === "success") {
        statusStyles = styles.success;
    }

    if (status === "error") {
        statusStyles = styles.error;
    }

    if (status === "pending") {
        statusStyles = styles.pending;
    }

    const activeStyles = `${styles.notification} ${statusStyles}`;

    return (
        <div className={activeStyles} /*onClick={notificationCtx.hideNotification}*/>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    )
}

export default Notification;