import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Package,
  Users,
  BarChart3,
  Sparkles,
  Zap,
  Target,
  Brain,
  Lightbulb,
  Activity,
  PieChart,
  LineChart,
  Calendar
} from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';

const AIAnalytics = () => {
  const { formatCurrency } = useCurrency();
  const [insights, setInsights] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate AI analysis with more sophisticated data
    const loadAnalytics = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setInsights([
        {
          id: 1,
          type: 'positive',
          title: 'Strong Profit Margins',
          description: 'Your average profit margin is 45%, which is 12% above industry average. Electronics category leads with 52% margin.',
          icon: TrendingUp,
          value: '+12%',
          color: 'text-success',
          confidence: 94,
          trend: 'up'
        },
        {
          id: 2,
          type: 'warning',
          title: 'Low Stock Alert',
          description: '4 products are running critically low on stock and need immediate reordering. Risk of stockouts increasing.',
          icon: AlertTriangle,
          value: '4 items',
          color: 'text-warning',
          confidence: 87,
          trend: 'down'
        },
        {
          id: 3,
          type: 'info',
          title: 'Peak Sales Period',
          description: 'Tuesday-Thursday are your highest performing days. Consider targeted promotions during these peak periods.',
          icon: Clock,
          value: 'Tue-Thu',
          color: 'text-info',
          confidence: 92,
          trend: 'stable'
        },
        {
          id: 4,
          type: 'success',
          title: 'Customer Growth',
          description: 'New customer acquisition increased by 18% this month. Customer lifetime value improved by 12%.',
          icon: Users,
          value: '+18%',
          color: 'text-success',
          confidence: 89,
          trend: 'up'
        },
        {
          id: 5,
          type: 'positive',
          title: 'Inventory Efficiency',
          description: 'Inventory turnover rate is optimal at 2.3 months. Dead stock reduced by 15% this quarter.',
          icon: Package,
          value: '2.3 months',
          color: 'text-success',
          confidence: 91,
          trend: 'up'
        },
        {
          id: 6,
          type: 'info',
          title: 'Market Opportunity',
          description: 'Electronics category shows 23% growth potential. Consider expanding this high-margin segment.',
          icon: Target,
          value: '23% potential',
          color: 'text-primary',
          confidence: 85,
          trend: 'up'
        }
      ]);

      setPredictions([
        {
          id: 1,
          title: 'Sales Forecast',
          value: formatCurrency(9800),
          change: '+15%',
          period: 'Next 30 days',
          icon: TrendingUp,
          color: 'bg-gradient-to-br from-success-100 to-success-200',
          iconColor: 'text-success-600',
          confidence: 89,
          factors: ['Seasonal trends', 'Marketing campaigns', 'Customer growth']
        },
        {
          id: 2,
          title: 'Inventory Turnover',
          value: '2.3 months',
          change: 'Optimal',
          period: 'Average cycle',
          icon: Package,
          color: 'bg-gradient-to-br from-primary-100 to-primary-200',
          iconColor: 'text-primary-600',
          confidence: 91,
          factors: ['Demand forecasting', 'Reorder optimization', 'Stock management']
        },
        {
          id: 3,
          title: 'Profit Prediction',
          value: formatCurrency(4200),
          change: '+8%',
          period: 'Next month',
          icon: DollarSign,
          color: 'bg-gradient-to-br from-warning-100 to-warning-200',
          iconColor: 'text-warning-600',
          confidence: 87,
          factors: ['Margin optimization', 'Cost reduction', 'Pricing strategy']
        },
        {
          id: 4,
          title: 'Growth Rate',
          value: '15%',
          change: '+3%',
          period: 'Monthly',
          icon: BarChart3,
          color: 'bg-gradient-to-br from-info-100 to-info-200',
          iconColor: 'text-info-600',
          confidence: 84,
          factors: ['Market expansion', 'Product diversification', 'Customer acquisition']
        },
        {
          id: 5,
          title: 'Customer Acquisition',
          value: '156',
          change: '+12%',
          period: 'New customers',
          icon: Users,
          color: 'bg-gradient-to-br from-purple-100 to-purple-200',
          iconColor: 'text-purple-600',
          confidence: 86,
          factors: ['Marketing effectiveness', 'Referral program', 'Brand awareness']
        },
        {
          id: 6,
          title: 'Market Share',
          value: '2.8%',
          change: '+0.5%',
          period: 'Local market',
          icon: Target,
          color: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
          iconColor: 'text-indigo-600',
          confidence: 82,
          factors: ['Competitive positioning', 'Market penetration', 'Brand strength']
        }
      ]);

      setIsLoading(false);
    };

    loadAnalytics();
  }, [formatCurrency]);

  const getInsightIcon = (type) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
        return <Clock className="w-5 h-5 text-info" />;
      case 'success':
        return <TrendingUp className="w-5 h-5 text-success" />;
      default:
        return <Sparkles className="w-5 h-5 text-primary" />;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-success" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-danger" />;
      default:
        return <Activity className="w-3 h-3 text-info" />;
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-warning';
    return 'text-danger';
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">AI Analytics</h2>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Insights */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">AI Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-start space-x-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              {getInsightIcon(insight.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-secondary-800">{insight.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${insight.color}`}>{insight.value}</span>
                    {getTrendIcon(insight.trend)}
                  </div>
                </div>
                <p className="text-sm text-secondary-600 mt-1">{insight.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-secondary-500">Confidence:</span>
                  <span className={`text-xs font-medium ${getConfidenceColor(insight.confidence)}`}>
                    {insight.confidence}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Predictions */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-success-500 to-success-600 rounded-full flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">AI Predictions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {predictions.map((prediction) => {
            const Icon = prediction.icon;
            return (
              <div key={prediction.id} className="p-4 rounded-lg border border-neutral-200 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${prediction.color}`}>
                    <Icon className={`w-5 h-5 ${prediction.iconColor}`} />
                  </div>
                  <span className="text-xs text-secondary-500">{prediction.period}</span>
                </div>
                <h3 className="font-semibold text-secondary-800">{prediction.title}</h3>
                <p className="text-xl font-bold text-secondary-900 mt-1">{prediction.value}</p>
                <p className="text-sm text-success mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {prediction.change}
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-secondary-500">Confidence:</span>
                    <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                      {prediction.confidence}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-secondary-500 mb-1">Key Factors:</p>
                    <div className="space-y-1">
                      {prediction.factors.map((factor, idx) => (
                        <div key={idx} className="flex items-center space-x-1">
                          <div className="w-1 h-1 bg-secondary-400 rounded-full"></div>
                          <span className="text-xs text-secondary-600">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-warning-500 to-warning-600 rounded-full flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">AI Recommendations</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-warning-50 rounded-lg border border-warning-200">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-medium text-secondary-800">Immediate Action Required</h3>
              <p className="text-sm text-secondary-600 mt-1">
                Reorder Premium Headphones, Wireless Mouse, and USB-C Cable immediately to prevent stockouts. 
                Estimated impact: $2,400 in potential lost sales.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-success-50 rounded-lg border border-success-200">
            <CheckCircle className="w-5 h-5 text-success mt-0.5" />
            <div>
              <h3 className="font-medium text-secondary-800">Optimization Opportunity</h3>
              <p className="text-sm text-secondary-600 mt-1">
                Implement dynamic pricing for Electronics category to maximize profit margins during peak demand. 
                Potential revenue increase: 8-12%.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-info-50 rounded-lg border border-info-200">
            <Clock className="w-5 h-5 text-info mt-0.5" />
            <div>
              <h3 className="font-medium text-secondary-800">Strategic Planning</h3>
              <p className="text-sm text-secondary-600 mt-1">
                Launch targeted promotions on Tuesday-Thursday to capitalize on peak sales periods. 
                Expected conversion rate improvement: 15-20%.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
            <Target className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium text-secondary-800">Growth Strategy</h3>
              <p className="text-sm text-secondary-600 mt-1">
                Expand Electronics category inventory by 15% to meet growing demand. 
                Projected revenue growth: 18-25% in next quarter.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Learning Metrics */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">AI Learning Metrics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-secondary-800">Prediction Accuracy</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">94.2%</p>
            <p className="text-sm text-secondary-600 mt-1">Based on 1,247 data points</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-secondary-800">Pattern Recognition</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">87.5%</p>
            <p className="text-sm text-secondary-600 mt-1">Identified 23 key patterns</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-secondary-800">Recommendation Success</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">91.8%</p>
            <p className="text-sm text-secondary-600 mt-1">Based on user feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics; 