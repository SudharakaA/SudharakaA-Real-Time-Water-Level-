
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, Save, AlertTriangle, Droplets } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WaterLevelFormProps {
  user: {name: string, role: string} | null;
}

const WaterLevelForm = ({ user }: WaterLevelFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    location: '',
    waterLevel: '',
    timestamp: new Date().toISOString().slice(0, 16),
    weather: '',
    notes: '',
    gpsLat: '',
    gpsLng: '',
    measuredBy: user?.name || '',
    measurementMethod: 'manual'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const locations = [
    { id: 'dam1', name: 'Main Dam Reservoir', threshold: { min: 15, max: 20 } },
    { id: 'canal1', name: 'Primary Canal Point A', threshold: { min: 10, max: 15 } },
    { id: 'canal2', name: 'Secondary Canal B', threshold: { min: 8, max: 12 } },
    { id: 'pump1', name: 'Pump Station 1', threshold: { min: 12, max: 16 } }
  ];

  const weatherConditions = [
    'Clear/Sunny',
    'Partly Cloudy',
    'Overcast',
    'Light Rain',
    'Heavy Rain',
    'Drizzle',
    'Stormy'
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            gpsLat: position.coords.latitude.toFixed(6),
            gpsLng: position.coords.longitude.toFixed(6)
          });
          toast({
            title: "Location Captured",
            description: "GPS coordinates have been automatically filled.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get current location. Please enter manually.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const getWaterLevelStatus = (level: number, locationId: string) => {
    const location = locations.find(l => l.id === locationId);
    if (!location) return null;

    if (level < location.threshold.min) {
      return { status: 'critical', message: 'Below critical minimum level' };
    } else if (level > location.threshold.max) {
      return { status: 'high', message: 'Above maximum safe level' };
    } else if (level < location.threshold.min + 1) {
      return { status: 'low', message: 'Approaching minimum threshold' };
    }
    return { status: 'normal', message: 'Within normal range' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user?.role === 'Viewer') {
      toast({
        title: "Access Denied",
        description: "Viewers do not have permission to submit data.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Water level data submitted:', formData);
      
      toast({
        title: "Data Submitted Successfully",
        description: `Water level data for ${locations.find(l => l.id === formData.location)?.name} has been recorded.`,
      });

      // Reset form
      setFormData({
        location: '',
        waterLevel: '',
        timestamp: new Date().toISOString().slice(0, 16),
        weather: '',
        notes: '',
        gpsLat: '',
        gpsLng: '',
        measuredBy: user?.name || '',
        measurementMethod: 'manual'
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const waterLevel = parseFloat(formData.waterLevel);
  const levelStatus = formData.location && !isNaN(waterLevel) 
    ? getWaterLevelStatus(waterLevel, formData.location) 
    : null;

  if (user?.role === 'Viewer') {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            You are logged in as a Viewer. Data entry is restricted to Officers and Administrators.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Droplets className="w-6 h-6" />
            Water Level Data Entry
          </CardTitle>
          <CardDescription className="text-blue-700">
            Record daily water level measurements for monitoring and analysis
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Monitoring Location *</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select monitoring point" />
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
                <Label htmlFor="waterLevel">Water Level (meters) *</Label>
                <Input
                  id="waterLevel"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 15.7"
                  value={formData.waterLevel}
                  onChange={(e) => setFormData({...formData, waterLevel: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Water Level Status Alert */}
            {levelStatus && (
              <Alert className={
                levelStatus.status === 'critical' ? 'border-red-200 bg-red-50' :
                levelStatus.status === 'low' ? 'border-yellow-200 bg-yellow-50' :
                levelStatus.status === 'high' ? 'border-orange-200 bg-orange-50' :
                'border-green-200 bg-green-50'
              }>
                <AlertTriangle className={`h-4 w-4 ${
                  levelStatus.status === 'critical' ? 'text-red-600' :
                  levelStatus.status === 'low' ? 'text-yellow-600' :
                  levelStatus.status === 'high' ? 'text-orange-600' :
                  'text-green-600'
                }`} />
                <AlertDescription className={
                  levelStatus.status === 'critical' ? 'text-red-800' :
                  levelStatus.status === 'low' ? 'text-yellow-800' :
                  levelStatus.status === 'high' ? 'text-orange-800' :
                  'text-green-800'
                }>
                  <strong>Status:</strong> {levelStatus.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Date/Time and Weather */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timestamp">Date & Time *</Label>
                <Input
                  id="timestamp"
                  type="datetime-local"
                  value={formData.timestamp}
                  onChange={(e) => setFormData({...formData, timestamp: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weather">Weather Conditions</Label>
                <Select value={formData.weather} onValueChange={(value) => setFormData({...formData, weather: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherConditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* GPS Coordinates */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>GPS Coordinates (Optional)</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={getCurrentLocation}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Get Current Location
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gpsLat">Latitude</Label>
                  <Input
                    id="gpsLat"
                    type="number"
                    step="0.000001"
                    placeholder="e.g., 12.345678"
                    value={formData.gpsLat}
                    onChange={(e) => setFormData({...formData, gpsLat: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpsLng">Longitude</Label>
                  <Input
                    id="gpsLng"
                    type="number"
                    step="0.000001"
                    placeholder="e.g., 77.123456"
                    value={formData.gpsLng}
                    onChange={(e) => setFormData({...formData, gpsLng: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="measuredBy">Measured By</Label>
                <Input
                  id="measuredBy"
                  value={formData.measuredBy}
                  onChange={(e) => setFormData({...formData, measuredBy: e.target.value})}
                  placeholder="Field officer name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurementMethod">Measurement Method</Label>
                <Select value={formData.measurementMethod} onValueChange={(value) => setFormData({...formData, measurementMethod: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Reading</SelectItem>
                    <SelectItem value="digital">Digital Sensor</SelectItem>
                    <SelectItem value="ultrasonic">Ultrasonic Gauge</SelectItem>
                    <SelectItem value="pressure">Pressure Transducer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any observations, maintenance issues, or relevant information..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Submit Water Level Data
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterLevelForm;
