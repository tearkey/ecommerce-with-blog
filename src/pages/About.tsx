
import PageLayout from "@/components/PageLayout";

const About = () => {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          TechStore was founded in 2015 with a simple mission: to provide high-quality tech products with exceptional service at reasonable prices.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
        <p className="mb-4">
          What began as a small online shop run by two tech enthusiasts has grown into a trusted retailer for computer hardware and accessories. Our passion for technology and commitment to customer satisfaction has remained at the core of our business.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
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
        <p className="mb-4">
          Our team consists of tech enthusiasts, industry experts, and customer service professionals who are passionate about helping you find the perfect products for your needs.
        </p>
      </div>
    </PageLayout>
  );
};

export default About;
