
import PageLayout from "@/components/PageLayout";
import PageMeta from "@/components/PageMeta";
import { Card } from "@/components/ui/card";
import { AwardIcon, TruckIcon, HeartIcon, ShieldCheckIcon } from "lucide-react";

const About = () => {
  return (
    <PageLayout>
      <PageMeta
        title="About TechStore"
        description="Learn about TechStore's mission, values, and commitment to delivering high-quality tech products with exceptional service."
        path="/about"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About TechStore</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-8">
            TechStore was founded in 2015 with a simple mission: to provide high-quality tech products with exceptional service at reasonable prices.
          </p>
          
          {/* Company Story Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <div className="md:flex items-start gap-6">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <Card className="aspect-video relative overflow-hidden">
                  <div className="bg-muted w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Company Image</p>
                  </div>
                </Card>
              </div>
              <div className="md:w-1/2">
                <p className="mb-4">
                  What began as a small online shop run by two tech enthusiasts has grown into a trusted retailer for computer hardware and accessories. Our passion for technology and commitment to customer satisfaction has remained at the core of our business.
                </p>
                <p>
                  As technology evolved, so did we. From our humble beginnings selling just a few products, we've expanded to offer a comprehensive range of tech solutions for both individual consumers and businesses alike.
                </p>
              </div>
            </div>
          </div>
          
          {/* Values Grid */}
          <h2 className="text-2xl font-semibold mt-8 mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <AwardIcon className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Quality First</h3>
                  <p className="text-muted-foreground">We carefully select each product to ensure it meets our strict standards for performance and reliability.</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <HeartIcon className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Customer Focused</h3>
                  <p className="text-muted-foreground">Your satisfaction is our priority. We're dedicated to providing the best possible shopping experience.</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <TruckIcon className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
                  <p className="text-muted-foreground">We understand the excitement of receiving new tech. That's why we ensure quick delivery times.</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <ShieldCheckIcon className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Secure Shopping</h3>
                  <p className="text-muted-foreground">Your privacy and security are important to us. We employ industry-leading security measures.</p>
                </div>
              </div>
            </Card>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            At TechStore, we believe that everyone deserves access to high-quality technology products. We carefully select each item in our inventory to ensure it meets our strict standards for performance, reliability, and value.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Curated selection of top-tier products</li>
            <li>Competitive pricing on all items</li>
            <li>Expert advice from our knowledgeable team</li>
            <li>Fast shipping and hassle-free returns</li>
            <li>Dedicated customer support</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p className="mb-6">
            Our team consists of tech enthusiasts, industry experts, and customer service professionals who are passionate about helping you find the perfect products for your needs.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
