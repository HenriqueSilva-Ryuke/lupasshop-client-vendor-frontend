'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const SUBSCRIBE_PUSH = gql`
  mutation SubscribeToPushNotifications($subscription: Json!) {
    subscribeToPushNotifications(subscription: $subscription)
  }
`;

const UNSUBSCRIBE_PUSH = gql`
  mutation UnsubscribeFromPushNotifications {
    unsubscribeFromPushNotifications
  }
`;

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [subscribeMutation] = useMutation(SUBSCRIBE_PUSH);
  const [unsubscribeMutation] = useMutation(UNSUBSCRIBE_PUSH);

  useEffect(() => {
    // Check if service workers and push notifications are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkSubscription();
    }
  }, []);

  async function checkSubscription() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (err) {
      console.error('Error checking subscription:', err);
    }
  }

  async function subscribe() {
    setIsLoading(true);
    setError(null);

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }

      // Get VAPID public key from environment
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        throw new Error('VAPID public key not configured');
      }

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      // Send subscription to backend
      await subscribeMutation({
        variables: {
          subscription: JSON.parse(JSON.stringify(subscription)),
        },
      });

      setIsSubscribed(true);
    } catch (err: any) {
      setError(err.message);
      console.error('Error subscribing to push notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function unsubscribe() {
    setIsLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
      }

      // Notify backend
      await unsubscribeMutation();

      setIsSubscribed(false);
    } catch (err: any) {
      setError(err.message);
      console.error('Error unsubscribing from push notifications:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isSupported,
    isSubscribed,
    isLoading,
    error,
    subscribe,
    unsubscribe,
  };
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
