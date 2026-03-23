import Footer from '@/app/Components/Footer';
import Image from 'next/image';

function Page() {
  return (
    <div className="bg-[#EFECE8] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#121c14] pt-28 md:pt-48 pb-32 overflow-hidden z-10 border-b border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
             <div>
               <div className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                 <span className="w-8 h-px bg-secondary"></span>
                 DELIVERY MANAGEMENT
               </div>
               <h1 className="font-heading font-black italic text-3xl md:text-5xl md:text-7xl text-white tracking-tighter leading-[0.85] uppercase mb-8">
                 STOP OR <br />
                 <span className="text-secondary">FORWARD MAIL.</span>
               </h1>
               <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl">
                 After a loved one passes, you can manage mail sent to their addresses. Learn how to file a proper request to redirect their mail or remove them from advertising lists.
               </p>
             </div>
             
             <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
               <Image
                 src="https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?q=80&w=2670&auto=format&fit=crop"
                 alt="Mail Management"
                 fill
                 className="object-cover grayscale-[0.2]"
               />
               <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Guide Steps */}
      <section className="py-12 md:py-24 max-w-4xl mx-auto px-6 relative z-20 -mt-10">
        <div className="bg-white rounded-[3rem] p-6 md:p-10 md:p-8 md:p-16 shadow-2xl border border-primary/5">
          
          <div className="mb-16">
            <h2 className="font-heading font-black italic text-4xl text-primary tracking-tighter uppercase mb-6 pb-6 border-b border-primary/10">
              IF YOU SHARED AN ADDRESS
            </h2>
            <p className="text-primary/70 font-medium leading-relaxed mb-6">
              If you shared a mailing address with someone who has died and continue to receive their mail, you have several options:
            </p>
            <ul className="list-disc list-inside text-primary/80 space-y-3 font-medium text-sm">
              <li>You may open and manage the deceased's mail as needed.</li>
              <li>You may forward all of the deceased's mail to a different address.</li>
              <li>You may forward a single piece of mail, for example, to an appointed executor, without visiting a Krest Delivery center.</li>
              <li>Remove a package you no longer wish to track from your dashboard.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-black italic text-4xl text-primary tracking-tighter uppercase mb-6 pb-6 border-b border-primary/10">
              IF YOU HAVE A DIFFERENT ADDRESS
            </h2>
            <p className="text-primary/70 font-medium leading-relaxed mb-6">
              To forward the deceased's mail to yourself or to a different address, you must visit a Krest Delivery center to submit a change of address request. You will need to:
            </p>
            <div className="bg-secondary/10 border border-secondary/20 p-8 rounded-2xl">
              <ul className="list-disc list-inside text-primary/80 space-y-4 font-bold text-sm">
                <li>
                  Provide documented proof that you are the appointed executor or administrator authorized to manage the deceased's mail. (Having their death certificate is not enough.)
                </li>
                <li>Complete a formal change of address request in person.</li>
                <li>Verify your identity with valid government-issued photo ID.</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Page;
