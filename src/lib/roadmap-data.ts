// Structured roadmap data for every subject
import dsaData from "./data/dsa";
import systemDesignData from "./data/system-design";
import csData from "./data/cs";
import blind75Data, { sdeSheet } from "./data/sheets";


export type Problem = {
  name: string;
  desc?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  article?: string;
  yt?: string;
  leetcode?: string;
};

export type Topic = {
  name: string;
  problems: Problem[];
};

export type Step = {
  step: string;
  topics: Topic[];
};

export type SubjectData = {
  title: string;
  subtitle: string;
  steps: Step[];
};


//  BLIND 75 
const blind75: SubjectData = {
  title: "Blind 75 Sheet",
  subtitle: "75 must-do LeetCode problems to crack any FAANG interview.",
  steps: [
    {
      step: "Arrays",
      topics: [
        {
          name: "Array Problems",
          problems: [
            { name: "Two Sum",                              difficulty: "Easy",   leetcode: "https://leetcode.com/problems/two-sum" },
            { name: "Best Time to Buy and Sell Stock",      difficulty: "Easy",   leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock" },
            { name: "Contains Duplicate",                   difficulty: "Easy",   leetcode: "https://leetcode.com/problems/contains-duplicate" },
            { name: "Product of Array Except Self",         difficulty: "Medium", leetcode: "https://leetcode.com/problems/product-of-array-except-self" },
            { name: "Maximum Subarray",                     difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-subarray" },
            { name: "Maximum Product Subarray",             difficulty: "Medium", leetcode: "https://leetcode.com/problems/maximum-product-subarray" },
            { name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array" },
            { name: "Search in Rotated Sorted Array",       difficulty: "Medium", leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array" },
            { name: "3Sum",                                 difficulty: "Medium", leetcode: "https://leetcode.com/problems/3sum" },
            { name: "Container With Most Water",            difficulty: "Medium", leetcode: "https://leetcode.com/problems/container-with-most-water" },
          ],
        },
      ],
    },
    {
      step: "Dynamic Programming",
      topics: [
        {
          name: "DP Problems",
          problems: [
            { name: "Climbing Stairs",               difficulty: "Easy",   leetcode: "https://leetcode.com/problems/climbing-stairs" },
            { name: "Coin Change",                   difficulty: "Medium", leetcode: "https://leetcode.com/problems/coin-change" },
            { name: "Longest Increasing Subsequence",difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-increasing-subsequence" },
            { name: "Longest Common Subsequence",    difficulty: "Medium", leetcode: "https://leetcode.com/problems/longest-common-subsequence" },
            { name: "Word Break",                    difficulty: "Medium", leetcode: "https://leetcode.com/problems/word-break" },
            { name: "House Robber",                  difficulty: "Medium", leetcode: "https://leetcode.com/problems/house-robber" },
            { name: "House Robber II",               difficulty: "Medium", leetcode: "https://leetcode.com/problems/house-robber-ii" },
            { name: "Decode Ways",                   difficulty: "Medium", leetcode: "https://leetcode.com/problems/decode-ways" },
            { name: "Unique Paths",                  difficulty: "Medium", leetcode: "https://leetcode.com/problems/unique-paths" },
            { name: "Jump Game",                     difficulty: "Medium", leetcode: "https://leetcode.com/problems/jump-game" },
          ],
        },
      ],
    },
    {
      step: "Linked List",
      topics: [
        {
          name: "Linked List Problems",
          problems: [
            { name: "Reverse Linked List",                     difficulty: "Easy",   leetcode: "https://leetcode.com/problems/reverse-linked-list" },
            { name: "Linked List Cycle",                       difficulty: "Easy",   leetcode: "https://leetcode.com/problems/linked-list-cycle" },
            { name: "Merge Two Sorted Lists",                  difficulty: "Easy",   leetcode: "https://leetcode.com/problems/merge-two-sorted-lists" },
            { name: "Merge K Sorted Lists",                    difficulty: "Hard",   leetcode: "https://leetcode.com/problems/merge-k-sorted-lists" },
            { name: "Remove Nth Node From End of List",        difficulty: "Medium", leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list" },
            { name: "Reorder List",                            difficulty: "Medium", leetcode: "https://leetcode.com/problems/reorder-list" },
          ],
        },
      ],
    },
    {
      step: "Trees",
      topics: [
        {
          name: "Tree Problems",
          problems: [
            { name: "Maximum Depth of Binary Tree",           difficulty: "Easy",   leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree" },
            { name: "Same Tree",                              difficulty: "Easy",   leetcode: "https://leetcode.com/problems/same-tree" },
            { name: "Invert Binary Tree",                     difficulty: "Easy",   leetcode: "https://leetcode.com/problems/invert-binary-tree" },
            { name: "Binary Tree Maximum Path Sum",           difficulty: "Hard",   leetcode: "https://leetcode.com/problems/binary-tree-maximum-path-sum" },
            { name: "Binary Tree Level Order Traversal",      difficulty: "Medium", leetcode: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
            { name: "Serialize and Deserialize Binary Tree",  difficulty: "Hard",   leetcode: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree" },
            { name: "Validate Binary Search Tree",            difficulty: "Medium", leetcode: "https://leetcode.com/problems/validate-binary-search-tree" },
            { name: "Kth Smallest Element in a BST",         difficulty: "Medium", leetcode: "https://leetcode.com/problems/kth-smallest-element-in-a-bst" },
            { name: "Lowest Common Ancestor of BST",         difficulty: "Medium", leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree" },
          ],
        },
      ],
    },
    {
      step: "Graphs",
      topics: [
        {
          name: "Graph Problems",
          problems: [
            { name: "Clone Graph",                 difficulty: "Medium", leetcode: "https://leetcode.com/problems/clone-graph" },
            { name: "Course Schedule",             difficulty: "Medium", leetcode: "https://leetcode.com/problems/course-schedule" },
            { name: "Pacific Atlantic Water Flow", difficulty: "Medium", leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow" },
            { name: "Number of Islands",           difficulty: "Medium", leetcode: "https://leetcode.com/problems/number-of-islands" },
          ],
        },
      ],
    },
  ],
};

//  CORE CS 
const cs: SubjectData = {
  title: "Core CS Fundamentals",
  subtitle: "In-depth guides on Operating Systems, DBMS, and Computer Networks.",
  steps: [
    {
      step: "Operating Systems",
      topics: [
        {
          name: "Processes & Threads",
          problems: [
            { name: "Process Management",     difficulty: "Easy",   desc: "PCB, process states, fork" },
            { name: "CPU Scheduling",         difficulty: "Medium", desc: "FCFS, SJF, SRTF, Round Robin" },
            { name: "Threads & Concurrency",  difficulty: "Medium", desc: "User threads, kernel threads, race conditions" },
            { name: "Deadlocks",              difficulty: "Hard",   desc: "Conditions, detection, avoidance, Banker's algorithm" },
          ],
        },
        {
          name: "Memory Management",
          problems: [
            { name: "Paging",          difficulty: "Medium", desc: "Page tables, TLB, multi-level paging" },
            { name: "Segmentation",    difficulty: "Medium" },
            { name: "Virtual Memory",  difficulty: "Hard",   desc: "Demand paging, page faults, thrashing" },
          ],
        },
        {
          name: "Storage",
          problems: [
            { name: "File Systems",    difficulty: "Medium" },
            { name: "Disk Scheduling", difficulty: "Medium", desc: "FCFS, SSTF, SCAN, C-SCAN" },
          ],
        },
      ],
    },
    {
      step: "Database Management Systems",
      topics: [
        {
          name: "Fundamentals",
          problems: [
            { name: "ER Model",          difficulty: "Easy" },
            { name: "Relational Model",  difficulty: "Easy" },
            { name: "SQL Basics",        difficulty: "Easy" },
            { name: "Joins",             difficulty: "Medium", desc: "Inner, Left, Right, Full, Self, Cross" },
            { name: "Normalization",     difficulty: "Medium", desc: "1NF, 2NF, 3NF, BCNF" },
          ],
        },
        {
          name: "Advanced DBMS",
          problems: [
            { name: "Transactions & ACID", difficulty: "Medium" },
            { name: "Indexing",            difficulty: "Medium", desc: "B-Tree index, clustered vs non-clustered" },
            { name: "NoSQL Databases",     difficulty: "Medium" },
            { name: "CAP Theorem",         difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Computer Networks",
      topics: [
        {
          name: "Network Basics",
          problems: [
            { name: "OSI Model",         difficulty: "Easy",   desc: "7 layers and their responsibilities" },
            { name: "TCP/IP Model",      difficulty: "Easy" },
            { name: "IP Addressing",     difficulty: "Medium", desc: "IPv4, IPv6, CIDR notation" },
            { name: "Subnetting",        difficulty: "Hard" },
          ],
        },
        {
          name: "Protocols",
          problems: [
            { name: "TCP vs UDP",        difficulty: "Easy" },
            { name: "DNS",               difficulty: "Easy" },
            { name: "HTTP vs HTTPS",     difficulty: "Easy" },
            { name: "SSL/TLS",           difficulty: "Medium" },
            { name: "Network Security",  difficulty: "Hard" },
          ],
        },
      ],
    },
  ],
};

//  SYSTEM DESIGN 
const systemDesign: SubjectData = {
  title: "System Design",
  subtitle: "Prepare for HLD & LLD interviews at FAANG and top product companies.",
  steps: [
    {
      step: "Basics of System Design",
      topics: [
        {
          name: "Fundamentals",
          problems: [
            { name: "What is System Design?",          difficulty: "Easy" },
            { name: "Horizontal vs Vertical Scaling",  difficulty: "Easy" },
            { name: "Load Balancing",                  difficulty: "Medium" },
            { name: "Caching",                         difficulty: "Medium" },
            { name: "Database Indexing",               difficulty: "Medium" },
            { name: "CAP Theorem",                     difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Advanced Architecture Concepts",
      topics: [
        {
          name: "Architecture Patterns",
          problems: [
            { name: "Microservices",       difficulty: "Medium" },
            { name: "Message Queues",      difficulty: "Medium" },
            { name: "Event-Driven Systems",difficulty: "Hard" },
            { name: "API Gateways",        difficulty: "Medium" },
            { name: "Authentication Flows",difficulty: "Medium" },
          ],
        },
      ],
    },
    {
      step: "System Design Practice Problems",
      topics: [
        {
          name: "Real-World Designs",
          problems: [
            { name: "Design Instagram",   difficulty: "Hard" },
            { name: "Design WhatsApp",    difficulty: "Hard" },
            { name: "Design Netflix",     difficulty: "Hard" },
            { name: "Design Uber",        difficulty: "Hard" },
            { name: "Design Amazon",      difficulty: "Hard" },
            { name: "Design Google Docs", difficulty: "Hard" },
          ],
        },
      ],
    },
  ],
};

//  WEB DEVELOPMENT 
const web: SubjectData = {
  title: "Web Development Roadmap",
  subtitle: "Master full-stack development from HTML basics to cloud deployment.",
  steps: [
    {
      step: "Frontend Fundamentals",
      topics: [
        {
          name: "Core Web Technologies",
          problems: [
            { name: "HTML Basics",            difficulty: "Easy" },
            { name: "CSS & Flexbox / Grid",   difficulty: "Easy" },
            { name: "JavaScript Essentials",  difficulty: "Medium" },
            { name: "DOM Manipulation",       difficulty: "Medium" },
            { name: "ES6+ Features",          difficulty: "Medium" },
          ],
        },
        {
          name: "React",
          problems: [
            { name: "Components & Props",     difficulty: "Easy" },
            { name: "State & Hooks",          difficulty: "Medium" },
            { name: "Context API",            difficulty: "Medium" },
            { name: "React Router",           difficulty: "Medium" },
            { name: "Performance Optimisations",difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Backend Development",
      topics: [
        {
          name: "Node.js & Express",
          problems: [
            { name: "Node.js Basics",     difficulty: "Easy" },
            { name: "Express Routing",    difficulty: "Easy" },
            { name: "REST API Design",    difficulty: "Medium" },
            { name: "Middleware",         difficulty: "Medium" },
            { name: "Authentication JWT", difficulty: "Medium" },
          ],
        },
        {
          name: "Databases",
          problems: [
            { name: "SQL with PostgreSQL", difficulty: "Medium" },
            { name: "MongoDB & Mongoose",  difficulty: "Medium" },
            { name: "Prisma ORM",          difficulty: "Medium" },
          ],
        },
      ],
    },
    {
      step: "DevOps & Deployment",
      topics: [
        {
          name: "Deployment",
          problems: [
            { name: "Docker Basics",     difficulty: "Medium" },
            { name: "CI/CD Pipelines",   difficulty: "Hard" },
            { name: "Cloud Hosting",     difficulty: "Hard" },
          ],
        },
      ],
    },
  ],
};

//  ML 
const ml: SubjectData = {
  title: "Machine Learning Roadmap",
  subtitle: "From Python basics to neural networks and NLP.",
  steps: [
    {
      step: "Python & Data Manipulation",
      topics: [
        {
          name: "Python for ML",
          problems: [
            { name: "Python Basics",    difficulty: "Easy" },
            { name: "NumPy",            difficulty: "Easy" },
            { name: "Pandas",           difficulty: "Medium" },
            { name: "Matplotlib",       difficulty: "Easy" },
          ],
        },
      ],
    },
    {
      step: "Classical Machine Learning",
      topics: [
        {
          name: "Supervised Learning",
          problems: [
            { name: "Linear Regression",    difficulty: "Easy" },
            { name: "Logistic Regression",  difficulty: "Easy" },
            { name: "Decision Trees",       difficulty: "Medium" },
            { name: "Random Forest",        difficulty: "Medium" },
            { name: "SVM",                  difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Deep Learning",
      topics: [
        {
          name: "Neural Networks",
          problems: [
            { name: "Neural Network Basics",  difficulty: "Medium" },
            { name: "CNNs",                   difficulty: "Hard" },
            { name: "RNNs & LSTMs",           difficulty: "Hard" },
            { name: "NLP Basics",             difficulty: "Hard" },
          ],
        },
      ],
    },
  ],
};

export const SUBJECT_MAP: Record<string, SubjectData> = {
  dsa: dsaData,
  blind75: blind75Data,
  "striver-sde": sdeSheet,
  cs: csData,
  "system-design": systemDesignData,
  web,
  ml,
};
