import React from 'react';
interface MarketplaceLayoutProps {
 leftSidebar?: React.ReactNode;
 centerContent: React.ReactNode;
 rightSidebar?: React.ReactNode;
}
export default function MarketplaceLayout({
 leftSidebar,
 centerContent,
 rightSidebar,
}: MarketplaceLayoutProps) {
 return (
 <div className="min-h-screen bg-transparent">
 <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
 <div className="flex flex-col lg:flex-row gap-8">
 {/* Left Sidebar - Hidden on mobile, visible on large screens */}
 <aside className="hidden lg:block w-64 shrink-0 space-y-6">
 <div className="sticky top-24 space-y-6">
 {leftSidebar}
 </div>
 </aside>
 {/* Center Content - Always visible */}
 <main className="flex-1 min-w-0">
 {centerContent}
 </main>
 {/* Right Sidebar - Hidden on medium screens, visible on extra large screens */}
 <aside className="hidden xl:block w-80 shrink-0 space-y-6">
 <div className="sticky top-24 space-y-6">
 {rightSidebar}
 </div>
 </aside>
 </div>
 </div>
 </div>
 );
}
