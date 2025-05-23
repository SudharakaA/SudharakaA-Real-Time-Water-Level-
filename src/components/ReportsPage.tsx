
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, FileText, BarChart3, TrendingUp, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ReportsPageProps {
  user: {name: string, role: string} | null;
}

const ReportsPage = ({ user }: ReportsPageProps) => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState('daily');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-01-31');

  // Mock data for different report types - Updated for Sri Lanka context
  const monthlyData = [
    { month: 'Jan', avgLevel: 16.2, minLevel: 14.5, maxLevel: 18.1, rainfall: 125.2 },
    { month: 'Feb', avgLevel: 15.8, minLevel: 14.1, maxLevel: 17.8, rainfall: 72.1 },
    { month: 'Mar', avgLevel: 15.5, minLevel: 13.8, maxLevel: 17.2, rainfall: 130.7 },
    { month: 'Apr', avgLevel: 14.9, minLevel: 13.2, maxLevel: 16.8, rainfall: 250.3 },
    { month: 'May', avgLevel: 14.2, minLevel: 12.5, maxLevel: 16.1, rainfall: 220.9 },
    { month: 'Jun', avgLevel: 13.8, minLevel: 12.1, maxLevel: 15.8, rainfall: 185.4 }
  ];

  const yearlyComparison = [
    { year: '2020', avgLevel: 15.8, totalRainfall: 1850 },
    { year: '2021', avgLevel: 14.9, totalRainfall: 1780 },
    { year: '2022', avgLevel: 16.2, totalRainfall: 1920 },
    { year: '2023', avgLevel: 15.6, totalRainfall: 1810 },
    { year: '2024', avgLevel: 15.3, totalRainfall: 1695 }
  ];

  const locationDistribution = [
    { name: 'Mahaweli Dam', value: 35, level: 16.8 },
    { name: 'Parakrama Canal', value: 25, level: 12.3 },
    { name: 'Kala Wewa', value: 20, level: 8.5 },
    { name: 'Victoria Reservoir', value: 20, level: 14.2 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'dam1', name: 'Mahaweli Dam' },
    { id: 'canal1', name: 'Parakrama Canal' },
    { id: 'canal2', name: 'Kala Wewa' },
    { id: 'pump1', name: 'Victoria Reservoir' }
  ];

  const handleExportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simulate export functionality
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report for ${reportType} data...`,
    });

    // Create a mock CSV for immediate download
    if (format === 'csv') {
      const headers = 'Date,Location,Water Level (m),Rainfall (mm)\n';
      let csvContent = headers;
      
      // Add some mock data
      const mockData = [
        '2024-01-01,Mahaweli Dam,16.2,125.2',
        '2024-01-02,Mahaweli Dam,16.1,0',
        '2024-01-03,Mahaweli Dam,16.0,15.5',
        '2024-01-04,Mahaweli Dam,15.9,30.2',
        '2024-01-05,Mahaweli Dam,15.7,10.1'
      ];
      
      csvContent += mockData.join('\n');
      
      // Create a blob and download it
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `water_levels_${reportType}_${dateFrom}_${dateTo}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      setTimeout(() => {
        toast({
          title: "Export Complete",
          description: `${reportType} report has been downloaded as ${format.toUpperCase()}.`,
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Report Configuration
          </CardTitle>
          <CardDescription>
            Configure and generate water level monitoring reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Report</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Analysis</SelectItem>
                  <SelectItem value="yearly">Yearly Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>From Date</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>To Date</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => handleExportReport('pdf')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleExportReport('excel')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Excel
            </Button>
            <Button 
              variant="secondary"
              onClick={() => handleExportReport('csv')}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Monthly Water Level & Rainfall Trends
          </CardTitle>
          <CardDescription>
            Average, minimum, and maximum water levels with rainfall correlation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" label={{ value: 'Water Level (m)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                formatter={(value, name) => {
                  if (typeof value !== 'number') return [value, name];
                  
                  // Handle different data types
                  if (name === 'rainfall') {
                    return [value.toFixed(1), 'Rainfall (mm)'];
                  } else {
                    // Convert camelCase to readable format - fix the TypeScript error
                    const nameStr = String(name);
                    const formattedName = nameStr.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                    return [value.toFixed(1), `${formattedName} (m)`];
                  }
                }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="avgLevel" stroke="#2563eb" strokeWidth={3} name="Average Level" />
              <Line yAxisId="left" type="monotone" dataKey="minLevel" stroke="#dc2626" strokeDasharray="5 5" name="Minimum Level" />
              <Line yAxisId="left" type="monotone" dataKey="maxLevel" stroke="#16a34a" strokeDasharray="5 5" name="Maximum Level" />
              <Bar yAxisId="right" dataKey="rainfall" fill="#06b6d4" opacity={0.6} name="Rainfall" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Yearly Comparison
            </CardTitle>
            <CardDescription>
              Historical water level trends and rainfall patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyComparison}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgLevel" fill="#2563eb" name="Avg Water Level (m)" />
                <Bar dataKey="totalRainfall" fill="#10b981" name="Total Rainfall (mm)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Monitoring Coverage
            </CardTitle>
            <CardDescription>
              Distribution of monitoring points and current levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {locationDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, 'Coverage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {locationDistribution.map((location, index) => (
                <div key={location.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{location.name}</span>
                  </div>
                  <span className="font-medium">{location.level}m</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
          <CardDescription>
            Key statistics for the selected period and location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">15.4m</div>
              <div className="text-sm text-blue-800">Average Level</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">18.1m</div>
              <div className="text-sm text-green-800">Peak Level</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">12.1m</div>
              <div className="text-sm text-yellow-800">Lowest Level</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">185.6mm</div>
              <div className="text-sm text-purple-800">Avg Rainfall</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
