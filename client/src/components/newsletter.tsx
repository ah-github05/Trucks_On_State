import { useState } from "react";

type SubmitStatus = "idle" | "success" | "error";

const INQUIRY_OPTIONS = [
  { value: "Add my cart", label: "Add my cart" },
  { value: "General question", label: "General question" },
  { value: "Report issue", label: "Report issue" },
] as const;

const REACH_OUT_WAYS = [
  {
    title: "Add my cart",
    description: "Run a food cart in Madison? Get your hours, menu, and location listed.",
  },
  {
    title: "General question",
    description: "Something about the map, the site, or the cart scene. We read everything.",
  },
  {
    title: "Report an issue",
    description: "Wrong hours, an outdated menu, or a cart that's gone? Flag it and we'll fix it.",
  },
] as const;

export default function FoodCartNewsletterSignup() {
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [inquiryError, setInquiryError] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // The inquiry picker is a button group, not a form control, so native
    // validation can't see it. Flag it alongside the native pass rather than
    // returning early — otherwise an empty form surfaces its errors one at a time.
    const missingInquiry = !inquiryType;
    setInquiryError(missingInquiry);

    const nativeFieldsValid = e.currentTarget.reportValidity();

    // `required` treats "   " as filled, so check the trimmed values too.
    const hasAllFields = name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

    if (!nativeFieldsValid || missingInquiry || !hasAllFields) {
      return;
    }

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
      <div className="contact-container">
        <div className="contact-grid">
          <div className="contact-ways">
            <h2 className="contact-ways-title">How to reach out</h2>
            <ul className="contact-ways-list">
              {REACH_OUT_WAYS.map((way) => (
                <li key={way.title} className="contact-way">
                  <h3 className="contact-way-title">{way.title}</h3>
                  <p className="contact-way-description">{way.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-form-card">

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
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <span className="form-label" id="inquiryType-label">Inquiry Type</span>
                <div
                  className="inquiry-picker"
                  role="radiogroup"
                  aria-labelledby="inquiryType-label"
                  aria-invalid={inquiryError}
                >
                  {INQUIRY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={inquiryType === option.value}
                      className={`inquiry-chip ${inquiryType === option.value ? "is-selected" : ""}`}
                      onClick={() => {
                        setInquiryType(option.value);
                        setInquiryError(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {inquiryError && (
                  <span className="inquiry-error" role="alert">Pick one so we know where to route it.</span>
                )}
              </div>

              <div className="ticket-perf"></div>

              <div className="form-field form-field-message">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={handleMessageChange}
                  className="form-textarea"
                  rows={6}
                  placeholder="What's going on with the cart scene?"
                  required
                />
                <div className="word-counter">
                  <span className={wordCount >= maxWords ? "word-counter-over" : "word-counter-normal"}>
                    {wordCount}/{maxWords} words
                  </span>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? "Sending…" : "Send message"}
              </button>

              {status !== "idle" && (
                <div className={`contact-note ${status}`} role="status">
                  <span className="contact-note-dot" aria-hidden="true"></span>
                  {status === "success"
                    ? "Message sent — we'll get back to you soon."
                    : "Failed to send — please try again later."}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
