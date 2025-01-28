// import React, { useEffect, useState } from 'react';
// import { MessageCircle, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
// import type { SentimentData } from '../../types/analysis';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// // Register Chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// interface SentimentAnalysisProps {
//   reviews: string[];
//   ratingsBreakdown: Record<string, number>; // Ratings breakdown as percentages
// }

// export function SentimentAnalysis({ reviews, ratingsBreakdown }: SentimentAnalysisProps) {
//   const [data, setData] = useState<SentimentData | null>(null);

//   useEffect(() => {
//     const fetchSentimentData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/sentiment/sentiment-analysis', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(reviews),
//         });
//         const result = await response.json();
//         setData({
//           positive: result.breakdown.positive / reviews.length,
//           neutral: result.breakdown.neutral / reviews.length,
//           negative: result.breakdown.negative / reviews.length,
//           topPhrases: result.key_phrases || [],
//         });
//       } catch (error) {
//         console.error('Error fetching sentiment data:', error);
//       }
//     };

//     if (reviews.length > 0) fetchSentimentData();
//   }, [reviews]);

//   if (!data) return <div>Loading Sentiment Analysis...</div>;

//   // Prepare data for the ratings breakdown bar chart
//   const ratingsChartData = {
//     labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
//     datasets: [
//       {
//         label: 'Ratings Breakdown (%)',
//         data: [
//           ratingsBreakdown['5'] || 0,
//           ratingsBreakdown['4'] || 0,
//           ratingsBreakdown['3'] || 0,
//           ratingsBreakdown['2'] || 0,
//           ratingsBreakdown['1'] || 0,
//         ],
//         backgroundColor: ['#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#f44336'], // Different colors for bars
//         borderWidth: 1,
//       },
//     ],
//   };

//   const ratingsChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Adjust for container responsiveness
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         ticks: { stepSize: 20 },
//       },
//     },
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <div className="flex items-center gap-2 mb-6">
//         <MessageCircle className="w-5 h-5 text-blue-600" />
//         <h3 className="text-xl font-bold text-gray-900">Customer Sentiment</h3>
//       </div>

//       <div className="grid grid-cols-3 gap-6 mb-8">
//         <div className="text-center">
//           <div className="flex items-center justify-center mb-2">
//             <ThumbsUp className="w-8 h-8 text-green-500" />
//           </div>
//           <div className="text-2xl font-bold text-gray-900">{(data.positive * 100).toFixed(0)}%</div>
//           <div className="text-sm text-gray-600">Positive</div>
//         </div>
//         <div className="text-center">
//           <div className="flex items-center justify-center mb-2">
//             <Meh className="w-8 h-8 text-yellow-500" />
//           </div>
//           <div className="text-2xl font-bold text-gray-900">{(data.neutral * 100).toFixed(0)}%</div>
//           <div className="text-sm text-gray-600">Neutral</div>
//         </div>
//         <div className="text-center">
//           <div className="flex items-center justify-center mb-2">
//             <ThumbsDown className="w-8 h-8 text-red-500" />
//           </div>
//           <div className="text-2xl font-bold text-gray-900">{(data.negative * 100).toFixed(0)}%</div>
//           <div className="text-sm text-gray-600">Negative</div>
//         </div>
//       </div>

//       <div className="mb-6">
//         <h4 className="font-semibold text-gray-900 mb-4">Ratings Breakdown</h4>
//         <div style={{ height: '300px' }}>
//           <Bar data={ratingsChartData} options={ratingsChartOptions} />
//         </div>
//       </div>

//       <div>
//         <h4 className="font-semibold text-gray-900 mb-4">Key Phrases</h4>
//         <div className="space-y-3">
//           {data.topPhrases.map((phrase, index) => (
//             <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//               <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
//                 {index + 1}
//               </span>
//               <p className="text-gray-700">{phrase}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  topPhrases: string[];
}

interface SentimentAnalysisProps {
  reviews: { review: string; rating: string }[];
  ratingsBreakdown: Record<string, number>;
}

export function SentimentAnalysis({ reviews, ratingsBreakdown }: SentimentAnalysisProps) {
  const [data, setData] = useState<SentimentData | null>(null);
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sentiment/sentiment-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reviews.map((r) => r.review)),
        });
        const result = await response.json();

        if (result.breakdown) {
          setData({
            positive: result.breakdown.positive / reviews.length,
            neutral: result.breakdown.neutral / reviews.length,
            negative: result.breakdown.negative / reviews.length,
            topPhrases: result.key_phrases || [],
          });
        }
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    const fetchPainPoints = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/llm/summarize-reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews: reviews.map((r) => ({ review: r.review, rating: r.rating })) }),
        });

        if (response.ok) {
          const result = await response.json();
          setSummary(result.summary || 'No summary available.');
          setPainPoints(result.pain_points || []);
        } else {
          console.error('Error fetching pain points:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching pain points:', error);
      }
    };

    if (reviews.length > 0) {
      fetchSentimentData();
      fetchPainPoints();
    }
  }, [reviews]);

  if (!data) return <div>Loading Sentiment Analysis...</div>;

  const validatedRatingsBreakdown = {
    '5': ratingsBreakdown['5'] || 0,
    '4': ratingsBreakdown['4'] || 0,
    '3': ratingsBreakdown['3'] || 0,
    '2': ratingsBreakdown['2'] || 0,
    '1': ratingsBreakdown['1'] || 0,
  };

  const ratingsChartData = {
    labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
    datasets: [
      {
        label: 'Ratings Breakdown (%)',
        data: [
          validatedRatingsBreakdown['5'],
          validatedRatingsBreakdown['4'],
          validatedRatingsBreakdown['3'],
          validatedRatingsBreakdown['2'],
          validatedRatingsBreakdown['1'],
        ],
        backgroundColor: ['#4caf50', '#8bc34a', '#ffc107', '#ff9800', '#f44336'],
        borderWidth: 1,
      },
    ],
  };

  const ratingsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Customer Sentiment</h3>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <ThumbsUp className="w-8 h-8 text-green-500" />
          <div className="text-2xl font-bold text-gray-900">{(data.positive * 100).toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Positive</div>
        </div>
        <div className="text-center">
          <Meh className="w-8 h-8 text-yellow-500" />
          <div className="text-2xl font-bold text-gray-900">{(data.neutral * 100).toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Neutral</div>
        </div>
        <div className="text-center">
          <ThumbsDown className="w-8 h-8 text-red-500" />
          <div className="text-2xl font-bold text-gray-900">{(data.negative * 100).toFixed(0)}%</div>
          <div className="text-sm text-gray-600">Negative</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Ratings Breakdown</h4>
        <div style={{ height: '300px' }}>
          <Bar data={ratingsChartData} options={ratingsChartOptions} />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Summary of Pain Points</h4>
        <p className="text-gray-700 mb-4">{summary}</p>
        <ul className="list-disc list-inside space-y-2">
          {painPoints.map((point, index) => (
            <li key={index} className="text-gray-700">{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

