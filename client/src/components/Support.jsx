import { useState, useEffect } from "react";

function Support() {
    const [companies, setCompanies] = useState([]);
    const [sender_email, setSender_email] = useState("");
    const [subject, setSubject] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch("/api/companies");
                if (response.ok) {
                    const data = await response.json();
                    setCompanies(data);
                } else {
                    console.error("Failed to fetch companies");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchCompanies();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/issues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sender_email, subject, company, message })
            });

            if (response.ok) {
                console.log("Issue submitted!");
                setIsSubmitted(true);
            } else {
                console.error("Failed to submit issue");
            }
        } catch (error) {
            console.error("Error submitting issue:", error);
        }
    };

    const handleClose = () => {
        setIsSubmitted(false);
        // Clear form
        setSender_email("");
        setSubject("");
        setCompany("");
        setMessage("");
    };

    return (
        <div className="support-container">
            <h1>Support</h1>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <select
                            id="company"
                            value={company}
                            onChange={(event) => setCompany(event.target.value)}
                            required
                        >
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Issue</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sender_email">Email</label>
                        <input
                            type="email"
                            id="sender_email"
                            value={sender_email}
                            onChange={(event) => setSender_email(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div className="submission-message">
                    <h2>Issue submitted!</h2>
                    <div className="submission-details">
                        <p><strong>Subject:</strong> {subject}</p>
                        <p><strong>Company:</strong> {
                            companies.find(c => c.id === parseInt(company))?.name
                        }</p>
                        <p><strong>Message:</strong> {message}</p>
                        <p><strong>Email:</strong> {sender_email}</p>
                    </div>
                    <p>Thank you!</p>
                    <button onClick={handleClose}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Support;