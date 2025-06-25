
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ReadinessCard from './ReadinessCard';
import MetricCard from './MetricCard';
import AlertFeed from './AlertFeed';
import TrendChart from './TrendChart';
import TeamOverview from './TeamOverview';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Brain,
  Heart,
  Battery,
  Zap,
  Shield
} from 'lucide-react';

interface DashboardProps {
  userRole: 'personnel' | 'supervisor';
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState('dashboard');

  // Mock data - in real app would come from API
  const mockAlerts = [
    {
      id: '1',
      timestamp: 'Today 14:32',
      severity: 'high' as const,
      message: 'Sudden HRV drop detected',
      suggestion: 'Consider taking a break and checking stress levels'
    },
    {
      id: '2',
      timestamp: 'Yesterday 03:00',
      severity: 'medium' as const,
      message: 'Interrupted sleep pattern',
      suggestion: 'Review sleep environment and routine'
    }
  ];

  const mockTrendData = [
    { time: 'Mon', hrv: 45, sleep: 75, activity: 60, stress: 40 },
    { time: 'Tue', hrv: 52, sleep: 82, activity: 65, stress: 35 },
    { time: 'Wed', hrv: 38, sleep: 65, activity: 70, stress: 65 },
    { time: 'Thu', hrv: 55, sleep: 85, activity: 80, stress: 30 },
    { time: 'Fri', hrv: 48, sleep: 78, activity: 75, stress: 45 },
    { time: 'Sat', hrv: 62, sleep: 90, activity: 85, stress: 25 },
    { time: 'Sun', hrv: 58, sleep: 88, activity: 70, stress: 30 }
  ];

  const mockTeamMembers = [
    { id: '1', name: 'John Carter', rank: 'Lt.', readiness: 78, alerts: 1, lastUpdate: '2 min ago' },
    { id: '2', name: 'Alex Rivera', rank: 'Capt.', readiness: 85, alerts: 0, lastUpdate: '5 min ago' },
    { id: '3', name: 'Priya Menon', rank: 'Sgt.', readiness: 74, alerts: 1, lastUpdate: '1 min ago' },
    { id: '4', name: 'Marcus Cole', rank: 'Lt.', readiness: 92, alerts: 0, lastUpdate: '3 min ago' }
  ];

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
    { id: 'metrics', title: 'Detailed Metrics', icon: TrendingUp },
    ...(userRole === 'supervisor' ? [{ id: 'team', title: 'Team Overview', icon: Users }] : []),
    { id: 'reports', title: 'Reports', icon: FileText },
    { id: 'settings', title: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Top Banner */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {userRole === 'supervisor' ? 'S' : 'P'}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-100">
                        {userRole === 'supervisor' ? 'Supervisor Dashboard' : 'Personal Dashboard'}
                      </h2>
                      <p className="text-slate-400">
                        Last sync: {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    🔒 Privacy Protected
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Readiness Score */}
            <ReadinessCard score={78} trend={3} />

            {/* Psychometric Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Stress Level"
                value={65}
                icon={Brain}
                type="bar"
                trend={-2}
              />
              <MetricCard
                title="Fatigue Level"
                value={35}
                icon={Battery}
                type="circle"
                trend={5}
              />
              <MetricCard
                title="Cognitive Readiness"
                value={90}
                icon={Zap}
                type="gauge"
                trend={1}
              />
              <MetricCard
                title="Emotional Stability"
                value={85}
                icon={Heart}
                type="bar"
                trend={-1}
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

            {/* Team Overview for Supervisors */}
            {userRole === 'supervisor' && (
              <TeamOverview teamMembers={mockTeamMembers} />
            )}
          </div>
        );

      case 'team':
        return userRole === 'supervisor' ? (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-100">Team Management</CardTitle>
              </CardHeader>
              <CardContent>
                <TeamOverview teamMembers={mockTeamMembers} />
              </CardContent>
            </Card>
          </div>
        ) : null;

      default:
        return (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Shield className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <p className="text-slate-400">
                  {activeView} - Coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-900">
        <Sidebar className="bg-slate-800 border-slate-700">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-slate-300 text-lg font-semibold px-4 py-2">
                <Shield className="h-5 w-5 mr-2 inline" />
                Readiness Monitor
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        asChild
                        className={`${
                          activeView === item.id 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <button 
                          onClick={() => setActiveView(item.id)}
                          className="w-full flex items-center space-x-2 px-4 py-2"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <div className="mt-auto p-4">
              <Button 
                variant="outline" 
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
            <SidebarTrigger className="text-slate-300 hover:text-white" />
          </div>
          <div className="flex-1 p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
