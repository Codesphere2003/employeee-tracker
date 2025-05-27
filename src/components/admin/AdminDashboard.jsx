
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeList from './EmployeeList';
import AddEmployeeForm from './AddEmployeeForm';
import AttendanceMap from './AttendanceMap';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('employees');
  const [employees, setEmployees] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      assignedShop: { name: 'Shop A', lat: 40.7128, lng: -74.0060 },
      status: 'Present',
      checkInTime: '09:15 AM',
      checkInLocation: { lat: 40.7129, lng: -74.0061 }
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@company.com',
      assignedShop: { name: 'Shop B', lat: 40.7589, lng: -73.9851 },
      status: 'Absent',
      checkInTime: null,
      checkInLocation: null
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@company.com',
      assignedShop: { name: 'Shop A', lat: 40.7128, lng: -74.0060 },
      status: 'Out of Range',
      checkInTime: '09:45 AM',
      checkInLocation: { lat: 40.7200, lng: -74.0100 }
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@company.com',
      assignedShop: { name: 'Shop C', lat: 40.6782, lng: -73.9442 },
      status: 'Present',
      checkInTime: '10:30 AM',
      checkInLocation: { lat: 40.6785, lng: -73.9445 }
    }
  ]);

  const shops = [
    { id: '1', name: 'Shop A', lat: 40.7128, lng: -74.0060 },
    { id: '2', name: 'Shop B', lat: 40.7589, lng: -73.9851 },
    { id: '3', name: 'Shop C', lat: 40.6782, lng: -73.9442 }
  ];

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now().toString() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="outline" onClick={onLogout} size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 mb-6">
          <Button 
            variant={activeTab === 'employees' ? 'default' : 'outline'}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </Button>
          <Button 
            variant={activeTab === 'add' ? 'default' : 'outline'}
            onClick={() => setActiveTab('add')}
          >
            Add Employee
          </Button>
          <Button 
            variant={activeTab === 'map' ? 'default' : 'outline'}
            onClick={() => setActiveTab('map')}
          >
            Attendance Map
          </Button>
        </div>

        {activeTab === 'employees' && (
          <EmployeeList employees={employees} />
        )}

        {activeTab === 'add' && (
          <AddEmployeeForm shops={shops} onAddEmployee={addEmployee} />
        )}

        {activeTab === 'map' && (
          <div key="attendance-map">
            <AttendanceMap employees={employees} shops={shops} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
