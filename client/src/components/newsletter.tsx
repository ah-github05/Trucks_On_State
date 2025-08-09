import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function FoodTruckNewsletterSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
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
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
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
              <label htmlFor="email" className="form-label">E-mail</label>
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
