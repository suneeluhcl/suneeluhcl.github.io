export const profile = {
  name: "Suneel Kumar",
  title: "AI Engineer · Full Stack Developer · Application Security Engineer",
  tagline:
    "I build production AI, secure APIs, and the applications around them. 10+ years delivering enterprise software across financial services, healthcare, and commerce—with hands-on AI agents, Java, Python, React, AWS, and application security.",
  phone: "281-786-5856",
  email: "suneeluhcl@gmail.com",
  // Social profiles. Every link renders ONLY when its value is non-empty, so an
  // unfilled entry is simply hidden rather than shipping a dead link.
  linkedin: "https://www.linkedin.com/in/suneel-kumar-bikkasani-42a1b413b",
  github: "",
  typingWords: ["Java", "Spring Boot", "Go", "Python", "React", "Angular", "AWS", "GCP", "Kubernetes", "Microservices", "GenAI", "AI Agents"],
};

// Logistics recruiters screen on before they reach out. Keeping these on the page
// prevents both the wasted intro call and the silent pass. Set any value to "" to
// hide that single item; the whole strip hides when all four are empty.
export const availability = {
  location: "Dallas, TX",
  arrangement: "Remote only",
  workAuth: "H-1B — transfer required",
  status: "Available immediately",
};

export const about = [
  "I'm a senior software engineer connecting AI engineering, full-stack delivery, and application security. In my most recent Capital One assignment, I built payment fulfillment services and AI tooling for engineering and operations teams. I'm now available for my next opportunity.",
  "My foundation is modern Java: I led my team's first production migration to Java 21 and Spring Boot 4, and I've driven Java 8 → 17 modernizations, Jakarta EE 10 upgrades, and zero-downtime monolith decompositions. But I'm deliberately polyglot — production Go, Python, and TypeScript microservices, plus big-data pipelines in Apache Spark on EMR, Databricks, Kafka, and Flink SQL feeding Snowflake and OneLake.",
  "Security isn't an afterthought in my work — it's the architecture. OAuth2, OIDC, JWT, mutual TLS/PKI, field-level and PGP encryption, least-privilege IAM, and PCI DSS / NIST 800-53 compliance are embedded in everything I ship. On AWS I design event-driven microservices across ECS Fargate, Lambda, Step Functions, DynamoDB, SQS, and EventBridge — deployed active/active across regions with automated failover.",
  "My AI work includes a Python/FastAPI LLM inference service for payment operations, reusable agent skills for Jira, pull requests, Confluence, and CI/CD, and an internal skills registry and CLI for Claude Code and Windsurf. I hold AWS Solutions Architect – Professional and Google Cloud Professional Machine Learning Engineer certifications.",
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
    title: "Cloud (GCP)",
    icon: "Cloud",
    items: [
      "GKE", "Cloud Run", "Cloud Functions", "Pub/Sub", "Cloud Storage", "Cloud SQL",
      "BigQuery", "Dataflow", "Vertex AI", "Cloud Build", "Artifact Registry", "Secret Manager", "IAM",
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
      "LLM Integration", "AI Agents & Agentic Workflows", "Reusable Agent Skills", "Claude Code", "Windsurf", "Prompt Engineering",
      "RAG", "GenAI Inference Services", "Vertex AI", "MLOps",
    ],
  },
  {
    title: "Security",
    icon: "ShieldCheck",
    items: [
      "OAuth2", "OIDC", "JWT", "SAML", "Mutual TLS / PKI", "KMS Encryption", "PGP",
      "Vault", "Checkmarx", "Mend / SCA", "CVE Remediation", "Threat Modeling", "Least-Privilege IAM", "WS-Security", "SiteMinder", "PCI DSS", "NIST 800-53", "LDAP/AD",
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
    dates: "From Nov 2023 · Completed assignment",
    current: false,
    focus: "AI agents & automation · Payment platforms · Application security",
    stack: ["Java 17/21", "Spring Boot 3/4", "Python / FastAPI", "Claude Code", "Windsurf", "AWS", "Go", "Kafka", "Application Security"],
    bullets: [
      "Built payment fulfillment services, production AI tooling, and reusable agent workflows in a regulated banking environment.",
      "Developed a Python/FastAPI LLM inference service that summarized historical payment-file processing, surfaced patterns and anomalies, and supported end-of-day operational decisions through a Slack bot.",
      "Maintained an internal AI skills registry and CLI for Claude Code and Windsurf; authored reusable Jira, pull-request, Confluence, and CI/CD skills adopted by partner teams.",
      "Applied agentic workflows to code generation, refactoring, and test scaffolding; shared reusable prompts and skill patterns across engineering teams.",
      "Built the public-facing Fulfillment API (Java 17, Spring Boot 3.x on ECS Fargate) secured with OAuth2, mutual TLS, and field-level encryption for sensitive payment data.",
      "Led the first production migration to Java 21 / Spring Boot 4, hardened with Resilience4j circuit breakers and SQS retry/fallback queues.",
      "Built vendor file ingestion on AWS Step Functions (40+ vendor formats) and the EMR Spark pipeline generating TSYS posting files with automated reconciliation.",
      "Contributed to a real-time money movement platform in Go — event-driven, outbox-patterned, active/active across two AWS regions.",
      "Engineered data pipelines with Databricks PySpark, Flink SQL, and Kafka, publishing governed datasets to Snowflake and Microsoft OneLake.",
      "Remediated Checkmarx, SonarQube, and Mend findings and dependency CVEs; implemented least-privilege IAM, Secrets Manager/Vault, and PGP encryption aligned with PCI DSS and NIST 800-53 controls.",
    ],
    environment:
      "Java 17/21, Spring Boot 3.x/4.x, Go, Python, TypeScript, React, Apache Spark (EMR), Databricks, Flink, Kafka, AWS (ECS Fargate, Lambda, Step Functions, DynamoDB, S3, SQS, EventBridge, EMR, Glue), Snowflake, OneLake, Docker, Jenkins, Splunk, OpenTelemetry",
  },
  {
    company: "Fidelity Investments",
    location: "Durham, NC",
    title: "Full Stack Java Developer",
    dates: "May 2022 – Oct 2023",
    focus: "Full-stack delivery · Threat modeling · Identity & access",
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
    focus: "Full-stack delivery · API authentication · AWS IAM",
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
    focus: "Healthcare applications · API security · Cloud access controls",
    stack: ["Java 8", "Spring Boot", "Angular 5/6", "GCP", "GKE", "BigQuery", "MongoDB", "Cassandra"],
    bullets: [
      "Built SPAs with Angular 6, RxJS, reactive forms, and custom pipes.",
      "Secured Spring REST APIs with OAuth2/JWT and Angular token interceptors; used Cloud IAM for access control and Secret Manager for credential handling.",
      "Deployed containerized Spring Boot microservices to Google Kubernetes Engine (GKE) on Google Cloud Platform, with Cloud Build CI/CD and Artifact Registry.",
      "Built event-driven integrations using Cloud Pub/Sub and Cloud Functions, with Cloud Storage for artifacts and Secret Manager for credentials.",
      "Modeled operational data across Cloud SQL and Cassandra/MongoDB, and fed analytics datasets into BigQuery for reporting.",
      "Migrated JMS from WebLogic to Apache ActiveMQ with Camel-based async messaging.",
    ],
    environment: "Java 8, Spring Boot, Angular 5/6, Google Cloud Platform (GKE, Cloud Run, Pub/Sub, Cloud Functions, Cloud Storage, Cloud SQL, BigQuery, Secret Manager, IAM), MongoDB, Cassandra",
  },
  {
    company: "Essendant",
    location: "Denver, CO",
    title: "Java Full Stack Developer",
    dates: "Jul 2018 – May 2020",
    focus: "Commerce platforms · Secure REST APIs · Cloud delivery",
    stack: ["Java 8", "Spring Boot", "Angular 2", "Node.js", "MongoDB", "Oracle", "Docker", "AWS", "GCP", "GKE"],
    bullets: [
      "Built Angular 2 + Node.js responsive UI modules with component-based architecture and Angular routing.",
      "Protected Spring Boot REST endpoints with OAuth2 and JWT while integrating distributed application services.",
      "Integrated BRMS (ILOG JRules) for rule-based decision services.",
      "Deployed Dockerized microservices across AWS EC2 and Google Cloud Platform — GKE and Compute Engine — with Cloud Build/Container Registry and Stackdriver monitoring.",
      "Integrated Cloud Pub/Sub for async messaging and Cloud Storage for object storage, with Cloud SQL alongside MongoDB and Oracle.",
    ],
    environment: "Java 8, Spring Boot, Angular 2, MongoDB, Oracle, Docker, AWS (EC2), Google Cloud Platform (GKE, Compute Engine, Cloud Storage, Cloud Pub/Sub, Cloud SQL, Cloud Build, Container Registry, Stackdriver)",
  },
  {
    company: "Teleflora",
    location: "Oklahoma City, OK",
    title: "Senior Java Developer",
    dates: "Mar 2017 – Jun 2018",
    focus: "Enterprise Java · Authentication & authorization · Web services",
    stack: ["Java 7/8", "Spring 3.0", "Hibernate 3.5", "JSF 2.0", "PrimeFaces", "WebSphere 8.1"],
    bullets: [
      "Designed architecture with UML/GoF patterns, Spring 3.0 (IOC/AOP), and Hibernate 3.5.",
      "Built SOAP/REST services (JAX-WS, JAX-RS, Apache CXF, JAXB, WSDL, XSLT).",
      "Integrated authentication and authorization using SiteMinder in the WebSphere application environment.",
      "Integrated JSF 2.0 + PrimeFaces UI, deployed on IBM WebSphere 8.1.",
    ],
    environment: "Java 7/8, Spring, Hibernate, Angular 2, JSF, PrimeFaces, WebSphere",
  },
  {
    company: "Credit Acceptance Corporation",
    location: "Southfield, MI",
    title: "Java Developer",
    dates: "Sep 2015 – Feb 2017",
    focus: "Service integration · WS-Security · Certificate-based identity",
    stack: ["Java", "Spring", "Hibernate", "Mule ESB", "Oracle", "WebSphere", "Ant/Ivy"],
    bullets: [
      "Built SOAP/REST service framework with XML marshalling and Mule ESB orchestration.",
      "Implemented EJB-based business logic and x.509 certificate-based authentication.",
      "Implemented WS-Security in Mule ESB integrations, with certificate-based authentication and public/private-key encryption for service communication.",
      "Deployed on IBM WebSphere, built with Apache Ant/Ivy.",
    ],
    environment: "Java, Spring, Hibernate, JAX-RS/JAX-WS, Mule ESB, Oracle, WebSphere",
  },
];

