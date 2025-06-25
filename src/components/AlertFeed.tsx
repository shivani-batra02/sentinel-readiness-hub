
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Bell } from 'lucide-react';

interface Alert {
  id: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  suggestion?: string;
}

interface AlertFeedProps {
  alerts: Alert[];
}

const AlertFeed = ({ alerts }: AlertFeedProps) => {
  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case 'high':
        return { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'medium':
        return { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
      case 'low':
        return { icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
      default:
        return { icon: Bell, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Active Alerts</span>
          {alerts.length > 0 && (
            <Badge variant="outline" className="ml-auto text-xs">
              {alerts.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.map((alert) => {
              const severityInfo = getSeverityInfo(alert.severity);
              const Icon = severityInfo.icon;
              
              return (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-lg border ${severityInfo.bg} ${severityInfo.border}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-4 w-4 mt-0.5 ${severityInfo.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-200">
                          {alert.message}
                        </p>
                        <span className="text-xs text-slate-400">
                          {alert.timestamp}
                        </span>
                      </div>
                      {alert.suggestion && (
                        <p className="text-xs text-slate-400">
                          💡 {alert.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertFeed;
