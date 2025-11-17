import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as reportService from '../../services/reportService';
import CommentForm from '../CommentForm/CommentForm';
import Footer from '../Footer/Footer';
import './ReportShow.css';

const ReportShow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await reportService.show(id);
        if (data.err) {
          setError(data.err);
        } else {
          setReport(data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await reportService.getComments(id);
        if (data.err) {
          setError(data.err);
        } else {
          setReport((prev) => ({ ...prev, comments: data }));
        }
      } catch (err) {
        console.error('Comments fetch error:', err);
        setError(err.message);
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentAdded = (comments) => {
    setReport((prev) => ({ ...prev, comments }));
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await reportService.deleteReport(report._id);
      navigate('/community');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete report');
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = () => {
    navigate(`/reports/${report._id}/edit`);
  };

  if (loading) return <p className="loading">Loading report...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!report) return <p className="error-message">Report not found</p>;

  return (
    <>
    <main className='main'>
    <div className="report-show-container">
      <button className="back-btn" onClick={() => navigate('/community')}>
        ← Back to Reports
      </button>

      <div className="report-show">
        <h1>{report.title}</h1>

        {user && report.author && user._id === report.author._id && (
            <div className="action-buttons">
            <button className="update-btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="delete-btn" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
            </div>
        )}

        <div className="report-details">
            <div className="detail-row">
            <strong>Author:</strong>
            <span>{report.author?.name || 'Unknown'}</span>
            </div>
            <div className="detail-row">
            <strong>Area:</strong>
            <span>{report.area || report.areaName}</span>
            </div>
            <div className="detail-row">
            <strong>Type:</strong>
            <span>{report.type}</span>
            </div>
          {user && report.author && user._id === report.author._id && (
              <div className="detail-row">
              <strong>Status:</strong>
              <span className={`report-status status-${report.status}`}>{report.status}</span>
        </div>
          )}
        </div>

        <div className="show-report-description">
          <h2>Description</h2>
          <p>{report.description}</p>
        </div>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        <CommentForm reportId={id} onCommentAdded={handleCommentAdded} />
        {report.comments && report.comments.length > 0 ? (
          <div className="comments-grid">
            {report.comments.map((comment) => (
                <div key={comment._id} className="comment">
                <p><strong>{comment.user_id?.name || 'Anonymous'}</strong></p>
                <p className="comment-text">{comment.comment_text}</p>
                <p className="comment-date">{comment.created_at}</p>
                </div>
             ))}
          </div>
          ) : (
          <p>No comments available.</p>
          )}
      </div>
    </div>
    </main>
        <Footer />
    </>
  );
};

export default ReportShow;
