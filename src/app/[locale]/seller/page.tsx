import { redirect } from 'next/navigation';

export default function SellerPage({ params }: { params: { locale: string } }) {
    redirect(`/${params.locale}/seller/dashboard`);
}
