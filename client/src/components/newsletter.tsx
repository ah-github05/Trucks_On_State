
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function FoodTruckContactForm() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const { toast } = useToast();

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const messageWordCount = getWordCount(contactMessage);
  const maxMessageWords = 250;

  const handleContactMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    const newWordCount = getWordCount(newMessage);
    
    if (newWordCount <= maxMessageWords) {
      setContactMessage(newMessage);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast({
        title: "All fields required",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate message submission
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as we can.",
    });
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <section className="contact-form-section">
      <div className="hero-overlay"></div>
      <div className="contact-form-container relative">
        <div className="contact-form-card">
          <h2 className="contact-form-title">Contact Us</h2>
          
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-field">
              <label htmlFor="contact-name" className="form-label">Name</label>
              <Input
                id="contact-name"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-email" className="form-label">E-mail</label>
              <Input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="contact-message" className="form-label">Message</label>
              <Textarea
                id="contact-message"
                value={contactMessage}
                onChange={handleContactMessageChange}
                className="form-textarea"
                rows={6}
                required
              />
              <div className="word-counter">
                <span className={messageWordCount > maxMessageWords ? "word-counter-over" : "word-counter-normal"}>
                  {messageWordCount}/{maxMessageWords} words
                </span>
              </div>
            </div>

            <div className="form-submit">
              <Button 
                type="submit"
                className="submit-button"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
