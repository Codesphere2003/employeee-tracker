
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if current time is within allowed login hours (9 AM - 5 PM)
  const isWithinLoginHours = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 9 && hours < 17;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isWithinLoginHours()) {
      alert('Login is only allowed between 9:00 AM and 5:00 PM');
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication - replace with actual Firebase auth
    setTimeout(() => {
      if (email === 'admin@company.com') {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Employee Tracker</CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
            <Clock size={16} />
            <span>Login Hours: 9:00 AM - 5:00 PM</span>
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
                disabled={!isWithinLoginHours()}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={!isWithinLoginHours()}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!isWithinLoginHours() || isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          {!isWithinLoginHours() && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
              <p className="text-sm text-yellow-800 text-center">
                Login is currently disabled. Please try again during business hours (9 AM - 5 PM).
              </p>
            </div>
          )}
          
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>Demo: admin@company.com (Admin) or any other email (Employee)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
