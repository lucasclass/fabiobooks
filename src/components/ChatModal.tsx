
import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles, BookOpen, Heart, Star } from "lucide-react";
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
      content: '👋 Olá! Sou a IA literária da FábioBooks! Estou aqui para descobrir os livros perfeitos para você. Conte-me: que tipo de história te emociona?',
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
      "✨ Baseado no que você me disse, recomendo 'O Alquimista' de Paulo Coelho - uma jornada inspiradora sobre seguir seus sonhos e descobrir seu propósito!",
      "📚 Para quem ama mistério, sugiro 'O Código Da Vinci' de Dan Brown. É envolvente do início ao fim, com quebra-cabeças fascinantes!",
      "🚀 Se você aprecia ficção científica, 'Dune' de Frank Herbert é uma obra-prima épica que vai expandir sua imaginação!",
      "💕 Para romances tocantes, recomendo 'Me Chame Pelo Seu Nome' de André Aciman - uma história linda sobre amor e descoberta.",
      "🧠 Que tal 'Sapiens' de Yuval Noah Harari? É fascinante para quem quer entender nossa história como espécie!",
      "🗡️ Para fantasia épica, 'O Senhor dos Anéis' de Tolkien continua sendo uma das melhores séries já escritas!",
      "🌟 Se busca algo contemporâneo e inspirador, 'Educação' de Tara Westover é um memoir poderoso sobre superação e conhecimento."
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

  const quickPrompts = [
    { icon: BookOpen, text: "Quero algo inspirador" },
    { icon: Heart, text: "Busco um romance" },
    { icon: Star, text: "Prefiro ficção científica" },
    { icon: Sparkles, text: "Me surpreenda!" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[700px] flex flex-col p-0 font-inter bg-gradient-to-br from-white to-brand-gray-50">
        <DialogHeader className="p-6 pb-4 border-b border-brand-gray-200 bg-white rounded-t-lg">
          <DialogTitle className="text-2xl font-bold text-brand-black flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <div>Chat com IA Literária</div>
              <div className="text-sm font-normal text-brand-gray-600 mt-1">
                Descubra recomendações personalizadas
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 animate-fade-in ${
                message.isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                message.isUser 
                  ? 'bg-gradient-to-br from-brand-red to-brand-red-dark text-white' 
                  : 'bg-gradient-to-br from-brand-gray-100 to-brand-gray-200 text-brand-gray-600'
              }`}>
                {message.isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              
              <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                message.isUser
                  ? 'bg-gradient-to-br from-brand-red to-brand-red-dark text-white rounded-br-md'
                  : 'bg-white text-brand-black rounded-bl-md border border-brand-gray-100'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 opacity-70 ${
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
            <div className="flex items-start gap-4 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gray-100 to-brand-gray-200 text-brand-gray-600 
                            flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="bg-white text-brand-black p-4 rounded-2xl rounded-bl-md border border-brand-gray-100 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce" 
                       style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce" 
                       style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 justify-center animate-fade-in">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  onClick={() => setInputValue(prompt.text)}
                  variant="outline"
                  className="border-brand-red/30 text-brand-red hover:bg-brand-red hover:text-white 
                           transition-all duration-200 flex items-center gap-2 text-xs"
                >
                  <prompt.icon className="h-3 w-3" />
                  {prompt.text}
                </Button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 pt-4 border-t border-brand-gray-200 bg-white rounded-b-lg">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Descreva seus gostos literários..."
              className="flex-1 h-12 px-4 border-2 border-brand-gray-300 rounded-xl 
                       focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 
                       transition-all duration-200 bg-brand-gray-50"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red 
                       text-white px-6 h-12 rounded-xl transition-all duration-200 disabled:opacity-50
                       hover:shadow-lg hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-brand-gray-500 mt-3 text-center flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3" />
            Pressione Enter para enviar • IA treinada em literatura brasileira e mundial
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
