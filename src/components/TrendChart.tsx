
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TrendData {
  time: string;
  hrv: number;
  sleep: number;
  activity: number;
  stress: number;
}

interface TrendChartProps {
  data: TrendData[];
}

const TrendChart = ({ data }: TrendChartProps) => {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100">Physiological Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="7d" className="space-y-4">
          <TabsList className="bg-slate-700 border-slate-600">
            <TabsTrigger value="24h" className="data-[state=active]:bg-slate-600">24 Hours</TabsTrigger>
            <TabsTrigger value="7d" className="data-[state=active]:bg-slate-600">7 Days</TabsTrigger>
            <TabsTrigger value="30d" className="data-[state=active]:bg-slate-600">30 Days</TabsTrigger>
          </TabsList>
          
          <TabsContent value="24h" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.slice(-24)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="hrv" stroke="#3B82F6" strokeWidth={2} name="HRV" />
                  <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} name="Stress" />
                  <Line type="monotone" dataKey="activity" stroke="#10B981" strokeWidth={2} name="Activity" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="7d" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="hrv" stroke="#3B82F6" strokeWidth={2} name="HRV" />
                  <Line type="monotone" dataKey="sleep" stroke="#8B5CF6" strokeWidth={2} name="Sleep Quality" />
                  <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} name="Stress" />
                  <Line type="monotone" dataKey="activity" stroke="#10B981" strokeWidth={2} name="Activity" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="30d" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="hrv" stroke="#3B82F6" strokeWidth={2} name="HRV" />
                  <Line type="monotone" dataKey="sleep" stroke="#8B5CF6" strokeWidth={2} name="Sleep Quality" />
                  <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} name="Stress" />
                  <Line type="monotone" dataKey="activity" stroke="#10B981" strokeWidth={2} name="Activity" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrendChart;
