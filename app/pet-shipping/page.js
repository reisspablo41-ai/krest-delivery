import Footer from '@/app/Components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Pet Shipping Guide | Krest Delivery',
  description:
    'Everything you need to know about shipping pets — dogs, cats, birds, reptiles, and exotic animals — by air or ground with Krest Delivery.',
};

/* ─── small reusable primitives ─────────────────────────── */

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-px bg-secondary" />
      <span className="text-secondary text-xs font-bold tracking-[0.3em] uppercase">{children}</span>
    </div>
  );
}

function Badge({ children, color = 'secondary' }) {
  const colours = {
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    blue:      'bg-blue-500/10 text-blue-300 border-blue-500/20',
    amber:     'bg-amber-500/10 text-amber-300 border-amber-500/20',
    red:       'bg-red-500/10 text-red-300 border-red-500/20',
    green:     'bg-green-500/10 text-green-300 border-green-500/20',
    purple:    'bg-purple-500/10 text-purple-300 border-purple-500/20',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${colours[color]}`}>
      {children}
    </span>
  );
}

function RequirementCard({ icon, title, children, accent = false }) {
  return (
    <div className={`rounded-2xl p-6 border ${accent ? 'bg-secondary/5 border-secondary/20' : 'bg-primary/3 border-primary/8 bg-[#f9f7f4]'}`}>
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="font-heading font-black italic text-lg text-primary tracking-tight uppercase mb-2">{title}</h4>
      <div className="text-primary/65 text-sm font-medium leading-relaxed space-y-1">{children}</div>
    </div>
  );
}

function CalloutBox({ type = 'tip', children }) {
  const styles = {
    tip:     { bg: 'bg-secondary/5 border-secondary/20', label: '✦ PRO TIP',  labelClass: 'text-secondary' },
    warning: { bg: 'bg-amber-50 border-amber-200',       label: '⚠ NOTE',     labelClass: 'text-amber-700' },
    danger:  { bg: 'bg-red-50 border-red-200',           label: '🚫 CRITICAL', labelClass: 'text-red-700'   },
  };
  const s = styles[type];
  return (
    <div className={`${s.bg} border rounded-2xl p-5 mt-4`}>
      <span className={`font-black italic uppercase tracking-widest text-xs mb-2 block ${s.labelClass}`}>{s.label}</span>
      <div className="text-sm font-medium text-primary/70 leading-relaxed">{children}</div>
    </div>
  );
}

function SectionDivider() {
  return <div className="border-t border-primary/8 my-14" />;
}

/* ─── page ──────────────────────────────────────────────── */

export default function PetShippingPage() {
  return (
    <div className="bg-[#EFECE8] min-h-screen">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative bg-primary pt-28 md:pt-48 pb-36 overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[180px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel>Pet Shipping Guide</SectionLabel>
              <h1 className="font-heading font-black italic text-5xl md:text-7xl text-white tracking-tighter leading-[0.85] uppercase mb-8">
                SHIP YOUR PET <br />
                <span className="text-secondary">SAFELY.</span>
              </h1>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl mb-8">
                Moving a beloved animal is one of the most complex — and important — shipments we handle. This guide walks you through every requirement, from health certificates to crate standards, for both standard and exotic animals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge color="secondary">🐾 Dogs &amp; Cats</Badge>
                <Badge color="blue">🦜 Exotic Animals</Badge>
                <Badge color="green">✈ Air Transport</Badge>
                <Badge color="amber">🚐 Ground Transport</Badge>
              </div>
            </div>

            <div className="relative h-[420px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2670&auto=format&fit=crop"
                alt="Dog being transported safely"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO BANNER ─────────────────────────────── */}
      <div className="bg-secondary py-5 px-6">
        <p className="max-w-5xl mx-auto text-primary font-bold text-sm text-center leading-relaxed">
          All requirements listed below are <span className="underline underline-offset-2">mandatory</span>. Missing even one document or failing a single container standard can result in your pet being held, refused, or returned at origin — often at your expense.
        </p>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────── */}
      <main className="py-16 md:py-24 max-w-5xl mx-auto px-6 relative z-20">
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-primary/5">

          {/* ── TABLE OF CONTENTS ── */}
          <div className="bg-[#f4f1ec] rounded-2xl p-6 mb-14 border border-primary/8">
            <h2 className="font-heading font-black italic text-lg text-primary uppercase tracking-tight mb-4">On This Page</h2>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm font-bold text-primary/60 list-decimal list-inside">
              <li><a href="#standard-pets" className="hover:text-secondary transition-colors">Standard Pet Requirements</a></li>
              <li><a href="#exotic-pets" className="hover:text-secondary transition-colors">Exotic Pet Requirements</a></li>
              <li><a href="#stamps" className="hover:text-secondary transition-colors">Stamps &amp; Official Endorsements</a></li>
              <li><a href="#transport" className="hover:text-secondary transition-colors">Methods of Transport</a></li>
              <li><a href="#insurance" className="hover:text-secondary transition-colors">Insurance</a></li>
              <li><a href="#storage" className="hover:text-secondary transition-colors">Storage &amp; Holding Fees</a></li>
            </ol>
          </div>

          {/* ════════════════════════════════════════════
              SECTION 1 — STANDARD PETS
          ════════════════════════════════════════════ */}
          <div id="standard-pets">
            <SectionLabel>Category 1</SectionLabel>
            <h2 className="font-heading font-black italic text-4xl md:text-5xl text-primary tracking-tighter uppercase leading-none mb-4">
              Standard Pets<br />
              <span className="text-secondary/70">(Dogs &amp; Cats)</span>
            </h2>
            <p className="text-primary/60 font-medium leading-relaxed mb-10 max-w-3xl">
              Dogs, cats, and common household pets fall under a well-established regulatory framework. The requirements below are the baseline for all shipments — exotic pets must meet <em>all of these plus additional rules</em> outlined in the next section.
            </p>

            {/* 1.1 Health & Medical */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">
              1. Health &amp; Medical Requirements
            </h3>
            <p className="text-primary/60 text-sm font-medium mb-6">
              A &quot;fit to fly&quot; status is the baseline, but the documentation is time-sensitive. Every document below must be in hand before drop-off.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <RequirementCard icon="📋" title="Health Certificate">
                Must be issued by a licensed, USDA-accredited veterinarian. For most carriers, this certificate must be dated <strong>within 10 days</strong> of the travel date. An expired certificate will result in refusal at the counter.
              </RequirementCard>
              <RequirementCard icon="💉" title="Vaccinations">
                Up-to-date rabies vaccination is universal. Some destination countries additionally require a <strong>Rabies Titer (FAVN) Test</strong> — a blood test that can take 3–6 months to process. Begin this process early.
              </RequirementCard>
              <RequirementCard icon="📡" title="Microchipping (ISO)">
                Must be an <strong>ISO-compliant 15-digit microchip</strong>. Critically, the chip must be implanted <em>before</em> the final rabies vaccination for the record to be valid in many regions, including the EU and UK.
              </RequirementCard>
              <RequirementCard icon="🌡️" title="Acclimation Statement">
                For pets traveling in cargo, your vet may need to sign a statement certifying the animal can tolerate the expected temperature range at the origin, transit, and destination airports.
              </RequirementCard>
            </div>

            <CalloutBox type="warning">
              For travel to Hawaii or international destinations like Australia, Japan, or Singapore, quarantine periods of 10–180 days may apply regardless of documentation. Confirm with the destination country&apos;s agricultural authority.
            </CalloutBox>

            <SectionDivider />

            {/* 1.2 Container & Crate */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">
              2. Container &amp; Crate Standards (IATA LAR 2026)
            </h3>
            <p className="text-primary/60 text-sm font-medium mb-6">
              As of January 1, 2026, the IATA Live Animals Regulations (52nd Edition) introduced stricter crate oversight. Non-compliant crates are rejected at check-in — no exceptions.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <RequirementCard icon="📐" title="Size Rule">
                The pet must be able to <strong>stand, turn around, and lie down comfortably</strong> inside. Measure your pet standing and add at least 4 inches to determine minimum interior height.
              </RequirementCard>
              <RequirementCard icon="🔩" title="Construction">
                Must be escape-proof with a solid roof and ventilation on at least <strong>three sides</strong> (four for international). Plastic snap-on clips are prohibited — metal nuts and bolts are required.
              </RequirementCard>
              <RequirementCard icon="🐾" title="Brachycephalic Breeds">
                New 2026 standards define specific size and ventilation requirements for snub-nosed breeds (Bulldogs, Pugs, Persians, Exotic Shorthairs). Many airlines maintain permanent bans on these breeds in cargo.
              </RequirementCard>
              <RequirementCard icon="🥣" title="Interior Setup">
                Must include two fixed bowls (food &amp; water) <strong>accessible from outside the crate</strong>. Absorbent bedding is required — hay, straw, and loose fabric are prohibited on most international routes.
              </RequirementCard>
            </div>

            <SectionDivider />

            {/* 1.3 Legal & Docs */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">
              3. Legal &amp; Government Documentation
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-2xl bg-[#f9f7f4] border border-primary/8">
                <span className="text-2xl shrink-0">🇺🇸</span>
                <div>
                  <h4 className="font-bold text-primary uppercase tracking-wide text-sm mb-1">CDC Dog Import Form (U.S.)</h4>
                  <p className="text-primary/60 text-sm font-medium">Updated February 2026. This digital form is mandatory for all dogs entering the United States. You must present the receipt to the airline before boarding.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-[#f9f7f4] border border-primary/8">
                <span className="text-2xl shrink-0">🏛️</span>
                <div>
                  <h4 className="font-bold text-primary uppercase tracking-wide text-sm mb-1">USDA Endorsement</h4>
                  <p className="text-primary/60 text-sm font-medium">For international exports, your vet&apos;s health certificate must be submitted electronically via VEHCS and then physically endorsed (ink-signed &amp; embossed) by a USDA office before departure.</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl bg-[#f9f7f4] border border-primary/8">
                <span className="text-2xl shrink-0">📄</span>
                <div>
                  <h4 className="font-bold text-primary uppercase tracking-wide text-sm mb-1">Import Permits</h4>
                  <p className="text-primary/60 text-sm font-medium">Countries like Australia, Singapore, and Japan require a pre-approved import permit before the animal leaves the origin country. Processing can take weeks. Apply early.</p>
                </div>
              </div>
            </div>

            <SectionDivider />

            {/* 1.4 Airline Categories Table */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">
              4. Airline Manifest Categories
            </h3>
            <p className="text-primary/60 text-sm font-medium mb-6">How your pet is manifested changes the documentation, fees, and process significantly.</p>
            <div className="overflow-x-auto rounded-2xl border border-primary/10">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Category</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Description</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Requirements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/8">
                  {[
                    ['In-Cabin', 'Small pets under the seat', 'Soft or hard carrier; weight limit usually 8 kg (≈18 lbs) including the carrier.'],
                    ['Excess Baggage', 'Accompanied pet in the hold', 'Check-in at passenger terminal; tied to your ticket; must be on same flight as owner.'],
                    ['Manifest Cargo', 'Unaccompanied or large pets', 'Moves under an Air Waybill; typically requires booking via an IPATA-member agent.'],
                  ].map(([cat, desc, req], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9f7f4]'}>
                      <td className="px-5 py-4 font-bold text-primary">{cat}</td>
                      <td className="px-5 py-4 text-primary/65">{desc}</td>
                      <td className="px-5 py-4 text-primary/65">{req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CalloutBox type="danger">
              <strong>2026 Temperature Restrictions:</strong> Most carriers will ground pet shipments if the runway temperature is forecast below 7°C (45°F) or above 29°C (85°F). Plan travel around seasonal weather windows.
            </CalloutBox>
          </div>

          {/* ════════════════════════════════════════════
              SECTION 2 — EXOTIC PETS
          ════════════════════════════════════════════ */}
          <div id="exotic-pets" className="mt-20">
            <div className="bg-[#0d1610] rounded-[2rem] p-8 md:p-12 mb-10">
              <SectionLabel>Category 2</SectionLabel>
              <h2 className="font-heading font-black italic text-4xl md:text-5xl text-white tracking-tighter uppercase leading-none mb-4">
                Exotic Pets<br />
                <span className="text-secondary">Extra Requirements.</span>
              </h2>
              <p className="text-white/55 font-medium leading-relaxed max-w-3xl">
                Exotic pets — birds, reptiles, amphibians, small mammals (ferrets, sugar gliders), and CITES-listed species — must meet <strong className="text-white">all standard pet requirements above</strong>, plus the additional layers of legal, containment, and state-level compliance described below. Shipping exotic pets is significantly more complex.
              </p>
            </div>

            {/* 2.1 CITES */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">
              1. The Legal Foundation — CITES &amp; Digital Permits
            </h3>
            <p className="text-primary/60 text-sm font-medium mb-6">
              The biggest change in 2026 is the digitization of USFWS permits. Requirements move from &quot;Is it legal?&quot; to &quot;How do I move it?&quot; across three levels of authority.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <RequirementCard icon="🌿" title="CITES Permits">
                If your pet is on the CITES protected list (many parrots, iguanas, tortoises), you need an <strong>export permit</strong> from your home country and an <strong>import permit</strong> from the destination country.
              </RequirementCard>
              <RequirementCard icon="🛂" title="Pet Passport (Form 3-200-64)">
                For owners who travel frequently with an exotic pet, you can apply online for a <strong>3-year repetitive-use certificate</strong>. This is the 2026 digital evolution of the USFWS permit system.
              </RequirementCard>
              <RequirementCard icon="⏳" title="Lead Times">
                There is no expedited option for these permits. You must plan at least <strong>60–90 days</strong> in advance for digital permits and up to <strong>5 months</strong> for physical CITES endorsements.
              </RequirementCard>
            </div>

            <SectionDivider />

            {/* 2.2 IATA Exotics */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">
              2. Transport &amp; Containment — IATA LAR 52nd Edition
            </h3>
            <p className="text-primary/60 text-sm font-medium mb-6">
              The 2026 IATA Live Animals Regulations introduced &quot;CR1&quot; and &quot;CR82&quot; container updates specifically to prevent mismatched housing for exotic species.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <RequirementCard icon="🔒" title="Escape-Proofing">
                For birds and small rodents, standard plastic carriers are routinely rejected. Containers must use <strong>fine wire mesh</strong> over all ventilation holes to prevent escape or injury.
              </RequirementCard>
              <RequirementCard icon="🦜" title="Perching (Birds)">
                Perches must be of a diameter appropriate for the species&apos; foot size and must be positioned so that <strong>tail feathers do not touch the floor or roof</strong> of the container.
              </RequirementCard>
              <RequirementCard icon="🚫" title="Bedding Restrictions">
                The 2026 rules strictly ban hay, straw, and wood shavings on most international flights (soil &amp; pest control laws). <strong>Specialized absorbent pads</strong> are the accepted standard.
              </RequirementCard>
              <RequirementCard icon="🦎" title="Cold-Blooded Animals">
                Reptiles and amphibians are exempt from the standard temperature ban but must be packaged with <strong>heat or cold packs</strong> certified to maintain a stable internal container temperature for the full flight duration.
              </RequirementCard>
            </div>

            <SectionDivider />

            {/* 2.3 State-Level */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">
              3. Domestic &amp; State-Level Barriers
            </h3>
            <p className="text-primary/60 text-sm font-medium mb-6">
              State laws can be more restrictive than federal regulations. These apply even to transit shipments passing through a state.
            </p>
            <div className="space-y-3">
              {[
                ['🚗', 'Wildlife Transportation Permits', 'States like Kentucky and Florida require a specific Transportation Permit just to drive a prohibited species through the state — even if you\'re not stopping there.'],
                ['🐱', 'Hybrid Breed Documentation', 'Savannah cats and wolf-dogs face high scrutiny. To avoid CITES regulations, you often need certified proof that the animal is at least five generations (F5) removed from its wild ancestor.'],
                ['🦎', 'Invasive Species Bans', 'Many states have recently added species like Axolotls and large constrictors to "prohibited" lists. These animals cannot be delivered to those states under any circumstances.'],
              ].map(([icon, title, desc], i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[#f9f7f4] border border-primary/8">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-wide text-sm mb-1">{title}</h4>
                    <p className="text-primary/60 text-sm font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════
              SECTION 3 — STAMPS
          ════════════════════════════════════════════ */}
          <div id="stamps" className="mt-20">
            <SectionLabel>Official Endorsements</SectionLabel>
            <h2 className="font-heading font-black italic text-4xl md:text-5xl text-primary tracking-tighter uppercase leading-none mb-4">
              Stamps &amp; <br /><span className="text-secondary">Endorsements.</span>
            </h2>
            <p className="text-primary/60 font-medium leading-relaxed mb-10 max-w-3xl">
              A stamp is not a formality — it is a legally binding government authentication. Every country that receives a live animal looks specifically for official stamps and endorsements on the accompanying documents. A missing, faded, smudged, or expired stamp is treated the same as no document at all.
            </p>

            {/* Stamp types */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">Types of Required Stamps</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <RequirementCard icon="🔴" title="USDA Accreditation Stamp">
                Every health certificate must carry the <strong>official round red or blue ink stamp</strong> of a USDA-accredited veterinarian. This stamp includes the vet&apos;s USDA accreditation number. Certificates without this stamp are invalid for international travel.
              </RequirementCard>
              <RequirementCard icon="🏛️" title="USDA State Veterinarian Endorsement">
                For international exports, after the accredited vet signs the health certificate, it must be submitted to the <strong>USDA APHIS State Veterinarian&apos;s office</strong> for a physical endorsement: an ink signature plus an official embossed or raised seal. This is separate from the vet&apos;s own stamp.
              </RequirementCard>
              <RequirementCard icon="🛃" title="Customs Entry Stamp">
                At the destination country&apos;s port of entry, the government&apos;s customs and/or agriculture inspector will apply an <strong>entry clearance stamp</strong> to the health certificate and any import permits. This stamp proves the animal legally cleared the border.
              </RequirementCard>
              <RequirementCard icon="🌍" title="Foreign Government Legalization (Apostille)">
                Some countries (particularly outside the Hague Convention) require the USDA endorsement to be further <strong>legalized (Apostilled)</strong> by the destination country&apos;s embassy or consulate in the U.S. This is a second-layer stamp that authenticates the USDA officer&apos;s signature itself.
              </RequirementCard>
              <RequirementCard icon="🦜" title="CITES Permit Stamps (Exotic Pets)">
                CITES export and import permits carry their own government stamps — one from the exporting country&apos;s CITES Management Authority and one from the importing country. Both must be <strong>original stamps on physical documents</strong>; digital copies are not accepted at the border.
              </RequirementCard>
              <RequirementCard icon="🧪" title="Rabies Titer Test Stamp">
                Labs accredited to perform the FAVN (Fluorescent Antibody Virus Neutralization) test issue results with an <strong>official laboratory stamp and reference number</strong>. Many countries (EU, UK, Japan, Australia) only accept results from EU-approved labs — confirm the lab&apos;s approval status before testing.
              </RequirementCard>
            </div>

            {/* Stamp validity table */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">Stamp Validity Windows</h3>
            <div className="overflow-x-auto rounded-2xl border border-primary/10 mb-6">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Document</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Stamp Required</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Valid For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/8">
                  {[
                    ['Health Certificate', 'USDA Accredited Vet + USDA State Endorsement', '10 days from issue date'],
                    ['Rabies Vaccination Record', 'Issuing Veterinarian Stamp', 'Duration of vaccine (1 or 3 years)'],
                    ['FAVN Rabies Titer Test', 'Accredited Laboratory Stamp', 'Lifetime (if passing result maintained)'],
                    ['CITES Export Permit', 'Exporting Country CITES Authority', 'Typically 6 months from issue'],
                    ['CITES Import Permit', 'Importing Country CITES Authority', 'Typically 6–12 months from issue'],
                    ['Import Permit', 'Destination Gov. Agriculture Dept.', 'Varies — usually tied to travel date'],
                    ['Apostille / Legalization', 'Embassy or Secretary of State', 'Valid for the single trip stated'],
                  ].map(([doc, stamp, validity], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9f7f4]'}>
                      <td className="px-5 py-4 font-bold text-primary">{doc}</td>
                      <td className="px-5 py-4 text-primary/65">{stamp}</td>
                      <td className="px-5 py-4 text-primary/65 font-semibold">{validity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* What goes wrong */}
            <h3 className="font-heading font-black italic text-2xl text-primary tracking-tight uppercase mb-6">What Happens When Stamps Are Wrong</h3>
            <div className="space-y-3 mb-6">
              {[
                ['🔍', 'Missing Stamp', 'The document is considered unauthenticated. Airlines will refuse check-in, and border agents will quarantine or return the animal immediately.'],
                ['💧', 'Smudged or Illegible Stamp', 'Many countries treat an illegible stamp the same as no stamp. The accreditation number must be clearly readable. Ink quality matters.'],
                ['📅', 'Expired Endorsement', 'The USDA endorsement itself does not expire, but the underlying health certificate has a 10-day window. If the certificate expires, the stamps on it become void — you must start the vet visit over.'],
                ['🌐', 'Wrong Country\'s Apostille', 'An apostille from the wrong authority (e.g., the wrong state secretary) will be rejected. The apostille must come from the jurisdiction where the original signer is registered.'],
                ['📋', 'Photocopy Presented Instead of Original', 'Stamps must appear on original documents. Photocopies — even certified ones — are rejected at most international ports for live animal clearance.'],
              ].map(([icon, title, desc], i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[#f9f7f4] border border-primary/8">
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-wide text-sm mb-1">{title}</h4>
                    <p className="text-primary/60 text-sm font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <CalloutBox type="tip">
              Always carry <strong>at least two original sets</strong> of all stamped documents — one for the airline and one to be stamped/retained by destination customs. Losing the only original can strand your pet at the border. Keep digital scans as backup for reference only.
            </CalloutBox>
          </div>

          {/* ════════════════════════════════════════════
              SECTION 4 — TRANSPORT METHODS
          ════════════════════════════════════════════ */}
          <div id="transport" className="mt-20">
            <SectionLabel>How We Move Them</SectionLabel>
            <h2 className="font-heading font-black italic text-4xl md:text-5xl text-primary tracking-tighter uppercase leading-none mb-4">
              Methods of<br /><span className="text-secondary">Transport.</span>
            </h2>
            <p className="text-primary/60 font-medium leading-relaxed mb-10 max-w-3xl">
              Krest Delivery ships pets via two primary modes: commercial air freight and dedicated ground transport. The right choice depends on distance, species type, temperature window, and documentation status.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Air */}
              <div className="rounded-[2rem] overflow-hidden border border-primary/10 bg-[#0d1610] text-white">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop"
                    alt="Air freight"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1610]" />
                  <div className="absolute bottom-4 left-5">
                    <span className="text-3xl">✈️</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-black italic text-2xl uppercase tracking-tight mb-3">Air Transport</h3>
                  <p className="text-white/55 text-sm font-medium leading-relaxed mb-4">
                    The fastest option for long-distance or international shipments. Pets travel under an Air Waybill as manifest cargo (for large or unaccompanied pets) or in-cabin for small animals.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {['Fastest: cross-country in under 6 hours', 'Required for most international destinations', 'Temperature-controlled hold available', 'Full IATA LAR 2026 compliance required', 'IPATA agent recommended for cargo bookings'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/65 font-medium">
                        <span className="text-secondary mt-0.5">›</span> {item}
                      </li>
                    ))}
                  </ul>
                  <CalloutBox type="warning">
                    Air shipments are subject to weather-based embargoes. If the temperature at origin, layover, or destination is outside the 7°C–29°C window, the shipment may be grounded until conditions improve.
                  </CalloutBox>
                </div>
              </div>

              {/* Ground */}
              <div className="rounded-[2rem] overflow-hidden border border-primary/10 bg-[#0d1610] text-white">
                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2670&auto=format&fit=crop"
                    alt="Ground transport van"
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d1610]" />
                  <div className="absolute bottom-4 left-5">
                    <span className="text-3xl">🚐</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-black italic text-2xl uppercase tracking-tight mb-3">Ground Transport (Van)</h3>
                  <p className="text-white/55 text-sm font-medium leading-relaxed mb-4">
                    Our climate-controlled transport vans are ideal for domestic moves, breed-restricted animals, and species that don&apos;t tolerate flight stress well. Pets are monitored throughout the journey.
                  </p>
                  <ul className="space-y-2 text-sm">
                    {['No breed bans — all animals eligible', 'Climate-controlled cabin, not cargo hold', 'Regular rest stops and welfare checks', 'No temperature embargo risk', 'Door-to-door delivery available'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/65 font-medium">
                        <span className="text-secondary mt-0.5">›</span> {item}
                      </li>
                    ))}
                  </ul>
                  <CalloutBox type="warning">
                    Ground transport crosses multiple state lines. State-specific wildlife permits and invasive species laws apply to each state the vehicle travels through — not just the origin and destination.
                  </CalloutBox>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════
              SECTION 4 — INSURANCE
          ════════════════════════════════════════════ */}
          <div id="insurance" className="mt-20">
            <SectionLabel>Financial Protection</SectionLabel>
            <h2 className="font-heading font-black italic text-4xl md:text-5xl text-primary tracking-tighter uppercase leading-none mb-4">
              Insurance.<br /><span className="text-secondary">Non-Negotiable.</span>
            </h2>
            <p className="text-primary/60 font-medium leading-relaxed mb-10 max-w-3xl">
              Unlike parcels, live animals carry irreplaceable value. Transportation insurance for pets is strongly recommended and, for many international routes, is required by the carrier or the destination country.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl p-7 border border-primary/10 bg-[#f9f7f4]">
                <Badge color="green">Standard Pets</Badge>
                <h3 className="font-heading font-black italic text-xl uppercase tracking-tight mt-4 mb-3 text-primary">Coverage for Dogs &amp; Cats</h3>
                <ul className="space-y-3 text-sm text-primary/65 font-medium">
                  {[
                    ['In-transit mortality coverage', 'Covers loss of life caused directly by the transportation event.'],
                    ['Veterinary emergency coverage', 'Pays for emergency treatment required as a direct result of transit.'],
                    ['Delay &amp; rerouting costs', 'Covers additional boarding or care costs if a flight is cancelled or rerouted.'],
                    ['Loss/theft coverage', 'In the unlikely event of misrouting or theft of the crate.'],
                  ].map(([title, desc], i) => (
                    <li key={i}>
                      <span className="font-bold text-primary">{title}:</span> {desc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-7 border border-secondary/20 bg-secondary/5">
                <Badge color="purple">Exotic Pets</Badge>
                <h3 className="font-heading font-black italic text-xl uppercase tracking-tight mt-4 mb-3 text-primary">Enhanced Coverage for Exotics</h3>
                <p className="text-primary/60 text-sm font-medium mb-4">
                  Exotic animals often have a declared value far exceeding standard pet policies. A specialist exotic animal insurance policy is typically required and must cover:
                </p>
                <ul className="space-y-3 text-sm text-primary/65 font-medium">
                  {[
                    ['Full declared value coverage', 'Must match the invoice or appraisal value of the animal.'],
                    ['CITES permit cancellation', 'Covers costs if a permit is revoked or rejected mid-transit.'],
                    ['Quarantine costs', 'Pays for holding and care if the animal is quarantined at the destination port.'],
                    ['Confiscation coverage', 'In certain jurisdictions, covers legal costs if the animal is seized by customs.'],
                  ].map(([title, desc], i) => (
                    <li key={i}>
                      <span className="font-bold text-primary">{title}:</span> {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <CalloutBox type="tip">
              Insurance declarations must be completed at the time of booking — not after an incident. Undeclaring value to reduce premiums may result in zero payout. We recommend a specialist marine/cargo pet insurer or your existing veterinary insurer&apos;s travel rider.
            </CalloutBox>
          </div>

          {/* ════════════════════════════════════════════
              SECTION 5 — STORAGE FEES
          ════════════════════════════════════════════ */}
          <div id="storage" className="mt-20">
            <SectionLabel>Holding &amp; Delays</SectionLabel>
            <h2 className="font-heading font-black italic text-4xl md:text-5xl text-primary tracking-tighter uppercase leading-none mb-4">
              Storage &amp; <br /><span className="text-secondary">Holding Fees.</span>
            </h2>
            <p className="text-primary/60 font-medium leading-relaxed mb-8 max-w-3xl">
              When a pet cannot be released immediately upon arrival — due to the receiver not showing up, missing documentation, failed inspections, or document deficiencies — daily storage and care fees apply. These fees are the responsibility of the shipper or the receiver, as agreed at time of booking.
            </p>

            <div className="bg-[#0d1610] rounded-[2rem] p-8 text-white mb-6">
              <h3 className="font-heading font-black italic text-xl uppercase tracking-tight mb-6 text-secondary">Common Causes of Holding</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ['🚫', 'Receiver No-Show', 'The designated recipient fails to collect the animal within the free holding window (typically 2–4 hours after scheduled arrival).'],
                  ['📄', 'Document Deficiency', 'Health certificate expired, microchip number mismatch, missing USDA endorsement, or incomplete import permits.'],
                  ['🌡️', 'Failed Inspection', 'Animal fails a government vet check at the destination port. Common for incorrect acclimation statements or suspect health certificates.'],
                  ['🛂', 'Customs Hold', 'Customs or agriculture authorities place a hold on the shipment pending further review. Especially common for exotic species.'],
                  ['❄️', 'Weather Embargo', 'Temperature conditions prevent safe transport from the facility. The animal is held and cared for until the embargo is lifted.'],
                  ['✈️', 'Flight Cancellation', 'The manifest cargo flight is cancelled. The animal is held at the freight facility until re-booking is confirmed.'],
                ].map(([icon, title, desc], i) => (
                  <div key={i} className="flex gap-3 bg-white/5 rounded-xl p-4 border border-white/8">
                    <span className="text-xl shrink-0">{icon}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">{title}</h4>
                      <p className="text-white/50 text-xs font-medium leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-primary/10 mb-6">
              <table className="w-full text-sm">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Fee Type</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Standard Pets</th>
                    <th className="text-left px-5 py-4 font-bold uppercase tracking-widest text-xs">Exotic Pets</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/8">
                  {[
                    ['Free Holding Window', '2–4 hours after arrival', '2–4 hours after arrival'],
                    ['Daily Care &amp; Boarding', 'From $45–$95/day', 'From $95–$250+/day (species-dependent)'],
                    ['Veterinary Monitoring', 'Included up to 24 hrs', 'Included; exotic vet surcharge may apply'],
                    ['Government/Customs Hold', 'Not billed by Krest (gov. fees apply)', 'Not billed by Krest (gov. fees apply)'],
                    ['Late Release Processing', '$35 admin fee', '$35 admin fee'],
                    ['Re-export Preparation', 'At quoted rate', 'At quoted rate + new CITES costs'],
                  ].map(([type, std, exo], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9f7f4]'}>
                      <td className="px-5 py-4 font-bold text-primary" dangerouslySetInnerHTML={{ __html: type }} />
                      <td className="px-5 py-4 text-primary/65" dangerouslySetInnerHTML={{ __html: std }} />
                      <td className="px-5 py-4 text-primary/65" dangerouslySetInnerHTML={{ __html: exo }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CalloutBox type="danger">
              If a pet remains unclaimed for more than <strong>5 business days</strong> and no arrangement has been made, Krest Delivery reserves the right to transfer the animal to a licensed animal welfare facility. All accrued fees remain billable. Ensure your receiver is reachable and prepared to collect promptly.
            </CalloutBox>
          </div>

          {/* ── CTA ── */}
          <div className="mt-20 bg-[#0d1610] rounded-[2rem] p-10 text-center">
            <h2 className="font-heading font-black italic text-3xl md:text-4xl text-white uppercase tracking-tighter mb-4">
              Ready to Ship <span className="text-secondary">Your Pet?</span>
            </h2>
            <p className="text-white/50 font-medium mb-8 max-w-lg mx-auto">
              Our pet logistics team will walk you through the exact requirements for your species, route, and timeline. Book a consultation today.
            </p>
            <Link
              href="/ContactUs"
              className="inline-flex items-center gap-3 bg-secondary text-primary font-black italic uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg shadow-secondary/20"
            >
              Contact Our Pet Team →
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
