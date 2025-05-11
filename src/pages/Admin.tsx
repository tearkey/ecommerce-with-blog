
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" /> Admin Area
          </CardTitle>
          <CardDescription>
            Authentication required to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <AlertTitle>Content Management System</AlertTitle>
            <AlertDescription>
              This is a placeholder for the future CMS functionality. To implement a full CMS, you'll need to connect this project to Supabase for database functionality.
            </AlertDescription>
          </Alert>
          
          <p className="text-sm text-muted-foreground mb-6">
            The admin panel would allow you to manage:
          </p>
          
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Products and inventory</li>
            <li>Blog posts and categories</li>
            <li>User accounts and permissions</li>
            <li>Orders and transactions</li>
            <li>Site settings and appearance</li>
            <li>SEO and metadata</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/">Back to Homepage</Link>
          </Button>
          <Button>Setup Admin Access</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Admin;
