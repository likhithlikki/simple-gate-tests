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
      "Probability and Statistics",
      "Combinatorics and Probability"
    ],
    "Linear Algebra": [
      "Linear Algebra"
    ],
    "Calculus and Optimization": [
      "Calculus and Optimization",
      "Differentiation and Optimization",
      "Limits and Series"
    ],
    "Programming, Data Structures and Algorithms": [
      "Programming in Python",
      "Data Structures and Algorithms",
      "Sorting and Searching",
      "Graph Algorithms",
      "Trees and Traversals",
      "Hashing"
    ],
    "Database Management and Warehousing": [
      "Database Management and Warehousing",
      "Relational Algebra and SQL",
      "Database Design and Normalization",
      "Data Warehousing and OLAP",
      "Indexing and Transactions"
    ],
    "Machine Learning": [
      "Machine Learning",
      "Model Derivatives and Activation Functions"
    ],
    "Artificial Intelligence": [
      "Artificial Intelligence",
      "Search Algorithms",
      "Game Trees and Adversarial Search",
      "Logic and Knowledge Representation"
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

// Phase 2: empirical subject weights and slot counts derived from the included PYQ JSON files.
const WEIGHT = Object.freeze({
  "EC": {
    "Electromagnetic Theory": 8,
    "Control Systems": 9,
    "Engineering Mathematics": 13,
    "Signals and Systems": 9,
    "Communications": 11,
    "Electronic Devices and Circuits (EDC)": 8,
    "Analog Electronics": 9,
    "Digital Electronics": 9,
    "Network Theory": 9
  },
  "CE": {
    "Structural Engineering": 16,
    "Water Resources Engineering": 14,
    "Transportation Engineering": 10,
    "Construction Materials and Management": 1,
    "Engineering Mathematics": 16,
    "Environmental Engineering": 10,
    "Geomatics Engineering": 4,
    "Geotechnical Engineering": 14
  },
  "DA": {
    "Database Management and Warehousing": 12,
    "Calculus and Optimization": 6,
    "Machine Learning": 14,
    "Probability and Statistics": 20,
    "Linear Algebra": 10,
    "Programming, Data Structures and Algorithms": 16,
    "Artificial Intelligence": 7
  },
  "CS": {
    "Engineering Mathematics": 18,
    "Databases": 4,
    "Computer Networks": 8,
    "Operating System": 9,
    "Algorithms": 8,
    "Theory of Computation": 9,
    "Programming and Data Structures": 12,
    "Compiler Design": 5,
    "Digital Logic": 4,
    "Computer Organization and Architecture": 8
  },
  "ME": {
    "Materials, Manufacturing and Industrial Engineering": 11,
    "Fluid Mechanics and Thermal Sciences": 27,
    "Engineering Mathematics": 23,
    "Applied Mechanics and Design": 24
  },
  "EE": {
    "Engineering Mathematics": 18,
    "Electromagnetic Fields": 5,
    "Power Systems": 8,
    "Signals and Systems": 7,
    "Power Electronics": 9,
    "Electric Circuits": 8,
    "Electrical Machines": 11,
    "Analog and Digital Electronics": 8,
    "Control Systems": 8,
    "Electrical and Electronic Measurements": 3
  },
  "IT": {
    "Engineering Mathematics": 18,
    "Databases": 4,
    "Computer Networks": 8,
    "Operating System": 9,
    "Algorithms": 8,
    "Theory of Computation": 9,
    "Programming and Data Structures": 12,
    "Compiler Design": 5,
    "Digital Logic": 4,
    "Computer Organization and Architecture": 8
  }
});
const SUBJECT_COUNTS = Object.freeze({
  "EC": {
    "Electromagnetic Theory": { "one": 2, "two": 3 },
    "Control Systems": { "one": 3, "two": 3 },
    "Engineering Mathematics": { "one": 3, "two": 5 },
    "Signals and Systems": { "one": 3, "two": 3 },
    "Communications": { "one": 3, "two": 4 },
    "Electronic Devices and Circuits (EDC)": { "one": 2, "two": 3 },
    "Analog Electronics": { "one": 3, "two": 3 },
    "Digital Electronics": { "one": 3, "two": 3 },
    "Network Theory": { "one": 3, "two": 3 }
  },
  "CE": {
    "Structural Engineering": {
      "one": 4,
      "two": 6
    },
    "Water Resources Engineering": {
      "one": 4,
      "two": 5
    },
    "Transportation Engineering": {
      "one": 2,
      "two": 4
    },
    "Construction Materials and Management": {
      "one": 1,
      "two": 0
    },
    "Engineering Mathematics": {
      "one": 8,
      "two": 4
    },
    "Environmental Engineering": {
      "one": 2,
      "two": 4
    },
    "Geomatics Engineering": {
      "one": 2,
      "two": 1
    },
    "Geotechnical Engineering": {
      "one": 2,
      "two": 6
    }
  },
  "DA": {
    "Database Management and Warehousing": {
      "one": 4,
      "two": 4
    },
    "Calculus and Optimization": {
      "one": 2,
      "two": 2
    },
    "Machine Learning": {
      "one": 4,
      "two": 5
    },
    "Probability and Statistics": {
      "one": 6,
      "two": 7
    },
    "Linear Algebra": {
      "one": 2,
      "two": 4
    },
    "Programming, Data Structures and Algorithms": {
      "one": 4,
      "two": 6
    },
    "Artificial Intelligence": {
      "one": 3,
      "two": 2
    }
  },
  "CS": {
    "Engineering Mathematics": {
      "one": 8,
      "two": 5
    },
    "Databases": {
      "one": 0,
      "two": 2
    },
    "Computer Networks": {
      "one": 2,
      "two": 3
    },
    "Operating System": {
      "one": 3,
      "two": 3
    },
    "Algorithms": {
      "one": 2,
      "two": 3
    },
    "Theory of Computation": {
      "one": 3,
      "two": 3
    },
    "Programming and Data Structures": {
      "one": 4,
      "two": 4
    },
    "Compiler Design": {
      "one": 1,
      "two": 2
    },
    "Digital Logic": {
      "one": 0,
      "two": 2
    },
    "Computer Organization and Architecture": {
      "one": 2,
      "two": 3
    }
  },
  "ME": {
    "Materials, Manufacturing and Industrial Engineering": {
      "one": 3,
      "two": 4
    },
    "Fluid Mechanics and Thermal Sciences": {
      "one": 7,
      "two": 10
    },
    "Engineering Mathematics": {
      "one": 11,
      "two": 6
    },
    "Applied Mechanics and Design": {
      "one": 4,
      "two": 10
    }
  },
  "EE": {
    "Engineering Mathematics": {
      "one": 8,
      "two": 5
    },
    "Electromagnetic Fields": {
      "one": 1,
      "two": 2
    },
    "Power Systems": {
      "one": 2,
      "two": 3
    },
    "Signals and Systems": {
      "one": 3,
      "two": 2
    },
    "Power Electronics": {
      "one": 1,
      "two": 4
    },
    "Electric Circuits": {
      "one": 2,
      "two": 3
    },
    "Electrical Machines": {
      "one": 3,
      "two": 4
    },
    "Analog and Digital Electronics": {
      "one": 2,
      "two": 3
    },
    "Control Systems": {
      "one": 2,
      "two": 3
    },
    "Electrical and Electronic Measurements": {
      "one": 1,
      "two": 1
    }
  },
  "IT": {
    "Engineering Mathematics": {
      "one": 8,
      "two": 5
    },
    "Databases": {
      "one": 0,
      "two": 2
    },
    "Computer Networks": {
      "one": 2,
      "two": 3
    },
    "Operating System": {
      "one": 3,
      "two": 3
    },
    "Algorithms": {
      "one": 2,
      "two": 3
    },
    "Theory of Computation": {
      "one": 3,
      "two": 3
    },
    "Programming and Data Structures": {
      "one": 4,
      "two": 4
    },
    "Compiler Design": {
      "one": 1,
      "two": 2
    },
    "Digital Logic": {
      "one": 0,
      "two": 2
    },
    "Computer Organization and Architecture": {
      "one": 2,
      "two": 3
    }
  }
});
const TYPE_SHARE = Object.freeze({
  "EC": {
    "MCQ": 0.5906183368869936,
    "MSQ": 0.09168443496801706,
    "NAT": 0.31769722814498935
  },
  "CE": {
    "MCQ": 0.5176848874598071,
    "MSQ": 0.07395498392282958,
    "NAT": 0.40836012861736337
  },
  "DA": {
    "MCQ": 0.4727272727272727,
    "MSQ": 0.24848484848484848,
    "NAT": 0.2787878787878788
  },
  "CS": {
    "MCQ": 0.4437869822485207,
    "MSQ": 0.23668639053254437,
    "NAT": 0.31952662721893493
  },
  "ME": {
    "MCQ": 0.5610738255033557,
    "MSQ": 0.03087248322147651,
    "NAT": 0.4080536912751678
  },
  "EE": {
    "MCQ": 0.591792656587473,
    "MSQ": 0.032397408207343416,
    "NAT": 0.3758099352051836
  },
  "IT": {
    "MCQ": 0.4437869822485207,
    "MSQ": 0.23668639053254437,
    "NAT": 0.31952662721893493
  }
});
const WEIGHTAGE_SOURCE = Object.freeze({
  "EC": {
    "source_branch": "EC",
    "years": [
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "paper_count": 8,
    "mapped_questions": 469,
    "unmapped_questions": 0,
    "legacy_questions_excluded": 3,
    "ga_questions": 60,
    "ga_marks": 90,
    "manual_topic_classifications": 0,
    "proxy": false
  },
  "CE": {
    "source_branch": "CE",
    "years": [
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "paper_count": 16,
    "mapped_questions": 933,
    "unmapped_questions": 28,
    "legacy_questions_excluded": 0,
    "ga_questions": 159,
    "ga_marks": 239,
    "manual_topic_classifications": 0,
    "proxy": false
  },
  "DA": {
    "source_branch": "DA",
    "years": [
      2024,
      2025,
      2026
    ],
    "paper_count": 3,
    "mapped_questions": 165,
    "unmapped_questions": 0,
    "legacy_questions_excluded": 0,
    "ga_questions": 30,
    "ga_marks": 45,
    "manual_topic_classifications": 71,
    "proxy": false
  },
  "CS": {
    "source_branch": "CS",
    "years": [
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "paper_count": 12,
    "mapped_questions": 676,
    "unmapped_questions": 1,
    "legacy_questions_excluded": 0,
    "ga_questions": 120,
    "ga_marks": 180,
    "manual_topic_classifications": 0,
    "proxy": false
  },
  "ME": {
    "source_branch": "ME",
    "years": [
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "paper_count": 12,
    "mapped_questions": 745,
    "unmapped_questions": 1,
    "legacy_questions_excluded": 0,
    "ga_questions": 120,
    "ga_marks": 181,
    "manual_topic_classifications": 0,
    "proxy": false
  },
  "EE": {
    "source_branch": "EE",
    "years": [
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "paper_count": 8,
    "mapped_questions": 463,
    "unmapped_questions": 0,
    "legacy_questions_excluded": 2,
    "ga_questions": 50,
    "ga_marks": 75,
    "manual_topic_classifications": 0,
    "proxy": false
  },
  "IT": {
    "source_branch": "CS",
    "years": [
      2019,
      2020,
      2021,
      2022,
      2023,
      2024,
      2025,
      2026
    ],
    "paper_count": 12,
    "mapped_questions": 676,
    "unmapped_questions": 1,
    "legacy_questions_excluded": 0,
    "ga_questions": 120,
    "ga_marks": 180,
    "manual_topic_classifications": 0,
    "proxy": true
  }
});
const WEIGHTAGE_METHOD = "Subject weights are the equal-session average of each subject share of mapped core marks across available GATE PYQ papers from 2019-2026, scaled to 85 and rounded by largest remainder. The 30 two-mark slots are allocated using observed subject-level two-mark frequencies, capped so no subject exceeds half its WEIGHT; the remaining subject marks become 1-mark slots. This reconciliation guarantees one + 2*two equals each subject WEIGHT while core totals remain exactly 25 one-mark and 30 two-mark slots. General Aptitude is fixed at 15 marks (5 x 1 + 5 x 2). DA 71 unlabeled questions were manually classified from question text; 28 CE, 3 EC legacy, 2 EE legacy, 1 CS and 1 ME records remain excluded from subject-weight calculations. IT uses the CS 2019-2026 distribution because the repository IT archive has no 2019-2026 papers.";
const PATTERN = Object.freeze({ ga1: 5, ga2: 5, core1: 25, core2: 30, totalQuestions: 65, totalMarks: 100, minutes: 180 });
const OTHER_SUBJECT = "Other / Legacy Topics";
const SUBJECTS_BY_BRANCH = Object.fromEntries(Object.entries(TAXONOMY).map(([branch, subjects]) => [
  branch, [...Object.keys(subjects), ...((LEGACY_TOPICS[branch] || []).length ? [OTHER_SUBJECT] : [])]
]));

/* ---- v2 additions: EC calibration note, topic merging, flexible types, randomised GA ---- */
// EC marks per subject were re-calibrated by hand (the raw PYQ mapping gave Analog 3 / Network 6, which is far from
// the real paper). Each subject still satisfies one + 2*two = marks, totals stay 25 one-mark + 30 two-mark = 85 core marks.
const EC_CALIBRATION_NOTE = "EC subject marks are a manual calibration of the PYQ analysis (see TASK-19).";
const IT_NOTE = "GATE has had no separate IT paper since 2014; IT questions are part of the CS paper, so IT uses the CS pattern and weightage.";

// Topics that mean the same thing are merged when a practice test is built, so one idea never gets two slots.
// Original labels stay in TAXONOMY / TOPIC_TO_SUBJECT so old rows and migration keep working.
const TOPIC_ALIASES = {
  EC: {
    "Graph Theory": "Graph Theory and State Equations", "State Equations": "Graph Theory and State Equations",
    "Sinusoidal Steady State": "Sinusoidal Steady State Analysis",
    "Diodes Applications": "Diode Applications",
    "Finite State Machine and Miscellaneous": "Finite State Machine",
    "Instructions of 8085 Microprocessor": "Microprocessors", "Microprocessor 8085 Interrupts": "Microprocessors",
    "Microprocessor 8085 Programming": "Microprocessors", "Interfacing and Peripheral Devices": "Microprocessors",
    "Microprocessors (8085: instructions, programming, interrupts, interfacing)": "Microprocessors",
    "Communication Systems": "Communication Systems (AM/FM)",
    "Electromagnetics": "Maxwell's Equations",
    "Digital Circuits": "Combinational Circuits"
  },
  CS: { "Transaction": "Transactions", "Recurrence": "Recurrence Relation" },
  IT: { "Transaction": "Transactions", "Recurrence": "Recurrence Relation" }
};
function gpBlueprintTopics(branch, subject) {
  const tax = TAXONOMY[branch] || {};
  const raw = tax[subject] || (subject === OTHER_SUBJECT ? (LEGACY_TOPICS[branch] || []) : []);
  const alias = TOPIC_ALIASES[branch] || {};
  const seen = new Set(), out = [];
  raw.forEach(t => {
    const name = alias[t] || t;
    if (String(name).trim().toLowerCase() === String(subject).trim().toLowerCase()) return; // generic catch-all label
    const key = name.toLowerCase();
    if (!seen.has(key)) { seen.add(key); out.push(name); }
  });
  return out.length ? out : raw.slice(0, 1);
}

function gpShuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function spreadTopics(topics, n) {
  const values = [...new Set((topics || []).filter(x => x !== undefined && x !== null && String(x).trim() !== ''))];
  n = Math.max(0, Math.floor(Number(n) || 0));
  if (!n || !values.length) return [];
  const out = [];
  while (out.length < n) out.push(...gpShuffle(values).slice(0, Math.min(values.length, n - out.length)));
  return gpShuffle(out);
}
function gpLargestRemainder(weights, n) {
  const entries = Object.entries(weights || {}).filter(([,v]) => Number(v) > 0);
  const total = entries.reduce((s,[,v]) => s + Number(v), 0);
  if (!n || !entries.length || !total) return [];
  const rows = entries.map(([key,value]) => ({ key, raw: Number(value) / total * n, count: Math.floor(Number(value) / total * n) }));
  let left = n - rows.reduce((s,r) => s + r.count, 0);
  rows.sort((a,b) => (b.raw-b.count) - (a.raw-a.count));
  for (let i=0; i<left; i++) rows[i % rows.length].count++;
  return rows.flatMap(r => Array(r.count).fill(r.key));
}
function spreadTypes(n, mode = "mix", shares = null) {
  const base = shares || { MCQ: .50, NAT: .35, MSQ: .15 };
  let ratio;
  if (Array.isArray(mode)) {
    // mode is a list of chosen types, e.g. ["MCQ","NAT"]: keep their usual proportions among the chosen ones
    const chosen = [...new Set(mode.map(x => String(x).toUpperCase()).filter(x => ["MCQ", "MSQ", "NAT"].includes(x)))];
    ratio = {};
    (chosen.length ? chosen : ["MCQ", "MSQ", "NAT"]).forEach(t => { ratio[t] = Math.max(.05, Number(base[t]) || .05); });
  } else {
    ratio = mode === "mix" ? base
      : mode === "mcq" ? { MCQ: 1 }
      : mode === "nat" ? { NAT: 1 }
      : mode === "msq" ? { MSQ: 1 }
      : mode === "mcqnat" ? { MCQ: .60, NAT: .40 }
      : mode === "mcqmsq" ? { MCQ: .75, MSQ: .25 }
      : mode === "natmsq" ? { NAT: .70, MSQ: .30 }
      : base;
  }
  return gpShuffle(gpLargestRemainder(ratio, Math.max(0, Math.floor(Number(n) || 0))));
}
function spreadMarks(n, mode = "mix") {
  n = Math.max(0, Math.floor(Number(n) || 0));
  if (mode === "1") return Array(n).fill(1);
  if (mode === "2") return Array(n).fill(2);
  const ones = Math.ceil(n / 2), twos = n - ones;
  return gpShuffle([...Array(ones).fill(1), ...Array(twos).fill(2)]);
}
function gpTopicEntries(branch, selectedSubjects, selectedTopics) {
  const tax = TAXONOMY[branch] || {};
  const subjects = selectedSubjects && selectedSubjects.length ? selectedSubjects : Object.keys(tax);
  const chosen = Array.isArray(selectedTopics) ? selectedTopics : [];
  if (chosen.length) {
    return chosen.map(item => {
      if (typeof item === "string") {
        const mapped = TOPIC_TO_SUBJECT[branch + "|" + item.trim().toLowerCase()];
        const subject = mapped || subjects[0] || Object.keys(tax)[0] || "Custom Subject";
        return { subject, topic: item };
      }
      const owner = item.subject;
      const validOwner = owner && (subjects.includes(owner) || tax[owner] || owner === OTHER_SUBJECT);
      return { subject: validOwner ? owner : (subjects[0] || Object.keys(tax)[0] || "Custom Subject"), topic: item.topic || "AI-selected topic" };
    }).filter(x => x.subject && x.topic);
  }
  const entries = [];
  subjects.forEach(subject => {
    const topics = gpBlueprintTopics(branch, subject);
    if (topics.length) topics.forEach(topic => entries.push({ subject, topic }));
    else entries.push({ subject, topic: "AI-selected topic" });
  });
  return entries;
}
function customBlueprint(opts = {}) {
  const branch = String(opts.branch || "EC").toUpperCase();
  const n = Math.min(65, Math.max(1, Math.floor(Number(opts.count) || 10)));
  const subjects = (opts.subjects || []).map(String);
  const topics = gpTopicEntries(branch, subjects, opts.topics || []);
  if (!topics.length) throw new Error("Choose at least one subject or topic.");
  const chosen = [];
  const bySubject = new Map();
  topics.forEach(entry => { if (!bySubject.has(entry.subject)) bySubject.set(entry.subject, []); bySubject.get(entry.subject).push(entry); });
  if (n >= bySubject.size) bySubject.forEach(entries => chosen.push(gpShuffle(entries)[0]));
  let remaining = topics.filter(entry => !chosen.some(x => x.subject === entry.subject && x.topic === entry.topic));
  while (chosen.length < n) {
    if (!remaining.length) remaining = topics.slice();
    const batch = gpShuffle(remaining).slice(0, Math.min(remaining.length, n - chosen.length));
    chosen.push(...batch);
    const used = new Set(chosen.map(x => x.subject + "\u001f" + x.topic));
    remaining = topics.filter(entry => !used.has(entry.subject + "\u001f" + entry.topic));
  }
  const types = spreadTypes(n, (Array.isArray(opts.types) ? (opts.types.length ? opts.types : "mix") : (opts.types || "mix")));
  const marks = spreadMarks(n, opts.marks || "mix");
  return gpShuffle(chosen.map((entry, i) => ({ slot: i + 1, subject: entry.subject, topic: entry.topic, type: types[i], marks: marks[i] })))
    .map((q, i) => ({ ...q, slot: i + 1 }));
}
function fullBlueprint(branch) {
  branch = String(branch || "EC").toUpperCase();
  const sourceBranch = branch === "IT" ? "CS" : branch;
  const taxonomy = TAXONOMY[branch] || TAXONOMY[sourceBranch];
  const counts = SUBJECT_COUNTS[sourceBranch] || SUBJECT_COUNTS["CS"];
  const shares = TYPE_SHARE[sourceBranch] || TYPE_SHARE["CS"];
  if (!taxonomy || !counts) throw new Error("No full-paper blueprint is configured for " + branch + ".");
  // General Aptitude: 5 one-mark then 5 two-mark, all MCQ, topic mix differs per paper like the real GATE
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const verbalOnes = Math.random() < .5 ? 2 : 3;
  const gaOne = gpShuffle([...Array(verbalOnes).fill("Verbal Ability"), ...Array(5 - verbalOnes).fill("Numerical Ability")])
    .map(topic => ({ subject: "General Aptitude", topic, type: "MCQ", marks: 1 }));
  const gaTwo = gpShuffle(["Spatial Aptitude", pick(["Logical Reasoning", "Analytical Aptitude"]), "Numerical Ability", "Numerical Ability", pick(["Verbal Ability", "Numerical Ability"])])
    .map(topic => ({ subject: "General Aptitude", topic, type: "MCQ", marks: 2 }));
  const ga = [...gaOne, ...gaTwo];
  const core = [];
  Object.entries(counts).forEach(([subject, c]) => {
    const topics = gpBlueprintTopics(taxonomy === TAXONOMY[branch] ? branch : sourceBranch, subject);
    const spread = spreadTopics(topics.length ? topics : ["Core Concepts"], (c.one || 0) + (c.two || 0));
    const marks = [...Array(c.one || 0).fill(1), ...Array(c.two || 0).fill(2)];
    spread.forEach((topic, i) => core.push({ subject, topic, marks: marks[i] }));
  });
  if (core.length !== 55 || core.filter(q => q.marks === 1).length !== 25 || core.filter(q => q.marks === 2).length !== 30)
    throw new Error("Invalid core blueprint for " + branch + ": expected 55 questions, 25 one-mark and 30 two-mark.");
  const types = spreadTypes(55, "mix", shares);
  core.forEach((q, i) => { q.type = types[i]; });
  const slots = [...ga, ...gpShuffle(core)];
  return slots.map((q, i) => ({ slot: i + 1, ...q }));
}
function splitParts(blueprint, maxPerPart = 20) {
  const size = Math.max(1, Math.floor(Number(maxPerPart) || 20));
  const parts = [];
  for (let i = 0; i < blueprint.length; i += size) parts.push(blueprint.slice(i, i + size));
  return parts.map((slots, i) => ({ part: i + 1, totalParts: parts.length, slots }));
}
