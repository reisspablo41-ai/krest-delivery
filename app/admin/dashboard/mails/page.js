'use client';

import { useState } from 'react';
import { FaDog, FaBox, FaRegEnvelope } from 'react-icons/fa';
import { MdSend, MdOutlineCategory } from 'react-icons/md';
import { FiEdit3, FiUser } from 'react-icons/fi';
import { toast } from 'sonner';

const TEMPLATES = {
  pets: [
    {
      id: 'pet-welcome',
      name: 'Welcome & Processing',
      subject: 'Pet Shipment Update: Your furry friend is in good hands!',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe are happy to inform you that your pet has been safely received at our processing center. Our specialist team is currently ensuring they are comfortable and prepared for the next leg of their journey.\n\nWe will continue to provide updates as they progress through our network.\n\nBest regards,\nKrest Delivery Pet Care Team`
    },
    {
      id: 'pet-comfort',
      name: 'Health & Comfort Update',
      subject: 'Comfort Update from Krest Delivery',
      content: `Tracking Number: [Input Tracking Number Here]\n\nHello [Input User Name Here],\n\nThis is a quick update to let you know that your pet is doing great! They have been fed, exercised, and are showing signs of high spirits. \n\nOur caretakers are monitoring them closely to ensure a stress-free travel experience.\n\nWarmly,\nKrest Delivery Care Team`
    },
    {
      id: 'pet-arrival',
      name: 'Arrival Notification',
      subject: 'Great News: Arrival Update for your Pet',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nExcellent news!\n\nYour pet has arrived at the destination city processing facility. We are currently finalizing the hand-over/delivery schedule.\n\nYou will be contacted shortly with precise timing for the reunion.\n\nThank you for choosing Krest Delivery.`
    },
    {
      id: 'pet-crate-requirements',
      name: 'Crate Rental & IATA Standards',
      subject: 'Important Update: Crate and Temperature Requirements',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe hope this message finds you well.\n\nFollowing a comprehensive review conducted by our Air Cargo Safety and Compliance Team, we would like to bring an important matter to your attention regarding the transportation arrangements for your puppy. After careful inspection, it has been determined that the crate currently assigned for your pet’s journey does not meet the updated International Air Transport Association (IATA) standards required for safe and compliant air travel within the United States.\n\nIn addition to the compliance concern, recent and ongoing temperature fluctuations across multiple U.S. regions have made it mandatory for all live animal shipments to be conducted using temperature-controlled travel crates. These specialized crates are designed to maintain a stable and safe internal environment throughout transit, ensuring your puppy’s comfort, safety, and overall well-being from departure to arrival.\n\n------------------------------------------------------------------\n\nRequired Action: Temperature-Controlled Travel Crate\n\nTo proceed with your puppy’s scheduled delivery without delay, we kindly ask that you select one of the following options:\n\nOption 1: Rent a Temperature-Controlled Travel Crate  \n- Fully compliant with U.S. air transport regulations and IATA standards  \n- Designed with built-in climate regulation to maintain optimal temperature conditions  \n- Includes proper ventilation, reinforced structure, and secure fittings  \n- Refund Policy: 95% of the rental fee ($600) is refundable upon safe return of the crate after delivery  \n\nOption 2: Purchase a Temperature-Controlled Travel Crate  \n- Meets all domestic and international air travel requirements  \n- Becomes your permanent property for any future pet travel needs  \n- Built for long-term durability and repeated use  \n- Purchase Price: $1,700  \n\n------------------------------------------------------------------\n\nWhy This Requirement Is Essential\n\nAir Transport Compliance  \nAll pets transported by air must meet strict regulatory guidelines. Under U.S. aviation policies and IATA Live Animals Regulations, only certified, properly constructed crates are permitted for cargo travel. Non-compliant crates are subject to immediate rejection at airline check-in, which may result in shipment delays or cancellation.\n\nTemperature Stability  \nMaintaining a controlled environment is critical during air transport. Temperature-regulated crates help prevent exposure to extreme heat or cold, significantly reducing the risk of stress, dehydration, or health complications during transit.\n\nAnimal Welfare and Safety  \nYour puppy’s safety is our highest priority. These crates are specifically engineered to provide adequate space, ventilation, and secure containment, ensuring a comfortable and stress-free journey.\n\n------------------------------------------------------------------\n\nUpdated Crate Standards (IATA LAR – 2026 Compliance)\n\nAs of January 1, 2026, the 52nd Edition of the IATA Live Animals Regulations introduced stricter enforcement of crate specifications. Please note the following key requirements:\n\nSize Requirements  \nThe crate must allow the pet to stand upright, turn around freely, and lie down comfortably. Proper sizing is determined by measuring the pet while standing and adding a minimum of 4 inches to establish the correct interior height.\n\nConstruction Standards  \nCrates must be escape-proof with a solid roof structure and adequate ventilation on at least three sides (or four sides for international shipments). Plastic clip closures are no longer accepted; all crates must be secured with metal nuts and bolts.\n\nSpecial Breed Considerations  \nFor brachycephalic (snub-nosed) breeds such as Bulldogs, Pugs, and Persian cats, additional ventilation and size requirements apply. Some airlines enforce permanent restrictions on transporting these breeds in cargo due to increased health risks.\n\nInterior Setup  \nEach crate must include two securely attached feeding bowls (for food and water), accessible externally for airline staff. Absorbent bedding is required to maintain hygiene and comfort. Materials such as hay, straw, or loose fabrics are strictly prohibited on most routes.\n\n------------------------------------------------------------------\n\nNext Steps\n\nTo avoid any delays in your puppy’s shipment, we kindly ask you to confirm your preferred option at your earliest convenience. Once your selection is made and payment is processed, we will immediately finalize the crate arrangement and proceed with dispatch.\n\nUpon confirmation, your shipment status will be updated, and you will receive access to live tracking details, allowing you to monitor your puppy’s journey in real time.\n\nIf you have any questions or require further clarification, please do not hesitate to contact our support team. We are here to ensure a smooth, safe, and timely delivery process for your pet.\n\nThank you for your prompt attention to this matter and for trusting us with the care and transportation of your puppy.\n\nWarm regards,  \nKrest  \nAnimal Transport & Care Team`
    },
    {
      id: 'pet-vaccination-quarantine',
      name: 'Vaccination & Quarantine',
      subject: 'Important Health Update regarding your Puppy',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe are sorry we have disturbing new regarding the vaccines that was administered to your puppy . Your puppy didn’t react well to vaccines conducting the final check up by our vet department . We noticed signs and symptoms of Rabies on your puppy  . From all indications your puppy will be quarantined for 30 days  right now your puppy needs to be quarantine for 30 days with full care and accommodation . If we are putting the puppy under quarantine , you need to pay a sun of $410 everyday for the feeding and accommodation for 30 days which will cost you a total of $12300 for the 30 days but its optional . You can pay $4500 for us to give your puppy a first treatment for 3 days  since you want the puppy to be delivered to you as soon as possible \n\nNote: Option 1 . You pay $410 everyday for 30 days of quarantine which will be a total of $12300\n      Option 2: you pay $4500 and we give your puppy fast treatment for 3 days \n\nHope it’s understood \n\n…….. \n\nMadam here is the information from the vet . \n\n    Vaccinating a puppy that has been with other puppies is essential for their health and well-being. Here are the advantages of vaccinating a puppy in such a scenario as this :\n\n1. Disease prevention: Vaccinations protect puppies from various infectious diseases that can be transmitted between dogs, especially in group settings. By vaccinating your puppy, you reduce the risk of them contracting and spreading diseases.\n\n2. Immunization: Vaccinations stimulate the puppy's immune system to produce antibodies that provide protection against specific diseases. This helps their body recognize and fight off potential infections more effectively.\n\n3. Herd immunity: By vaccinating all puppies in a group, you contribute to the concept of herd immunity. This means that if a few puppies are unable to receive vaccinations due to health reasons, the vaccinated ones create a protective barrier, reducing the overall risk of disease transmission within the group.\n\nHere is a list of commonly recommended vaccinations for your puppy :\n\n1. Distemper: Protects against canine distemper virus, which can cause respiratory, gastrointestinal, and neurological issues.\n\n2. Parvovirus: Guards against parvovirus infection, which leads to severe gastrointestinal distress and can be fatal, especially in young puppies.\n\n3. Adenovirus: Helps prevent canine adenovirus, which can cause respiratory and liver diseases.\n\n4. Parainfluenza: Provides protection against parainfluenza virus, a common cause of infectious respiratory disease in dogs.\n\n5. Rabies: Essential for preventing rabies, a viral disease that affects the nervous system and can be transmitted to humans.\n\n6. Bordetella: Protects against Bordetella bronchiseptica, a bacterium that causes kennel cough, a highly contagious respiratory infection.\n\nThese are the vaccines that your puppy needs before delivery . The vet also said to get all the vaccines it’s going to cost you $450 . Now the ball is in your court of you want the vet to proceed with administering the vaccines or not . At  this moment that’s all that Anna needs \n\nBest regards,\nKrest Animal Transport & Care Team`
    },
    {
      id: 'pet-microchip',
      name: 'Microchip Compliance Manifest',
      subject: 'URGENT: Mandatory Hardware Requirement for Canine Transit – Manifest ID: K-9772-CLR',
      content: `OFFICIAL COMPLIANCE MANIFEST: MANDATORY BIO-THERAPEUTIC MICROCHIP INTEGRATION & REGULATORY CLEARANCE NOTICE\nDate: March 23, 2026\n\nDocument Ref: KREST-ID-[Input Tracking Number Here]\nTracking Number: [Input Tracking Number Here]\nConsignee: [Input User Name Here]\n\nStatus: PENDING CLEARANCE\n\nDear [Input User Name Here],\n\nThis formal correspondence serves as a high-priority update from the Krest Animal Transport & Care Compliance Department. During the final pre-transit veterinary screening and manifest audit conducted at our departure hub, our logistics team identified a critical regulatory discrepancy. To ensure the safe, legal, and uninterrupted delivery of your puppy to your doorstep today, an ISO-compliant Microchip Implant (RFID) must be integrated into the animal's transit profile immediately.\n\nWithout the verifiable data provided by this specific hardware, your puppy cannot be legally cleared for final-mile delivery. Below, we provide an exhaustive explanation of the technical necessity, legal frameworks, and the financial refund protocols governing this requirement.\n\nI. Technical Overview: The ISO 11784/11785 RFID System\n\nThe microchip is not a simple tracker; it is a permanent, sophisticated identifying integrated circuit (IC) designed for life-long biocompatibility.\n\nHardware Architecture: The device consists of a custom-designed silicon chip and a copper antenna coil, hermetically sealed within a laser-fused, sterile, biocompatible soda-lime glass cylinder. It is approximately the size of a grain of rice.\n\nThe Procedure: The chip is implanted via a specialized, pre-loaded hypodermic needle into the subcutaneous tissue (just under the skin) between the shoulder blades. This is a non-surgical, routine procedure performed by our certified on-site transit veterinarians. It is as painless as a standard vaccination and requires zero downtime or anesthesia.\n\nGlobal Standardization: Our hardware adheres strictly to ISO 11784 (which defines the unique 15-digit code structure) and ISO 11785 (which ensures the technical transmission protocol is readable by any universal scanner used by customs, airlines, and local veterinary clinics).\n\nII. The Three Pillars of Necessity: Why This is Mandatory\n\nWe understand that this requirement comes at a late stage in the delivery process. However, the following three factors make this an absolute prerequisite for transit:\n\n1. Digital Delocalization & Immutable Recording\n\nIn the high-stakes environment of animal logistics, physical collars and paper tags can be lost, damaged, or altered. The microchip provides a permanent, unalterable digital link to your puppy’s medical and ownership records. This "Digital Passport" allows our handlers and government transit authorities to instantly verify the animal's origin and destination. It acts as a fail-safe recovery device that remains functional for the duration of the animal's life, ensuring your pet is never "lost in the system."\n\n2. Federal Legal Compliance & Border Enforcement\n\nCurrent transit laws regarding the movement of live animals across regional and national borders are absolute. Under the Animal Welfare and Transportation Act, any animal in transit without a verifiable ISO-compliant microchip is legally classified as "unidentified livestock." This status triggers an immediate "Stop Movement" order. By fulfilling this requirement now, you provide the Legal Identification necessary for your puppy to pass through all transport corridors, avoiding the risk of government impoundment or civil penalties.\n\n3. Biosecurity, Health Safety, and Pathogen Tracking\n\nThis is the most critical factor for public and household safety. The microchip is linked to a secure database containing the puppy’s full Biotic History. Should the puppy encounter a health screening at a transit hub, authorities can instantly verify its vaccination status (specifically for Rabies, Parvovirus, and Distemper). This tracking is essential to prevent the "cross-pollination" of localized bacteria, fungi, and zoonotic viruses between different geographical regions, protecting both your existing household and the local ecosystem.\n\nIII. Financial Breakdown & 100% Refund Guarantee\n\nThe total cost for the High-Frequency Microchip Hardware, Professional Veterinary Implantation, Global Registry Enrollment, and the provision of a Dedicated Handheld RFID Scanner (for your personal use) is:\n\nTOTAL COMPLIANCE COST: $1,000\n\nCRITICAL NOTICE ON FULL REFUNDABILITY\n\nTo accommodate the sudden nature of this regulatory requirement, Krest Animal Transport & Care operates under a Security Deposit Protocol. This ensures that the financial burden on the customer is temporary.\n\nThe $1,000 payment is 100% REFUNDABLE.\n\nBecause this is a transit-specific compliance fee, these funds act as a "Performance Bond." Once our delivery agent arrives at your home address today and completes the physical handover of your puppy, they will perform a live scan of the chip to verify its functionality. The full amount of $1,000 will be refunded to you on the spot via your choice of Zelle, Cash App, Bank Transfer, or Cash.\n\nIV. Next Steps for Immediate Dispatch\n\nTo avoid any delays and ensure your puppy arrives at your home address today as scheduled, please proceed with the refundable microchip payment immediately.\n\nWarning: Any delay in securing this clearance will result in the puppy being moved to a 48-hour mandatory quarantine holding facility. This facility is managed by third-party authorities and may incur additional daily boarding fees ($150/day) which are non-refundable.\n\nWe are committed to the safety, well-being, and legal security of your new family member. We thank you for your prompt cooperation and for choosing Krest for your transport needs.\n\nWarm regards,\n\nThe Veterinary & Compliance Team Krest Animal Transport & Care “Precision in Logistics, Compassion in Care.”`
    },
    {
      id: 'pet-feeding-fee',
      name: 'Feeding & Accommodation Fee',
      subject: 'Final Fee Required for Puppy Delivery',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe hope you are doing well.\n\nWe understand that you previously mentioned that you did not want any additional or unexpected charges. However, we kindly ask for your understanding in this situation. Due to the delay in the delivery process, your puppy has been in our care for the past 6 days, and during this time we have continued to provide proper feeding, monitoring, and safe accommodation in accordance with our company’s policies and animal care regulations.\n\nAfter reviewing the situation with our Health Care Department, we were informed that the costs related to the puppy’s feeding and accommodation during this period must be covered before we can proceed with the final delivery arrangements.\n\nBelow is the breakdown of the required fees:\n\n• Feeding Fee: $350\n• Accommodation Fee (6 days): $400\n\nTotal Fee: $750\n\nPlease understand that this charge is necessary because the puppy has remained under our care longer than originally scheduled. We want to assure you that your puppy has been well taken care of during this time.\n\nThis will be the final and last fee required so that we can proceed immediately with the delivery process. Once the payment is confirmed, we will finalize the necessary arrangements and schedule the delivery of your puppy without further delay.\n\nWe truly appreciate your patience and understanding.\n\nBest regards,\nKrest Animal Transport & Care Team`
    },
    {
      id: 'pet-usda-endorsement',
      name: 'USDA Endorsement & VEHCS',
      subject: 'Action Required: USDA Endorsement for Pet Export',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe hope this message finds you well.\n\nAs part of the international export process for your pet, we would like to inform you of a critical documentation requirement mandated by the United States Department of Agriculture (USDA).\n\n------------------------------------------------------------------\n\nUSDA Endorsement Requirement\n\nFor all pets departing the United States, the veterinary health certificate must undergo a two-step verification process:\n\n1. Electronic Submission via VEHCS  \n   Your licensed veterinarian must first submit the health certificate through the USDA’s Veterinary Export Health Certification System (VEHCS).\n\n2. Physical USDA Endorsement  \n   After submission, the certificate must be officially endorsed by a USDA office. This includes:  \n   • An ink signature from a USDA-accredited officer  \n   • An official embossed seal validating the document  \n\n------------------------------------------------------------------\n\nCompliance Cost & Refund Policy\n\nThe fee for the USDA Endorsement Coordination, including expedited processing and the official embossed seal, is $299.\n\nIMPORTANT: THIS $299 PAYMENT IS 100% REFUNDABLE UPON THE SAFE ARRIVAL OF YOUR PET AT YOUR DOORSTEP.\n\n------------------------------------------------------------------\n\nImportant Notice\n\nAirlines and border authorities will not accept digital or unendorsed certificates. The original, physically endorsed document must accompany your pet during travel.\n\nFailure to complete this step may result in shipment delays, denial of boarding, or refusal of entry at the destination country.\n\n------------------------------------------------------------------\n\nWhy This Matters\n\nThis process ensures that your pet meets all international health and safety standards required for export. It also guarantees that the documentation is authentic, verified, and recognized by destination authorities.\n\n------------------------------------------------------------------\n\nNext Steps\n\nPlease confirm once your veterinarian has initiated the VEHCS submission so we can coordinate the USDA endorsement process on your behalf.\n\nIf you require assistance or need us to recommend a certified veterinarian, we are here to help.\n\nThank you for your prompt attention to this important requirement.\n\nWarm regards,  \nAnimal Transport & Compliance Team`
    },
    {
      id: 'pet-interstate-form',
      name: 'Interstate Transit Form',
      subject: 'Action Required: Interstate Dog Transit Form Submission',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe hope this message finds you well.\n\nWe are writing to inform you of an important regulatory requirement concerning your dog’s upcoming interstate transit. Following updated guidelines issued in February 2026, all dogs being transported across state lines are now required to have a completed Interstate Dog Transit Form submitted prior to departure.\n\nThis requirement has been introduced as part of strengthened animal movement regulations and is strictly enforced at state borders, inspection checkpoints, and by licensed transport providers. Compliance is mandatory, and failure to meet this requirement may result in delays or temporary suspension of your pet’s journey.\n\n------------------------------------------------------------------\n\nWhat You Need to Do\n\nTo ensure a smooth and uninterrupted transit process, please complete the following steps:\n\n• Fill out the Interstate Dog Transit Form online before your pet’s scheduled departure date\n• Carefully verify that all details provided (including owner information, pet identification, vaccination records, and travel itinerary) are accurate and consistent with your shipment file\n• Submit the form through the official system and obtain your confirmation receipt upon completion\n\n------------------------------------------------------------------\n\nConfirmation & Documentation Requirement\n\nOnce the form has been successfully submitted, you will receive a digital confirmation receipt. This document serves as proof of compliance and must be presented to the transport team during check-in prior to departure.\n\nPlease note:\n• The receipt must be clear, valid, and accessible at the time of inspection\n• Any discrepancies or missing confirmations may result in delays\n• Transport teams are not authorized to proceed without verified documentation\n\n------------------------------------------------------------------\n\nWhy This Requirement Is Important\n\nThis measure has been implemented by state regulatory authorities to enhance biosecurity, prevent the spread of infectious diseases, and ensure that all animals transported across state lines meet standardized health and safety requirements.\n\nThe Interstate Dog Transit Form allows authorities to: \n• Verify up-to-date vaccination and health records\n• Track the origin and destination of the animal\n• Ensure compliance with interstate animal movement laws\n• Maintain accountability throughout the transport process\n\nThese protocols are essential in safeguarding both animal welfare and public health.\n\n------------------------------------------------------------------\n\nConsequences of Non-Compliance\n\nFailure to complete and present the required form may lead to:\n• Delayed departure or rescheduling of your pet’s transport\n• Temporary holding at transit checkpoints\n• Additional administrative processing requirements\n\nOur goal is to help you avoid these complications by ensuring full compliance ahead of time.\n\n------------------------------------------------------------------\n\nNext Steps\n\nWe kindly ask that you complete the Interstate Dog Transit Form at your earliest convenience and forward a copy of the confirmation receipt to our team once submitted.\n\nUpon receiving your confirmation, we will finalize your shipment documentation and proceed with scheduling without any delays.\n\nIf you require assistance completing the form or have any questions regarding the process, our support team is readily available to guide you step-by-step.\n\nThank you for your prompt attention to this matter and for your continued cooperation.\n\nWarm regards,\nAnimal Transport & Compliance Team`
    },
    {
      id: 'pet-stamps-exotic',
      name: 'Exotic Pet Compliance (CITES)',
      subject: 'Action Required: Mandatory Stamps & CITES Permits for Exotic Pet Travel',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nOfficial Compliance Notice: Exotic Pet Permits & Authentication\n\nDue to the specialized nature of exotic pet transport, your shipment requires additional layers of government authentication and CITES (Convention on International Trade in Endangered Species) permits. Legally binding stamps are the primary focus of border enforcement for exotic species.\n\n------------------------------------------------------------------\n\nRequired Verification for Exotic Shipments\n\n1. CITES Permit Stamps\nOriginal physical stamps from both the exporting and importing countries' CITES Management Authorities are mandatory. Digital copies are strictly rejected at the border.\n\n2. Foreign Government Legalization (Apostille)\nMany destinations require the USDA endorsement to be further legalized (Apostilled) by the destination country's embassy or consulate. This second-layer stamp authenticates the USDA officer's signature itself.\n\n3. USDA State Veterinarian Endorsement\nAs with all exports, a physical endorsement with an ink signature and an official embossed seal from the USDA APHIS State office is a prerequisite for exotic travel.\n\n------------------------------------------------------------------\n\nExotic Compliance Fee\n\nThe specialized handling, CITES coordination, and Embassy/Apostille processing fee is: $[ENTER FEE HERE]\n\nNote: This fee is 100% refundable upon the safe delivery of your pet.\n\n------------------------------------------------------------------\n\nNext Steps\n\nBecause exotic permits carry strict expiration windows, prompt payment of the compliance fee is required to ensure your permits remain valid for the transit window. Please indicate your receipt of this notice.\n\nWarm regards,\nAnimal Transport & Compliance Team`
    },
    {
      id: 'pet-delivery-details',
      name: 'Pet Delivery Details Confirmation',
      subject: 'Pet Shipment Confirmation - Delivery Details Required',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe are happy to inform you that your pet shipment has been successfully processed and is ready for the final delivery stage.\n\nTo ensure a smooth delivery, please confirm your contact and delivery details below:\n• Password: [Input Password Here]\n• Email: [Input Email Here]\n• Phone Number: [Input Phone Number Here]\n• Delivery Address: [Input Address Here]\n\nPet Details:\n• Pet Name: [Input Pet Name Here]\n• Pet Number: [Input Pet Number Here]\n• Weight: [Input Weight Here]\n\nThank you for choosing Krest Delivery.\n\nWarm regards,\nKrest Animal Transport & Care Team`
    }
  ],
  goods: [
    {
      id: 'goods-delivery-details',
      name: 'Goods Delivery Details Confirmation',
      subject: 'Shipment Confirmation - Delivery Details Required',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nWe are happy to inform you that your shipment has been successfully processed and is ready for the final delivery stage.\n\nTo ensure a smooth delivery, please confirm your contact and delivery details below:\n• Password: [Input Password Here]\n• Email: [Input Email Here]\n• Phone Number: [Input Phone Number Here]\n• Delivery Address: [Input Address Here]\n\nShipment Details:\n• Item Name: [Input Item Name Here]\n• Item Number: [Input Item Number Here]\n• Weight: [Input Weight Here]\n\nThank you for choosing Krest Delivery.\n\nBest regards,\nKrest Delivery Logistics`
    },
    {
      id: 'goods-insurance-coi',
      name: 'Insurance & Asset Indemnity (CoI)',
      subject: 'OFFICIAL TRANSIT MANIFEST & ASSET INDEMNITY NOTICE: MANDATORY CERTIFICATE OF INSURANCE (CoI) REQUIREMENT',
      content: `OFFICIAL TRANSIT MANIFEST & ASSET INDEMNITY NOTICE: MANDATORY CERTIFICATE OF INSURANCE (CoI) REQUIREMENT\nDate: March 23, 2026\n\nDocument Ref: KREST-INS-SEC-9928\nTracking Number: [Input Tracking Number Here]\nConsignee: [Input User Name Here]\n\nStatus: HOLD – PENDING COMPLIANCE CLEARANCE\n\nDear [Input User Name Here],\n\nThis formal notification is issued by the Krest Delivery Risk Management and Legal Compliance Division. We are writing to you regarding a critical update in the transit status of your pending shipment. During our final terminal logistics audit—a standard procedure for high-value, fragile, or specialized cargo—it was determined that your package requires the immediate activation of a comprehensive Certificate of Insurance (CoI) to proceed to the final delivery stage.\n\nCurrently, your shipment is being held in a Climate-Controlled Secure Zone. Per the International Carriage of Goods Act and our internal Asset Protection Protocol, we cannot legally release these goods for door-to-door transit until a verifiable indemnity bond is active. Below is a detailed, technical breakdown of why this document is required and how it protects your interests as a consumer.\n\nI. Understanding the Certificate of Insurance (CoI)\n\nThe Certificate of Insurance is not a standard "shipping fee." It is a specialized legal instrument that provides an Absolute Financial Guarantee for the full replacement value of your goods. While standard carrier liability (the basic insurance included in a regular shipping label) only covers a nominal amount per kilogram, the CoI provides Full Ad Valorem Protection.\n\nUnderwriting Specifications: This certificate is underwritten by our Tier-1 maritime and terrestrial insurance partners. It covers the "Final Mile" risk, which is statistically the most vulnerable segment of any delivery journey.\n\nComprehensive Coverage: The policy activated by this certificate includes protection against "All-Risks of Physical Loss or Damage," including accidental dropping, vehicular collision, fire, theft, and "Mechanical Derangement" (internal electronic failure without external box damage).\n\nAsset Categorization: For high-end hardware, sim rigs, or sensitive electronics, this certificate ensures that every micro-component is insured against static discharge or vibrational damage during transit.\n\nII. The Legal and Logistics Necessity: Why This is Mandatory\n\nWe recognize that you are anticipating the arrival of your package today. However, we must adhere to these three regulatory pillars to ensure a successful handover:\n\n1. High-Value Liability & Risk Mitigation\n\nIn the high-stakes environment of modern logistics, transporting premium goods without a dedicated bond is considered a "High-Risk Operation." If a delivery vehicle were involved in an unforeseen incident, standard shipping terms would leave the customer with a massive financial loss. By securing this CoI, you are shifting 100% of the financial risk away from yourself and onto the insurers. Our logistics team is strictly prohibited from loading unbonded, high-value cargo onto our final delivery fleet to prevent corporate and client liability.\n\n2. Regulatory Transit Clearance & "Safe-Pass" Protocols\n\nCertain regional transit zones and metropolitan checkpoints now require a "Proof of Coverage" for packages that exceed specific valuation thresholds. Without a digital CoI attached to the manifest, your package is flagged as "Unsecured Cargo." This status can lead to mandatory impoundment by transit authorities or local law enforcement for inspection, which can delay delivery by weeks. Fulfilling this requirement now grants your package "Priority Green-Channel" status for immediate dispatch.\n\n3. Real-Time Inspection & Immediate Claims Activation\n\nThe CoI changes the nature of the delivery. Upon arrival at your home address, our agent will perform a Joint Physical Inspection with you. If even a minor scratch or functional defect is found, the active CoI allows for an Instantaneous Claim Resolution. Rather than waiting months for a standard investigation, the insurance bond allows us to issue a full refund or a replacement unit within 24 to 48 hours.\n\nIII. Financial Breakdown & The 100% Refund Protocol\n\nTo activate the Certificate of Insurance and trigger the immediate release of your package from our secure holding facility, the following refundable premium is required:\n\nTOTAL INSURANCE PREMIUM DEPOSIT: $1,000\n\nTHE KREST 100% REFUND GUARANTEE\n\nTo ensure our clients are protected without incurring permanent additional costs, Krest Delivery utilizes a "Bonded Refund System."\n\nThe $1,000 payment is 100% REFUNDABLE upon successful delivery.\n\nThis amount acts as a temporary "Security Bond" while the goods are in the highest-risk phase of transit. The moment our delivery agent completes the handover at your doorstep and you sign the Verification of Goods (VoG) form, the insurance risk period officially closes. The full $1,000 will be credited back to you instantly via your original payment method, Zelle, Cash App, or direct bank transfer before the agent leaves your premises.\n\nIV. Urgent Next Steps for Final Dispatch\n\nTo avoid a breach of the delivery window and ensure your goods reach you today, please facilitate the refundable insurance premium immediately.\n\nImportant Warning: If this clearance is not secured within the next 3 hours, your package will be transferred to our Long-Term High-Security Warehouse. This facility is managed by an external security firm, and once a package enters "Long-Term Hold," a non-refundable Daily Storage Surcharge of $150 will be applied to the manifest.\n\nWe appreciate your cooperation in maintaining the highest standards of logistics safety and asset protection. We look forward to completing your delivery successfully.\n\nWarm regards,\n\nThe Risk Management & Compliance Division Krest Delivery Services “Securing Your Innovation. Delivering Your Future.”`
    },
    {
      id: 'goods-processed',
      name: 'Shipment Processed',
      subject: 'Shipment Confirmation - Krest Delivery',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nYour shipment has been successfully processed and is now assigned to our next available transit window. You can track the progress in real-time using your tracking dashboard.\n\nOur team is committed to the safe and timely delivery of your items.\n\nRegards,\nKrest Delivery Logistics`
    },
    {
      id: 'goods-customs',
      name: 'Customs Clearance',
      subject: 'Important: Customs Status Update',
      content: `Tracking Number: [Input Tracking Number Here]\n\nHello [Input User Name Here],\n\nYour shipment is currently undergoing standard customs clearance procedures at the international border. This is a routine part of our logistics flow.\n\nWe will notify you immediately once the clearance is complete and the shipment resumes its journey.\n\nBest,\nKrest Delivery Global Operations`
    },
    {
      id: 'goods-final-mile',
      name: 'Final Mile Delivery',
      subject: 'Out for Delivery: Your Krest Shipment',
      content: `Tracking Number: [Input Tracking Number Here]\n\nDear [Input User Name Here],\n\nGood news!\n\nYour shipment is now in the final stage of its journey and is officially out for delivery. Our local courier will be at your destination shortly.\n\nPlease ensure someone is available to receive the package.\n\nThank you,\nKrest Delivery Group`
    }
  ]
};

export default function MailsPage() {
  const [category, setCategory] = useState('pets');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES.pets[0]);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState(TEMPLATES.pets[0].subject);
  const [content, setContent] = useState(TEMPLATES.pets[0].content);
  const [isSending, setIsSending] = useState(false);

  const handleTemplateSelect = (tmpl) => {
    setSelectedTemplate(tmpl);
    setSubject(tmpl.subject);
    setContent(tmpl.content);
  };

  const handleSend = async () => {
    if (!recipient) {
      toast.error('Please enter a recipient email');
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch('/api/admin/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipient,
          subject: subject,
          content: content,
          category: category
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Email sent successfully!');
        setRecipient('');
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black italic text-primary uppercase tracking-tight flex items-center gap-3">
            <FaRegEnvelope className="text-secondary" />
            Mail Templates
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage and dispatch customer notifications</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => { setCategory('pets'); handleTemplateSelect(TEMPLATES.pets[0]); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              category === 'pets' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'
            }`}
          >
            <FaDog className={category === 'pets' ? 'text-secondary' : ''} />
            Pet Shipments
          </button>
          <button
            onClick={() => { setCategory('goods'); handleTemplateSelect(TEMPLATES.goods[0]); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              category === 'goods' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'
            }`}
          >
            <FaBox className={category === 'goods' ? 'text-secondary' : ''} />
            Goods Shipments
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar: Template List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <MdOutlineCategory className="text-lg" />
              Available Templates
            </h2>
            <div className="space-y-3">
              {TEMPLATES[category].map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => handleTemplateSelect(tmpl)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${
                    selectedTemplate.id === tmpl.id
                      ? 'bg-primary border-primary text-white shadow-lg'
                      : 'bg-white border-slate-100 text-slate-600 hover:border-secondary/30 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-sm font-black italic uppercase tracking-wider mb-1 group-hover:translate-x-1 transition-transform">
                    {tmpl.name}
                  </p>
                  <p className={`text-[10px] font-medium line-clamp-1 ${selectedTemplate.id === tmpl.id ? 'text-slate-300' : 'text-slate-400'}`}>
                    {tmpl.subject}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main: Editor & Sender */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                  <FiUser className="text-secondary" />
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                  <FiEdit3 className="text-secondary" />
                  Email Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold text-primary focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 px-1">
                <FiEdit3 className="text-secondary" />
                Message Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full px-6 py-6 rounded-3xl bg-slate-50 border border-slate-100 text-sm font-semibold text-slate-600 leading-relaxed focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase leading-tight max-w-[200px]">
                Templates are automatically wrapped in official company branding before dispatch.
              </p>
              <button
                onClick={handleSend}
                disabled={isSending}
                className={`flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-sm font-black italic uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl ${
                  isSending 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-secondary hover:bg-secondary/90 text-primary'
                }`}
              >
                {isSending ? 'Dispatching...' : 'Send Mail'}
                {!isSending && <MdSend className="text-lg" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
