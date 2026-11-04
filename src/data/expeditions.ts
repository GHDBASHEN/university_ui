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
  elevation: string;
  bearing: string;
  temperature: string;
  terrain: string;
  difficulty: "MODERATE" | "CHALLENGING" | "EXTREME";
  image: string;
  badge: string;
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
    elevation: "950 m",
    bearing: "194° SSW",
    temperature: "-4°C / 25°F",
    terrain: "Glacial Cirque / Granite Moraine",
    difficulty: "CHALLENGING",
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=2400&q=85",
    badge: "ROUTE ACTIVE",
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
    elevation: "1,840 m",
    bearing: "312° NW",
    temperature: "2°C / 36°F",
    terrain: "Basalt Lava / Active Fissure",
    difficulty: "EXTREME",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=85",
    badge: "GEOTHERMAL ALERT",
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
    elevation: "420 m",
    bearing: "028° NNE",
    temperature: "-18°C / 0°F",
    terrain: "Arctic Sea Ice / Snowy Tundra",
    difficulty: "CHALLENGING",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=2400&q=85",
    badge: "AURORA CONFIRMED",
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
    elevation: "1,120 m",
    bearing: "270° W",
    temperature: "-8°C / 18°F",
    terrain: "Permafrost Pass / Gravel Tundra",
    difficulty: "MODERATE",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85",
    badge: "ARCTIC CIRCLE",
    waypoints: [
      { name: "Yukon River Crossing", elevation: "90 m", status: "CLEARED" },
      { name: "Arctic Circle Marker", elevation: "350 m", status: "CLEARED" },
      { name: "Atigun Pass Continental Divide", elevation: "1,444 m", status: "ACTIVE" },
    ],
    gearRequired: ["Sub-Zero Sleeping Bag", "GPS Satellite Transceiver", "Heavy Snow Chains", "Radio Scanner", "MSR Stove"],
  },
];

