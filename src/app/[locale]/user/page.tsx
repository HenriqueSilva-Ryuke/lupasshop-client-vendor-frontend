import { redirect } from 'next/navigation';

export default async function UserPage({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params;
 redirect(`/${locale}/user/profile`);
}
