import {
  Blocks,
  Cloud,
  Code2,
  Database,
  Gauge,
  Network,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Accent } from "./metrics";

export type Skill = { name: string; core?: boolean };

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  /** Concrete proof that the category is more than a list. */
  highlight: string;
  icon: LucideIcon;
  accent: Accent;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend",
    blurb: "Where most of my day goes — service design, APIs and the Spring ecosystem.",
    highlight:
      "Every service I own at Paytm is Spring Boot — the SuperApp aggregation layer, the campaign platform, and the multi-tenant proxy sitting in front of the telecom APIs.",
    icon: Server,
    accent: "iris",
    skills: [
      { name: "Java", core: true },
      { name: "Spring Boot", core: true },
      { name: "Spring MVC" },
      { name: "Spring Security" },
      { name: "Spring Cloud" },
      { name: "REST APIs", core: true },
      { name: "Microservices", core: true },
      { name: "JPA / Hibernate" },
      { name: "OpenAPI / Swagger" },
    ],
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    blurb: "Making asynchronous work correct: ordering, retries, idempotency and durability.",
    highlight:
      "Kafka pipelines with idempotent consumers and DLQ handling, plus Temporal workflows that keep 2K+ customer journeys a day durable across restarts.",
    icon: Network,
    accent: "violet",
    skills: [
      { name: "Apache Kafka", core: true },
      { name: "Temporal.io", core: true },
      { name: "Event-Driven Architecture", core: true },
      { name: "Idempotent Consumers" },
      { name: "Dead Letter Queues" },
      { name: "Multithreading" },
      { name: "Concurrency" },
      { name: "CompletableFuture" },
    ],
  },
  {
    id: "data",
    title: "Databases & Caching",
    blurb: "Relational modelling, query tuning, and caches that actually reduce load.",
    highlight:
      "Redis caching is what took core endpoints from 800ms to 280ms. MySQL holds the multi-tenant ERP data and the AOP-driven audit trail.",
    icon: Database,
    accent: "mint",
    skills: [
      { name: "MySQL", core: true },
      { name: "PostgreSQL" },
      { name: "Redis", core: true },
      { name: "SQL" },
      { name: "Schema Design" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    blurb: "Getting services built, shipped and run without heroics.",
    highlight:
      "Services run containerised on AWS, shipped through Jenkins pipelines, with credentials kept out of the codebase in Vault.",
    icon: Cloud,
    accent: "cyan",
    skills: [
      { name: "AWS", core: true },
      { name: "Docker", core: true },
      { name: "Kubernetes" },
      { name: "Jenkins" },
      { name: "CI/CD" },
      { name: "Git / GitHub" },
      { name: "Bitbucket" },
      { name: "HashiCorp Vault" },
    ],
  },
  {
    id: "observability",
    title: "Observability",
    blurb: "Tracing and logs that turn a vague incident into a specific line of code.",
    highlight:
      "Micrometer, OpenTelemetry and Zipkin traces stitched end to end across microservices, with ELK and Kibana dashboards for centralised root-cause analysis.",
    icon: Gauge,
    accent: "gold",
    skills: [
      { name: "OpenTelemetry", core: true },
      { name: "Micrometer" },
      { name: "Zipkin", core: true },
      { name: "ELK Stack" },
      { name: "Kibana" },
      { name: "Grafana" },
      { name: "Prometheus" },
    ],
  },
  {
    id: "ai",
    title: "AI & Developer Tools",
    blurb: "Using models as leverage on real codebases, not as a party trick.",
    highlight:
      "Cursor and MCP integrations are part of my normal loop at Paytm — accelerating delivery, automating code generation and debugging across service boundaries.",
    icon: Sparkles,
    accent: "violet",
    skills: [
      { name: "Cursor", core: true },
      { name: "MCP Integrations", core: true },
      { name: "Claude" },
      { name: "ChatGPT" },
      { name: "GitHub Copilot" },
      { name: "LLM Integration" },
    ],
  },
  {
    id: "core",
    title: "Core Engineering",
    blurb: "The fundamentals that decide whether a design survives its second year.",
    highlight:
      "Clear service boundaries, sane concurrency, and failure modes that are designed rather than discovered in production.",
    icon: Blocks,
    accent: "iris",
    skills: [
      { name: "System Design", core: true },
      { name: "Data Structures & Algorithms", core: true },
      { name: "Object-Oriented Programming" },
      { name: "SOLID Principles" },
      { name: "Design Patterns" },
      { name: "Microservices Architecture" },
    ],
  },
  {
    id: "tooling",
    title: "Languages & Tooling",
    blurb: "Everything else I reach for during a normal week.",
    highlight:
      "Java is home. The rest is whatever moves the ticket — a Postman collection, a Jira thread, a quick script.",
    icon: Code2,
    accent: "cyan",
    skills: [
      { name: "Java", core: true },
      { name: "JavaScript" },
      { name: "SQL" },
      { name: "IntelliJ IDEA" },
      { name: "Postman" },
      { name: "Jira" },
      { name: "Confluence" },
    ],
  },
];
