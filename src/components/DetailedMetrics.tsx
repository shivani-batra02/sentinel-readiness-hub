
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Heart, Battery, Zap, Activity, Moon, TrendingUp } from 'lucide-react';
import TrendChart from './TrendChart';

const DetailedMetrics = () => {
  const mockDetailedData = [
    { time: 'Mon', hrv: 45, sleep: 75, activity: 60, stress: 40, cognitive: 85, emotional: 80 },
    { time: 'Tue', hrv: 52, sleep: 82, activity: 65, stress: 35, cognitive: 90, emotional: 85 },
    { time: 'Wed', hrv: 38, sleep: 65, activity: 70, stress: 65, cognitive: 75, emotional: 70 },
    { time: 'Thu', hrv: 55, sleep: 85, activity: 80, stress: 30, cognitive: 95, emotional: 90 },
    { time: 'Fri', hrv: 48, sleep: 78, activity: 75, stress: 45, cognitive: 88, emotional: 82 },
    { time: 'Sat', hrv: 62, sleep: 90, activity: 85, stress: 25, cognitive: 92, emotional: 88 },
    { time: 'Sun', hrv: 58, sleep: 88, activity: 70, stress: 30, cognitive: 90, emotional: 85 }
  ];

  const metrics = [
    {
      title: "Heart Rate Variability",
      value: 58,
      unit: "ms",
      icon: Heart,
      description: "Measure of autonomic nervous system balance",
      range: "Normal: 20-80ms",
      status: "good"
    },
    {
      title: "Sleep Quality",
      value: 88,
      unit: "%",
      icon: Moon,
      description: "Based on sleep duration and REM cycles",
      range: "Target: >80%",
      status: "excellent"
    },
    {
      title: "Physical Activity",
      value: 70,
      unit: "%",
      icon: Activity,
      description: "Daily activity level and recovery metrics",
      range: "Target: 60-85%",
      status: "good"
    },
    {
      title: "Stress Response",
      value: 30,
      unit: "%",
      icon: Brain,
      description: "Physiological stress indicators",
      range: "Target: <40%",
      status: "excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-500/10';
      case 'good': return 'text-blue-400 bg-blue-500/10';
      case 'caution': return 'text-yellow-400 bg-yellow-500/10';
      case 'critical': return 'text-red-400 bg-red-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Detailed Psychometric Analysis</span>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">Overview</TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-blue-600">Trends</TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.title} className="bg-slate-800 border-slate-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-6 w-6 text-blue-400" />
                        <CardTitle className="text-slate-100 text-lg">{metric.title}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-slate-100">{metric.value}</span>
                        <span className="text-lg text-slate-400">{metric.unit}</span>
                      </div>
                      <Progress value={metric.value} className="h-3" />
                      <div className="space-y-2">
                        <p className="text-sm text-slate-300">{metric.description}</p>
                        <p className="text-xs text-slate-400">{metric.range}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <TrendChart data={mockDetailedData} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">7-Day Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Average HRV</span>
                    <span className="text-slate-100 font-semibold">51.1 ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Sleep Quality</span>
                    <span className="text-slate-100 font-semibold">80.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Activity Level</span>
                    <span className="text-slate-100 font-semibold">72.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Stress Level</span>
                    <span className="text-slate-100 font-semibold">38.6%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">HRV Trend</span>
                    <Badge className="bg-green-500/10 text-green-400">Improving</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Sleep Pattern</span>
                    <Badge className="bg-blue-500/10 text-blue-400">Stable</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Stress Levels</span>
                    <Badge className="bg-green-500/10 text-green-400">Decreasing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Activity</span>
                    <Badge className="bg-yellow-500/10 text-yellow-400">Variable</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-100">AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">Positive Trends</h4>
                  <p className="text-slate-300 text-sm">Your HRV has shown consistent improvement over the past week, indicating better autonomic balance and recovery.</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <h4 className="font-semibold text-yellow-400 mb-2">Areas for Attention</h4>
                  <p className="text-slate-300 text-sm">Activity levels show high variability. Consider maintaining more consistent exercise routines for optimal readiness.</p>
                </div>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <h4 className="font-semibold text-green-400 mb-2">Recommendations</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Continue current sleep schedule - it's working well</li>
                    <li>• Maintain stress management practices</li>
                    <li>• Consider moderate exercise on rest days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetailedMetrics;
