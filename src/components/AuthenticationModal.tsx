
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplets, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthenticationModalProps {
  onLogin: (user: {name: string, role: string}) => void;
}

const AuthenticationModal = ({ onLogin }: AuthenticationModalProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const { toast } = useToast();

  // Demo credentials for different roles
  const demoCredentials = {
    'admin@irrigation.gov': { password: 'admin123', role: 'Admin', name: 'Dr. John Smith' },
    'officer@irrigation.gov': { password: 'officer123', role: 'Officer', name: 'Sarah Johnson' },
    'viewer@irrigation.gov': { password: 'viewer123', role: 'Viewer', name: 'Mike Wilson' }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const credential = demoCredentials[formData.username as keyof typeof demoCredentials];
    
    if (credential && credential.password === formData.password) {
      onLogin({
        name: credential.name,
        role: credential.role
      });
      toast({
        title: "Login Successful",
        description: `Welcome back, ${credential.name}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDemoLogin = (role: string) => {
    const credentials = Object.entries(demoCredentials).find(([_, cred]) => cred.role === role);
    if (credentials) {
      const [username, cred] = credentials;
      setFormData({ username, password: cred.password, role: cred.role });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 150, 200, 0.8), rgba(0, 150, 200, 0.8)), url('/lovable-uploads/40fbd451-256d-4e46-94fb-25328c43de28.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Water Level Monitoring
            </CardTitle>
            <CardDescription className="text-gray-600">
              Irrigation Department Login Portal
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type="email"
                placeholder="Enter your email"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              <Shield className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </form>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-600 text-center">Demo Accounts:</p>
            <div className="grid gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('Admin')}
                className="text-xs"
              >
                Admin Demo (Full Access)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('Officer')}
                className="text-xs"
              >
                Field Officer Demo (Data Entry + View)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDemoLogin('Viewer')}
                className="text-xs"
              >
                Viewer Demo (Read Only)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticationModal;
