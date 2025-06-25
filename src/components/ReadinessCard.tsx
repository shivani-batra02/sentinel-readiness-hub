
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ReadinessCardProps {
  score: number;
  trend: number;
}

const ReadinessCard = ({ score, trend }: ReadinessCardProps) => {
  const getStatusInfo = (score: number) => {
    if (score >= 80) return { status: 'Optimal', color: 'bg-green-500', textColor: 'text-green-400', bgColor: 'bg-green-500/10' };
    if (score >= 60) return { status: 'Caution', color: 'bg-yellow-500', textColor: 'text-yellow-400', bgColor: 'bg-yellow-500/10' };
    return { status: 'Critical', color: 'bg-red-500', textColor: 'text-red-400', bgColor: 'bg-red-500/10' };
  };

  const statusInfo = getStatusInfo(score);

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-slate-100">Current Readiness Score</CardTitle>
          <Badge className={`${statusInfo.bgColor} ${statusInfo.textColor} border-0`}>
            {statusInfo.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-bold text-slate-100">{score}</span>
            <span className="text-xl text-slate-400">/ 100</span>
          </div>
          <div className="flex items-center space-x-1">
            {trend > 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(trend)}%
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${statusInfo.color}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadinessCard;
