'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
 children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
 const pathname = usePathname();

 return (
 <AnimatePresence mode="wait">
 <motion.div
 key={pathname}
 initial={{ opacity: 0, filter: 'blur(10px)' }}
 animate={{ opacity: 1, filter: 'blur(0px)' }}
 exit={{ opacity: 0, filter: 'blur(10px)' }}
 transition={{
 duration: 0.4,
 ease: 'easeInOut'
 }}
 >
 {children}
 </motion.div>
 </AnimatePresence>
 );
}