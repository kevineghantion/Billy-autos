import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFleetContext } from '@/contexts/FleetContext';

interface SearchBarProps {
  compact?: boolean;
  onFleetPage?: boolean;
}

export function SearchBar({ compact = false, onFleetPage = false }: SearchBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get current filter values from URL
  const make = searchParams.get('make') || '';
  const bodyType = searchParams.get('bodyType') || '';
  const year = searchParams.get('year') || '';
  
  // Get dynamic filter options from context
  const { makes, bodyTypes, years } = useFleetContext();

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    
    if (onFleetPage || location.pathname === '/fleet') {
      // On fleet page, update URL directly
      setSearchParams(newParams);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (make && make !== 'all') params.set('make', make);
    if (bodyType && bodyType !== 'all') params.set('bodyType', bodyType);
    if (year && year !== 'all') params.set('year', year);
    navigate(`/fleet?${params.toString()}`);
  };

  return (
    <div
      className={`glass-card p-4 md:p-6 mx-auto ${
        compact ? 'max-w-4xl' : 'max-w-5xl'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Make Select - DYNAMIC */}
        <Select 
          value={make || 'all'} 
          onValueChange={(v) => updateFilter('make', v)}
        >
          <SelectTrigger className="bg-background/50 border-white/10 text-foreground h-12 font-display tracking-wide">
            <SelectValue placeholder="Choose Make" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10">
            <SelectItem value="all">All Makes</SelectItem>
            {makes.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Body Type Select - DYNAMIC */}
        <Select 
          value={bodyType || 'all'} 
          onValueChange={(v) => updateFilter('bodyType', v)}
        >
          <SelectTrigger className="bg-background/50 border-white/10 text-foreground h-12 font-display tracking-wide">
            <SelectValue placeholder="Body Type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10">
            <SelectItem value="all">All Types</SelectItem>
            {bodyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year Select - DYNAMIC */}
        <Select 
          value={year || 'all'} 
          onValueChange={(v) => updateFilter('year', v)}
        >
          <SelectTrigger className="bg-background/50 border-white/10 text-foreground h-12 font-display tracking-wide">
            <SelectValue placeholder="Choose Year" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10">
            <SelectItem value="all">All Years</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="btn-gold h-12 font-display tracking-wider text-base"
        >
          <Search className="w-5 h-5 mr-2" />
          SEARCH
        </Button>
      </div>
    </div>
  );
}
