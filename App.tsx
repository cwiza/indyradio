import React, { useState } from 'react';
import { stations, Station, UserPreferences, calculateMatchScore } from './lib/station-data';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Search, Menu, Heart, MapPin, Users, Radio, DollarSign, Shield, AlertTriangle, TrendingUp, Star } from 'lucide-react';
import svgPaths from './imports/svg-y92g1u4lo4';

// Placeholder images - replace with actual assets in public/assets/
const imgCriticalRisk = "https://via.placeholder.com/400x300/ef4444/ffffff?text=Critical+Risk";
const imgHighRisk = "https://via.placeholder.com/400x300/f97316/ffffff?text=High+Risk";
const imgModerateRisk = "https://via.placeholder.com/400x300/eab308/ffffff?text=Moderate+Risk";
const imgLowRisk = "https://via.placeholder.com/400x300/22c55e/ffffff?text=Low+Risk";
const imgCommunitySupport = "https://via.placeholder.com/600x400/3b82f6/ffffff?text=Community+Support";

type View = 'home' | 'questionnaire' | 'recommendations' | 'map' | 'donation';

interface StationRecommendation {
  station: Station;
  score: number;
  reason: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [userPreferences, setUserPreferences] = useState<Partial<UserPreferences>>({});
  const [recommendations, setRecommendations] = useState<StationRecommendation[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [questionnaireStep, setQuestionnaireStep] = useState(0);
  const [mapFilter, setMapFilter] = useState<'all' | 'critical' | 'high' | 'moderate' | 'defunding'>('all');
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');

  const questionsData = [
    {
      question: "What's most important to you in supporting public radio?",
      key: 'priority' as keyof UserPreferences,
      options: [
        { value: 'local-news', label: 'Preserving local journalism and news coverage' },
        { value: 'rural-communities', label: 'Supporting rural and underserved communities' },
        { value: 'emergency-services', label: 'Maintaining emergency broadcasting services' },
        { value: 'cultural-programming', label: 'Preserving cultural and educational programming' }
      ]
    },
    {
      question: "Which geographic area would you like to focus on?",
      key: 'geography' as keyof UserPreferences,
      options: [
        { value: 'local', label: 'My local area (Pacific Northwest)' },
        { value: 'rural-national', label: 'Rural communities nationwide' },
        { value: 'red-states', label: 'Stations in politically conservative states' },
        { value: 'no-preference', label: 'No preference - show me where help is needed most' }
      ]
    },
    {
      question: "How would you like to contribute?",
      key: 'contribution' as keyof UserPreferences,
      options: [
        { value: 'monthly', label: 'Monthly donations ($25-100/month)' },
        { value: 'one-time', label: 'One-time donation ($100-500)' },
        { value: 'emergency', label: 'Emergency response when stations are in crisis' },
        { value: 'volunteer', label: 'Both financial support and volunteering' }
      ]
    },
    {
      question: "What type of impact do you want to have?",
      key: 'impact' as keyof UserPreferences,
      options: [
        { value: 'save-station', label: 'Help save a station from closure' },
        { value: 'expand-coverage', label: 'Expand coverage to underserved areas' },
        { value: 'improve-quality', label: 'Improve programming quality and equipment' },
        { value: 'investigative', label: 'Support investigative journalism' }
      ]
    },
    {
      question: "What's your preferred donation range?",
      key: 'budget' as keyof UserPreferences,
      options: [
        { value: 'under-50', label: 'Under $50' },
        { value: '50-100', label: '$50 - $100' },
        { value: '100-250', label: '$100 - $250' },
        { value: '250-500', label: '$250 - $500' },
        { value: 'over-500', label: 'Over $500' }
      ]
    }
  ];

  const handleQuestionnaireComplete = () => {
    const stationRecommendations = stations
      .map(station => ({
        station,
        score: calculateMatchScore(station, userPreferences as UserPreferences),
        reason: generateRecommendationReason(station, userPreferences as UserPreferences)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
    
    setRecommendations(stationRecommendations);
    setCurrentView('recommendations');
  };

  const generateRecommendationReason = (station: Station, preferences: UserPreferences): string => {
    const reasons = [];
    
    if (station.riskLevel === 'critical') {
      reasons.push('in critical need of immediate support');
    }
    
    if (preferences.priority === 'rural-communities' && station.description.includes('rural')) {
      reasons.push('serves rural communities that match your interests');
    }
    
    if (preferences.geography === 'red-states' && ['TX', 'AR', 'UT', 'ID', 'MT'].includes(station.state)) {
      reasons.push('located in a politically conservative state as preferred');
    }
    
    if (station.federalFunding > 50) {
      reasons.push('heavily dependent on federal funding under threat');
    }
    
    return reasons.length > 0 ? `This station is ${reasons.join(' and ')}.` : 'This station matches your support preferences.';
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskImage = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return imgCriticalRisk;
      case 'high': return imgHighRisk;
      case 'moderate': return imgModerateRisk;
      default: return imgLowRisk;
    }
  };

  const getFilteredStations = () => {
    switch (mapFilter) {
      case 'critical': return stations.filter(s => s.riskLevel === 'critical');
      case 'high': return stations.filter(s => s.riskLevel === 'high');
      case 'moderate': return stations.filter(s => s.riskLevel === 'moderate');
      case 'defunding': return stations.filter(s => s.federalFunding > 45);
      default: return stations;
    }
  };

  const getImpactPreview = (amount: number, station: Station) => {
    if (amount >= 500) return `Fund complete program restoration for ${station.name}`;
    if (amount >= 250) return `Support emergency equipment upgrade`;
    if (amount >= 100) return `Help maintain local news coverage for one month`;
    if (amount >= 50) return `Support one week of emergency broadcasting`;
    return `Contribute to daily operations`;
  };

  const renderHeader = () => (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Radio className="w-8 h-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">IndyRadio</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => setCurrentView('home')}>Home</Button>
            <Button variant="ghost" onClick={() => setCurrentView('map')}>Station Map</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Impact</Button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6 text-gray-600" />
          <span className="text-red-600">Sign In</span>
          <span className="text-red-600">Subscribe</span>
        </div>
      </div>
    </header>
  );

  const renderInteractiveMap = () => (
    <div className="bg-white rounded-2xl shadow-2xl max-w-6xl mx-auto border">
      <div className="p-6 border-b border-gray-200">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Station Map</h3>
          <p className="text-gray-600">Explore stations by risk level and location - Click any marker for details</p>
        </div>
        
        {/* Map Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {[
            { key: 'all', label: 'All Stations' },
            { key: 'critical', label: 'Critical Risk' },
            { key: 'high', label: 'High Risk' },
            { key: 'defunding', label: 'High Federal Dependency' }
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={mapFilter === filter.key ? 'default' : 'outline'}
              onClick={() => setMapFilter(filter.key as any)}
              className={mapFilter === filter.key ? 'bg-red-600 text-white' : ''}
              size="sm"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="p-6">
        <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden border-2 border-gray-200">
          {/* US Map Background */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 960 600" 
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Simplified US Map - Major States */}
            <g className="fill-gray-200 stroke-gray-300" strokeWidth="1">
              {/* West Coast */}
              <path d="M 50,100 L 80,80 L 100,120 L 120,140 L 110,200 L 90,220 L 70,200 Z" opacity="0.8" /> {/* WA */}
              <path d="M 70,200 L 90,220 L 80,280 L 60,300 L 40,280 Z" opacity="0.8" /> {/* OR */}
              <path d="M 40,280 L 60,300 L 80,340 L 90,420 L 70,450 L 50,430 L 40,380 Z" opacity="0.8" /> {/* CA */}
              
              {/* Mountain States */}
              <path d="M 90,220 L 110,200 L 180,220 L 190,280 L 160,300 L 80,280 Z" opacity="0.8" /> {/* ID/MT */}
              <path d="M 160,300 L 190,280 L 240,300 L 230,360 L 180,370 L 160,350 Z" opacity="0.8" /> {/* WY */}
              <path d="M 80,340 L 160,350 L 180,370 L 200,450 L 170,480 L 90,420 Z" opacity="0.8" /> {/* NV/UT */}
              <path d="M 170,480 L 200,450 L 280,470 L 290,520 L 260,540 L 200,520 Z" opacity="0.8" /> {/* AZ */}
              
              {/* Central States */}
              <path d="M 230,360 L 280,370 L 300,300 L 280,260 L 240,300 Z" opacity="0.8" /> {/* CO */}
              <path d="M 280,470 L 350,480 L 370,520 L 340,540 L 290,520 Z" opacity="0.8" /> {/* NM/TX North */}
              <path d="M 340,540 L 370,520 L 450,530 L 470,560 L 420,580 L 350,570 Z" opacity="0.8" /> {/* TX */}
              
              {/* Midwest */}
              <path d="M 300,300 L 400,310 L 420,280 L 380,240 L 340,250 L 280,260 Z" opacity="0.8" /> {/* ND/SD */}
              <path d="M 340,250 L 420,280 L 430,350 L 400,370 L 300,360 L 280,320 Z" opacity="0.8" /> {/* NE/KS */}
              <path d="M 400,370 L 430,350 L 480,360 L 490,400 L 450,420 L 400,410 Z" opacity="0.8" /> {/* OK */}
              
              <path d="M 420,280 L 480,280 L 500,320 L 490,350 L 430,350 Z" opacity="0.8" /> {/* IA */}
              <path d="M 430,350 L 490,350 L 500,380 L 490,400 Z" opacity="0.8" /> {/* MO */}
              <path d="M 450,420 L 490,400 L 530,420 L 540,460 L 510,480 L 470,470 Z" opacity="0.8" /> {/* AR */}
              
              {/* Great Lakes */}
              <path d="M 480,280 L 530,270 L 560,240 L 580,260 L 570,300 L 530,320 L 500,320 Z" opacity="0.8" /> {/* MN/WI */}
              <path d="M 530,320 L 570,300 L 620,290 L 640,310 L 630,350 L 590,360 L 560,340 Z" opacity="0.8" /> {/* MI */}
              <path d="M 500,320 L 560,340 L 580,380 L 560,400 L 500,380 Z" opacity="0.8" /> {/* IL/IN */}
              <path d="M 560,400 L 600,390 L 620,410 L 610,440 L 580,440 L 560,420 Z" opacity="0.8" /> {/* KY */}
              <path d="M 580,380 L 620,370 L 650,360 L 660,390 L 640,410 L 600,390 Z" opacity="0.8" /> {/* OH */}
              
              {/* South */}
              <path d="M 510,480 L 540,460 L 590,470 L 620,490 L 610,520 L 570,530 L 540,520 Z" opacity="0.8" /> {/* LA/MS */}
              <path d="M 540,460 L 610,440 L 650,450 L 680,470 L 670,510 L 620,490 L 590,470 Z" opacity="0.8" /> {/* AL */}
              <path d="M 660,390 L 710,380 L 730,400 L 720,440 L 680,450 L 640,410 Z" opacity="0.8" /> {/* WV/VA */}
              <path d="M 650,450 L 720,440 L 760,460 L 770,500 L 730,520 L 670,510 Z" opacity="0.8" /> {/* NC/SC */}
              <path d="M 670,510 L 730,520 L 760,540 L 780,570 L 740,580 L 680,560 L 650,540 Z" opacity="0.8" /> {/* GA */}
              <path d="M 650,540 L 680,560 L 710,580 L 740,600 L 680,600 L 620,590 L 570,570 L 570,530 L 610,520 Z" opacity="0.8" /> {/* FL */}
              
              {/* Northeast */}
              <path d="M 710,380 L 760,360 L 800,340 L 830,360 L 820,390 L 770,400 L 730,400 Z" opacity="0.8" /> {/* PA/NY */}
              <path d="M 800,340 L 850,310 L 880,300 L 900,320 L 890,350 L 860,360 L 830,360 Z" opacity="0.8" /> {/* New England */}
            </g>
            
            {/* State borders overlay for more definition */}
            <g className="fill-none stroke-gray-400" strokeWidth="0.5" opacity="0.6">
              <line x1="200" y1="200" x2="200" y2="500" /> {/* Vertical divider */}
              <line x1="400" y1="220" x2="400" y2="480" /> {/* Vertical divider */}
              <line x1="600" y1="240" x2="600" y2="500" /> {/* Vertical divider */}
            </g>
          </svg>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md z-10 border">
            <h4 className="font-semibold text-gray-900 mb-3">Risk Levels</h4>
            {[
              { level: 'critical', color: 'bg-red-500', label: 'Critical Risk', count: stations.filter(s => s.riskLevel === 'critical').length },
              { level: 'high', color: 'bg-orange-500', label: 'High Risk', count: stations.filter(s => s.riskLevel === 'high').length },
              { level: 'moderate', color: 'bg-yellow-500', label: 'Moderate Risk', count: stations.filter(s => s.riskLevel === 'moderate').length }
            ].map((item) => (
              <div key={item.level} className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${item.color} border border-gray-300`}></div>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>

          {/* Map Statistics */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md z-10 border">
            <h4 className="font-semibold text-gray-900 mb-3">Live Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Total Stations:</span>
                <span className="font-semibold text-gray-900">{getFilteredStations().length}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">At Risk:</span>
                <span className="font-semibold text-red-600">
                  {getFilteredStations().filter(s => s.riskLevel === 'critical' || s.riskLevel === 'high').length}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Avg. Federal:</span>
                <span className="font-semibold text-gray-900">
                  {Math.round(getFilteredStations().reduce((sum, s) => sum + s.federalFunding, 0) / getFilteredStations().length)}%
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Emergency Need:</span>
                <span className="font-semibold text-red-600">$8.2M</span>
              </div>
            </div>
          </div>

          {/* Station Markers */}
          {getFilteredStations().map((station) => (
            <div
              key={station.id}
              className={`absolute w-5 h-5 rounded-full cursor-pointer transition-all duration-200 hover:scale-150 hover:z-30 z-20 ${getRiskColor(station.riskLevel)} border-2 border-white shadow-lg`}
              style={{ 
                left: `${station.coordinates.x}%`, 
                top: `${station.coordinates.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedStation(station)}
              title={`${station.name} - ${station.location} (${station.riskLevel} risk)`}
            />
          ))}
        </div>
        
        {/* Quick Station Preview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {getFilteredStations().slice(0, 3).map((station) => (
            <Card key={station.id} className="hover:shadow-md transition-shadow cursor-pointer border" onClick={() => setSelectedStation(station)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{station.name}</h4>
                  <Badge className={`${getRiskColor(station.riskLevel)} text-white text-xs`}>
                    {station.riskLevel}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{station.location}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{station.listeners} listeners</span>
                  <span>{station.federalFunding}% federal</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Empowering Independent Radio Stations Across the Nation
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with vulnerable NPR stations facing funding challenges and make a real difference in your community and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setCurrentView('questionnaire')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-full"
            >
              Find Stations to Support
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCurrentView('map')}
              className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg rounded-full"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Map
            </Button>
          </div>
        </div>
        
        {/* Interactive Station Map */}
        <div className="mt-16 relative">
          {renderInteractiveMap()}
        </div>
      </section>

      {/* Risk Level Categories */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Station Risk Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['critical', 'high', 'moderate', 'low'].map((risk) => (
              <Card key={risk} className="bg-orange-50 border-none hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-center capitalize">{risk} Risk</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <ImageWithFallback 
                    src={getRiskImage(risk)}
                    alt={`${risk} risk station`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm text-gray-600">
                    {risk === 'critical' && 'Stations facing immediate closure threat'}
                    {risk === 'high' && 'Stations with significant funding challenges'}
                    {risk === 'moderate' && 'Stations needing community support'}
                    {risk === 'low' && 'Stable stations with growth opportunities'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Support Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{stations.filter(s => s.riskLevel === 'critical' || s.riskLevel === 'high').length}</div>
              <div className="text-gray-600">Stations at Risk</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">$42M</div>
              <div className="text-gray-600">Funding Gap</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">2.3M</div>
              <div className="text-gray-600">Listeners Affected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">18</div>
              <div className="text-gray-600">States Most Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stations */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Stations Needing Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stations.filter(s => ['kqed', 'kpbx', 'wfiu'].includes(s.id)).map((station) => (
              <Card key={station.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedStation(station)}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{station.name} {station.frequency}</CardTitle>
                    <Badge className={`${getRiskColor(station.riskLevel)} text-white`}>
                      {station.riskLevel} Risk
                    </Badge>
                  </div>
                  <p className="text-gray-600">{station.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{station.listeners}</div>
                      <div className="text-sm text-gray-600">Weekly Listeners</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{station.federalFunding}%</div>
                      <div className="text-sm text-gray-600">Federal Funding</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Impact:</strong> {station.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-red-600 text-sm font-medium mb-4">COMMUNITY IMPACT</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Support Matters</h2>
            <p className="text-xl text-gray-600 mb-8">
              Learn about the vital role independent radio stations play in local journalism and community engagement.
            </p>
            <Button 
              onClick={() => setCurrentView('questionnaire')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Get Started
            </Button>
          </div>
          <div>
            <ImageWithFallback 
              src={imgCommunitySupport}
              alt="Community gathered around radio"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );

  const renderQuestionnaire = () => (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Let's Find the Perfect Stations for You to Support</h2>
            <p className="text-gray-600">Answer a few questions to get personalized recommendations for stations that need your help most.</p>
            
            <div className="mt-6">
              <Progress value={(questionnaireStep / questionsData.length) * 100} className="w-full" />
              <p className="text-sm text-gray-500 mt-2">Question {questionnaireStep + 1} of {questionsData.length}</p>
            </div>
          </div>

          {questionnaireStep < questionsData.length ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {questionsData[questionnaireStep].question}
              </h3>
              
              <RadioGroup
                value={userPreferences[questionsData[questionnaireStep].key] || ''}
                onValueChange={(value) => {
                  setUserPreferences({
                    ...userPreferences,
                    [questionsData[questionnaireStep].key]: value
                  });
                }}
              >
                {questionsData[questionnaireStep].options.map((option) => (
                  <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="text-sm cursor-pointer leading-relaxed">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setQuestionnaireStep(Math.max(0, questionnaireStep - 1))}
                  disabled={questionnaireStep === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={() => setQuestionnaireStep(questionnaireStep + 1)}
                  disabled={!userPreferences[questionsData[questionnaireStep].key]}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">Ready to See Your Recommendations!</h3>
              <p className="text-gray-600">We've analyzed your preferences and found the perfect stations for you to support.</p>
              <Button 
                onClick={handleQuestionnaireComplete}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              >
                Get My Recommendations
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Station Recommendations</h2>
          <p className="text-xl text-gray-600">Based on your preferences, here are the stations where your support would make the biggest difference</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {recommendations.map((rec, index) => (
            <Card key={rec.station.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {rec.station.name} {rec.station.frequency}
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </CardTitle>
                    <p className="text-gray-600">{rec.station.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getRiskColor(rec.station.riskLevel)} text-white mb-2`}>
                      {rec.station.riskLevel} Risk
                    </Badge>
                    <div className="text-2xl font-bold text-green-600">{rec.score}%</div>
                    <div className="text-sm text-gray-500">Match Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{rec.station.listeners}</div>
                    <div className="text-sm text-gray-600">Weekly Listeners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{rec.station.federalFunding}%</div>
                    <div className="text-sm text-gray-600">Federal Funding</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Why this matches ({rec.score}%):</strong> {rec.reason}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Support {rec.station.name}</h4>
                  <div className="flex gap-2 mb-3">
                    {[25, 50, 100, 250].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedStation(rec.station);
                          setDonationAmount(amount);
                          setCurrentView('donation');
                        }}
                        className="text-sm"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedStation(rec.station);
                      setCurrentView('donation');
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Donate Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Explore NPR Stations by Risk Level</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {[
            { key: 'all', label: 'All Stations' },
            { key: 'critical', label: 'Critical Risk' },
            { key: 'high', label: 'High Risk' },
            { key: 'defunding', label: 'High Federal Dependency' }
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={mapFilter === filter.key ? 'default' : 'outline'}
              onClick={() => setMapFilter(filter.key as any)}
              className={mapFilter === filter.key ? 'bg-red-600 text-white' : ''}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="relative h-96 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
            {/* US Map Background */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 960 600" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Simplified US Map - Major States */}
              <g className="fill-gray-200 stroke-gray-300" strokeWidth="1">
                {/* West Coast */}
                <path d="M 50,100 L 80,80 L 100,120 L 120,140 L 110,200 L 90,220 L 70,200 Z" opacity="0.8" /> {/* WA */}
                <path d="M 70,200 L 90,220 L 80,280 L 60,300 L 40,280 Z" opacity="0.8" /> {/* OR */}
                <path d="M 40,280 L 60,300 L 80,340 L 90,420 L 70,450 L 50,430 L 40,380 Z" opacity="0.8" /> {/* CA */}
                
                {/* Mountain States */}
                <path d="M 90,220 L 110,200 L 180,220 L 190,280 L 160,300 L 80,280 Z" opacity="0.8" /> {/* ID/MT */}
                <path d="M 160,300 L 190,280 L 240,300 L 230,360 L 180,370 L 160,350 Z" opacity="0.8" /> {/* WY */}
                <path d="M 80,340 L 160,350 L 180,370 L 200,450 L 170,480 L 90,420 Z" opacity="0.8" /> {/* NV/UT */}
                <path d="M 170,480 L 200,450 L 280,470 L 290,520 L 260,540 L 200,520 Z" opacity="0.8" /> {/* AZ */}
                
                {/* Central States */}
                <path d="M 230,360 L 280,370 L 300,300 L 280,260 L 240,300 Z" opacity="0.8" /> {/* CO */}
                <path d="M 280,470 L 350,480 L 370,520 L 340,540 L 290,520 Z" opacity="0.8" /> {/* NM/TX North */}
                <path d="M 340,540 L 370,520 L 450,530 L 470,560 L 420,580 L 350,570 Z" opacity="0.8" /> {/* TX */}
                
                {/* Midwest */}
                <path d="M 300,300 L 400,310 L 420,280 L 380,240 L 340,250 L 280,260 Z" opacity="0.8" /> {/* ND/SD */}
                <path d="M 340,250 L 420,280 L 430,350 L 400,370 L 300,360 L 280,320 Z" opacity="0.8" /> {/* NE/KS */}
                <path d="M 400,370 L 430,350 L 480,360 L 490,400 L 450,420 L 400,410 Z" opacity="0.8" /> {/* OK */}
                
                <path d="M 420,280 L 480,280 L 500,320 L 490,350 L 430,350 Z" opacity="0.8" /> {/* IA */}
                <path d="M 430,350 L 490,350 L 500,380 L 490,400 Z" opacity="0.8" /> {/* MO */}
                <path d="M 450,420 L 490,400 L 530,420 L 540,460 L 510,480 L 470,470 Z" opacity="0.8" /> {/* AR */}
                
                {/* Great Lakes */}
                <path d="M 480,280 L 530,270 L 560,240 L 580,260 L 570,300 L 530,320 L 500,320 Z" opacity="0.8" /> {/* MN/WI */}
                <path d="M 530,320 L 570,300 L 620,290 L 640,310 L 630,350 L 590,360 L 560,340 Z" opacity="0.8" /> {/* MI */}
                <path d="M 500,320 L 560,340 L 580,380 L 560,400 L 500,380 Z" opacity="0.8" /> {/* IL/IN */}
                <path d="M 560,400 L 600,390 L 620,410 L 610,440 L 580,440 L 560,420 Z" opacity="0.8" /> {/* KY */}
                <path d="M 580,380 L 620,370 L 650,360 L 660,390 L 640,410 L 600,390 Z" opacity="0.8" /> {/* OH */}
                
                {/* South */}
                <path d="M 510,480 L 540,460 L 590,470 L 620,490 L 610,520 L 570,530 L 540,520 Z" opacity="0.8" /> {/* LA/MS */}
                <path d="M 540,460 L 610,440 L 650,450 L 680,470 L 670,510 L 620,490 L 590,470 Z" opacity="0.8" /> {/* AL */}
                <path d="M 660,390 L 710,380 L 730,400 L 720,440 L 680,450 L 640,410 Z" opacity="0.8" /> {/* WV/VA */}
                <path d="M 650,450 L 720,440 L 760,460 L 770,500 L 730,520 L 670,510 Z" opacity="0.8" /> {/* NC/SC */}
                <path d="M 670,510 L 730,520 L 760,540 L 780,570 L 740,580 L 680,560 L 650,540 Z" opacity="0.8" /> {/* GA */}
                <path d="M 650,540 L 680,560 L 710,580 L 740,600 L 680,600 L 620,590 L 570,570 L 570,530 L 610,520 Z" opacity="0.8" /> {/* FL */}
                
                {/* Northeast */}
                <path d="M 710,380 L 760,360 L 800,340 L 830,360 L 820,390 L 770,400 L 730,400 Z" opacity="0.8" /> {/* PA/NY */}
                <path d="M 800,340 L 850,310 L 880,300 L 900,320 L 890,350 L 860,360 L 830,360 Z" opacity="0.8" /> {/* New England */}
              </g>
              
              {/* State borders overlay for more definition */}
              <g className="fill-none stroke-gray-400" strokeWidth="0.5" opacity="0.6">
                <line x1="200" y1="200" x2="200" y2="500" /> {/* Vertical divider */}
                <line x1="400" y1="220" x2="400" y2="480" /> {/* Vertical divider */}
                <line x1="600" y1="240" x2="600" y2="500" /> {/* Vertical divider */}
              </g>
            </svg>

            {/* Map Legend */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md z-10">
              <h4 className="font-semibold text-gray-900 mb-2">Risk Levels</h4>
              {[
                { level: 'critical', color: 'bg-red-500', label: 'Critical Risk (60%+ federal funding)' },
                { level: 'high', color: 'bg-orange-500', label: 'High Risk (40-60% federal funding)' },
                { level: 'moderate', color: 'bg-yellow-500', label: 'Moderate Risk (<40% federal funding)' }
              ].map((item) => (
                <div key={item.level} className="flex items-center gap-2 mb-1">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Map Statistics */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-md z-10">
              <h4 className="font-semibold text-gray-900 mb-2">Statistics</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Stations:</span>
                  <span className="font-semibold">{getFilteredStations().length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Risk:</span>
                  <span className="font-semibold text-red-600">
                    {getFilteredStations().filter(s => s.riskLevel === 'critical').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>High Risk:</span>
                  <span className="font-semibold text-orange-600">
                    {getFilteredStations().filter(s => s.riskLevel === 'high').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Federal Funding:</span>
                  <span className="font-semibold">
                    {Math.round(getFilteredStations().reduce((sum, s) => sum + s.federalFunding, 0) / getFilteredStations().length)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Station Markers */}
            {getFilteredStations().map((station) => (
              <div
                key={station.id}
                className={`absolute w-5 h-5 rounded-full cursor-pointer transition-all duration-200 hover:scale-150 z-20 ${getRiskColor(station.riskLevel)} border-2 border-white shadow-lg`}
                style={{ 
                  left: `${station.coordinates.x}%`, 
                  top: `${station.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedStation(station)}
                title={`${station.name} - ${station.location}`}
              />
            ))}
          </div>
        </div>

        {/* Station Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredStations().slice(0, 12).map((station) => (
            <Card key={station.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedStation(station)}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{station.name}</CardTitle>
                  <Badge className={`${getRiskColor(station.riskLevel)} text-white text-xs`}>
                    {station.riskLevel}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{station.location}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <div className="font-bold text-gray-900">{station.listeners}</div>
                    <div className="text-xs text-gray-600">Listeners</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{station.federalFunding}%</div>
                    <div className="text-xs text-gray-600">Federal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDonation = () => (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {selectedStation && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Station Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{selectedStation.name} {selectedStation.frequency}</h2>
                  <p className="text-red-100">{selectedStation.location}</p>
                </div>
                <Badge className={`${getRiskColor(selectedStation.riskLevel)} text-white px-4 py-2`}>
                  {selectedStation.riskLevel} Risk
                </Badge>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Donation Form */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Support {selectedStation.name}</h3>
                  
                  {/* Donation Type */}
                  <div className="mb-6">
                    <Label className="text-base font-semibold mb-3 block">Donation Type</Label>
                    <Tabs value={donationType} onValueChange={(value) => setDonationType(value as any)}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="one-time">One-time</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-6">
                    <Label className="text-base font-semibold mb-3 block">Donation Amount</Label>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {[25, 50, 100, 250].map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount ? 'default' : 'outline'}
                          onClick={() => setDonationAmount(amount)}
                          className={donationAmount === amount ? 'bg-red-600 text-white' : ''}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">$</span>
                      <Input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(Number(e.target.value))}
                        className="flex-1"
                        placeholder="Custom amount"
                      />
                    </div>
                  </div>

                  {/* Impact Preview */}
                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-green-800 mb-2">Your Impact</h4>
                    <p className="text-green-700">{getImpactPreview(donationAmount, selectedStation)}</p>
                  </div>

                  {/* Payment Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="card">Card Number</Label>
                      <Input id="card" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-6 py-3">
                    Donate ${donationAmount} {donationType === 'monthly' ? '/month' : ''}
                  </Button>
                </div>

                {/* Station Details */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Station Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                      <p className="text-gray-600">{selectedStation.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Current Impact</h4>
                      <p className="text-gray-600">{selectedStation.impact}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Financial Overview</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Total Budget:</span>
                            <span className="font-semibold ml-2">{selectedStation.funding.total}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Federal:</span>
                            <span className="font-semibold ml-2">{selectedStation.funding.federal}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">State:</span>
                            <span className="font-semibold ml-2">{selectedStation.funding.state}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Donations:</span>
                            <span className="font-semibold ml-2">{selectedStation.funding.donations}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Emergency Funding Needed</h4>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-red-800 font-semibold text-lg">{selectedStation.emergencyFunding}</p>
                        <p className="text-red-600 text-sm">Required to maintain current operations</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Programs</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStation.programs.map((program, index) => (
                          <Badge key={index} variant="outline">{program}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Critical Needs</h4>
                      <ul className="space-y-1">
                        {selectedStation.needs.map((need, index) => (
                          <li key={index} className="text-gray-600 text-sm">• {need}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {renderHeader()}
      
      {currentView === 'home' && renderHome()}
      {currentView === 'questionnaire' && renderQuestionnaire()}
      {currentView === 'recommendations' && renderRecommendations()}
      {currentView === 'map' && renderMap()}
      {currentView === 'donation' && renderDonation()}

      {/* Station Detail Modal */}
      <Dialog open={!!selectedStation && currentView !== 'donation'} onOpenChange={() => setSelectedStation(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedStation && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedStation.name} {selectedStation.frequency}</span>
                  <Badge className={`${getRiskColor(selectedStation.riskLevel)} text-white`}>
                    {selectedStation.riskLevel} Risk
                  </Badge>
                </DialogTitle>
                <p className="text-gray-600">{selectedStation.location}</p>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{selectedStation.listeners}</div>
                    <div className="text-sm text-gray-600">Weekly Listeners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{selectedStation.federalFunding}%</div>
                    <div className="text-sm text-gray-600">Federal Funding</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{selectedStation.emergencyFunding}</div>
                    <div className="text-sm text-gray-600">Emergency Need</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-600">{selectedStation.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Impact of Funding Cuts</h4>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-red-800">{selectedStation.impact}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStation.programs.map((program, index) => (
                      <Badge key={index} variant="outline">{program}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Critical Needs</h4>
                  <ul className="space-y-1">
                    {selectedStation.needs.map((need, index) => (
                      <li key={index} className="text-gray-600 text-sm">• {need}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      setCurrentView('donation');
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white flex-1"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Support This Station
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedStation(null);
                      setCurrentView('map');
                    }}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Informed, Stay Connected</h3>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest updates on station funding and impact.</p>
            <div className="flex max-w-md mx-auto gap-3">
              <Input placeholder="your@email.com" className="flex-1" />
              <Button className="bg-red-600 hover:bg-red-700 text-white">Subscribe</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">About</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Our Mission</div>
                <div>Team</div>
                <div>Impact</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>How to Help</div>
                <div>Monthly Giving</div>
                <div>Corporate Partners</div>
                <div>Volunteer</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Newsletter</div>
                <div>Social Media</div>
                <div>Blog</div>
                <div>Press</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
            <div className="flex items-center gap-2">
              <Radio className="w-6 h-6 text-red-600" />
              <span className="font-bold text-gray-900">IndyRadio</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 IndyRadio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}