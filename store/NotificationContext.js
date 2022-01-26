import { createContext } from "react";


const NotificationContext = createContext({
    notification: null, // { title, message, status }
    showNotification: () => {},
    hideNotification: () => {}
});

// Higher Order Component to provider context to a component
export const NotificationContextProvider = ({ children }) => {
   return (
       <NotificationContext.Provider>
           { children }
       </NotificationContext.Provider>
   ) 
}

export default NotificationContext;