import { site } from "./site";

export type ImpactChip = { value: string; label: string };

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  /** Supports **bold** emphasis, rendered by RichText. */
  highlights: string[];
  impact: ImpactChip[];
  tech: string[];
  award?: { title: string; description: string; href: string };
};

export const experiences: Experience[] = [
  {
    id: "paytm",
    company: "Paytm",
    role: "Software Engineer",
    location: "Bengaluru, India",
    period: "Feb 2025 — Present",
    current: true,
    summary:
      "Owning backend architecture for a multi-tenant telecom SuperApp and the marketing automation platform that drives its customer lifecycle communications.",
    highlights: [
      "Architected and engineered a scalable backend for a **SuperApp serving international prepaid and postpaid SIM users**, enabling personalised experiences with mobile recharges, plan activation and entertainment services.",
      "Delivered an enterprise marketing automation platform processing **10K+ customer lifecycle events monthly**, cutting manual campaign setup time by **60%** and enabling real-time personalised communication across Email, SMS and WhatsApp.",
      "Built a fault-tolerant workflow orchestration engine on **Temporal.io and Kafka** — **99.9% uptime** across **2K+ daily workflows**, with idempotent consumers, DLQ handling and automatic retries.",
      "Engineered a **CompletableFuture-based concurrent aggregation engine** across Prepaid, Postpaid and Fixed LOBs, with **AOP-driven audit logging** capturing traceId, response time and payload to MySQL.",
      "Implemented end-to-end distributed tracing with **Micrometer, OpenTelemetry and Zipkin**, backed by **ELK and Kibana** dashboards — full request visibility and dramatically faster root-cause analysis.",
      "Improved system performance with **Redis distributed caching** and optimised event routing, reducing API response times from **800ms to 280ms**.",
      "Leveraged **Cursor AI and MCP integrations** to accelerate delivery — automating code generation and enabling efficient end-to-end debugging across distributed services.",
    ],
    impact: [
      { value: "800ms → 280ms", label: "API latency" },
      { value: "99.9%", label: "Uptime" },
      { value: "10K+", label: "Events / month" },
      { value: "60%", label: "Setup time saved" },
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Kafka",
      "Temporal.io",
      "Redis",
      "MySQL",
      "OpenTelemetry",
      "Zipkin",
      "ELK Stack",
      "Microservices",
      "AWS",
    ],
    award: {
      title: "Paytm Rewards & Recognition — March 2026",
      description: "Company-wide R&R award for engineering contribution.",
      href: site.certificateUrl,
    },
  },
  {
    id: "quicktouch",
    company: "Quicktouch Technologies Limited",
    role: "Software Engineer",
    location: "Delhi, India",
    period: "May 2023 — Feb 2025",
    summary:
      "Backend feature delivery and reliability work on a cloud School ERP used across thousands of institutions.",
    highlights: [
      "Contributed to a cloud-based **School ERP used by 3,500+ schools**, working with cross-functional teams to ship backend features and keep the platform reliable.",
      "Designed and implemented a **recruitment portal** with job creation, category-based fee concessions and applicant status tracking, streamlining the end-to-end hiring workflow.",
      "Integrated **WhatsApp notifications** across core modules for real-time automated updates, driving a **25% increase in user engagement** and responsiveness.",
    ],
    impact: [
      { value: "3,500+", label: "Schools served" },
      { value: "25%", label: "Engagement lift" },
    ],
    tech: ["Java", "Spring Boot", "REST APIs", "MySQL", "WhatsApp API", "JPA / Hibernate"],
  },
];
