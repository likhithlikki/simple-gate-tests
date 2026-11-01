/* GATE Practice question-bank backend. Kept separate from the previous-year Questions/Results API. */
const GP_QUESTIONS_TAB = "Practice Questions";
const GP_MAX_PER_UPLOAD = 100;
const GP_HEADERS = ["id", "branch", "subject", "topic", "type", "marks", "negative_marks", "question", "options", "answer", "explanation", "created_at", "source"];
const GP_SUBJECTS_BY_BRANCH = {
  "EC": [
    "General Aptitude",
    "Engineering Mathematics",
    "Network Theory",
    "Electronic Devices and Circuits (EDC)",
    "Analog Electronics",
    "Digital Electronics",
    "Communications",
    "Signals and Systems",
    "Electromagnetic Theory",
    "Control Systems",
    "Other / Legacy Topics"
  ],
  "CE": [
    "General Aptitude",
    "Engineering Mathematics",
    "Structural Engineering",
    "Geotechnical Engineering",
    "Water Resources Engineering",
    "Environmental Engineering",
    "Transportation Engineering",
    "Geomatics Engineering",
    "Construction Materials and Management"
  ],
  "DA": [
    "General Aptitude",
    "Probability and Statistics",
    "Linear Algebra",
    "Calculus and Optimization",
    "Programming, Data Structures and Algorithms",
    "Database Management and Warehousing",
    "Machine Learning",
    "Artificial Intelligence"
  ],
  "CS": [
    "General Aptitude",
    "Engineering Mathematics",
    "Digital Logic",
    "Computer Organization and Architecture",
    "Programming and Data Structures",
    "Algorithms",
    "Theory of Computation",
    "Compiler Design",
    "Operating System",
    "Databases",
    "Computer Networks",
    "Other / Legacy Topics"
  ],
  "ME": [
    "General Aptitude",
    "Engineering Mathematics",
    "Applied Mechanics and Design",
    "Fluid Mechanics and Thermal Sciences",
    "Materials, Manufacturing and Industrial Engineering"
  ],
  "EE": [
    "General Aptitude",
    "Engineering Mathematics",
    "Electric Circuits",
    "Electromagnetic Fields",
    "Signals and Systems",
    "Electrical Machines",
    "Power Systems",
    "Control Systems",
    "Electrical and Electronic Measurements",
    "Analog and Digital Electronics",
    "Power Electronics",
    "Other / Legacy Topics"
  ],
  "IT": [
    "General Aptitude",
    "Engineering Mathematics",
    "Digital Logic",
    "Computer Organization and Architecture",
    "Programming and Data Structures",
    "Algorithms",
    "Theory of Computation",
    "Compiler Design",
    "Operating System",
    "Databases",
    "Computer Networks",
    "Other / Legacy Topics"
  ]
};
const GP_TOPIC_TO_SUBJECT = {
  "EC|numerical ability": "General Aptitude",
  "EC|verbal ability": "General Aptitude",
  "EC|spatial aptitude": "General Aptitude",
  "EC|logical reasoning": "General Aptitude",
  "EC|analytical aptitude": "General Aptitude",
  "EC|engineering mathematics": "Engineering Mathematics",
  "EC|linear algebra": "Engineering Mathematics",
  "EC|numerical methods": "Engineering Mathematics",
  "EC|probability and statistics": "Engineering Mathematics",
  "EC|calculus": "Engineering Mathematics",
  "EC|differential equations": "Engineering Mathematics",
  "EC|complex variables": "Engineering Mathematics",
  "EC|transform theory": "Engineering Mathematics",
  "EC|graph theory and state equations": "Network Theory",
  "EC|network functions": "Network Theory",
  "EC|network theorems": "Network Theory",
  "EC|network theory": "Network Theory",
  "EC|sinusoidal steady state": "Network Theory",
  "EC|sinusoidal steady state analysis": "Network Theory",
  "EC|transient analysis": "Network Theory",
  "EC|two port networks": "Network Theory",
  "EC|graph theory": "Network Theory",
  "EC|state equations": "Network Theory",
  "EC|bjt analysis": "Electronic Devices and Circuits (EDC)",
  "EC|diodes applications": "Electronic Devices and Circuits (EDC)",
  "EC|electronic devices": "Electronic Devices and Circuits (EDC)",
  "EC|fet and mosfet analysis": "Electronic Devices and Circuits (EDC)",
  "EC|ic fabrication": "Electronic Devices and Circuits (EDC)",
  "EC|pn-junction diodes and special diodes": "Electronic Devices and Circuits (EDC)",
  "EC|diode applications": "Electronic Devices and Circuits (EDC)",
  "EC|feedback amplifiers": "Analog Electronics",
  "EC|frequency response of amplifier": "Analog Electronics",
  "EC|multivibrators and 555 timer": "Analog Electronics",
  "EC|operational amplifiers": "Analog Electronics",
  "EC|oscillator circuits": "Analog Electronics",
  "EC|digital circuits": "Digital Electronics",
  "EC|finite state machine and miscellaneous": "Digital Electronics",
  "EC|instructions of 8085 microprocessor": "Digital Electronics",
  "EC|logic families": "Digital Electronics",
  "EC|logic gates": "Digital Electronics",
  "EC|memories": "Digital Electronics",
  "EC|microprocessor 8085 interrupts": "Digital Electronics",
  "EC|microprocessor 8085 programming": "Digital Electronics",
  "EC|microprocessors": "Digital Electronics",
  "EC|number systems": "Digital Electronics",
  "EC|sequential circuits": "Digital Electronics",
  "EC|combinational circuits": "Digital Electronics",
  "EC|finite state machine": "Digital Electronics",
  "EC|microprocessors (8085: instructions, programming, interrupts, interfacing)": "Digital Electronics",
  "EC|interfacing and peripheral devices": "Digital Electronics",
  "EC|communication systems": "Communications",
  "EC|digital communication systems": "Communications",
  "EC|information theory and coding": "Communications",
  "EC|random signals and noise": "Communications",
  "EC|communication systems (am/fm)": "Communications",
  "EC|laplace transform": "Signals and Systems",
  "EC|lti systems continuous and discrete": "Signals and Systems",
  "EC|sampling": "Signals and Systems",
  "EC|signals and systems": "Signals and Systems",
  "EC|z-transform": "Signals and Systems",
  "EC|fourier series and transform": "Signals and Systems",
  "EC|electromagnetics": "Electromagnetic Theory",
  "EC|transmission lines": "Electromagnetic Theory",
  "EC|uniform plane waves": "Electromagnetic Theory",
  "EC|waveguides": "Electromagnetic Theory",
  "EC|maxwell's equations": "Electromagnetic Theory",
  "EC|antennas": "Electromagnetic Theory",
  "EC|control systems": "Control Systems",
  "EC|frequency response analysis": "Control Systems",
  "EC|root locus": "Control Systems",
  "EC|stability analysis": "Control Systems",
  "EC|state space analysis": "Control Systems",
  "EC|time response analysis": "Control Systems",
  "CE|numerical ability": "General Aptitude",
  "CE|verbal ability": "General Aptitude",
  "CE|spatial aptitude": "General Aptitude",
  "CE|logical reasoning": "General Aptitude",
  "CE|analytical aptitude": "General Aptitude",
  "CE|engineering mathematics": "Engineering Mathematics",
  "CE|linear algebra": "Engineering Mathematics",
  "CE|numerical methods": "Engineering Mathematics",
  "CE|ordinary differential equation": "Engineering Mathematics",
  "CE|partial differential equation": "Engineering Mathematics",
  "CE|probability and statistics": "Engineering Mathematics",
  "CE|design of steel structures": "Structural Engineering",
  "CE|influence line diagram and rolling loads": "Structural Engineering",
  "CE|matrix method of structural analysis": "Structural Engineering",
  "CE|methods of structural analysis": "Structural Engineering",
  "CE|plastic analysis": "Structural Engineering",
  "CE|prestressed concrete beams": "Structural Engineering",
  "CE|principal stress and principal strain": "Structural Engineering",
  "CE|rcc structures": "Structural Engineering",
  "CE|shear force and bending moment": "Structural Engineering",
  "CE|shear, torsion, bond, anchorage and development length": "Structural Engineering",
  "CE|solid mechanics": "Structural Engineering",
  "CE|structural analysis": "Structural Engineering",
  "CE|structural fasteners": "Structural Engineering",
  "CE|tension member": "Structural Engineering",
  "CE|theory of columns and shear centre": "Structural Engineering",
  "CE|trusses": "Structural Engineering",
  "CE|working stress and limit state method": "Structural Engineering",
  "CE|plate griders and industrial roofs": "Structural Engineering",
  "CE|torsion of shafts and pressure vessels": "Structural Engineering",
  "CE|friction": "Geotechnical Engineering",
  "CE|geotechnical engineering": "Geotechnical Engineering",
  "CE|properties of soils": "Geotechnical Engineering",
  "CE|retaining wall-earth pressure theories": "Geotechnical Engineering",
  "CE|seepage analysis": "Geotechnical Engineering",
  "CE|shallow foundation and bearing capacity": "Geotechnical Engineering",
  "CE|shear strength of soil": "Geotechnical Engineering",
  "CE|soil stabilization and soil exploration": "Geotechnical Engineering",
  "CE|stability analysis of slopes": "Geotechnical Engineering",
  "CE|stress distribution in the soil": "Geotechnical Engineering",
  "CE|theories of seepage, spillways and miscellaneous": "Geotechnical Engineering",
  "CE|evaporation, transpiration and stream flow measurement": "Water Resources Engineering",
  "CE|flood routing and flood control": "Water Resources Engineering",
  "CE|fluid mechanics and hydraulics": "Water Resources Engineering",
  "CE|fluid properties and manometry": "Water Resources Engineering",
  "CE|hydraulic pumps": "Water Resources Engineering",
  "CE|hydrostatic forces": "Water Resources Engineering",
  "CE|impact of jets and turbines": "Water Resources Engineering",
  "CE|infiltration, runoff and hydrographs": "Water Resources Engineering",
  "CE|irrigation engineering": "Water Resources Engineering",
  "CE|open channel flow": "Water Resources Engineering",
  "CE|precipitation and general aspects of hydrology": "Water Resources Engineering",
  "CE|source of water supply, distribution system and well hydraulics": "Water Resources Engineering",
  "CE|tacheometric, curve and hydrographic surveying": "Water Resources Engineering",
  "CE|turbulent flow": "Water Resources Engineering",
  "CE|viscous flow of incompressible fluid": "Water Resources Engineering",
  "CE|water demand": "Water Resources Engineering",
  "CE|environmental engineering": "Environmental Engineering",
  "CE|municipal solid waste management": "Environmental Engineering",
  "CE|quality and characteristics of waste water": "Environmental Engineering",
  "CE|quality characteristics of water": "Environmental Engineering",
  "CE|treatment of waste water": "Environmental Engineering",
  "CE|water treatment": "Environmental Engineering",
  "CE|geometric design of highway and planning": "Transportation Engineering",
  "CE|highway maintenance": "Transportation Engineering",
  "CE|highway materials": "Transportation Engineering",
  "CE|pavement design": "Transportation Engineering",
  "CE|railway and airport engineering": "Transportation Engineering",
  "CE|traffic engineering": "Transportation Engineering",
  "CE|geomatics engineering": "Geomatics Engineering",
  "CE|levelling and contouring": "Geomatics Engineering",
  "CE|remote sensing, gis, gps and photogrammetry": "Geomatics Engineering",
  "CE|theodolites, compass and traverse surveying": "Geomatics Engineering",
  "CE|construction materials and management": "Construction Materials and Management",
  "CE|properties of metals, stress and strain": "Construction Materials and Management",
  "DA|general aptitude": "General Aptitude",
  "DA|numerical ability": "General Aptitude",
  "DA|verbal ability": "General Aptitude",
  "DA|spatial aptitude": "General Aptitude",
  "DA|logical reasoning": "General Aptitude",
  "DA|analytical aptitude": "General Aptitude",
  "DA|probability and statistics": "Probability and Statistics",
  "DA|combinatorics and probability": "Probability and Statistics",
  "DA|linear algebra": "Linear Algebra",
  "DA|calculus and optimization": "Calculus and Optimization",
  "DA|differentiation and optimization": "Calculus and Optimization",
  "DA|limits and series": "Calculus and Optimization",
  "DA|programming in python": "Programming, Data Structures and Algorithms",
  "DA|data structures and algorithms": "Programming, Data Structures and Algorithms",
  "DA|sorting and searching": "Programming, Data Structures and Algorithms",
  "DA|graph algorithms": "Programming, Data Structures and Algorithms",
  "DA|trees and traversals": "Programming, Data Structures and Algorithms",
  "DA|hashing": "Programming, Data Structures and Algorithms",
  "DA|database management and warehousing": "Database Management and Warehousing",
  "DA|relational algebra and sql": "Database Management and Warehousing",
  "DA|database design and normalization": "Database Management and Warehousing",
  "DA|data warehousing and olap": "Database Management and Warehousing",
  "DA|indexing and transactions": "Database Management and Warehousing",
  "DA|machine learning": "Machine Learning",
  "DA|model derivatives and activation functions": "Machine Learning",
  "DA|artificial intelligence": "Artificial Intelligence",
  "DA|search algorithms": "Artificial Intelligence",
  "DA|game trees and adversarial search": "Artificial Intelligence",
  "DA|logic and knowledge representation": "Artificial Intelligence",
  "CS|numerical ability": "General Aptitude",
  "CS|verbal ability": "General Aptitude",
  "CS|spatial aptitude": "General Aptitude",
  "CS|logical reasoning": "General Aptitude",
  "CS|analytical aptitude": "General Aptitude",
  "CS|calculus": "Engineering Mathematics",
  "CS|discrete mathematics": "Engineering Mathematics",
  "CS|engineering mathematics": "Engineering Mathematics",
  "CS|group theory": "Engineering Mathematics",
  "CS|lattice": "Engineering Mathematics",
  "CS|linear algebra": "Engineering Mathematics",
  "CS|matching": "Engineering Mathematics",
  "CS|number system": "Engineering Mathematics",
  "CS|numerical method": "Engineering Mathematics",
  "CS|probability theory": "Engineering Mathematics",
  "CS|propositional logic": "Engineering Mathematics",
  "CS|recurrence": "Engineering Mathematics",
  "CS|recurrence relation": "Engineering Mathematics",
  "CS|relation": "Engineering Mathematics",
  "CS|relational algebra": "Engineering Mathematics",
  "CS|relational schema": "Engineering Mathematics",
  "CS|set theory": "Engineering Mathematics",
  "CS|tuple calculus": "Engineering Mathematics",
  "CS|digital logic": "Digital Logic",
  "CS|sequential circuit": "Digital Logic",
  "CS|computer organization": "Computer Organization and Architecture",
  "CS|interrupt": "Computer Organization and Architecture",
  "CS|io interface": "Computer Organization and Architecture",
  "CS|machine instruction": "Computer Organization and Architecture",
  "CS|memory chip design": "Computer Organization and Architecture",
  "CS|pipeline processor": "Computer Organization and Architecture",
  "CS|secondary storage": "Computer Organization and Architecture",
  "CS|c programming": "Programming and Data Structures",
  "CS|conditional statement": "Programming and Data Structures",
  "CS|data structure": "Programming and Data Structures",
  "CS|dynamic programming": "Programming and Data Structures",
  "CS|function": "Programming and Data Structures",
  "CS|functions": "Programming and Data Structures",
  "CS|hashing": "Programming and Data Structures",
  "CS|heap tree": "Programming and Data Structures",
  "CS|link list": "Programming and Data Structures",
  "CS|loop": "Programming and Data Structures",
  "CS|n-ary tree": "Programming and Data Structures",
  "CS|queue": "Programming and Data Structures",
  "CS|stack": "Programming and Data Structures",
  "CS|algorithm": "Algorithms",
  "CS|asymptotic notation": "Algorithms",
  "CS|divide and conquer": "Algorithms",
  "CS|graph theory": "Algorithms",
  "CS|graph traversal": "Algorithms",
  "CS|greedy technique": "Algorithms",
  "CS|minimum spanning tree": "Algorithms",
  "CS|p-np theory": "Algorithms",
  "CS|planar graph": "Algorithms",
  "CS|shortest path": "Algorithms",
  "CS|sorting": "Algorithms",
  "CS|push-down automata": "Theory of Computation",
  "CS|recursive language": "Theory of Computation",
  "CS|regular expression": "Theory of Computation",
  "CS|regular grammar": "Theory of Computation",
  "CS|regular language": "Theory of Computation",
  "CS|theory of computation": "Theory of Computation",
  "CS|turing machine": "Theory of Computation",
  "CS|undecidability": "Theory of Computation",
  "CS|intermediate code generation": "Compiler Design",
  "CS|lexical analysis": "Compiler Design",
  "CS|parsing": "Compiler Design",
  "CS|runtime environment": "Compiler Design",
  "CS|syntax-directed translation": "Compiler Design",
  "CS|file system": "Operating System",
  "CS|memory management": "Operating System",
  "CS|operating system": "Operating System",
  "CS|process": "Operating System",
  "CS|process synchronization": "Operating System",
  "CS|system call": "Operating System",
  "CS|thread": "Operating System",
  "CS|er model": "Databases",
  "CS|integrity constraints": "Databases",
  "CS|normal form": "Databases",
  "CS|sql": "Databases",
  "CS|transaction": "Databases",
  "CS|transactions": "Databases",
  "CS|computer network": "Computer Networks",
  "CS|data link layer": "Computer Networks",
  "CS|network layer protocol": "Computer Networks",
  "CS|network security": "Computer Networks",
  "CS|osi layer": "Computer Networks",
  "CS|physical layer": "Computer Networks",
  "CS|transport layer protocol": "Computer Networks",
  "CS|web technology": "Computer Networks",
  "ME|numerical ability": "General Aptitude",
  "ME|verbal ability": "General Aptitude",
  "ME|spatial aptitude": "General Aptitude",
  "ME|logical reasoning": "General Aptitude",
  "ME|analytical aptitude": "General Aptitude",
  "ME|engineering mathematics": "Engineering Mathematics",
  "ME|inventory control": "Engineering Mathematics",
  "ME|linear algebra": "Engineering Mathematics",
  "ME|linear programming": "Engineering Mathematics",
  "ME|numerical methods": "Engineering Mathematics",
  "ME|pert and cpm": "Engineering Mathematics",
  "ME|probability and statistics": "Engineering Mathematics",
  "ME|queuing theory and transportation": "Engineering Mathematics",
  "ME|fbd, equilirbium, plane trusses and virtual work": "Applied Mechanics and Design",
  "ME|friction": "Applied Mechanics and Design",
  "ME|gear and gear train": "Applied Mechanics and Design",
  "ME|gears": "Applied Mechanics and Design",
  "ME|gyroscope": "Applied Mechanics and Design",
  "ME|machine design": "Applied Mechanics and Design",
  "ME|mohr's circle": "Applied Mechanics and Design",
  "ME|planar mechanisms": "Applied Mechanics and Design",
  "ME|plane motion": "Applied Mechanics and Design",
  "ME|power system": "Applied Mechanics and Design",
  "ME|shear-force and bending moment diagrams": "Applied Mechanics and Design",
  "ME|springs": "Applied Mechanics and Design",
  "ME|strain energy and thermal stresses": "Applied Mechanics and Design",
  "ME|strength of materials": "Applied Mechanics and Design",
  "ME|stress and strain": "Applied Mechanics and Design",
  "ME|stress-strain relationship and elastic constants": "Applied Mechanics and Design",
  "ME|thin cylinder": "Applied Mechanics and Design",
  "ME|torsion of shafts": "Applied Mechanics and Design",
  "ME|vibration": "Applied Mechanics and Design",
  "ME|impulse and momentum, energy formulations": "Applied Mechanics and Design",
  "ME|static dynamic loading and failure theories": "Applied Mechanics and Design",
  "ME|theory of machine": "Applied Mechanics and Design",
  "ME|translation and rotation": "Applied Mechanics and Design",
  "ME|fluid mechanics": "Fluid Mechanics and Thermal Sciences",
  "ME|fluid properties": "Fluid Mechanics and Thermal Sciences",
  "ME|fluid statics": "Fluid Mechanics and Thermal Sciences",
  "ME|heat exchanger": "Fluid Mechanics and Thermal Sciences",
  "ME|heat pumps and cycles": "Fluid Mechanics and Thermal Sciences",
  "ME|heat transfer": "Fluid Mechanics and Thermal Sciences",
  "ME|heat transfer in flow over plates and pipes": "Fluid Mechanics and Thermal Sciences",
  "ME|ic engine": "Fluid Mechanics and Thermal Sciences",
  "ME|manufacturing engineering": "Fluid Mechanics and Thermal Sciences",
  "ME|properties of moist air": "Fluid Mechanics and Thermal Sciences",
  "ME|psychrometric process": "Fluid Mechanics and Thermal Sciences",
  "ME|pure substances": "Fluid Mechanics and Thermal Sciences",
  "ME|radiation": "Fluid Mechanics and Thermal Sciences",
  "ME|second law, carnot cycle and entropy": "Fluid Mechanics and Thermal Sciences",
  "ME|thermodynamic system and processes": "Fluid Mechanics and Thermal Sciences",
  "ME|thermodynamics": "Fluid Mechanics and Thermal Sciences",
  "ME|turbines and pumps": "Fluid Mechanics and Thermal Sciences",
  "ME|vapor and gas refrigeration": "Fluid Mechanics and Thermal Sciences",
  "ME|viscous, turbulent flow and boundary layer theory": "Fluid Mechanics and Thermal Sciences",
  "ME|joining-welding": "Materials, Manufacturing and Industrial Engineering",
  "ME|machining and machine tool operation": "Materials, Manufacturing and Industrial Engineering",
  "ME|metrology and inspection": "Materials, Manufacturing and Industrial Engineering",
  "ME|production planning and control": "Materials, Manufacturing and Industrial Engineering",
  "ME|sheet metal operation": "Materials, Manufacturing and Industrial Engineering",
  "EE|numerical ability": "General Aptitude",
  "EE|verbal ability": "General Aptitude",
  "EE|spatial aptitude": "General Aptitude",
  "EE|logical reasoning": "General Aptitude",
  "EE|analytical aptitude": "General Aptitude",
  "EE|engineering mathematics": "Engineering Mathematics",
  "EE|linear algebra": "Engineering Mathematics",
  "EE|numerical methods": "Engineering Mathematics",
  "EE|probability and statistics": "Engineering Mathematics",
  "EE|electric circuits": "Electric Circuits",
  "EE|magnetically coupled circuits, network topology and filters": "Electric Circuits",
  "EE|network theorems": "Electric Circuits",
  "EE|resonance and locus diagrams": "Electric Circuits",
  "EE|steady state ac analysis": "Electric Circuits",
  "EE|three-phase circuits": "Electric Circuits",
  "EE|two port network and network functions": "Electric Circuits",
  "EE|transients and steady state response": "Electric Circuits",
  "EE|electromagnetic theory": "Electromagnetic Fields",
  "EE|electrostatic fields": "Electromagnetic Fields",
  "EE|magnetostatic fields": "Electromagnetic Fields",
  "EE|time varying fields": "Electromagnetic Fields",
  "EE|introduction of c.t. and d.t. signals": "Signals and Systems",
  "EE|laplace transform": "Signals and Systems",
  "EE|linear time invariant systems": "Signals and Systems",
  "EE|sampling": "Signals and Systems",
  "EE|signals and systems": "Signals and Systems",
  "EE|z-transform": "Signals and Systems",
  "EE|electrical machines": "Electrical Machines",
  "EE|instrument transformers": "Electrical Machines",
  "EE|single phase induction motors, special purpose machines and electromechanical energy conversion system": "Electrical Machines",
  "EE|synchronous machines": "Electrical Machines",
  "EE|transformers": "Electrical Machines",
  "EE|three phase induction machines": "Electrical Machines",
  "EE|generating power stations": "Power Systems",
  "EE|load flow studies": "Power Systems",
  "EE|per unit system": "Power Systems",
  "EE|performance of transmission lines, line parameters and corona": "Power Systems",
  "EE|power system stability": "Power Systems",
  "EE|power system transients": "Power Systems",
  "EE|power systems": "Power Systems",
  "EE|switch gear and protection": "Power Systems",
  "EE|high voltage dc transmission": "Power Systems",
  "EE|control systems": "Control Systems",
  "EE|design of control systems": "Control Systems",
  "EE|feedback characteristics of control systems": "Control Systems",
  "EE|frequency response analysis": "Control Systems",
  "EE|mathematical models of physical systems": "Control Systems",
  "EE|root locus techniques": "Control Systems",
  "EE|state variable analysis": "Control Systems",
  "EE|time response analysis": "Control Systems",
  "EE|electrical and electronic measurements": "Electrical and Electronic Measurements",
  "EE|galvanometers, voltmeters and ammeters": "Electrical and Electronic Measurements",
  "EE|measurement of energy and power": "Electrical and Electronic Measurements",
  "EE|measurement of resistance and potentiometers": "Electrical and Electronic Measurements",
  "EE|bjt, fet and their biasing circuits": "Analog and Digital Electronics",
  "EE|digital electronics": "Analog and Digital Electronics",
  "EE|diodes and their applications": "Analog and Digital Electronics",
  "EE|logic families and miscellaneous": "Analog and Digital Electronics",
  "EE|logic gates": "Analog and Digital Electronics",
  "EE|microprocessors": "Analog and Digital Electronics",
  "EE|operational amplifiers": "Analog and Digital Electronics",
  "EE|oscillators and feedback amplifiers": "Analog and Digital Electronics",
  "EE|sequential logic circuits": "Analog and Digital Electronics",
  "EE|small signal analysis": "Analog and Digital Electronics",
  "EE|inverters": "Power Electronics",
  "EE|phase controlled rectifiers": "Power Electronics",
  "EE|power electronics": "Power Electronics",
  "EE|power semiconductor devices and commutation techniques": "Power Electronics",
  "IT|numerical ability": "General Aptitude",
  "IT|spatial aptitude": "General Aptitude",
  "IT|logical reasoning": "General Aptitude",
  "IT|analytical aptitude": "General Aptitude",
  "IT|discrete mathematics": "Engineering Mathematics",
  "IT|engineering mathematics": "Engineering Mathematics",
  "IT|group theory": "Engineering Mathematics",
  "IT|lattice": "Engineering Mathematics",
  "IT|linear algebra": "Engineering Mathematics",
  "IT|number system": "Engineering Mathematics",
  "IT|numerical method": "Engineering Mathematics",
  "IT|probability theory": "Engineering Mathematics",
  "IT|propositional logic": "Engineering Mathematics",
  "IT|recurrence": "Engineering Mathematics",
  "IT|recurrence relation": "Engineering Mathematics",
  "IT|relation": "Engineering Mathematics",
  "IT|relational algebra": "Engineering Mathematics",
  "IT|set theory": "Engineering Mathematics",
  "IT|tuple calculus": "Engineering Mathematics",
  "IT|digital logic": "Digital Logic",
  "IT|sequential circuit": "Digital Logic",
  "IT|computer organization": "Computer Organization and Architecture",
  "IT|io interface": "Computer Organization and Architecture",
  "IT|machine instruction": "Computer Organization and Architecture",
  "IT|memory chip design": "Computer Organization and Architecture",
  "IT|pipeline processor": "Computer Organization and Architecture",
  "IT|secondary storage": "Computer Organization and Architecture",
  "IT|c programming": "Programming and Data Structures",
  "IT|conditional statement": "Programming and Data Structures",
  "IT|data structure": "Programming and Data Structures",
  "IT|function": "Programming and Data Structures",
  "IT|functions": "Programming and Data Structures",
  "IT|hashing": "Programming and Data Structures",
  "IT|heap tree": "Programming and Data Structures",
  "IT|link list": "Programming and Data Structures",
  "IT|queue": "Programming and Data Structures",
  "IT|stack": "Programming and Data Structures",
  "IT|asymptotic notation": "Algorithms",
  "IT|graph theory": "Algorithms",
  "IT|graph traversal": "Algorithms",
  "IT|greedy technique": "Algorithms",
  "IT|minimum spanning tree": "Algorithms",
  "IT|p-np theory": "Algorithms",
  "IT|shortest path": "Algorithms",
  "IT|sorting": "Algorithms",
  "IT|push-down automata": "Theory of Computation",
  "IT|regular expression": "Theory of Computation",
  "IT|regular grammar": "Theory of Computation",
  "IT|regular language": "Theory of Computation",
  "IT|theory of computation": "Theory of Computation",
  "IT|parsing": "Compiler Design",
  "IT|runtime environment": "Compiler Design",
  "IT|file system": "Operating System",
  "IT|memory management": "Operating System",
  "IT|operating system": "Operating System",
  "IT|process": "Operating System",
  "IT|process synchronization": "Operating System",
  "IT|system call": "Operating System",
  "IT|thread": "Operating System",
  "IT|er model": "Databases",
  "IT|normal form": "Databases",
  "IT|sql": "Databases",
  "IT|transaction": "Databases",
  "IT|computer network": "Computer Networks",
  "IT|data link layer": "Computer Networks",
  "IT|network layer protocol": "Computer Networks",
  "IT|network security": "Computer Networks",
  "IT|physical layer": "Computer Networks",
  "IT|transport layer protocol": "Computer Networks",
  "IT|web technology": "Computer Networks",
  "EC|miscellaneous topics": "Other / Legacy Topics",
  "CS|isro cse 2007": "Other / Legacy Topics",
  "CS|isro cse 2008": "Other / Legacy Topics",
  "CS|isro cse 2009": "Other / Legacy Topics",
  "CS|isro cse 2011": "Other / Legacy Topics",
  "CS|isro cse 2015": "Other / Legacy Topics",
  "CS|isro cse 2016": "Other / Legacy Topics",
  "CS|isro cse 2018": "Other / Legacy Topics",
  "CS|isro cse 2020": "Other / Legacy Topics",
  "CS|software engg": "Other / Legacy Topics",
  "EE|miscellaneous": "Other / Legacy Topics",
  "IT|software engg": "Other / Legacy Topics"
};

