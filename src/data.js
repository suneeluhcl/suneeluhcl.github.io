export const profile = {
  name: "Suneel Kumar",
  title: "Sr. Java Fullstack Developer",
  tagline:
    "10+ years designing and building secure, scalable, enterprise-grade applications using Java, Spring Boot, Angular, AWS, and DevOps tools.",
  phone: "281-786-5856",
  email: "suneeluhcl@gmail.com",
  typingWords: ["Java", "Spring Boot", "Angular", "AWS", "Microservices", "DevOps"],
};

export const about = [
  "I'm a senior engineer with a decade of experience turning complex business problems into clean, resilient software. My foundation is deep — object-oriented design, data structures, algorithms, and concurrent programming — and I apply it daily to systems that process millions of events for Fortune 500 companies like Capital One and Fidelity Investments.",
  "I specialize in modern Java. I've led multiple Java 8 → 11 → 17 modernization efforts, putting streams, records, sealed classes, switch expressions, and pattern matching to work in production — alongside Spring 4 → 6, Jakarta EE 10, and zero-downtime monolith decomposition. Legacy SOAP stack to cloud-native microservices? That migration is my home turf.",
  "Security isn't an afterthought in my work — it's the architecture. I build with OAuth2, OIDC, JWT, encryption at rest and in transit, container security, IAM, PKI, and LDAP/AD integration from day one. On AWS, I design Spring Boot microservices on ECS that integrate with SQS, SNS, Lambda, RDS, and DynamoDB — provisioned as code and locked down by default.",
  "And I own the full stack: reactive Angular (2 through 14) and React UIs with TypeScript and RxJS on the front, Docker/Kubernetes/Jenkins pipelines underneath, and Maven or Gradle builds tying it all together. From the pixel to the pipeline, I ship software that's fast, secure, and built to last.",
];

export const skillCategories = [
  { title: "Languages", icon: "Code2", items: ["Java", "J2EE", "C", "C++", "Python", "JavaScript", "TypeScript"] },
  {
    title: "Databases",
    icon: "Database",
    items: ["Oracle 9i/10g/11g/19c", "SQL Server 2005/2008", "DB2", "MySQL", "MongoDB", "PostgreSQL", "Cassandra"],
  },
  {
    title: "Security",
    icon: "ShieldCheck",
    items: ["OAuth2", "JWT", "OIDC", "SAML", "PAM", "MFA", "PKI", "HTTPS", "CSRF/XSS Mitigation"],
  },
  {
    title: "Frameworks",
    icon: "Layers",
    items: ["Spring Boot", "Spring Security", "Spring Cloud", "Hibernate", "Angular 8–14", "React.js"],
  },
  {
    title: "IAM & Identity",
    icon: "KeyRound",
    items: ["JML Processes", "LDAP/AD Integration", "AWS IAM", "Secure Credential Management"],
  },
  { title: "App Servers", icon: "Server", items: ["Tomcat", "JBoss", "WebSphere", "WebLogic"] },
  { title: "DevOps", icon: "Container", items: ["Docker", "Kubernetes", "Jenkins", "SonarQube", "Terraform"] },
  { title: "Dev Tools", icon: "Wrench", items: ["RAD", "STS", "Eclipse", "IntelliJ IDEA", "VS Code", "TOAD"] },
  {
    title: "Testing",
    icon: "FlaskConical",
    items: ["JUnit", "Mockito", "Postman", "SoapUI", "Veracode", "Snyk", "JMeter"],
  },
  { title: "Build Tools", icon: "Hammer", items: ["Maven", "ANT", "Gradle", "Jenkins"] },
  {
    title: "Cloud (AWS)",
    icon: "Cloud",
    items: [
      "EC2", "S3", "RDS", "DynamoDB", "Lambda", "SNS", "SQS", "CloudWatch", "IAM", "VPC",
      "Route 53", "CloudFormation", "Glue", "ECS", "Elastic Beanstalk",
    ],
  },
];

export const experience = [
  {
    company: "Capital One",
    location: "Richmond, VA",
    title: "Sr. Java FullStack Developer",
    dates: "Nov 2023 – Present",
    stack: ["Java 17", "Spring Boot 3.x", "Angular 11", "AWS", "Docker 24.x", "Jenkins", "SonarQube"],
    bullets: [
      "Designed secure microservices with Spring Boot 3.x, Spring Security 6, OAuth2.1, and JWT.",
      "Led migration of backend services from Java 8 to Java 17 (records, sealed classes, JPMS).",
      "Upgraded to Spring Boot 3.x / Spring Framework 6 / Jakarta EE 10.",
      "Built Angular 11 + TypeScript 4.x reactive UI with RxJS and HTTP interceptors.",
      "Authored Terraform/CloudFormation for secure AWS provisioning.",
    ],
    environment:
      "Java 17, Spring Boot 3.x, Angular 11, AWS (EC2, S3, RDS, Lambda, SQS, SNS), Docker 24.x, Jenkins, SonarQube",
  },
  {
    company: "Fidelity Investments",
    location: "Durham, NC",
    title: "FullStack Java Developer",
    dates: "May 2022 – Oct 2023",
    stack: ["Java 8/11", "Spring Boot", "React.js", "Angular", "AWS ECS", "Lambda", "DynamoDB", "Splunk"],
    bullets: [
      "Led delivery of the Symphony Campaign Processing platform handling millions of user events.",
      "Designed stateless microservices (Java 11, Spring Boot, OAuth2, JWT + AWS IAM).",
      "Migrated monolith to independent Spring Boot microservices.",
      "Built UIs in React.js and Angular; reduced incident response time 30% via Splunk/CloudWatch.",
    ],
    environment: "Java 8/11, Spring Boot, React.js, Angular, AWS ECS/Lambda/RDS/DynamoDB, Splunk",
  },
  {
    company: "Capital One",
    location: "Richmond, VA",
    title: "Sr. Java FullStack Developer",
    dates: "Aug 2021 – Apr 2022",
    stack: ["Java 8", "Spring Boot 2.x", "Angular 8", "Hibernate 5.x", "Docker", "Jenkins"],
    bullets: [
      "Built Angular 8 UI with reactive forms, custom directives, and RxJS observables.",
      "Implemented Spring Security with OAuth2/JWT for REST endpoint protection.",
      "Managed AWS infrastructure (EC2, S3, RDS, IAM, VPC, Lambda, SQS, SNS, Route 53).",
    ],
    environment: "Java 8, Spring Boot 2.x, Angular 8, Hibernate 5.x, Docker, Jenkins",
  },
  {
    company: "CVS Health",
    location: "Chicago, IL",
    title: "Java Fullstack Application Developer",
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
    title: "Java Fullstack Developer",
    dates: "Jul 2018 – May 2020",
    stack: ["Java 8", "Spring Boot", "Angular 2", "Node.js", "MongoDB", "Oracle", "Docker", "AWS"],
    bullets: [
      "Built Angular 2 + Node.js responsive UI modules with component-based architecture.",
      "Integrated BRMS (ILOG JRules) for rule-based decision services.",
      "Deployed Dockerized microservices on AWS EC2.",
    ],
    environment: "Java 8, Spring Boot, Angular 2, MongoDB, Oracle, Docker, AWS",
  },
  {
    company: "Teleflora",
    location: "Oklahoma City, OK",
    title: "Sr. Java Developer",
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
  { value: 15, suffix: "+", label: "AWS Services in Production" },
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
