import type { SubjectData } from "../roadmap-data";

const cs: SubjectData = {
  title: "Core CS Fundamentals",
  subtitle: "Master Operating Systems, DBMS, Computer Networks, and OOP  the backbone of every CS interview.",
  steps: [
    {
      step: "Step 1: Operating Systems",
      topics: [
        {
          name: "1.1 Introduction to OS",
          problems: [
            { name: "What is an Operating System? Goals and Functions", difficulty: "Easy" },
            { name: "Types of Operating Systems (Batch, Time-Sharing, Real-Time, Distributed)", difficulty: "Easy" },
            { name: "Kernel vs User Space", difficulty: "Easy" },
            { name: "System Calls", difficulty: "Easy" },
            { name: "Microkernel vs Monolithic Kernel", difficulty: "Medium" },
          ],
        },
        {
          name: "1.2 Process Management",
          problems: [
            { name: "Process vs Program vs Thread", difficulty: "Easy" },
            { name: "Process Control Block (PCB)", difficulty: "Easy" },
            { name: "Process States (New, Ready, Running, Waiting, Terminated)", difficulty: "Easy" },
            { name: "Context Switching", difficulty: "Medium" },
            { name: "fork() and exec() system calls", difficulty: "Medium" },
            { name: "Orphan Process and Zombie Process", difficulty: "Medium" },
            { name: "Inter-Process Communication (IPC)  Pipes, Message Queues, Shared Memory, Sockets", difficulty: "Medium" },
          ],
        },
        {
          name: "1.3 CPU Scheduling",
          problems: [
            { name: "CPU Scheduling  Criteria (CPU Utilization, Throughput, Turnaround, Waiting, Response)", difficulty: "Easy" },
            { name: "FCFS (First Come First Serve)", difficulty: "Easy" },
            { name: "SJF (Shortest Job First)  Non-Preemptive", difficulty: "Easy" },
            { name: "SRTF (Shortest Remaining Time First)  Preemptive SJF", difficulty: "Medium" },
            { name: "Round Robin Scheduling", difficulty: "Medium" },
            { name: "Priority Scheduling (Preemptive and Non-Preemptive)", difficulty: "Medium" },
            { name: "Multilevel Queue Scheduling", difficulty: "Hard" },
            { name: "Starvation and Aging", difficulty: "Medium" },
          ],
        },
        {
          name: "1.4 Threads and Concurrency",
          problems: [
            { name: "Threads  User Level vs Kernel Level", difficulty: "Easy" },
            { name: "Multithreading Models (Many-to-One, One-to-One, Many-to-Many)", difficulty: "Medium" },
            { name: "Race Condition", difficulty: "Medium" },
            { name: "Critical Section Problem", difficulty: "Medium" },
            { name: "Peterson's Solution", difficulty: "Medium" },
            { name: "Mutex vs Semaphore", difficulty: "Medium" },
            { name: "Binary Semaphore vs Counting Semaphore", difficulty: "Medium" },
            { name: "Monitors", difficulty: "Hard" },
          ],
        },
        {
          name: "1.5 Deadlocks",
          problems: [
            { name: "What is a Deadlock?", difficulty: "Easy" },
            { name: "4 Necessary Conditions for Deadlock (Coffman Conditions)", difficulty: "Medium" },
            { name: "Deadlock Prevention", difficulty: "Medium" },
            { name: "Deadlock Avoidance  Banker's Algorithm", difficulty: "Hard" },
            { name: "Deadlock Detection", difficulty: "Hard" },
            { name: "Deadlock Recovery", difficulty: "Medium" },
            { name: "Livelock vs Deadlock vs Starvation", difficulty: "Medium" },
          ],
        },
        {
          name: "1.6 Memory Management",
          problems: [
            { name: "Contiguous Memory Allocation  Fixed and Variable Partitioning", difficulty: "Medium" },
            { name: "Internal vs External Fragmentation", difficulty: "Easy" },
            { name: "Paging  Page Table, TLB", difficulty: "Medium" },
            { name: "Multilevel Paging", difficulty: "Hard" },
            { name: "Segmentation", difficulty: "Medium" },
            { name: "Segmentation with Paging", difficulty: "Hard" },
            { name: "Virtual Memory and Demand Paging", difficulty: "Hard" },
            { name: "Page Replacement Algorithms  FIFO, LRU, Optimal, LFU", difficulty: "Hard" },
            { name: "Thrashing", difficulty: "Hard" },
            { name: "Working Set Model", difficulty: "Hard" },
          ],
        },
        {
          name: "1.7 File Systems & Storage",
          problems: [
            { name: "File Attributes, File Operations", difficulty: "Easy" },
            { name: "File Allocation Methods  Contiguous, Linked, Indexed", difficulty: "Medium" },
            { name: "Directory Structure  Single-Level, Two-Level, Tree, Acyclic-Graph", difficulty: "Medium" },
            { name: "Disk Scheduling Algorithms  FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK", difficulty: "Hard" },
            { name: "RAID Levels", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 2: Database Management Systems (DBMS)",
      topics: [
        {
          name: "2.1 Introduction to DBMS",
          problems: [
            { name: "File System vs DBMS", difficulty: "Easy" },
            { name: "Database Architecture  1-Tier, 2-Tier, 3-Tier", difficulty: "Easy" },
            { name: "Data Abstraction  Physical, Logical, View Level", difficulty: "Easy" },
            { name: "Database Languages  DDL, DML, DCL, TCL", difficulty: "Easy" },
            { name: "DBMS vs RDBMS", difficulty: "Easy" },
          ],
        },
        {
          name: "2.2 ER Model",
          problems: [
            { name: "Entity, Attributes, Relationships", difficulty: "Easy" },
            { name: "Types of Attributes  Simple, Composite, Multi-valued, Derived", difficulty: "Easy" },
            { name: "Types of Relationships  1:1, 1:N, M:N", difficulty: "Easy" },
            { name: "Participation Constraints  Total vs Partial", difficulty: "Medium" },
            { name: "ER Diagram to Relational Schema conversion", difficulty: "Medium" },
            { name: "Weak Entity Sets", difficulty: "Medium" },
          ],
        },
        {
          name: "2.3 Relational Model & SQL",
          problems: [
            { name: "Relational Model  Keys (Primary, Foreign, Candidate, Super)", difficulty: "Easy" },
            { name: "Relational Algebra  Select, Project, Join, Union, Difference", difficulty: "Medium" },
            { name: "SQL Basics  SELECT, INSERT, UPDATE, DELETE", difficulty: "Easy" },
            { name: "SQL Clauses  WHERE, GROUP BY, HAVING, ORDER BY", difficulty: "Easy" },
            { name: "SQL Joins  INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF", difficulty: "Medium" },
            { name: "SQL Aggregate Functions  COUNT, SUM, AVG, MIN, MAX", difficulty: "Easy" },
            { name: "SQL Subqueries  Correlated and Non-Correlated", difficulty: "Medium" },
            { name: "SQL Views", difficulty: "Medium" },
            { name: "SQL Triggers and Stored Procedures", difficulty: "Hard" },
            { name: "Window Functions  ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD", difficulty: "Hard" },
          ],
        },
        {
          name: "2.4 Normalization",
          problems: [
            { name: "Functional Dependencies", difficulty: "Medium" },
            { name: "Closure of Attributes, Closure of FDs", difficulty: "Medium" },
            { name: "1NF (First Normal Form)", difficulty: "Easy" },
            { name: "2NF (Second Normal Form)", difficulty: "Medium" },
            { name: "3NF (Third Normal Form)", difficulty: "Medium" },
            { name: "BCNF (Boyce-Codd Normal Form)", difficulty: "Hard" },
            { name: "4NF and 5NF", difficulty: "Hard" },
            { name: "Lossless and Dependency Preserving Decomposition", difficulty: "Hard" },
          ],
        },
        {
          name: "2.5 Transactions and Concurrency",
          problems: [
            { name: "Transactions  ACID Properties", difficulty: "Medium" },
            { name: "Concurrency Problems  Dirty Read, Lost Update, Unrepeatable Read, Phantom Read", difficulty: "Medium" },
            { name: "Transaction Isolation Levels  Read Uncommitted, Read Committed, Repeatable Read, Serializable", difficulty: "Hard" },
            { name: "Serializability  Conflict and View", difficulty: "Hard" },
            { name: "Locking  2-Phase Locking (2PL), Strict 2PL", difficulty: "Hard" },
            { name: "Deadlock in Transactions", difficulty: "Hard" },
            { name: "Timestamp-Based Concurrency Control", difficulty: "Hard" },
          ],
        },
        {
          name: "2.6 Indexing and Advanced Topics",
          problems: [
            { name: "Indexing  Dense vs Sparse Index", difficulty: "Medium" },
            { name: "B-Tree and B+ Tree Indexes", difficulty: "Hard" },
            { name: "Clustered vs Non-Clustered Index", difficulty: "Medium" },
            { name: "Hashing in Databases  Static and Dynamic Hashing", difficulty: "Hard" },
            { name: "Query Optimization  Cost-based and Rule-based", difficulty: "Hard" },
            { name: "NoSQL Databases  Document, Key-Value, Column-Family, Graph", difficulty: "Medium" },
            { name: "MongoDB Basics", difficulty: "Medium" },
            { name: "CAP Theorem in Databases", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 3: Computer Networks",
      topics: [
        {
          name: "3.1 Network Fundamentals",
          problems: [
            { name: "What is a Network? LAN vs WAN vs MAN", difficulty: "Easy" },
            { name: "Network Topologies  Bus, Star, Ring, Mesh, Tree", difficulty: "Easy" },
            { name: "Transmission Modes  Simplex, Half-Duplex, Full-Duplex", difficulty: "Easy" },
            { name: "Guided vs Unguided Transmission Media", difficulty: "Easy" },
            { name: "Bandwidth, Throughput, and Latency", difficulty: "Easy" },
          ],
        },
        {
          name: "3.2 OSI Model",
          problems: [
            { name: "OSI Model  7 Layers and their responsibilities", difficulty: "Easy" },
            { name: "Physical Layer  Encoding, Signals, Multiplexing", difficulty: "Medium" },
            { name: "Data Link Layer  Framing, MAC Address, Error Detection/Correction, Flow Control", difficulty: "Medium" },
            { name: "Network Layer  IP Addressing, Routing, Subnetting", difficulty: "Medium" },
            { name: "Transport Layer  TCP vs UDP, Port Numbers, Multiplexing", difficulty: "Medium" },
            { name: "Session, Presentation, Application Layers", difficulty: "Easy" },
            { name: "OSI vs TCP/IP Model", difficulty: "Easy" },
          ],
        },
        {
          name: "3.3 IP Addressing and Subnetting",
          problems: [
            { name: "IPv4 Addressing  Classes (A, B, C, D, E)", difficulty: "Easy" },
            { name: "Subnetting  CIDR Notation, Subnet Mask", difficulty: "Hard" },
            { name: "Subnetting Practice Problems", difficulty: "Hard" },
            { name: "Private vs Public IP Addresses", difficulty: "Easy" },
            { name: "NAT (Network Address Translation)", difficulty: "Medium" },
            { name: "IPv6  Address Format, Need, Differences from IPv4", difficulty: "Medium" },
            { name: "VLSM (Variable Length Subnet Masking)", difficulty: "Hard" },
          ],
        },
        {
          name: "3.4 Protocols",
          problems: [
            { name: "TCP  Three-Way Handshake, Four-Way Termination", difficulty: "Medium" },
            { name: "TCP  Flow Control (Sliding Window), Congestion Control", difficulty: "Hard" },
            { name: "UDP  When to use, advantages, disadvantages", difficulty: "Easy" },
            { name: "DNS  Resolution Process, Record Types (A, CNAME, MX, NS, PTR)", difficulty: "Medium" },
            { name: "DHCP  How dynamic IP assignment works", difficulty: "Easy" },
            { name: "HTTP  Request/Response, Methods, Status Codes", difficulty: "Easy" },
            { name: "HTTPS and SSL/TLS Handshake", difficulty: "Medium" },
            { name: "FTP, SMTP, POP3, IMAP", difficulty: "Easy" },
            { name: "ARP and RARP", difficulty: "Medium" },
            { name: "ICMP and Ping", difficulty: "Easy" },
          ],
        },
        {
          name: "3.5 Routing",
          problems: [
            { name: "Routing Algorithms  Distance Vector, Link State", difficulty: "Hard" },
            { name: "RIP (Routing Information Protocol)", difficulty: "Medium" },
            { name: "OSPF (Open Shortest Path First)", difficulty: "Hard" },
            { name: "BGP (Border Gateway Protocol)", difficulty: "Hard" },
            { name: "Static vs Dynamic Routing", difficulty: "Easy" },
          ],
        },
        {
          name: "3.6 Network Security",
          problems: [
            { name: "Firewall  Packet Filtering, Stateful, Application Layer", difficulty: "Medium" },
            { name: "VPN (Virtual Private Network)", difficulty: "Medium" },
            { name: "Common Attacks  DDoS, MITM, Phishing, SQL Injection, XSS", difficulty: "Medium" },
            { name: "Symmetric vs Asymmetric Encryption", difficulty: "Medium" },
            { name: "Digital Certificates and PKI", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 4: Object-Oriented Programming (OOP)",
      topics: [
        {
          name: "4.1 OOP Concepts",
          problems: [
            { name: "Class and Object", difficulty: "Easy" },
            { name: "Encapsulation", difficulty: "Easy" },
            { name: "Abstraction", difficulty: "Easy" },
            { name: "Inheritance  Types (Single, Multiple, Multilevel, Hierarchical, Hybrid)", difficulty: "Medium" },
            { name: "Polymorphism  Compile-Time (Overloading) and Runtime (Overriding)", difficulty: "Medium" },
            { name: "Constructor and Destructor", difficulty: "Easy" },
            { name: "this keyword, static members", difficulty: "Easy" },
            { name: "Abstract Class vs Interface", difficulty: "Medium" },
            { name: "Virtual Functions and vtable", difficulty: "Hard" },
          ],
        },
        {
          name: "4.2 Advanced OOP",
          problems: [
            { name: "Composition vs Aggregation vs Association", difficulty: "Medium" },
            { name: "Shallow Copy vs Deep Copy", difficulty: "Medium" },
            { name: "operator overloading", difficulty: "Medium" },
            { name: "Exception Handling  try, catch, throw, finally", difficulty: "Medium" },
            { name: "Generics / Templates", difficulty: "Medium" },
            { name: "SOLID Principles in OOP", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 5: Compiler Design & Theory of Computation",
      topics: [
        {
          name: "5.1 Compiler Phases",
          problems: [
            { name: "Phases of a Compiler", difficulty: "Easy" },
            { name: "Lexical Analysis  Tokens, Lexemes, DFA/NFA", difficulty: "Medium" },
            { name: "Syntax Analysis  CFG, Parse Trees, Derivations", difficulty: "Hard" },
            { name: "Semantic Analysis and Type Checking", difficulty: "Hard" },
            { name: "Intermediate Code Generation", difficulty: "Hard" },
            { name: "Code Optimization Techniques", difficulty: "Hard" },
          ],
        },
        {
          name: "5.2 Theory of Computation",
          problems: [
            { name: "Finite Automata  DFA, NFA", difficulty: "Medium" },
            { name: "Regular Expressions and Regular Languages", difficulty: "Medium" },
            { name: "Context-Free Grammars (CFG) and Pushdown Automata (PDA)", difficulty: "Hard" },
            { name: "Turing Machines", difficulty: "Hard" },
            { name: "P vs NP and NP-Complete Problems", difficulty: "Hard" },
          ],
        },
      ],
    },
  ],
};

export default cs;
