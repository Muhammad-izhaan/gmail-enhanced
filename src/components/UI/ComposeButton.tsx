import { motion } from 'framer-motion';
import { PenSquare } from 'lucide-react';

interface ComposeButtonProps {
  onClick: () => void;
}

export const ComposeButton = ({ onClick }: ComposeButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative flex w-full items-center justify-center space-x-2 rounded-full bg-blue-500 px-6 py-3 shadow-lg hover:bg-blue-600 transition-colors"
    >
      <PenSquare className="h-5 w-5 text-white" />
      <span className="text-white font-medium">Compose</span>
      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};