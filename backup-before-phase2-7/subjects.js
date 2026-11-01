/* GATE Practice taxonomy — Phase 1
 * Canonical subject -> topic mapping for all supported branches.
 * Legacy topic labels are retained verbatim for compatibility and migration.
 * No weightage is assigned in Phase 1; Phase 2 derives it from the PYQ bank.
 */
const TAXONOMY = {
  "EC": {
    "General Aptitude": [
      "Numerical Ability",
      "Verbal Ability",
      "Spatial Aptitude",
      "Logical Reasoning",
      "Analytical Aptitude"
    ],
    "Engineering Mathematics": [
      "Engineering Mathematics",
      "Linear Algebra",
      "Numerical Methods",
      "Probability and Statistics",
      "Calculus",
      "Differential Equations",
      "Complex Variables",
      "Transform Theory"
    ],
    "Network Theory": [
      "Graph Theory and State Equations",
      "Network Functions",
      "Network Theorems",
      "Network Theory",
      "Sinusoidal Steady State",
      "Sinusoidal Steady State Analysis",
      "Transient Analysis",
      "Two Port Networks",
      "Graph Theory",
      "State Equations"
    ],
    "Electronic Devices and Circuits (EDC)": [
      "BJT Analysis",
      "Diodes Applications",
      "Electronic Devices",
      "FET and MOSFET Analysis",
      "IC Fabrication",
      "PN-Junction Diodes and Special Diodes",
      "Diode Applications"
    ],
    "Analog Electronics": [
      "Feedback Amplifiers",
      "Frequency Response of Amplifier",
      "Multivibrators and 555 Timer",
      "Operational Amplifiers",
      "Oscillator Circuits"
    ],
    "Digital Electronics": [
      "Digital Circuits",
      "Finite State Machine and Miscellaneous",
      "Instructions of 8085 Microprocessor",
      "Logic Families",
      "Logic Gates",
      "Memories",
      "Microprocessor 8085 Interrupts",
      "Microprocessor 8085 Programming",
      "Microprocessors",
      "Number Systems",
      "Sequential Circuits",
      "Combinational Circuits",
      "Finite State Machine",
      "Microprocessors (8085: instructions, programming, interrupts, interfacing)",
      "Interfacing and Peripheral Devices"
    ],
    "Communications": [
      "Communication Systems",
      "Digital Communication Systems",
      "Information Theory and Coding",
      "Random Signals and Noise",
      "Communication Systems (AM/FM)"
    ],
    "Signals and Systems": [
      "Laplace Transform",
      "LTI Systems Continuous and Discrete",
      "Sampling",
      "Signals and Systems",
      "Z-Transform",
      "Fourier Series and Transform"
    ],
    "Electromagnetic Theory": [
      "Electromagnetics",
      "Transmission Lines",
      "Uniform Plane Waves",
      "Waveguides",
      "Maxwell's Equations",
      "Antennas"
    ],
    "Control Systems": [
      "Control Systems",
      "Frequency Response Analysis",
      "Root Locus",
      "Stability Analysis",
      "State Space Analysis",
      "Time Response Analysis"
    ]
  },
  "CE": {
    "General Aptitude": [
      "Numerical Ability",
      "Verbal Ability",
      "Spatial Aptitude",
      "Logical Reasoning",
      "Analytical Aptitude"
    ],
    "Engineering Mathematics": [
      "Engineering Mathematics",
      "Linear Algebra",
      "Numerical Methods",
      "Ordinary Differential Equation",
      "Partial Differential Equation",
      "Probability and Statistics"
    ],
    "Structural Engineering": [
      "Design of Steel Structures",
      "Influence Line Diagram and Rolling Loads",
      "Matrix Method of Structural Analysis",
      "Methods of Structural Analysis",
      "Plastic Analysis",
      "Prestressed Concrete Beams",
      "Principal Stress and Principal Strain",
      "RCC Structures",
      "Shear Force and Bending Moment",
      "Shear, Torsion, Bond, Anchorage and Development Length",
      "Solid Mechanics",
      "Structural Analysis",
      "Structural Fasteners",
      "Tension Member",
      "Theory of Columns and Shear Centre",
      "Trusses",
      "Working Stress and Limit State Method",
      "Plate Griders and Industrial Roofs",
      "Torsion of Shafts and Pressure Vessels"
    ],
    "Geotechnical Engineering": [
      "Friction",
      "Geotechnical Engineering",
      "Properties of Soils",
      "Retaining Wall-Earth Pressure Theories",
      "Seepage Analysis",
      "Shallow Foundation and Bearing Capacity",
      "Shear Strength of Soil",
      "Soil Stabilization and Soil Exploration",
      "Stability Analysis of Slopes",
      "Stress Distribution in the Soil",
      "Theories of Seepage, Spillways and Miscellaneous"
    ],
    "Water Resources Engineering": [
      "Evaporation, Transpiration and Stream Flow Measurement",
      "Flood Routing and Flood Control",
      "Fluid Mechanics and Hydraulics",
      "Fluid Properties and Manometry",
      "Hydraulic Pumps",
      "Hydrostatic Forces",
      "Impact of Jets and Turbines",
      "Infiltration, Runoff and Hydrographs",
      "Irrigation Engineering",
      "Open Channel Flow",
      "Precipitation and General Aspects of Hydrology",
      "Source of Water Supply, Distribution System and Well Hydraulics",
      "Tacheometric, Curve and Hydrographic Surveying",
      "Turbulent Flow",
      "Viscous Flow of Incompressible Fluid",
      "Water Demand"
    ],
    "Environmental Engineering": [
      "Environmental Engineering",
      "Municipal Solid Waste Management",
      "Quality and Characteristics of Waste Water",
      "Quality Characteristics of Water",
      "Treatment of Waste Water",
      "Water Treatment"
    ],
    "Transportation Engineering": [
      "Geometric Design of Highway and Planning",
      "Highway Maintenance",
      "Highway Materials",
      "Pavement Design",
      "Railway and Airport Engineering",
      "Traffic Engineering"
    ],
    "Geomatics Engineering": [
      "Geomatics Engineering",
      "Levelling and Contouring",
      "Remote Sensing, GIS, GPS and Photogrammetry",
      "Theodolites, Compass and Traverse Surveying"
    ],
    "Construction Materials and Management": [
      "Construction Materials and Management",
      "Properties of Metals, Stress and Strain"
    ]
  },
  "DA": {
    "General Aptitude": [
      "General Aptitude",
      "Numerical Ability",
      "Verbal Ability",
      "Spatial Aptitude",
      "Logical Reasoning",
      "Analytical Aptitude"
    ],
    "Probability and Statistics": [
      "Probability and Statistics"
    ],
    "Linear Algebra": [
      "Linear Algebra"
    ],
    "Calculus and Optimization": [
      "Calculus and Optimization"
    ],
    "Programming, Data Structures and Algorithms": [
      "Programming in Python"
    ],
    "Database Management and Warehousing": [
      "Database Management and Warehousing"
    ],
    "Machine Learning": [
      "Machine Learning"
    ],
    "Artificial Intelligence": [
      "Artificial Intelligence"
    ]
  },
  "CS": {
    "General Aptitude": [
      "Numerical Ability",
      "Verbal Ability",
      "Spatial Aptitude",
      "Logical Reasoning",
      "Analytical Aptitude"
    ],
    "Engineering Mathematics": [
      "Calculus",
      "Discrete Mathematics",
      "Engineering Mathematics",
      "Group Theory",
      "Lattice",
      "Linear Algebra",
      "Matching",
      "Number System",
      "Numerical Method",
      "Probability Theory",
      "Propositional Logic",
      "Recurrence",
      "Recurrence Relation",
      "Relation",
      "Relational Algebra",
      "Relational Schema",
      "Set Theory",
      "Tuple Calculus"
    ],
    "Digital Logic": [
      "Digital Logic",
      "Sequential Circuit"
    ],
    "Computer Organization and Architecture": [
      "Computer Organization",
      "Interrupt",
      "IO Interface",
      "Machine Instruction",
      "Memory Chip Design",
      "Pipeline Processor",
      "Secondary Storage"
    ],
    "Programming and Data Structures": [
      "C Programming",
      "Conditional Statement",
      "Data Structure",
      "Dynamic Programming",
      "Function",
      "Functions",
      "Hashing",
      "Heap Tree",
      "Link List",
      "Loop",
      "n-ary Tree",
      "Queue",
      "Stack"
    ],
    "Algorithms": [
      "Algorithm",
      "Asymptotic Notation",
      "Divide and Conquer",
      "Graph Theory",
      "Graph Traversal",
      "Greedy Technique",
      "Minimum Spanning Tree",
      "P-NP Theory",
      "Planar Graph",
      "Shortest Path",
      "Sorting"
    ],
    "Theory of Computation": [
      "Push-down Automata",
      "Recursive Language",
      "Regular Expression",
      "Regular Grammar",
      "Regular Language",
      "Theory of Computation",
      "Turing Machine",
      "Undecidability"
    ],
    "Compiler Design": [
      "Intermediate Code Generation",
      "Lexical Analysis",
      "Parsing",
      "Runtime Environment",
      "Syntax-directed Translation"
    ],
    "Operating System": [
      "File System",
      "Memory Management",
      "Operating System",
      "Process",
      "Process Synchronization",
      "System Call",
      "Thread"
    ],
    "Databases": [
      "ER Model",
      "Integrity Constraints",
      "Normal Form",
      "SQL",
      "Transaction",
      "Transactions"
    ],
    "Computer Networks": [
      "Computer Network",
      "Data Link Layer",
      "Network Layer Protocol",
      "Network Security",
      "OSI Layer",
      "Physical Layer",
      "Transport Layer Protocol",
      "Web Technology"
    ]
  },
  "ME": {
    "General Aptitude": [
      "Numerical Ability",
      "Verbal Ability",
      "Spatial Aptitude",
      "Logical Reasoning",
      "Analytical Aptitude"
    ],
    "Engineering Mathematics": [
      "Engineering Mathematics",
      "Inventory Control",
      "Linear Algebra",
      "Linear Programming",
      "Numerical Methods",
      "PERT and CPM",
      "Probability and Statistics",
      "Queuing Theory and Transportation"
    ],
    "Applied Mechanics and Design": [
      "FBD, Equilirbium, Plane Trusses and Virtual work",
      "Friction",
      "Gear and Gear Train",
      "Gears",
      "Gyroscope",
      "Machine Design",
      "Mohr's Circle",
      "Planar Mechanisms",
      "Plane Motion",
      "Power System",
      "Shear-force and Bending Moment Diagrams",
      "Springs",
      "Strain Energy and Thermal Stresses",
      "Strength of Materials",
      "Stress and Strain",
      "Stress-strain Relationship and Elastic Constants",
      "Thin Cylinder",
      "Torsion of Shafts",
      "Vibration",
      "Impulse and Momentum, Energy Formulations",
      "Static Dynamic Loading and Failure Theories",
      "Theory of Machine",
      "Translation and Rotation"
    ],
    "Fluid Mechanics and Thermal Sciences": [
      "Fluid Mechanics",
      "Fluid Properties",
      "Fluid Statics",
      "Heat Exchanger",
      "Heat Pumps and Cycles",
      "Heat Transfer",
      "Heat Transfer in Flow Over Plates and Pipes",
      "IC Engine",
      "Manufacturing Engineering",
      "Properties of Moist Air",
      "Psychrometric Process",
      "Pure Substances",
      "Radiation",
      "Second Law, Carnot Cycle and Entropy",
      "Thermodynamic System and Processes",
      "Thermodynamics",
      "Turbines and Pumps",
      "Vapor and Gas Refrigeration",
      "Viscous, Turbulent Flow and Boundary Layer Theory"
    ],
    "Materials, Manufacturing and Industrial Engineering": [
      "Joining-Welding",
      "Machining and Machine Tool Operation",
      "Metrology and Inspection",
      "Production Planning and Control",
      "Sheet Metal Operation"
    ]
  },
  "EE": {
    "General Aptitude": [
      "Numerical Ability",
      "Verbal Ability",
      "Spatial Aptitude",
      "Logical Reasoning",
      "Analytical Aptitude"
    ],
    "Engineering Mathematics": [
      "Engineering Mathematics",
      "Linear Algebra",
      "Numerical Methods",
      "Probability and Statistics"
    ],
    "Electric Circuits": [
      "Electric Circuits",
      "Magnetically Coupled Circuits, Network Topology and Filters",
      "Network Theorems",
      "Resonance and Locus Diagrams",
      "Steady State AC Analysis",
      "Three-Phase Circuits",
      "Two Port Network and Network Functions",
      "Transients and Steady State Response"
    ],
    "Electromagnetic Fields": [
      "Electromagnetic Theory",
      "Electrostatic Fields",
      "Magnetostatic Fields",
      "Time Varying Fields"
    ],
    "Signals and Systems": [
      "Introduction of C.T. and D.T. Signals",
      "Laplace Transform",
      "Linear Time Invariant Systems",
      "Sampling",
      "Signals and Systems",
      "Z-Transform"
    ],
    "Electrical Machines": [
      "Electrical Machines",
      "Instrument Transformers",
      "Single Phase Induction Motors, Special Purpose Machines and Electromechanical Energy Conversion System",
      "Synchronous Machines",
      "Transformers",
      "Three Phase Induction Machines"
    ],
    "Power Systems": [
      "Generating Power Stations",
      "Load Flow Studies",
      "Per Unit System",
      "Performance of Transmission Lines, Line Parameters and Corona",
      "Power System Stability",
      "Power System Transients",
      "Power Systems",
      "Switch Gear and Protection",
      "High Voltage DC Transmission"
    ],
    "Control Systems": [
      "Control Systems",
      "Design of Control Systems",
      "Feedback Characteristics of Control Systems",
      "Frequency Response Analysis",
      "Mathematical Models of Physical Systems",
      "Root Locus Techniques",
      "State Variable Analysis",
      "Time Response Analysis"
    ],
    "Electrical and Electronic Measurements": [
      "Electrical and Electronic Measurements",
      "Galvanometers, Voltmeters and Ammeters",
      "Measurement of Energy and Power",
      "Measurement of Resistance and Potentiometers"
    ],
    "Analog and Digital Electronics": [
      "BJT, FET and their Biasing Circuits",
      "Digital Electronics",
      "Diodes and their Applications",
      "Logic Families and Miscellaneous",
      "Logic Gates",
      "Microprocessors",
      "Operational Amplifiers",
      "Oscillators and Feedback Amplifiers",
      "Sequential Logic Circuits",
      "Small Signal Analysis"
    ],
    "Power Electronics": [
      "Inverters",
      "Phase Controlled Rectifiers",
      "Power Electronics",
      "Power Semiconductor Devices and Commutation Techniques"
    ]
  },
  "IT": {
    "General Aptitude": [
      "Numerical Ability",
      "Spatial Aptitude",
      "Logical Reasoning",
      "Analytical Aptitude"
    ],
    "Engineering Mathematics": [
      "Discrete Mathematics",
      "Engineering Mathematics",
      "Group Theory",
      "Lattice",
      "Linear Algebra",
      "Number System",
      "Numerical Method",
      "Probability Theory",
      "Propositional Logic",
      "Recurrence",
      "Recurrence Relation",
      "Relation",
      "Relational Algebra",
      "Set Theory",
      "Tuple Calculus"
    ],
    "Digital Logic": [
      "Digital Logic",
      "Sequential Circuit"
    ],
    "Computer Organization and Architecture": [
      "Computer Organization",
      "IO Interface",
      "Machine Instruction",
      "Memory Chip Design",
      "Pipeline Processor",
      "Secondary Storage"
    ],
    "Programming and Data Structures": [
      "C Programming",
      "Conditional Statement",
      "Data Structure",
      "Function",
      "Functions",
      "Hashing",
      "Heap Tree",
      "Link List",
      "Queue",
      "Stack"
    ],
    "Algorithms": [
      "Asymptotic Notation",
      "Graph Theory",
      "Graph Traversal",
      "Greedy Technique",
      "Minimum Spanning Tree",
      "P-NP Theory",
      "Shortest Path",
      "Sorting"
    ],
    "Theory of Computation": [
      "Push-down Automata",
      "Regular Expression",
      "Regular Grammar",
      "Regular Language",
      "Theory of Computation"
    ],
    "Compiler Design": [
      "Parsing",
      "Runtime Environment"
    ],
    "Operating System": [
      "File System",
      "Memory Management",
      "Operating System",
      "Process",
      "Process Synchronization",
      "System Call",
      "Thread"
    ],
    "Databases": [
      "ER Model",
      "Normal Form",
      "SQL",
      "Transaction"
    ],
    "Computer Networks": [
      "Computer Network",
      "Data Link Layer",
      "Network Layer Protocol",
      "Network Security",
      "Physical Layer",
      "Transport Layer Protocol",
      "Web Technology"
    ]
  }
};

