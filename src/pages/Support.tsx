
import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, HelpCircle, FileText, MessageSquare, Phone } from "lucide-react";

const Support = () => {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Support Center</h1>
      
      <div className="mb-8">
        <div className="bg-primary/5 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How can we help you today?</h2>
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/70" />
            <Input 
              placeholder="Search for help articles, FAQs, or topics..." 
              className="pl-10 py-6"
            />
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
          <HelpCircle className="mx-auto h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">FAQs</h3>
          <p className="text-muted-foreground mb-4">
            Find quick answers to common questions about our products and services.
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link to="#faqs">View FAQs</Link>
          </Button>
        </Card>
        
        <Card className="p-6 text-center">
          <FileText className="mx-auto h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">User Guides</h3>
          <p className="text-muted-foreground mb-4">
            Access detailed guides and tutorials for your tech products.
          </p>
          <Button variant="outline" className="w-full">
            Browse Guides
          </Button>
        </Card>
        
        <Card className="p-6 text-center">
          <MessageSquare className="mx-auto h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
          <p className="text-muted-foreground mb-4">
            Get personalized help from our technical support team.
          </p>
          <Button className="w-full" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </Card>
      </div>
      
      <Tabs defaultValue="popular" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="popular">Popular Topics</TabsTrigger>
          <TabsTrigger value="orders">Orders & Shipping</TabsTrigger>
          <TabsTrigger value="technical">Technical Support</TabsTrigger>
          <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular" className="space-y-4 mt-4">
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">How do I track my order?</h3>
            <p className="text-sm text-muted-foreground">Learn how to track the status of your recent purchase.</p>
          </div>
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">What's your return policy?</h3>
            <p className="text-sm text-muted-foreground">Understand our 30-day return policy and how to initiate a return.</p>
          </div>
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">How do I redeem a promo code?</h3>
            <p className="text-sm text-muted-foreground">Learn how to apply promotional codes during checkout.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4 mt-4">
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">Where is my order?</h3>
            <p className="text-sm text-muted-foreground">Check the current status and estimated delivery date of your order.</p>
          </div>
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">Can I change my shipping address?</h3>
            <p className="text-sm text-muted-foreground">Learn how and when you can update your shipping information.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-4 mt-4">
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">My product isn't working properly</h3>
            <p className="text-sm text-muted-foreground">Troubleshooting steps for common technical issues.</p>
          </div>
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">How do I update drivers?</h3>
            <p className="text-sm text-muted-foreground">Step-by-step guide to updating drivers for your hardware.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="returns" className="space-y-4 mt-4">
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">How do I start a return?</h3>
            <p className="text-sm text-muted-foreground">Step-by-step process to initiate a product return.</p>
          </div>
          <div className="border p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <h3 className="font-medium mb-1">When will I receive my refund?</h3>
            <p className="text-sm text-muted-foreground">Information about refund processing times and methods.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div id="faqs" className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. For orders over $1,000, financing options are also available.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Do products come with a warranty?</h3>
            <p className="text-muted-foreground">
              Yes, all our products come with the manufacturer's warranty. Many items also qualify for our optional extended protection plans for additional peace of mind.
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Can I cancel my order?</h3>
            <p className="text-muted-foreground">
              Orders can be canceled within 1 hour of placement. After that, if the order has not shipped, you may still request cancellation by contacting our customer service team.
            </p>
          </Card>
        </div>
      </div>
      
      <div className="bg-primary/5 p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
        <p className="mb-4 text-muted-foreground">Our support team is available from 9 AM to 9 PM EST, seven days a week.</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/contact">
              <MessageSquare className="mr-2 h-4 w-4" />
              Email Us
            </Link>
          </Button>
          <Button>
            <Phone className="mr-2 h-4 w-4" />
            Call Support
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Support;
