import React, { useState, useRef, useEffect } from 'react';
import { Send, Zap, X, Sparkles, TrendingUp, Package, AlertTriangle, DollarSign, Users, Calendar, Target, BarChart3 } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const AIAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI business assistant. I can help you with:\n\n• 📊 Sales analysis and forecasting\n• 📦 Inventory optimization\n• 💰 Profit margin analysis\n• 🎯 Business recommendations\n• 📈 Performance insights\n\nWhat would you like to know about your business?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    lastTopic: null,
    userPreferences: [],
    businessMetrics: {
      totalRevenue: 24589,
      monthlySales: 8742,
      profitMargin: 45,
      inventoryValue: 15600,
      lowStockItems: 4,
      topCategory: 'Electronics'
    }
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    {
      title: "Sales Analysis",
      icon: TrendingUp,
      prompt: "Analyze my sales performance and provide insights on trends, opportunities, and areas for improvement."
    },
    {
      title: "Inventory Insights",
      icon: Package,
      prompt: "Review my inventory levels, identify slow-moving items, and suggest reorder strategies."
    },
    {
      title: "Profit Optimization",
      icon: DollarSign,
      prompt: "Analyze my profit margins and suggest pricing strategies to maximize profitability."
    },
    {
      title: "Business Strategy",
      icon: Target,
      prompt: "Provide strategic recommendations for business growth and market expansion."
    },
    {
      title: "Performance Metrics",
      icon: BarChart3,
      prompt: "Give me a comprehensive overview of my key performance indicators and business health."
    },
    {
      title: "Customer Insights",
      icon: Users,
      prompt: "Analyze customer behavior patterns and suggest ways to improve customer satisfaction and retention."
    }
  ];

  const generateAdvancedAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI processing time with variable duration based on complexity
    const processingTime = 1000 + Math.random() * 3000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    
    const messageLower = userMessage.toLowerCase();
    const context = conversationContext;
    
    // Enhanced response system with context awareness
    const responses = {
      sales: [
        `📊 **Sales Analysis Report**\n\nYour sales performance shows:\n• **Monthly Growth**: +12% vs last month\n• **Top Category**: Electronics (45% of sales)\n• **Peak Days**: Tuesday-Thursday\n• **Average Order Value**: $87.50\n\n**Recommendations**:\n1. Focus on Electronics category expansion\n2. Implement Tuesday-Thursday promotions\n3. Consider bundling complementary products\n4. Target higher AOV through upselling`,
        
        `📈 **Sales Forecast & Trends**\n\n**Next 30 Days Prediction**:\n• Expected Revenue: $9,800 (+15%)\n• Electronics: $4,410 (+18%)\n• Clothing: $2,940 (+8%)\n• Home & Garden: $2,450 (+12%)\n\n**Trend Analysis**:\n• Seasonal uptick in Electronics\n• Weekend sales 23% higher\n• Mobile orders increased 34%`,
        
        `🎯 **Sales Optimization Opportunities**\n\n**Current Performance**:\n• Conversion Rate: 3.2% (Industry avg: 2.8%)\n• Customer Lifetime Value: $342\n• Repeat Purchase Rate: 28%\n\n**Action Items**:\n1. Implement loyalty program\n2. Cross-sell Electronics accessories\n3. Optimize mobile experience\n4. Seasonal inventory planning`
      ],
      
      inventory: [
        `📦 **Inventory Analysis Report**\n\n**Current Status**:\n• Total SKUs: 156\n• Low Stock Items: 4 (Critical)\n• Overstock Items: 12\n• Turnover Rate: 2.3 months\n\n**Critical Alerts**:\n🚨 Premium Headphones (2 units)\n🚨 Wireless Mouse (3 units)\n🚨 USB-C Cable (1 unit)\n⚠️ Bluetooth Speaker (5 units)\n\n**Recommendations**:\n1. Immediate reorder for critical items\n2. Clear overstock through promotions\n3. Implement automated reorder alerts`,
        
        `🔄 **Inventory Optimization Strategy**\n\n**Category Analysis**:\n• Electronics: 45% of inventory, 60% of sales\n• Clothing: 30% of inventory, 25% of sales\n• Home & Garden: 25% of inventory, 15% of sales\n\n**Optimization Plan**:\n1. Reduce Clothing inventory by 20%\n2. Increase Electronics stock by 15%\n3. Implement just-in-time for slow movers\n4. Seasonal planning for Home & Garden`,
        
        `📊 **Inventory Health Metrics**\n\n**Key Indicators**:\n• Stock-to-Sales Ratio: 1.8 (Optimal: 1.5-2.0)\n• Dead Stock: 8% (Target: <5%)\n• Stockout Rate: 2.1% (Target: <1%)\n• Carrying Cost: 12% of inventory value\n\n**Improvement Actions**:\n1. Reduce dead stock through clearance\n2. Implement demand forecasting\n3. Optimize reorder points\n4. Consider dropshipping for slow movers`
      ],
      
      profit: [
        `💰 **Profit Margin Analysis**\n\n**Current Performance**:\n• Overall Margin: 45% (Industry avg: 38%)\n• Electronics: 52% margin\n• Clothing: 42% margin\n• Home & Garden: 38% margin\n\n**Optimization Opportunities**:\n1. **Dynamic Pricing**: Implement for Electronics\n2. **Bundle Deals**: Create complementary packages\n3. **Cost Reduction**: Negotiate with suppliers\n4. **Premium Positioning**: Focus on high-margin items`,
        
        `📈 **Profit Growth Strategy**\n\n**Revenue Optimization**:\n• Average Order Value: $87.50\n• Target AOV: $95.00 (+8.6%)\n• Upselling Potential: $12.30 per order\n• Cross-selling Opportunity: $8.75 per order\n\n**Implementation Plan**:\n1. Train staff on upselling techniques\n2. Create product bundles\n3. Implement loyalty rewards\n4. Optimize pricing strategy`,
        
        `🎯 **Profit Maximization Tactics**\n\n**Current Metrics**:\n• Gross Profit: $11,065/month\n• Operating Expenses: $6,200/month\n• Net Profit: $4,865/month\n• Profit Margin: 45%\n\n**Growth Strategies**:\n1. Increase Electronics category focus\n2. Implement premium pricing for unique items\n3. Reduce operational costs through automation\n4. Expand high-margin product lines`
      ],
      
      strategy: [
        `🎯 **Business Strategy Recommendations**\n\n**Market Analysis**:\n• Target Market: Tech-savvy professionals\n• Competitive Advantage: Quality Electronics\n• Growth Opportunity: E-commerce expansion\n\n**Strategic Initiatives**:\n1. **Digital Transformation**:\n   • Launch mobile app\n   • Implement omnichannel strategy\n   • Enhance online presence\n\n2. **Product Expansion**:\n   • Add smart home devices\n   • Introduce premium accessories\n   • Develop private label products\n\n3. **Customer Experience**:\n   • Implement 24/7 support\n   • Create loyalty program\n   • Personalize recommendations`,
        
        `📊 **Growth Strategy Framework**\n\n**Current Position**:\n• Market Share: 2.3% in local market\n• Customer Base: 1,247 active customers\n• Revenue Growth: 18% YoY\n\n**Expansion Opportunities**:\n1. **Geographic Expansion**:\n   • Target neighboring cities\n   • Online marketplaces\n   • B2B partnerships\n\n2. **Product Diversification**:\n   • Smart home ecosystem\n   • Professional equipment\n   • Subscription services\n\n3. **Operational Excellence**:\n   • Inventory automation\n   • Customer analytics\n   • Performance optimization`,
        
        `🚀 **Competitive Advantage Strategy**\n\n**Core Strengths**:\n• Quality Electronics selection\n• Strong customer relationships\n• Efficient operations\n• Data-driven decisions\n\n**Competitive Positioning**:\n1. **Premium Service Provider**:\n   • Expert consultation\n   • Extended warranties\n   • Installation services\n\n2. **Technology Leader**:\n   • Latest product offerings\n   • Tech support services\n   • Innovation focus\n\n3. **Customer-Centric Approach**:\n   • Personalized experiences\n   • Loyalty rewards\n   • Community building`
      ],
      
      performance: [
        `📊 **Comprehensive Performance Overview**\n\n**Financial Metrics**:\n• Total Revenue: $24,589 (+18% YoY)\n• Gross Profit: $11,065 (45% margin)\n• Operating Expenses: $6,200\n• Net Profit: $4,865\n• Cash Flow: Positive\n\n**Operational Metrics**:\n• Inventory Turnover: 2.3 months\n• Customer Acquisition Cost: $45\n• Customer Lifetime Value: $342\n• Repeat Purchase Rate: 28%\n\n**Growth Indicators**:\n• Monthly Growth: 12%\n• Customer Growth: 15%\n• Product Category Growth: 8%\n• Market Share: 2.3%`,
        
        `🎯 **KPI Dashboard & Insights**\n\n**Sales Performance**:\n• Conversion Rate: 3.2% (Target: 3.5%)\n• Average Order Value: $87.50 (Target: $95)\n• Sales per Customer: $19.75\n• Return Rate: 2.1% (Industry avg: 3.5%)\n\n**Customer Metrics**:\n• Customer Satisfaction: 4.6/5\n• Net Promoter Score: 72\n• Customer Retention: 78%\n• Referral Rate: 12%\n\n**Operational Excellence**:\n• Order Fulfillment: 99.2%\n• Inventory Accuracy: 98.5%\n• Supplier Performance: 94%\n• Cost Efficiency: 87%`,
        
        `📈 **Performance Optimization Plan**\n\n**Immediate Actions (30 days)**:\n1. **Revenue Growth**:\n   • Implement upselling training\n   • Launch loyalty program\n   • Optimize pricing strategy\n\n2. **Cost Reduction**:\n   • Negotiate supplier contracts\n   • Optimize inventory levels\n   • Automate repetitive tasks\n\n3. **Customer Experience**:\n   • Enhance mobile experience\n   • Improve customer support\n   • Personalize recommendations\n\n**Long-term Strategy (6-12 months)**:\n• Expand to new markets\n• Develop private label products\n• Implement advanced analytics`
      ],
      
      customers: [
        `👥 **Customer Behavior Analysis**\n\n**Customer Segments**:\n• **Tech Enthusiasts** (45%): High-value, Electronics focus\n• **Budget Conscious** (35%): Price-sensitive, Clothing focus\n• **Home Improvers** (20%): Quality-focused, Home & Garden\n\n**Behavior Patterns**:\n• Peak Shopping: Tuesday-Thursday (3-7 PM)\n• Mobile Orders: 67% of total\n• Repeat Purchases: 28% within 90 days\n• Average Session Duration: 4.2 minutes\n\n**Recommendations**:\n1. Personalize recommendations by segment\n2. Optimize mobile experience\n3. Implement targeted promotions\n4. Enhance customer support`,
        
        `💡 **Customer Experience Optimization**\n\n**Current Satisfaction Metrics**:\n• Overall Rating: 4.6/5\n• Product Quality: 4.8/5\n• Customer Service: 4.5/5\n• Website Experience: 4.3/5\n• Delivery Speed: 4.7/5\n\n**Improvement Opportunities**:\n1. **Website Optimization**:\n   • Faster loading times\n   • Better mobile navigation\n   • Enhanced search functionality\n\n2. **Service Enhancement**:\n   • 24/7 chat support\n   • Proactive order updates\n   • Easy returns process\n\n3. **Personalization**:\n   • Product recommendations\n   • Customized promotions\n   • Loyalty rewards`,
        
        `🎯 **Customer Retention Strategy**\n\n**Retention Metrics**:\n• 30-day Retention: 78%\n• 90-day Retention: 65%\n• 1-year Retention: 42%\n• Customer Lifetime Value: $342\n\n**Retention Tactics**:\n1. **Loyalty Program**:\n   • Points system\n   • Tier benefits\n   • Exclusive offers\n\n2. **Personalized Communication**:\n   • Birthday rewards\n   • Product recommendations\n   • Re-engagement campaigns\n\n3. **Value-Added Services**:\n   • Extended warranties\n   • Installation services\n   • Tech support\n\n4. **Community Building**:\n   • Customer events\n   • Social media engagement\n   • User-generated content`
      ]
    };

    let aiResponse = "I understand your request. Let me analyze your business data and provide comprehensive insights...";
    
    // Enhanced context-aware response selection
    if (messageLower.includes('sales') || messageLower.includes('revenue') || messageLower.includes('forecast')) {
      aiResponse = responses.sales[Math.floor(Math.random() * responses.sales.length)];
      setConversationContext(prev => ({ ...prev, lastTopic: 'sales' }));
    } else if (messageLower.includes('inventory') || messageLower.includes('stock') || messageLower.includes('reorder')) {
      aiResponse = responses.inventory[Math.floor(Math.random() * responses.inventory.length)];
      setConversationContext(prev => ({ ...prev, lastTopic: 'inventory' }));
    } else if (messageLower.includes('profit') || messageLower.includes('margin') || messageLower.includes('pricing')) {
      aiResponse = responses.profit[Math.floor(Math.random() * responses.profit.length)];
      setConversationContext(prev => ({ ...prev, lastTopic: 'profit' }));
    } else if (messageLower.includes('strategy') || messageLower.includes('growth') || messageLower.includes('business')) {
      aiResponse = responses.strategy[Math.floor(Math.random() * responses.strategy.length)];
      setConversationContext(prev => ({ ...prev, lastTopic: 'strategy' }));
    } else if (messageLower.includes('performance') || messageLower.includes('metrics') || messageLower.includes('kpi')) {
      aiResponse = responses.performance[Math.floor(Math.random() * responses.performance.length)];
      setConversationContext(prev => ({ ...prev, lastTopic: 'performance' }));
    } else if (messageLower.includes('customer') || messageLower.includes('user') || messageLower.includes('retention')) {
      aiResponse = responses.customers[Math.floor(Math.random() * responses.customers.length)];
      setConversationContext(prev => ({ ...prev, lastTopic: 'customers' }));
    } else {
      aiResponse = `I can help you with comprehensive business analysis! Here are the key areas I specialize in:\n\n📊 **Sales & Revenue**: Forecasting, trends, growth opportunities\n📦 **Inventory Management**: Optimization, reordering, stock analysis\n💰 **Profit Optimization**: Margins, pricing strategies, cost reduction\n🎯 **Business Strategy**: Growth planning, competitive analysis\n📈 **Performance Metrics**: KPIs, operational excellence\n👥 **Customer Insights**: Behavior analysis, retention strategies\n\nWhat specific aspect would you like me to analyze?`;
    }

    return aiResponse;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    const aiResponse = await generateAdvancedAIResponse(inputValue);
    
    const aiMessage = {
      id: Date.now() + 1,
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = async (prompt) => {
    setInputValue(prompt);
    await handleSendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Business Assistant"
      size="md"
      className="max-h-[90vh] overflow-y-auto"
    >
      {/* Header content is now handled by Modal */}
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 min-h-0 mb-4" style={{ maxHeight: '40vh' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-secondary-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-secondary-700 mb-3">Quick Analysis Options:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="flex items-center space-x-2 p-2 text-xs bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors text-secondary-700"
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Input */}
      <div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your business performance..."
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            variant="primary"
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AIAssistant; 