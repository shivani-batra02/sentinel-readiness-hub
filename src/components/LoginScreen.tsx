
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, User } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'personnel' | 'supervisor') => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<'personnel' | 'supervisor' | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
          <CardTitle className="text-2xl text-slate-100">
            Psychometric Readiness
          </CardTitle>
          <CardDescription className="text-slate-400">
            Monitor personnel readiness and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-300">Select Your Role</h3>
            
            <Button
              variant={selectedRole === 'personnel' ? 'default' : 'outline'}
              className={`w-full justify-start h-auto p-4 ${
                selectedRole === 'personnel' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => setSelectedRole('personnel')}
            >
              <User className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Personnel</div>
                <div className="text-xs opacity-80">View your personal readiness metrics</div>
              </div>
            </Button>

            <Button
              variant={selectedRole === 'supervisor' ? 'default' : 'outline'}
              className={`w-full justify-start h-auto p-4 ${
                selectedRole === 'supervisor' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => setSelectedRole('supervisor')}
            >
              <Users className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Supervisor</div>
                <div className="text-xs opacity-80">Monitor team readiness and alerts</div>
              </div>
            </Button>
          </div>

          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!selectedRole}
            onClick={() => selectedRole && onLogin(selectedRole)}
          >
            Access Dashboard
          </Button>

          <div className="pt-4 border-t border-slate-700">
            <Badge variant="outline" className="w-full justify-center text-xs py-2 border-green-500/20 text-green-400">
              🔒 Privacy Protected: Only physiological signals monitored
            </Badge>
            <p className="text-xs text-slate-500 mt-2 text-center">
              No private communications or social tracking. Your data remains secure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
