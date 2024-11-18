import { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'default_key',
  dangerouslyAllowBrowser: true
});

interface MarketResearchResult {
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  competitors: Array<{
    name: string;
    marketShare: string;
    strengths: string[];
  }>;
  marketSize: string;
  growth: string;
}

interface StrategyResult {
  strategy: {
    overview: string;
    channels: string[];
    timeline: string;
    budget: string;
  };
  personas: Array<{
    name: string;
    age: string;
    interests: string[];
    painPoints: string[];
  }>;
  kpis: Array<{
    metric: string;
    target: string;
  }>;
}

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkApiKey = () => {
    if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your_api_key_here') {
      throw new Error('Please set your OpenAI API key in the .env file');
    }
  };

  const generateMarketResearch = async (company: string): Promise<MarketResearchResult> => {
    setLoading(true);
    setError(null);
    
    try {
      checkApiKey();
      const prompt = `Conduct a comprehensive market research analysis for ${company}. Include:
        1. SWOT Analysis
        2. Competitor Analysis
        3. Market Size and Growth
        Format the response as a JSON object with the following structure:
        {
          "swot": {
            "strengths": [],
            "weaknesses": [],
            "opportunities": [],
            "threats": []
          },
          "competitors": [
            {
              "name": "",
              "marketShare": "",
              "strengths": []
            }
          ],
          "marketSize": "",
          "growth": ""
        }`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a market research expert." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result as MarketResearchResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateStrategy = async (
    industry: string,
    target: string,
    goals: string,
    budget: string
  ): Promise<StrategyResult> => {
    setLoading(true);
    setError(null);

    try {
      checkApiKey();
      const prompt = `Create a comprehensive marketing strategy for a ${industry} business targeting ${target} with the following goals: ${goals} and a budget of ${budget}. Include:
        1. Strategy Overview
        2. Marketing Channels
        3. Timeline and Budget
        4. Buyer Personas
        5. KPIs
        Format the response as a JSON object with the following structure:
        {
          "strategy": {
            "overview": "",
            "channels": [],
            "timeline": "",
            "budget": ""
          },
          "personas": [
            {
              "name": "",
              "age": "",
              "interests": [],
              "painPoints": []
            }
          ],
          "kpis": [
            {
              "metric": "",
              "target": ""
            }
          ]
        }`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a marketing strategy expert." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result as StrategyResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateMarketResearch,
    generateStrategy
  };
}