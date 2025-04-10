
import PageLayout from "@/components/PageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const Shipping = () => {
  const shippingMethods = [
    { 
      method: "Standard Shipping", 
      deliveryTime: "3-5 business days", 
      cost: "$5.99 (Free on orders $50+)" 
    },
    { 
      method: "Expedited Shipping", 
      deliveryTime: "2-3 business days", 
      cost: "$12.99" 
    },
    { 
      method: "Express Shipping", 
      deliveryTime: "1-2 business days", 
      cost: "$19.99" 
    },
    { 
      method: "Same Day Delivery", 
      deliveryTime: "Same day (order by 11 AM)", 
      cost: "$29.99 (Select areas only)" 
    }
  ];

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>
      
      <div className="prose max-w-none mb-10">
        <p className="text-lg mb-6">
          We offer multiple shipping options to ensure you receive your tech products when you need them. All orders are processed and shipped from our warehouse in California.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Methods</h2>
        <Card className="mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Delivery Time</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingMethods.map((method, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{method.method}</TableCell>
                  <TableCell>{method.deliveryTime}</TableCell>
                  <TableCell>{method.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">International Shipping</h2>
        <p className="mb-4">
          We currently ship to the United States and Canada. International shipping to additional countries will be available soon. International orders may be subject to import duties and taxes, which are the responsibility of the customer.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Order Processing</h2>
        <p className="mb-4">
          Orders are typically processed within 1 business day. Orders placed after 2 PM PST or on weekends/holidays will be processed the next business day. Once your order ships, you will receive a confirmation email with tracking information.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Restrictions</h2>
        <p className="mb-4">
          Some products may have shipping restrictions due to size, weight, or regulatory requirements. These restrictions will be noted on the product page. We cannot ship to P.O. boxes for certain large items.
        </p>
      </div>
      
      <Card className="p-6 bg-primary/5 mb-8">
        <h3 className="text-xl font-semibold mb-2">TechStore Premium</h3>
        <p className="mb-4">
          Sign up for TechStore Premium at $49/year and enjoy free express shipping on all orders, priority processing, and exclusive deals.
        </p>
      </Card>
    </PageLayout>
  );
};

export default Shipping;
