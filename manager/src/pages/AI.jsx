import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  TrendingUp, 
  Package, 
  MessageSquare,
  BarChart3,
  Tag,
  Brain,
  Lightbulb,
  Target
} from 'lucide-react';
import Button from '../components/ui/Button';
import AIAssistant from '../components/ai/AIAssistant';
import AIAnalytics from '../components/ai/AIAnalytics';
import SmartProductCategorization from '../components/ai/SmartProductCategorization';

const AI = () => {
  const [activeTab, setActiveTab] = useState('assistant');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const aiFeatures = [
    {
      id: 'assistant',
      title: 'AI Assistant',
      description: 'Interactive chat assistant for business insights and recommendations',
      icon: MessageSquare,
      color: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'analytics',
      title: 'AI Analytics',
      description: 'Intelligent insights and predictions for your business data',
      icon: BarChart3,
      color: 'bg-gradient-to-br from-green-100 to-green-200',
      iconColor: 'text-green-600'
    },
    {
      id: 'categorization',
      title: 'Smart Categorization',
      description: 'AI-powered automatic product categorization',
      icon: Tag,
      color: 'bg-gradient-to-br from-purple-100 to-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  const aiCapabilities = [
    {
      title: 'Inventory Optimization',
      description: 'AI analyzes stock levels and suggests optimal reorder quantities',
      icon: Package,
      benefits: ['Reduce stockouts', 'Minimize overstock', 'Improve turnover']
    },
    {
      title: 'Sales Forecasting',
      description: 'Predict future sales trends and identify growth opportunities',
      icon: TrendingUp,
      benefits: ['Accurate predictions', 'Trend identification', 'Growth planning']
    },
    {
      title: 'Smart Recommendations',
      description: 'Get personalized business recommendations based on your data',
      icon: Lightbulb,
      benefits: ['Actionable insights', 'Performance optimization', 'Strategic guidance']
    },
    {
      title: 'Automated Categorization',
      description: 'Let AI automatically categorize your products for better organization',
      icon: Tag,
      benefits: ['Time savings', 'Consistent categorization', 'Improved search']
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'assistant':
        return (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-secondary">AI Assistant</h2>
                  <p className="text-sm text-secondary-500">Get instant help and insights from your AI assistant</p>
                </div>
                <Button
                  onClick={() => setIsAssistantOpen(true)}
                  variant="primary"
                  className="flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Assistant</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-secondary-800 mb-2">What you can ask:</h3>
                  <ul className="text-sm text-secondary-600 space-y-1">
                    <li>• "Analyze my inventory and provide insights"</li>
                    <li>• "Predict sales for the next 30 days"</li>
                    <li>• "What products need reordering?"</li>
                    <li>• "Give me business recommendations"</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <h3 className="font-medium text-secondary-800 mb-2">AI Capabilities:</h3>
                  <ul className="text-sm text-secondary-600 space-y-1">
                    <li>• Real-time data analysis</li>
                    <li>• Predictive insights</li>
                    <li>• Natural language processing</li>
                    <li>• Contextual recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return <AIAnalytics />;
      
      case 'categorization':
        return <SmartProductCategorization />;
      
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary-800">AI Features</h1>
            <p className="text-sm text-secondary-500">Intelligent tools to enhance your business</p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className={`glass-card p-6 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                activeTab === feature.id ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setActiveTab(feature.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${feature.color}`}>
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-800">{feature.title}</h3>
                  <p className="text-xs text-secondary-500">{feature.description}</p>
                </div>
              </div>
              {activeTab === feature.id && (
                <div className="w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Capabilities Overview */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-warning-500 to-warning-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">AI Capabilities</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div key={index} className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-medium text-secondary-800">{capability.title}</h3>
                </div>
                <p className="text-sm text-secondary-600 mb-3">{capability.description}</p>
                <ul className="text-xs text-secondary-500 space-y-1">
                  {capability.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center space-x-1">
                      <Target className="w-3 h-3 text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6">
        {renderContent()}
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
};

export default AI; 