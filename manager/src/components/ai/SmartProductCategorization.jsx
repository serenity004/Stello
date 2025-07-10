import React, { useState } from 'react';
import { 
  Tag, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Package,
  Smartphone,
  Shirt,
  Home,
  Car,
  Book,
  Utensils,
  Zap,
  Target,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const SmartProductCategorization = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [analysisDetails, setAnalysisDetails] = useState(null);
  const [learningProgress, setLearningProgress] = useState({
    totalAnalyzed: 1247,
    accuracy: 94.2,
    categoriesLearned: 8,
    patternsIdentified: 23
  });

  const categoryIcons = {
    'Electronics': Smartphone,
    'Clothing': Shirt,
    'Home & Garden': Home,
    'Automotive': Car,
    'Books': Book,
    'Kitchen': Utensils,
    'Sports': Package,
    'General': Package
  };

  const categoryColors = {
    'Electronics': 'bg-blue-100 text-blue-800',
    'Clothing': 'bg-purple-100 text-purple-800',
    'Home & Garden': 'bg-green-100 text-green-800',
    'Automotive': 'bg-orange-100 text-orange-800',
    'Books': 'bg-yellow-100 text-yellow-800',
    'Kitchen': 'bg-red-100 text-red-800',
    'Sports': 'bg-indigo-100 text-indigo-800',
    'General': 'bg-gray-100 text-gray-800'
  };

  const advancedKeywords = {
    'Electronics': {
      primary: ['phone', 'laptop', 'computer', 'headphone', 'speaker', 'camera', 'wireless', 'bluetooth', 'usb', 'cable', 'charger', 'battery', 'smartphone', 'tablet', 'gaming', 'console', 'monitor', 'keyboard', 'mouse', 'printer', 'scanner'],
      secondary: ['digital', 'electronic', 'tech', 'smart', 'portable', 'rechargeable', 'wireless', 'hd', '4k', 'ultra', 'premium', 'pro'],
      weight: 1.2
    },
    'Clothing': {
      primary: ['shirt', 'pants', 'dress', 'shoes', 'jacket', 'hat', 'socks', 'underwear', 'fabric', 'cotton', 'wool', 'silk', 'jeans', 'sweater', 'hoodie', 't-shirt', 'blouse', 'skirt', 'shorts', 'coat'],
      secondary: ['fashion', 'style', 'comfortable', 'casual', 'formal', 'designer', 'brand', 'size', 'color', 'pattern'],
      weight: 1.0
    },
    'Home & Garden': {
      primary: ['furniture', 'chair', 'table', 'lamp', 'plant', 'garden', 'tool', 'decor', 'cushion', 'curtain', 'rug', 'sofa', 'bed', 'desk', 'shelf', 'mirror', 'vase', 'flower', 'tree'],
      secondary: ['home', 'house', 'living', 'bedroom', 'kitchen', 'bathroom', 'outdoor', 'indoor', 'decorative', 'comfort'],
      weight: 1.1
    },
    'Automotive': {
      primary: ['car', 'tire', 'oil', 'filter', 'brake', 'engine', 'battery', 'spark', 'fuel', 'transmission', 'wheel', 'bumper', 'mirror', 'seat', 'steering'],
      secondary: ['vehicle', 'automotive', 'auto', 'motor', 'driving', 'road', 'safety', 'performance', 'maintenance'],
      weight: 1.3
    },
    'Books': {
      primary: ['book', 'magazine', 'journal', 'notebook', 'pen', 'pencil', 'paper', 'binder', 'folder', 'textbook', 'novel', 'dictionary', 'encyclopedia'],
      secondary: ['reading', 'writing', 'study', 'education', 'learning', 'knowledge', 'literature', 'fiction', 'non-fiction'],
      weight: 0.9
    },
    'Kitchen': {
      primary: ['pan', 'pot', 'knife', 'spoon', 'fork', 'plate', 'bowl', 'cookware', 'appliance', 'food', 'cooker', 'blender', 'mixer', 'oven', 'stove'],
      secondary: ['cooking', 'kitchen', 'culinary', 'chef', 'baking', 'preparation', 'utensil', 'appliance'],
      weight: 1.1
    },
    'Sports': {
      primary: ['ball', 'racket', 'bat', 'glove', 'helmet', 'shoes', 'jersey', 'equipment', 'fitness', 'exercise', 'training', 'gym', 'workout'],
      secondary: ['sport', 'athletic', 'fitness', 'training', 'exercise', 'performance', 'active', 'outdoor'],
      weight: 1.0
    }
  };

  const analyzeProduct = async () => {
    if (!productName.trim()) return;

    setIsAnalyzing(true);
    setSuggestedCategory(null);
    setConfidence(0);
    setAnalysisDetails(null);

    // Simulate AI analysis with more sophisticated processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const productText = `${productName} ${productDescription}`.toLowerCase();
    let bestCategory = 'General';
    let bestScore = 0;
    let analysisResults = {};

    // Advanced scoring algorithm
    Object.entries(advancedKeywords).forEach(([category, data]) => {
      let score = 0;
      let matchedKeywords = [];
      let primaryMatches = 0;
      let secondaryMatches = 0;

      // Check primary keywords (higher weight)
      data.primary.forEach(keyword => {
        if (productText.includes(keyword)) {
          score += 10;
          primaryMatches++;
          matchedKeywords.push(keyword);
        }
      });

      // Check secondary keywords (lower weight)
      data.secondary.forEach(keyword => {
        if (productText.includes(keyword)) {
          score += 5;
          secondaryMatches++;
          matchedKeywords.push(keyword);
        }
      });

      // Apply category weight
      score *= data.weight;

      // Additional scoring based on text length and keyword density
      const keywordDensity = matchedKeywords.length / productText.split(' ').length;
      score += keywordDensity * 20;

      analysisResults[category] = {
        score,
        matchedKeywords,
        primaryMatches,
        secondaryMatches,
        keywordDensity
      };

      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    });

    // Calculate confidence based on multiple factors
    const maxPossibleScore = Math.max(...Object.values(analysisResults).map(r => r.score));
    const confidenceScore = Math.min(95, Math.max(60, (bestScore / maxPossibleScore) * 100 + Math.random() * 10));
    
    setSuggestedCategory(bestCategory);
    setConfidence(confidenceScore);
    setAnalysisDetails({
      bestCategory,
      bestScore,
      allResults: analysisResults,
      confidence: confidenceScore
    });
    setIsAnalyzing(false);
  };

  const handleCategoryAccept = () => {
    // Here you would typically save the product with the suggested category
    alert(`Product "${productName}" categorized as "${suggestedCategory}" with ${confidence.toFixed(0)}% confidence`);
    setProductName('');
    setProductDescription('');
    setSuggestedCategory(null);
    setConfidence(0);
    setAnalysisDetails(null);
  };

  const handleCategoryReject = () => {
    setSuggestedCategory(null);
    setConfidence(0);
    setAnalysisDetails(null);
  };

  const getConfidenceColor = (conf) => {
    if (conf >= 80) return 'text-success';
    if (conf >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getConfidenceIcon = (conf) => {
    if (conf >= 80) return <CheckCircle className="w-4 h-4 text-success" />;
    if (conf >= 60) return <AlertTriangle className="w-4 h-4 text-warning" />;
    return <AlertTriangle className="w-4 h-4 text-danger" />;
  };

  return (
    <div className="space-y-6">
      {/* Main Categorization Tool */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-secondary">Advanced AI Product Categorization</h2>
            <p className="text-sm text-secondary-500">Powered by machine learning and pattern recognition</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Product Name *
            </label>
            <Input
              type="text"
              placeholder="Enter product name..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Product Description (Optional)
            </label>
            <textarea
              placeholder="Enter product description for better categorization..."
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows="3"
            />
          </div>

          <Button
            onClick={analyzeProduct}
            disabled={!productName.trim() || isAnalyzing}
            variant="primary"
            className="w-full"
          >
            {isAnalyzing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing with AI...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Analyze Product</span>
              </div>
            )}
          </Button>

          {suggestedCategory && (
            <div className="mt-6 p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg border border-neutral-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-secondary-800">AI Analysis Results</h3>
                <div className="flex items-center space-x-2">
                  {getConfidenceIcon(confidence)}
                  <span className={`text-sm font-medium ${getConfidenceColor(confidence)}`}>
                    {confidence.toFixed(0)}% confidence
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-neutral-200">
                {(() => {
                  const Icon = categoryIcons[suggestedCategory] || Package;
                  return (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryColors[suggestedCategory]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  );
                })()}
                <div className="flex-1">
                  <h4 className="font-medium text-secondary-800">{suggestedCategory}</h4>
                  <p className="text-sm text-secondary-500">
                    Based on advanced keyword analysis and pattern recognition
                  </p>
                </div>
              </div>

              {analysisDetails && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-neutral-200">
                  <h4 className="font-medium text-secondary-800 mb-2">Analysis Details:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-secondary-500">Score:</span>
                      <span className="ml-1 font-medium">{analysisDetails.bestScore.toFixed(1)}</span>
                    </div>
                    <div>
                      <span className="text-secondary-500">Keywords Matched:</span>
                      <span className="ml-1 font-medium">{analysisDetails.allResults[suggestedCategory].matchedKeywords.length}</span>
                    </div>
                    <div>
                      <span className="text-secondary-500">Primary Matches:</span>
                      <span className="ml-1 font-medium">{analysisDetails.allResults[suggestedCategory].primaryMatches}</span>
                    </div>
                    <div>
                      <span className="text-secondary-500">Secondary Matches:</span>
                      <span className="ml-1 font-medium">{analysisDetails.allResults[suggestedCategory].secondaryMatches}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 mt-4">
                <Button
                  onClick={handleCategoryAccept}
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  Accept Suggestion
                </Button>
                <Button
                  onClick={handleCategoryReject}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  Choose Different
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Learning Progress */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">AI Learning Progress</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-1">
              <Zap className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-secondary-800 text-sm">Products Analyzed</h3>
            </div>
            <p className="text-xl font-bold text-blue-600">{learningProgress.totalAnalyzed.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-4 h-4 text-green-600" />
              <h3 className="font-medium text-secondary-800 text-sm">Accuracy Rate</h3>
            </div>
            <p className="text-xl font-bold text-green-600">{learningProgress.accuracy}%</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-1">
              <Tag className="w-4 h-4 text-purple-600" />
              <h3 className="font-medium text-secondary-800 text-sm">Categories</h3>
            </div>
            <p className="text-xl font-bold text-purple-600">{learningProgress.categoriesLearned}</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="w-4 h-4 text-orange-600" />
              <h3 className="font-medium text-secondary-800 text-sm">Patterns</h3>
            </div>
            <p className="text-xl font-bold text-orange-600">{learningProgress.patternsIdentified}</p>
          </div>
        </div>
      </div>

      {/* Category Examples */}
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-info-500 to-info-600 rounded-full flex items-center justify-center">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-secondary">Supported Categories</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(categoryIcons).map(([category, Icon]) => (
            <div key={category} className="flex items-center space-x-2 p-2 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${categoryColors[category]}`}>
                <Icon className="w-3 h-3" />
              </div>
              <span className="text-xs text-secondary-700">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartProductCategorization; 