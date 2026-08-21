import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: string;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export function updateSEOHead({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  jsonLd
}: SEOProps) {
  // Update Title
  document.title = title;

  // Helper to update or create meta tag
  const setMeta = (attrName: string, attrVal: string, contentVal: string) => {
    let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrVal);
      document.head.appendChild(element);
    }
    element.setAttribute('content', contentVal);
  };

  // Helper to update or create link tag
  const setLink = (relVal: string, hrefVal: string) => {
    let element = document.querySelector(`link[rel="${relVal}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', relVal);
      document.head.appendChild(element);
    }
    element.setAttribute('href', hrefVal);
  };

  // Set Description, Canonical & Favicon Icon
  setMeta('name', 'description', description);
  setMeta('name', 'application-name', 'SRA PDF');
  setMeta('name', 'apple-mobile-web-app-title', 'SRA PDF');
  setLink('canonical', canonicalUrl);
  setLink('icon', '/favicon.svg');

  // Open Graph
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:site_name', 'SRA PDF');

  // Twitter
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);

  // Manage JSON-LD Scripts
  const existingScripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
  existingScripts.forEach((s) => s.remove());

  if (jsonLd) {
    const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    schemas.forEach((schemaObj, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.id = `jsonld-schema-${index}`;
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });
  }
}

export const SEOHead: React.FC<SEOProps> = (props) => {
  useEffect(() => {
    updateSEOHead(props);
  }, [props.title, props.description, props.canonicalUrl, JSON.stringify(props.jsonLd)]);

  return null;
};
