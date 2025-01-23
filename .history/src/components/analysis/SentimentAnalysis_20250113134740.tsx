import React from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import type { SentimentData } from '../../types/analysis';

interface Props {
  data: SentimentData;
}

export function SentimentAnalysis({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Customer Sentiment</h3>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <ThumbsUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{(data.positive * 100).toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Positive</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Meh className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{(data.neutral * 100).toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Neutral</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <ThumbsDown className="w-8 h-8 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{(data.negative * 100).toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Negative</div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Key Phrases</h4>
        <div className="space-y-3">
          {data.topPhrases.map((phrase, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                {index + 1}
              </span>
              <p className="text-gray-700">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}