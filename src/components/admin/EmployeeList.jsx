
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EmployeeList = ({ employees }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Out of Range': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Employee List</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{employee.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">{employee.email}</p>
              <p className="text-sm">
                <span className="font-medium">Shop:</span> {employee.assignedShop.name}
              </p>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(employee.status)}>
                  {employee.status}
                </Badge>
                {employee.checkInTime && (
                  <span className="text-xs text-gray-500">{employee.checkInTime}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
