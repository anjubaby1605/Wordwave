import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStoryActivityLogs } from '../../api/logsApi';
import { format } from 'date-fns';

const UserActivity = () => {
  const { id: storyId } = useParams();
  const [activityData, setActivityData] = useState({
    logs: [],
    story: { title: 'Story' }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getStoryActivityLogs(storyId);
        setActivityData(data);
      } catch (err) {
        console.error('Failed to fetch activity logs:', err);
        setError(err.message || 'Failed to load activity logs');
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [storyId]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading activity logs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Error Loading Activity</h4>
          <p>{error}</p>
          <Link to={`/stories/${storyId}`} className="btn btn-outline-danger">
            Back to Story
          </Link>
        </div>
      </div>
    );
  }
console.log("Activity data- ", activityData);
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Activity Log: {activityData.storyTitle}</h2>
        <Link to={`/stories/${storyId}`} className="btn btn-outline-primary">
          ← Back to Story
        </Link>
      </div>

      {activityData.logs.length === 0 ? (
        <div className="alert alert-info">
          No activity recorded for this story yet.
        </div>
      ) : (
        <div className="list-group">
          {activityData.logs.map(log => (
            <div key={log._id} className="list-group-item mb-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-1">
                    <span className={`badge bg-${getActionColor(log.action)} me-2`}>
                      {log.action.toUpperCase()}
                    </span>
                    {log.user?.username || 'Unknown'}
                  </h5>
                  <small className="text-muted">
                    {format(new Date(log.timestamp), 'MMM dd, yyyy h:mm a')}
                  </small>
                </div>
              </div>

              {log.changes && Object.keys(log.changes).length > 0 && (
                <div className="mt-3">
                  <h6>Changes:</h6>
                  <div className="card">
                    <div className="card-body p-2">
                      <pre className="mb-0">
                        {JSON.stringify(log.changes, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to determine badge color based on action type
const getActionColor = (action) => {
  switch (action.toLowerCase()) {
    case 'edit': return 'warning';
    case 'view': return 'info';
    default: return 'secondary';
  }
};

export default UserActivity;