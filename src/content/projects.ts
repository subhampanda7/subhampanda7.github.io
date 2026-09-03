import type { ImpactChip } from "./experience";

/** Drives colour + icon for architecture diagram nodes. */
export type NodeKind =
  | "client"
  | "gateway"
  | "service"
  | "queue"
  | "cache"
  | "store"
  | "channel";

export type FlowNode = {
  label: string;
  sub?: string;
  kind: NodeKind;
};

export type Project = {
  id: string;
  title: string;
  context: string;
  tagline: string;
  /** `showcase` gets a full-width row; `compact` sits in the closing grid. */
  layout: "showcase" | "compact";
  featured?: boolean;
  problem: string;
  approach: string[];
  scale: string;
  impact: ImpactChip[];
  tech: string[];
  flow: FlowNode[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "lla-superapp",
    title: "LLA SuperApp",
    context: "Paytm · Platform Backend",
    tagline: "A multi-tenant telecom SuperApp backend",
    layout: "showcase",
    featured: true,
    problem:
      "Prepaid, postpaid and fixed-line services each sat behind their own telecom API — a mix of REST and SOAP (LIMEware) with different auth schemes, timeouts and failure modes. The home screen had to stitch all of them together on every single load, and every new tenant meant another hand-rolled integration.",
    approach: [
      "Multi-tenant utility proxy that consolidates telecom REST and SOAP (LIMEware) APIs behind a single internal contract",
      "Database-driven per-API configuration for timeouts, retries and credentials — behaviour changes without a redeploy",
      "Concurrent home-screen aggregation using CompletableFuture across Prepaid, Postpaid and Fixed LOBs",
      "AOP-driven audit logging capturing traceId, response time and payload to MySQL for every downstream call",
      "Redis distributed caching on hot read paths, with event routing tuned to avoid redundant fan-out",
    ],
    scale: "International prepaid & postpaid SIM users across three lines of business",
    impact: [
      { value: "800ms → 280ms", label: "API response time" },
      { value: "99.9%", label: "Availability" },
      { value: "3 LOBs", label: "Aggregated concurrently" },
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Kafka",
      "Redis",
      "CompletableFuture",
      "Spring AOP",
      "OpenTelemetry",
      "MySQL",
      "REST + SOAP",
    ],
    flow: [
      { label: "Mobile App", sub: "SuperApp client", kind: "client" },
      { label: "API Gateway", sub: "auth · routing", kind: "gateway" },
      { label: "Aggregation Service", sub: "CompletableFuture", kind: "service" },
      { label: "Redis", sub: "distributed cache", kind: "cache" },
      { label: "Telecom APIs", sub: "REST + LIMEware SOAP", kind: "channel" },
      { label: "MySQL", sub: "AOP audit trail", kind: "store" },
    ],
  },
  {
    id: "marketing-automation",
    title: "Marketing Automation & Workflow Platform",
    context: "Paytm · Distributed Systems",
    tagline: "Durable, event-driven customer lifecycle campaigns",
    layout: "showcase",
    problem:
      "Lifecycle campaigns were configured by hand for every launch, and a mid-flight failure meant somebody had to work out which customers had already been messaged. There was no durable record of where a journey stood.",
    approach: [
      "Kafka event pipeline with idempotent consumers and dead-letter queue handling for poison messages",
      "Temporal.io workflows give each customer journey durable execution — retries and compensation survive process restarts",
      "Channel abstraction dispatches to Email, SMS and WhatsApp behind one interface",
      "Campaign definitions moved into configuration, removing per-campaign engineering work",
    ],
    scale: "10K+ lifecycle events monthly · 2K+ workflow executions daily",
    impact: [
      { value: "10K+", label: "Events / month" },
      { value: "60%", label: "Less setup time" },
      { value: "99.9%", label: "Uptime" },
    ],
    tech: [
      "Temporal.io",
      "Kafka",
      "Spring Boot",
      "Java",
      "Redis",
      "Event-Driven Architecture",
      "Distributed Systems",
    ],
    flow: [
      { label: "Event Producer", sub: "lifecycle triggers", kind: "client" },
      { label: "Kafka", sub: "partitioned topics", kind: "queue" },
      { label: "Consumer Group", sub: "idempotent · DLQ", kind: "service" },
      { label: "Temporal", sub: "durable workflows", kind: "gateway" },
      { label: "Redis", sub: "dedupe & state", kind: "cache" },
      { label: "Email · SMS · WhatsApp", sub: "channel dispatch", kind: "channel" },
    ],
  },
  {
    id: "school-erp",
    title: "School ERP & Recruitment Portal",
    context: "Quicktouch Technologies",
    tagline: "Backend for a cloud ERP running 3,500+ schools",
    layout: "compact",
    problem:
      "Schools ran admissions, hiring and parent communication over phone calls and spreadsheets. Recruitment in particular had no single place to post a job, apply against it, or check where an application stood.",
    approach: [
      "Recruitment portal with job creation, category-based fee concessions and end-to-end applicant tracking",
      "WhatsApp integration across core modules for real-time automated updates",
      "Backend feature delivery and reliability work alongside cross-functional product teams",
    ],
    scale: "3,500+ schools on a shared multi-tenant platform",
    impact: [
      { value: "3,500+", label: "Schools served" },
      { value: "25%", label: "Engagement lift" },
    ],
    tech: ["Java", "Spring Boot", "REST APIs", "MySQL", "WhatsApp API"],
    flow: [
      { label: "Web & Mobile", sub: "staff · applicants", kind: "client" },
      { label: "ERP Modules", sub: "Spring Boot", kind: "service" },
      { label: "MySQL", sub: "tenant data", kind: "store" },
      { label: "Notifier", sub: "async dispatch", kind: "gateway" },
      { label: "WhatsApp", sub: "real-time updates", kind: "channel" },
    ],
  },
  {
    id: "slack-commit-notifier",
    title: "GitHub → Slack Commit Notifier",
    context: "Personal Project",
    tagline: "Push events turned into readable team digests",
    layout: "compact",
    problem:
      "Default repository notifications are noisy and easy to tune out, so pushes to shared branches were going unnoticed until something broke.",
    approach: [
      "Webhook endpoint that verifies and parses GitHub push event payloads",
      "Formats commits into a compact digest — author, message, files touched, compare link",
      "Posts to a Slack channel through Incoming Webhooks with retry on transient failures",
    ],
    scale: "Real-time notification on every push to watched repositories",
    impact: [{ value: "Real-time", label: "Push visibility" }],
    tech: ["Java 17", "Spring Boot", "GitHub Webhooks", "Slack API"],
    flow: [
      { label: "GitHub Push", sub: "webhook event", kind: "client" },
      { label: "Listener", sub: "signature verify", kind: "gateway" },
      { label: "Parser", sub: "commit extraction", kind: "service" },
      { label: "Formatter", sub: "digest builder", kind: "service" },
      { label: "Slack", sub: "incoming webhook", kind: "channel" },
    ],
  },
];

export const showcaseProjects = projects.filter((p) => p.layout === "showcase");
export const compactProjects = projects.filter((p) => p.layout === "compact");
