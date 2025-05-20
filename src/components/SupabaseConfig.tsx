
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { isSupabaseConfigured } from '@/lib/supabase';

const SupabaseConfig = () => {
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseKey, setSupabaseKey] = useState<string>('');
  const [showConfig, setShowConfig] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'success' | 'error' | null>(null);
  const { toast } = useToast();

  // Check if Supabase is already configured
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setConnectionStatus('checking');
        const isConfigured = await isSupabaseConfigured();
        
        if (isConfigured) {
          setConnectionStatus('success');
          setShowConfig(false);
        } else {
          setConnectionStatus('error');
          setShowConfig(true);
        }
      } catch (error) {
        console.error("Error checking Supabase connection:", error);
        setConnectionStatus('error');
      }
    };
    
    checkConnection();
  }, []);

  const handleSaveConfig = () => {
    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Missing Information",
        description: "Please provide both Supabase URL and Anon Key",
        variant: "destructive"
      });
      return;
    }

    // Here's where we would typically save these values to environment variables
    // For this demo, we'll just display instructions to properly set them up
    
    // In a real app, these would be saved to environment variables
    toast({
      title: "Configuration Guide",
      description: "To properly configure Supabase, you need to set these values as environment variables.",
    });

    // Show instructions instead of hiding
    setConnectionStatus('success');
  };

  const handleTestConnection = async () => {
    if (!supabaseUrl || !supabaseKey) {
      toast({
        title: "Missing Information",
        description: "Please provide both Supabase URL and Anon Key",
        variant: "destructive"
      });
      return;
    }
    
    setConnectionStatus('checking');
    
    // In a real implementation, we would use these values to test the connection
    // For this demo, we'll just simulate a test
    
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: "This is a simulated test. In a real app, we would test the connection with your provided credentials.",
      });
      setConnectionStatus('error'); // Keep showing the form
    }, 1500);
  };

  return (
    <div className="my-4">
      {connectionStatus === 'success' && !showConfig ? (
        <Alert className="bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Supabase Connection Successful</AlertTitle>
          <AlertDescription className="text-green-700">
            <p className="mb-4">
              Your Supabase connection is working properly.
            </p>
            <Button onClick={() => setShowConfig(true)}>Reconfigure Supabase</Button>
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
            
            {connectionStatus === 'checking' && (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-md flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-800"></div>
                Testing connection...
              </div>
            )}
            
            {connectionStatus === 'error' && (
              <Alert variant="destructive">
                <AlertTitle>Connection Failed</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">Unable to connect to Supabase. Please check your credentials.</p>
                  <p>
                    If you're using Lovable, make sure to use the Supabase integration button in the top right of the interface.
                  </p>
                </AlertDescription>
              </Alert>
            )}
            
            <Alert className="mt-4">
              <AlertDescription>
                <p className="mb-2">
                  <strong>Important:</strong> In a production application, these values should be set as environment variables on your hosting platform, not stored in the browser.
                </p>
                <p>
                  If you're using Lovable, the best way to connect to Supabase is using the Supabase integration button in the top right of the interface.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowConfig(false)}
              disabled={connectionStatus === 'checking'}
            >
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="secondary"
                onClick={handleTestConnection}
                disabled={connectionStatus === 'checking' || !supabaseUrl || !supabaseKey}
              >
                Test Connection
              </Button>
              <Button 
                onClick={handleSaveConfig}
                disabled={connectionStatus === 'checking' || !supabaseUrl || !supabaseKey}
              >
                Save Configuration
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
      
      <div className="mt-6 p-4 bg-primary/10 rounded-lg">
        <h3 className="font-medium mb-2">How to properly configure Supabase</h3>
        <p className="mb-2">To connect to the real backend:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Create a Supabase account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">supabase.com</a></li>
          <li>Create a new project</li>
          <li>Go to your project settings</li>
          <li>Copy the URL and anon key</li>
          <li>If using Lovable, click the Supabase button in the top right of the interface</li>
          <li>Otherwise, set these as environment variables in your hosting platform</li>
        </ol>
      </div>
    </div>
  );
};

export default SupabaseConfig;
