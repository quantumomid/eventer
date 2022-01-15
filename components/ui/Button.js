import Link from "next/link";
import styles from "./Button.module.css";

const Button = ({ children, href }) => {
    return (
        <Link href={href}>
            <a className={styles.btn}>
                { children }
            </a>
        </Link>
    )
}

export default Button;