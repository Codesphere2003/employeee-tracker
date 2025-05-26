
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (user: any, role: string) => void;
  onBackToLogin: () => void;
}

const RegisterForm = ({ onRegister, onBackToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee'
  });
  const [isLoading, setIsLoading] = useState(false);

  const isWithinLoginHours = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 9 && hours < 17;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isWithinLoginHours()) {
      alert('Registration is only allowed between 9:00 AM and 5:00 PM');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        assignedShop: formData.role === 'employee' ? {
          name: 'Shop A',
          lat: 40.7128,
          lng: -74.0060
        } : null
      };
      
      onRegister(newUser, formData.role);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToLogin}
              className="absolute left-4 top-4"
            >
              <ArrowLeft size={16} />
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Create Account</CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
            <Clock size={16} />
            <span>Registration Hours: 9:00 AM - 5:00 PM</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={!isWithinLoginHours()}
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={!isWithinLoginHours()}
              />
            </div>
            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                disabled={!isWithinLoginHours()}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={!isWithinLoginHours()}
              />
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                disabled={!isWithinLoginHours()}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!isWithinLoginHours() || isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          {!isWithinLoginHours() && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
              <p className="text-sm text-yellow-800 text-center">
                Registration is currently disabled. Please try again during business hours (9 AM - 5 PM).
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
