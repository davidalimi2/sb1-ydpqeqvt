import React, { useState } from 'react';
import { Users, Shield, BarChart3 } from 'lucide-react';
import VerificationDashboard from '../components/lawyer/VerificationDashboard';
import NetworkMonitor from '../components/lawyer/NetworkMonitor';
import ComplianceManager from '../components/lawyer/ComplianceManager';
import NetworkAnalytics from '../components/lawyer/NetworkAnalytics';
import { LawyerProfile, NetworkMetrics, VerificationRequest } from '../types/lawyer';

// Mock data - replace with actual API calls
const mockLawyers: LawyerProfile[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    barNumber: 'NY123456',
    jurisdiction: 'New York',
    practiceAreas: ['corporate', 'tax'],
    yearsOfExperience: 10,
    status: 'verified',
    rating: 4.8,
    responseRate: 95,
    casesAccepted: 45,
    bio: 'Experienced corporate lawyer...',
    education: [
      {
        institution: 'Harvard Law School',
        degree: 'JD',
        year: 2010
      }
    ],
    certifications: [],
    documents: [],
    availability: {
      consultationHours: {
        start: '09:00',
        end: '17:00'
      },
      timezone: 'America/New_York',
      nextAvailable: new Date()
    },
    fees: {
      consultationFee: 250,
      hourlyRate: 400
    },
    reviews: [],
    complianceHistory: []
  }
];

const mockMetrics: NetworkMetrics = {
  totalLawyers: 150,
  activeLawyers: 120,
  pendingVerifications: 15,
  averageResponseRate: 92,
  averageRating: 4.5,
  totalCases: 1200,
  practiceAreaDistribution: {
    corporate: 45,
    criminal: 25,
    family: 30,
    immigration: 15,
    intellectual_property: 20,
    real_estate: 10,
    tax: 5,
    other: 0
  },
  jurisdictionDistribution: {
    'New York': 40,
    'California': 35,
    'Texas': 25,
    'Florida': 20
  },
  monthlyGrowth: 8.5,
  clientSatisfaction: 94
};

export default function LawyerNetwork() {
  const [activeTab, setActiveTab] = useState<'verification' | 'monitor' | 'compliance' | 'analytics'>('verification');

  const handleApproveVerification = (requestId: string) => {
    console.log('Approve verification:', requestId);
  };

  const handleRejectVerification = (requestId: string, reason: string) => {
    console.log('Reject verification:', requestId, reason);
  };

  const handleRequestInfo = (requestId: string, message: string) => {
    console.log('Request info:', requestId, message);
  };

  const handleIssueWarning = (lawyerId: string, reason: string) => {
    console.log('Issue warning:', lawyerId, reason);
  };

  const handleSuspend = (lawyerId: string, reason: string) => {
    console.log('Suspend lawyer:', lawyerId, reason);
  };

  const handleReinstate = (lawyerId: string) => {
    console.log('Reinstate lawyer:', lawyerId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Lawyer Network Management
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage lawyer verifications, monitor network activity, and ensure compliance
        </p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('verification')}
            className={`${
              activeTab === 'verification'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Users className="h-5 w-5 mr-2" />
            Verification
          </button>
          <button
            onClick={() => setActiveTab('monitor')}
            className={`${
              activeTab === 'monitor'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Shield className="h-5 w-5 mr-2" />
            Monitor
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`${
              activeTab === 'compliance'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <Shield className="h-5 w-5 mr-2" />
            Compliance
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`${
              activeTab === 'analytics'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Analytics
          </button>
        </nav>
      </div>

      {activeTab === 'verification' && (
        <VerificationDashboard
          requests={[]}
          onApprove={handleApproveVerification}
          onReject={handleRejectVerification}
          onRequestInfo={handleRequestInfo}
        />
      )}

      {activeTab === 'monitor' && (
        <NetworkMonitor
          lawyers={mockLawyers}
          metrics={mockMetrics}
        />
      )}

      {activeTab === 'compliance' && (
        <ComplianceManager
          lawyers={mockLawyers}
          onIssueWarning={handleIssueWarning}
          onSuspend={handleSuspend}
          onReinstate={handleReinstate}
        />
      )}

      {activeTab === 'analytics' && (
        <NetworkAnalytics metrics={mockMetrics} />
      )}
    </div>
  );
}