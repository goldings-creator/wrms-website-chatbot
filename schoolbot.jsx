import React, { useState, useEffect, useRef } from 'react';
import { Send, Info, Phone, Calendar, Clock, BookOpen } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: "👋 Hello! I'm the West Rocks Middle School Assistant. I can help answer questions about school hours, the calendar, reporting absences, and lunch menus. How can I help you today?" 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // --- MOCK KNOWLEDGE BASE ---
  // In a real app, this data would be extracted from your uploaded PDFs and website.
  const knowledgeBase = [
    {
      keywords: ['hours', 'time', 'start', 'end', 'open', 'close', 'schedule'],
      answer: "Regular school hours are 8:00 AM to 3:00 PM, Monday through Friday. The front office is open from 7:30 AM to 4:00 PM."
    },
    {
      keywords: ['absent', 'absence', 'sick', 'call out', 'missing', 'late', 'tardy'],
      answer: "If your child will be absent or late, please call the Attendance Line at (555) 010-2001 or email attendance@westrocks.edu before 8:30 AM."
    },
    {
      keywords: ['calendar', 'spring break', 'winter break', 'last day', 'first day', 'holidays', 'days off'],
      answer: "Upcoming dates: Spring Break is April 10th - 14th. Memorial Day (No School) is May 29th. The last day of school is a half-day on June 15th."
    },
    {
      keywords: ['lunch', 'food', 'menu', 'cafeteria', 'pay', 'account'],
      answer: "School lunch costs $3.50 per day. You can view this month's menu or add funds to your student's account via the MySchoolBucks portal on our website."
    },
    {
      keywords: ['nurse', 'medication', 'medical', 'health'],
      answer: "The school nurse is available during school hours. All student medication must be dropped off by a parent in its original prescription bottle along with a doctor's note."
    },
    {
      keywords: ['bus', 'transportation', 'route'],
      answer: "For bus route information or transportation delays, please contact the District Transportation Office at (555) 010-2005."
    },
    {
      keywords: ['principal', 'administration', 'admin', 'director'],
      answer: "The principal of West Rocks Middle School is available by appointment. Please call the main office at (555) 010-2000 to schedule a meeting."
    },
    {
      keywords: ['dress code', 'clothes', 'wear', 'uniform', 'dress'],
      answer: "Students are expected to dress appropriately for a learning environment. Hats and hoods must be removed inside the building. Please refer to page 12 of the Student Handbook for full details."
    },
    {
      keywords: ['cell phone', 'phone', 'phones', 'smart phone', 'device'],
      answer: "Cell phones are not allowed to be used in school. They must be kept in the student's locker when they enter the school and remain there until dismissal. If used during the day, cell phones will be confiscated by staff."
    },
    {
      keywords: ['chromebook', 'laptop', 'computer', 'repair', 'broken screen', 'charger', 'damage'],
      answer: "Students must bring their Chromebook fully charged every day. Families are responsible for damages. Repair costs are: Screen $65, Keyboard $45, Charger $15, and Full Replacement $350."
    },
    {
      keywords: ['doordash', 'uber eats', 'food delivery', 'drop off food', 'visitor', 'visit'],
      answer: "For safety reasons, food delivery services are not allowed during the school day. If a family needs to drop off lunch, please come to the main entrance. All visitors must obtain a Visitor's ID badge at the security desk."
    },
    {
      keywords: ['early dismissal', 'leave early', 'pick up early', 'appointment'],
      answer: "All requests for early dismissal must be made in the morning during homeroom with a written note. For student safety, the strict deadline for requesting an early dismissal is 2:30 PM."
    },
    {
      keywords: ['grades', 'report card', 'powerschool', 'gpa', 'honor roll'],
      answer: "Grades and attendance can be accessed through the PowerSchool Student and Parent Portal. Report cards are posted online at the end of each quarter (November, February, April, and June)."
    },
    {
      keywords: ['bullying', 'harassment', 'report'],
      answer: "All potential and alleged bullying should be reported to an NPS staff member. They will provide the student or family with the official NPS Bullying Complaint Form so an investigation can begin."
    }
  ];

  // --- BOT LOGIC SIMULATION ---
  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Search the knowledge base for matching keywords
    for (const entry of knowledgeBase) {
      if (entry.keywords.some(keyword => lowerInput.includes(keyword))) {
        return entry.answer;
      }
    }

    // Fallback response if the bot doesn't know the answer (Crucial for school bots!)
    return "I couldn't find information about that in my current handbook. Please contact the main office directly at (555) 010-2000 or frontdesk@westrocks.edu for assistance.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate network delay for a more natural feel
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: generateBotResponse(userMessage.text)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-800 flex items-center justify-center">
      
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* --- LEFT SIDEBAR: Admin View / Knowledge Base Info --- */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg text-green-800">
                < BookOpen size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Admin Panel</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              This prototype simulates a RAG (Retrieval-Augmented Generation) chatbot. It only answers questions based on the restricted knowledge base below.
            </p>
            
            <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">Active Knowledge Sources</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Clock size={16} className="text-green-700" />
                Bell Schedule & Hours
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Calendar size={16} className="text-green-700" />
                Academic Calendar 2025-2026
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Phone size={16} className="text-green-700" />
                Staff Directory & Policies
              </li>
            </ul>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex gap-2 items-start">
                <Info size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800">
                  <strong>Test it out!</strong> Try asking: <br/>
                  "What time does school start?" <br/>
                  "When is spring break?" <br/>
                  "My kid is sick today" <br/>
                  "Who won the football game?" <em>(Notice how it handles unknown info)</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: Chat Interface --- */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[80vh] max-h-[800px]">
          
          {/* Chat Header */}
          <div className="bg-green-800 p-4 text-white flex items-center justify-between shadow-sm z-10 border-b-4 border-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner border-2 border-green-600">
                WR
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-wide">West Rocks Assistant</h1>
                <p className="text-green-100 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse"></span>
                  Online - Usually replies instantly
                </p>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm md:text-base shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-green-800 text-white rounded-br-sm' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 text-slate-500 rounded-2xl rounded-bl-sm p-4 shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask a question about the school..."
                className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-green-800 focus:ring-2 focus:ring-green-200 rounded-xl px-4 py-3 outline-none transition-all duration-200"
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-green-800 hover:bg-black disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 flex items-center justify-center transition-colors duration-200"
              >
                <Send size={20} className={inputText.trim() && !isTyping ? "translate-x-0.5" : ""} />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-400">AI assistants can make mistakes. Verify important dates with the official calendar.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
