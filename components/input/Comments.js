import { useContext, useEffect, useState } from "react";
import styles from "./Comments.module.css";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import NotificationContext from "../../store/NotificationContext";

const Comments = ({ eventID }) => {
    const notificationCtx = useContext(NotificationContext);
    const [ showComments, setShowComments ] = useState(false);
    const [ comments, setComments ] = useState([]);
    const [ isFetchingComments, setIsFetchingComments ] = useState(false);

    useEffect(async() => {
        const fetchComments = async () => {
            const response = await fetch("/api/comments/"+eventID);
            const data = await response.json();
            return data.comments;
        }
        if(showComments) {
            setIsFetchingComments(true);
            const commmentsData = await fetchComments();
            setComments(commmentsData);
            setIsFetchingComments(false);
        }
    }, [showComments]);

    const toggleCommentsHandler = () => {
        setShowComments(prevState => !prevState);
    }

    const addCommentHandler = async (commentData) => {
        notificationCtx.showNotification({
            title: "Posting comment.....",
            message: "Adding comment to database.",
            status: "pending"
        });

        try {
            // send data to API
            const postResponse = await fetch(`/api/comments/${eventID}`, {
                method: "POST",
                body: JSON.stringify(commentData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await postResponse.json();

            // This is to account for status code errors which are NOT
            // always catched by the try-catch block
            if(!postResponse.ok) throw Error(data.message);

            notificationCtx.showNotification({
                title: "Comment submitted!",
                message: "Your comment has been successfully added!",
                status: "success"
            });
        } catch (error) {
            notificationCtx.showNotification({
                title: "Error!",
                message: error.message,
                status: "error"
            });
        }
    }

    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {(showComments && !isFetchingComments) && <CommentList comments={comments} />} 
            {(showComments && isFetchingComments) && <p>Loading....</p>} 
        </section>
    )
}

export default Comments;