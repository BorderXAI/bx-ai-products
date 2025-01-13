import React from 'react';
import { ProductOverview } from './ProductOverview';
import { CategoryOverview } from './CategoryOverview';
import { SentimentAnalysis } from './SentimentAnalysis';
import { ExportPanel } from './ExportPanel';
import { mockMarketPosition, mockCategoryMetrics, mockSentimentData } from '../../data/mockAnalysis';

export function AnalysisDashboard() {
  return (
    <div className="space-y-8">
      <ProductOverview data={mockMarketPosition} />
      <CategoryOverview data={mockCategoryMetrics} />
      <SentimentAnalysis data={mockSentimentData} />
      <ExportPanel />
    </div>
  );
}