
import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onOpenChat: () => void;
  isLoading: boolean;
}

const Header = ({ searchQuery, onSearchChange, onSearch, onOpenChat, isLoading }: HeaderProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="bg-brand-white border-b border-brand-gray-200">
      <div className="container mx-auto px-4 py-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-red font-inter mb-2">
            FábioBooks
          </h1>
          <p className="text-brand-gray-600 text-lg font-inter">
            Descubra seu próximo livro favorito
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Buscar livros..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-12 px-4 border-2 border-brand-gray-300 rounded-lg font-inter 
                         focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 
                         transition-all duration-200"
                disabled={isLoading}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-gray-400 h-5 w-5" />
            </div>
            
            <Button
              onClick={onSearch}
              disabled={isLoading}
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 h-12 rounded-lg 
                       font-inter font-medium transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          {/* Chat Button */}
          <div className="text-center">
            <Button
              onClick={onOpenChat}
              variant="outline"
              className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white 
                       px-4 py-2 rounded-lg font-inter font-medium transition-all duration-200
                       flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Converse com nossa IA para recomendações
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
