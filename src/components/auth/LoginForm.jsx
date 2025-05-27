
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowLeft } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Temporarily disabled for testing - always allow login
  const isWithinLoginHours = () => {
    return true; // Always return true for testing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate authentication - replace with actual Firebase auth
    setTimeout(() => {
      if (email === 'admin@company.com' || email === 'admin123') {
        onLogin({ email, id: '1', name: 'Admin User' }, 'admin');
      } else {
        onLogin({ 
          email, 
          id: '2', 
          name: 'John Doe',
          assignedShop: {
            name: 'Shop A',
            lat: 40.7128,
            lng: -74.0060
          }
        }, 'employee');
      }
      setIsLoading(false);
    }, 1000);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className="absolute left-0 top-0"
          >
            <ArrowLeft size={16} />
          </Button>
          <CardTitle className="text-2xl font-bold text-gray-800">Employee Tracker</CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-green-600 mt-2">
            <Clock size={16} />
            <span>Login Available 24/7 (Testing Mode)</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 space-y-4">
            <div className="text-xs text-gray-500 text-center">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <div className="space-y-1">
                <p><strong>Admin:</strong> admin@company.com / admin123</p>
                <p><strong>Employee:</strong> employee@company.com / employee123</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
