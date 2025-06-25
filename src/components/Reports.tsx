
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, TrendingUp, Users } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      id: '1',
      title: 'Weekly Readiness Summary',
      description: 'Comprehensive overview of psychometric trends and patterns',
      date: '2024-06-20',
      type: 'Weekly',
      status: 'Ready',
      size: '2.3 MB'
    },
    {
      id: '2',
      title: 'Monthly Performance Analysis',
      description: 'Detailed analysis of performance metrics and correlations',
      date: '2024-06-01',
      type: 'Monthly',
      status: 'Ready',
      size: '5.7 MB'
    },
    {
      id: '3',
      title: 'Stress Event Analysis',
      description: 'Analysis of stress events and recovery patterns',
      date: '2024-06-18',
      type: 'Event-based',
      status: 'Processing',
      size: '1.8 MB'
    }
  ];

  const quickStats = [
    { label: 'Reports Generated', value: '24', icon: FileText },
    { label: 'Data Points Analyzed', value: '15,847', icon: TrendingUp },
    { label: 'Team Members Monitored', value: '8', icon: Users },
    { label: 'Days of Data', value: '90', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Reports & Historical Analysis</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Icon className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generate New Report */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Weekly Summary
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Monthly Analysis
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 border border-slate-600"
              >
                <div className="flex items-center space-x-4">
                  <FileText className="h-6 w-6 text-blue-400" />
                  <div>
                    <h4 className="font-medium text-slate-200">{report.title}</h4>
                    <p className="text-sm text-slate-400">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500">Generated: {report.date}</span>
                      <span className="text-xs text-slate-500">Size: {report.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge 
                    className={`${
                      report.status === 'Ready' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {report.status}
                  </Badge>
                  <Badge className="bg-blue-500/10 text-blue-400">
                    {report.type}
                  </Badge>
                  {report.status === 'Ready' && (
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Data Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-slate-300">Export your data in various formats for external analysis or record keeping.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                Export CSV
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                Export JSON
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                Export PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
