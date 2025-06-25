
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  type: 'bar' | 'circle' | 'gauge';
  trend?: number;
}

const MetricCard = ({ title, value, unit = '%', icon: Icon, type, trend }: MetricCardProps) => {
  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderMetric = () => {
    switch (type) {
      case 'bar':
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-2xl font-bold ${getStatusColor(value)}`}>
                {value}{unit}
              </span>
            </div>
            <Progress 
              value={value} 
              className="h-2 bg-slate-700" 
            />
          </div>
        );
      
      case 'circle':
        return (
          <div className="flex items-center justify-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-slate-700"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={getProgressColor(value).replace('bg-', 'stroke-')}
                  strokeWidth="3"
                  strokeDasharray={`${value}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-bold ${getStatusColor(value)}`}>
                  {value}{unit}
                </span>
              </div>
            </div>
          </div>
        );

      case 'gauge':
        return (
          <div className="text-center">
            <div className={`text-3xl font-bold ${getStatusColor(value)}`}>
              {value}{unit}
            </div>
            <div className="mt-2">
              <div className="w-full bg-slate-700 rounded-full h-1">
                <div 
                  className={`h-1 rounded-full ${getProgressColor(value)}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-slate-300 flex items-center space-x-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderMetric()}
        {trend !== undefined && (
          <div className="mt-3 text-xs text-slate-400">
            7-day trend: {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
