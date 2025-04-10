
import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Offers = () => {
  const currentOffers = [
    {
      id: "1",
      title: "Summer Sale: 15% Off All Laptops",
      description: "Get 15% off on all laptops through the end of August.",
      code: "SUMMER15",
      expiryDate: "August 31, 2025",
      category: "Laptops & Notebooks"
    },
    {
      id: "2",
      title: "Back to School Bundle",
      description: "Buy a laptop and get a free wireless mouse and laptop sleeve.",
      code: "BACKTOSCHOOL",
      expiryDate: "September 15, 2025",
      category: "Bundles"
    },
    {
      id: "3",
      title: "Gaming Monitor Discount",
      description: "20% off all gaming monitors with refresh rates of 144Hz or higher.",
      code: "GAMEON20",
      expiryDate: "July 30, 2025",
      category: "Monitors"
    },
    {
      id: "4",
      title: "Storage Upgrade",
      description: "Buy any desktop PC and upgrade to the next storage tier for free.",
      code: "MORESTORAGE",
      expiryDate: "October 1, 2025",
      category: "Desktop PCs"
    }
  ];

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Special Offers</h1>
      
      <div className="mb-8">
        <p className="text-lg text-muted-foreground">
          Take advantage of our limited-time deals and promotions. Use the promo codes at checkout to apply discounts.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {currentOffers.map((offer) => (
          <Card key={offer.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{offer.title}</h2>
                <Badge>{offer.category}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{offer.description}</p>
              <div className="bg-primary/5 p-3 rounded-md flex justify-between items-center mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Promo Code:</span>
                  <span className="ml-2 font-mono font-semibold">{offer.code}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(offer.code);
                  alert('Code copied to clipboard');
                }}>
                  Copy
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Expires: {offer.expiryDate}
                </p>
                <Button asChild>
                  <Link to="/products">Shop Now</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 bg-primary/5 border rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe for Exclusive Deals</h2>
        <p className="mb-6 text-muted-foreground">
          Sign up for our newsletter to receive exclusive offers and early access to sales.
        </p>
        <div className="flex max-w-lg mx-auto gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Offers;
