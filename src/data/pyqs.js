export const branchCurriculum = {
  'First Year': {
    1: ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electrical Engineering', 'Programming in C', 'Engineering Graphics'],
    2: ['Engineering Mathematics II', 'Engineering Chemistry', 'Basic Electronics', 'Engineering Mechanics', 'Professional Communication']
  },
  'Computer Science': {
    3: ['Data Structures & Algorithms', 'OOP (Java/C++)', 'Discrete Mathematics', 'Digital Logic Design'],
    4: ['Operating Systems', 'DBMS', 'Computer Organization & Architecture', 'Theory of Computation'],
    5: ['Computer Networks', 'Software Engineering', 'Design & Analysis of Algorithms', 'Microprocessors'],
    6: ['Machine Learning', 'Web Development', 'Compiler Design', 'Cloud Computing'],
    7: ['Artificial Intelligence', 'Cyber Security', 'Big Data Analytics', 'Mobile Computing'],
    8: ['Distributed Systems', 'Internet of Things (IoT)', 'Natural Language Processing', 'Deep Learning']
  },
  'Civil': {
    3: ['Building Materials & Construction', 'Surveying', 'Fluid Mechanics', 'Engineering Mechanics'],
    4: ['Structural Analysis', 'Concrete Technology', 'Hydraulics & Hydraulic Machines', 'Strength of Materials'],
    5: ['Geotechnical Engineering', 'Design of RC Structures', 'Environmental Engineering', 'Transportation Engineering'],
    6: ['Steel Structures Design', 'Foundation Engineering', 'Water Resources Engineering', 'Estimation & Costing'],
    7: ['Earthquake Engineering', 'Irrigation Engineering', 'Prestressed Concrete', 'Pavement Design'],
    8: ['Construction Management', 'Bridge Engineering', 'Urban Transportation Planning', 'Advanced Geotechnical']
  },
  'Electrical': {
    3: ['Discrete Mathematics', 'Electric Circuit Theory', 'Analog Electronics', 'Electrical Machines I'],
    4: ['Electrical Machines II', 'Electromagnetic Fields', 'Digital Electronics', 'Power Systems I'],
    5: ['Control Systems', 'Power Electronics', 'Microcontrollers & Applications', 'Power Systems II'],
    6: ['Renewable Energy Systems', 'Signals & Systems', 'Power System Protection', 'Electric Drives'],
    7: ['High Voltage Engineering', 'Smart Grid Technologies', 'Industrial Automation', 'Power Quality'],
    8: ['Electric Vehicles', 'HVDC Transmission', 'AI Applications in Power Systems', 'Utilization of Electrical Energy']
  },
  'Electronics and Communication': {
    3: ['Electronics', 'Signals and Systems', 'Digital Logic Design', 'Network Theory'],
    4: ['Analog Communication', 'Microprocessors and Microcontrollers', 'Linear Integrated Circuits', 'Electromagnetic Waves'],
    5: ['Computer Networks', 'Digital Signal Processing', 'Digital Communication', 'Control Engineering'],
    6: ['VLSI Design', 'Antenna and Wave Propagation', 'Optical Communication', 'Microwave Engineering'],
    7: ['Embedded Systems', 'Wireless & Mobile Communication', 'Information Theory & Coding', 'Satellite Communication'],
    8: ['Robotics and Automation', 'Radar & Navigation Aids', 'Bio-Medical Electronics', 'Nano Electronics']
  },
  'Mechanical': {
    3: ['Thermodynamics', 'Mechanics of Solids', 'Material Science', 'Kinematics of Machinery'],
    4: ['Fluid Mechanics', 'Manufacturing Processes', 'Dynamics of Machinery', 'Applied Thermodynamics'],
    5: ['Heat and Mass Transfer', 'Design of Machine Elements', 'IC Engines and Gas Turbines', 'Metrology and Measurements'],
    6: ['Refrigeration & Air Conditioning', 'Finite Element Analysis (FEA)', 'Automobile Engineering', 'Industrial Engineering'],
    7: ['CAD/CAM & Automation', 'Power Plant Engineering', 'Turbo Machinery', 'Operations Research'],
    8: ['Robotics and Mechatronics', 'Non-Conventional Energy Resources', 'Total Quality Management', 'Supply Chain Management']
  }
};

