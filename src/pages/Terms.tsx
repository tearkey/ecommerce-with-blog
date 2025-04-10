
import PageLayout from "@/components/PageLayout";

const Terms = () => {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p className="text-muted-foreground italic mb-6">
          Last updated: April 10, 2025
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            These Terms of Service ("Terms") govern your access to and use of the TechStore website, mobile application, and other online products and services (collectively, the "Services") provided by TechStore, Inc. ("TechStore," "we," "us," or "our").
          </p>
          <p>
            By accessing or using our Services, you agree to these Terms. If you do not agree to these Terms, you may not access or use the Services.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account Registration</h2>
          <p className="mb-4">
            To access certain features of the Services, you may be required to register for an account. When you register, you agree to provide accurate, current, and complete information and to update such information to keep it accurate, current, and complete.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding your account credentials and for any activity that occurs under your account. If you become aware of any unauthorized use of your account, you should notify us immediately.
          </p>
          <p>
            We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, not current, or incomplete.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Purchases and Payment</h2>
          <p className="mb-4">
            You may purchase products through our Services. All purchases are subject to these Terms and any additional terms provided at the time of purchase.
          </p>
          <p className="mb-4">
            By making a purchase, you represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You are authorized to use the payment method provided</li>
            <li>The payment information you provide is accurate and complete</li>
            <li>You will pay all charges incurred under your account at the prices in effect when such charges are incurred</li>
          </ul>
          <p className="mb-4">
            All prices are subject to change without notice. We are not responsible for pricing, typographical, or other errors, and we reserve the right to cancel any orders arising from such errors.
          </p>
          <p>
            Sales tax will be added to the purchase price based on the applicable state and local sales tax rate for your shipping address.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Product Information and Availability</h2>
          <p className="mb-4">
            We strive to provide accurate product descriptions and availability information, but we do not warrant that product descriptions or other content on the Services are accurate, complete, reliable, current, or error-free.
          </p>
          <p className="mb-4">
            Products displayed on the Services may not be available in all locations, and product availability is subject to change without notice. We reserve the right to limit the quantities of any products that we offer.
          </p>
          <p>
            If a product you order is unavailable, we will notify you and offer a substitute, a backorder, or a refund.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping and Delivery</h2>
          <p className="mb-4">
            We will make reasonable efforts to deliver products within the estimated delivery time, but we do not guarantee delivery times. Shipping and delivery dates are estimates only, and delays can occur due to various factors.
          </p>
          <p>
            Risk of loss and title for products pass to you upon delivery to the carrier. If you have concerns about a shipment, please contact our customer service team.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
          <p className="mb-4">
            The Services and all content, features, and functionality thereof (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by TechStore, its licensors, or other providers and are protected by copyright, trademark, patent, and other intellectual property laws.
          </p>
          <p>
            You may use the Services only for lawful purposes and in accordance with these Terms. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services without our prior written consent.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, TECHSTORE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES;</li>
            <li>ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES;</li>
            <li>ANY CONTENT OBTAINED FROM THE SERVICES; AND</li>
            <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.</li>
          </ul>
          <p>
            IN NO EVENT SHALL TECHSTORE'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICES EXCEED ONE HUNDRED U.S. DOLLARS ($100) OR THE AMOUNT YOU PAID TECHSTORE IN THE PAST TWELVE MONTHS, WHICHEVER IS GREATER.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@techstore.com or by mail at:
          </p>
          <address className="mt-4 not-italic">
            TechStore<br />
            Attn: Legal Department<br />
            123 Technology Drive<br />
            San Francisco, CA 94107
          </address>
        </section>
      </div>
    </PageLayout>
  );
};

export default Terms;
