import { useEffect } from "react";

interface DocumentMetaOptions {
  title: string;
  description?: string;
}

function setMetaTag(selector: string, attr: string, content: string) {
  const tag = document.querySelector<HTMLMetaElement>(selector);
  if (tag) tag.setAttribute(attr, content);
}

// Updates the document title and description meta tags for the current
// route, then restores the site-wide defaults on unmount. Runs client-side
// only — search engines that execute JS (Googlebot) pick up the change,
// but link-preview scrapers (Facebook, iMessage, etc.) read the static
// tags baked into index.html since they don't run JS.
export function useDocumentMeta({ title, description }: DocumentMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");

    document.title = title;
    if (description) {
      setMetaTag('meta[name="description"]', "content", description);
    }
    setMetaTag('meta[property="og:title"]', "content", title);
    if (description) {
      setMetaTag('meta[property="og:description"]', "content", description);
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription) {
        setMetaTag('meta[name="description"]', "content", previousDescription);
      }
      setMetaTag('meta[property="og:title"]', "content", previousTitle);
    };
  }, [title, description]);
}
