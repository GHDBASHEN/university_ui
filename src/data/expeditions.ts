export interface ExpeditionDestination {
  id: string;
  name: string;
  code: string;
  tagline: string;
  grandTitle: string;
  subtitle: string;
  description: string;
  detailedStory: string;
  location: string;
  coordinates: string;
  distance: string;
  degrees: string;
  elevation: string;
  elevationValue: string;
  bearing: string;
  temperature: string;
  terrain: string;
  difficulty: "MODERATE" | "CHALLENGING" | "EXTREME";
  image: string;
  badge: string;
  accentColor: string;
  gradient: string;
  orbColor: string;
  circuitPath: string;
  elevationPath: string;
  academicCredits: string[];
  waypoints: { name: string; elevation: string; status: "CLEARED" | "ACTIVE" | "PENDING" }[];
  gearRequired: string[];
}

export const EXPEDITION_DESTINATIONS: ExpeditionDestination[] = [
  {
    id: "patagonia-express",
    name: "Patagonia Express",
    code: "EXP-PAT-01",
    tagline: "Southern Andes Glacial Traverse",
    grandTitle: "Hiking the Glaciers",
    subtitle: "Navigate ancient ice fields beneath towering granite spires and glacial turquoise lakes.",
    description:
      "A high-latitude traverse penetrating the Los Glaciares wilderness. Wind-sculpted granite pinnacles and thunderous glacial seracs define this premier Patagonian expedition.",
    detailedStory:
      "The expedition begins at the glacial moraine base before ascending through jagged granite horns of the Paine Massif. Crossing active crevasse fields with crampons and ice axes, teams survey ice-melt runoffs and study climate shifts across the Southern Patagonian Ice Field. High katabatic winds and shifting barometric systems test endurance, rewarding adventurers with unmatched panoramic vistas of ancient turquoise ice caves.",
    location: "Patagonia, Chile & Argentina",
    coordinates: "51°15'S 72°59'W",
    distance: "20.5 km",
    degrees: "20.5°",
    elevation: "950 m",
    elevationValue: "950m",
    bearing: "194° SSW",
    temperature: "-4°C / 25°F",
    terrain: "Glacial Cirque / Granite Moraine",
    difficulty: "CHALLENGING",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=2400&q=85",
    badge: "ROUTE ACTIVE",
    accentColor: "#38BDF8",
    gradient: "from-sky-500/30 via-cyan-400/10 to-transparent",
    orbColor: "#38BDF8",
    circuitPath: "M 10 35 C 25 15, 50 10, 75 22 C 100 32, 120 18, 145 28 C 165 35, 175 50, 150 60 C 120 70, 85 60, 60 52 C 35 44, 15 50, 10 35 Z",
    elevationPath: "M 0 35 Q 30 10, 60 28 T 120 18 T 180 38 T 220 15",
    academicCredits: ["Glaciology Field Study", "Earth Systems Research", "Alpine Climate Dynamics"],
    waypoints: [
      { name: "Basecamp Grey", elevation: "120 m", status: "CLEARED" },
      { name: "Paso John Gardner", elevation: "1,200 m", status: "ACTIVE" },
      { name: "Glaciar Dickinson", elevation: "950 m", status: "PENDING" },
    ],
    gearRequired: ["Technical Crampons", "Gore-Tex Shell", "Ice Axe", "Satellite Beacon", "High-Altitude Tent"],
  },
  {
    id: "vulcan-hunt",
    name: "Vulcan Hunt",
    code: "EXP-VLC-02",
    tagline: "Volcanic Calderas & Obsidian Rifts",
    grandTitle: "Traverse the Volcanic Ridge",
    subtitle: "Trek along smoking volcanic fissures, basalt columns, and geothermal twilight valleys.",
    description:
      "Cross the tectonic divide of the Mid-Atlantic Ridge through neon rhyolite peaks, steaming sulfur calderas, and pitch-black obsidian lava beds.",
    detailedStory:
      "Forging a route through the active volcanic highland interior, this route tracks dormant craters and bubbling geothermal geysers. Scientists and explorers traverse raw volcanic ash, sulfur-tinted geothermal pools, and subterranean lava tubes formed during Holocene eruptions. The midnight sun casts deep violet hues across basalt columns, creating an otherworldly, extraterrestrial landscape.",
    location: "Highland Interior, Iceland",
    coordinates: "64°08'N 19°03'W",
    distance: "34.2 km",
    degrees: "34.2°",
    elevation: "1,840 m",
    elevationValue: "1840m",
    bearing: "312° NW",
    temperature: "2°C / 36°F",
    terrain: "Basalt Lava / Active Fissure",
    difficulty: "EXTREME",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=85",
    badge: "GEOTHERMAL ALERT",
    accentColor: "#F97316",
    gradient: "from-orange-500/30 via-red-500/10 to-transparent",
    orbColor: "#EF4444",
    circuitPath: "M 10 30 C 35 15, 65 10, 95 25 C 130 40, 150 15, 175 30 C 185 45, 160 65, 130 68 C 90 72, 60 55, 35 60 C 15 62, 5 45, 10 30 Z",
    elevationPath: "M 0 45 Q 35 2, 70 30 T 140 8 T 210 25",
    academicCredits: ["Volcanology Field Survey", "Geothermal Geophysics", "Tectonic Petrology"],
    waypoints: [
      { name: "Landmannalaugar Basin", elevation: "600 m", status: "CLEARED" },
      { name: "Hrafntinnusker Ridge", elevation: "1,140 m", status: "ACTIVE" },
      { name: "Eyjafjallajökull Plateau", elevation: "1,666 m", status: "PENDING" },
    ],
    gearRequired: ["Respirator Shield", "Thermal Gaiters", "Geiger Counter", "Carbon Trekking Poles", "Emergency Bivy"],
  },
  {
    id: "arctic-voyage",
    name: "Arctic Voyage",
    code: "EXP-ARC-03",
    tagline: "High-Latitude Svalbard Archipelago",
    grandTitle: "Traverse the Borealis",
    subtitle: "Venture deep into the realm of the midnight sun, pack ice fjords, and dancing emerald auroras.",
    description:
      "A remote high-arctic expedition across snowpack fjords and frozen archipelagos, tracking marine wildlife under the iridescent northern lights.",
    detailedStory:
      "Operating at 78 degrees north, this expedition moves across sea ice fjords where polar bears roam and walrus pods haul out on drifting floes. Under moonlit winter conditions, the sky explodes into pulsating ribbons of green and violet solar winds (aurora borealis). Explorers use specialized pulk sleds and arctic cross-country skis to map permafrost depth and maritime pack ice dynamics.",
    location: "Svalbard Archipelago, Norway",
    coordinates: "78°13'N 15°38'E",
    distance: "15.8 km",
    degrees: "45.5°",
    elevation: "620 m",
    elevationValue: "620m",
    bearing: "028° NNE",
    temperature: "-18°C / 0°F",
    terrain: "Arctic Sea Ice / Snowy Tundra",
    difficulty: "CHALLENGING",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85",
    badge: "AURORA CONFIRMED",
    accentColor: "#A855F7",
    gradient: "from-purple-500/30 via-pink-500/10 to-transparent",
    orbColor: "#F59E0B",
    circuitPath: "M 15 45 C 35 20, 70 15, 95 25 C 125 35, 145 20, 170 35 C 180 45, 165 62, 140 66 C 110 70, 70 62, 45 68 C 20 72, 10 58, 15 45 Z",
    elevationPath: "M 0 40 Q 35 8, 70 25 T 130 12 T 190 32 T 230 18",
    academicCredits: ["Polar Marine Biology", "Permafrost Geocryology", "Aurora Magnetospheric Physics"],
    waypoints: [
      { name: "Longyearbyen Outpost", elevation: "30 m", status: "CLEARED" },
      { name: "Tempelfjorden Sea Ice", elevation: "5 m", status: "ACTIVE" },
      { name: "Nordenskiöld Glacier", elevation: "420 m", status: "PENDING" },
    ],
    gearRequired: ["Polar Parka -40°C", "Ski Pulk System", "Satellite Uplink", "Signal Flares", "Spikes & Crevasse Kit"],
  },
  {
    id: "tundra-road",
    name: "Tundra Road",
    code: "EXP-TND-04",
    tagline: "Subarctic Frontier & Dalton Highway",
    grandTitle: "Chasing the Infinite Horizon",
    subtitle: "Conquer the loneliest gravel road across permafrost plains, boreal forests, and the Brooks Range.",
    description:
      "An unyielding expedition through infinite subarctic wilderness, tracing gravel passes where caribou migrate beneath boundless northern skies.",
    detailedStory:
      "The Tundra Road is an endurance test along one of Earth’s most isolated northern corridors. Crossing the Arctic Circle into the rugged peaks of Atigun Pass, vehicle convoys and expeditioners battle shifting permafrost heave, sudden whiteouts, and river crossings. The vast silence of the subarctic tundra stretches for hundreds of miles, framed by golden autumn dwarf willows and towering peaks.",
    location: "Yukon & Brooks Range, North America",
    coordinates: "66°33'N 150°48'W",
    distance: "52.0 km",
    degrees: "52.0°",
    elevation: "1,120 m",
    elevationValue: "1120m",
    bearing: "270° W",
    temperature: "-8°C / 18°F",
    terrain: "Permafrost Pass / Gravel Tundra",
    difficulty: "MODERATE",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85",
    badge: "ARCTIC CIRCLE",
    accentColor: "#FBBF24",
    gradient: "from-amber-500/30 via-yellow-500/10 to-transparent",
    orbColor: "#06B6D4",
    circuitPath: "M 20 40 C 40 25, 60 10, 100 20 C 130 30, 155 15, 180 32 C 190 48, 170 65, 135 60 C 95 65, 65 58, 35 65 C 18 68, 10 55, 20 40 Z",
    elevationPath: "M 0 30 Q 40 12, 80 35 T 150 15 T 220 30",
    academicCredits: ["Subarctic Ecology", "Permafrost Engineering", "Boreal Forest Dynamics"],
    waypoints: [
      { name: "Yukon River Crossing", elevation: "90 m", status: "CLEARED" },
      { name: "Arctic Circle Marker", elevation: "350 m", status: "CLEARED" },
      { name: "Atigun Pass Continental Divide", elevation: "1,444 m", status: "ACTIVE" },
    ],
    gearRequired: ["Sub-Zero Sleeping Bag", "GPS Satellite Transceiver", "Heavy Snow Chains", "Radio Scanner", "MSR Stove"],
  },
];
