import classes from './EventSummary.module.css';

const EventSummary = ({ title }) => (
  <section className={classes.summary}>
    <h1>{title}</h1>
  </section>
);


export default EventSummary;