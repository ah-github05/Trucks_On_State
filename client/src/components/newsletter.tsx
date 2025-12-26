import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function FoodCartNewsletterSignup() {
  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
    if (!name || !inquiryType || !email || !message) {
      toast({
        title: "All fields required",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

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
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as we can.",
        });
        setName("");
        setInquiryType("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="contact-form-container relative">
        <div className="contact-form-card">
          <h2 className="contact-form-title">Contact Us</h2>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-field">
              <label htmlFor="name" className="form-label">Name</label>
              <Input
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
                className="form-input h-12"
                required
              >
                <option value="">Select an option...</option>
                <option value="Add my cart">Add my cart</option>
                <option value="General question">General question</option>
                <option value="Report issue">Report issue</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
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
              <Textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                className="form-textarea"
                rows={6}
                required
              />
              <div className="word-counter">
                <span className={wordCount > maxWords ? "word-counter-over" : "word-counter-normal"}>
                  {wordCount}/{maxWords} words
                </span>
              </div>
            </div>

            <div className="form-submit">
              <Button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
