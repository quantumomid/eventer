import { useRef, useState } from "react";
import styles from "./NewComment.module.css";

const NewComment = ({ onAddComment }) => {
    const [isInvalid, setIsInvalid] = useState(false);
    
    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const commentInputRef = useRef();

    const handleComment = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredComment = commentInputRef.current.value;
    
        if (
          !enteredEmail ||
          enteredEmail.trim() === '' ||
          !enteredEmail.includes('@') ||
          !enteredName ||
          enteredName.trim() === '' ||
          !enteredComment ||
          enteredComment.trim() === ''
        ) {
          setIsInvalid(true);
          return;
        }
    
        onAddComment({
          email: enteredEmail,
          name: enteredName,
          text: enteredComment,
        });

        // resetting the form 
        emailInputRef.current.value = "";
        nameInputRef.current.value = "";
        commentInputRef.current.value = "";
    }

    return (
        <form className={styles.form} onSubmit={handleComment}>
            <div className={styles.row}>
                <div className={styles.control}>
                    <label htmlFor='email'>Your email</label>
                    <input type='email' id='email' ref={emailInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='name'>Your name</label>
                    <input type='text' id='name' ref={nameInputRef} />
                </div>
            </div>
            <div className={styles.control}>
                <label htmlFor='comment'>Your comment</label>
                <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
            </div>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button>Submit</button>
      </form>
    )
}

export default NewComment;