import classes from "./EventContent.module.css";

const EventContent = ({children}) => (
  <section className={classes.content}>
    {children}
  </section>
);

export default EventContent;