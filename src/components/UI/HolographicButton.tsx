import { motion } from 'framer-motion';

interface HolographicButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export const HolographicButton = ({ icon, label, onClick, active }: HolographicButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 transition-all
        ${active 
          ? 'bg-blue-500/20 text-blue-400' 
          : 'bg-black/10 text-white/90 hover:bg-black/20'
        }`}
      onClick={onClick}
    >
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 
        ${active ? 'opacity-100' : 'group-hover:opacity-100'} 
        transition-opacity`} 
      />
      <span className="relative">{icon}</span>
      <span className="relative text-sm font-medium">{label}</span>
    </motion.button>
  );
};