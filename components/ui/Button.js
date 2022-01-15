import Link from "next/link";
import styles from "./Button.module.css";

const Button = ({ children, href, handleClick }) => {
    if(href){
        return (
            <Link href={href}>
                <a className={styles.btn}>
                    { children }
                </a>
            </Link>
        )
    }

    return (
        <button className={styles.btn} onClick={handleClick}>
            { children }
        </button>
    )
}

export default Button;