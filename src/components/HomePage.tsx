
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, BarChart3, Download, Clock, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  user: {name: string, role: string} | null;
}

const HomePage = ({ user }: HomePageProps) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/40fbd451-256d-4e46-94fb-25328c43de28.png" 
            alt="Water Monitoring" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        </div>
        
        <div className="relative py-16 px-6 md:px-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sri Lanka Water Resource Monitoring System
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Real-time water level and rainfall monitoring for the nation's irrigation infrastructure
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => document.querySelector('[value="data-entry"]')?.dispatchEvent(new Event('click'))}
            >
              <Droplets className="mr-2 h-5 w-5" />
              Record New Data
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/20 text-white border-white/40 hover:bg-white/30"
              onClick={() => document.querySelector('[value="reports"]')?.dispatchEvent(new Event('click'))}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Reports
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-blue-600">
              <Droplets className="mr-2 h-5 w-5" />
              Water Level Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Monitor water levels across major reservoirs, canals, and irrigation systems throughout Sri Lanka
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-green-600">
              <Clock className="mr-2 h-5 w-5" />
              Real-time Rainfall Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Track rainfall patterns across different regions to predict water availability and flood risks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-purple-600">
              <Download className="mr-2 h-5 w-5" />
              Comprehensive Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Generate and download detailed reports for planning, resource allocation and emergency response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Status Overview</CardTitle>
          <CardDescription>Summary of water levels across key monitoring stations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Mahaweli Dam</h3>
                  <span className="text-green-600 text-xs font-medium px-2 py-1 bg-green-50 rounded-full">Normal</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">76.4%</div>
                <div className="text-sm text-gray-500">Current capacity</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Victoria Reservoir</h3>
                  <span className="text-yellow-600 text-xs font-medium px-2 py-1 bg-yellow-50 rounded-full">Low</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">45.2%</div>
                <div className="text-sm text-gray-500">Current capacity</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Parakrama Canal</h3>
                  <span className="text-green-600 text-xs font-medium px-2 py-1 bg-green-50 rounded-full">Normal</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">82.7%</div>
                <div className="text-sm text-gray-500">Current capacity</div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Kala Wewa</h3>
                  <span className="text-red-600 text-xs font-medium px-2 py-1 bg-red-50 rounded-full">Critical</span>
                </div>
                <div className="text-2xl font-bold text-blue-700">32.1%</div>
                <div className="text-sm text-gray-500">Current capacity</div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Dry Season Alert</h4>
                <p className="text-sm text-orange-700">
                  Rainfall levels are below average for this time of year. Water conservation measures are recommended in the Central and North-Central provinces.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest water level measurements and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Droplets className="h-8 w-8 text-blue-600 bg-blue-100 p-1.5 rounded-full" />
                  <div>
                    <p className="font-medium">Mahaweli Dam water level increased by 0.3m</p>
                    <p className="text-sm text-gray-500">Recorded by Amal Perera</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Today, 10:45 AM</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Droplets className="h-8 w-8 text-red-600 bg-red-100 p-1.5 rounded-full" />
                  <div>
                    <p className="font-medium">Kala Wewa water level decreased by 0.5m</p>
                    <p className="text-sm text-gray-500">Recorded by System</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Yesterday, 6:30 PM</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-green-600 bg-green-100 p-1.5 rounded-full" />
                  <div>
                    <p className="font-medium">Monthly maintenance check completed</p>
                    <p className="text-sm text-gray-500">Recorded by Nimal Fernando</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">May 22, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HomePage;
