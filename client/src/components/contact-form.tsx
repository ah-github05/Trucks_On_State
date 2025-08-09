import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export default function ContactForm() {
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

  const contactSubmissionMutation = useMutation({
    mutationFn: async (contactData: { name: string; email: string; message: string }) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit contact form');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as we can.",
      });
      // Reset form fields
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    },
    onError: (error: any) => {
      console.error('Contact form submission error:', error);
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

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
    
    contactSubmissionMutation.mutate({
      name: contactName,
      email: contactEmail,
      message: contactMessage
    });
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
                disabled={contactSubmissionMutation.isPending}
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
                disabled={contactSubmissionMutation.isPending}
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
                disabled={contactSubmissionMutation.isPending}
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
                disabled={contactSubmissionMutation.isPending}
              >
                {contactSubmissionMutation.isPending ? "Sending..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}