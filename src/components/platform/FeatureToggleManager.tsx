import React, { useState } from 'react';
import { ToggleLeft, Tag, Percent, GitBranch } from 'lucide-react';
import { Feature, FeatureEnvironment, FeatureStatus } from '../../types/features';

const environments: FeatureEnvironment[] = ['development', 'staging', 'production'];

export default function FeatureToggleManager() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleStatusChange = (
    featureId: string,
    env: FeatureEnvironment,
    status: FeatureStatus
  ) => {
    setFeatures(features.map(feature => {
      if (feature.id === featureId) {
        return {
          ...feature,
          status: { ...feature.status, [env]: status },
          updatedAt: new Date()
        };
      }
      return feature;
    }));
  };

  const handlePercentageChange = (
    featureId: string,
    env: FeatureEnvironment,
    percentage: number
  ) => {
    setFeatures(features.map(feature => {
      if (feature.id === featureId) {
        return {
          ...feature,
          rolloutPercentage: { 
            ...feature.rolloutPercentage, 
            [env]: Math.min(100, Math.max(0, percentage))
          },
          updatedAt: new Date()
        };
      }
      return feature;
    }));
  };

  const addFeature = () => {
    const newFeature: Feature = {
      id: crypto.randomUUID(),
      name: '',
      key: '',
      description: '',
      status: {
        development: 'enabled',
        staging: 'disabled',
        production: 'disabled'
      },
      rolloutPercentage: {
        development: 100,
        staging: 0,
        production: 0
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
    setFeatures([...features, newFeature]);
    setSelectedFeature(newFeature);
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Feature Toggles</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage feature flags and rollouts across environments
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={addFeature}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <ToggleLeft className="h-4 w-4 mr-2" />
            Add Feature
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="border border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {feature.name || 'New Feature'}
                  </h4>
                  <p className="text-sm text-gray-500">{feature.key}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => setSelectedFeature(feature)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {environments.map((env) => (
                  <div key={env} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {env}
                    </label>
                    <select
                      value={feature.status[env]}
                      onChange={(e) => handleStatusChange(
                        feature.id,
                        env,
                        e.target.value as FeatureStatus
                      )}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                      <option value="percentage">Percentage</option>
                    </select>

                    {feature.status[env] === 'percentage' && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={feature.rolloutPercentage?.[env] || 0}
                          onChange={(e) => handlePercentageChange(
                            feature.id,
                            env,
                            parseInt(e.target.value)
                          )}
                          className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        <span className="text-sm text-gray-500">%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {feature.dependencies && feature.dependencies.length > 0 && (
                <div className="flex items-center text-sm text-gray-500">
                  <GitBranch className="h-4 w-4 mr-1" />
                  Dependencies: {feature.dependencies.join(', ')}
                </div>
              )}
            </div>
          ))}

          {features.length === 0 && (
            <div className="text-center py-12">
              <ToggleLeft className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No features yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new feature toggle.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}