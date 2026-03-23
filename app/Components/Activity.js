'use client';

import { useEffect, useState } from 'react';
import { fetchActivity } from '../api/supabaseapi';
import Image from 'next/image';
import { ActivitySkeleton } from './SkeletonLoader';

function Activity({ trackingNumber }) {
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trackingNumber) return; // Avoid running if no tracking number

    const getActivities = async () => {
      try {
        setLoading(true);
        const data = await fetchActivity(trackingNumber);
        if (!data) {
          throw new Error('No activity data found.');
        }
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getActivities();
  }, [trackingNumber]); // Run effect when trackingNumber changes

  console.log(activities);

  if (loading) return <ActivitySkeleton />;
  if (error) return <p>Error: {error}</p>;
  if (!activities || activities.length === 0)
    return <p>No activities found.</p>;

  return (
    <ul className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
      {activities.map((activity, index) => {
        const statusText = typeof activity.status === 'string' ? activity.status : activity.status?.status || 'Processing';
        const isCompleted = /delivered|completed/i.test(statusText);
        const isOnHold = /hold|cancel/i.test(statusText);
        
        return (
          <li key={index} className="relative pl-8 animate-in fade-in slide-in-from-left-2 duration-300">
            {/* Timeline Dot */}
            <div className={`absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${
              isCompleted ? 'bg-green-500' : isOnHold ? 'bg-red-500' : 'bg-secondary'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-black italic uppercase tracking-widest ${
                  isCompleted ? 'text-green-600' : isOnHold ? 'text-red-600' : 'text-primary'
                }`}>
                  {statusText}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(activity.time).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-sm font-semibold text-slate-700 leading-snug mb-1">
                Shipment {statusText.toLowerCase() === 'processing' ? 'being processed' : `arrived at ${statusText}`}
              </p>
              
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-400 capitalize">
                  Location: <span className="text-primary">{activity.present_address || 'Warehouse'}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] font-medium text-slate-400">
                  {new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {activity.image_url && (
                <div className="mt-3 relative w-full h-48 rounded-xl overflow-hidden border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer">
                  <Image
                    src={activity.image_url}
                    alt={statusText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Activity;
