import { useEffect, useState } from "react";
import { useUser } from '../context/UserContext';

function BackOffice() {

    const { user } = useUser();
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewedIssues, setViewedIssues] = useState([]);

    useEffect(() => {
        console.log("useEffect is running");
        // Load viewed issues from localStorage
        const storedViewedIssues = sessionStorage.getItem('viewedIssues');
        if (storedViewedIssues) {
            setViewedIssues(JSON.parse(storedViewedIssues));
        }

        const fetchIssues = async () => {
            try {
                const response = await fetch("/api/issues", {
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    setIssues(data);
                    console.log("Issues:", data);
                } else {
                    console.error("Failed to fetch issues");
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIssues();
    }, []);

    // Function to handle viewing an issue
    function handleIssueView(issueId) {
        if (!viewedIssues.includes(issueId)) {
            const updatedViewedIssues = [...viewedIssues, issueId];
            setViewedIssues(updatedViewedIssues);
            sessionStorage.setItem('viewedIssues', JSON.stringify(updatedViewedIssues));
        }
    };

    if (isLoading) {
        return <div className="backoffice-container">Loading...</div>;
    }

    return (
        <div className="backoffice-container">
            <h1>{user.company} CRM Dashboard</h1>
            <p>Welcome, {user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}!</p>
            <div className="backoffice-header">
                <div className="user-info">
                    <p>Email: {user.email}</p>
                    <p>Company: {user.company}</p>
                    <p>Role: {user.role}</p>
                </div>
            </div>
            <h2>Support Issues ({issues.length})</h2>
            <ul className="issues-list">
                {issues.map(issue => (
                    <li
                        key={issue.id}
                        className="issue-card"
                        onClick={() => handleIssueView(issue.id)}
                    >
                        <div className="issue-header">
                            <span className="issue-id">Issue #{issue.id}</span>
                            <span className="issue-id">Status: {issue.isResolved ? "Resolved" : "Pending"}</span>
                            {!viewedIssues.includes(issue.id) && (
                                <span className="issue-status">New</span>
                            )}
                        </div>
                        <div className="issue-email">{issue.sender_email}</div>
                        <div className="issue-company">{issue.company}</div>
                        <div className="issue-subject">{issue.subject}</div>
                        <textarea
                            className="issue-message"
                            defaultValue={issue.message}
                            readOnly
                            rows={4}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BackOffice;