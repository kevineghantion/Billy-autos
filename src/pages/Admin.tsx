import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, ArrowLeft, Upload, X, LogOut } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { SEOHead } from '@/components/SEOHead';

interface CarFormData {
  id: string;
  name: string;
  make: string;
  year: number;
  price: number;
  status: 'available' | 'sold';
  bodyType: string;
  color: string;
  interiorColor: string;
  coverImage: string;
  gallery: string[];
  specs: {
    mileage: number;
    horsepower: number;
    engine: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    drivetrain: string;
    fuelType: string;
    torque: string;
    seats: number;
  };
  featured: boolean;
  isNew: boolean;
}

const MAKES = [
  'Custom',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Bugatti',
  'Cadillac',
  'Ferrari',
  'Genesis',
  'Infiniti',
  'Jaguar',
  'Koenigsegg',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Lincoln',
  'Maserati',
  'McLaren',
  'Mercedes-AMG',
  'Mercedes-Benz',
  'Nissan',
  'Pagani',
  'Porsche',
  'Range Rover',
  'Rolls-Royce',
  'Toyota',
];

const BODY_TYPES = ['Hypercar', 'Supercar', 'SUV', 'Sedan', 'Coupe', 'Convertible'];

const STORAGE_KEY = 'billy_autos_fleet';
const SESSION_KEY = 'billy_autos_admin_token';

const getStoredFleet = (): CarFormData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFleet = (fleet: CarFormData[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fleet));
  // Dispatch storage event so other tabs/contexts update
  window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
};

const createEmptyCar = (): CarFormData => ({
  id: `car-${Date.now()}`,
  name: '',
  make: 'Ferrari',
  year: 2024,
  price: 0,
  status: 'available',
  bodyType: 'Supercar',
  color: '',
  interiorColor: '',
  coverImage: '',
  gallery: [],
  specs: {
    mileage: 0,
    horsepower: 500,
    engine: '',
    acceleration: '3.0s',
    topSpeed: '300 km/h',
    transmission: '8-Speed Automatic',
    drivetrain: 'RWD',
    fuelType: 'Petrol',
    torque: '700 Nm',
    seats: 2,
  },
  featured: false,
  isNew: true,
});

const AdminPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fleet, setFleet] = useState<CarFormData[]>(getStoredFleet);
  const [editingCar, setEditingCar] = useState<CarFormData | null>(null);
  const [galleryInput, setGalleryInput] = useState('');
  const [customMake, setCustomMake] = useState('');

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFleet(getStoredFleet());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  };

  const handleSave = () => {
    if (!editingCar) return;

    const updatedFleet = fleet.some((c) => c.id === editingCar.id)
      ? fleet.map((c) => (c.id === editingCar.id ? editingCar : c))
      : [...fleet, editingCar];

    setFleet(updatedFleet);
    saveFleet(updatedFleet);
    setEditingCar(null);
    toast({
      title: 'Car Saved',
      description: `${editingCar.name} has been saved successfully.`,
    });
  };

  const handleDelete = (id: string) => {
    const updatedFleet = fleet.filter((c) => c.id !== id);
    setFleet(updatedFleet);
    saveFleet(updatedFleet);
    toast({
      title: 'Car Deleted',
      description: 'The car has been removed from the fleet.',
    });
  };

  const addGalleryImage = () => {
    if (galleryInput && editingCar) {
      setEditingCar({
        ...editingCar,
        gallery: [...editingCar.gallery, galleryInput],
      });
      setGalleryInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editingCar) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditingCar((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            gallery: [...prev.gallery, base64String],
          };
        });
      };
      reader.readAsDataURL(file);
    });

    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  const removeGalleryImage = (index: number) => {
    if (editingCar) {
      setEditingCar({
        ...editingCar,
        gallery: editingCar.gallery.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Admin Panel | Billy Autos" />
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">
                  ADMIN PANEL
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-black text-foreground">
                  FLEET MANAGER
                </h1>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="btn-glass"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Site
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="btn-glass text-destructive hover:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          {!editingCar ? (
            <>
              {/* Fleet List */}
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Managing{' '}
                  <span className="text-foreground font-bold">
                    {fleet.length}
                  </span>{' '}
                  vehicles
                </p>
                <Button
                  onClick={() => setEditingCar(createEmptyCar())}
                  className="btn-gold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Car
                </Button>
              </div>

              <div className="grid gap-4">
                {fleet.length === 0 ? (
                  <div className="glass-card p-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      No cars in the fleet yet. Add your first vehicle!
                    </p>
                    <Button
                      onClick={() => setEditingCar(createEmptyCar())}
                      className="btn-gold"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Car
                    </Button>
                  </div>
                ) : (
                  fleet.map((car) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass-card p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {car.coverImage && (
                          <img
                            src={car.coverImage}
                            alt={car.name}
                            className="w-20 h-14 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-display font-bold text-foreground">
                            {car.name || 'Untitled'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {car.year} • {car.make} •{' '}
                            {car.price === 0
                              ? 'P.O.A.'
                              : `$${car.price.toLocaleString()}`}
                          </p>
                        </div>
                        {car.status === 'sold' && (
                          <span className="px-2 py-1 bg-destructive/20 text-destructive text-xs font-bold rounded">
                            SOLD
                          </span>
                        )}
                        {car.featured && (
                          <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingCar(car)}
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(car.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          ) : (
            /* Edit Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  {fleet.some((c) => c.id === editingCar.id)
                    ? 'Edit Car'
                    : 'Add New Car'}
                </h2>
                <Button
                  onClick={() => setEditingCar(null)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={editingCar.name}
                    onChange={(e) =>
                      setEditingCar({ ...editingCar, name: e.target.value })
                    }
                    placeholder="e.g., Ferrari SF90 Stradale"
                    className="bg-background/50"
                  />
                </div>

                {/* Make */}
                <div className="space-y-2">
                  <Label>Make *</Label>
                  <Select
                    value={MAKES.includes(editingCar.make) ? editingCar.make : 'Custom'}
                    onValueChange={(v) => {
                      if (v === 'Custom') {
                        setCustomMake(editingCar.make);
                        setEditingCar({ ...editingCar, make: '' });
                      } else {
                        setCustomMake('');
                        setEditingCar({ ...editingCar, make: v });
                      }
                    }}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MAKES.map((make) => (
                        <SelectItem key={make} value={make}>
                          {make}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(!MAKES.includes(editingCar.make) || editingCar.make === '') && (
                    <Input
                      value={customMake || editingCar.make}
                      onChange={(e) => {
                        setCustomMake(e.target.value);
                        setEditingCar({ ...editingCar, make: e.target.value });
                      }}
                      placeholder="Enter custom make (e.g., Range Rover Sport)"
                      className="bg-background/50 mt-2"
                    />
                  )}
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <Label>Year *</Label>
                  <Input
                    type="number"
                    value={editingCar.year}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        year: parseInt(e.target.value) || 2024,
                      })
                    }
                    className="bg-background/50"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label>Price (USD) - 0 for No Price.</Label>
                  <Input
                    type="number"
                    value={editingCar.price}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        price: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-background/50"
                  />
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label>Status *</Label>
                  <Select
                    value={editingCar.status}
                    onValueChange={(v: 'available' | 'sold') =>
                      setEditingCar({ ...editingCar, status: v })
                    }
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Body Type */}
                <div className="space-y-2">
                  <Label>Body Type *</Label>
                  <Select
                    value={editingCar.bodyType}
                    onValueChange={(v) =>
                      setEditingCar({ ...editingCar, bodyType: v })
                    }
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BODY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label>Exterior Color</Label>
                  <Input
                    value={editingCar.color}
                    onChange={(e) =>
                      setEditingCar({ ...editingCar, color: e.target.value })
                    }
                    placeholder="e.g., Rosso Corsa"
                    className="bg-background/50"
                  />
                </div>

                {/* Interior Color */}
                <div className="space-y-2">
                  <Label>Interior Color</Label>
                  <Input
                    value={editingCar.interiorColor}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        interiorColor: e.target.value,
                      })
                    }
                    placeholder="e.g., Black Alcantara"
                    className="bg-background/50"
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label>Cover Image URL</Label>
                  <Input
                    value={editingCar.coverImage}
                    onChange={(e) =>
                      setEditingCar({
                        ...editingCar,
                        coverImage: e.target.value,
                      })
                    }
                    placeholder="https://..."
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Specs Section */}
              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Mileage (KM)</Label>
                    <Input
                      type="number"
                      value={editingCar.specs.mileage}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            mileage: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Horsepower (HP)</Label>
                    <Input
                      type="number"
                      value={editingCar.specs.horsepower}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            horsepower: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Engine</Label>
                    <Input
                      value={editingCar.specs.engine}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: { ...editingCar.specs, engine: e.target.value },
                        })
                      }
                      placeholder="e.g., 4.0L V8 Twin-Turbo"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>0-100 km/h</Label>
                    <Input
                      value={editingCar.specs.acceleration}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            acceleration: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g., 2.5s"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Top Speed</Label>
                    <Input
                      value={editingCar.specs.topSpeed}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            topSpeed: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g., 340 km/h"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Transmission</Label>
                    <Input
                      value={editingCar.specs.transmission}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            transmission: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g., 8-Speed Dual-Clutch"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Drivetrain</Label>
                    <Input
                      value={editingCar.specs.drivetrain}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            drivetrain: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g., AWD"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fuel Type</Label>
                    <Input
                      value={editingCar.specs.fuelType}
                      onChange={(e) =>
                        setEditingCar({
                          ...editingCar,
                          specs: {
                            ...editingCar.specs,
                            fuelType: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g., Hybrid"
                      className="bg-background/50"
                    />
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Gallery Images
                </h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Input
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    placeholder="Paste image URL..."
                    className="bg-background/50 flex-1 min-w-[200px]"
                  />
                  <Button onClick={addGalleryImage} variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Add URL
                  </Button>
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      className="btn-gold cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.parentElement?.querySelector('input');
                        input?.click();
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingCar.gallery.map((url, index) => (
                    <div
                      key={index}
                      className="relative group w-24 h-16 rounded overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flags */}
              <div className="mt-8 flex gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    checked={editingCar.featured}
                    onCheckedChange={(checked) =>
                      setEditingCar({
                        ...editingCar,
                        featured: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="featured">Featured on Homepage</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isNew"
                    checked={editingCar.isNew}
                    onCheckedChange={(checked) =>
                      setEditingCar({
                        ...editingCar,
                        isNew: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="isNew">New Arrival</Label>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-4">
                <Button onClick={handleSave} className="btn-gold">
                  <Save className="w-4 h-4 mr-2" />
                  Save Car
                </Button>
                <Button
                  onClick={() => setEditingCar(null)}
                  variant="outline"
                  className="btn-glass"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPage;
