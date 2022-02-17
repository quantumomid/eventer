import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import styles from "../styles/ProfilePage.module.css";
import { getSession } from "next-auth/client";

// Server side page guards (see client side alternative below)
// Advantage: allows us to prevent the UserProfilePage loading, 
// whereas in the client side guard case further below - the page loads
// even if momentarily before being redirected!
export const getServerSideProps = async (context) => {
    const session = await getSession({ req: context.req })
    // console.log(context.req);
    // console.log(session);

    if (!session) {
        return {
          redirect: {
            destination: "/sign-in",
            permanent: false,
          },
        };
    }

    return {
        props: { session },
    }
}

const ProfilePage = () => {

    // Client side page guards (Alternative to above)
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //   getSession().then((session) => {
    //     if (!session) {
    //       window.location.href = "/sign-in";
    //     } else {
    //       setIsLoading(false);
    //     }
    //   });
    // }, []);

    // if (isLoading) {
    //   return <p className={styles.profile}>Loading...</p>;
    // }

    const handlePasswordChange = async (passwordData) => {
        const response = await fetch('/api/user/change-password', {
            method: 'PATCH',
            body: JSON.stringify(passwordData),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        // console.log(response.ok);
        const data = await response.json();
        // console.log(data.message);

        // Need to throw error now at front end(not at back end - otherwise this messes up backend)
        // This is then catched in the try-catch in the ChangePasswordForm component!
        if(!response.ok) {
            throw new Error(data.message || "Something went wrong - please try again");
        }
        return data;
    }

    return (
        <section className={styles.profile}>
            <h1>Profile Page</h1>
            <ChangePasswordForm handlePasswordChange={handlePasswordChange} />
        </section>
    )
}

export default ProfilePage;