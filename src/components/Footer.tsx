"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const footerSections = [
    {
      title: t('lupashop'),
      links: [
        { 
          name: t('about'), 
          href: "/about",
          icon: "info"
        },
        { 
          name: t('press'), 
          href: "/press",
          icon: "newspaper"
        },
        { 
          name: t('blog'), 
          href: "/blog",
          icon: "article"
        }
      ]
    },
    {
      title: t('forStores'),
      links: [
        { 
          name: t('registerStore'), 
          href: "/stores/register",
          icon: "storefront"
        },
        { 
          name: t('pricing'), 
          href: "/pricing",
          icon: "payments"
        },
        { 
          name: t('successStories'), 
          href: "/success-stories",
          icon: "stars"
        },
        { 
          name: t('merchantSupport'), 
          href: "/support/merchants",
          icon: "support_agent"
        }
      ]
    },
    {
      title: t('forCustomers'),
      links: [
        { 
          name: t('shopNow'), 
          href: "/products",
          icon: "shopping_bag"
        },
        { 
          name: t('trackOrders'), 
          href: "/tracking",
          icon: "local_shipping"
        },
        { 
          name: t('helpCenter'), 
          href: "/help",
          icon: "help_center"
        },
        { 
          name: t('returns'), 
          href: "/returns",
          icon: "assignment_return"
        }
      ]
    },
    {
      title: t('connect'),
      links: [
        { 
          name: t('facebook'), 
          href: "#",
          icon: <FaFacebook className="text-black/40 group-hover:text-black text-lg" />
        },
        { 
          name: t('instagram'), 
          href: "#",
          icon: <FaInstagram className="text-black/40 group-hover:text-black text-lg" />
        },
        { 
          name: t('linkedin'), 
          href: "#",
          icon: <FaLinkedin className="text-black/40 group-hover:text-black text-lg" />
        }
      ]
    }
  ];

  const paymentMethods = [
    "credit_card",
    "payments",
    "account_balance",
    "smartphone",
    "qr_code"
  ];

  return (
    <footer className="bg-linear-to-br from-[#2e1a55] to-[#412778] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all">
                <span className="material-icons text-black text-xl">search</span>
              </div>
              <h3 className="text-xl font-bold">LupaShop</h3>
            </Link>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <motion.a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all" whileHover={{ scale: 1.1 }} aria-label="LinkedIn">
                <FaLinkedin className="text-black text-sm" />
              </motion.a>
              <motion.a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all" whileHover={{ scale: 1.1 }} aria-label="Facebook">
                <FaFacebook className="text-black text-sm" />
              </motion.a>
              <motion.a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all" whileHover={{ scale: 1.1 }} aria-label="Instagram">
                <FaInstagram className="text-black text-sm" />
              </motion.a>
            </div>
          </motion.div>

          {/* Links Grid */}
          {footerSections.slice(0, 3).map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-semibold mb-4 text-black">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href && link.href.startsWith('/') ? `/${locale}${link.href}` : link.href} className="text-black/60 hover:text-black text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-6">
          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-black/60 text-xs">{t('copyright')}</div>
            
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {[
                { name: t('privacy'), href: "/privacy" },
                { name: t('terms'), href: "/terms" },
                { name: t('cookies'), href: "/cookies" }
              ].map((link) => (
                <Link key={link.name} href={link.href} className="text-black/60 hover:text-black transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}