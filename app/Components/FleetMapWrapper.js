'use client';

import dynamic from 'next/dynamic';

const FleetMap = dynamic(() => import('./FleetMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-[#0d1610] py-20 border-t border-white/5 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/30 text-sm font-bold tracking-widest uppercase">Loading Fleet Data...</p>
      </div>
    </div>
  ),
});

export default function FleetMapWrapper() {
  return <FleetMap />;
}
