
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Laptop, 
  Monitor, 
  Cpu, 
  Mouse, 
  Keyboard, 
  HardDrive,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = [
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Laptops & Notebooks",
      description: "Latest laptops from top brands",
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Desktop PCs & Monitors",
      description: "Complete desktop solutions",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Components",
      description: "CPUs, GPUs, Motherboards & more",
    },
    {
      icon: <Mouse className="w-6 h-6" />,
      title: "Peripherals",
      description: "Mice, keyboards & accessories",
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      title: "Storage",
      description: "HDDs, SSDs & external drives",
    },
    {
      icon: <Keyboard className="w-6 h-6" />,
      title: "Gaming Gear",
      description: "Gaming peripherals & accessories",
    },
  ];

  return (
    <PageLayout showBreadcrumbs={false}>
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 -mx-4 px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your One-Stop Tech Shop
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Discover the latest in computer technology with our wide range of products
            and unbeatable prices.
          </p>
          <Button size="lg" className="mt-8" onClick={() => navigate('/products')}>
            Shop Now
          </Button>
        </div>
      </div>

      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate('/products')}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-16 bg-secondary/10 -mx-4 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="text-center text-muted-foreground">
          <Button onClick={() => navigate('/new-products')}>Browse New Arrivals</Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
