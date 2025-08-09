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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    const wordCount = getWordCount(newMessage);
    
    if (wordCount <= 250) {
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
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Questions, comments, or concerns?</h2>
        <p className="newsletter-description">
          Write us a message and let us know! We'll get back to you as soon as we can.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="newsletter-name-input w-full"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-email-input w-full"
            />
          </div>
          <div>
            <Textarea
              placeholder="Enter your message"
              value={message}
              onChange={handleMessageChange}
              className="newsletter-message-input w-full"
              rows={4}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {getWordCount(message)}/250 words
            </div>
          </div>
          <div>
            <Button 
              type="submit"
              className="newsletter-subscribe-button w-full"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
