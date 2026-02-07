'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Bell, X, Check } from 'lucide-react';
import Link from 'next/link';

const GET_NOTIFICATIONS = gql`
 query GetNotifications($limit: Int, $unreadOnly: Boolean) {
 notifications(limit: $limit, unreadOnly: $unreadOnly) {
 id
 type
 title
 message
 link
 read
 createdAt
 }
 unreadNotificationsCount
 }
`;

const MARK_AS_READ = gql`
 mutation MarkNotificationAsRead($id: ID!) {
 markNotificationAsRead(id: $id) {
 id
 read
 }
 }
`;

const MARK_ALL_AS_READ = gql`
 mutation MarkAllNotificationsAsRead {
 markAllNotificationsAsRead
 }
`;

export default function NotificationBell() {
 const [isOpen, setIsOpen] = useState(false);
 const [showUnreadOnly, setShowUnreadOnly] = useState(false);

 const { data, loading, refetch } = useQuery(GET_NOTIFICATIONS, {
 variables: { limit: 20, unreadOnly: showUnreadOnly },
 pollInterval: 30000, // Poll every 30 seconds
 });

 const [markAsRead] = useMutation(MARK_AS_READ);
 const [markAllAsRead] = useMutation(MARK_ALL_AS_READ);

 const notifications = data?.notifications || [];
 const unreadCount = data?.unreadNotificationsCount || 0;

 const handleNotificationClick = async (notification: any) => {
 if (!notification.read) {
 await markAsRead({ variables: { id: notification.id } });
 refetch();
 }
 setIsOpen(false);
 };

 const handleMarkAllAsRead = async () => {
 await markAllAsRead();
 refetch();
 };

 return (
 <div className="relative">
 {/* Bell Icon */}
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="relative p-2 text-muted-foreground hover:text-foreground"
 >
 <Bell className="h-6 w-6" />
 {unreadCount > 0 && (
 <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-card-foreground transform translate-x-1/2 -translate-y-1/2 bg-destructive/100 rounded-full">
 {unreadCount > 99 ? '99+' : unreadCount}
 </span>
 )}
 </button>

 {/* Dropdown */}
 {isOpen && (
 <>
 {/* Backdrop */}
 <div
 className="fixed inset-0 z-40"
 onClick={() => setIsOpen(false)}
 />

 {/* Notification Panel */}
 <div className="absolute right-0 z-50 mt-2 w-80 sm:w-96 bg-card rounded-lg shadow-xl border border-border max-h-[80vh] flex flex-col">
 {/* Header */}
 <div className="flex items-center justify-between p-4 border-b border-border">
 <h3 className="text-lg font-semibold text-foreground">
 Notificações
 </h3>
 <div className="flex items-center gap-2">
 <button
 onClick={() => setShowUnreadOnly(!showUnreadOnly)}
 className="text-sm text-primary hover:text-primary/80"
 >
 {showUnreadOnly ? 'Todas' : 'Não lidas'}
 </button>
 {unreadCount > 0 && (
 <button
 onClick={handleMarkAllAsRead}
 className="text-sm text-primary hover:text-blue-700"
 title="Marcar todas como lidas"
 >
 <Check className="h-4 w-4" />
 </button>
 )}
 <button
 onClick={() => setIsOpen(false)}
 className="text-muted-foreground hover:text-muted-foreground"
 >
 <X className="h-5 w-5" />
 </button>
 </div>
 </div>

 {/* Notifications List */}
 <div className="flex-1 overflow-y-auto">
 {loading ? (
 <div className="p-4 text-center text-muted-foreground">
 Carregando...
 </div>
 ) : notifications.length === 0 ? (
 <div className="p-8 text-center text-muted-foreground">
 <Bell className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
 <p>Nenhuma notificação</p>
 </div>
 ) : (
 <div className="divide-y divide-gray-200">
 {notifications.map((notification: any) => (
 <NotificationItem
 key={notification.id}
 notification={notification}
 onClick={() => handleNotificationClick(notification)}
 />
 ))}
 </div>
 )}
 </div>

 {/* Footer */}
 <div className="p-2 border-t border-border">
 <Link
 href="/notifications"
 className="block w-full text-center text-sm text-primary hover:text-blue-700 py-2"
 onClick={() => setIsOpen(false)}
 >
 Ver todas as notificações
 </Link>
 </div>
 </div>
 </>
 )}
 </div>
 );
}

function NotificationItem({
 notification,
 onClick,
}: {
 notification: any;
 onClick: () => void;
}) {
 const timeAgo = getTimeAgo(new Date(notification.createdAt));

 const content = (
 <div
 className={`p-4 hover:bg-muted cursor-pointer transition-colors ${
 !notification.read ? 'bg-primary50 : ''
 }`}
 onClick={onClick}
 >
 <div className="flex items-start gap-3">
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2">
 <p className="text-sm font-medium text-foreground">
 {notification.title}
 </p>
 {!notification.read && (
 <span className="flex-shrink-0 w-2 h-2 bg-primary500 rounded-full" />
 )}
 </div>
 <p className="text-sm text-muted-foreground mt-1">
 {notification.message}
 </p>
 <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
 </div>
 </div>
 </div>
 );

 if (notification.link) {
 return <Link href={notification.link}>{content}</Link>;
 }

 return content;
}

function getTimeAgo(date: Date): string {
 const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

 if (seconds < 60) return 'agora';
 if (seconds < 3600) return `${Math.floor(seconds / 60)}m atrás`;
 if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
 if (seconds < 604800) return `${Math.floor(seconds / 86400)}d atrás`;

 return date.toLocaleDateString('pt-BR');
}
