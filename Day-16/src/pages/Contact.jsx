import React, { useState } from 'react';
import './Pages.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="page contact-page">
      <div className="container">
        <header className="page-header">
          <span className="sub-title">Get in Touch</span>
          <h1>Contact Engineering Support & Inquiries</h1>
          <p>Have questions about hardware specs, bulk team discounts, or internship mentorship? Drop a note below.</p>
        </header>

        <div className="contact-layout">
          {/* Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-box">
                <span className="success-icon">📨</span>
                <h3>Message Received!</h3>
                <p>Thank you <strong>{formData.name}</strong>. Our engineering team has received your inquiry and will respond within 24 hours.</p>
                <button className="btn btn-secondary mt-3" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder="Safal Shrestha"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder="safal@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subj">Inquiry Subject</label>
                  <select
                    id="contact-subj"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="general">General Question</option>
                    <option value="hardware">Hardware Compatibility</option>
                    <option value="internship">Internship Code Review</option>
                    <option value="orders">Bulk Team Order</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-msg">Message Content <span className="req">*</span></label>
                  <textarea
                    id="contact-msg"
                    rows="4"
                    required
                    placeholder="Type your message, question, or suggestions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Submit Inquiry &rarr;
                </button>
              </form>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="contact-info-card">
            <h3>Office & Mentorship Hub</h3>
            <ul className="info-list">
              <li>
                <strong>📍 Location:</strong>
                <span>Tinkune, Kathmandu, Nepal</span>
              </li>
              <li>
                <strong>📧 Email:</strong>
                <span>shresthasafal12345@gmail.com</span>
              </li>
              <li>
                <strong>⏱️ Daily Office Routine:</strong>
                <span>7h 5m Daily Learning & Code Implementation</span>
              </li>
              <li>
                <strong>💻 GitHub Repository:</strong>
                <a href="https://github.com/safalshrestha456/Daily-Task" target="_blank" rel="noopener noreferrer">
                  github.com/safalshrestha456/Daily-Task
                </a>
              </li>
            </ul>

            <div className="router-tip-box">
              <h4>💡 React Router Note:</h4>
              <p>Submitting this form does NOT reload the browser page. React state manages user inputs while client-side routing preserves navigation history.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
