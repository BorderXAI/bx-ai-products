import React from 'react';
import { ProductOverview } from './ProductOverview';
import { CategoryOverview } from './CategoryOverview';
import { SentimentAnalysis } from './SentimentAnalysis';
import { ExportPanel } from './ExportPanel';
import { mockMarketPosition, mockCategoryMetrics } from '../../data/mockAnalysis';

interface AnalysisDashboardProps {
  scrapedData: Record<string, any>;
}

export function AnalysisDashboard({ scrapedData }: AnalysisDashboardProps) {
  return (
    <div className="space-y-8">
      <ProductOverview data={mockMarketPosition} />
      <CategoryOverview data={mockCategoryMetrics} />
      {Object.entries(scrapedData).map(([url, data]) => {
        // Process the ratings breakdown for the SentimentAnalysis component
        const ratingsBreakdown = data.reviews.reduce(
          (acc: Record<string, number>, review: { rating: string }) => {
            const star = review.rating.split('.')[0]; // Extract the integer part of the rating
            acc[star] = (acc[star] || 0) + 1;
            return acc;
          },
          {}
        );

        // Calculate percentages for the ratings breakdown
        const totalReviews = data.reviews.length;
        Object.keys(ratingsBreakdown).forEach((key) => {
          ratingsBreakdown[key] = (ratingsBreakdown[key] / totalReviews) * 100;
        });

        return (
          <div key={url} className="bg-white p-6 rounded-xl shadow-md">
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis for: {url}</h3> */}
            <SentimentAnalysis
              reviews={data.reviews.map((r: any) => r.review)}
              ratingsBreakdown={ratingsBreakdown}
            />
          </div>
        );
      })}
      <ExportPanel />
    </div>
  );
}
