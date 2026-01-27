import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserSidebar } from '@/components/UserSidebar';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 py-8 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                    <aside className="md:w-64 shrink-0">
                        <UserSidebar />
                    </aside>

                    <div className="flex-1 min-w-0">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
