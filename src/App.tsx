import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import EmployeeAccess from './pages/EmployeeAccess';
import AIPlayground from './pages/AIPlayground';
import Content from './pages/Content';
import CRMDashboard from './pages/CRM';
import AIAgentConfig from './pages/AIAgent';
import Subscriptions from './pages/Subscriptions';
import Analytics from './pages/Analytics';
import LawyerNetwork from './pages/LawyerNetwork';
import Billing from './pages/Billing';
import Security from './pages/Security';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Support from './pages/Support';

function App() {
  return (
    <AuthProvider>
      <Router>
        <DashboardLayout>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
              <Route path="/dashboard/employee-access" element={<ProtectedRoute><EmployeeAccess /></ProtectedRoute>} />
              <Route path="/dashboard/ai-playground" element={<ProtectedRoute><AIPlayground /></ProtectedRoute>} />
              <Route path="/dashboard/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
              <Route path="/dashboard/crm" element={<ProtectedRoute><CRMDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/ai-agent" element={<ProtectedRoute><AIAgentConfig /></ProtectedRoute>} />
              <Route path="/dashboard/subscriptions" element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
              <Route path="/dashboard/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/dashboard/lawyer-network" element={<ProtectedRoute><LawyerNetwork /></ProtectedRoute>} />
              <Route path="/dashboard/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} />
              <Route path="/dashboard/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
              <Route path="/dashboard/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/dashboard/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
            </Routes>
          </div>
        </DashboardLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;