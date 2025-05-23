
import React from 'react';
import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Droplets, CloudRain, Download, Calendar } from 'lucide-react';
import AuthenticationModal from '@/components/AuthenticationModal';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import Dashboard from '@/components/Dashboard';
import WaterLevelEntry from '@/components/WaterLevelEntry';
import RainfallEntry from '@/components/RainfallEntry';
import HourlyReports from '@/components/HourlyReports';
import ReportsPage from '@/components/ReportsPage';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';

const Index = () => {
  const [user, setUser] = useState<{name: string, role: string} | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showAuth, setShowAuth] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const handleLogin = (userData: {name: string, role: string}) => {
    setUser(userData);
    setShowAuth(false);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
    setShowLanding(true);
    setActiveTab('home');
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowAuth(true);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (showAuth) {
    return <AuthenticationModal onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/40fbd451-256d-4e46-94fb-25328c43de28.png')`
        }}
      />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="container mx-auto px-4 py-8 flex-grow">
          <NavigationMenu className="mx-auto mb-8 max-w-none w-full justify-center">
            <NavigationMenuList className="bg-white/80 backdrop-blur-sm shadow-sm rounded-lg px-4 py-2">
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab('home')} 
                  className={`${activeTab === 'home' ? 'bg-blue-100 text-blue-800' : ''} flex items-center gap-2 px-4 py-2 rounded-md`}
                >
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab('dashboard')} 
                  className={`${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-800' : ''} flex items-center gap-2 px-4 py-2 rounded-md`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Dashboard
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab('water-entry')} 
                  className={`${activeTab === 'water-entry' ? 'bg-blue-100 text-blue-800' : ''} flex items-center gap-2 px-4 py-2 rounded-md`}
                >
                  <Droplets className="w-4 h-4" />
                  Water Level Entry
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab('rainfall-entry')} 
                  className={`${activeTab === 'rainfall-entry' ? 'bg-blue-100 text-blue-800' : ''} flex items-center gap-2 px-4 py-2 rounded-md`}
                >
                  <CloudRain className="w-4 h-4" />
                  Rainfall Entry
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab('hourly-reports')} 
                  className={`${activeTab === 'hourly-reports' ? 'bg-blue-100 text-blue-800' : ''} flex items-center gap-2 px-4 py-2 rounded-md`}
                >
                  <Calendar className="w-4 h-4" />
                  Hourly Reports
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab('reports')} 
                  className={`${activeTab === 'reports' ? 'bg-blue-100 text-blue-800' : ''} flex items-center gap-2 px-4 py-2 rounded-md`}
                >
                  <Download className="w-4 h-4" />
                  Reports
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="home">
              <HomePage user={user} />
            </TabsContent>
            
            <TabsContent value="dashboard">
              <Dashboard user={user} />
            </TabsContent>

            <TabsContent value="water-entry">
              <WaterLevelEntry user={user} />
            </TabsContent>

            <TabsContent value="rainfall-entry">
              <RainfallEntry user={user} />
            </TabsContent>

            <TabsContent value="hourly-reports">
              <HourlyReports user={user} />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsPage user={user} />
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
