export const profile = {
  name: "Suneel Kumar",
  title: "Senior Java Full Stack Developer",
  tagline:
    "10+ years designing secure, scalable, enterprise-grade systems with Java, Spring Boot, AWS, and modern front ends — now building payment platforms that move millions of transactions a day, and the GenAI tooling that keeps them running.",
  phone: "281-786-5856",
  email: "suneeluhcl@gmail.com",
  typingWords: ["Java", "Spring Boot", "Go", "Python", "React", "Angular", "AWS", "Microservices", "GenAI", "AI Agents"],
};

export const about = [
  "I'm a senior engineer with a decade of experience turning complex business problems into clean, resilient software. Today I work in Capital One's Payments Fulfillment domain, building the systems that fulfill every credit card payment — ACH, debit, check, balance transfers, and cross-border EFT — processing millions of financial transactions per day.",
  "My foundation is modern Java: I led my team's first production migration to Java 21 and Spring Boot 4, and I've driven Java 8 → 17 modernizations, Jakarta EE 10 upgrades, and zero-downtime monolith decompositions. But I'm deliberately polyglot — production Go, Python, and TypeScript microservices, plus big-data pipelines in Apache Spark on EMR, Databricks, Kafka, and Flink SQL feeding Snowflake and OneLake.",
  "Security isn't an afterthought in my work — it's the architecture. OAuth2, OIDC, JWT, mutual TLS/PKI, field-level and PGP encryption, least-privilege IAM, and PCI DSS / NIST 800-53 compliance are embedded in everything I ship. On AWS I design event-driven microservices across ECS Fargate, Lambda, Step Functions, DynamoDB, SQS, and EventBridge — deployed active/active across regions with automated failover.",
  "And I build with AI, not just talk about it. I've shipped a production LLM inference service that guides daily payment operations, authored reusable AI agent skills (Claude Code) that partner teams use to automate their workflows, and I hold AWS Solutions Architect – Professional and Google Cloud Professional Machine Learning Engineer certifications.",
];

export const skillCategories = [
  {
    title: "Languages",
    icon: "Code2",
    items: ["Java 8/11/17/21", "Go", "Python", "TypeScript", "JavaScript (ES6+)", "SQL", "Scala"],
  },
  {
    title: "Backend",
    icon: "Layers",
    items: [
      "Spring Boot 2.x–4.x", "Spring Security", "Spring Cloud", "Hibernate/JPA", "Node.js",
      "FastAPI", "RESTful APIs", "OpenAPI/Swagger", "GraphQL", "Microservices",
    ],
  },
  {
    title: "Frontend",
    icon: "MonitorSmartphone",
    items: ["React", "Angular 2–14", "TypeScript", "RxJS", "HTML5", "CSS3", "Bootstrap", "Responsive Design"],
  },
  {
    title: "Cloud (AWS)",
    icon: "Cloud",
    items: [
      "ECS Fargate", "Lambda", "Step Functions", "DynamoDB", "S3", "SQS", "SNS", "EventBridge",
      "EMR", "Glue", "RDS", "KMS", "Secrets Manager", "IAM", "Route 53", "CloudWatch", "CDK", "CloudFormation",
    ],
  },
  {
    title: "Data & Streaming",
    icon: "Workflow",
    items: ["Apache Spark", "Apache Kafka", "Apache Flink", "Databricks", "Snowflake", "Microsoft OneLake", "ETL Pipelines"],
  },
  {
    title: "Databases",
    icon: "Database",
    items: ["DynamoDB", "Oracle", "PostgreSQL", "MySQL", "MongoDB", "Cassandra", "IBM DB2", "SQL Server"],
  },
  {
    title: "AI / GenAI",
    icon: "BrainCircuit",
    items: [
      "LLM Integration", "AI Agents & Agentic Workflows", "Claude Code", "Prompt Engineering",
      "RAG", "GenAI Inference Services", "Vertex AI", "MLOps",
    ],
  },
  {
    title: "Security",
    icon: "ShieldCheck",
    items: [
      "OAuth2", "OIDC", "JWT", "SAML", "Mutual TLS / PKI", "KMS Encryption", "PGP",
      "Vault", "Checkmarx", "PCI DSS", "NIST 800-53", "LDAP/AD",
    ],
  },
  {
    title: "DevOps & CI/CD",
    icon: "Container",
    items: ["Docker", "Kubernetes", "Jenkins", "GitHub", "Maven", "Gradle", "Terraform", "SonarQube"],
  },
  {
    title: "Testing",
    icon: "FlaskConical",
    items: ["JUnit 5", "Mockito", "Cucumber", "Behave", "Godog", "WireMock", "Playwright", "JMeter", "TDD/BDD"],
  },
  {
    title: "Observability",
    icon: "Activity",
    items: ["Splunk", "OpenTelemetry", "CloudWatch", "New Relic", "PagerDuty", "X-Ray"],
  },
];

