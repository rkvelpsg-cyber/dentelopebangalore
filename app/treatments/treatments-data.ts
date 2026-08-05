import {
  LucideIcon,
  Stethoscope,
  Sparkles,
  Layers,
  Zap,
  Heart,
  Award,
  Baby,
  Shield,
} from "lucide-react";

export interface TreatmentStep {
  step: number;
  title: string;
  desc: string;
}

export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface TreatmentData {
  slug: string;
  label: string;
  tagline: string;
  heroDesc: string;
  price: string;
  duration: string;
  sessions: string;
  painLevel: string;
  overview: string;
  benefits: string[];
  steps: TreatmentStep[];
  faqs: TreatmentFAQ[];
  popular: boolean;
}

export const TREATMENT_DATA: TreatmentData[] = [
  {
    slug: "teeth-cleaning",
    label: "Teeth Cleaning",
    tagline: "Fresh Start for Your Smile",
    heroDesc:
      "Professional scaling and polishing to remove plaque, tartar and stains — the foundation of lifelong oral health.",
    price: "₹500",
    duration: "45–60 min",
    sessions: "1",
    painLevel: "None",
    overview:
      "Teeth cleaning (prophylaxis) is the removal of plaque and calculus (tartar) that regular brushing cannot reach. Our MDS periodontists use ultrasonic scalers and air-polishing to leave your teeth spotlessly clean, reducing the risk of cavities, gum disease and bad breath.",
    benefits: [
      "Prevents cavities and early-stage gum disease",
      "Removes surface stains for a brighter appearance",
      "Eliminates bad breath caused by bacterial build-up",
      "Early detection of hidden dental issues",
      "Painless, quick and requires no anaesthesia",
      "Recommended every 6 months for optimal health",
    ],
    steps: [
      {
        step: 1,
        title: "Oral Examination",
        desc: "A specialist examines gums, teeth and existing restorations using an intraoral camera.",
      },
      {
        step: 2,
        title: "Ultrasonic Scaling",
        desc: "High-frequency vibrations break up hard tartar above and below the gum line without harming enamel.",
      },
      {
        step: 3,
        title: "Hand Scaling",
        desc: "Fine hand instruments remove remaining deposits in tight spaces and interproximal areas.",
      },
      {
        step: 4,
        title: "Polishing",
        desc: "Rotating rubber cup with prophylaxis paste removes surface stains and leaves teeth smooth.",
      },
      {
        step: 5,
        title: "Fluoride Treatment",
        desc: "Optional fluoride gel or varnish is applied to strengthen enamel and prevent sensitivity.",
      },
    ],
    faqs: [
      {
        q: "Is teeth cleaning painful?",
        a: "No. Most patients feel mild vibration and coolness from the water spray. Sensitive gums may cause minor discomfort, managed easily with topical anaesthetic.",
      },
      {
        q: "How often should I get a teeth cleaning?",
        a: "Every 6 months for healthy adults. Patients with a history of gum disease may need every 3–4 months.",
      },
      {
        q: "Will cleaning make my teeth whiter?",
        a: "Cleaning removes surface stains and restores natural colour. For a deeper whitening effect, ask about our laser teeth whitening treatment.",
      },
      {
        q: "Can cleaning damage enamel?",
        a: "No. Ultrasonic scaling is safe for enamel. The instruments vibrate tartar off rather than scraping the tooth surface.",
      },
    ],
    popular: false,
  },
  {
    slug: "teeth-whitening",
    label: "Teeth Whitening",
    tagline: "Brighter Smile, One Visit",
    heroDesc:
      "Professional laser whitening up to 8 shades lighter — safe, fast and long-lasting results with zero enamel damage.",
    price: "₹3,500",
    duration: "60–90 min",
    sessions: "1",
    painLevel: "Minimal",
    overview:
      "Our in-clinic laser whitening uses a pharmaceutical-grade hydrogen peroxide gel activated by a specialised LED/laser light. The light accelerates bleaching of intrinsic and extrinsic stains on enamel and dentine, delivering a noticeably brighter smile in a single appointment — far more effective than any over-the-counter product.",
    benefits: [
      "Up to 8 shades lighter in one session",
      "Safe for enamel — no structural damage",
      "Results last 12–24 months with proper care",
      "Supervised by MDS cosmetic dentists",
      "Immediate, visible difference post-procedure",
      "Custom shade mapping before and after",
    ],
    steps: [
      {
        step: 1,
        title: "Shade Assessment",
        desc: "Baseline tooth shade is recorded with a Vita shade guide and intraoral photography for comparison.",
      },
      {
        step: 2,
        title: "Gum Protection",
        desc: "A light-cured resin barrier is applied to gums and a lip retractor is placed to isolate teeth.",
      },
      {
        step: 3,
        title: "Gel Application",
        desc: "35% hydrogen peroxide whitening gel is precisely applied to the labial surfaces of teeth.",
      },
      {
        step: 4,
        title: "Laser Activation",
        desc: "An LED / diode laser activates the gel for 15-minute intervals, usually 2–3 cycles per session.",
      },
      {
        step: 5,
        title: "Final Shade Check",
        desc: "Gel is removed, teeth are rinsed and the new shade is recorded. Post-care instructions provided.",
      },
    ],
    faqs: [
      {
        q: "Will whitening cause sensitivity?",
        a: "Some patients experience mild, temporary sensitivity for 24–48 hours. We apply a desensitising agent post-procedure to minimise this.",
      },
      {
        q: "How long do results last?",
        a: "Typically 12–24 months. Avoiding tea, coffee and tobacco, plus occasional touch-up trays, significantly extends results.",
      },
      {
        q: "Is it safe for crowns and veneers?",
        a: "Whitening only affects natural tooth enamel. Existing crowns, veneers and fillings will not change colour. We advise discussing shade matching before any restorative work.",
      },
      {
        q: "Can everyone get whitening?",
        a: "We do not recommend whitening for pregnant women, children under 16, or patients with severe tooth decay or gum disease. A pre-treatment consultation assesses suitability.",
      },
    ],
    popular: true,
  },
  {
    slug: "dental-implants",
    label: "Dental Implants",
    tagline: "Permanent Teeth That Feel Natural",
    heroDesc:
      "Titanium implants that function, feel and look like real teeth — the gold standard for replacing missing teeth.",
    price: "₹18,000",
    duration: "1–2 hrs (placement)",
    sessions: "3–4 visits",
    painLevel: "Low (anaesthesia)",
    overview:
      "A dental implant is a small titanium post surgically placed into the jawbone as an artificial tooth root. Once it integrates with the bone (osseointegration), a custom porcelain crown is fixed on top. Implants preserve jaw bone, prevent adjacent teeth from shifting and offer a permanent, hygienic alternative to dentures or bridges.",
    benefits: [
      "99% success rate with our MDS implantologists",
      "Preserves jawbone and facial structure",
      "No dietary restrictions — eat anything",
      "Easy to clean like natural teeth",
      "Adjacent teeth are not ground down",
      "Lifetime solution with proper care",
    ],
    steps: [
      {
        step: 1,
        title: "3D CBCT Scan & Planning",
        desc: "A cone beam CT scan maps bone density, nerve positions and sinus proximity for precise implant placement.",
      },
      {
        step: 2,
        title: "Implant Placement",
        desc: "Under local anaesthesia, the titanium post is placed in the jaw through a minimally invasive surgery.",
      },
      {
        step: 3,
        title: "Osseointegration",
        desc: "Over 8–12 weeks, the implant fuses with jawbone. A temporary crown may be fitted during this period.",
      },
      {
        step: 4,
        title: "Abutment Fitting",
        desc: "A connector piece (abutment) is attached to the implant once integration is confirmed.",
      },
      {
        step: 5,
        title: "Crown Delivery",
        desc: "A custom-shade-matched zirconia or porcelain crown is permanently fixed — indistinguishable from natural teeth.",
      },
    ],
    faqs: [
      {
        q: "Is implant surgery painful?",
        a: "The procedure is performed under local anaesthesia and is no more uncomfortable than a tooth extraction. Post-operative soreness is managed with standard pain relief.",
      },
      {
        q: "Am I a candidate for implants?",
        a: "Most adults with adequate bone density are candidates. Conditions like uncontrolled diabetes or active gum disease may require treatment first. A CBCT scan confirms suitability.",
      },
      {
        q: "How long do implants last?",
        a: "With good oral hygiene and regular checkups, implants can last a lifetime. The crown may need replacement after 15–20 years.",
      },
      {
        q: "What is the cost of the full implant?",
        a: "Our all-inclusive implant package (titanium post + abutment + zirconia crown) starts at ₹18,000. EMI from ₹900/month available.",
      },
    ],
    popular: true,
  },
  {
    slug: "braces-aligners",
    label: "Braces / Aligners",
    tagline: "Straight Teeth, Confident Smile",
    heroDesc:
      "Metal, ceramic and clear aligner options — tailored orthodontic treatment by MDS specialists for all ages.",
    price: "₹22,000",
    duration: "18–24 months avg.",
    sessions: "Monthly check-ins",
    painLevel: "Mild (adjustment days)",
    overview:
      "Orthodontic treatment corrects misaligned teeth and bite issues (malocclusion) for both aesthetic and functional reasons. We offer traditional metal braces, tooth-coloured ceramic braces and transparent clear aligners. All treatment is planned and supervised by our MDS Orthodontists using digital scanning and 3D treatment simulation.",
    benefits: [
      "Corrects crowding, gaps, overbite & underbite",
      "3D digital simulation shows end result before start",
      "Clear aligner option is virtually invisible",
      "Improves chewing, speech and oral hygiene",
      "Available for children, teens and adults",
      "Monthly monitoring by MDS orthodontist",
    ],
    steps: [
      {
        step: 1,
        title: "Digital Scan & X-Ray",
        desc: "An iTero intraoral scan replaces messy impressions. Panoramic and cephalometric X-rays are taken.",
      },
      {
        step: 2,
        title: "Treatment Simulation",
        desc: "ClinCheck or Invisalign software generates a 3D simulation of tooth movement from start to finish.",
      },
      {
        step: 3,
        title: "Brace / Aligner Fitting",
        desc: "Brackets are bonded to teeth or the first set of clear aligners is fitted. Custom wire/aligner fabricated to your scan.",
      },
      {
        step: 4,
        title: "Monthly Adjustments",
        desc: "Wires are changed / new aligner sets delivered at each visit to progress tooth movement on schedule.",
      },
      {
        step: 5,
        title: "Retainer & Completion",
        desc: "Braces are removed. Fixed or removable retainers are provided to maintain the final alignment.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between metal and ceramic braces?",
        a: "Metal braces are the most durable and cost-effective. Ceramic braces use tooth-coloured brackets that are less visible. Clear aligners are nearly invisible and removable.",
      },
      {
        q: "At what age can my child start braces?",
        a: "Most orthodontic treatment begins between 11–14 years when permanent teeth have erupted. Early assessments from age 7–8 can identify issues before they worsen.",
      },
      {
        q: "Can adults get braces?",
        a: "Absolutely. Adults make up a significant portion of our orthodontic patients. Clear aligners are particularly popular among working adults.",
      },
      {
        q: "Does wearing braces hurt?",
        a: "New braces or freshly adjusted wires cause mild soreness for 2–3 days. Over-the-counter pain relief is usually sufficient.",
      },
    ],
    popular: true,
  },
  {
    slug: "root-canal",
    label: "Root Canal (RCT)",
    tagline: "Save Your Tooth, Eliminate Pain",
    heroDesc:
      "Painless rotary RCT by endodontists — preserve your natural tooth and get back to normal life the same day.",
    price: "₹4,500",
    duration: "60–90 min",
    sessions: "1–2",
    painLevel: "None (anaesthesia)",
    overview:
      "A root canal treatment (RCT) removes infected or inflamed pulp tissue from inside the tooth, disinfects the root canals and seals them with biocompatible material. Modern rotary instruments and apex locators make the procedure fast, precise and completely painless under local anaesthesia — you can typically return to work the same day.",
    benefits: [
      "Eliminates tooth pain and infection permanently",
      "Saves the natural tooth — no extraction needed",
      "Single-visit procedure in most cases",
      "Painless with computer-controlled anaesthesia",
      "Prevents spread of infection to adjacent teeth",
      "Followed by a crown to restore full function",
    ],
    steps: [
      {
        step: 1,
        title: "Diagnosis & X-Ray",
        desc: "Digital X-ray and pulp vitality tests confirm the extent of infection and root canal anatomy.",
      },
      {
        step: 2,
        title: "Anaesthesia",
        desc: "Computer-controlled local anaesthesia ensures the tooth and surrounding area are completely numb.",
      },
      {
        step: 3,
        title: "Access & Cleaning",
        desc: "A small opening is made in the crown. Rotary NiTi files remove infected pulp and clean root canals.",
      },
      {
        step: 4,
        title: "Irrigation & Disinfection",
        desc: "Canals are irrigated with sodium hypochlorite and EDTA to eliminate all bacteria and debris.",
      },
      {
        step: 5,
        title: "Obturation & Sealing",
        desc: "Cleaned canals are filled with gutta-percha and sealed. A temporary or permanent filling is placed.",
      },
      {
        step: 6,
        title: "Crown Placement",
        desc: "A zirconia crown is recommended within 2–4 weeks to protect the restored tooth from fracture.",
      },
    ],
    faqs: [
      {
        q: "Is root canal treatment painful?",
        a: "No. With modern anaesthesia and rotary instrumentation, RCT is no more uncomfortable than a routine filling. Most patients are surprised by how easy it is.",
      },
      {
        q: "How many visits does RCT take?",
        a: "Most cases are completed in one visit. Severely infected or complex multi-canal cases may require a second appointment.",
      },
      {
        q: "Is it better to extract the tooth instead?",
        a: "Saving the natural tooth is almost always preferable. Extractions lead to bone loss and require implants or bridges to restore function. RCT preserves your natural tooth long-term.",
      },
      {
        q: "What happens after the procedure?",
        a: "Mild soreness for 24–48 hours is normal. Avoid chewing on the treated side until the crown is placed. Antibiotics may be prescribed if there is active infection.",
      },
    ],
    popular: true,
  },
  {
    slug: "smile-makeover",
    label: "Smile Makeover",
    tagline: "Design the Smile You Deserve",
    heroDesc:
      "A customised combination of veneers, crowns, whitening and contouring — crafted to your facial features.",
    price: "₹8,000+",
    duration: "2–4 weeks",
    sessions: "3–5",
    painLevel: "Minimal",
    overview:
      "A smile makeover is a tailored combination of cosmetic and restorative procedures designed to transform your smile. Using digital smile design software, our cosmetic dentists preview the result before any treatment begins. Procedures may include porcelain veneers, composite bonding, whitening, crown lengthening, gum contouring and crowns.",
    benefits: [
      "Fully customised to your facial aesthetics",
      "Digital Smile Design preview before you commit",
      "Combines multiple procedures for comprehensive results",
      "Porcelain veneers mimic natural enamel perfectly",
      "Boosts confidence and quality of life",
      "Long-lasting results of 10–15 years",
    ],
    steps: [
      {
        step: 1,
        title: "Smile Analysis",
        desc: "Full-face and smile photographs, intraoral scan and bite analysis. Your desires and concerns are discussed.",
      },
      {
        step: 2,
        title: "Digital Smile Design",
        desc: "Software renders your new smile on a photo of your face so you can approve the look before treatment.",
      },
      {
        step: 3,
        title: "Trial Smile (Mock-up)",
        desc: "Composite is temporarily placed on teeth to give you a physical preview. Adjustments made to your feedback.",
      },
      {
        step: 4,
        title: "Preparation & Temporaries",
        desc: "Teeth are prepared minimally. Laboratory-fabricated temporaries are placed so you can evaluate comfort and aesthetics.",
      },
      {
        step: 5,
        title: "Final Restorations",
        desc: "Custom porcelain veneers or crowns are bonded. Final adjustments to bite and aesthetics are made.",
      },
    ],
    faqs: [
      {
        q: "What is included in a smile makeover?",
        a: "It varies by patient. Common combinations include teeth whitening + veneers, composite bonding + contouring, or full crown rehab. We create a bespoke plan after consultation.",
      },
      {
        q: "Are veneers permanent?",
        a: "Veneers last 10–15 years with proper care. The preparation is irreversible, so porcelain or zirconia veneers will need replacing at some point.",
      },
      {
        q: "How much does a smile makeover cost?",
        a: "Costs depend on the number and type of procedures. A full veneer case starts at ₹8,000 per tooth. A detailed quote is provided after the digital smile design appointment.",
      },
      {
        q: "Will it look natural?",
        a: "Yes. We use high-translucency porcelain matched precisely to your skin tone and adjacent teeth. The result is indistinguishable from natural enamel.",
      },
    ],
    popular: false,
  },
  {
    slug: "kids-dentistry",
    label: "Kids Dentistry",
    tagline: "Happy Teeth, Happy Kids",
    heroDesc:
      "Child-friendly specialists, a fun clinic environment and gentle techniques to give your child a fearless dental experience.",
    price: "₹400",
    duration: "30–45 min",
    sessions: "As needed",
    painLevel: "None",
    overview:
      "Our paediatric dentistry team specialises in children from 1 to 16 years. The clinic environment is designed to be fun and non-threatening — with music, stickers and patient-friendly explanations. We focus on preventive care, habit counselling and building a positive dental attitude that lasts a lifetime.",
    benefits: [
      "Dedicated paediatric MDS specialists",
      "Child-friendly decor and behaviour management",
      "Preventive treatments: sealants, fluoride, cleanings",
      "Early orthodontic assessment from age 7",
      "Habit counselling (thumb sucking, bottle feeding)",
      "Trauma and sports dental injury management",
    ],
    steps: [
      {
        step: 1,
        title: "Welcome & Familiarisation",
        desc: "Child is introduced to the clinic, chair and instruments in a fun, show-tell-do approach with no rush.",
      },
      {
        step: 2,
        title: "Dental Examination",
        desc: "Comprehensive check of all primary and permanent teeth, gums, bite and jaw development.",
      },
      {
        step: 3,
        title: "Cleaning & Polishing",
        desc: "Child-flavoured toothpaste and a gentle rotating brush make cleaning a fun experience.",
      },
      {
        step: 4,
        title: "Fluoride Treatment",
        desc: "Fluoride varnish is applied to strengthen enamel and prevent decay — especially for cavity-prone teeth.",
      },
      {
        step: 5,
        title: "Fissure Sealants (if needed)",
        desc: "Tooth-coloured sealants are painted into deep grooves of back teeth to prevent cavities before they start.",
      },
    ],
    faqs: [
      {
        q: "At what age should my child first visit the dentist?",
        a: "By their first birthday, or when the first tooth erupts — whichever comes first. Early visits establish a positive relationship with dental care.",
      },
      {
        q: "My child is terrified of dentists. Can you help?",
        a: "Absolutely. Our team is trained in behaviour management techniques including tell-show-do, positive reinforcement and nitrous oxide (happy gas) for anxious children.",
      },
      {
        q: "What are fissure sealants?",
        a: "Thin plastic coatings applied to the chewing surfaces of back teeth. They fill in grooves where food and bacteria get trapped, reducing cavity risk by up to 80%.",
      },
      {
        q: "How often should my child visit?",
        a: "Every 6 months for checkups and cleaning. Children with higher cavity risk may need more frequent fluoride treatments.",
      },
    ],
    popular: false,
  },
  {
    slug: "gum-treatment",
    label: "Gum Treatment",
    tagline: "Healthy Gums, Healthy You",
    heroDesc:
      "Advanced periodontal therapy to reverse gum disease, reduce inflammation and protect your teeth for life.",
    price: "₹1,200",
    duration: "45–90 min",
    sessions: "2–4",
    painLevel: "Mild",
    overview:
      "Gum disease (gingivitis and periodontitis) is the leading cause of tooth loss in adults. Our periodontists provide thorough scaling and root planing (deep cleaning), antibiotic therapy and surgical options where necessary. Early intervention can fully reverse gingivitis and halt the progression of periodontitis.",
    benefits: [
      "Stops bleeding gums and bad breath",
      "Prevents tooth loss from advanced gum disease",
      "Non-surgical deep cleaning in most cases",
      "Reduces systemic risk linked to gum disease",
      "Immediate improvement in gum comfort",
      "Long-term maintenance protocol included",
    ],
    steps: [
      {
        step: 1,
        title: "Periodontal Charting",
        desc: "Probing depths, bleeding scores and X-rays measure the severity of gum disease around every tooth.",
      },
      {
        step: 2,
        title: "Supragingival Scaling",
        desc: "Tartar and plaque above the gum line are removed with ultrasonic scalers.",
      },
      {
        step: 3,
        title: "Subgingival Scaling (SRP)",
        desc: "Root planing smooths root surfaces below the gum line, removing calculus and diseased cementum.",
      },
      {
        step: 4,
        title: "Antibiotic Therapy",
        desc: "Local antibiotics (Arestin / PerioChip) may be placed in deep pockets for additional bacterial control.",
      },
      {
        step: 5,
        title: "Re-evaluation",
        desc: "6–8 weeks post-treatment, probing depths are re-measured to assess healing and plan further care if needed.",
      },
    ],
    faqs: [
      {
        q: "What are the signs of gum disease?",
        a: "Bleeding when brushing, red or swollen gums, persistent bad breath, gum recession, loose teeth and pain when chewing.",
      },
      {
        q: "Can gum disease be reversed?",
        a: "Gingivitis (early stage) is completely reversible with professional cleaning and improved home care. Periodontitis (advanced stage) can be controlled but not fully reversed.",
      },
      {
        q: "Does deep cleaning hurt?",
        a: "Local anaesthesia is used for scaling and root planing. Post-procedure soreness for 1–2 days is normal and managed with standard pain relief.",
      },
      {
        q: "Is gum disease linked to heart disease?",
        a: "Yes. Research links periodontitis to increased risk of heart disease, diabetes complications and stroke. Treating gum disease has systemic health benefits.",
      },
    ],
    popular: false,
  },
  {
    slug: "tooth-extraction",
    label: "Tooth Extraction",
    tagline: "Painless, Safe, Same-Day",
    heroDesc:
      "Simple and surgical extractions including wisdom teeth — performed under effective anaesthesia by oral surgeons.",
    price: "₹600",
    duration: "20–60 min",
    sessions: "1",
    painLevel: "None (anaesthesia)",
    overview:
      "Tooth extraction is performed when a tooth cannot be saved by other means — due to severe decay, infection, crowding or impaction. Our oral and maxillofacial surgeons handle everything from simple extractions to complex surgical removal of impacted wisdom teeth, using atraumatic techniques that minimise post-operative swelling and pain.",
    benefits: [
      "Immediate relief from severe tooth pain",
      "Atraumatic technique — minimal trauma to socket",
      "Same-day appointment available",
      "Expert management of impacted wisdom teeth",
      "Post-extraction implant planning offered",
      "Clear aftercare instructions and follow-up",
    ],
    steps: [
      {
        step: 1,
        title: "X-Ray & Assessment",
        desc: "Periapical or panoramic X-ray maps root morphology, bone levels and proximity to nerves / sinuses.",
      },
      {
        step: 2,
        title: "Anaesthesia",
        desc: "Computer-controlled local anaesthesia numbs the tooth and surrounding area. Sedation available for anxious patients.",
      },
      {
        step: 3,
        title: "Luxation & Elevation",
        desc: "Periotomes and elevators gently expand the socket and loosen the periodontal ligament attachment.",
      },
      {
        step: 4,
        title: "Extraction",
        desc: "Forceps deliver the tooth with controlled, minimal force. Surgical extractions involve a small gingival incision and bone removal if needed.",
      },
      {
        step: 5,
        title: "Socket Care",
        desc: "The socket is irrigated, compressed and sutured if required. Haemostatic gauze is placed and biting instructions given.",
      },
    ],
    faqs: [
      {
        q: "Is tooth extraction painful?",
        a: "No. Local anaesthesia completely eliminates pain during the procedure. Post-operative discomfort is mild and controlled with prescribed pain relief for 1–2 days.",
      },
      {
        q: "How long does it take to heal?",
        a: "The socket heals in 1–2 weeks for simple extractions. Surgical wisdom tooth cases may take 3–4 weeks for full soft-tissue healing.",
      },
      {
        q: "What should I avoid after extraction?",
        a: "Avoid smoking, drinking through straws, rinsing vigorously or touching the socket for 24 hours. Soft foods for the first 2–3 days.",
      },
      {
        q: "What are my options to replace the extracted tooth?",
        a: "Dental implants are the gold standard. Bridges or partial dentures are alternatives. We recommend discussing replacement options at the time of extraction.",
      },
    ],
    popular: false,
  },
  {
    slug: "veneers-crowns",
    label: "Veneers & Crowns",
    tagline: "Perfect Shape, Perfect Shade",
    heroDesc:
      "Porcelain and zirconia restorations crafted to perfection — restore damaged teeth and transform your smile.",
    price: "₹6,000",
    duration: "2 visits",
    sessions: "2",
    painLevel: "Minimal",
    overview:
      "Veneers are thin porcelain shells bonded to the front of teeth to change shape, size and colour. Crowns cap the entire tooth to restore structure after fracture, root canal or severe decay. Both are fabricated in our certified lab from high-translucency zirconia or e.max ceramic, matching natural tooth anatomy and shade precisely.",
    benefits: [
      "Natural-looking, high-translucency porcelain",
      "Corrects chips, cracks, stains and misshapen teeth",
      "Minimal tooth preparation for veneers",
      "Zirconia crowns are metal-free and durable",
      "CAD/CAM milled for precise fit",
      "10–15 year lifespan with proper care",
    ],
    steps: [
      {
        step: 1,
        title: "Smile Analysis & Shade Mapping",
        desc: "Digital photography, shade guide matching and digital smile design ensure the restoration matches your vision.",
      },
      {
        step: 2,
        title: "Tooth Preparation",
        desc: "0.3–0.7 mm of enamel is removed for veneers; more for full crowns. Impressions or digital scan taken.",
      },
      {
        step: 3,
        title: "Temporary Restorations",
        desc: "Aesthetically pleasing temporaries are placed while your permanent restorations are lab-fabricated (7–10 days).",
      },
      {
        step: 4,
        title: "Try-In & Approval",
        desc: "Final restorations are tried in. Shade, shape and bite are verified. Your feedback guides any last adjustments.",
      },
      {
        step: 5,
        title: "Bonding / Cementation",
        desc: "Veneers are bonded with light-cured composite resin. Crowns are cemented with permanent adhesive cement.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a veneer and a crown?",
        a: "A veneer covers only the front surface of a tooth (0.3–0.7 mm preparation). A crown covers the entire tooth and is used when significant structural support is needed.",
      },
      {
        q: "Do veneers look natural?",
        a: "Yes. High-translucency e.max and zirconia mimic the light-transmitting properties of natural enamel. Most people cannot tell the difference.",
      },
      {
        q: "Can veneers fix gaps between teeth?",
        a: "Yes. Slightly wider veneers (contact point modification) effectively close gaps without orthodontic treatment.",
      },
      {
        q: "How do I care for veneers?",
        a: "Brush twice daily with non-abrasive toothpaste, floss daily and wear a night guard if you clench or grind. Avoid biting nails or hard objects with veneer teeth.",
      },
    ],
    popular: false,
  },
];

export function getTreatmentBySlug(slug: string): TreatmentData | undefined {
  return TREATMENT_DATA.find((t) => t.slug === slug);
}

/** Map label → slug for nav links and treatment cards */
export const LABEL_TO_SLUG: Record<string, string> = Object.fromEntries(
  TREATMENT_DATA.map((t) => [t.label, t.slug]),
);