// PROJECTS — Selected work. Enterprise projects, so no public links; internal
// system/vendor names are deliberately kept generic. Shape per entry:
//   title, org, tagline, stack[], highlights[], links[{label,url,icon}] (optional)
export const projects = [
  {
    title: "Payments Fulfillment Platform",
    org: "Capital One",
    tagline:
      "The engine that fulfills every card payment at a top-5 US bank — millions of transactions a day across ACH, debit, check, balance transfers, and cross-border EFT.",
    stack: ["Java 17/21", "Go", "Python", "Spring Boot", "AWS", "Spark / EMR", "Kafka", "GenAI"],
    highlights: [
      "Own the public payment-fulfillment API and core services (Spring Boot on ECS Fargate) plus a next-generation real-time money-movement platform in Go — event-driven and active/active across two AWS regions.",
      "Built the vendor-file ingestion and batch-posting pipeline on AWS Step Functions + EMR Spark (40+ file formats) with automated reconciliation to the card processor.",
      "Shipped GenAI ops tooling — an LLM inference service that guides end-of-day payment decisions — and embedded PCI DSS / NIST 800-53 security (OAuth2, mutual TLS, PGP, KMS) across the SDLC.",
    ],
  },
  {
    title: "Real-Time Agent Transfer Payments",
    org: "Capital One",
    tagline:
      "A PCI-compliant servicing channel that lets support agents move money card-to-card in real time.",
    stack: ["Node.js", "Fastify", "GraphQL", "REST / SOAP", "AWS", "PCI DSS"],
    highlights: [
      "Built a Node.js / Fastify microservice inside the Cardholder Data Environment that orchestrates tokenized card lookups, secure detokenization, and real-time transfer posting.",
      "Enforced PCI DSS controls end-to-end — proof-of-possession tokens, field-level encryption, and structured security logging on every request.",
    ],
  },
  {
    title: "Campaign Processing Platform",
    org: "Fidelity Investments",
    tagline:
      "A high-throughput campaign-processing platform for a top asset manager, handling millions of user events.",
    stack: ["Java 8/11", "Spring Boot", "React", "Angular", "AWS ECS / Lambda", "DynamoDB", "Splunk"],
    highlights: [
      "Led delivery of stateless Spring Boot microservices secured with OAuth2, JWT, and AWS IAM role-based access.",
      "Decomposed monoliths into independent services for scalability and fault isolation, with React and Angular front ends.",
      "Introduced threat modeling into the SDLC and cut incident response time 30% with Splunk / CloudWatch observability.",
    ],
  },
  {
    title: "Formulary Alternatives & Derivatives",
    org: "CVS Health",
    tagline:
      "Pharmacy-benefits tooling that surfaces lower-cost formulary alternatives and drug derivatives for members and providers.",
    stack: ["Java 8", "Spring Boot", "Angular 6", "GCP (GKE, Pub/Sub, BigQuery)", "Cassandra", "MongoDB"],
    highlights: [
      "Built Angular 6 single-page apps and containerized Spring Boot microservices deployed to Google Kubernetes Engine with Cloud Build CI/CD.",
      "Wired event-driven integrations with Cloud Pub/Sub and Cloud Functions; modeled data across Cloud SQL, Cassandra, and MongoDB.",
      "Fed analytics datasets into BigQuery for reporting on formulary and pricing trends.",
    ],
  },
  {
    title: "ORS Nasco Website Redesign",
    org: "Essendant",
    tagline:
      "A complete ground-up redesign of the ORS Nasco wholesale-distribution website.",
    stack: ["Java 8", "Spring Boot", "Angular 2", "Node.js", "Docker", "AWS", "GCP (GKE)"],
    highlights: [
      "Rebuilt the front end in Angular 2 + Node.js with a component-based architecture and responsive layouts.",
      "Integrated a business rules engine (ILOG JRules) for rule-driven decisioning.",
      "Deployed Dockerized microservices across AWS and Google Cloud (GKE + Compute Engine) with Pub/Sub messaging and Stackdriver monitoring.",
    ],
  },
  {
    title: "Florist Website Platform",
    org: "Teleflora",
    tagline:
      "Designed and built a platform generating thousands of personalized websites and templates for florists nationwide.",
    stack: ["Java 7/8", "Spring 3.0", "Hibernate", "JSF 2.0", "PrimeFaces", "SOAP / REST", "WebSphere"],
    highlights: [
      "Architected the system with Spring (IOC/AOP) and Hibernate using UML and GoF design patterns.",
      "Delivered SOAP and REST services (JAX-WS, JAX-RS, Apache CXF) powering template personalization at scale.",
      "Built the JSF 2.0 + PrimeFaces UI, deployed on IBM WebSphere.",
    ],
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
    url: "https://www.credly.com/badges/22322dd2-cc3f-4696-977f-425373d7abb1/public_url",
  },
  {
    name: "Professional Machine Learning Engineer Certification",
    issuer: "Google Cloud",
    year: "2025",
    icon: "BrainCircuit",
    url: "https://www.credly.com/badges/3a3d2e61-c00c-4979-b1bf-26f4f7b1b980/public_url",
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