export const experience = [
  {
    company: "Capital One",
    location: "Richmond, VA",
    title: "Senior Java Full Stack Developer",
    dates: "Nov 2023 – Present",
    stack: ["Java 17/21", "Spring Boot 3/4", "Go", "Python", "AWS", "Spark/EMR", "Kafka", "GenAI"],
    bullets: [
      "Build mission-critical payment fulfillment microservices processing millions of credit card payments per day — ACH, debit, check, balance transfers, and cross-border EFT.",
      "Own the public-facing Fulfillment API (Java 17, Spring Boot 3.x on ECS Fargate) secured with OAuth2, mutual TLS, and field-level encryption.",
      "Led the first production migration to Java 21 / Spring Boot 4, hardened with Resilience4j circuit breakers and SQS retry/fallback queues.",
      "Built vendor file ingestion on AWS Step Functions (40+ vendor formats) and the EMR Spark pipeline generating TSYS posting files with automated reconciliation.",
      "Contribute to a next-generation real-time money movement platform in Go — event-driven, outbox-patterned, active/active across two AWS regions.",
      "Ship GenAI tooling: a FastAPI LLM inference service guiding end-of-day payment operations, plus reusable AI agent skills (Claude Code) adopted by partner teams.",
      "Engineer data pipelines with Databricks PySpark, Flink SQL, and Kafka, publishing governed datasets to Snowflake and Microsoft OneLake.",
      "Embed security across the SDLC — Checkmarx/SonarQube/Mend remediation, Secrets Manager and Vault, PGP file encryption, PCI DSS / NIST 800-53 controls.",
    ],
    environment:
      "Java 17/21, Spring Boot 3.x/4.x, Go, Python, TypeScript, React, Apache Spark (EMR), Databricks, Flink, Kafka, AWS (ECS Fargate, Lambda, Step Functions, DynamoDB, S3, SQS, EventBridge, EMR, Glue), Snowflake, OneLake, Docker, Jenkins, Splunk, OpenTelemetry",
  },
  {
    company: "Fidelity Investments",
    location: "Durham, NC",
    title: "Full Stack Java Developer",
    dates: "May 2022 – Oct 2023",
    stack: ["Java 8/11", "Spring Boot", "React.js", "Angular", "AWS ECS", "Lambda", "DynamoDB", "Splunk"],
    bullets: [
      "Led delivery of the Symphony Campaign Processing platform handling millions of user events.",
      "Designed stateless microservices (Java 11, Spring Boot, OAuth2, JWT + AWS IAM) with role-based access control.",
      "Migrated monolithic codebases to independent Spring Boot microservices, improving scalability and fault isolation.",
      "Built UIs in React.js and Angular; introduced threat modeling into the SDLC; reduced incident response time 30% via Splunk/CloudWatch.",
    ],
    environment: "Java 8/11, Spring Boot, React.js, Angular, AWS ECS/Lambda/RDS/DynamoDB, Glue, CloudFormation, Splunk",
  },
  {
    company: "Capital One",
    location: "Richmond, VA",
    title: "Senior Java Full Stack Developer",
    dates: "Aug 2021 – Apr 2022",
    stack: ["Java 8", "Spring Boot 2.x", "Angular 8", "Hibernate 5.x", "Docker", "Jenkins"],
    bullets: [
      "Built Angular 8 UI with reactive forms, custom directives, and RxJS observables.",
      "Implemented Spring Security with OAuth2/JWT for REST endpoint protection across microservices.",
      "Managed AWS infrastructure (EC2, S3, RDS, IAM, VPC, Lambda, SQS, SNS, Route 53) with CloudWatch monitoring.",
    ],
    environment: "Java 8, Spring Boot 2.x, Angular 8, Hibernate 5.x, Docker, Jenkins, AWS",
  },
  {
    company: "CVS Health",
    location: "Chicago, IL",
    title: "Java Full Stack Application Developer",
    dates: "Jun 2020 – Jul 2021",
    stack: ["Java 8", "Spring Boot", "Angular 5/6", "MongoDB", "Cassandra", "AWS"],
    bullets: [
      "Built SPAs with Angular 6, RxJS, reactive forms, and custom pipes.",
      "Migrated JMS from WebLogic to Apache ActiveMQ with Camel-based async messaging.",
      "Managed Cassandra NoSQL clusters via DataStax OpsCenter.",
    ],
    environment: "Java 8, Spring Boot, Angular 5/6, MongoDB, Cassandra, AWS (EC2, S3, SQS, SES)",
  },
  {
    company: "Essendant",
    location: "Denver, CO",
    title: "Java Full Stack Developer",
    dates: "Jul 2018 – May 2020",
    stack: ["Java 8", "Spring Boot", "Angular 2", "Node.js", "MongoDB", "Oracle", "Docker", "AWS"],
    bullets: [
      "Built Angular 2 + Node.js responsive UI modules with component-based architecture and Angular routing.",
      "Integrated BRMS (ILOG JRules) for rule-based decision services.",
      "Deployed Dockerized microservices on AWS EC2.",
    ],
    environment: "Java 8, Spring Boot, Angular 2, MongoDB, Oracle, Docker, AWS",
  },
  {
    company: "Teleflora",
    location: "Oklahoma City, OK",
    title: "Senior Java Developer",
    dates: "Mar 2017 – Jun 2018",
    stack: ["Java 7/8", "Spring 3.0", "Hibernate 3.5", "JSF 2.0", "PrimeFaces", "WebSphere 8.1"],
    bullets: [
      "Designed architecture with UML/GoF patterns, Spring 3.0 (IOC/AOP), and Hibernate 3.5.",
      "Built SOAP/REST services (JAX-WS, JAX-RS, Apache CXF, JAXB, WSDL, XSLT).",
      "Integrated JSF 2.0 + PrimeFaces UI, deployed on IBM WebSphere 8.1.",
    ],
    environment: "Java 7/8, Spring, Hibernate, Angular 2, JSF, PrimeFaces, WebSphere",
  },
  {
    company: "Credit Acceptance Corporation",
    location: "Southfield, MI",
    title: "Java Developer",
    dates: "Sep 2015 – Feb 2017",
    stack: ["Java", "Spring", "Hibernate", "Mule ESB", "Oracle", "WebSphere", "Ant/Ivy"],
    bullets: [
      "Built SOAP/REST service framework with XML marshalling and Mule ESB orchestration.",
      "Implemented EJB-based business logic and x.509 certificate-based authentication.",
      "Deployed on IBM WebSphere, built with Apache Ant/Ivy.",
    ],
    environment: "Java, Spring, Hibernate, JAX-RS/JAX-WS, Mule ESB, Oracle, WebSphere",
  },
];

export const stats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 7, suffix: "", label: "Enterprise Engagements" },
  { value: 4, suffix: "", label: "Fortune 500 Clients" },
  { value: 20, suffix: "+", label: "AWS Services in Production" },
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    year: "2025",
    icon: "Cloud",
  },
  {
    name: "Professional Machine Learning Engineer Certification",
    issuer: "Google Cloud",
    year: "2025",
    icon: "BrainCircuit",
  },
];

export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Houston, TX",
    icon: "GraduationCap",
  },
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    school: "India",
    icon: "BookOpen",
  },
];
