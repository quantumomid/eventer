import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import styles from "./MainHeader.module.css";

const MainHeader = () => {
    const [session, loading] = useSession();
    // console.log(session);
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/"><a>Eventer</a></Link>
            </div>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <Link href="/events"><a>All Events</a></Link>
                    </li>
                    {
                        (!session && !loading) 
                            ?
                        <li>
                            <Link href="/sign-in"><a>Sign In</a></Link>
                        </li>
                            :
                        <>
                            <li>
                                <Link href="/profile"><a>Profile</a></Link>
                            </li>
                            <li>
                                <button onClick={signOut}>Logout</button>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;