
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Droplets, Plus, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WaterLevelEntryProps {
  user: {name: string, role: string} | null;
}

const WaterLevelEntry = ({ user }: WaterLevelEntryProps) => {
  const [formData, setFormData] = useState({
    locationId: '',
    waterLevel: '',
    measurementType: 'Manual',
    notes: ''
  });
  
  const [locations, setLocations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      toast({
        title: "Error",
        description: "Failed to load monitoring locations",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.locationId || !formData.waterLevel) return;

    setIsSubmitting(true);
    try {
      // Get current user ID from Supabase auth
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('water_level_measurements')
        .insert({
          location_id: formData.locationId,
          recorded_by: authUser.id,
          water_level: parseFloat(formData.waterLevel),
          measurement_type: formData.measurementType,
          notes: formData.notes || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Water level measurement recorded successfully"
      });

      // Reset form
      setFormData({
        locationId: '',
        waterLevel: '',
        measurementType: 'Manual',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting water level:', error);
      toast({
        title: "Error",
        description: "Failed to record measurement",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedLocation = locations.find(loc => loc.id === formData.locationId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-blue-600" />
            Water Level Measurement Entry
          </CardTitle>
          <CardDescription>
            Record water level measurements for monitoring locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Monitoring Location *</Label>
                <Select 
                  value={formData.locationId} 
                  onValueChange={(value) => setFormData({...formData, locationId: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a monitoring location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {location.name} ({location.location_type})
                        </div>
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
                  step="0.001"
                  value={formData.waterLevel}
                  onChange={(e) => setFormData({...formData, waterLevel: e.target.value})}
                  placeholder="Enter water level in meters"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="measurementType">Measurement Type</Label>
                <Select 
                  value={formData.measurementType} 
                  onValueChange={(value) => setFormData({...formData, measurementType: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual Reading</SelectItem>
                    <SelectItem value="Automatic">Automatic Sensor</SelectItem>
                    <SelectItem value="Calibrated">Calibrated Reading</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recordedBy">Recorded By</Label>
                <Input
                  id="recordedBy"
                  value={user?.name || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            {selectedLocation && (
              <Alert>
                <MapPin className="h-4 w-4" />
                <AlertDescription>
                  <strong>{selectedLocation.name}</strong> - {selectedLocation.location_type} in {selectedLocation.district}, {selectedLocation.province}
                  {selectedLocation.capacity && (
                    <span className="block text-sm text-gray-600 mt-1">
                      Capacity: {Number(selectedLocation.capacity).toLocaleString()} cubic meters
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Add any relevant notes about this measurement..."
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.locationId || !formData.waterLevel}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Recording Measurement...' : 'Record Water Level'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterLevelEntry;
