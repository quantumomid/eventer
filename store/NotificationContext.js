import { createContext, useState } from "react";

const NotificationContext = createContext({
    notification: null, // { title, message, status }
    showNotification: (notificationData) => {},
    hideNotification: () => {}
});

// Higher Order Component to provider context to a component
export const NotificationContextProvider = ({ children }) => {
    const [ activeNotification, setActiveNotification ] = useState();

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData);
    }

    const hideNotificationHandler = () => {
        setActiveNotification(null);
    }

    // create context which we can pass to other components in the app
    // to have access to the notification data and the two methods
    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    }

    return (
        <NotificationContext.Provider value={context}>
            { children }
        </NotificationContext.Provider>
    ) 
}

export default NotificationContext;