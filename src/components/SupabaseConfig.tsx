
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const SupabaseConfig = () => {
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseKey, setSupabaseKey] = useState<string>('');
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSaveConfig = () => {
    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Missing Information",
        description: "Please provide both Supabase URL and Anon Key",
        variant: "destructive"
      });
      return;
    }

    // In a real app, these would be saved to environment variables
    // For this demo, we'll just show a toast
    toast({
      title: "Configuration Saved",
      description: "Your Supabase configuration has been saved. In a production environment, these would be set as proper environment variables.",
    });

    // Hide the config form
    setShowConfig(false);
  };

  return (
    <div className="my-8">
      {!showConfig ? (
        <Alert>
          <AlertTitle>Supabase Environment Variables Missing</AlertTitle>
          <AlertDescription>
            <p className="mb-4">
              Your Supabase environment variables are not configured. This app is currently using placeholder values for development.
            </p>
            <Button onClick={() => setShowConfig(true)}>Configure Supabase</Button>
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Supabase Configuration</CardTitle>
            <CardDescription>
              Enter your Supabase project URL and anon key. These can be found in your Supabase project settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="supabase-url">Supabase URL</Label>
              <Input 
                id="supabase-url" 
                type="text" 
                placeholder="https://your-project.supabase.co" 
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supabase-key">Supabase Anon Key</Label>
              <Input 
                id="supabase-key" 
                type="password" 
                placeholder="your-anon-key" 
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
              />
            </div>
            <Alert className="mt-4">
              <AlertDescription>
                Note: In a production application, these values should be set as environment variables on your hosting platform, not stored in the browser.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowConfig(false)}>Cancel</Button>
            <Button onClick={handleSaveConfig}>Save Configuration</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SupabaseConfig;
