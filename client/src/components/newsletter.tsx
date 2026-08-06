import { useState } from "react";

type SubmitStatus = "idle" | "success" | "error";

export default function FoodCartNewsletterSignup() {
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const wordCount = getWordCount(message);
  const maxWords = 250;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    const newWordCount = getWordCount(newMessage);

    if (newWordCount <= maxWords) {
      setMessage(newMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "d0ab3f69-c768-41ff-bbd6-00065de0dca8",
          name: name,
          email: email,
          subject: inquiryType,
          message: message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setName("");
        setInquiryType("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-cta-section">
      <div className="contact-form-container relative">
        <div className="cta-head">
          <h2 className="contact-cta-title">Get in touch.</h2>
          <p className="contact-cta-description">
            Own a cart and want to be listed? Spotted an outdated hours or menu? Tell us.
          </p>
        </div>

        <div className="contact-form-card">
          <div className="ticket-perf"></div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-row">
              <div className="form-field">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="inquiryType" className="form-label">Inquiry Type</label>
                <select
                  id="inquiryType"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Select an option…</option>
                  <option value="Add my cart">Add my cart</option>
                  <option value="General question">General question</option>
                  <option value="Report issue">Report issue</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                className="form-textarea"
                rows={6}
                required
              />
              <div className="word-counter">
                <span className={wordCount >= maxWords ? "word-counter-over" : "word-counter-normal"}>
                  {wordCount}/{maxWords} words
                </span>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Submit"}
            </button>
          </form>
        </div>

        {status !== "idle" && (
          <div className={`contact-note ${status}`}>
            {status === "success"
              ? "Message sent — we'll get back to you soon."
              : "Failed to send — please try again later."}
          </div>
        )}
      </div>
    </section>
  );
}
