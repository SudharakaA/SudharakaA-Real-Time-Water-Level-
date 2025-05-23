import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, BarChart3, MapPin, Shield, Users, Calendar, TrendingUp, CloudRain } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Hero Section with Background */}
      <div className="relative">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/uploads/40fbd451-256d-4e46-94fb-25328c43de28.png')`
          }}
        />
        
        {/* Navigation Bar */}
        <nav className="relative z-10 bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src="/uploads/574a632e-5669-4e7f-94f5-cf1644cf8b67.png" 
                  alt="Department Logo" 
                  className="h-12 w-auto"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Irrigation Department</h1>
                  <p className="text-sm text-gray-600">Government of Sri Lanka</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
                <a href="#monitoring" className="text-gray-700 hover:text-blue-600 transition-colors">Monitoring</a>
                <Button onClick={onGetStarted} className="bg-blue-600 hover:bg-blue-700">
                  Staff Login
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 py-20 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sri Lanka Water Resource Monitoring System
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Advanced real-time monitoring of water levels and rainfall across Sri Lanka's irrigation infrastructure, 
              ensuring efficient water resource management for agricultural development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={onGetStarted} className="bg-blue-600 hover:bg-blue-700">
                <Shield className="mr-2 h-5 w-5" />
                Access Monitoring System
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Public Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">About the Irrigation Department</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Established to manage and develop Sri Lanka's water resources, the Irrigation Department plays a crucial role 
              in supporting agriculture, flood management, and sustainable water use across the nation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center pb-4">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-600">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To efficiently manage Sri Lanka's water resources through innovative monitoring, 
                  sustainable practices, and community-focused irrigation solutions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center pb-4">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-600">Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Monitoring over 200 major reservoirs, dams, and irrigation channels across all 
                  nine provinces of Sri Lanka with 24/7 real-time data collection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center pb-4">
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-purple-600">Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Supporting over 1.8 million farming families with reliable water supply and 
                  early warning systems for flood and drought management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Key Services</h3>
            <p className="text-lg text-gray-600">
              Comprehensive water resource management and monitoring services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <Droplets className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Water Level Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Real-time tracking of water levels in reservoirs, dams, and irrigation channels
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CloudRain className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Rainfall Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Comprehensive rainfall data collection and weather pattern analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Data Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Advanced analytics for water resource planning and management decisions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <Shield className="w-8 h-8 text-red-600 mb-2" />
                <CardTitle className="text-lg">Emergency Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Early warning systems for floods, droughts, and emergency water management
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section id="monitoring" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Advanced Monitoring Network</h3>
            <p className="text-lg text-gray-600">
              State-of-the-art technology for comprehensive water resource monitoring
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/uploads/40fbd451-256d-4e46-94fb-25328c43de28.png" 
                alt="Monitoring Station" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Droplets className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Automated Data Collection</h4>
                  <p className="text-gray-600">
                    Sensors and gauges collect data every 15 minutes, providing real-time insights 
                    into water levels and environmental conditions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CloudRain className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Weather Integration</h4>
                  <p className="text-gray-600">
                    Integration with meteorological data for comprehensive weather pattern analysis 
                    and flood prediction models.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Predictive Analytics</h4>
                  <p className="text-gray-600">
                    Machine learning algorithms analyze historical data to predict water availability 
                    and optimize irrigation scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Irrigation Department</h2>
              </div>
              <p className="text-blue-200 mb-6">
                Government of Sri Lanka's premier water resource management authority, 
                dedicated to sustainable irrigation and flood management solutions.
              </p>
              <p className="text-blue-200 text-sm">
                © 2024 Irrigation Department, Government of Sri Lanka. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li>230, Bauddhaloka Mawatha</li>
                <li>Colombo 07, Sri Lanka</li>
                <li>Phone: +94 11 2580067</li>
                <li>Email: info@irrigation.gov.lk</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Ministry of Agriculture</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Weather Department</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disaster Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Public Reports</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
