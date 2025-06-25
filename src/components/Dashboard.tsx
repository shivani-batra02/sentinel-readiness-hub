
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  FileText, 
  Settings as SettingsIcon, 
  LogOut,
  Shield,
  Clock,
  Brain,
  Heart,
  Zap,
  Target
} from 'lucide-react';
import ReadinessCard from './ReadinessCard';
import MetricCard from './MetricCard';
import AlertFeed from './AlertFeed';
import TrendChart from './TrendChart';
import TeamOverview from './TeamOverview';
import TeamMemberDetail from './TeamMemberDetail';
import DetailedMetrics from './DetailedMetrics';
import Reports from './Reports';
import Settings from './Settings';

interface DashboardProps {
  userRole: 'personnel' | 'supervisor';
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'metrics', label: 'Detailed Metrics', icon: Activity },
    ...(userRole === 'supervisor' ? [{ id: 'team', label: 'Team Overview', icon: Users }] : []),
    ...(userRole === 'supervisor' ? [{ id: 'reports', label: 'Reports', icon: FileText }] : []),
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  // Mock data
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

  const mockTeamMembers = [
    {
      id: '1',
      name: 'John Smith',
      rank: 'Sgt',
      readiness: 85,
      alerts: 0,
      lastUpdate: '2 min ago'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      rank: 'Cpl',
      readiness: 72,
      alerts: 1,
      lastUpdate: '5 min ago'
    },
    {
      id: '3',
      name: 'Mike Davis',
      rank: 'Pvt',
      readiness: 45,
      alerts: 3,
      lastUpdate: '1 min ago'
    }
  ];

  const handleMemberSelect = (member: any) => {
    setSelectedMember(member.id);
    setActiveTab('member-detail');
  };

  const handleBackToTeam = () => {
    setSelectedMember(null);
    setActiveTab('team');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Monitor readiness and performance metrics</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-green-500 text-green-700 bg-green-50">
                  <Shield className="h-3 w-3 mr-1" />
                  Privacy Protected
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Last sync: 2 min ago
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Metrics */}
              <div className="lg:col-span-2 space-y-6">
                <ReadinessCard score={82} trend={5} />
                
                <div className="grid grid-cols-2 gap-4">
                  <MetricCard 
                    title="Stress Level" 
                    value={65} 
                    unit="%" 
                    icon={Brain}
                    type="bar"
                    trend={-3}
                  />
                  <MetricCard 
                    title="Fatigue Level" 
                    value={30} 
                    unit="%" 
                    icon={Heart}
                    type="circle"
                    trend={2}
                  />
                  <MetricCard 
                    title="Cognitive Readiness" 
                    value={85} 
                    unit="%" 
                    icon={Zap}
                    type="gauge"
                    trend={5}
                  />
                  <MetricCard 
                    title="Emotional Stability" 
                    value={78} 
                    unit="%" 
                    icon={Target}
                    type="bar"
                    trend={1}
                  />
                </div>

                <TrendChart data={mockTrendData} />

                {/* Team Insights for Supervisors */}
                {userRole === 'supervisor' && (
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-gray-900 flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>Team Insights</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-2xl font-bold text-green-700">2</div>
                          <div className="text-sm text-green-600">Optimal Readiness</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="text-2xl font-bold text-yellow-700">1</div>
                          <div className="text-sm text-yellow-600">Needs Attention</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="text-2xl font-bold text-red-700">0</div>
                          <div className="text-sm text-red-600">Critical Alerts</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <Button 
                          onClick={() => setActiveTab('team')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          View Full Team Overview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Alerts */}
              <div className="space-y-6">
                <AlertFeed alerts={mockAlerts} />
              </div>
            </div>
          </div>
        );
      case 'metrics':
        return <DetailedMetrics />;
      case 'team':
        return <TeamOverview teamMembers={mockTeamMembers} onMemberClick={handleMemberSelect} />;
      case 'member-detail':
        return selectedMember ? (
          <TeamMemberDetail 
            member={mockTeamMembers.find(m => m.id === selectedMember)!}
            onBack={handleBackToTeam}
          />
        ) : null;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings userRole={userRole} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sentinel AI</h2>
              <p className="text-xs text-gray-600">Psychometric Readiness</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {userRole === 'supervisor' ? 'Supervisor' : 'Personnel'}
              </p>
              <p className="text-xs text-gray-500">John Doe</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
