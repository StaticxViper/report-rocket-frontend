
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Heart, MapPin, Mail, Plus, Trash2, Building2 } from 'lucide-react';

export default function Favorites() {
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [newProperty, setNewProperty] = useState('');
  const [newArea, setNewArea] = useState('');

  const favoriteProperties = [
    {
      id: '1',
      address: '123 Main St, Los Angeles, CA 90210',
      addedDate: '2024-01-15',
      lastUpdate: '2024-01-20'
    },
    {
      id: '2',
      address: '456 Oak Ave, San Francisco, CA 94102',
      addedDate: '2024-01-10',
      lastUpdate: '2024-01-18'
    }
  ];

  const favoriteAreas = [
    {
      id: '1',
      name: 'Beverly Hills, CA 90210',
      type: 'Zip Code',
      addedDate: '2024-01-12',
      lastUpdate: '2024-01-19'
    },
    {
      id: '2',
      name: 'San Francisco, CA',
      type: 'City',
      addedDate: '2024-01-08',
      lastUpdate: '2024-01-17'
    }
  ];

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProperty.trim()) {
      console.log('Adding property:', newProperty);
      setNewProperty('');
    }
  };

  const handleAddArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (newArea.trim()) {
      console.log('Adding area:', newArea);
      setNewArea('');
    }
  };

  const handleRemoveProperty = (id: string) => {
    console.log('Removing property:', id);
  };

  const handleRemoveArea = (id: string) => {
    console.log('Removing area:', id);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Favorites</h1>
            <p className="text-muted-foreground">
              Track your favorite properties and areas to receive monthly market updates.
            </p>
          </div>

          {/* Email Settings */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Updates
              </CardTitle>
              <CardDescription>
                Receive monthly reports on your favorite properties and areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-updates" className="text-sm font-medium">
                    Monthly Email Reports
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get market updates and property insights delivered to your inbox
                  </p>
                </div>
                <Switch
                  id="email-updates"
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="properties" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="properties">Favorite Properties</TabsTrigger>
              <TabsTrigger value="areas">Favorite Areas</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-6">
              {/* Add New Property */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Property to Favorites
                  </CardTitle>
                  <CardDescription>
                    Add a property address to receive monthly market updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProperty} className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        value={newProperty}
                        onChange={(e) => setNewProperty(e.target.value)}
                        placeholder="Enter property address..."
                      />
                    </div>
                    <Button type="submit" disabled={!newProperty.trim()}>
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Favorite Properties List */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Favorite Properties</CardTitle>
                  <CardDescription>
                    Properties you're tracking for market updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favoriteProperties.length > 0 ? (
                    <div className="space-y-4">
                      {favoriteProperties.map((property) => (
                        <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-start space-x-4">
                            <Building2 className="h-5 w-5 text-muted-foreground mt-1" />
                            <div>
                              <p className="font-medium">{property.address}</p>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                                <span>Added: {property.addedDate}</span>
                                <span>Last Update: {property.lastUpdate}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveProperty(property.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No favorite properties yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="areas" className="space-y-6">
              {/* Add New Area */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Area to Favorites
                  </CardTitle>
                  <CardDescription>
                    Add a city or zip code to receive monthly area market reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddArea} className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        placeholder="Enter city name or zip code..."
                      />
                    </div>
                    <Button type="submit" disabled={!newArea.trim()}>
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Favorite Areas List */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Favorite Areas</CardTitle>
                  <CardDescription>
                    Cities and zip codes you're tracking for market insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favoriteAreas.length > 0 ? (
                    <div className="space-y-4">
                      {favoriteAreas.map((area) => (
                        <div key={area.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-start space-x-4">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium">{area.name}</p>
                                <Badge variant="secondary" className="text-xs">
                                  {area.type}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                                <span>Added: {area.addedDate}</span>
                                <span>Last Update: {area.lastUpdate}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveArea(area.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No favorite areas yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
