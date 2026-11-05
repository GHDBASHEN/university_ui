// ---------------------------------------------------------------------------
// Destinations data for AURA GLOBAL EDUCATION
// ---------------------------------------------------------------------------

export interface UniversityEntry {
  name: string;
  logo: string;
  location: string;
  ranking: string;
  programs: string[];
}

export interface DestinationStats {
  universities: number;
  intakesPerYear: number;
  averageTuition: string;
  visaSuccessRate: string;
  scholarshipsAvailable: number;
}

export interface DestinationLifestyle {
  climate: string;
  culture: string;
  costOfLiving: string;
  workRights: string;
}

export interface Destination {
  slug: string;
  name: string;
  shortName: string;
  code: string;
  tagline: string;
  grandTitle: string;
  description: string;
  heroImage: string;
  flagEmoji: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  orbColor: string;
  circuitPath: string;
  elevationPath: string;
  stats: DestinationStats;
  highlights: string[];
  universities: UniversityEntry[];
  lifestyle: DestinationLifestyle;
  cardImage: string;
}

export const DESTINATIONS: Destination[] = [
  // ── United Kingdom ──────────────────────────────────────────────────────
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    shortName: "UK",
    code: "UNI-UK-01",
    tagline: "Russell Group Grid & Historic Collegiate Excellence",
    grandTitle: "Traverse the British Isles",
    description:
      "Home to Oxford, Cambridge, and world-shaping intellectual heritage. Study in historic colleges with 1-year master's degrees, comprehensive NHS healthcare access, and 2-year post-study work rights via the Graduate Route.",
    heroImage:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2400&q=85",
    flagEmoji: "🇬🇧",
    accentColor: "#3B82F6",
    gradientFrom: "from-blue-900",
    gradientTo: "to-blue-500",
    orbColor: "#3B82F6",
    circuitPath:
      "M 10 35 C 25 15, 50 10, 75 22 C 100 32, 120 18, 145 28 C 165 35, 175 50, 150 60 C 120 70, 85 60, 60 52 C 35 44, 15 50, 10 35 Z",
    elevationPath:
      "M 0 35 Q 30 10, 60 28 T 120 18 T 180 38 T 220 15",
    stats: {
      universities: 160,
      intakesPerYear: 3,
      averageTuition: "£12,000 – £38,000 / year",
      visaSuccessRate: "98%",
      scholarshipsAvailable: 350,
    },
    highlights: [
      "One-year master's programmes — save time and money compared to other destinations",
      "Post-study work visa (Graduate Route) allows 2 years of work after graduation",
      "Home to 4 of the world's top 10 universities",
      "Access to NHS healthcare for international students",
      "Multicultural cities with thriving student communities across England, Scotland, Wales & Northern Ireland",
    ],
    universities: [
      {
        name: "University of Oxford",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Oxford",
        location: "Oxford, England",
        ranking: "#1 in the UK — QS 2026",
        programs: [
          "Computer Science",
          "Medicine",
          "Law",
          "Philosophy, Politics & Economics",
          "Business Administration",
        ],
      },
      {
        name: "University of Cambridge",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Cambridge",
        location: "Cambridge, England",
        ranking: "#2 in the UK — QS 2026",
        programs: [
          "Engineering",
          "Natural Sciences",
          "Mathematics",
          "Economics",
          "Architecture",
        ],
      },
      {
        name: "Imperial College London",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Imperial",
        location: "London, England",
        ranking: "#3 in the UK — QS 2026",
        programs: [
          "Biomedical Engineering",
          "Artificial Intelligence",
          "Chemical Engineering",
          "Finance",
          "Physics",
        ],
      },
      {
        name: "University College London (UCL)",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=UCL",
        location: "London, England",
        ranking: "#4 in the UK — QS 2026",
        programs: [
          "Data Science",
          "Architecture",
          "Neuroscience",
          "Education",
          "Global Health",
        ],
      },
      {
        name: "University of Edinburgh",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Edinburgh",
        location: "Edinburgh, Scotland",
        ranking: "#5 in the UK — QS 2026",
        programs: [
          "Informatics",
          "Veterinary Medicine",
          "Linguistics",
          "International Relations",
          "Renewable Energy",
        ],
      },
      {
        name: "University of Manchester",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Manchester",
        location: "Manchester, England",
        ranking: "#6 in the UK — QS 2026",
        programs: [
          "Aerospace Engineering",
          "Business Analytics",
          "Pharmacy",
          "Sociology",
          "Materials Science",
        ],
      },
    ],
    lifestyle: {
      climate: "Mild and temperate with cool winters (2 °C – 20 °C year-round)",
      culture:
        "Historic landmarks, world-class museums, Premier League football, and legendary pub culture",
      costOfLiving: "£1,000 – £1,500 / month (higher in London)",
      workRights: "20 hrs/week during term, full-time during holidays",
    },
    cardImage:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=85",
  },

  // ── Australia ───────────────────────────────────────────────────────────
  {
    slug: "australia",
    name: "Australia",
    shortName: "AUS",
    code: "UNI-AUS-02",
    tagline: "Group of Eight (Go8) & World-Ranked Research",
    grandTitle: "Wander the Australian Campuses",
    description:
      "Sun-soaked campuses, globally ranked labs, and vibrant coastal culture. Australia offers the world's most generous post-study work visas (2–4 years), high minimum student wages, and top-tier research institutions.",
    heroImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2400&q=85",
    flagEmoji: "🇦🇺",
    accentColor: "#F59E0B",
    gradientFrom: "from-amber-600",
    gradientTo: "to-yellow-400",
    orbColor: "#F59E0B",
    circuitPath:
      "M 15 45 C 35 20, 70 15, 95 25 C 125 35, 145 20, 170 35 C 180 45, 165 62, 140 66 C 110 70, 70 62, 45 68 C 20 72, 10 58, 15 45 Z",
    elevationPath:
      "M 0 40 Q 35 8, 70 25 T 130 12 T 190 32 T 230 18",
    stats: {
      universities: 43,
      intakesPerYear: 2,
      averageTuition: "AUD 20,000 – AUD 45,000 / year",
      visaSuccessRate: "96%",
      scholarshipsAvailable: 280,
    },
    highlights: [
      "7 of the world's top 100 universities belong to the prestigious Group of Eight (Go8)",
      "Post-study work visa of 2 – 4 years depending on qualification level",
      "High minimum wage — one of the best student earning potentials globally",
      "Beautiful coastal climate and outdoor lifestyle year-round",
      "Strong legislative government protections for international students (ESOS Act)",
    ],
    universities: [
      {
        name: "University of Melbourne",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Melbourne",
        location: "Melbourne, Victoria",
        ranking: "#1 in Australia — QS 2026",
        programs: [
          "Biomedicine",
          "Law",
          "Commerce",
          "Software Engineering",
          "Environmental Science",
        ],
      },
      {
        name: "University of Sydney",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Sydney",
        location: "Sydney, New South Wales",
        ranking: "#2 in Australia — QS 2026",
        programs: [
          "Architecture",
          "Media & Communications",
          "Nursing",
          "Data Science",
          "Civil Engineering",
        ],
      },
      {
        name: "Australian National University (ANU)",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=ANU",
        location: "Canberra, ACT",
        ranking: "#3 in Australia — QS 2026",
        programs: [
          "International Relations",
          "Astronomy & Astrophysics",
          "Public Policy",
          "Computer Science",
          "Actuarial Studies",
        ],
      },
      {
        name: "University of Queensland (UQ)",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=UQ",
        location: "Brisbane, Queensland",
        ranking: "#4 in Australia — QS 2026",
        programs: [
          "Marine Biology",
          "Chemical Engineering",
          "Psychology",
          "Agribusiness",
          "Biotechnology",
        ],
      },
      {
        name: "Monash University",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Monash",
        location: "Melbourne, Victoria",
        ranking: "#5 in Australia — QS 2026",
        programs: [
          "Pharmacy",
          "Education",
          "Business Analytics",
          "Cybersecurity",
          "Mechanical Engineering",
        ],
      },
      {
        name: "University of New South Wales (UNSW)",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=UNSW",
        location: "Sydney, New South Wales",
        ranking: "#6 in Australia — QS 2026",
        programs: [
          "Renewable Energy Engineering",
          "Finance",
          "Quantum Computing",
          "Design",
          "Medicine",
        ],
      },
    ],
    lifestyle: {
      climate: "Warm and sunny with mild winters (10 °C – 35 °C depending on region)",
      culture:
        "Laid-back beach culture, diverse food scene, vibrant arts festivals, and passionate sports fans",
      costOfLiving: "AUD 1,500 – AUD 2,500 / month (varies by city)",
      workRights: "48 hrs/fortnight during term, unlimited during holidays",
    },
    cardImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",
  },

  // ── Canada ──────────────────────────────────────────────────────────────
  {
    slug: "canada",
    name: "Canada",
    shortName: "CAN",
    code: "UNI-CAN-03",
    tagline: "U15 Research Consortium & Permanent Residency Pathways",
    grandTitle: "Pioneer the Canadian Frontier",
    description:
      "Immigration-friendly pathways, tech innovation, and diverse metropolises. Top-ranked global universities, 3-year PGWP open work permits, and accelerated routes to Permanent Residency via Express Entry.",
    heroImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=85",
    flagEmoji: "🇨🇦",
    accentColor: "#DC2626",
    gradientFrom: "from-red-700",
    gradientTo: "to-rose-400",
    orbColor: "#EF4444",
    circuitPath:
      "M 10 30 C 35 15, 65 10, 95 25 C 130 40, 150 15, 175 30 C 185 45, 160 65, 130 68 C 90 72, 60 55, 35 60 C 15 62, 5 45, 10 30 Z",
    elevationPath:
      "M 0 45 Q 35 2, 70 30 T 140 8 T 210 25",
    stats: {
      universities: 96,
      intakesPerYear: 3,
      averageTuition: "CAD 15,000 – CAD 35,000 / year",
      visaSuccessRate: "97%",
      scholarshipsAvailable: 220,
    },
    highlights: [
      "Post-Graduation Work Permit (PGWP) of up to 3 years after completing studies",
      "Clear pathway to Permanent Residency through Express Entry & Provincial Nominee Programs",
      "Lower tuition fees compared to other English-speaking destinations for comparable quality",
      "Bilingual advantage — study in English or French-speaking provinces",
      "Ranked #1 country globally for quality of life and safety",
    ],
    universities: [
      {
        name: "University of Toronto",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=U+of+Toronto",
        location: "Toronto, Ontario",
        ranking: "#1 in Canada — QS 2026",
        programs: [
          "Computer Science",
          "Engineering Science",
          "Rotman Commerce",
          "Life Sciences",
          "Public Health",
        ],
      },
      {
        name: "University of British Columbia (UBC)",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=UBC",
        location: "Vancouver, British Columbia",
        ranking: "#2 in Canada — QS 2026",
        programs: [
          "Forestry",
          "Computer Engineering",
          "International Economics",
          "Film Production",
          "Kinesiology",
        ],
      },
      {
        name: "McGill University",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=McGill",
        location: "Montreal, Quebec",
        ranking: "#3 in Canada — QS 2026",
        programs: [
          "Medicine",
          "Law",
          "Music",
          "Neuroscience",
          "Agricultural & Environmental Sciences",
        ],
      },
      {
        name: "University of Waterloo",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Waterloo",
        location: "Waterloo, Ontario",
        ranking: "#4 in Canada — QS 2026",
        programs: [
          "Software Engineering",
          "Mechatronics",
          "Actuarial Science",
          "Nanotechnology",
          "World-Leading Co-op Program",
        ],
      },
      {
        name: "University of Alberta",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=U+of+Alberta",
        location: "Edmonton, Alberta",
        ranking: "#5 in Canada — QS 2026",
        programs: [
          "Petroleum Engineering",
          "AI & Machine Learning",
          "Nursing",
          "Earth Sciences",
          "Pharmacy",
        ],
      },
      {
        name: "McMaster University",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=McMaster",
        location: "Hamilton, Ontario",
        ranking: "#6 in Canada — QS 2026",
        programs: [
          "Health Sciences",
          "Engineering Physics",
          "Business (DeGroote)",
          "Social Psychology",
          "Chemical Biology",
        ],
      },
    ],
    lifestyle: {
      climate: "Four distinct seasons — warm summers (25 °C) and scenic snowy winters (−10 °C)",
      culture:
        "Multicultural mosaic with world-class festivals, ice hockey, and breathtaking national parks",
      costOfLiving: "CAD 1,200 – CAD 2,000 / month (varies by province)",
      workRights: "20 hrs/week during term, full-time during scheduled breaks",
    },
    cardImage:
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=85",
  },

  // ── United States ────────────────────────────────────────────────────────
  {
    slug: "united-states",
    name: "United States",
    shortName: "USA",
    code: "UNI-USA-04",
    tagline: "Ivy League Dominance & Silicon Valley Innovation",
    grandTitle: "Ignite Your American Ambition",
    description:
      "The undisputed global powerhouse of higher education and technological research. Home to the Ivy League, Silicon Valley partnerships, and up to 3 years of STEM OPT post-graduation employment authorization.",
    heroImage:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2400&q=85",
    flagEmoji: "🇺🇸",
    accentColor: "#8B5CF6",
    gradientFrom: "from-indigo-900",
    gradientTo: "to-purple-500",
    orbColor: "#8B5CF6",
    circuitPath:
      "M 20 40 C 40 25, 60 10, 100 20 C 130 30, 155 15, 180 32 C 190 48, 170 65, 135 60 C 95 65, 65 58, 35 65 C 18 68, 10 55, 20 40 Z",
    elevationPath:
      "M 0 30 Q 40 12, 80 35 T 150 15 T 220 30",
    stats: {
      universities: 400,
      intakesPerYear: 3,
      averageTuition: "$22,000 – $58,000 / year",
      visaSuccessRate: "95%",
      scholarshipsAvailable: 500,
    },
    highlights: [
      "Over 50 of the world's top 100 universities located across the United States",
      "3-Year STEM OPT extension allowing extensive professional work in the US tech sector",
      "Unrivalled venture capital, entrepreneurial incubation, and research funding",
      "Flexible curriculum structure allowing double majors and interdisciplinary minors",
      "Vibrant campus life with NCAA sports, student organizations, and global alumni networks",
    ],
    universities: [
      {
        name: "Harvard University",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Harvard",
        location: "Cambridge, Massachusetts",
        ranking: "#1 in the USA — Ivy League",
        programs: [
          "Computer Science",
          "Law",
          "Economics",
          "Biomedical Engineering",
          "Business Administration",
        ],
      },
      {
        name: "Stanford University",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Stanford",
        location: "Stanford, California",
        ranking: "#2 in the USA — Silicon Valley",
        programs: [
          "Artificial Intelligence",
          "Management Science & Engineering",
          "Bioengineering",
          "Data Science",
          "Finance",
        ],
      },
      {
        name: "Massachusetts Institute of Technology (MIT)",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=MIT",
        location: "Cambridge, Massachusetts",
        ranking: "#1 Globally — QS 2026",
        programs: [
          "Robotics & Electrical Engineering",
          "Aerospace Engineering",
          "Quantum Computing",
          "Computational Biology",
          "Mathematics",
        ],
      },
      {
        name: "Columbia University",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Columbia",
        location: "New York City, New York",
        ranking: "#4 in the USA — Ivy League",
        programs: [
          "Journalism",
          "International Affairs",
          "Applied Mathematics",
          "Financial Engineering",
          "Neuroscience",
        ],
      },
      {
        name: "UC Berkeley",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=UC+Berkeley",
        location: "Berkeley, California",
        ranking: "#1 Public University in the USA",
        programs: [
          "EECS Computer Science",
          "Business (Haas)",
          "Environmental Economics",
          "Civil Engineering",
          "Molecular Biology",
        ],
      },
    ],
    lifestyle: {
      climate: "Diverse climates — from sunny California to New England autumns and tropical South",
      culture:
        "Global hub of film, music, sports, culinary innovation, and groundbreaking startups",
      costOfLiving: "$1,200 – $2,500 / month (varies by city and state)",
      workRights: "20 hrs/week on-campus during term, CPT and OPT post-study internships",
    },
    cardImage:
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85",
  },
];
