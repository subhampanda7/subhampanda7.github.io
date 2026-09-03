import {
  Activity,
  CalendarClock,
  GitBranch,
  Radio,
  School,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type Accent = "iris" | "cyan" | "violet" | "mint" | "gold";

export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  accent: Accent;
};

/** Headline result — rendered as an animated before/after comparison. */
export const latencyMetric = {
  before: 800,
  after: 280,
  unit: "ms",
  reduction: 65,
  label: "API response time",
  detail:
    "Introduced Redis distributed caching across core service endpoints and reworked event routing, cutting p-latency by nearly two thirds.",
} as const;

export const metrics: Metric[] = [
  {
    value: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Workflow uptime",
    detail: "Fault-tolerant Temporal.io + Kafka orchestration with automatic retries.",
    icon: Activity,
    accent: "mint",
  },
  {
    value: 10,
    suffix: "K+",
    label: "Events processed monthly",
    detail: "Idempotent Kafka consumers with dead-letter queue handling.",
    icon: Radio,
    accent: "cyan",
  },
  {
    value: 60,
    suffix: "%",
    label: "Less campaign setup time",
    detail: "Marketing automation replaced manual, per-campaign wiring.",
    icon: CalendarClock,
    accent: "iris",
  },
  {
    value: 2,
    suffix: "K+",
    label: "Workflows run daily",
    detail: "Durable execution with retry and compensation built in.",
    icon: GitBranch,
    accent: "violet",
  },
  {
    value: 3500,
    suffix: "+",
    label: "Schools on the ERP",
    detail: "Backend features and reliability work on a cloud school platform.",
    icon: School,
    accent: "gold",
  },
  {
    value: 25,
    suffix: "%",
    label: "Engagement lift",
    detail: "Real-time WhatsApp notifications wired across core ERP modules.",
    icon: TrendingUp,
    accent: "mint",
  },
];

/** Short narrative shown beside the metric grid. */
export const aboutParagraphs = [
  "I'm a backend engineer with 3+ years of experience turning tangled requirements into services that hold up in production. At **Paytm** I architect the backend for a **SuperApp serving international prepaid and postpaid SIM users**, and I built the enterprise marketing automation platform behind its customer lifecycle communications.",
  "My path ran through a **B.Tech** and an intensive stint at **Masai School**, and settled on the things I genuinely enjoy: **Java, Spring Boot and Kafka**, event-driven design, and distributed systems that fail gracefully rather than loudly.",
  "The work I'm proudest of is rarely visible from the outside — pulling API responses from **800ms to 280ms**, keeping a workflow engine at **99.9% uptime**, giving a team end-to-end tracing so a bad request takes minutes rather than days to explain.",
];

export const currentlyFacts = [
  { label: "Role", value: "Software Engineer" },
  { label: "Company", value: "Paytm" },
  { label: "Based in", value: "Bengaluru, India" },
  { label: "Focus", value: "Distributed backend systems" },
];