export const branchTaglines = {
  'First Year': 'Clueless today, creators tomorrow.',
  'Electrical': 'High voltage, higher ambitions.',
  'Electronics and Communication': 'Frequency is temporary; connection is forever.',
  'Mechanical': 'If it rotates, moves, or breaks, we’ll make it better.',
  'Civil': "Without us, you'd just be standing in a field.",
  'Computer Science': 'We write the code that changes the world (once we fix this syntax error).'
};

export const branchIcons = {
  'First Year': '🌱',
  'Computer Science': '💻',
  'Civil': '🏗️',
  'Electrical': '⚡',
  'Electronics and Communication': '📡',
  'Mechanical': '⚙️'
};


const contentItems = [
  // --- First Year (Semesters 1 & 2) ---
  {
    id: 'math1-2023-calculus',
    title: 'Engineering Mathematics I - Matrices & Differential Calculus',
    subject: 'Engineering Mathematics I',
    topic: 'Matrices & Eigenvalues',
    year: '2023',
    semester: 1,
    type: 'PYQ',
    branch: 'First Year',
    content: 'Q1. Find the Eigenvalues and Eigenvectors of the matrix A = [[3, 1, 4], [0, 2, 6], [0, 0, 5]].\n\nQ2. State and prove Cayley-Hamilton theorem and use it to find A⁻¹.\n\nQ3. Verify Rolle\'s theorem and Mean Value Theorem for f(x) = x³ - 6x² + 11x - 6 on [1, 3].',
    notes: 'Remember: Sum of Eigenvalues = Trace of Matrix, and Product of Eigenvalues = Determinant. Characteristic equation is |A - λI| = 0.'
  },
  {
    id: 'cprog-2023-pointers',
    title: 'Programming for Problem Solving - Functions & Pointers in C',
    subject: 'Programming in C',
    topic: 'Pointers & Dynamic Memory',
    year: '2023',
    semester: 1,
    type: 'Notes',
    branch: 'First Year',
    content: 'Pointer concepts in C:\n• Pointer arithmetic: ptr + 1 increments address by sizeof(*ptr).\n• Dynamic Memory Allocation: malloc(), calloc(), realloc(), free() in <stdlib.h>.\n• Call by Value vs Call by Reference using address operator (&) and dereference operator (*).\n• Structures vs Unions: Union members share the same memory location.',
    notes: 'Always free allocated heap memory to prevent memory leaks. Avoid dangling pointers by setting pointers to NULL after freeing.'
  },
  {
    id: 'physics-2024-optics',
    title: 'Engineering Physics - Interference, Diffraction & Lasers',
    subject: 'Engineering Physics',
    topic: 'Wave Optics & Lasers',
    year: '2024',
    semester: 1,
    type: 'PYQ',
    branch: 'First Year',
    content: 'Q1. Explain the formation of Newton\'s Rings in reflected monochromatic light and derive the expression for diameter of nth dark ring.\n\nQ2. Contrast spontaneous emission and stimulated emission. Explain the construction and working of a Ruby Laser or He-Ne Laser.\n\nQ3. State Brewster\'s law and explain polarization by reflection.',
    notes: 'Diameter of dark ring: D_n² = 4n·R·λ. For bright rings: D_n² = 2(2n - 1)·R·λ.'
  },
  {
    id: 'chem-2024-polymers',
    title: 'Engineering Chemistry - Water Treatment & Polymers',
    subject: 'Engineering Chemistry',
    topic: 'Water Softening',
    year: '2024',
    semester: 2,
    type: 'Notes',
    branch: 'First Year',
    content: 'Water Technology:\n• Hardness of water: Temporary (bicarbonates of Ca & Mg) vs Permanent (chlorides and sulfates of Ca & Mg).\n• EDTA method for estimation of total hardness using Eriochrome Black-T (EBT) indicator at pH 10.\n• Water softening: Zeolite process and Ion-Exchange (Demineralization) resin process.\n• Corrosion mechanisms: Dry (chemical) vs Wet (electrochemical) corrosion.',
    notes: 'In EDTA titration, the wine-red metal-indicator complex turns steel blue at the endpoint when EDTA chelates all Ca²⁺/Mg²⁺ ions.'
  },
  {
    id: 'mech-2024-statics',
    title: 'Engineering Mechanics - Lami\'s Theorem & Friction',
    subject: 'Engineering Mechanics',
    topic: 'Equilibrium & Friction',
    year: '2024',
    semester: 2,
    type: 'PYQ',
    branch: 'First Year',
    content: 'Q1. State Lami\'s Theorem and apply it to find the tension in strings supporting a suspended sphere of weight W.\n\nQ2. State the laws of dry (Coulomb) friction. Differentiate between angle of friction (λ) and angle of repose (θ).\n\nQ3. Determine the moment of inertia of an I-section about its centroidal X-X and Y-Y axes using parallel axis theorem.',
    notes: 'Parallel Axis Theorem: I = I_G + A·d². Angle of friction equals the angle of repose (tan θ = μ).'
  },

  // --- Computer Science ---
  {
    id: 'dsa-2023-arrays',
    title: 'Data Structures - Arrays and Linked Lists',
    subject: 'Data Structures & Algorithms',
    topic: 'Arrays',
    year: '2023',
    semester: 3,
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Implement an array rotation function in O(n) time and O(1) space.\n\nQ2. Find the maximum sum of a contiguous subarray using Kadane\'s algorithm.\n\nQ3. Implement single and doubly linked list reversal with edge cases.',
    notes: 'Review time complexity analysis: dynamic array amortized insertion is O(1). Linked lists have O(1) prepend and O(n) arbitrary access.'
  },
  {
    id: 'algo-2023-sorting',
    title: 'Algorithms - Sorting and Searching Techniques',
    subject: 'Data Structures & Algorithms',
    topic: 'Sorting',
    year: '2023',
    semester: 3,
    type: 'Notes',
    branch: 'Computer Science',
    content: 'Sorting algorithms comparison:\n• Quick Sort: Average O(n log n), worst O(n²), in-place, unstable.\n• Merge Sort: Guaranteed O(n log n), requires O(n) auxiliary memory, stable.\n• Heap Sort: Guaranteed O(n log n), in-place, unstable.\n\nSearching: Binary Search O(log n) requires monotonic sorted sequence.',
    notes: 'Master the divide-and-conquer master theorem for recurrence relations T(n) = aT(n/b) + f(n).'
  },
  {
    id: 'oops-2024-inheritance',
    title: 'Object-Oriented Programming - Inheritance & Polymorphism',
    subject: 'OOP (Java/C++)',
    topic: 'Inheritance',
    year: '2024',
    semester: 3,
    type: 'Notes',
    branch: 'Computer Science',
    content: 'Key concepts:\n• Polymorphism: Compile-time (Method Overloading) vs Runtime (Method Overriding using virtual functions in C++ or dynamic method dispatch in Java).\n• Abstract Classes vs Interfaces.\n• Diamond problem resolution in C++ via virtual base classes.',
    notes: 'Practice writing clean class hierarchies and SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution).'
  },
  {
    id: 'dbms-2023-normalization',
    title: 'Database Management Systems - Normalization & Transactions',
    subject: 'DBMS',
    topic: 'Normalization',
    year: '2023',
    semester: 4,
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Given relational schema R(A, B, C, D, E) with functional dependencies {A→BC, CD→E, B→D, E→A}, find all candidate keys.\n\nQ2. Decompose R into 3NF and check whether decomposition is lossless and dependency preserving.\n\nQ3. Explain ACID properties and Strict 2-Phase Locking (S2PL).',
    notes: 'Progression checklist: 1NF (atomic values) → 2NF (no partial dependency) → 3NF (no transitive dependency) → BCNF (LHS must be super key).'
  },
  {
    id: 'os-2023-process',
    title: 'Operating Systems - Process Management & Synchronization',
    subject: 'Operating Systems',
    topic: 'Process Scheduling',
    year: '2023',
    semester: 4,
    type: 'Notes',
    branch: 'Computer Science',
    content: 'Process lifecycle states: New → Ready → Running → Waiting → Terminated.\n\nScheduling Algorithms:\n• FCFS (Convoy effect)\n• SJF/SRTF (Optimal average waiting time, risk of starvation)\n• Round Robin (Time-quantum sensitivity)\n• Priority Scheduling\n\nCritical Section Problem: Mutual Exclusion, Progress, Bounded Waiting. Peterson\'s Algorithm and Semaphores.',
    notes: 'Practice drawing Gantt charts and calculating Turnaround Time (TAT = Completion - Arrival) and Waiting Time (WT = TAT - Burst).'
  },
  {
    id: 'softeng-2024-sdlc',
    title: 'Software Engineering - SDLC Models & Agile Scrum',
    subject: 'Software Engineering',
    topic: 'Software Development Life Cycle',
    year: '2024',
    semester: 5,
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Compare Waterfall, Spiral, and Agile Scrum methodologies with respect to risk handling and change flexibility.\n\nQ2. Draw a Use-Case Diagram and Sequence Diagram for an Online Examination System.\n\nQ3. Contrast Black-Box Testing (Equivalence Partitioning, Boundary Value Analysis) with White-Box Testing (Cyclomatic Complexity).',
    notes: 'Understand sprint rituals: Sprint Planning, Daily Standup, Sprint Review, and Retrospective.'
  },
  {
    id: 'cn-2024-tcp-ip',
    title: 'Computer Networks - TCP/IP & Network Protocols',
    subject: 'Computer Networks',
    topic: 'Network Protocols',
    year: '2024',
    semester: 5,
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Explain TCP 3-way handshake (SYN, SYN-ACK, ACK) and 4-way connection termination.\n\nQ2. A Class C IP address 192.168.10.0 is divided into 4 subnets. Find the subnet mask, valid IP range, and broadcast address for each subnet.\n\nQ3. Contrast Distance Vector Routing (Bellman-Ford) and Link State Routing (Dijkstra).',
    notes: 'Memorize the OSI layers (All People Seem To Need Data Processing) and corresponding protocols (HTTP, TCP, IP, Ethernet).'
  },
  {
    id: 'web-2024-http',
    title: 'Web Development - Full Stack & REST Architecture',
    subject: 'Web Development',
    topic: 'HTTP Protocol',
    year: '2024',
    semester: 6,
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Design stateless RESTful endpoints for an E-Commerce portal with proper HTTP verb usage (GET, POST, PUT, DELETE, PATCH).\n\nQ2. Explain Cross-Origin Resource Sharing (CORS) and preflight OPTIONS request.\n\nQ3. Compare client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG).',
    notes: 'Understand token-based authentication with JWT (JSON Web Tokens) vs cookie-based sessions.'
  },
  {
    id: 'ml-2024-supervised',
    title: 'Machine Learning - Supervised Models & Metrics',
    subject: 'Machine Learning',
    topic: 'Regression & Classification',
    year: '2024',
    semester: 6,
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Derive the Cost Function and Gradient Descent update rule for Linear Regression.\n\nQ2. Explain Logistic Regression hypothesis function, log-loss, and decision boundary.\n\nQ3. Given a confusion matrix (TP=80, FP=20, FN=10, TN=90), calculate Precision, Recall, Accuracy, and F1-Score.',
    notes: 'Remember the Bias-Variance tradeoff: high bias causes underfitting; high variance causes overfitting. Regularization (L1 Lasso, L2 Ridge) helps control variance.'
  },
  {
    id: 'ai-2024-search',
    title: 'Artificial Intelligence - Search Algorithms & Knowledge',
    subject: 'Artificial Intelligence',
    topic: 'Search & Heuristics',
    year: '2024',
    semester: 7,
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Explain A* Search algorithm. Prove that A* is admissible when the heuristic h(n) is admissible.\n\nQ2. Contrast Minimax search with Alpha-Beta pruning with an example game tree.\n\nQ3. Convert first-order logic sentences into Conjunctive Normal Form (CNF) for resolution refutation.',
    notes: 'A* evaluation function: f(n) = g(n) + h(n), where g(n) is exact cost from start and h(n) is estimated cost to goal.'
  },
  {
    id: 'dist-2024-consensus',
    title: 'Distributed Systems - Consistency & CAP Theorem',
    subject: 'Distributed Systems',
    topic: 'Consensus & Replication',
    year: '2024',
    semester: 8,
    type: 'Notes',
    branch: 'Computer Science',
    content: 'Core principles:\n• CAP Theorem: A distributed system can provide at most two of Consistency, Availability, and Partition Tolerance.\n• Lamport Logical Clocks & Vector Clocks for causal ordering.\n• Raft and Paxos Consensus algorithms for state machine replication.\n• Two-Phase Commit (2PC) protocol.',
    notes: 'Focus on network partition scenarios and eventual consistency models (PACELC theorem).'
  },

  // --- Civil Engineering ---
  {
    id: 'structures-civil-2023',
    title: 'Structural Analysis - Moments, Shears & Trusses',
    subject: 'Structural Analysis',
    topic: 'Beams & Trusses',
    year: '2023',
    semester: 4,
    type: 'PYQ',
    branch: 'Civil',
    content: 'Q1. Draw the Bending Moment Diagram (BMD) and Shear Force Diagram (SFD) for a simply supported beam with uniformly distributed load (UDL).\n\nQ2. Analyze the determinate plane truss using the Method of Joints and Method of Sections.\n\nQ3. Determine the slope and deflection of a cantilever beam using Macaulay\'s method.',
    notes: 'Review equilibrium equations ΣFx = 0, ΣFy = 0, ΣM = 0. Maximum bending moment occurs where shear force changes sign.'
  },
  {
    id: 'geotechnical-civil-2024',
    title: 'Geotechnical Engineering - Soil Mechanics & Foundations',
    subject: 'Geotechnical Engineering',
    topic: 'Foundations',
    year: '2024',
    semester: 5,
    type: 'Notes',
    branch: 'Civil',
    content: 'Soil properties & index parameters:\n• Phase relationships: Void ratio (e), Porosity (n), Degree of saturation (S).\n• Atterberg limits: Liquid Limit, Plastic Limit, Shrinkage Limit.\n• Terzaghi\'s Ultimate Bearing Capacity equation for strip footings: q_ult = c·Nc + γ·Df·Nq + 0.5·γ·B·Nγ.\n• Consolidation: Terzaghi\'s 1D consolidation theory.',
    notes: 'Review compaction vs consolidation: compaction is instantaneous expulsion of air; consolidation is time-dependent expulsion of pore water.'
  },
  {
    id: 'steel-civil-2024',
    title: 'Design of Steel Structures - Welded & Bolted Joints',
    subject: 'Steel Structures Design',
    topic: 'Connections',
    year: '2024',
    semester: 6,
    type: 'PYQ',
    branch: 'Civil',
    content: 'Q1. Design a lap joint between two plates of thickness 12 mm and 16 mm using M20 bolts of grade 4.6.\n\nQ2. Calculate the design tensile strength of a tension member connected to a gusset plate.\n\nQ3. Check the safety of a laterally supported I-beam for bending and shear according to IS 800:2007.',
    notes: 'Always refer to limit state design philosophy: Limit State of Strength vs Limit State of Serviceability.'
  },
  {
    id: 'earthquake-civil-2024',
    title: 'Earthquake Engineering - Seismic Analysis & Ductile Detailing',
    subject: 'Earthquake Engineering',
    topic: 'Seismic Design',
    year: '2024',
    semester: 7,
    type: 'Notes',
    branch: 'Civil',
    content: 'Key topics:\n• Seismic zoning of India according to IS 1893 (Zone II to Zone V).\n• Base shear calculation: V_b = A_h · W, where A_h = (Z/2)·(I/R)·(Sa/g).\n• Ductile detailing requirements of RC frames as per IS 13920.\n• Response Spectrum Method vs Equivalent Static Method.',
    notes: 'Importance factor (I), Response reduction factor (R), and structural period T = 0.075·h^0.75.'
  },
  {
    id: 'const-civil-2024',
    title: 'Construction Management - CPM and PERT Networks',
    subject: 'Construction Management',
    topic: 'Project Scheduling',
    year: '2024',
    semester: 8,
    type: 'PYQ',
    branch: 'Civil',
    content: 'Q1. Differentiate between Critical Path Method (CPM - deterministic) and Project Evaluation & Review Technique (PERT - probabilistic).\n\nQ2. Draw the network diagram for a construction project, calculate Earliest Start (ES), Latest Finish (LF), Total Float, and identify the critical path.\n\nQ3. Discuss project crashing and direct vs indirect cost trade-offs.',
    notes: 'Total Float = LF - ES - Duration. Activities on critical path have zero total float.'
  },

  // --- Electrical Engineering ---
  {
    id: 'discrete-2023-relations',
    title: 'Discrete Mathematics - Relations, Graph Theory & Logic',
    subject: 'Discrete Mathematics',
    topic: 'Relations',
    year: '2023',
    semester: 3,
    type: 'Notes',
    branch: 'Electrical',
    content: 'Key concepts:\n• Relations: Reflexive, Symmetric, Anti-symmetric, Transitive. Equivalence relations and partitions.\n• Graph Theory: Eulerian vs Hamiltonian graphs, planar graphs, Euler formula (V - E + F = 2).\n• Boolean algebra and recurrence relations.',
    notes: 'Practice drawing Hasse diagrams for partially ordered sets (Posets) and verifying lattice properties.'
  },
  {
    id: 'machines-electrical-2023',
    title: 'Electrical Machines II - Synchronous & Induction Motors',
    subject: 'Electrical Machines II',
    topic: 'Induction Motors',
    year: '2023',
    semester: 4,
    type: 'PYQ',
    branch: 'Electrical',
    content: 'Q1. Explain the working principle of a 3-phase induction motor and derive the condition for maximum starting torque.\n\nQ2. Draw the phasor diagram of a synchronous generator at lagging, leading, and unity power factors.\n\nQ3. Describe the synchronous impedance method for voltage regulation.',
    notes: 'Slip s = (Ns - Nr)/Ns. Rotor frequency fr = s · f. Maximum torque is independent of rotor resistance.'
  },
  {
    id: 'control-electrical-2024',
    title: 'Control Systems - Stability, Bode Plots & Root Locus',
    subject: 'Control Systems',
    topic: 'System Stability',
    year: '2024',
    semester: 5,
    type: 'PYQ',
    branch: 'Electrical',
    content: 'Q1. Determine the range of K for stability using Routh-Hurwitz criterion for a given characteristic equation.\n\nQ2. Sketch the Root Locus for G(s)H(s) = K / [s(s+2)(s+4)]. Find breakaway points and asymptotes.\n\nQ3. Define Gain Margin and Phase Margin on a Bode Plot.',
    notes: 'Stable systems have both positive Gain Margin and positive Phase Margin in dB and degrees respectively.'
  },
  {
    id: 'renewable-electrical-2024',
    title: 'Renewable Energy Systems - Solar PV & Wind Energy Conversion',
    subject: 'Renewable Energy Systems',
    topic: 'Solar & Wind',
    year: '2024',
    semester: 6,
    type: 'Notes',
    branch: 'Electrical',
    content: 'Fundamentals:\n• Solar Photovoltaics: I-V and P-V curves, Maximum Power Point Tracking (MPPT) algorithms (Perturb & Observe, Incremental Conductance).\n• Grid-tied inverters and anti-islanding protection.\n• Wind Power: Betz limit (maximum theoretical efficiency = 59.3%), DFIG (Doubly Fed Induction Generator).',
    notes: 'Power extracted from wind: P = 0.5 · ρ · A · v³, proportional to the cube of wind velocity.'
  },
  {
    id: 'ev-electrical-2024',
    title: 'Electric Vehicles - Powertrain, Motors & Battery Management',
    subject: 'Electric Vehicles',
    topic: 'EV Powertrain',
    year: '2024',
    semester: 8,
    type: 'Notes',
    branch: 'Electrical',
    content: 'EV engineering topics:\n• Comparison of traction motors: BLDC, Permanent Magnet Synchronous Motor (PMSM), Induction Motor.\n• Battery chemistries: Li-ion (NMC, LFP), cell balancing techniques.\n• Regenerative braking and DC-DC bidirectional converters.\n• Charging standards: AC Level 1/2, DC Fast Charging (CCS, CHAdeMO).',
    notes: 'State of Charge (SoC) estimation algorithms: Coulomb counting and Extended Kalman Filtering.'
  },

  // --- Electronics & Communication (ECE) ---
  {
    id: 'circuit-electronics-2023',
    title: 'Electronic Circuits - Transistor Amplifiers & Feedback',
    subject: 'Electronics',
    topic: 'Amplifiers',
    year: '2023',
    semester: 3,
    type: 'PYQ',
    branch: 'Electronics and Communication',
    content: 'Q1. Design a BJT common-emitter amplifier with voltage divider bias for a specified voltage gain.\n\nQ2. Explain the four basic feedback topologies and their effects on input/output resistance and bandwidth.\n\nQ3. State the Barkhausen criteria for sustained sinusoidal oscillations.',
    notes: 'Negative feedback decreases gain by (1 + Aβ) but increases bandwidth and decreases non-linear distortion.'
  },
  {
    id: 'vlsi-ece-2024',
    title: 'VLSI Design - CMOS Inverter & Layout Rules',
    subject: 'VLSI Design',
    topic: 'CMOS Inverters',
    year: '2024',
    semester: 6,
    type: 'Notes',
    branch: 'Electronics and Communication',
    content: 'Core principles:\n• Static and dynamic characteristics of CMOS Inverters.\n• Noise margins: NM_H = V_OH - V_IH, NM_L = V_IL - V_OL.\n• Stick diagrams and Euler path method for optimal layout area.\n• Propagation delay: tp = 0.5(tpHL + tpLH), Elmore delay model for RC interconnects.',
    notes: 'For symmetric switching threshold (V_M = V_DD / 2), (W/L)_p is typically 2 to 3 times (W/L)_n due to lower hole mobility.'
  },
  {
    id: 'embedded-ece-2024',
    title: 'Embedded Systems - ARM Architecture & RTOS',
    subject: 'Embedded Systems',
    topic: 'ARM & RTOS',
    year: '2024',
    semester: 7,
    type: 'PYQ',
    branch: 'Electronics and Communication',
    content: 'Q1. Explain the ARM Cortex-M architecture, register bank, and Thumb-2 instruction set.\n\nQ2. Compare preemptive vs cooperative scheduling in a Real-Time Operating System (RTOS).\n\nQ3. Explain Priority Inversion and how Priority Inheritance Protocol solves it.',
    notes: 'Understand hard real-time systems (deadline misses cause catastrophic failure) vs soft real-time systems.'
  },

  // --- Mechanical Engineering ---
  {
    id: 'mechanical-thermodynamics-2023',
    title: 'Thermodynamics - Power Cycles & Entropy Analysis',
    subject: 'Thermodynamics',
    topic: 'Power Cycles',
    year: '2023',
    semester: 3,
    type: 'PYQ',
    branch: 'Mechanical',
    content: 'Q1. Derive the thermal efficiency of an air-standard Otto cycle in terms of compression ratio (r).\n\nQ2. A steam power plant operates on a simple ideal Rankine cycle. Calculate the cycle thermal efficiency and turbine work output.\n\nQ3. State Clausius inequality and prove that entropy of an isolated system always increases.',
    notes: 'Otto efficiency: η = 1 - (1 / r^(γ-1)). Diesel cycle efficiency is lower than Otto cycle for the same compression ratio.'
  },
  {
    id: 'mechanical-fluids-2024',
    title: 'Fluid Mechanics - Navier-Stokes, Boundary Layer & Turbines',
    subject: 'Fluid Mechanics',
    topic: 'Flow in Pipes',
    year: '2024',
    semester: 4,
    type: 'Notes',
    branch: 'Mechanical',
    content: 'Fundamental laws:\n• Continuity and Navier-Stokes equations.\n• Darcy-Weisbach equation for head loss in pipes: h_f = (4·f·L·v²) / (2·g·d).\n• Prandtl boundary layer theory: Laminar vs turbulent boundary layers.\n• Hydraulic turbines: Pelton wheel (impulse) vs Francis & Kaplan (reaction).',
    notes: 'Reynold\'s number Re = (ρ·v·D) / μ. Re < 2000 is laminar; Re > 4000 is turbulent flow in pipes.'
  },
  {
    id: 'heat-mech-2024',
    title: 'Heat and Mass Transfer - Conduction, Convection & Heat Exchangers',
    subject: 'Heat and Mass Transfer',
    topic: 'Heat Transfer',
    year: '2024',
    semester: 5,
    type: 'PYQ',
    branch: 'Mechanical',
    content: 'Q1. Derive the general 3D heat conduction equation in Cartesian coordinates.\n\nQ2. Derive the expression for Log Mean Temperature Difference (LMTD) for parallel flow and counter flow heat exchangers.\n\nQ3. Explain Stefan-Boltzmann law and radiation shape factors.',
    notes: 'Counter-flow heat exchangers are always more effective than parallel-flow for the same surface area and temperature limits.'
  },
  {
    id: 'cad-mech-2024',
    title: 'CAD/CAM & Automation - CNC Programming & Geometric Modeling',
    subject: 'CAD/CAM & Automation',
    topic: 'CNC & Modeling',
    year: '2024',
    semester: 7,
    type: 'Notes',
    branch: 'Mechanical',
    content: 'Key concepts:\n• Geometric modeling: Wireframe, Surface, and Solid Modeling (CSG and B-Rep).\n• CNC Programming: G-codes (Preparatory functions like G00 rapid, G01 linear, G02 circular) and M-codes (Miscellaneous functions).\n• Bezier curves and B-spline curves formulation.\n• Flexible Manufacturing Systems (FMS) and automated guided vehicles (AGV).',
    notes: 'Constructive Solid Geometry (CSG) stores geometry as a binary tree with Boolean operations (Union, Intersection, Difference).'
  }
];

export default contentItems;
