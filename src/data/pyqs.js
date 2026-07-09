const contentItems = [
  {
    id: 'dsa-2023-arrays',
    title: 'Data Structures - Arrays and Linked Lists',
    subject: 'Data Structures & Algorithms',
    topic: 'Arrays',
    year: '2023',
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Implement an array rotation function.\n\nQ2. Find the maximum sum of a subarray using Kadane\'s algorithm.\n\nQ3. Solve the two-sum problem efficiently.',
    notes: 'Review implementation of dynamic arrays. Practice time complexity analysis: O(n) and O(n²) solutions.'
  },
  {
    id: 'dbms-2023-normalization',
    title: 'Database Management Systems - Normalization',
    subject: 'DBMS',
    topic: 'Normalization',
    year: '2023',
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Convert a table to 3NF (Third Normal Form).\n\nQ2. Explain BCNF and identify anomalies in unnormalized data.\n\nQ3. Design a normalized schema for an employee management system.',
    notes: 'Remember the progression: 1NF → 2NF → 3NF → BCNF. Identify and fix functional dependencies.'
  },
  {
    id: 'os-2023-process',
    title: 'Operating Systems - Process Management',
    subject: 'Operating Systems',
    topic: 'Process Scheduling',
    year: '2023',
    type: 'Notes',
    branch: 'Computer Science',
    content: 'Process models: Process Control Block (PCB), Process States (New, Ready, Running, Waiting, Terminated).\n\nScheduling Algorithms: FCFS, SJF, Round Robin, Priority Scheduling.\n\nContext switching and inter-process communication.',
    notes: 'Study Gantt charts for scheduling. Understand concepts like starvation, preemption, and turnaround time.'
  },
  {
    id: 'cn-2024-tcp-ip',
    title: 'Computer Networks - TCP/IP Stack',
    subject: 'Computer Networks',
    topic: 'Network Protocols',
    year: '2024',
    type: 'PYQ',
    branch: 'Electronics and Communication',
    content: 'Q1. Explain the three-way handshake in TCP connection establishment.\n\nQ2. Compare UDP and TCP protocols with use cases.\n\nQ3. Design a subnetting scheme for a Class C network.',
    notes: 'Focus on the OSI model layers. Review packet structure and protocol headers for IP, TCP, and UDP.'
  },
  {
    id: 'oops-2024-inheritance',
    title: 'Object-Oriented Programming - Inheritance & Polymorphism',
    subject: 'OOP (Java/C++)',
    topic: 'Inheritance',
    year: '2024',
    type: 'Notes',
    branch: 'Computer Science',
    content: 'Key concepts: Single inheritance, multiple inheritance, multilevel inheritance.\n\nMethod overloading vs method overriding.\n\nAbstract classes and interfaces in Java.\n\nVirtual functions in C++.',
    notes: 'Understand the difference between compile-time and runtime polymorphism. Practice designing class hierarchies.'
  },
  {
    id: 'web-2024-http',
    title: 'Web Development - HTTP and REST APIs',
    subject: 'Web Development',
    topic: 'HTTP Protocol',
    year: '2024',
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Design RESTful endpoints for a blog application.\n\nQ2. Explain HTTP methods: GET, POST, PUT, DELETE with use cases.\n\nQ3. Implement status codes handling (200, 404, 500, etc).',
    notes: 'Review HTTP request/response structure. Understand stateless nature of HTTP and session management.'
  },
  {
    id: 'algo-2023-sorting',
    title: 'Algorithms - Sorting and Searching',
    subject: 'Data Structures & Algorithms',
    topic: 'Sorting',
    year: '2023',
    type: 'Notes',
    branch: 'Computer Science',
    content: 'Sorting algorithms: Bubble Sort, Merge Sort, Quick Sort, Heap Sort.\n\nTime complexities: O(n log n) for efficient sorts.\n\nSearching: Binary Search, Linear Search, Hash-based search.',
    notes: 'Master the divide-and-conquer approach. Understand why Quick Sort and Merge Sort are preferred.'
  },
  {
    id: 'softeng-2024-sdlc',
    title: 'Software Engineering - SDLC Models',
    subject: 'Software Engineering',
    topic: 'Software Development Life Cycle',
    year: '2024',
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Compare Waterfall, Agile, and DevOps models.\n\nQ2. Explain the phases of software development.\n\nQ3. Discuss testing strategies (Unit, Integration, System, UAT).',
    notes: 'Review requirements gathering, design patterns, and code quality metrics. Understand when to use agile vs waterfall.'
  },
  {
    id: 'discrete-2023-relations',
    title: 'Discrete Mathematics - Relations and Functions',
    subject: 'Discrete Mathematics',
    topic: 'Relations',
    year: '2023',
    type: 'Notes',
    branch: 'Electrical',
    content: 'Types of relations: Reflexive, Symmetric, Transitive, Equivalence.\n\nFunctions: Injective, Surjective, Bijective.\n\nFunction composition and inverse functions.\n\nCardinality and countability.',
    notes: 'Practice proving properties of relations. Understand the mathematical foundation for computer science.'
  },
  {
    id: 'ml-2024-supervised',
    title: 'Machine Learning - Supervised Learning',
    subject: 'Machine Learning',
    topic: 'Regression & Classification',
    year: '2024',
    type: 'PYQ',
    branch: 'Computer Science',
    content: 'Q1. Explain linear regression and logistic regression.\n\nQ2. Implement decision trees for classification.\n\nQ3. Compare methods using precision, recall, and F1-score metrics.',
    notes: 'Study overfitting and underfitting. Review train-test split and cross-validation techniques.'
  },
  {
    id: 'structures-civil-2023',
    title: 'Structural Analysis - Beams and Load Calculation',
    subject: 'Structural Analysis',
    topic: 'Beams',
    year: '2023',
    type: 'PYQ',
    branch: 'Civil',
    content: 'Q1. Calculate bending moments and shear forces for cantilever beams.\n\nQ2. Design reinforced concrete columns.\n\nQ3. Analyze truss structures using method of joints.',
    notes: 'Review free body diagrams and equilibrium equations. Practice with various loading conditions.'
  },
  {
    id: 'geotechnical-civil-2024',
    title: 'Geotechnical Engineering - Foundation Design',
    subject: 'Geotechnical Engineering',
    topic: 'Foundations',
    year: '2024',
    type: 'Notes',
    branch: 'Civil',
    content: 'Soil properties: Grain size, plasticity index, void ratio.\n\nFoundation types: Shallow and deep foundations.\n\nBearing capacity calculations and settlement analysis.',
    notes: 'Study Terzaghi\'s bearing capacity equation. Understand soil classification and compaction.'
  },
  {
    id: 'circuit-electronics-2023',
    title: 'Electronic Circuits - Amplifiers and Oscillators',
    subject: 'Electronics',
    topic: 'Amplifiers',
    year: '2023',
    type: 'PYQ',
    branch: 'Electronics and Communication',
    content: 'Q1. Design a transistor amplifier with specified gain.\n\nQ2. Calculate feedback factor and stability conditions.\n\nQ3. Analyze oscillator circuits (Colpitts, Hartley, Crystal).',
    notes: 'Review frequency response and Bode plots. Practice stability analysis for feedback circuits.'
  },
  {
    id: 'mechanical-thermodynamics-2023',
    title: 'Thermodynamics - Cycles and Efficiency',
    subject: 'Thermodynamics',
    topic: 'Power Cycles',
    year: '2023',
    type: 'PYQ',
    branch: 'Mechanical',
    content: 'Q1. Apply first and second laws to Otto and Diesel cycles.\n\nQ2. Calculate thermal efficiency and work output.\n\nQ3. Analyze rankine cycle for power plants.',
    notes: 'Study P-V and T-S diagrams. Understand processes like isentropic, isothermal, and adiabatic.'
  },
  {
    id: 'mechanical-fluids-2024',
    title: 'Fluid Mechanics - Pipe Flow and Pumps',
    subject: 'Fluid Mechanics',
    topic: 'Flow in Pipes',
    year: '2024',
    type: 'Notes',
    branch: 'Mechanical',
    content: 'Bernoulli\'s equation and flow rate calculations.\n\nHead loss in pipelines using Darcy-Weisbach equation.\n\nCentrifugal pump characteristics and selection.',
    notes: 'Practice Reynolds number calculations and flow regime identification. Study pump performance curves.'
  }
];

export default contentItems;
