import React, { useEffect, useState } from "react";
import "./FeedbackTable.css";  // ✅ external CSS

function FeedbackTable() {
  const [feedbacks, setFeedbacks] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/contact/all", {
    headers: {
      "x-admin-secret": "myStrongPassword123" // must match .env
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("🔍 Response from backend:", data); // 👈 add this
      if (data.success) {
        setFeedbacks(data.data);
      }
    })
    .catch((err) => console.error("Error fetching feedbacks:", err));
}, []);



  return (
    <div className="feedback-container">
      <h2>Feedback Entries</h2>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb._id}>
              <td>{fb.name}</td>
              <td>{fb.email}</td>
              <td>{fb.message}</td>
              <td>
                {fb.createdAt
                  ? new Date(fb.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackTable;
