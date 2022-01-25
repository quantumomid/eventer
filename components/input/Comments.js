import { useState } from "react";
import styles from "./Comments.module.css";
import CommentList from "./CommentList";
import NewComment from "./NewComment";

const Comments = ({ eventID }) => {
    console.log({eventID});
    const [ showComments, setShowComments ] = useState(false);

    const toggleCommentsHandler = () => {
        setShowComments(prevState => !prevState);
    }

    const addCommentHandler = (commentData) => {
        // send data to API
    }

    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList />} 
        </section>
    )
}

export default Comments;