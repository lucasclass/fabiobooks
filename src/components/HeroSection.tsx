
import { Search, Sparkles, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onOpenChat: () => void;
  isLoading: boolean;
}

const HeroSection = ({ searchQuery, onSearchChange, onSearch, onOpenChat, isLoading }: HeroSectionProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-white via-brand-gray-50 to-brand-gray-100 py-20 lg:py-32 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Descubra com nossa IA
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-black font-inter leading-tight">
                A Leitura É{" "}
                <span className="text-brand-red relative">
                  Fascinante
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-brand-red/30 rounded-full"></div>
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-brand-gray-600 font-inter leading-relaxed max-w-lg">
                Descubra seu próximo livro favorito com nossa inteligência artificial. 
                Recomendações personalizadas baseadas no seu gosto literário.
              </p>
            </div>

            {/* Search Section */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Buscar livros, autores, gêneros..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full h-14 px-6 pr-12 text-lg border-2 border-brand-gray-300 rounded-2xl font-inter 
                             focus:border-brand-red focus:ring-4 focus:ring-brand-red/20 
                             transition-all duration-200 bg-white shadow-sm"
                    disabled={isLoading}
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-gray-400 h-6 w-6" />
                </div>
                
                <Button
                  onClick={onSearch}
                  disabled={isLoading}
                  className="bg-brand-red hover:bg-brand-red-dark text-white px-8 h-14 rounded-2xl 
                           font-inter font-semibold text-lg transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? 'Buscando...' : 'Buscar'}
                </Button>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button
                  onClick={onOpenChat}
                  className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white px-8 py-3 rounded-xl 
                           font-inter font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105
                           flex items-center gap-3"
                >
                  <Sparkles className="h-5 w-5" />
                  Recomendações com IA
                </Button>

                <div className="flex items-center gap-6 text-sm text-brand-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-brand-red" />
                    <span>10k+ livros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-brand-red" />
                    <span>Recomendações personalizadas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Decorative */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-96">
              {/* Circular background */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-brand-red/10 rounded-full"></div>
              
              {/* Floating book cards */}
              <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
                <div className="w-16 h-20 bg-brand-red/20 rounded mb-2"></div>
                <div className="text-xs text-brand-gray-600">Romance</div>
              </div>
              
              <div className="absolute top-16 right-12 bg-white p-4 rounded-xl shadow-lg transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
                <div className="w-16 h-20 bg-brand-red/30 rounded mb-2"></div>
                <div className="text-xs text-brand-gray-600">Ficção</div>
              </div>
              
              <div className="absolute bottom-16 left-16 bg-white p-4 rounded-xl shadow-lg transform rotate-6 hover:rotate-3 transition-transform duration-300">
                <div className="w-16 h-20 bg-brand-red/25 rounded mb-2"></div>
                <div className="text-xs text-brand-gray-600">Mistério</div>
              </div>

              {/* Central element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl">
                <Sparkles className="h-8 w-8 text-brand-red mx-auto mb-2" />
                <div className="text-sm font-semibold text-brand-black text-center">IA Literária</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
