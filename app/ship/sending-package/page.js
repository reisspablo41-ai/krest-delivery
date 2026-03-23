import Footer from '@/app/Components/Footer';
import Image from 'next/image';
import Link from 'next/link';

function Page() {
  return (
    <div className="bg-[#EFECE8] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary pt-28 md:pt-48 pb-32 overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
             <div>
               <div className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                 <span className="w-8 h-px bg-secondary"></span>
                 SHIPPING GUIDE
               </div>
               <h1 className="font-heading font-black italic text-4xl md:text-5xl md:text-8xl text-white tracking-tighter leading-[0.85] uppercase mb-8">
                 HOW TO SEND <br />
                 <span className="text-secondary">A PACKAGE.</span>
               </h1>
               <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl">
                 Learn how to use Krest Delivery to send packages globally. Pay for postage, print shipping labels, and schedule pickups directly from your command center.
               </p>
             </div>
             
             <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
               <Image
                 src="https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?q=80&w=2670&auto=format&fit=crop"
                 alt="Shipping Packages"
                 fill
                 className="object-cover grayscale-[0.2]"
               />
               <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Guide Steps */}
      <section className="py-12 md:py-24 max-w-4xl mx-auto px-6 relative z-20 -mt-10">
        <div className="bg-white rounded-[3rem] p-6 md:p-10 md:p-8 md:p-16 shadow-2xl border border-primary/5">
          <h2 className="font-heading font-black italic text-4xl text-primary tracking-tighter uppercase mb-16 pb-8 border-b border-primary/10">
            STEP-BY-STEP INSTRUCTIONS
          </h2>

          <div className="space-y-16">
            
            <StepBlock step="1" title="ASK, 'CAN I SEND THIS?'">
               <p className="text-primary/70 font-medium leading-relaxed mb-6">
                 The maximum weight for a Krest Delivery package is 70 lbs. There are items you can't send at all (prohibited) and things you can only send under certain conditions (restricted). Hazardous materials (HAZMAT) might be prohibited or restricted.
               </p>
               <div className="grid md:grid-cols-2 gap-8 mt-8">
                 <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                    <h4 className="font-bold text-red-900 mb-3 uppercase tracking-widest text-xs">Prohibited Items</h4>
                    <ul className="list-disc list-inside text-sm text-red-800/80 space-y-2 font-medium">
                      <li>Ammunition, explosives, and fireworks</li>
                      <li>Items containing liquid mercury</li>
                      <li>Alcoholic beverages</li>
                    </ul>
                 </div>
                 <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                    <h4 className="font-bold text-amber-900 mb-3 uppercase tracking-widest text-xs">Restricted Items</h4>
                    <ul className="list-disc list-inside text-sm text-amber-800/80 space-y-2 font-medium">
                      <li>Lithium batteries (usually OK if new inside device)</li>
                      <li>Perishable items (properly packaged)</li>
                      <li>Perfumes containing alcohol (ground only)</li>
                    </ul>
                 </div>
               </div>
            </StepBlock>

            <StepBlock step="2" title="CHOOSE A SHIPPING SERVICE">
               <p className="text-primary/70 font-medium leading-relaxed mb-6">
                 Krest Delivery offers 5 core shipping services. Start by looking at what you're sending, then make your decision based on price, speed, and whether you need insurance, tracking, and other extra services.
               </p>
            </StepBlock>

            <StepBlock step="3" title="PICK & PREPARE PACKAGING">
               <p className="text-primary/70 font-medium leading-relaxed mb-6">
                 Whether you're using a box, padded envelope, or tube, use packaging that doesn't bulge and is strong enough to protect what you're sending. Accurately measure the size and weight of your package to avoid unexpected fees.
               </p>
            </StepBlock>

            <StepBlock step="4" title="ADDRESS YOUR PACKAGE">
               <p className="text-primary/70 font-medium leading-relaxed mb-6">
                 Write the address parallel to the longest side of the package, and make sure your return address, the delivery address, and postage fit on the same side.
               </p>
               <div className="bg-[#121c14] text-secondary p-6 rounded-2xl shadow-inner mt-4">
                 <span className="font-black italic uppercase tracking-widest text-xs mb-2 block text-white/50">PRO TIP</span>
                 <p className="font-medium text-sm">
                   If you'll be printing a shipping label, use that instead of a separate address label. Place all labels on the same side, and don't bend, fold, or overlap labels.
                 </p>
               </div>
            </StepBlock>

            <StepBlock step="5" title="CALCULATE POSTAGE">
               <p className="text-primary/70 font-medium leading-relaxed mb-6">
                 Postage depends on a few factors. Use the Postage Calculator to see your costs. Pay for postage at a drop-off point or buy postage online via Krest Delivery Click-N-Ship® and print it yourself.
               </p>
            </StepBlock>

            <StepBlock step="6" title="SHIP YOUR PACKAGE">
               <p className="text-primary/70 font-medium leading-relaxed mb-6">
                 If your package is under 10oz and half-inch thick, you can drop it in a collection box or schedule a free home pickup. Otherwise, drop it off at a Krest Delivery logistics center.
               </p>
               <h4 className="font-heading font-black italic text-xl text-primary tracking-tight uppercase mt-8 mb-4">SCHEDULE A PICKUP</h4>
               <ul className="list-disc list-inside text-primary/70 space-y-3 font-medium text-sm">
                 <li><span className="font-bold text-primary">Regular Route Pickup:</span> Krest Delivery picks up eligible packages for free during daily routes.</li>
                 <li><span className="font-bold text-primary">Pickup On Demand®:</span> Premium paid service to select a precise 2-hour window.</li>
               </ul>
            </StepBlock>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StepBlock({ step, title, children }) {
  return (
    <div className="relative pl-12 md:pl-16">
      <div className="absolute left-0 top-0 text-5xl md:text-4xl md:text-6xl font-heading font-black italic text-primary/10 select-none">
        {step}
      </div>
      <h3 className="font-heading font-black italic text-2xl md:text-3xl text-primary tracking-tight uppercase mb-6 pt-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Page;
