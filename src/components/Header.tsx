
import { Search, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onOpenChat: () => void;
  isLoading: boolean;
}

const Header = ({ searchQuery, onSearchChange, onSearch, onOpenChat, isLoading }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="bg-brand-white border-b border-brand-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-red font-inter">
              FábioBooks
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-brand-gray-600 hover:text-brand-red transition-colors font-inter font-medium">
              Home
            </a>
            <a href="#" className="text-brand-gray-600 hover:text-brand-red transition-colors font-inter font-medium">
              Livros
            </a>
            <a href="#" className="text-brand-gray-600 hover:text-brand-red transition-colors font-inter font-medium">
              Contato
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={onOpenChat}
              variant="outline"
              className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white 
                       transition-all duration-200 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Chat IA
            </Button>
            
            <Button
              variant="outline"
              className="border-brand-gray-300 text-brand-gray-600 hover:bg-brand-gray-100"
            >
              Cadastrar
            </Button>

            <Button className="bg-brand-red hover:bg-brand-red-dark text-white">
              Entrar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-brand-gray-600"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-brand-gray-600 hover:text-brand-red transition-colors font-inter font-medium">
                Home
              </a>
              <a href="#" className="text-brand-gray-600 hover:text-brand-red transition-colors font-inter font-medium">
                Livros
              </a>
              <a href="#" className="text-brand-gray-600 hover:text-brand-red transition-colors font-inter font-medium">
                Contato
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  onClick={onOpenChat}
                  variant="outline"
                  className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white w-full"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat IA
                </Button>
                <Button variant="outline" className="w-full">Cadastrar</Button>
                <Button className="bg-brand-red hover:bg-brand-red-dark text-white w-full">Entrar</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
