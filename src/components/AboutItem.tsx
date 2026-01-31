import { motion } from 'motion/react';

interface AboutItemProps {
 children: React.ReactNode;
 transforms: {
 opacity: any;
 scale: any;
 y: any;
 };
 zIndex: number;
}

export const AboutItem = ({ children, transforms, zIndex }: AboutItemProps) => {
 return (
 <motion.div
 className="absolute inset-0 flex items-center justify-center"
 style={{
 opacity: transforms.opacity,
 scale: transforms.scale,
 y: transforms.y,
 zIndex,
 }}
 >
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 {children}
 </div>
 </motion.div>
 );
};