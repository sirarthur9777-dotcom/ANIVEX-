import React, { useEffect } from 'react';

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  isNoIndex?: boolean;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: string | number;
  ogImageHeight?: string | number;
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
  ogImageWidth = '1080',
  ogImageHeight = '1350',
  twitterImage,
  ogType = 'website',
  author = 'Krishndas Chauhan',
  keywords,
  schema,
}) => {
  useEffect(() => {
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

    // Helper for absolute URL
    const toAbsoluteUrl = (path: string) => {
      if (!path) return '';
      if (path.startsWith('http://') || path.startsWith('https://')) return path;
      const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://anivexsolution.in';
      return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
    };

    // 2. Update Meta Description & Author
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'author', author);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Update Robots Meta with Googlebot & Bingbot rich snippets
    if (isNoIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaTag('name', 'googlebot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      setMetaTag('name', 'bingbot', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 4. Update Canonical Link
    const fullCanonicalUrl = `https://anivexsolution.in${canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : '/'}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 5. Update Open Graph Tags
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:site_name', 'Anivex Solution');
    setMetaTag('property', 'og:locale', 'en_IN');

    // OpenGraph Images (Absolute URLs required for Google, WhatsApp, Facebook, LinkedIn, GPT Search)
    const absoluteOgImage = toAbsoluteUrl(ogImage);
    const productionOgImage = `https://anivexsolution.in${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

    setMetaTag('property', 'og:image', absoluteOgImage);
    setMetaTag('property', 'og:image:secure_url', productionOgImage);
    setMetaTag('property', 'og:image:type', ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg');
    setMetaTag('property', 'og:image:alt', ogImageAlt);
    if (ogImageWidth) setMetaTag('property', 'og:image:width', String(ogImageWidth));
    if (ogImageHeight) setMetaTag('property', 'og:image:height', String(ogImageHeight));

    // 6. Update Twitter Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    const resolvedTwitterImage = toAbsoluteUrl(twitterImage || ogImage);
    setMetaTag('name', 'twitter:image', resolvedTwitterImage);
    setMetaTag('name', 'twitter:image:alt', ogImageAlt);

    // 7. Inject or Update Dynamic JSON-LD Schema
    const schemaScriptId = 'dynamic-page-schema';
    let scriptElement = document.getElementById(schemaScriptId) as HTMLScriptElement | null;

    if (schema) {
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

    return () => {
      // Cleanup if needed
    };
  }, [title, description, canonicalPath, isNoIndex, ogImage, ogImageAlt, ogImageWidth, ogImageHeight, twitterImage, ogType, author, keywords, schema]);

  return null;
};

