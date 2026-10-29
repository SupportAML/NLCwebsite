import { Helmet } from 'react-helmet-async';

/** Canonical host: the apex domain 307-redirects to www. Keep in sync with robots.txt and the sitemap script. */
export const BASE_URL = 'https://www.neurolegalconsulting.com';
const SITE_NAME = 'Neurology Legal Consulting';
const OG_IMAGE = `${BASE_URL}/og-default.jpg`;

const DEFAULT_TITLE = 'Neurology Legal Consulting | Neurology Expert Witnesses for Attorneys';
const DEFAULT_DESCRIPTION = 'Board-certified, clinically active neurology expert witnesses for TBI, stroke, spinal cord injury, and medical malpractice litigation. Case review, IMEs, and testimony nationwide.';

// Google shows ~60 characters of a title and ~155-160 of a description.
const TITLE_SUFFIX = ' | NLC';
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 158;

function formatTitle(title: string): string {
  return title.length + TITLE_SUFFIX.length <= MAX_TITLE ? `${title}${TITLE_SUFFIX}` : title;
}

function clampDescription(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= MAX_DESCRIPTION) return clean;
  const cut = clean.slice(0, MAX_DESCRIPTION - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
}

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}

export function SEO({ title, description, path = '/', type = 'website', publishedTime }: SEOProps) {
  const pageTitle = title ? formatTitle(title) : DEFAULT_TITLE;
  const pageDescription = clampDescription(description || DEFAULT_DESCRIPTION);
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={SITE_NAME} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}

function JsonLd({ data }: { data: object }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

const PROVIDER = { '@type': 'ProfessionalService', name: SITE_NAME, url: BASE_URL };

/** Homepage organization schema. */
export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: SITE_NAME,
        alternateName: 'NLC',
        description: DEFAULT_DESCRIPTION,
        url: BASE_URL,
        image: OG_IMAGE,
        telephone: '+19193077949',
        areaServed: 'US',
        serviceType: 'Neurology Expert Witness Consulting',
        knowsAbout: [
          'Neurology Expert Witness',
          'Traumatic Brain Injury',
          'Stroke',
          'Spinal Cord Injury',
          'Medical Malpractice',
          'Independent Medical Examination',
        ],
      }}
    />
  );
}

export function BlogPostingSchema({ title, description, date, slug, author }: {
  title: string; description: string; date: string; slug: string; author?: string;
}) {
  const url = `${BASE_URL}/blog/${slug}`;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: OG_IMAGE,
        datePublished: date,
        dateModified: date,
        author: { '@type': 'Organization', name: author || SITE_NAME },
        publisher: PROVIDER,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        url,
      }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  if (faqs.length === 0) return null;
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${BASE_URL}${item.url}`,
        })),
      }}
    />
  );
}
