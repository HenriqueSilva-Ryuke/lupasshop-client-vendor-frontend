import { StructuredData } from '@/lib/structured-data';

interface JsonLdProps {
 data: StructuredData | StructuredData[];
}

export default function JsonLd({ data }: JsonLdProps) {
 const dataArray = Array.isArray(data) ? data : [data];

 return (
 <>
 {dataArray.map((item, index) => (
 <script
 key={index}
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify(item),
 }}
 />
 ))}
 </>
 );
}
