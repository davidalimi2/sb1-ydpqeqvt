import React, { useState } from 'react';
import { Users, Plus, Minus, DollarSign } from 'lucide-react';

interface SeatBillingManagerProps {
  currentSeats: number;
  maxSeats: number;
  pricePerSeat: number;
  onUpdateSeats: (seats: number) => void;
}

export default function SeatBillingManager({
  currentSeats,
  maxSeats,
  pricePerSeat,
  onUpdateSeats
}: SeatBillingManagerProps) {
  const [seats, setSeats] = useState(currentSeats);

  const handleSeatChange = (newSeats: number) => {
    if (newSeats >= 1 && newSeats <= maxSeats) {
      setSeats(newSeats);
      onUpdateSeats(newSeats);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-gray-400" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">Team Seats</h3>
        </div>
        <div className="text-sm text-gray-500">
          ${pricePerSeat}/seat/month
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleSeatChange(seats - 1)}
              disabled={seats <= 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-2xl font-semibold">{seats}</span>
            <button
              onClick={() => handleSeatChange(seats + 1)}
              disabled={seats >= maxSeats}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="text-lg font-medium">
            ${(seats * pricePerSeat).toLocaleString()}/month
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Current seats</span>
            <span className="font-medium">{currentSeats}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Maximum seats</span>
            <span className="font-medium">{maxSeats === Infinity ? 'Unlimited' : maxSeats}</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="font-medium">Total monthly cost</span>
              <span className="font-semibold text-indigo-600">
                ${(seats * pricePerSeat).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {seats !== currentSeats && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <DollarSign className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Your next bill will be prorated based on the seat change.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}