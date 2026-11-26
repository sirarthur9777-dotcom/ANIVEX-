import React, { useEffect } from 'react';

export interface SecondaryOgImage {
  url: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

export interface ImageSchemaItem {
  url: string;
  contentUrl?: string;
  name?: string;
  caption: string;
  description?: string;
  encodingFormat?: string;
  width?: string | number;
  height?: string | number;
  representativeOfPage?: boolean;
  aboutId?: string;
}

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  isNoIndex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: string | number;
  ogImageHeight?: string | number;
  secondaryOgImage?: SecondaryOgImage;
  imageSchemas?: ImageSchemaItem[];
  twitterImage?: string;
  ogType?: 'website' | 'profile' | 'article' | 'business.business';
  author?: string;
  keywords?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  isNoIndex = false,
  ogImage = '/images/krishndas-chauhan-founder-anivex-solution.jpeg',
  ogImageAlt = 'Krishndas Chauhan - Founder & Lead Architect of Anivex Solution',
  ogImageWidth = '900',
  ogImageHeight = '1599',
  secondaryOgImage,
  imageSchemas,
  twitterImage,
  ogType = 'website',
  author = 'Krishndas Chauhan',
  keywords,
  schema,
}) => {
  useEffect(() => {
    const CANONICAL_ORIGIN = 'https://anivexsolution.in';

    // 1. Update Title
    document.title = title;

    // Helper to set or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const removeMetaTag = (attributeName: string, attributeValue: string) => {
      const element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (element) element.remove();
    };

    const setLinkTag = (selector: string, attrs: Record<string, string>) => {
      let link = document.querySelector(selector);
      if (!link) {
        link = document.createElement('link');
        document.head.appendChild(link);
      }
      Object.entries(attrs).forEach(([k, v]) => link!.setAttribute(k, v));
    };

    // Helper for canonical production URL
    const toCanonicalUrl = (path: string) => {
      if (!path) return CANONICAL_ORIGIN;
      if (path.startsWith('http://') || path.startsWith('https://')) return path;
      return `${CANONICAL_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
    };

    // 2. Update Meta Description, Author & Keywords
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'author', author);
    if (keywords && keywords.trim()) {
      setMetaTag('name', 'keywords', keywords);
    } else {
      removeMetaTag('name', 'keywords');
    }

    // 3. Update Robots Meta with Googlebot & Bingbot rich snippets
    if (isNoIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
      setMetaTag('name', 'googlebot', 'noindex, nofollow');
      setMetaTag('name', 'bingbot', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaTag('name', 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaTag('name', 'bingbot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 4. Update Canonical Link & Hreflang
    const normalizedPath = canonicalPath
      ? (canonicalPath === '/' ? '/' : (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`))
      : '/';
    const fullCanonicalUrl = `${CANONICAL_ORIGIN}${normalizedPath}`;

    if (isNoIndex) {
      document.querySelector('link[rel="canonical"]')?.remove();
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    } else {
      setLinkTag('link[rel="canonical"]', { rel: 'canonical', href: fullCanonicalUrl });
      setLinkTag('link[rel="alternate"][hreflang="en-IN"]', {
        rel: 'alternate',
        hreflang: 'en-IN',
        href: fullCanonicalUrl,
      });
      setLinkTag('link[rel="alternate"][hreflang="x-default"]', {
        rel: 'alternate',
        hreflang: 'x-default',
        href: fullCanonicalUrl,
      });
    }

    // 5. Update Open Graph Tags
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:site_name', 'Anivex Solution');
    setMetaTag('property', 'og:locale', 'en_IN');
    setMetaTag('property', 'og:locale:alternate', 'hi_IN');

    // Primary OpenGraph Image
    const productionOgImage = toCanonicalUrl(ogImage);
    setMetaTag('property', 'og:image', productionOgImage);
    setMetaTag('property', 'og:image:secure_url', productionOgImage);
    setMetaTag('property', 'og:image:type', ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg');
    setMetaTag('property', 'og:image:alt', ogImageAlt);
    if (ogImageWidth) setMetaTag('property', 'og:image:width', String(ogImageWidth));
    if (ogImageHeight) setMetaTag('property', 'og:image:height', String(ogImageHeight));

    // Optional Secondary OpenGraph Image (managed via data-secondary-og attribute)
    document.querySelectorAll('meta[data-secondary-og="true"]').forEach((el) => el.remove());
    if (secondaryOgImage?.url && !isNoIndex) {
      const secUrl = toCanonicalUrl(secondaryOgImage.url);
      const secEntries: Array<[string, string]> = [
        ['og:image', secUrl],
        ['og:image:secure_url', secUrl],
        ['og:image:type', secUrl.endsWith('.png') ? 'image/png' : 'image/jpeg'],
        ['og:image:alt', secondaryOgImage.alt],
      ];
      if (secondaryOgImage.width) secEntries.push(['og:image:width', String(secondaryOgImage.width)]);
      if (secondaryOgImage.height) secEntries.push(['og:image:height', String(secondaryOgImage.height)]);

      secEntries.forEach(([prop, val]) => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', prop);
        meta.setAttribute('content', val);
        meta.setAttribute('data-secondary-og', 'true');
        document.head.appendChild(meta);
      });
    }

    // 6. Update Twitter Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:url', fullCanonicalUrl);
    const resolvedTwitterImage = toCanonicalUrl(twitterImage || ogImage);
    setMetaTag('name', 'twitter:image', resolvedTwitterImage);
    setMetaTag('name', 'twitter:image:alt', ogImageAlt);

    // 7. Inject or Update Dynamic JSON-LD Schema
    const schemaScriptId = 'dynamic-page-schema';
    let scriptElement = document.getElementById(schemaScriptId) as HTMLScriptElement | null;

    if (schema && !isNoIndex) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = schemaScriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    // 8. Inject or Update Explicit ImageObject JSON-LD Schema (for Google Images & AI Search)
    const imageSchemaScriptId = 'dynamic-image-schema';
    let imageScriptElement = document.getElementById(imageSchemaScriptId) as HTMLScriptElement | null;

    const rawImages: ImageSchemaItem[] =
      imageSchemas && imageSchemas.length > 0
        ? imageSchemas
        : [
            {
              url: ogImage,
              contentUrl: ogImage,
              name: ogImageAlt,
              caption: ogImageAlt,
              width: ogImageWidth,
              height: ogImageHeight,
              representativeOfPage: true,
            },
            ...(secondaryOgImage?.url
              ? [
                  {
                    url: secondaryOgImage.url,
                    contentUrl: secondaryOgImage.url,
                    name: secondaryOgImage.alt,
                    caption: secondaryOgImage.alt,
                    width: secondaryOgImage.width,
                    height: secondaryOgImage.height,
                  },
                ]
              : []),
          ];

    if (!isNoIndex && rawImages.length > 0) {
      const imageGraph = rawImages.map((img) => {
        const canonicalImgUrl = toCanonicalUrl(img.url);
        const canonicalContentUrl = toCanonicalUrl(img.contentUrl || img.url);
        const inferredMime = canonicalContentUrl.endsWith('.png')
          ? 'image/png'
          : canonicalContentUrl.endsWith('.webp')
            ? 'image/webp'
            : 'image/jpeg';

        return {
          '@type': 'ImageObject',
          '@id': `${canonicalImgUrl}#image`,
          url: canonicalImgUrl,
          contentUrl: canonicalContentUrl,
          name: img.name || img.caption,
          caption: img.caption,
          description: img.description || img.caption,
          encodingFormat: img.encodingFormat || inferredMime,
          ...(img.width ? { width: Number(img.width) || img.width } : {}),
          ...(img.height ? { height: Number(img.height) || img.height } : {}),
          ...(typeof img.representativeOfPage === 'boolean'
            ? { representativeOfPage: img.representativeOfPage }
            : {}),
          ...(img.aboutId ? { about: { '@id': img.aboutId } } : {}),
          inLanguage: 'en-IN',
          copyrightHolder: { '@id': `${CANONICAL_ORIGIN}/#organization` },
        };
      });

      if (!imageScriptElement) {
        imageScriptElement = document.createElement('script');
        imageScriptElement.id = imageSchemaScriptId;
        imageScriptElement.type = 'application/ld+json';
        document.head.appendChild(imageScriptElement);
      }
      imageScriptElement.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': imageGraph,
      });
    } else if (imageScriptElement) {
      imageScriptElement.remove();
    }
  }, [title, description, canonicalPath, isNoIndex, ogImage, ogImageAlt, ogImageWidth, ogImageHeight, secondaryOgImage, imageSchemas, twitterImage, ogType, author, keywords, schema]);

  return null;
};

