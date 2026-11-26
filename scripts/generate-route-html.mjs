import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = 'https://anivexsolution.in';

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const ROUTES = [
  {
    file: 'aboutfounder.html',
    path: '/aboutfounder',
    title: 'Who is Krishndas Chauhan? | Founder, Anivex Solution',
    description:
      'Official profile of Krishndas Chauhan (MCA), Founder and Lead Architect at Anivex Solution, engineering custom software, web apps, and ERP platforms in India.',
    keywords:
      'who is krishndas chauhan, founder of anivex solution, anivex solution, krishndas chauhan founder, krishndas chauhan mca, krishndas chauhan bca, software architect India',
    ogType: 'profile',
    ogImage: `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`,
    ogImageAlt: 'Krishndas Chauhan - Founder & Lead Architect of Anivex Solution',
    ogImageWidth: '900',
    ogImageHeight: '1599',
    secondaryOgImage: {
      url: `${ORIGIN}/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg`,
      alt: 'Krishndas Chauhan - Founder & Lead Architect of Anivex Solution (Field & Leadership Portrait)',
      width: '1086',
      height: '1448',
    },
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: 'About Founder', item: `${ORIGIN}/aboutfounder` },
          ],
        },
        {
          '@type': 'ProfilePage',
          '@id': `${ORIGIN}/aboutfounder#profilepage`,
          url: `${ORIGIN}/aboutfounder`,
          name: 'Who is Krishndas Chauhan? | Founder, Anivex Solution',
          description:
            'Official profile of Krishndas Chauhan (MCA), Founder and Lead Architect at Anivex Solution, engineering custom software, web apps, and ERP platforms in India.',
          inLanguage: 'en-IN',
          primaryImageOfPage: {
            '@type': 'ImageObject',
            '@id': `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`,
            url: `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`,
            contentUrl: `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`,
            name: 'Krishndas Chauhan — Founder & Lead Architect of Anivex Solution (Executive Portrait)',
            caption: 'Official Executive Studio Portrait of Krishndas Chauhan, Founder and Lead Architect of Anivex Solution.',
            encodingFormat: 'image/jpeg',
            width: 900,
            height: 1599,
            representativeOfPage: true,
          },
          isPartOf: { '@id': `${ORIGIN}/#website` },
          mainEntity: { '@id': `${ORIGIN}/#krishndas-chauhan` },
        },
        {
          '@type': 'Person',
          '@id': `${ORIGIN}/#krishndas-chauhan`,
          name: 'Krishndas Chauhan',
          jobTitle: 'Founder & Lead Architect',
          worksFor: { '@type': 'Organization', '@id': `${ORIGIN}/#organization`, name: 'Anivex Solution', url: `${ORIGIN}/` },
          url: `${ORIGIN}/aboutfounder`,
          image: [
            {
              '@type': 'ImageObject',
              '@id': `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`,
              url: `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`,
              contentUrl: `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`,
              name: 'Krishndas Chauhan — Founder & Lead Architect of Anivex Solution (Executive Portrait)',
              caption: 'Official Executive Portrait of Krishndas Chauhan, Founder and Lead Architect of Anivex Solution',
              encodingFormat: 'image/jpeg',
              width: 900,
              height: 1599,
              representativeOfPage: true,
            },
            {
              '@type': 'ImageObject',
              '@id': `${ORIGIN}/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg`,
              url: `${ORIGIN}/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg`,
              contentUrl: `${ORIGIN}/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg`,
              name: 'Krishndas Chauhan — Founder & Lead Architect of Anivex Solution (Field Portrait)',
              caption: 'Official Field & Technical Leadership Portrait of Krishndas Chauhan, Founder and Lead Architect of Anivex Solution',
              encodingFormat: 'image/jpeg',
              width: 1086,
              height: 1448,
            },
          ],
          alumniOf: [
            { '@type': 'CollegeOrUniversity', name: 'Mangalayatan University', description: 'Master of Computer Applications (MCA)' },
            { '@type': 'CollegeOrUniversity', name: 'APCS College of IT & Management', description: 'Bachelor of Computer Applications (BCA)' },
          ],
          sameAs: [
            'https://www.linkedin.com/in/krishndas-chauhan',
            'https://github.com/krishndas-chauhan',
            'https://x.com/krishndas_',
            'https://twitter.com/krishndas_',
            'https://www.instagram.com/krishndas_chauhan',
            'https://www.facebook.com/krishndas.chauhan',
          ],
        },
      ],
    },
    fallbackHtml: `<main style="max-width:72rem;margin:0 auto;padding:2.5rem 1.5rem;" itemscope itemtype="https://schema.org/Person"><h1><span itemprop="name">Krishndas Chauhan</span> — <span itemprop="jobTitle">Founder &amp; Lead Architect</span>, Anivex Solution</h1><p>Official verified profile of Krishndas Chauhan (MCA from Mangalayatan University; BCA from APCS College of IT &amp; Management), Founder and Lead Architect of Anivex Solution.</p><div style="display:flex;gap:1rem;flex-wrap:wrap;margin:1rem 0;"><img src="/images/krishndas-chauhan-founder-anivex-solution.jpeg" alt="Krishndas Chauhan - Founder &amp; Lead Architect of Anivex Solution (Executive Portrait)" title="Krishndas Chauhan — Founder &amp; Lead Architect, Anivex Solution (Executive Portrait)" itemprop="image" width="900" height="1599" style="width:140px;height:auto;border-radius:12px;" /><img src="/images/krishndas-chauhan-field-portrait-anivex-solution.jpeg" alt="Krishndas Chauhan - Founder &amp; Lead Architect of Anivex Solution (Field &amp; Leadership Portrait)" title="Krishndas Chauhan — Founder &amp; Lead Architect, Anivex Solution (Field Portrait)" itemprop="image" width="1086" height="1448" style="width:140px;height:auto;border-radius:12px;" /></div><p><a href="/">Back to Anivex Solution Home</a></p></main>`,
  },
  {
    file: 'web-development.html',
    path: '/web-development',
    title: 'Web Development Company in India | Anivex Solution',
    description:
      'Professional web development services in India by Anivex Solution. Fast, responsive, scalable websites engineered for businesses in UP and nationwide.',
    keywords:
      'web development company India, website developer Lucknow, website design Jaunpur, web development Machhlishahar, React TypeScript websites, Anivex Solution',
    serviceName: 'Web Development',
    h1: 'Web Development Services',
  },
  {
    file: 'web-design.html',
    path: '/web-design',
    title: 'UI/UX Web Design Company in India | Anivex Solution',
    description:
      'Human-centered UI/UX and responsive web design services by Anivex Solution. Modern, conversion-driven digital design for businesses in UP and nationwide.',
    keywords:
      'UI UX web design India, responsive website design Uttar Pradesh, custom web designer Lucknow, Figma design systems, Anivex Solution',
    serviceName: 'Web Design',
    h1: 'Modern Web Design & UI/UX Services',
  },
  {
    file: 'software-development.html',
    path: '/software-development',
    title: 'Software Development Company India | Anivex Solution',
    description:
      'Bespoke software engineering and enterprise applications by Anivex Solution. Scalable, secure, and production-ready software systems across India.',
    keywords:
      'software development company India, custom business software Lucknow, software developer Uttar Pradesh, API integration, Anivex Solution',
    serviceName: 'Software Development',
    h1: 'Custom Software Development',
  },
  {
    file: 'web-application-development.html',
    path: '/web-application-development',
    title: 'Web Application Development Services | Anivex Solution',
    description:
      'High-performance full-stack web applications by Anivex Solution. Secure portals, SaaS platforms, and enterprise web solutions built for scale across India.',
    keywords:
      'web application development India, full-stack SaaS development, React Firebase web app, client portal development Uttar Pradesh, Anivex Solution',
    serviceName: 'Web Application Development',
    h1: 'Web Application Development',
  },
  {
    file: 'erp-development.html',
    path: '/erp-development',
    title: 'ERP Software Development in India | Anivex Solution',
    description:
      'Custom ERP software, GST billing, and inventory management systems by Anivex Solution for manufacturing, trading, and logistics businesses in UP & India.',
    keywords:
      'ERP software development India, GST billing software Uttar Pradesh, inventory management ERP Lucknow, Jaunpur ERP developer, Anivex Solution',
    serviceName: 'ERP Development',
    h1: 'Custom ERP & Business Management Software',
  },
  {
    file: 'custom-software.html',
    path: '/custom-software',
    title: 'Custom Software Solutions in India | Anivex Solution',
    description:
      'Tailored software solutions designed around unique business workflows. Automate operations, eliminate manual bottlenecks, and scale with Anivex Solution.',
    keywords:
      'custom software solutions India, business workflow automation Uttar Pradesh, bespoke IT solutions Lucknow, Krishndas Chauhan, Anivex Solution',
    serviceName: 'Custom Software Solutions',
    h1: 'Custom Software Solutions & Automation',
  },
  {
    file: 'privacy-policy.html',
    path: '/privacy-policy',
    title: 'Privacy Policy & DPDP Compliance | Anivex Solution',
    description:
      "Read Anivex Solution's Privacy Policy detailing client data protection, confidential software IP handling, GST billing privacy, and DPDP Act compliance.",
    keywords: 'Anivex Solution Privacy Policy, DPDP Act 2023 Compliance, Client Data Protection India, Software IP Confidentiality',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${ORIGIN}/privacy-policy#webpage`,
          url: `${ORIGIN}/privacy-policy`,
          name: 'Privacy Policy & DPDP Compliance | Anivex Solution',
          description:
            "Read Anivex Solution's Privacy Policy detailing client data protection, confidential software IP handling, GST billing privacy, and DPDP Act compliance.",
          inLanguage: 'en-IN',
          isPartOf: { '@id': `${ORIGIN}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${ORIGIN}/privacy-policy` },
          ],
        },
      ],
    },
    fallbackHtml: `<main style="max-width:72rem;margin:0 auto;padding:2.5rem 1.5rem;"><h1>Privacy Policy — Anivex Solution</h1><p>Compliant with the Indian Information Technology Act (2000) and Digital Personal Data Protection (DPDP) Act 2023.</p><p><a href="/">Back to Home</a></p></main>`,
  },
  {
    file: 'terms-and-conditions.html',
    path: '/terms-and-conditions',
    title: 'Terms & Conditions & Service SLA | Anivex Solution',
    description:
      "Review Anivex Solution's Terms & Conditions covering project scope, GST invoicing, 100% source code IP handover, post-launch warranty, and Indian law.",
    keywords: 'Anivex Solution Terms and Conditions, Software Engineering SLA, 100% Code IP Ownership India, GST Invoicing Terms',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${ORIGIN}/terms-and-conditions#webpage`,
          url: `${ORIGIN}/terms-and-conditions`,
          name: 'Terms & Conditions & Service SLA | Anivex Solution',
          description:
            "Review Anivex Solution's Terms & Conditions covering project scope, GST invoicing, 100% source code IP handover, post-launch warranty, and Indian law.",
          inLanguage: 'en-IN',
          isPartOf: { '@id': `${ORIGIN}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: `${ORIGIN}/terms-and-conditions` },
          ],
        },
      ],
    },
    fallbackHtml: `<main style="max-width:72rem;margin:0 auto;padding:2.5rem 1.5rem;"><h1>Terms &amp; Conditions — Anivex Solution</h1><p>Commercial engagement terms, GST invoicing, 100% intellectual property transfer, and post-launch warranty SLA.</p><p><a href="/">Back to Home</a></p></main>`,
  },
  {
    file: 'admin.html',
    path: '/admin',
    title: 'Control Room | Anivex Solution',
    description: 'Restricted administrative portal for Anivex Solution.',
    isNoIndex: true,
    fallbackHtml: `<main style="max-width:42rem;margin:0 auto;padding:4rem 1.5rem;text-align:center;"><h1>Administrative Access</h1><p>Authentication required.</p></main>`,
  },
  {
    file: 'controlroom.html',
    path: '/controlroom',
    title: 'Control Room | Anivex Solution',
    description: 'Restricted administrative portal for Anivex Solution.',
    isNoIndex: true,
    fallbackHtml: `<main style="max-width:42rem;margin:0 auto;padding:4rem 1.5rem;text-align:center;"><h1>Control Room</h1><p>Authentication required.</p></main>`,
  },
];

function buildServiceSchema(route) {
  const canonicalUrl = `${ORIGIN}${route.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: route.title,
        description: route.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${ORIGIN}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${ORIGIN}/#services` },
          { '@type': 'ListItem', position: 3, name: route.serviceName, item: canonicalUrl },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: `${route.serviceName} Services`,
        serviceType: route.serviceName,
        description: route.description,
        provider: { '@type': 'Organization', '@id': `${ORIGIN}/#organization`, name: 'Anivex Solution', url: `${ORIGIN}/` },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'State', name: 'Uttar Pradesh' },
          { '@type': 'City', name: 'Lucknow' },
          { '@type': 'City', name: 'Varanasi' },
          { '@type': 'City', name: 'Jaunpur' },
          { '@type': 'City', name: 'Machhlishahar' },
        ],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
        },
      },
    ],
  };
}

