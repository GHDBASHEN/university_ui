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
  tagline: string;
  description: string;
  heroImage: string;
  flagEmoji: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
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
    tagline: "Where tradition meets world-class innovation",
    description:
      "The United Kingdom is home to some of the oldest and most prestigious universities on the planet. With a rich academic heritage spanning centuries and a vibrant multicultural society, studying in the UK offers an unmatched blend of rigorous education and life-changing experiences. Graduates from UK institutions are recognised and sought after by employers worldwide.",
    heroImage:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80",
    flagEmoji: "🇬🇧",
    accentColor: "#1E40AF",
    gradientFrom: "from-blue-900",
    gradientTo: "to-blue-500",
    stats: {
      universities: 160,
      intakesPerYear: 3,
      averageTuition: "£12,000 – £38,000 / year",
      visaSuccessRate: "97%",
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
        "Historic landmarks, world-class museums, Premier League football, and a legendary pub culture",
      costOfLiving: "£1,000 – £1,500 / month (higher in London)",
      workRights: "20 hrs/week during term, full-time during holidays",
    },
    cardImage:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80",
  },

  // ── Australia ───────────────────────────────────────────────────────────
  {
    slug: "australia",
    name: "Australia",
    shortName: "AUS",
    tagline: "Sun, surf, and world-ranked universities",
    description:
      "Australia consistently ranks among the top study-abroad destinations thanks to its high-quality education system, welcoming immigration policies, and enviable lifestyle. The country's universities are globally recognised for research excellence and strong industry connections. International students enjoy generous post-study work rights and a safe, diverse environment.",
    heroImage:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1920&q=80",
    flagEmoji: "🇦🇺",
    accentColor: "#F59E0B",
    gradientFrom: "from-amber-600",
    gradientTo: "to-yellow-400",
    stats: {
      universities: 43,
      intakesPerYear: 2,
      averageTuition: "AUD 20,000 – AUD 45,000 / year",
      visaSuccessRate: "96%",
      scholarshipsAvailable: 280,
    },
    highlights: [
      "7 of the world's top 100 universities belong to the prestigious Group of Eight",
      "Post-study work visa of 2 – 4 years depending on qualification level",
      "High minimum wage — one of the best for working students globally",
      "Beautiful climate and outdoor lifestyle year-round",
      "Strong government protections for international students (ESOS Act)",
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
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
  },

  // ── Canada ──────────────────────────────────────────────────────────────
  {
    slug: "canada",
    name: "Canada",
    shortName: "CAN",
    tagline: "Maple-leaf hospitality with top-tier academics",
    description:
      "Canada is celebrated for its inclusive society, stunning natural landscapes, and affordable yet high-quality education. Canadian degrees are respected worldwide, and the country's generous immigration pathways make it one of the easiest places for international graduates to build a long-term career. With bilingual culture and a booming tech sector, Canada offers incredible post-graduation prospects.",
    heroImage:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1920&q=80",
    flagEmoji: "🇨🇦",
    accentColor: "#DC2626",
    gradientFrom: "from-red-700",
    gradientTo: "to-rose-400",
    stats: {
      universities: 96,
      intakesPerYear: 3,
      averageTuition: "CAD 15,000 – CAD 35,000 / year",
      visaSuccessRate: "95%",
      scholarshipsAvailable: 220,
    },
    highlights: [
      "Post-Graduation Work Permit (PGWP) of up to 3 years after completing studies",
      "Clear pathway to Permanent Residency through Express Entry & PNP",
      "Lower tuition fees compared to the US and UK for comparable quality",
      "Bilingual advantage — study in English or French-speaking provinces",
      "Ranked the #1 country in the world for quality of life (US News 2025)",
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
        name: "University of Alberta",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=U+of+Alberta",
        location: "Edmonton, Alberta",
        ranking: "#4 in Canada — QS 2026",
        programs: [
          "Petroleum Engineering",
          "AI & Machine Learning",
          "Nursing",
          "Earth Sciences",
          "Pharmacy",
        ],
      },
      {
        name: "University of Waterloo",
        logo: "https://placehold.co/200x80/1a1a2e/ffffff?text=Waterloo",
        location: "Waterloo, Ontario",
        ranking: "#5 in Canada — QS 2026",
        programs: [
          "Software Engineering",
          "Mechatronics",
          "Actuarial Science",
          "Nanotechnology",
          "Cooperative Education Programs",
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
      climate: "Four distinct seasons — warm summers (25 °C) and cold winters (−15 °C)",
      culture:
        "Multicultural mosaic with world-class festivals, ice hockey, and breathtaking national parks",
      costOfLiving: "CAD 1,200 – CAD 2,000 / month (varies by province)",
      workRights: "20 hrs/week during term, full-time during scheduled breaks",
    },
    cardImage:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=800&q=80",
  },
];
