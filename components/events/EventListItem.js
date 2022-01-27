import Image from "next/image";
import Button from "../ui/Button";
import styles from "./EventListItem.module.css";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import DateIcon from "../icons/DateIcon";

const EventListItem = ({ item }) => {

    const humanReadableDate = new Date(item.date).toLocaleDateString("en-gb", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const formattedAddress = item.location.replace(", ", "\n");

    const exploreLink = `/events/${item.id}`;

    return (
        <li className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image src={item.image} alt={item.title} height={240} width={240} layout="responsive" objectFit="cover"/>
            </div>
            <article className={styles.content}>
                <div className={styles.summary}>
                    <h2>{ item.title }</h2>
                    <div className={styles.date}>
                        <DateIcon />
                        <time>{ humanReadableDate }</time>
                    </div>
                    <div className={styles.address}>
                        <AddressIcon />
                        <address>{ formattedAddress }</address>
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button href={exploreLink}>
                        <span>Explore Event</span>
                        <span className={styles.icon}><ArrowRightIcon /></span>
                    </Button>
                </div>
            </article>
        </li>
    )
}

export default EventListItem;