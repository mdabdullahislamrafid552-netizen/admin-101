export interface StaticProject {
  id: string;
  title: string;
  category: string;
  location: string;
  shortDescription: string;
  description: string;
  status: string;
  featuredImage: string;
  images: string[];
  captions: string[];
}

export const staticProjects: StaticProject[] = [
  {
    id: 'crosby-residence',
    title: 'Crosby Residence Rebuild',
    category: 'FIRE REBUILD',
    location: 'ALTADENA, CA',
    shortDescription: 'Rebuilding from the ground up — and from the community out.',
    description: "332 Crosby — a complete ground-up fire rebuild that began with a community groundbreaking. From that first day with shovels in the ground to a fully framed home, every stage has been about more than construction. It's about getting a family back home.",
    status: 'In Progress',
    featuredImage: 'https://i.imgur.com/7kizbaU.jpg',
    images: [
      'https://i.imgur.com/Wy9wBiB.jpg',
      'https://i.imgur.com/SlCFhLQ.jpg',
      'https://i.imgur.com/xcsH5I3.jpg',
      'https://i.imgur.com/dRAWz2k.jpg',
      'https://i.imgur.com/Cum6ZOQ.jpg',
      'https://i.imgur.com/zI08ZOo.jpg',
      'https://i.imgur.com/p2Kpxe7.jpg',
      'https://i.imgur.com/AAqerdH.jpg',
      'https://i.imgur.com/GMpnitH.jpg',
      'https://i.imgur.com/f0TGEOn.jpg',
      'https://i.imgur.com/dRuAafP.jpg',
      'https://i.imgur.com/bXpIBNr.jpg',
      'https://i.imgur.com/7kizbaU.jpg',
      'https://i.imgur.com/037QQPy.jpg'
    ],
    captions: [
      "Groundbreaking day — the Vivere team ready to begin.",
      "Family, friends, and team gathered to break ground together.",
      "Foundation forms set and ready for concrete.",
      "Rebar laid for the foundation slab.",
      "Concrete arriving on site.",
      "Pouring the slab — crew at work.",
      "Foundation cured, ready for framing.",
      "Sub-floor framing complete.",
      "First walls rise — framing begins.",
      "Exterior sheathing in progress.",
      "Framing taking shape across the structure.",
      "Interior framing detail.",
      "Front elevation framed — porch overhang visible.",
      "Side wall framed with window openings cut."
    ]
  },
  {
    id: 'east-altadena',
    title: 'East Altadena Rebuild',
    category: 'FIRE REBUILD',
    location: 'ALTADENA, CA',
    shortDescription: 'From cleared lot to weather-tight — a fire rebuild in motion.',
    description: "435 E Altadena Street, captured from the very first day on site through full framing. A complete ground-up fire rebuild — site clearance, excavation, foundation, framing, and now nearing weather-tight. Every step documented as we restore this Altadena home, one careful phase at a time.",
    status: 'In Progress',
    featuredImage: 'https://i.imgur.com/9oYpl9x.jpg',
    images: [
      'https://i.imgur.com/a8mNivs.jpg',
      'https://i.imgur.com/qdzX4pX.jpg',
      'https://i.imgur.com/nJTcOrd.jpg',
      'https://i.imgur.com/0Tj9FtB.jpg',
      'https://i.imgur.com/lhrTGnS.jpg',
      'https://i.imgur.com/DgHgdT5.jpg',
      'https://i.imgur.com/G6KQxxE.jpg',
      'https://i.imgur.com/8ffsQC5.jpg',
      'https://i.imgur.com/V3spfQU.jpg',
      'https://i.imgur.com/A9JYTna.jpg',
      'https://i.imgur.com/sZbTIyi.jpg',
      'https://i.imgur.com/tMBi21H.jpg',
      'https://i.imgur.com/JUmAooK.jpg',
      'https://i.imgur.com/stnj7ng.jpg',
      'https://i.imgur.com/9oYpl9x.jpg'
    ],
    captions: [
      "Day one. The empty lot before rebuild begins.",
      "Site clearing and excavation underway.",
      "Cleared lot, ready for grading.",
      "Earthwork and soil preparation.",
      "Trench excavation begins.",
      "Foundation lines staked out.",
      "Foundation formwork in progress.",
      "Wide view of completed foundation forms.",
      "Crew at work on the foundation.",
      "Concrete slab poured.",
      "First walls rise — framing begins.",
      "Framing well underway across the structure.",
      "Interior framing detail.",
      "Roof decking and roofing installation.",
      "Nearing weather-tight — framing complete."
    ]
  },
  {
    id: 'homepark-residence',
    title: 'Homepark Residence',
    category: 'FIRE REBUILD',
    location: 'ALTADENA, CA',
    shortDescription: 'From graded lot to framed home — a fire rebuild taking shape.',
    description: "2645 Homepark, captured from a graded lot through full framing and rough-in. A complete ground-up fire rebuild — site prep, foundation, framing, and now into mechanicals — restoring this Altadena home one phase at a time.",
    status: 'In Progress',
    featuredImage: 'https://i.imgur.com/FqCntKa.jpg',
    images: [
      'https://i.imgur.com/6mwznp8.jpg',
      'https://i.imgur.com/7NlVz8a.jpg',
      'https://i.imgur.com/QdQ8H6u.jpg',
      'https://i.imgur.com/cpAzRgP.jpg',
      'https://i.imgur.com/0aYBL8F.jpg',
      'https://i.imgur.com/cZLq1AZ.jpg',
      'https://i.imgur.com/Aykazvf.jpg',
      'https://i.imgur.com/51vPymS.jpg',
      'https://i.imgur.com/FqCntKa.jpg',
      'https://i.imgur.com/8ovnlcl.jpg',
      'https://i.imgur.com/6UUOJKu.jpg',
      'https://i.imgur.com/Yk2N62y.jpg'
    ],
    captions: [
      "The graded lot, ready for foundation work.",
      "Earthwork and site grading in progress.",
      "Foundation footings and pier excavation.",
      "Trench excavation across the site.",
      "Foundation formwork takes shape.",
      "Wide view of formwork stretching across the slope.",
      "First walls rise — framing begins.",
      "Exterior sheathing complete.",
      "Full framing — windows cut, structure standing.",
      "Main house and ADU framing side-by-side.",
      "Front elevation framed and sealed.",
      "Interior MEP — HVAC rough-in underway."
    ]
  }
];
