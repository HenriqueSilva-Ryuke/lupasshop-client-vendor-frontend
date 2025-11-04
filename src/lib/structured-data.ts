export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export function generateOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LupaShop',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com'}/logo.png`,
    description:
      'The integrated e-commerce platform where multiple independent stores come together in one digital space.',
    sameAs: [
      'https://www.facebook.com/lupashop',
      'https://www.instagram.com/lupashop',
      'https://www.twitter.com/lupashop',
      'https://www.linkedin.com/company/lupashop',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@lupashop.com',
      availableLanguage: ['en', 'pt'],
    },
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    },
  };
}

export function generateWebsiteSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com',
    name: 'LupaShop',
    description: 'The integrated e-commerce platform for independent sellers',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com'}/search?q={search_term_string}`,
      },
      query_input: 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: string;
  rating?: number;
  reviewCount?: number;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com'}/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
      },
    }),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'LupaShop',
    },
  };
}

export function generateFAQSchema(items: Array<{ question: string; answer: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateLocalBusinessSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'LupaShop',
    image: `${process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com'}/logo.png`,
    description:
      'The integrated e-commerce platform where multiple independent stores come together in one digital space.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://lupashop.com',
    telephone: '+1-xxx-xxx-xxxx',
    email: 'support@lupashop.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.facebook.com/lupashop',
      'https://www.instagram.com/lupashop',
      'https://www.twitter.com/lupashop',
    ],
  };
}
