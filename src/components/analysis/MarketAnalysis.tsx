import React from 'react';
import { CategoryOverview } from './CategoryOverview';
import { CompetitivePosition } from './CompetitivePosition';
import { mockCategoryMetrics, mockCompetitors, currentProduct } from '../../data/mockAnalysis';

export function MarketAnalysis() {
  return (
    <div className="space-y-6">
      <CategoryOverview data={mockCategoryMetrics} />
      <CompetitivePosition 
        competitors={mockCompetitors}
        currentProduct={currentProduct}
      />
    </div>
  );
}