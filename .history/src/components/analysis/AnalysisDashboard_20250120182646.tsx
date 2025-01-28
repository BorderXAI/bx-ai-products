import React from 'react';
import { ProductOverview } from './ProductOverview';
import { CategoryOverview } from './CategoryOverview';
import { SentimentAnalysis } from './SentimentAnalysis';
import { ExportPanel } from './ExportPanel';
import { mockMarketPosition, mockCategoryMetrics, mockSentimentData } from '../../data/mockAnalysis';


interface AnalysisDashboardProps {
  scrapedData: Record<string, any>;
}

export function AnalysisDashboard({ scrapedData }: AnalysisDashboardProps) {
  return (
    <div className="space-y-8">
      <ProductOverview data={mockMarketPosition} />
      <CategoryOverview data={mockCategoryMetrics} />
      {Object.entries(scrapedData).map(([url, data]) => (
        <div key={url} className="bg-white p-6 rounded-xl shadow-md">
          {/* <h2 className="text-lg font-bold">{data.product_name || 'Unknown Product'}</h2> */}
          <SentimentAnalysis reviews={data.reviews.map((r: any) => r.review)} />
        </div>
      ))}
      <ExportPanel />
    </div>
  );
}
