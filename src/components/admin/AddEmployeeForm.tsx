
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddEmployeeForm = ({ shops, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    assignedShop: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.assignedShop) {
      onAddEmployee({
        ...formData,
        status: 'Not Checked In',
        checkInTime: null,
        checkInLocation: null
      });
      setFormData({ name: '', email: '', assignedShop: null });
    }
  };

  const handleShopSelect = (shopId) => {
    const shop = shops.find(s => s.id === shopId);
    setFormData({ ...formData, assignedShop: shop });
  };

  return (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Add New Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Employee Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Select onValueChange={handleShopSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign Shop" />
                </SelectTrigger>
                <SelectContent>
                  {shops.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id}>
                      {shop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full">
              Add Employee
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployeeForm;
