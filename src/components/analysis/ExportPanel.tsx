import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';

export function ExportPanel() {
  const handleExportPDF = () => {
    // PDF export logic would go here
    console.log('Exporting PDF...');
  };

  const handleExportExcel = () => {
    // Excel export logic would go here
    console.log('Exporting Excel...');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Export Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">Download detailed reports and raw data</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            PDF Report
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">Full Analysis Report</h4>
          <p className="text-gray-600 mt-1">Complete market analysis with insights</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">Raw Data Export</h4>
          <p className="text-gray-600 mt-1">Spreadsheet with all metrics</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900">Competitor Data</h4>
          <p className="text-gray-600 mt-1">Detailed competitor analysis</p>
        </div>
      </div>
    </div>
  );
}