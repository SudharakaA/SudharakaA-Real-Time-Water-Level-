
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Droplets, CloudRain, Download, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format, subDays } from 'date-fns';

interface HourlyReportsProps {
  user: {name: string, role: string} | null;
}

const HourlyReports = ({ user }: HourlyReportsProps) => {
  const [dateRange, setDateRange] = useState({
    startDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [waterLevelData, setWaterLevelData] = useState<any[]>([]);
  const [rainfallData, setRainfallData] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('monitoring_locations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const startDateTime = `${dateRange.startDate}T00:00:00Z`;
      const endDateTime = `${dateRange.endDate}T23:59:59Z`;
      const locationFilter = selectedLocation || null;

      // Fetch water level report
      const { data: waterData, error: waterError } = await supabase
        .rpc('get_hourly_water_level_report', {
          start_date: startDateTime,
          end_date: endDateTime,
          location_filter: locationFilter
        });

      if (waterError) throw waterError;

      // Fetch rainfall report
      const { data: rainData, error: rainError } = await supabase
        .rpc('get_hourly_rainfall_report', {
          start_date: startDateTime,
          end_date: endDateTime,
          location_filter: locationFilter
        });

      if (rainError) throw rainError;

      setWaterLevelData(waterData || []);
      setRainfallData(rainData || []);

      toast({
        title: "Success",
        description: "Hourly reports generated successfully"
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to generate reports",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-purple-600" />
            Hourly Reports Generator
          </CardTitle>
          <CardDescription>
            Generate detailed hourly reports for water level and rainfall measurements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={fetchReports} disabled={isLoading} className="w-full">
                {isLoading ? 'Generating...' : 'Generate Reports'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="water-level" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="water-level" className="flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            Water Level Reports
          </TabsTrigger>
          <TabsTrigger value="rainfall" className="flex items-center gap-2">
            <CloudRain className="h-4 w-4" />
            Rainfall Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="water-level">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Hourly Water Level Report</CardTitle>
                  <CardDescription>
                    {waterLevelData.length} records found
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => exportToCSV(waterLevelData, 'water-level-hourly-report')}
                  disabled={waterLevelData.length === 0}
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Hour Period</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Location</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Avg Level (m)</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Min Level (m)</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Max Level (m)</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterLevelData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">
                          {format(new Date(row.hour_period), 'MMM dd, yyyy HH:mm')}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {row.location_name}
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right font-mono">
                          {Number(row.avg_water_level).toFixed(3)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right font-mono">
                          {Number(row.min_water_level).toFixed(3)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right font-mono">
                          {Number(row.max_water_level).toFixed(3)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right">
                          <Badge variant="secondary">{row.measurement_count}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {waterLevelData.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No water level data found for the selected period
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rainfall">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Hourly Rainfall Report</CardTitle>
                  <CardDescription>
                    {rainfallData.length} records found
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => exportToCSV(rainfallData, 'rainfall-hourly-report')}
                  disabled={rainfallData.length === 0}
                  variant="outline"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Hour Period</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Location</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Total Rainfall (mm)</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Avg Rainfall (mm)</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Max Rainfall (mm)</th>
                      <th className="border border-gray-200 px-4 py-2 text-right">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rainfallData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2">
                          {format(new Date(row.hour_period), 'MMM dd, yyyy HH:mm')}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {row.location_name}
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right font-mono">
                          {Number(row.total_rainfall).toFixed(2)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right font-mono">
                          {Number(row.avg_rainfall).toFixed(2)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right font-mono">
                          {Number(row.max_rainfall).toFixed(2)}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-right">
                          <Badge variant="secondary">{row.measurement_count}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rainfallData.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No rainfall data found for the selected period
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HourlyReports;
