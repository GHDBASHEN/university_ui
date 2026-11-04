// ---------------------------------------------------------------------------
// Events data for AURA GLOBAL EDUCATION
// ---------------------------------------------------------------------------

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "webinar" | "fair" | "workshop" | "seminar";
  description: string;
  image: string;
  isUpcoming: boolean;
  registrationLink: string;
}

export const EVENTS: Event[] = [
  {
    id: "event-01",
    title: "Study in the UK — Virtual Info Session",
    date: "2026-12-14T10:00:00Z",
    location: "Online (Zoom)",
    type: "webinar",
    description:
      "Join our expert counsellors for a comprehensive overview of studying in the United Kingdom. Learn about top universities, visa requirements, scholarships, and the new Graduate Route work visa.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&w=800&q=80",
    isUpcoming: true,
    registrationLink: "#",
  },
  {
    id: "event-02",
    title: "AURA International Education Fair 2026",
    date: "2026-12-28T09:00:00Z",
    location: "Colombo, Sri Lanka — Shangri-La Hotel",
    type: "fair",
    description:
      "Meet representatives from over 40 universities across the UK, Australia, and Canada under one roof. Get on-the-spot application reviews and exclusive fee waivers.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    isUpcoming: true,
    registrationLink: "#",
  },
  {
    id: "event-03",
    title: "IELTS & PTE Masterclass Workshop",
    date: "2027-01-10T14:00:00Z",
    location: "Online (Google Meet)",
    type: "workshop",
    description:
      "Struggling with English proficiency tests? Our certified trainers will share proven strategies, practice materials, and insider tips to help you achieve your target band score.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    isUpcoming: true,
    registrationLink: "#",
  },
  {
    id: "event-04",
    title: "Scholarship Seminar — Funding Your Dream Degree",
    date: "2027-01-24T11:00:00Z",
    location: "Kandy, Sri Lanka — AURA Branch Office",
    type: "seminar",
    description:
      "Discover merit-based, need-based, and country-specific scholarships available for the 2027 intake. Our advisors will walk you through eligibility criteria and application deadlines.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    isUpcoming: true,
    registrationLink: "#",
  },
  {
    id: "event-05",
    title: "Canada Immigration Pathways — From Student to PR",
    date: "2027-02-08T16:00:00Z",
    location: "Online (Zoom)",
    type: "webinar",
    description:
      "Understand how studying in Canada can lead to Permanent Residency. Our immigration specialist will break down Express Entry, Provincial Nominee Programs, and the PGWP process.",
    image:
      "https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?auto=format&fit=crop&w=800&q=80",
    isUpcoming: true,
    registrationLink: "#",
  },
  {
    id: "event-06",
    title: "Personal Statement Writing Workshop",
    date: "2026-10-05T13:00:00Z",
    location: "Colombo, Sri Lanka — AURA Head Office",
    type: "workshop",
    description:
      "A hands-on session where you'll learn how to craft a compelling Statement of Purpose that stands out. Includes one-on-one feedback from our admissions experts.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    isUpcoming: false,
    registrationLink: "#",
  },
];
