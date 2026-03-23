export const dynamic = 'force-dynamic';
import {
    fetchShipmentByTrackingNumber,
    fetchSystemSettings,
} from '@/app/api/supabaseapi';
import ErrorBox from '@/app/dashboard/Components/ErrorBox';
import DownloadPdfAction from './DownloadPdfAction';

export default async function SummaryPage({ params }) {
    const { trackingNumber } = await params;
    const { data, error } = await fetchShipmentByTrackingNumber(trackingNumber);
    const { settings } = await fetchSystemSettings();
    const currencySymbol = settings?.currency_symbol || '$';

    if (error || !data) {
        console.error("Summary Page Error: Shipment not found for", trackingNumber, error);
        return (
            <div className="min-h-screen bg-[#F4F5F7] py-12 px-4 flex items-center justify-center">
                <ErrorBox
                    message={`Shipment "${trackingNumber}" could not be found.`}
                    details={error?.message || "Verify the tracking number and try again."}
                />
            </div>
        );
    }

    const originAddress = `${data.origin_street_address}, ${data.origin_city}, ${data.origin_state}, ${data.origin_country}`;
    const destinationAddress = `${data.destination_street_address}, ${data.destination_city}, ${data.destination_state}, ${data.destination_country}`;
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const trackingNum = data.trackingnumber || data.trackingNumber;

    return (
        <div className="min-h-screen bg-[#F0F2F5] py-12 flex flex-col items-center">
            {/* Global Branding Color Overlay for Premium feel */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary z-50"></div>

            {/* Action Buttons Container */}
            <div className="w-[850px] flex justify-between items-center mb-8 px-4">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-black text-primary tracking-tight">Shipment Documentation</h2>
                    <p className="text-gray-500 text-sm font-medium">Official transit record and shipping summary</p>
                </div>
                <div className="flex gap-4">
                    <DownloadPdfAction trackingNumber={trackingNum} />
                </div>
            </div>

            {/* Printable Area (PDF CONTENT) */}
            <div
                id="pdf-summary-content"
                className="bg-white text-gray-900 shadow-2xl rounded-2xl overflow-hidden origin-top border border-gray-100"
                style={{ width: '850px', minHeight: '1100px', fontFamily: '"Inter", sans-serif' }}
            >
                {/* PDF Header - Brand Bar */}
                <div className="bg-primary px-10 py-10 flex justify-between items-center relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32"></div>
                    
                    <div className="relative z-10">
                        <img 
                            src="https://fwlquslzwqlklvrjzopa.supabase.co/storage/v1/object/public/krest-storage/log.png" 
                            alt="Krest Delivery Logo" 
                            className="h-12 w-auto invert brightness-0"
                            style={{ filter: 'brightness(0) invert(1)' }} 
                        />
                        <div className="mt-4 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-accent"></span>
                            <p className="text-accent text-xs font-black uppercase tracking-[0.2em]">Global Logistics Excellence</p>
                        </div>
                    </div>
                    
                    <div className="text-right relative z-10 flex flex-col items-end">
                        <h1 className="text-4xl font-extrabold text-white tracking-tighter leading-none mb-2">SUMMARY</h1>
                        <div className="bg-accent text-primary px-3 py-1 rounded-md text-xs font-bold tracking-widest inline-block">
                            OFFICIAL TRANSIT RECORD
                        </div>
                    </div>
                </div>

                {/* Sub-Header Branding Bar */}
                <div className="bg-accent h-2 w-full"></div>

                <div className="px-12 py-10">
                    {/* Core Tracking Intelligence */}
                    <div className="grid grid-cols-12 gap-8 mb-12">
                        <div className="col-span-8 bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">Electronic Label ID</p>
                                    <p className="text-3xl font-black text-primary font-mono tracking-tighter">{trackingNum}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">Documented Date</p>
                                    <p className="text-sm font-bold text-gray-700">{formattedDate}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-accent w-2/3"></div>
                                </div>
                                <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                                    <span className="text-xs font-black text-primary uppercase tracking-wider">{data.status_id?.status}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-span-4 bg-primary p-8 rounded-2xl text-white flex flex-col justify-between relative overflow-hidden">
                            {/* Accent Dot */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            
                            <div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">Quick Contact</p>
                                <p className="text-xs font-medium text-white/80">support@krestdelivery.com</p>
                            </div>
                            
                            <div className="mt-8">
                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-1">Portal URL</p>
                                <p className="text-xs font-bold text-accent">hussgrouptransportcourier.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Transit Intelligence Grid */}
                    <div className="grid grid-cols-2 gap-10 mb-12">
                        {/* Origin Intelligence */}
                        <div className="relative pl-10">
                            <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-100 italic"></div>
                            <div className="absolute left-[-6px] top-0 w-3 h-3 bg-accent rounded-full border-4 border-white"></div>
                            
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-4">Origin Hub Intelligence</p>
                            <h3 className="text-lg font-extrabold text-primary mb-2">Consignment Source</h3>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium mb-6">{originAddress}</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Departure</p>
                                    <p className="text-xs font-extrabold text-primary">{data.depaturedate}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Time Window</p>
                                    <p className="text-xs font-extrabold text-primary">{data.depaturetime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Destination Intelligence */}
                        <div className="relative pl-10">
                            <div className="absolute left-0 top-0 h-full w-[2px] bg-gray-100"></div>
                            <div className="absolute left-[-6px] bottom-0 w-3 h-3 bg-primary rounded-full border-4 border-white"></div>
                            
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-4">Destination Target</p>
                            <h3 className="text-lg font-extrabold text-primary mb-2">Delivery Endpoint</h3>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium mb-6">{destinationAddress}</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">ETA Target</p>
                                    <p className="text-xs font-extrabold text-primary">{data.pickupdate}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Expected Time</p>
                                    <p className="text-xs font-extrabold text-primary">{data.pickuptime}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stakeholder Intelligence */}
                    <div className="grid grid-cols-2 gap-10 mb-12 pt-10 border-t border-gray-100">
                        <div className="bg-[#F8FAFC]/50 p-6 rounded-2xl border border-gray-50">
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-6 border-b border-gray-200 pb-2">Shipper Profile</p>
                            <p className="text-base font-black text-primary mb-1">{data.shipper?.name}</p>
                            <p className="text-xs font-bold text-primary/60 mb-3">{data.shipper?.email}</p>
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 italic">
                                <span>M: {data.shipper?.phone_number}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 leading-relaxed">{data.shipper?.address}</p>
                        </div>
                        
                        <div className="bg-[#F8FAFC]/50 p-6 rounded-2xl border border-gray-50">
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black mb-6 border-b border-gray-200 pb-2">Receiver Profile</p>
                            <p className="text-base font-black text-primary mb-1">{data.receiver?.name}</p>
                            <p className="text-xs font-bold text-primary/60 mb-3">{data.receiver?.email}</p>
                            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 italic">
                                <span>M: {data.receiver?.phone_number}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 leading-relaxed">{data.receiver?.address}</p>
                        </div>
                    </div>

                    {/* Asset / Freight Intelligence */}
                    <div className="bg-primary p-10 rounded-[32px] text-white overflow-hidden relative">
                        {/* Decorative background logo */}
                        <div className="absolute bottom-[-50px] right-[-50px] opacity-[0.03] scale-[4]">
                             <img src="https://fwlquslzwqlklvrjzopa.supabase.co/storage/v1/object/public/krest-storage/log.png" alt="" />
                        </div>

                        <p className="text-[10px] text-accent uppercase tracking-[0.3em] font-black mb-8">Freight Manifest Intelligence</p>
                        
                        <div className="grid grid-cols-2 gap-16 relative z-10">
                            <div className="space-y-6">
                                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                    <span className="text-[10px] text-white/40 uppercase font-black uppercase tracking-wider">Asset Class</span>
                                    <span className="text-sm font-bold text-accent">{data.package_type?.type || (data.shipment_pet_id ? 'Consignment' : 'Asset')}</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                    <span className="text-[10px] text-white/40 uppercase font-black uppercase tracking-wider">{data.shipment_good_id ? 'Identifier' : 'Pet Name'}</span>
                                    <span className="text-sm font-bold">{data.shipment_good_id?.item_name || data.shipment_pet_id?.name}</span>
                                </div>
                                {data.shipment_pet_id && (
                                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                        <span className="text-[10px] text-white/40 uppercase font-black uppercase tracking-wider">Classification</span>
                                        <span className="text-sm font-bold">{data.shipment_pet_id.breed}</span>
                                    </div>
                                )}
                                {data.shipment_good_id && (
                                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                        <span className="text-[10px] text-white/40 uppercase font-black uppercase tracking-wider">Form Factor</span>
                                        <span className="text-sm font-bold">{data.shipment_good_id.dimensions}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                    <span className="text-[10px] text-white/40 uppercase font-black uppercase tracking-wider">Reference ID</span>
                                    <span className="text-sm font-bold">{data.shipment_good_id?.Item_number || data.shipment_pet_id?.petNumber}</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                                    <span className="text-[10px] text-white/40 uppercase font-black uppercase tracking-wider">Net Weight</span>
                                    <span className="text-sm font-bold">{data.shipment_good_id?.weight || data.shipment_pet_id?.weight} LBS</span>
                                </div>
                                <div className="flex justify-between items-center py-4 px-6 bg-white/5 rounded-2xl border border-white/10 mt-4">
                                    <span className="text-[10px] text-accent uppercase font-black tracking-[0.2em]">Total Service Value</span>
                                    <span className="text-2xl font-black text-white">{currencySymbol}{data.totalfreight}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Disclaimer */}
                    <div className="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Electronic Authentication</p>
                            <p className="text-[10px] text-gray-300 font-medium">Verified by Krest Delivery Security Protocol 2026.1</p>
                        </div>
                        <div className="text-right">
                             <img 
                                src="https://fwlquslzwqlklvrjzopa.supabase.co/storage/v1/object/public/krest-storage/log.png" 
                                alt="" 
                                className="h-4 w-auto opacity-20 ml-auto grayscale"
                            />
                            <p className="text-[9px] text-gray-300 font-medium mt-2">© 2026 Krest Delivery Global Logistics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
