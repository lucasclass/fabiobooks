
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import ChatModal from "@/components/ChatModal";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  rating?: number;
  price?: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  // Simulated book data
  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'O Alquimista',
      author: 'Paulo Coelho',
      description: 'Uma jornada inesquecível sobre sonhos, destino e a busca pela realização pessoal.',
      rating: 4.5,
      price: 'R$ 29,90'
    },
    {
      id: '2',
      title: 'Sapiens: Uma Breve História da Humanidade',
      author: 'Yuval Noah Harari',
      description: 'Uma exploração fascinante sobre como nossa espécie conseguiu dominar o mundo.',
      rating: 4.8,
      price: 'R$ 39,90'
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      description: 'Um clássico distópico sobre vigilância, controle e a luta pela liberdade individual.',
      rating: 4.7,
      price: 'R$ 24,90'
    },
    {
      id: '4',
      title: 'O Pequeno Príncipe',
      author: 'Antoine de Saint-Exupéry',
      description: 'Uma história tocante sobre amizade, amor e a importância de ver com o coração.',
      rating: 4.6,
      price: 'R$ 19,90'
    },
    {
      id: '5',
      title: 'Dune',
      author: 'Frank Herbert',
      description: 'Uma épica obra de ficção científica ambientada em um universo distante e complexo.',
      rating: 4.4,
      price: 'R$ 49,90'
    },
    {
      id: '6',
      title: 'O Código Da Vinci',
      author: 'Dan Brown',
      description: 'Um thriller envolvente que mistura arte, história e mistério em uma trama eletrizante.',
      rating: 4.3,
      price: 'R$ 34,90'
    },
    {
      id: '7',
      title: 'Cem Anos de Solidão',
      author: 'Gabriel García Márquez',
      description: 'Uma obra-prima do realismo mágico que conta a saga da família Buendía.',
      rating: 4.9,
      price: 'R$ 42,90'
    },
    {
      id: '8',
      title: 'O Senhor dos Anéis: A Sociedade do Anel',
      author: 'J.R.R. Tolkien',
      description: 'O início da épica jornada pela Terra Média em busca da destruição do Um Anel.',
      rating: 4.8,
      price: 'R$ 45,90'
    },
    {
      id: '9',
      title: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      description: 'Um romance clássico sobre amor, sociedade e primeiras impressões na Inglaterra do séc. XIX.',
      rating: 4.5,
      price: 'R$ 27,90'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Campo vazio",
        description: "Digite algo para buscar livros.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter books based on search query
    const filteredBooks = mockBooks.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setBooks(filteredBooks);
    setIsLoading(false);

    if (filteredBooks.length === 0) {
      toast({
        title: "Nenhum resultado encontrado",
        description: `Não encontramos livros para "${searchQuery}". Tente outros termos.`,
      });
    } else {
      toast({
        title: "Busca realizada",
        description: `Encontramos ${filteredBooks.length} livro(s) para "${searchQuery}".`,
      });
    }
  };

  // Show popular books on first load
  useEffect(() => {
    setBooks(mockBooks.slice(0, 6));
  }, []);

  return (
    <div className="min-h-screen bg-brand-white font-inter">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onOpenChat={() => setIsChatOpen(true)}
        isLoading={isLoading}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Results Section */}
        {!hasSearched && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-brand-black mb-2">
              Livros Populares
            </h2>
            <p className="text-brand-gray-600">
              Descubra alguns dos livros mais queridos pelos nossos leitores
            </p>
          </div>
        )}

        {hasSearched && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-brand-black mb-2">
              {isLoading ? 'Buscando...' : `Resultados para "${searchQuery}"`}
            </h2>
            {!isLoading && (
              <p className="text-brand-gray-600">
                {books.length === 0 
                  ? 'Nenhum livro encontrado' 
                  : `${books.length} livro(s) encontrado(s)`
                }
              </p>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[3/4] bg-brand-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-brand-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-brand-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-brand-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-brand-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Books Grid */}
        {!isLoading && books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && hasSearched && books.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-brand-black mb-2">
              Nenhum livro encontrado
            </h3>
            <p className="text-brand-gray-600 mb-6">
              Tente buscar com outros termos ou converse com nossa IA para descobrir novos livros!
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-3 rounded-lg 
                       font-medium transition-all duration-200"
            >
              Pedir Recomendações à IA
            </button>
          </div>
        )}
      </main>

      {/* Chat Modal */}
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Index;
