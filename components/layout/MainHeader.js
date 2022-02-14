import Link from "next/link";
import styles from "./MainHeader.module.css";

const MainHeader = () => (
    <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/"><a>Next Events</a></Link>
        </div>
        <nav className={styles.navigation}>
            <ul>
                <li>
                    <Link href="/events"><a>All Events</a></Link>
                </li>
                <li>
                    <Link href="/sign-in"><a>Sign In</a></Link>
                </li>
            </ul>
        </nav>
    </header>
)

export default MainHeader;