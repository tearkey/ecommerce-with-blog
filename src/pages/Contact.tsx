
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/PageLayout";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will respond shortly.",
    });
  };

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            We're here to help with any questions about our products, orders, or services.
            Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">support@techstore.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 mt-1" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 mt-1" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">
                  TechStore HQ<br />
                  123 Technology Drive<br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <Input id="name" placeholder="Your name" required />
            </div>
            
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            
            <div>
              <label htmlFor="subject" className="block font-medium mb-2">
                Subject
              </label>
              <Input id="subject" placeholder="How can we help?" required />
            </div>
            
            <div>
              <label htmlFor="message" className="block font-medium mb-2">
                Message
              </label>
              <Textarea 
                id="message" 
                placeholder="Tell us what you need..." 
                rows={4}
                required 
              />
            </div>
            
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Contact;
