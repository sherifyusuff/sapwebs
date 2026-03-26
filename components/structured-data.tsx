export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://sapwebs.com/#localbusiness",
        "name": "Sapwebs",
        "url": "https://sapwebs.com",
        "logo": "https://sapwebs.com/sapwebs-logo.png",
        "image": "https://sapwebs.com/sapwebs-logo.png",
        "description": "Premium web design and software development agency based in Lagos, Nigeria.",
        "telephone": "+2347035321179",
        "email": "info@sapwebs.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9 Old Olowora Road, Magodo Isheri",
          "addressLocality": "Lagos",
          "addressRegion": "LA",
          "addressCountry": "NG"
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://sapwebs.com/#website",
        "url": "https://sapwebs.com",
        "name": "Sapwebs",
        "publisher": {
          "@id": "https://sapwebs.com/#localbusiness"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
