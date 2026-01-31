'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface ThirdPartyScriptsProps {
 googleAnalyticsId?: string;
 facebookPixelId?: string;
}

export function ThirdPartyScripts({
 googleAnalyticsId,
 facebookPixelId,
}: ThirdPartyScriptsProps) {
 useEffect(() => {
 // Initialize Facebook Pixel if ID is provided
 if (facebookPixelId) {
 window.fbq?.('init', facebookPixelId);
 window.fbq?.('track', 'PageView');
 }
 }, [facebookPixelId]);

 return (
 <>
 {/* Google Analytics */}
 {googleAnalyticsId && (
 <>
 <Script
 src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
 strategy="afterInteractive"
 />
 <Script
 id="google-analytics"
 strategy="afterInteractive"
 dangerouslySetInnerHTML={{
 __html: `
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', '${googleAnalyticsId}', {
 page_path: window.location.pathname,
 send_page_view: false,
 });
 `,
 }}
 />
 </>
 )}

 {/* Facebook Pixel */}
 {facebookPixelId && (
 <Script
 id="facebook-pixel"
 strategy="afterInteractive"
 dangerouslySetInnerHTML={{
 __html: `
 !function(f,b,e,v,n,t,s)
 {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
 n.callMethod.apply(n,arguments):n.queue.push(arguments)};
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
 n.queue=[];t=b.createElement(e);t.async=!0;
 t.src=v;s=b.getElementsByTagName(e)[0];
 s.parentNode.insertBefore(t,s)}(window, document,'script',
 'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '${facebookPixelId}');
 fbq('track', 'PageView');
 `,
 }}
 />
 )}
 </>
 );
}

// Type augmentation for window object
declare global {
 interface Window {
 fbq?: (action: string, pixelId: string | object) => void;
 dataLayer?: any[];
 }
}