// Unclassifiable legacy labels are retained separately, not counted as canonical subjects.
// Their migration target is the explicit pseudo-subject "Other / Legacy Topics".
const LEGACY_TOPICS = {
  "EC": [
    "Miscellaneous Topics"
  ],
  "CS": [
    "ISRO CSE 2007",
    "ISRO CSE 2008",
    "ISRO CSE 2009",
    "ISRO CSE 2011",
    "ISRO CSE 2015",
    "ISRO CSE 2016",
    "ISRO CSE 2018",
    "ISRO CSE 2020",
    "Software Engg"
  ],
  "EE": [
    "Miscellaneous"
  ],
  "IT": [
    "Software Engg"
  ]
};

// Reverse lookup used by legacy-row migration and topic-to-subject resolution.
const TOPIC_TO_SUBJECT = Object.create(null);
Object.entries(TAXONOMY).forEach(([branch, subjects]) => {
  Object.entries(subjects).forEach(([subject, topics]) => {
    topics.forEach(topic => {
      const key = `${branch}|${String(topic).trim().toLowerCase()}`;
      if (TOPIC_TO_SUBJECT[key] && TOPIC_TO_SUBJECT[key] !== subject) {
        throw new Error(`Duplicate taxonomy topic mapping: ${key}`);
      }
      TOPIC_TO_SUBJECT[key] = subject;
    });
  });
});
Object.entries(LEGACY_TOPICS).forEach(([branch, topics]) => topics.forEach(topic => {
  const key = `${branch}|${String(topic).trim().toLowerCase()}`;
  if (TOPIC_TO_SUBJECT[key]) throw new Error(`Duplicate legacy topic mapping: ${key}`);
  TOPIC_TO_SUBJECT[key] = "Other / Legacy Topics";
}));

// Backward-compatible topic lists for the existing single-select practice UI.
// Phase 3 will replace these consumers with subject/topic multi-select pickers.
const GP_SUBJECTS = Object.fromEntries(Object.entries(TAXONOMY).map(([branch, subjects]) => [
  branch,
  [...new Set([...Object.values(subjects).flat(), ...(LEGACY_TOPICS[branch] || [])])].sort((a, b) => a.localeCompare(b))
]));

// GATE pattern constants are centralized here; empirical subject/type weights are Phase 2.
const PATTERN = Object.freeze({ ga1: 5, ga2: 5, core1: 25, core2: 30, minutes: 180 });
const WEIGHT = Object.freeze({}); // populated only after Phase 2 PYQ analysis
