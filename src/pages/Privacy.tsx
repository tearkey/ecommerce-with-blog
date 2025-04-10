
import PageLayout from "@/components/PageLayout";

const Privacy = () => {
  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="text-muted-foreground italic mb-6">
          Last updated: April 10, 2025
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            TechStore ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by TechStore when you use our website, mobile application, and other online products and services (collectively, the "Services") or when you otherwise interact with us.
          </p>
          <p>
            By accessing or using our Services, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">We collect several types of information from and about users of our Services, including:</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Information You Provide to Us</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, password, and other information you provide.</li>
            <li><strong>Transaction Information:</strong> When you make a purchase, we collect information about the transaction, such as product details, purchase price, and date of purchase.</li>
            <li><strong>Payment Information:</strong> When you add a payment method to your account, we collect payment card details or other financial account information.</li>
            <li><strong>Profile Information:</strong> When you update your profile, we collect information such as your address, phone number, and preferences.</li>
            <li><strong>Communications:</strong> When you contact us directly, we record the contents of your messages or calls.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Information We Collect Automatically</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Usage Information:</strong> We collect information about your interactions with the Services, such as the pages you view, the links you click, and the searches you conduct.</li>
            <li><strong>Device Information:</strong> We collect information about the device you use to access our Services, including hardware model, operating system, unique device identifiers, and mobile network information.</li>
            <li><strong>Location Information:</strong> We may collect information about your location if you grant us permission to do so.</li>
            <li><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar technologies to collect information about your browsing behavior and preferences.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide, maintain, and improve our Services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Develop new products and services</li>
            <li>Personalize your experience with our Services</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Protect the rights and property of TechStore and others</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sharing of Information</h2>
          <p className="mb-4">We may share the information we collect in various ways, including:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>With Vendors and Service Providers:</strong> We share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
            <li><strong>For Legal Reasons:</strong> We may share information if we believe disclosure is necessary to comply with a legal obligation or to protect the rights, property, or safety of TechStore, our customers, or others.</li>
            <li><strong>During Business Transfers:</strong> We may share information in connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>With Your Consent:</strong> We may share information with third parties when you give us your consent to do so.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@techstore.com or by mail at:
          </p>
          <address className="mt-4 not-italic">
            TechStore<br />
            Attn: Privacy Officer<br />
            123 Technology Drive<br />
            San Francisco, CA 94107
          </address>
        </section>
      </div>
    </PageLayout>
  );
};

export default Privacy;
