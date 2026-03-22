'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Bell, Check, CheckCheck, Trash2, Filter, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const GET_NOTIFICATIONS = gql`
  query GetNotificationsPage($limit: Int, $unreadOnly: Boolean) {
    notifications(limit: $limit, unreadOnly: $unreadOnly) {
      notifications {
        id
        type
        title
        message
        link
        read
        isRead
        createdAt
      }
      unreadCount
    }
  }
`;

const MARK_AS_READ = gql`
  mutation MarkNotificationAsRead($id: ID!) {
    markNotificationAsRead(id: $id) {
      id
      read
      isRead
    }
  }
`;

const MARK_ALL_AS_READ = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead
  }
`;

const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($id: ID!) {
    deleteNotification(id: $id)
  }
`;

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  ORDER_UPDATE:      { label: 'Encomenda',     color: 'bg-blue-100 text-blue-700' },
  NEW_MESSAGE:       { label: 'Mensagem',       color: 'bg-purple-100 text-purple-700' },
  REVIEW_RECEIVED:   { label: 'Avaliação',      color: 'bg-amber-100 text-amber-700' },
  PAYOUT_PROCESSED:  { label: 'Pagamento',      color: 'bg-green-100 text-green-700' },
  STORE_APPROVED:    { label: 'Loja Aprovada',  color: 'bg-green-100 text-green-700' },
  STORE_REJECTED:    { label: 'Loja Rejeitada', color: 'bg-red-100 text-red-700' },
  PRODUCT_LOW_STOCK: { label: 'Stock Baixo',    color: 'bg-orange-100 text-orange-700' },
  RETURN_UPDATE:     { label: 'Devolução',      color: 'bg-pink-100 text-pink-700' },
  PROMOTIONAL:       { label: 'Promoção',       color: 'bg-teal-100 text-teal-700' },
  SYSTEM:            { label: 'Sistema',        color: 'bg-gray-100 text-gray-700' },
};

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'agora';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m atrás`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d atrás`;
  return new Date(dateStr).toLocaleDateString('pt-AO', { day: '2-digit', month: 'long' });
}

export default function NotificationsPage() {
  const [unreadOnly, setUnreadOnly] = useState(false);

  const { data, loading, error, refetch } = useQuery<any>(GET_NOTIFICATIONS, {
    variables: { limit: 100, unreadOnly },
    fetchPolicy: 'cache-and-network',
  });

  const [markAsRead] = useMutation(MARK_AS_READ, { onCompleted: () => refetch() });
  const [markAllAsRead, { loading: markingAll }] = useMutation(MARK_ALL_AS_READ, {
    onCompleted: () => refetch(),
  });
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION, { onCompleted: () => refetch() });

  const notifications: any[] = data?.notifications?.notifications ?? [];
  const unreadCount: number = data?.notifications?.unreadCount ?? 0;

  const handleClick = (n: any) => {
    if (!n.read && !n.isRead) {
      markAsRead({ variables: { id: n.id } });
    }
  };

  return (
    <div className="w-full bg-background-light min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Notificações</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {unreadCount > 0 ? `${unreadCount} não lida${unreadCount !== 1 ? 's' : ''}` : 'Tudo em dia'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUnreadOnly(v => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                unreadOnly
                  ? 'bg-primary text-white border-primary'
                  : 'bg-card border-border text-foreground hover:border-primary/40'
              }`}
            >
              <Filter className="w-4 h-4" />
              {unreadOnly ? 'Mostrar todas' : 'Só não lidas'}
            </button>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                disabled={markingAll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-card border border-border hover:border-primary/40 transition-colors disabled:opacity-50"
              >
                {markingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCheck className="w-4 h-4" />}
                Marcar todas como lidas
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[720px] mx-auto">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error.message}
          </div>
        )}

        {loading && notifications.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> A carregar notificações...
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-3">
            <Bell className="w-16 h-16 opacity-20" />
            <p className="font-medium">Nenhuma notificação</p>
            <p className="text-sm">Quando houver actividade, aparecerá aqui.</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden divide-y divide-border">
            {notifications.map((n: any) => {
              const isUnread = !n.read && !n.isRead;
              const badge = TYPE_LABELS[n.type] ?? { label: n.type, color: 'bg-muted text-muted-foreground' };

              const inner = (
                <div
                  className={`px-5 py-4 flex gap-4 items-start hover:bg-muted/30 transition-colors cursor-pointer ${
                    isUnread ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => handleClick(n)}
                >
                  {/* Unread dot */}
                  <div className="mt-1.5 shrink-0">
                    {isUnread ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-primary block" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-transparent block" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{timeAgo(n.createdAt)}</span>
                    </div>
                    <p className="text-sm font-semibold mt-1">{n.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                  </div>

                  <div className="shrink-0 flex gap-1">
                    {isUnread && (
                      <button
                        title="Marcar como lida"
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); markAsRead({ variables: { id: n.id } }); }}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      title="Apagar"
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); deleteNotification({ variables: { id: n.id } }); }}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );

              return n.link ? (
                <Link key={n.id} href={n.link}>{inner}</Link>
              ) : (
                <div key={n.id}>{inner}</div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
