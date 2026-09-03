import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { Backdrop } from "@/components/layout/Backdrop";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.summary,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Subham Panda",
    "Backend Software Engineer",
    "Java Developer",
    "Spring Boot",
    "Microservices",
    "Apache Kafka",
    "Temporal.io",
    "Redis",
    "Distributed Systems",
    "Event-Driven Architecture",
    "System Design",
    "AWS",
    "Docker",
    "Kubernetes",
    "OpenTelemetry",
    "Paytm",
    "Bengaluru",
    "SDE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.summary,
    locale: "en_US",
    images: [
      {
        url: "/img/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.summary,
    images: ["/img/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  url: site.url,
  image: `${site.url}/img/og.png`,
  description: site.summary,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  worksFor: { "@type": "Organization", name: "Paytm" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Bhubaneswar Engineering College" },
    { "@type": "EducationalOrganization", name: "Masai School" },
  ],
  sameAs: [site.linkedinUrl, site.githubUrl],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Microservices",
    "Apache Kafka",
    "Redis",
    "Temporal.io",
    "Distributed Systems",
    "Event-Driven Architecture",
    "AWS",
    "System Design",
    "OpenTelemetry",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Structured data is a static, developer-authored object.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>

        <MotionProvider>
          <Backdrop />
          <SmoothScroll />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
