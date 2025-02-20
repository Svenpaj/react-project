import { useState } from "react";

const CommentList = ({ comments }) => {
    const [currentUser] = useState('Max');

    const toggleLike = (commentId) => {
        setCommentData((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId ? {
                    ...comment,
                    likedBy: comment.likedBy.includes(currentUser)
                        ? comment.likedBy.filter((user) => user !== currentUser) : [...comment.likedBy, currentUser],
                }
                    : comment
            )
        );
    };

    const [commentData, setCommentData] = useState(comments);

    return (
        <div>
            {commentData.map((comment) => (
                <div
                    key={comment.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                    }}
                >
                    <p>{comment.text}</p>
                    <p>
                        Gillad av: {comment.likedBy.length}{' '}
                        {comment.likedBy.length === 1 ? 'person' : 'personer'}
                    </p>
                    <button onClick={() => toggleLike(comment.id)}>
                        {comment.likedBy.includes(currentUser) ? 'Sluta gilla' : 'Gilla'}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default CommentList;