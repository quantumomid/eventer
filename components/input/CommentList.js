import styles from "./CommentList.module.css";

const CommentList = ({ comments }) => {
    return (
        <ul className={styles.comments}>
        {/* Render list of comments - fetched from API */}
            { comments ?
                comments.map(comment => (
                    <li key={comment._id}>
                        <p>{comment.text}</p>
                        <div>
                            By <address>{comment.name}</address>
                        </div>
                    </li>
                ))
                : <p>No comments for this event.</p>
            }
        </ul>
    )
}

export default CommentList;