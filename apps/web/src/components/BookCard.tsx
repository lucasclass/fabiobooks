
import { Book, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  rating?: number;
  price?: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-brand-gray-200 
                   hover:border-brand-red/30 bg-white rounded-lg overflow-hidden">
      <CardContent className="p-0">
        {/* Book Cover */}
        <div className="aspect-[3/4] bg-brand-gray-100 relative overflow-hidden">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={`Capa do livro ${book.title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br 
                          from-brand-gray-100 to-brand-gray-200">
              <Book className="h-12 w-12 text-brand-gray-400" />
            </div>
          )}
          
          {/* Price Tag */}
          {book.price && (
            <div className="absolute top-2 right-2 bg-brand-red text-white px-2 py-1 
                          rounded-md text-sm font-medium font-inter">
              {book.price}
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="p-4">
          <h3 className="font-semibold text-brand-black font-inter text-lg mb-1 
                       line-clamp-2 group-hover:text-brand-red transition-colors duration-200">
            {book.title}
          </h3>
          
          <p className="text-brand-gray-600 font-inter mb-2 text-sm">
            por {book.author}
          </p>

          {book.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(book.rating!) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-brand-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-brand-gray-600 font-inter ml-1">
                {book.rating.toFixed(1)}
              </span>
            </div>
          )}

          <p className="text-brand-gray-700 text-sm font-inter line-clamp-3 leading-relaxed">
            {book.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
