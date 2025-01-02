import { Device } from 'twilio-client';
import { CRMConfig } from '../../types/crm';

let device: Device | null = null;

export async function initializeWebPhone(config: CRMConfig): Promise<void> {
  try {
    // Get Twilio token from your backend
    const response = await fetch('/api/twilio/token');
    const { token } = await response.json();

    // Initialize Twilio Device
    device = new Device(token, {
      codecPreferences: ['opus', 'pcmu'],
      fakeLocalDTMF: true,
      enableRingingState: true
    });

    await device.register();

    // Set up event handlers
    device.on('incoming', handleIncomingCall);
    device.on('error', handleError);
  } catch (error) {
    console.error('Failed to initialize WebPhone:', error);
    throw error;
  }
}

export function makeCall(phoneNumber: string): Promise<void> {
  if (!device) {
    throw new Error('WebPhone not initialized');
  }

  return new Promise((resolve, reject) => {
    const connection = device.connect({ To: phoneNumber });
    
    connection.on('accept', () => resolve());
    connection.on('error', reject);
  });
}

export function endCall(): void {
  if (!device) return;
  
  const activeConnection = device.activeConnection();
  if (activeConnection) {
    activeConnection.disconnect();
  }
}

export function toggleMute(): boolean {
  if (!device) return false;
  
  const activeConnection = device.activeConnection();
  if (activeConnection) {
    const isMuted = !activeConnection.isMuted();
    activeConnection.mute(isMuted);
    return isMuted;
  }
  return false;
}

function handleIncomingCall(connection: any) {
  // Lookup caller info
  const phoneNumber = connection.parameters.From;
  lookupContact(phoneNumber);
  
  // Auto-answer if configured
  if (device?.options?.answerOnBridge) {
    connection.accept();
  }
}

function handleError(error: any) {
  console.error('WebPhone error:', error);
}

async function lookupContact(phoneNumber: string): Promise<void> {
  try {
    // Clean phone number
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Search for contact
    const response = await fetch(`/api/contacts/lookup/${cleanNumber}`);
    const contact = await response.json();
    
    if (contact) {
      // Dispatch contact found event
      window.dispatchEvent(new CustomEvent('contactFound', { detail: contact }));
    }
  } catch (error) {
    console.error('Failed to lookup contact:', error);
  }
}