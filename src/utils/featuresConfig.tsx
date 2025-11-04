import { ReactNode } from 'react';
import {
  StoreIcon,
  CatalogIcon,
  LogisticsIcon,
  PaymentIcon,
  CheckoutIcon,
  SocialIcon,
  AnalyticsIcon,
  SettingsIcon,
  SecurityIcon,
  PhoneIcon,
  LabelIcon,
  ImageIcon,
  ListIcon,
  RefreshIcon,
  PackageIcon,
  TruckIcon,
  LocationIcon,
  CheckIcon,
  CreditCardIcon,
  LockIcon,
  MoneyIcon,
  ChartIcon,
  ZapIcon,
  UserIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  CampaignIcon,
  ChatIcon,
  TargetIcon,
  TrendingUpIcon,
} from '../components/icons';

export interface FeatureDetail {
  icon: ReactNode;
  text: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  gradientLight: string;
  details: FeatureDetail[];
}

export const getFeaturesConfig = (t: (key: string) => string): Feature[] => [
  {
    id: 1,
    title: t('storeManagement.title'),
    description: t('storeManagement.description'),
    icon: <StoreIcon />,
    gradient: 'from-white to-purple-50',
    gradientLight: 'from-purple-50 to-purple-100',
    details: [
      { icon: <AnalyticsIcon />, text: t('storeManagement.detail1') },
      { icon: <SettingsIcon />, text: t('storeManagement.detail2') },
      { icon: <SecurityIcon />, text: t('storeManagement.detail3') },
      { icon: <PhoneIcon />, text: t('storeManagement.detail4') },
    ],
  },
  {
    id: 2,
    title: t('catalog.title'),
    description: t('catalog.description'),
    icon: <CatalogIcon />,
    gradient: 'from-white to-purple-50',
    gradientLight: 'from-purple-50 to-purple-100',
    details: [
      { icon: <LabelIcon />, text: t('catalog.detail1') },
      { icon: <ImageIcon />, text: t('catalog.detail2') },
      { icon: <ListIcon />, text: t('catalog.detail3') },
      { icon: <RefreshIcon />, text: t('catalog.detail4') },
    ],
  },
  {
    id: 3,
    title: t('logistics.title'),
    description: t('logistics.description'),
    icon: <LogisticsIcon />,
    gradient: 'from-white to-purple-50',
    gradientLight: 'from-purple-50 to-purple-100',
    details: [
      { icon: <PackageIcon />, text: t('logistics.detail1') },
      { icon: <TruckIcon />, text: t('logistics.detail2') },
      { icon: <LocationIcon />, text: t('logistics.detail3') },
      { icon: <CheckIcon />, text: t('logistics.detail4') },
    ],
  },
  {
    id: 4,
    title: t('payments.title'),
    description: t('payments.description'),
    icon: <PaymentIcon />,
    gradient: 'from-white to-purple-50',
    gradientLight: 'from-purple-50 to-purple-100',
    details: [
      { icon: <CreditCardIcon />, text: t('payments.detail1') },
      { icon: <LockIcon />, text: t('payments.detail2') },
      { icon: <MoneyIcon />, text: t('payments.detail3') },
      { icon: <ChartIcon />, text: t('payments.detail4') },
    ],
  },
  {
    id: 5,
    title: t('checkout.title'),
    description: t('checkout.description'),
    icon: <CheckoutIcon />,
    gradient: 'from-white to-purple-50',
    gradientLight: 'from-purple-50 to-purple-100',
    details: [
      { icon: <ZapIcon />, text: t('checkout.detail1') },
      { icon: <UserIcon />, text: t('checkout.detail2') },
      { icon: <ShoppingCartIcon />, text: t('checkout.detail3') },
      { icon: <CheckCircleIcon />, text: t('checkout.detail4') },
    ],
  },
  {
    id: 6,
    title: t('social.title'),
    description: t('social.description'),
    icon: <SocialIcon />,
    gradient: 'from-white to-purple-50',
    gradientLight: 'from-purple-50 to-purple-100',
    details: [
      { icon: <CampaignIcon />, text: t('social.detail1') },
      { icon: <ChatIcon />, text: t('social.detail2') },
      { icon: <TargetIcon />, text: t('social.detail3') },
      { icon: <TrendingUpIcon />, text: t('social.detail4') },
    ],
  },
];