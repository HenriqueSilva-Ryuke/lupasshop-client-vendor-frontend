import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loja | LupaShop',
  description: 'Explore os produtos da loja',
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
