"use client";

import Landing from './landing/page';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

import {
  X,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowDownCircle,
  UserCircle,
  Heart,
} from 'lucide-react';

import {motion, AnimatePresence} from "framer-motion";

// Animated Avatar Component
const AnimatedAvatar = ({ isOpen }) => {
  return (
    <div className="relative">
      {!isOpen ? (
        <motion.div
          className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Face */}
          <div className="relative w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            {/* Eyes */}
            <div className="absolute top-3 left-2 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-3 right-2 w-1 h-1 bg-black rounded-full"></div>
            {/* Smile */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-black rounded-full"></div>
          </div>
          
          {/* Waving Hand */}
          <motion.div
            className="absolute -top-1 -right-1 text-yellow-300 text-lg"
            animate={{ 
              rotate: [0, 20, -10, 20, 0]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            👋
          </motion.div>
          
          {/* Floating hearts */}
          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2"
            animate={{ 
              y: [-5, -15, -5],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-3 h-3 text-red-400 fill-current" />
          </motion.div>
          
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 border-2 border-blue-400 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ 
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <ArrowDownCircle className="w-8 h-8 text-white" />
        </motion.div>
      )}
    </div>
  );
};


export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'initial',
      role: 'assistant',
      content: 'How are you today? I\'m here to help with any questions or concerns you might have about mental health and wellness.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatIconRef = useRef(null);
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    // Update messages and store current state
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending messages to API:', updatedMessages);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: updatedMessages 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API response error:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('API response:', data);
      
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content || data.response || 'I apologize, but I encountered an error. Please try again.',
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I\'m sorry, I\'m having trouble connecting right now. Please try again in a moment. If this persists, please refresh the page.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    // Try multiple methods to ensure scrolling works
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
    
    // Also try to scroll the scroll area directly
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 100);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {

    const handleScroll =() => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    handleScroll(); // Check initial position

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
    <Landing />
    <AnimatePresence>
      {showChatIcon && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.1
            }
          }}
          exit={{ 
            opacity: 0, 
            y: 100, 
            scale: 0,
            transition: {
              duration: 0.2
            }
          }}
          className="fixed bottom-4 right-4 z-50 group"
        >
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ 
              opacity: isChatOpen ? 0 : 1,
              x: isChatOpen ? 10 : 0
            }}
            className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          >
            {!isChatOpen ? "Hi! Need someone to talk to? 💬" : "Close chat"}
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </motion.div>
          
          <motion.button
            ref={chatIconRef}
            onClick={toggleChat}
            className="p-2 bg-white rounded-full shadow-2xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedAvatar isOpen={isChatOpen} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
  {isChatOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[400px] h-[500px]"
    >
      <Card className="border-2 h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="text-lg font-medium">
            Mental Health Support
          </CardTitle>
          <Button
            onClick={toggleChat}
            size="icon"
            variant="ghost"
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea ref={scrollAreaRef} className="h-full">
            <div className="p-4 space-y-4 min-h-full">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
        
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  )}
</AnimatePresence>


    </div>

    
      
  );
}