function gpReadMeta_() {
  const sh = getSheet_(GP_QUESTIONS_TAB, GP_HEADERS), last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, 6).getValues().filter(r => r[0] !== "").map(r => ({
    id: String(r[0]), branch: String(r[1]), subject: String(r[2]), topic: String(r[3]), type: String(r[4]), marks: Number(r[5])
  }));
}

function gpReadByIds_(ids) {
  const wanted = new Set((ids || []).map(String));
  if (!wanted.size) return [];
  const sh = getSheet_(GP_QUESTIONS_TAB, GP_HEADERS), last = sh.getLastRow();
  if (last < 2) return [];
  return sh.getRange(2, 1, last - 1, GP_HEADERS.length).getValues().filter(r => wanted.has(String(r[0]))).map(r => ({
    id: String(r[0]), branch: String(r[1]), subject: String(r[2]), topic: String(r[3]), type: String(r[4]), question_type: String(r[4]),
    marks: Number(r[5]), negative_marks: Number(r[6]) || 0, question: String(r[7] || ""), options: safeParse_(r[8], null),
    answer: String(r[9] === null || r[9] === undefined ? "" : r[9]), explanation: String(r[10] || ""), images: []
  }));
}

function gpQuestionKey_(text) {
  return String(text || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function gpTitleCase_(text) {
  const acronyms = { ai: "AI", ml: "ML", dsa: "DSA", sql: "SQL", dbms: "DBMS", nlp: "NLP", llm: "LLM", gpu: "GPU", cpu: "CPU", api: "API", edc: "EDC", os: "OS" };
  return String(text || "").trim().replace(/\s+/g, " ").split(" ").map(function (word) {
    const key = word.toLowerCase();
    if (acronyms[key]) return acronyms[key];
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ").slice(0, 80);
}

function gpValidate_(q, branch, allowCustom) {
  if (!q || typeof q !== "object") return "not a question object";
  if (!String(q.question || "").trim()) return "question text is empty";
  const subject = String(q.subject || "").trim().replace(/\s+/g, " ");
  const topic = String(q.topic || "").trim().replace(/\s+/g, " ");
  if (!subject) return "subject is missing";
  if (!topic) return "topic is missing";
  if (subject.length > 80 || topic.length > 80) return "subject and topic must be 80 characters or fewer";
  const canonical = (GP_SUBJECTS_BY_BRANCH[branch] || []).indexOf(subject) >= 0;
  if (!canonical && !allowCustom && q.allow_custom !== true && q.custom_subject !== true) return "subject is not canonical; set allow_custom for a custom subject";
  const type = String(q.type || "").toUpperCase();
  if (["MCQ", "MSQ", "NAT"].indexOf(type) < 0) return "type must be MCQ, MSQ or NAT";
  const marks = Number(q.marks);
  if (marks !== 1 && marks !== 2) return "marks must be 1 or 2";
  const has = v => v !== undefined && v !== null && String(v).trim() !== "";
  if (type === "NAT") {
    const range = has(q.answer_min) && has(q.answer_max);
    if (!has(q.answer) && !range) return "NAT answer is missing";
    if (has(q.answer) && isNaN(Number(q.answer))) return "NAT answer must be numeric";
    if (range && (isNaN(Number(q.answer_min)) || isNaN(Number(q.answer_max)) || Number(q.answer_min) > Number(q.answer_max))) return "NAT answer range is invalid";
    return "";
  }
  const options = q.options || {};
  if (!["A", "B", "C", "D"].every(k => has(options[k]))) return "MCQ/MSQ needs four options A, B, C and D";
  const answers = String(Array.isArray(q.answer) ? q.answer.join(";") : (q.answer || "")).toUpperCase().split(/[;,\s]+/).filter(Boolean);
  if (!answers.length || answers.some(a => !/^[ABCD]$/.test(a))) return "answer must contain A-D option labels";
  if (type === "MCQ" && answers.length !== 1) return "MCQ must have exactly one correct option";
  return "";
}

function gpUpload_(body) {
  const branch = String(body.branch || "").trim().toUpperCase();
  if (!GP_SUBJECTS_BY_BRANCH[branch]) throw new Error("Unsupported practice branch: " + branch);
  const questions = body.questions || [];
  if (!Array.isArray(questions) || !questions.length) throw new Error("No practice questions were supplied");
  if (questions.length > GP_MAX_PER_UPLOAD) throw new Error("Upload limit is " + GP_MAX_PER_UPLOAD + " questions per file");
  const allowCustom = body.allowCustom === true;
  const sh = getSheet_(GP_QUESTIONS_TAB, GP_HEADERS), last = sh.getLastRow();
  const seenIds = {}, seenText = {}, lines = [], rejected = [];
  let next = 1;
  if (last > 1) {
    sh.getRange(2, 1, last - 1, 8).getValues().forEach(r => {
      const id = String(r[0] || ""), b = String(r[1] || "").toUpperCase();
      if (id) seenIds[id] = true;
      if (b === branch) {
        const key = gpQuestionKey_(r[7]); if (key) seenText[key] = true;
        const match = id.match(new RegExp("^GP-" + branch + "-(\\d+)$")); if (match) next = Math.max(next, Number(match[1]) + 1);
      }
    });
  }
  let duplicates = 0;
  const ids = [];
  questions.forEach((q, index) => {
    const reason = gpValidate_(q, branch, allowCustom);
    if (reason) { rejected.push({ n: index + 1, reason }); return; }
    const key = gpQuestionKey_(q.question);
    if (seenText[key]) { duplicates++; return; }
    seenText[key] = true;
    let id;
    do { id = "GP-" + branch + "-" + String(next++).padStart(6, "0"); } while (seenIds[id]);
    seenIds[id] = true;
    const type = String(q.type).toUpperCase(), marks = Number(q.marks);
    let answer = Array.isArray(q.answer) ? q.answer.join(";") : String(q.answer === undefined || q.answer === null ? "" : q.answer);
    if (type === "NAT" && q.answer_min !== undefined && q.answer_max !== undefined && Number(q.answer_min) !== Number(q.answer_max)) answer = String(q.answer_min) + " to " + String(q.answer_max);
    const rawSubject = String(q.subject).trim().replace(/\s+/g, " ");
    const subject = GP_SUBJECTS_BY_BRANCH[branch].includes(rawSubject) ? rawSubject : gpTitleCase_(rawSubject);
    const topic = String(q.topic).trim().replace(/\s+/g, " ").slice(0, 80);
    const negative = type === "MCQ" ? (marks === 1 ? 0.33 : 0.67) : 0;
    const source = (!GP_SUBJECTS_BY_BRANCH[branch].includes(subject)) ? "custom" : "ai";
    lines.push([id, branch, subject, topic, type, marks, negative, String(q.question).trim(), type === "NAT" ? "" : JSON.stringify(q.options), answer, String(q.explanation || ""), new Date(), source]);
    ids.push(id);
  });
  if (lines.length) appendBlock_(sh, lines, [1,2,3,4,5,8,9,10,11,13]);
  return { ok: true, added: lines.length, duplicates, rejected, firstId: ids[0] || "", lastId: ids[ids.length - 1] || "", ids };
}

// Run manually once after deploying this file if the Practice Questions tab contains legacy rows.
// Old topic-as-subject values are moved into topic; unknown/custom subjects are left untouched.
function migrateGpSubjects() {
  const sh = getSheet_(GP_QUESTIONS_TAB, GP_HEADERS), last = sh.getLastRow();
  if (last < 2) return { updated: 0, scanned: 0 };
  const values = sh.getRange(2, 1, last - 1, 4).getValues();
  let updated = 0;
  values.forEach((r, i) => {
    const branch = String(r[1] || "").toUpperCase(), oldSubject = String(r[2] || "").trim();
    if (!GP_SUBJECTS_BY_BRANCH[branch] || GP_SUBJECTS_BY_BRANCH[branch].indexOf(oldSubject) >= 0) return;
    const mapped = GP_TOPIC_TO_SUBJECT[branch + "|" + oldSubject.toLowerCase()];
    if (!mapped) return;
    if (!String(r[3] || "").trim()) r[3] = oldSubject;
    r[2] = mapped;
    sh.getRange(i + 2, 3, 1, 2).setValues([[r[2], r[3]]]);
    updated++;
  });
  return { updated, scanned: values.length };
}
