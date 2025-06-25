
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Shield, Bell, Download, Trash2, Eye } from 'lucide-react';

interface SettingsProps {
  userRole: 'personnel' | 'supervisor';
}

const Settings = ({ userRole }: SettingsProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>Privacy Controls & Settings</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Privacy Controls */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Data Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-green-800">Privacy Protected</h4>
            </div>
            <p className="text-green-700 text-sm">
              This system only monitors physiological signals and does not track communications, 
              location, or social interactions. Your personal data remains private and secure.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-900 font-medium">Data Collection</h4>
                <p className="text-gray-600 text-sm">Allow physiological data monitoring</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-900 font-medium">Anonymous Analytics</h4>
                <p className="text-gray-600 text-sm">Help improve the system with anonymous usage data</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-gray-900 font-medium">Data Sharing with Supervisors</h4>
                <p className="text-gray-600 text-sm">Allow supervisors to view your readiness status</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 font-medium">Critical Alerts</h4>
              <p className="text-gray-600 text-sm">Notifications for critical readiness changes</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 font-medium">Daily Summaries</h4>
              <p className="text-gray-600 text-sm">Daily readiness summary notifications</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 font-medium">Trend Alerts</h4>
              <p className="text-gray-600 text-sm">Notifications about significant trend changes</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 font-medium">Recommendation Alerts</h4>
              <p className="text-gray-600 text-sm">AI-powered wellness recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Download className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">Export Your Data</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Download all your personal data in a portable format
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Request Export
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-gray-900">View Data Usage</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                {userRole === 'personnel' 
                  ? 'Request to see what data is collected and how it\'s used'
                  : 'See what data is collected and how it\'s used'
                }
              </p>
              <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                {userRole === 'personnel' ? 'Request View Details' : 'View Details'}
              </Button>
            </div>
          </div>

          {/* Only show delete option for supervisors */}
          {userRole === 'supervisor' && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                <h4 className="font-medium text-red-800">Delete All Data</h4>
              </div>
              <p className="text-red-700 text-sm mb-3">
                Permanently delete all data from the system. This action cannot be undone.
              </p>
              <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete All Data
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Preferences */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">System Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 font-medium">Dark Mode</h4>
              <p className="text-gray-600 text-sm">Use dark theme for better visibility</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 font-medium">Auto-refresh Data</h4>
              <p className="text-gray-600 text-sm">Automatically update dashboard data</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-gray-900 font-medium">High Contrast Mode</h4>
              <p className="text-gray-600 text-sm">Enhanced contrast for better readability</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
