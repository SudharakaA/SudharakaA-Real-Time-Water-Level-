
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, Droplets, Calendar, TrendingUp, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardProps {
  user: {name: string, role: string} | null;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock data for demonstration
  const dailyData = [
    { time: '00:00', level: 15.2, threshold: 18 },
    { time: '04:00', level: 15.8, threshold: 18 },
    { time: '08:00', level: 16.5, threshold: 18 },
    { time: '12:00', level: 17.1, threshold: 18 },
    { time: '16:00', level: 16.8, threshold: 18 },
    { time: '20:00', level: 16.3, threshold: 18 },
    { time: '24:00', level: 15.9, threshold: 18 }
  ];

  const weeklyData = [
    { day: 'Mon', level: 16.2, rainfall: 5.2 },
    { day: 'Tue', level: 16.8, rainfall: 12.1 },
    { day: 'Wed', level: 17.5, rainfall: 8.3 },
    { day: 'Thu', level: 17.1, rainfall: 0 },
    { day: 'Fri', level: 16.9, rainfall: 2.1 },
    { day: 'Sat', level: 16.6, rainfall: 15.4 },
    { day: 'Sun', level: 17.2, rainfall: 9.8 }
  ];

  const locations = [
    { id: 'dam1', name: 'Main Dam Reservoir', level: 16.8, status: 'normal', lastUpdate: '10 mins ago' },
    { id: 'canal1', name: 'Primary Canal Point A', level: 12.3, status: 'low', lastUpdate: '15 mins ago' },
    { id: 'canal2', name: 'Secondary Canal B', level: 8.5, status: 'critical', lastUpdate: '5 mins ago' },
    { id: 'pump1', name: 'Pump Station 1', level: 14.2, status: 'normal', lastUpdate: '8 mins ago' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Droplets className="w-4 h-4" />;
    }
  };

  const criticalAlerts = locations.filter(loc => loc.status === 'critical');
  const lowAlerts = locations.filter(loc => loc.status === 'low');

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      {(criticalAlerts.length > 0 || lowAlerts.length > 0) && (
        <div className="space-y-3">
          {criticalAlerts.map((location) => (
            <Alert key={location.id} className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Critical Water Level Alert:</strong> {location.name} is at {location.level}m 
                - Immediate attention required! Last updated {location.lastUpdate}.
              </AlertDescription>
            </Alert>
          ))}
          {lowAlerts.map((location) => (
            <Alert key={location.id} className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Low Water Level Warning:</strong> {location.name} is at {location.level}m 
                - Monitor closely. Last updated {location.lastUpdate}.
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Monitoring Points</CardTitle>
            <MapPin className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{locations.length}</div>
            <p className="text-xs text-blue-700">Across the district</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Normal Levels</CardTitle>
            <Droplets className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {locations.filter(l => l.status === 'normal').length}
            </div>
            <p className="text-xs text-green-700">Within safe range</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Low Levels</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {locations.filter(l => l.status === 'low').length}
            </div>
            <p className="text-xs text-yellow-700">Require monitoring</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Critical Levels</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {locations.filter(l => l.status === 'critical').length}
            </div>
            <p className="text-xs text-red-700">Immediate action needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Water Level Trends
                </CardTitle>
                <CardDescription>Daily water level monitoring with thresholds</CardDescription>
              </div>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis label={{ value: 'Level (m)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}m`, 
                    name === 'level' ? 'Water Level' : 'Threshold'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  name="Water Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#dc2626" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={false}
                  name="Critical Threshold"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Weekly Overview
            </CardTitle>
            <CardDescription>Water levels and rainfall correlation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="level" fill="#2563eb" name="Water Level (m)" />
                <Bar dataKey="rainfall" fill="#10b981" name="Rainfall (mm)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            Monitoring Locations Status
          </CardTitle>
          <CardDescription>Real-time status of all water level monitoring points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3">
                  {getStatusIcon(location.status)}
                  <div>
                    <p className="font-medium text-gray-900">{location.name}</p>
                    <p className="text-sm text-gray-600">Level: {location.level}m</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(location.status)}>
                    {location.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {location.lastUpdate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
