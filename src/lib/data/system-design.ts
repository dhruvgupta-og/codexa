import type { SubjectData } from "../roadmap-data";

const systemDesign: SubjectData = {
  title: "System Design (HLD + LLD)",
  subtitle: "Master High-Level and Low-Level design for FAANG and top product company interviews.",
  steps: [
    {
      step: "Step 1: Fundamentals of System Design",
      topics: [
        {
          name: "1.1 What is System Design?",
          problems: [
            { name: "What is System Design and why does it matter?", difficulty: "Easy" },
            { name: "Difference between HLD and LLD", difficulty: "Easy" },
            { name: "How to approach a System Design interview", difficulty: "Easy" },
            { name: "Functional vs Non-Functional Requirements", difficulty: "Easy" },
            { name: "Back-of-the-envelope Estimation (BOE)", difficulty: "Medium" },
          ],
        },
        {
          name: "1.2 Scalability Basics",
          problems: [
            { name: "Vertical Scaling vs Horizontal Scaling", difficulty: "Easy" },
            { name: "What is a Load Balancer?", difficulty: "Easy" },
            { name: "Load Balancing Algorithms (Round Robin, Least Connections, IP Hash)", difficulty: "Medium" },
            { name: "Stateless vs Stateful Services", difficulty: "Easy" },
            { name: "What is a Reverse Proxy?", difficulty: "Easy" },
            { name: "Forward Proxy vs Reverse Proxy vs API Gateway", difficulty: "Medium" },
          ],
        },
        {
          name: "1.3 Networking Basics for System Design",
          problems: [
            { name: "How the Internet Works (TCP/IP, DNS, HTTP)", difficulty: "Easy" },
            { name: "HTTP vs HTTPS vs HTTP/2 vs HTTP/3", difficulty: "Medium" },
            { name: "WebSockets vs Long Polling vs SSE", difficulty: "Medium" },
            { name: "REST vs GraphQL vs gRPC", difficulty: "Medium" },
            { name: "CDN (Content Delivery Network)  how it works", difficulty: "Medium" },
          ],
        },
      ],
    },
    {
      step: "Step 2: Databases in System Design",
      topics: [
        {
          name: "2.1 SQL vs NoSQL",
          problems: [
            { name: "Relational Databases (PostgreSQL, MySQL)  when to use", difficulty: "Easy" },
            { name: "NoSQL Databases  Types (Document, Key-Value, Column-Family, Graph)", difficulty: "Medium" },
            { name: "When to choose SQL over NoSQL and vice versa", difficulty: "Medium" },
            { name: "ACID Properties", difficulty: "Medium" },
            { name: "BASE Properties", difficulty: "Medium" },
            { name: "CAP Theorem", difficulty: "Hard" },
            { name: "PACELC Theorem", difficulty: "Hard" },
          ],
        },
        {
          name: "2.2 Database Internals",
          problems: [
            { name: "Database Indexing  B-Tree, Hash Index", difficulty: "Medium" },
            { name: "Database Sharding  Horizontal Partitioning", difficulty: "Hard" },
            { name: "Database Replication  Master-Slave, Master-Master", difficulty: "Hard" },
            { name: "Read Replicas", difficulty: "Medium" },
            { name: "Database Connection Pooling", difficulty: "Medium" },
            { name: "Consistent Hashing", difficulty: "Hard" },
          ],
        },
        {
          name: "2.3 Caching",
          problems: [
            { name: "What is Caching and why use it?", difficulty: "Easy" },
            { name: "Cache Eviction Policies  LRU, LFU, FIFO", difficulty: "Medium" },
            { name: "Cache Invalidation Strategies", difficulty: "Medium" },
            { name: "Write-Through vs Write-Back vs Write-Around Cache", difficulty: "Medium" },
            { name: "Redis vs Memcached", difficulty: "Medium" },
            { name: "Cache Stampede / Thundering Herd Problem", difficulty: "Hard" },
            { name: "Distributed Caching", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 3: Messaging and Async Communication",
      topics: [
        {
          name: "3.1 Message Queues",
          problems: [
            { name: "Why Message Queues? (Decoupling, Async Processing)", difficulty: "Easy" },
            { name: "Kafka vs RabbitMQ vs SQS", difficulty: "Medium" },
            { name: "Pub-Sub Pattern", difficulty: "Medium" },
            { name: "At-Least-Once vs At-Most-Once vs Exactly-Once Delivery", difficulty: "Hard" },
            { name: "Dead Letter Queues", difficulty: "Medium" },
            { name: "Event Sourcing", difficulty: "Hard" },
            { name: "CQRS (Command Query Responsibility Segregation)", difficulty: "Hard" },
          ],
        },
        {
          name: "3.2 Design Patterns",
          problems: [
            { name: "Saga Pattern (Distributed Transactions)", difficulty: "Hard" },
            { name: "Circuit Breaker Pattern", difficulty: "Hard" },
            { name: "Retry with Exponential Backoff", difficulty: "Medium" },
            { name: "Bulkhead Pattern", difficulty: "Hard" },
            { name: "Sidecar Pattern", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 4: Microservices and Distributed Systems",
      topics: [
        {
          name: "4.1 Microservices Architecture",
          problems: [
            { name: "Monolith vs Microservices", difficulty: "Easy" },
            { name: "When to use Microservices?", difficulty: "Medium" },
            { name: "Service Discovery (Consul, Eureka)", difficulty: "Medium" },
            { name: "API Gateway Pattern", difficulty: "Medium" },
            { name: "Inter-Service Communication (Sync vs Async)", difficulty: "Medium" },
          ],
        },
        {
          name: "4.2 Distributed Systems Concepts",
          problems: [
            { name: "Distributed Consensus  Paxos, Raft", difficulty: "Hard" },
            { name: "Leader Election", difficulty: "Hard" },
            { name: "Distributed Locking", difficulty: "Hard" },
            { name: "Two-Phase Commit (2PC)", difficulty: "Hard" },
            { name: "Vector Clocks and Lamport Timestamps", difficulty: "Hard" },
            { name: "Gossip Protocol", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 5: Authentication and Security",
      topics: [
        {
          name: "5.1 Authentication",
          problems: [
            { name: "Session-Based vs Token-Based Authentication", difficulty: "Easy" },
            { name: "JWT (JSON Web Tokens)", difficulty: "Medium" },
            { name: "OAuth 2.0 and OpenID Connect", difficulty: "Medium" },
            { name: "API Keys vs OAuth Tokens", difficulty: "Medium" },
            { name: "Multi-Factor Authentication (MFA)", difficulty: "Medium" },
            { name: "Single Sign-On (SSO)", difficulty: "Medium" },
          ],
        },
        {
          name: "5.2 Security Best Practices",
          problems: [
            { name: "HTTPS and TLS", difficulty: "Easy" },
            { name: "SQL Injection and XSS Prevention", difficulty: "Medium" },
            { name: "Rate Limiting and Throttling", difficulty: "Medium" },
            { name: "DDoS Protection", difficulty: "Hard" },
            { name: "Data Encryption at Rest and in Transit", difficulty: "Medium" },
          ],
        },
      ],
    },
    {
      step: "Step 6: Low-Level Design (LLD)",
      topics: [
        {
          name: "6.1 OOP and SOLID Principles",
          problems: [
            { name: "SOLID Principles with examples", difficulty: "Medium" },
            { name: "DRY, KISS, YAGNI Principles", difficulty: "Easy" },
            { name: "Composition vs Inheritance", difficulty: "Medium" },
            { name: "Dependency Injection", difficulty: "Medium" },
          ],
        },
        {
          name: "6.2 Design Patterns (GoF)",
          problems: [
            { name: "Creational: Singleton, Factory, Abstract Factory, Builder, Prototype", difficulty: "Medium" },
            { name: "Structural: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy", difficulty: "Medium" },
            { name: "Behavioral: Chain of Responsibility, Command, Iterator, Observer, State, Strategy, Template Method, Visitor", difficulty: "Hard" },
          ],
        },
        {
          name: "6.3 LLD Practice Problems",
          problems: [
            { name: "Design Parking Lot", difficulty: "Medium" },
            { name: "Design LRU Cache", difficulty: "Medium" },
            { name: "Design a Library Management System", difficulty: "Medium" },
            { name: "Design a Ride-Sharing App (Uber/Ola)  LLD", difficulty: "Hard" },
            { name: "Design Chess Game", difficulty: "Hard" },
            { name: "Design Elevator System", difficulty: "Hard" },
            { name: "Design Tic-Tac-Toe", difficulty: "Easy" },
            { name: "Design Snake and Ladder", difficulty: "Medium" },
            { name: "Design ATM", difficulty: "Medium" },
            { name: "Design Hotel Booking System", difficulty: "Hard" },
            { name: "Design Food Delivery System (Swiggy / Zomato)", difficulty: "Hard" },
            { name: "Design Splitwise", difficulty: "Hard" },
          ],
        },
      ],
    },
    {
      step: "Step 7: Real-World System Design Problems (HLD)",
      topics: [
        {
          name: "7.1 Social Media & Communication",
          problems: [
            { name: "Design WhatsApp / Messenger", difficulty: "Hard" },
            { name: "Design Twitter / X", difficulty: "Hard" },
            { name: "Design Instagram", difficulty: "Hard" },
            { name: "Design Facebook Newsfeed", difficulty: "Hard" },
            { name: "Design Notification System", difficulty: "Hard" },
          ],
        },
        {
          name: "7.2 Video & Streaming",
          problems: [
            { name: "Design YouTube / Netflix", difficulty: "Hard" },
            { name: "Design Live Video Streaming", difficulty: "Hard" },
            { name: "Design a Video Transcoding Pipeline", difficulty: "Hard" },
          ],
        },
        {
          name: "7.3 E-Commerce & Payments",
          problems: [
            { name: "Design Amazon / Flipkart", difficulty: "Hard" },
            { name: "Design a Payment System (like Stripe / PayPal)", difficulty: "Hard" },
            { name: "Design a Flash Sale System", difficulty: "Hard" },
            { name: "Design a Shopping Cart", difficulty: "Medium" },
          ],
        },
        {
          name: "7.4 Ride-Sharing & Maps",
          problems: [
            { name: "Design Uber / Ola (HLD)", difficulty: "Hard" },
            { name: "Design Google Maps", difficulty: "Hard" },
            { name: "Design Proximity Service / Yelp", difficulty: "Hard" },
          ],
        },
        {
          name: "7.5 Search & Storage",
          problems: [
            { name: "Design Google Search / Search Autocomplete", difficulty: "Hard" },
            { name: "Design Google Drive / Dropbox", difficulty: "Hard" },
            { name: "Design a URL Shortener (TinyURL)", difficulty: "Medium" },
            { name: "Design Pastebin", difficulty: "Medium" },
            { name: "Design a Web Crawler", difficulty: "Hard" },
          ],
        },
        {
          name: "7.6 Other Popular Problems",
          problems: [
            { name: "Design a Distributed Cache (Redis)", difficulty: "Hard" },
            { name: "Design a Rate Limiter", difficulty: "Hard" },
            { name: "Design a Distributed Message Queue (Kafka)", difficulty: "Hard" },
            { name: "Design a Distributed Key-Value Store", difficulty: "Hard" },
            { name: "Design a Typeahead / Autocomplete System", difficulty: "Hard" },
            { name: "Design a Leaderboard System", difficulty: "Medium" },
            { name: "Design a Metrics and Monitoring System", difficulty: "Hard" },
            { name: "Design Google Docs (Real-time Collaboration)", difficulty: "Hard" },
            { name: "Design a Job Scheduler / Task Queue", difficulty: "Hard" },
          ],
        },
      ],
    },
  ],
};

export default systemDesign;
