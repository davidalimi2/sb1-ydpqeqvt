export type LawyerStatus = 'pending' | 'verified' | 'suspended' | 'inactive';
export type PracticeArea = 'corporate' | 'criminal' | 'family' | 'immigration' | 'intellectual_property' | 'real_estate' | 'tax' | 'other';

export interface LawyerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  barNumber: string;
  jurisdiction: string;
  practiceAreas: PracticeArea[];
  yearsOfExperience: number;
  status: LawyerStatus;
  verificationDate?: Date;
  rating: number;
  responseRate: number;
  casesAccepted: number;
  profileImage?: string;
  bio: string;
  education: {
    institution: string;
    degree: string;
    year: number;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: number;
    expiryDate?: Date;
  }[];
  documents: {
    type: 'bar_license' | 'insurance' | 'certification';
    url: string;
    verified: boolean;
  }[];
  availability: {
    consultationHours: {
      start: string;
      end: string;
    };
    timezone: string;
    nextAvailable: Date;
  };
  fees: {
    consultationFee: number;
    hourlyRate: number;
    contingencyFee?: number;
  };
  reviews: {
    id: string;
    rating: number;
    comment: string;
    author: string;
    date: Date;
  }[];
  complianceHistory: {
    date: Date;
    type: 'warning' | 'suspension' | 'reinstatement';
    reason: string;
    resolution?: string;
  }[];
}

export interface VerificationRequest {
  id: string;
  lawyerId: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    type: string;
    url: string;
    status: 'pending' | 'verified' | 'rejected';
    notes?: string;
  }[];
  notes: {
    author: string;
    content: string;
    timestamp: Date;
  }[];
  verifiedBy?: string;
  verifiedAt?: Date;
}

export interface NetworkMetrics {
  totalLawyers: number;
  activeLawyers: number;
  pendingVerifications: number;
  averageResponseRate: number;
  averageRating: number;
  totalCases: number;
  practiceAreaDistribution: Record<PracticeArea, number>;
  jurisdictionDistribution: Record<string, number>;
  monthlyGrowth: number;
  clientSatisfaction: number;
}