import { useState } from 'react';
import * as reportService from '../../services/reportService';
import './CommentForm.css';

const CommentForm = ({ reportId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      setSubmitting(true);
      await reportService.addComment(reportId, newComment);

      setNewComment('');
      const updatedComments = await reportService.getComments(reportId);
      onCommentAdded(updatedComments);

    } catch (err) {
      console.error('Submit comment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="comment-form">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="comment-input"
      />
      <button 
        type="submit" 
        className="submit-comment-btn"
        //i used .trim to remove espace from both ends of the comment
        //also the button should be disabled if the comment is empty or only has space
        disabled={submitting || !newComment.trim()}
      >
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
