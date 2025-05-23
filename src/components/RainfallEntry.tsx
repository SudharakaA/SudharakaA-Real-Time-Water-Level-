
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CloudRain, Plus, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RainfallEntryProps {
  user: {name: string, role: string} | null;
}

const RainfallEntry = ({ user }: RainfallEntryProps) => {
  const [formData, setFormData] = useState({
    locationId: '',
    rainfallAmount: '',
    durationHours: '1',
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
    if (!user || !formData.locationId || !formData.rainfallAmount) return;

    setIsSubmitting(true);
    try {
      // Get current user ID from Supabase auth
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('rainfall_measurements')
        .insert({
          location_id: formData.locationId,
          recorded_by: authUser.id,
          rainfall_amount: parseFloat(formData.rainfallAmount),
          duration_hours: parseInt(formData.durationHours),
          measurement_type: formData.measurementType,
          notes: formData.notes || null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Rainfall measurement recorded successfully"
      });

      // Reset form
      setFormData({
        locationId: '',
        rainfallAmount: '',
        durationHours: '1',
        measurementType: 'Manual',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting rainfall:', error);
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
            <CloudRain className="h-6 w-6 text-green-600" />
            Rainfall Measurement Entry
          </CardTitle>
          <CardDescription>
            Record rainfall measurements for monitoring locations
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
                <Label htmlFor="rainfallAmount">Rainfall Amount (mm) *</Label>
                <Input
                  id="rainfallAmount"
                  type="number"
                  step="0.1"
                  value={formData.rainfallAmount}
                  onChange={(e) => setFormData({...formData, rainfallAmount: e.target.value})}
                  placeholder="Enter rainfall in millimeters"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="durationHours">Duration (hours)</Label>
                <Select 
                  value={formData.durationHours} 
                  onValueChange={(value) => setFormData({...formData, durationHours: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="3">3 hours</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="Automatic">Automatic Gauge</SelectItem>
                    <SelectItem value="Calibrated">Calibrated Reading</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
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
                  <span className="block text-sm text-gray-600 mt-1">
                    Recording rainfall data for {formData.durationHours} hour(s) period
                  </span>
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
              disabled={isSubmitting || !formData.locationId || !formData.rainfallAmount}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Recording Measurement...' : 'Record Rainfall'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RainfallEntry;
