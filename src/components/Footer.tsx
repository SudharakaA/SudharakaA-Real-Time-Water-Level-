
import React from 'react';
import { Droplets } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6" />
              <h2 className="text-xl font-bold">Sri Lanka Water Level Monitoring</h2>
            </div>
            <p className="text-blue-200 mb-4">
              Providing real-time water level and rainfall monitoring for Sri Lanka's irrigation department. 
              Ensuring efficient water resource management across the nation.
            </p>
            <p className="text-blue-200 text-sm">
              © 2024 Irrigation Department, Government of Sri Lanka. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Entry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help & Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-blue-200">
              <li>Irrigation Department</li>
              <li>230, Bauddhaloka Mawatha</li>
              <li>Colombo 07, Sri Lanka</li>
              <li>Email: info@irrigation.gov.lk</li>
              <li>Phone: +94 11 2580067</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
