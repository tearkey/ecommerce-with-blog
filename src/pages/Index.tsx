
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Code, Layout, Zap } from "lucide-react";

const Index = () => {
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "Welcome!",
      description: "Thanks for checking out our learning platform.",
    });
  };

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Learn Coding",
      description: "Master modern web development with hands-on practice",
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Build Projects",
      description: "Create real-world applications from scratch",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Progress",
      description: "See results fast with our structured approach",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            Master Web Development
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Learn modern web development through practical, hands-on projects and
            real-world examples.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="mt-8 animate-fade-in"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
