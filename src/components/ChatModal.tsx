
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Sou a IA da FábioBooks. Conte-me sobre seus gostos literários e posso recomendar livros perfeitos para você!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Baseado no que você me disse, recomendo 'O Alquimista' de Paulo Coelho - uma jornada inspiradora sobre seguir seus sonhos!",
      "Para quem gosta de mistério, sugiro 'O Código Da Vinci' de Dan Brown. É envolvente do início ao fim!",
      "Se você aprecia ficção científica, 'Dune' de Frank Herbert é uma obra-prima que não pode perder!",
      "Para romances emocionantes, recomendo 'Me Chame Pelo Seu Nome' de André Aciman - uma história tocante sobre amor e descoberta.",
      "Que tal 'Sapiens' de Yuval Noah Harari? É fascinante para quem gosta de entender a história da humanidade!",
      "Para fantasia épica, 'O Senhor dos Anéis' de Tolkien continua sendo uma das melhores séries já escritas!",
      "Se busca algo contemporâneo, 'Educação' de Tara Westover é um memoir poderoso sobre superação e conhecimento."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0 font-inter">
        <DialogHeader className="p-6 pb-4 border-b border-brand-gray-200">
          <DialogTitle className="text-xl font-semibold text-brand-black flex items-center gap-2">
            <Bot className="h-6 w-6 text-brand-red" />
            Chat com IA - Recomendações Personalizadas
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 animate-fade-in ${
                message.isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? 'bg-brand-red text-white' 
                  : 'bg-brand-gray-200 text-brand-gray-600'
              }`}>
                {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser
                  ? 'bg-brand-red text-white rounded-br-md'
                  : 'bg-brand-gray-100 text-brand-black rounded-bl-md'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 opacity-70 ${
                  message.isUser ? 'text-white/70' : 'text-brand-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-brand-gray-200 text-brand-gray-600 
                            flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-brand-gray-100 text-brand-black p-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-brand-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-gray-400 rounded-full animate-bounce" 
                       style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-brand-gray-400 rounded-full animate-bounce" 
                       style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 pt-4 border-t border-brand-gray-200">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 h-12 px-4 border-2 border-brand-gray-300 rounded-lg 
                       focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 
                       transition-all duration-200"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-brand-red hover:bg-brand-red-dark text-white px-4 h-12 rounded-lg 
                       transition-all duration-200 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-brand-gray-500 mt-2 text-center">
            Pressione Enter para enviar sua mensagem
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
