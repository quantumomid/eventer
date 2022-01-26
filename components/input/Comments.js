import { useEffect, useState } from "react";
import styles from "./Comments.module.css";
import CommentList from "./CommentList";
import NewComment from "./NewComment";

const Comments = ({ eventID }) => {
    // console.log({eventID});
    const [ showComments, setShowComments ] = useState(false);
    const [ comments, setComments ] = useState([]);

    useEffect(async() => {
        const fetchComments = async () => {
            const response = await fetch("/api/comments/"+eventID);
            const data = await response.json();
            return data.comments;
        }
        if(showComments) {
            const commmentsData = await fetchComments();
            setComments(commmentsData);
        }
    }, [showComments]);

    const toggleCommentsHandler = () => {
        setShowComments(prevState => !prevState);
    }

    const addCommentHandler = async (commentData) => {
        // send data to API
        const postResponse = await fetch(`/api/comments/${eventID}`, {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await postResponse.json();
        // console.log({data});
    }

    return (
        <section className={styles.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList comments={comments} />} 
        </section>
    )
}

export default Comments;