export function generateRouteHtmlFiles(distDir = path.resolve(process.cwd(), 'dist')) {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`Cannot generate route HTML files: ${indexHtmlPath} does not exist.`);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const route of ROUTES) {
    let html = baseHtml;
    const canonicalUrl = `${ORIGIN}${route.path}`;
    const ogImage = route.ogImage || `${ORIGIN}/images/krishndas-chauhan-founder-anivex-solution.jpeg`;
    const ogImageAlt = route.ogImageAlt || `${route.title}`;
    const ogType = route.ogType || 'website';

    // 1. Title
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);

    // 2. Canonical & Hreflang
    if (route.isNoIndex) {
      html = html.replace(/<link rel="canonical"[^>]*>\s*/g, '');
      html = html.replace(/<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/g, '');
    } else {
      html = html.replace(
        /<link rel="canonical" href="[^"]*"\s*\/?>/,
        `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
      );
      html = html.replace(
        /<link rel="alternate" hreflang="en-IN" href="[^"]*"\s*\/?>/,
        `<link rel="alternate" hreflang="en-IN" href="${escapeHtml(canonicalUrl)}" />`
      );
      html = html.replace(
        /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/,
        `<link rel="alternate" hreflang="x-default" href="${escapeHtml(canonicalUrl)}" />`
      );
    }

    // 3. Description & Keywords
    html = html.replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );
    if (route.keywords) {
      html = html.replace(
        /<meta name="keywords" content="[^"]*"\s*\/?>/,
        `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
      );
    } else {
      html = html.replace(/<meta name="keywords" content="[^"]*"\s*\/?>\s*/g, '');
    }

    // 4. Robots
    const robotsValue = route.isNoIndex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    html = html.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${robotsValue}" />`);
    html = html.replace(/<meta name="googlebot" content="[^"]*"\s*\/?>/, `<meta name="googlebot" content="${robotsValue}" />`);
    html = html.replace(/<meta name="bingbot" content="[^"]*"\s*\/?>/, `<meta name="bingbot" content="${robotsValue}" />`);

    // 5. Open Graph & Twitter (strip inherited secondary OG tags first so each route is clean)
    html = html.replace(/<meta\b[^>]*data-secondary-og="true"[^>]*\/?>\s*/g, '');

    html = html.replace(/<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${ogType}" />`);
    html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(route.title)}" />`);
    html = html.replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
    html = html.replace(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${escapeHtml(ogImage)}" />`);
    html = html.replace(
      /<meta property="og:image:secure_url" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:secure_url" content="${escapeHtml(ogImage)}" />`
    );
    html = html.replace(
      /<meta property="og:image:alt" content="[^"]*"\s*\/?>/,
      `<meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />`
    );
    if (route.ogImageWidth) {
      html = html.replace(
        /<meta property="og:image:width" content="[^"]*"\s*\/?>/,
        `<meta property="og:image:width" content="${escapeHtml(route.ogImageWidth)}" />`
      );
    }
    if (route.ogImageHeight) {
      html = html.replace(
        /<meta property="og:image:height" content="[^"]*"\s*\/?>/,
        `<meta property="og:image:height" content="${escapeHtml(route.ogImageHeight)}" />`
      );
    }

    if (route.secondaryOgImage && !route.isNoIndex) {
      const secondaryTags = [
        `<meta property="og:image" content="${escapeHtml(route.secondaryOgImage.url)}" data-secondary-og="true" />`,
        `<meta property="og:image:secure_url" content="${escapeHtml(route.secondaryOgImage.url)}" data-secondary-og="true" />`,
        `<meta property="og:image:type" content="image/jpeg" data-secondary-og="true" />`,
        `<meta property="og:image:alt" content="${escapeHtml(route.secondaryOgImage.alt)}" data-secondary-og="true" />`,
        `<meta property="og:image:width" content="${escapeHtml(route.secondaryOgImage.width)}" data-secondary-og="true" />`,
        `<meta property="og:image:height" content="${escapeHtml(route.secondaryOgImage.height)}" data-secondary-og="true" />`,
      ].join('\n    ');
      html = html.replace(
        /(<meta property="og:image:height" content="[^"]*"\s*\/?>)/,
        `$1\n    ${secondaryTags}`
      );
    }

    html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`);
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(/<meta name="twitter:url" content="[^"]*"\s*\/?>/, `<meta name="twitter:url" content="${escapeHtml(canonicalUrl)}" />`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`);
    html = html.replace(
      /<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />`
    );

    // 6. Structured Data
    const routeSchema = route.isNoIndex
      ? null
      : route.schema || (route.serviceName ? buildServiceSchema(route) : null);

    if (routeSchema) {
      html = html.replace(
        /<script id="dynamic-page-schema" type="application\/ld\+json">[\s\S]*?<\/script>/,
        `<script id="dynamic-page-schema" type="application/ld+json">${JSON.stringify(routeSchema)}</script>`
      );
    } else {
      html = html.replace(/<script id="dynamic-page-schema" type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '');
    }

    // 7. Route-specific crawlable root fallback
    const fallbackContent =
      route.fallbackHtml ||
      `<main style="max-width:72rem;margin:0 auto;padding:2.5rem 1.5rem;"><h1>${escapeHtml(route.h1 || route.title)}</h1><p>${escapeHtml(route.description)}</p><p><a href="/">Anivex Solution Home</a> · <a href="/aboutfounder">Founder Profile</a></p></main>`;

    html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<noscript>/, `<div id="root">${fallbackContent}</div>\n    <noscript>`);

    fs.writeFileSync(path.join(distDir, route.file), html, 'utf-8');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateRouteHtmlFiles();
}
