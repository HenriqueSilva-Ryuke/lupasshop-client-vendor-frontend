import { redirect } from 'next/navigation';

export default function UserPage({ params }: { params: { locale: string } }) {
    redirect(`/${params.locale}/user/profile`);
}
