import React from 'react';
import { Award, DollarSign, Heart } from 'lucide-react';
import type { CompetitiveAdvantage } from '../../types/analysis';

interface Props {
  data: CompetitiveAdvantage;
}

export function CompetitiveAdvantagesCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Competitive Advantages</h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Award className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold">Unique Features</h4>
          </div>
          <div className="space-y-2">
            {data.uniqueFeatures.map((feature, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{feature.feature}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${feature.impact === 'high' ? 'bg-green-100 text-green-800' :
                    feature.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {feature.competitorsCoverage}% coverage
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold">Pricing Strength</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Margin</p>
              <p className="text-lg font-semibold">{data.pricingStrength.margin}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Optimization Potential</p>
              <p className="text-lg font-semibold">+{data.pricingStrength.optimizationPotential}%</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold">Customer Sentiment</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Rating vs Competitors</p>
              <p className="text-lg font-semibold">{data.customerSentiment.competitorComparison}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Overall Rating</p>
              <p className="text-lg font-semibold">{data.customerSentiment.rating}/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}