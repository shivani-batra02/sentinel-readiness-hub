
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, AlertTriangle, ChevronRight } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  rank: string;
  readiness: number;
  alerts: number;
  lastUpdate: string;
}

interface TeamOverviewProps {
  teamMembers: TeamMember[];
  onMemberClick?: (member: TeamMember) => void;
}

const TeamOverview = ({ teamMembers, onMemberClick }: TeamOverviewProps) => {
  const getReadinessStatus = (score: number) => {
    if (score >= 80) return { status: 'Optimal', color: 'text-green-400', bg: 'bg-green-500/10' };
    if (score >= 60) return { status: 'Caution', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    return { status: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10' };
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center space-x-2">
          <Users className="h-5 w-5" />
          <span>Team Readiness Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {teamMembers.map((member) => {
            const statusInfo = getReadinessStatus(member.readiness);
            
            return (
              <div 
                key={member.id}
                className={`flex items-center justify-between p-3 rounded-lg bg-slate-700/50 border border-slate-600 ${
                  onMemberClick ? 'cursor-pointer hover:bg-slate-700/70 hover:border-slate-500 transition-all duration-200' : ''
                }`}
                onClick={() => onMemberClick?.(member)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-200">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {member.rank} {member.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Last update: {member.lastUpdate}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {member.alerts > 0 && (
                    <div className="flex items-center space-x-1 text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-xs">{member.alerts}</span>
                    </div>
                  )}
                  
                  <div className="text-right">
                    <div className={`text-lg font-bold ${statusInfo.color}`}>
                      {member.readiness}
                    </div>
                    <Badge className={`${statusInfo.bg} ${statusInfo.color} border-0 text-xs`}>
                      {statusInfo.status}
                    </Badge>
                  </div>
                  
                  {onMemberClick && (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamOverview;
