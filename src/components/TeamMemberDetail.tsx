
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Brain, Heart, Battery, Zap, AlertTriangle } from 'lucide-react';
import MetricCard from './MetricCard';
import TrendChart from './TrendChart';
import AlertFeed from './AlertFeed';

interface TeamMember {
  id: string;
  name: string;
  rank: string;
  readiness: number;
  alerts: number;
  lastUpdate: string;
}

interface TeamMemberDetailProps {
  member: TeamMember;
  onBack: () => void;
}

const TeamMemberDetail = ({ member, onBack }: TeamMemberDetailProps) => {
  const mockTrendData = [
    { time: 'Mon', hrv: 42, sleep: 72, activity: 58, stress: 45 },
    { time: 'Tue', hrv: 48, sleep: 80, activity: 62, stress: 38 },
    { time: 'Wed', hrv: 35, sleep: 62, activity: 68, stress: 68 },
    { time: 'Thu', hrv: 52, sleep: 83, activity: 78, stress: 32 },
    { time: 'Fri', hrv: 45, sleep: 75, activity: 72, stress: 48 },
    { time: 'Sat', hrv: 59, sleep: 88, activity: 82, stress: 28 },
    { time: 'Sun', hrv: 55, sleep: 85, activity: 68, stress: 33 }
  ];

  const mockAlerts = [
    {
      id: '1',
      timestamp: 'Today 14:32',
      severity: 'high' as const,
      message: 'Sudden HRV drop detected',
      suggestion: 'Recommend break and stress assessment'
    },
    {
      id: '2',
      timestamp: 'Yesterday 09:15',
      severity: 'medium' as const,
      message: 'Sleep quality below baseline',
      suggestion: 'Check sleep environment and routine'
    }
  ];

  const getReadinessStatus = (score: number) => {
    if (score >= 80) return { status: 'Optimal', color: 'text-green-400', bg: 'bg-green-500/10' };
    if (score >= 60) return { status: 'Caution', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    return { status: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10' };
  };

  const statusInfo = getReadinessStatus(member.readiness);

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team Overview
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h2 className="text-xl font-bold text-slate-100">
                  {member.rank} {member.name}
                </h2>
                <p className="text-slate-400">
                  Last update: {member.lastUpdate}
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-slate-200">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Readiness Status */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Current Readiness Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-100 mb-1">{member.readiness}</div>
                <div className="text-sm text-slate-400">/ 100</div>
              </div>
              <div>
                <Badge className={`${statusInfo.bg} ${statusInfo.color} border-0 mb-2`}>
                  {statusInfo.status}
                </Badge>
                {member.alerts > 0 && (
                  <div className="flex items-center space-x-1 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm">{member.alerts} active alerts</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-32 h-32">
              <div className="relative w-full h-full">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    className={statusInfo.color}
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - member.readiness / 100)}`}
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Psychometric Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Stress Level"
          value={68}
          icon={Brain}
          type="bar"
          trend={-3}
        />
        <MetricCard
          title="Fatigue Level"
          value={42}
          icon={Battery}
          type="circle"
          trend={2}
        />
        <MetricCard
          title="Cognitive Readiness"
          value={85}
          icon={Zap}
          type="gauge"
          trend={-1}
        />
        <MetricCard
          title="Emotional Stability"
          value={78}
          icon={Heart}
          type="bar"
          trend={0}
        />
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart data={mockTrendData} />
        </div>
        <div>
          <AlertFeed alerts={mockAlerts} />
        </div>
      </div>

      {/* Recommendations */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <h4 className="font-semibold text-yellow-400 mb-1">Immediate Actions</h4>
              <p className="text-slate-300 text-sm">
                Consider scheduling a wellness check-in due to elevated stress indicators and recent HRV drop.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-1">Optimization</h4>
              <p className="text-slate-300 text-sm">
                Sleep quality improvement strategies may help boost overall readiness score.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMemberDetail;
