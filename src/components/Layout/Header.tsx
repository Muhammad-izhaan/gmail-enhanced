import { motion } from 'framer-motion';
import { Search, Menu } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-black/20 backdrop-blur-xl border-b border-white/10"
    >
      <div className="flex items-center space-x-4">
        <Menu className="h-6 w-6 text-white/90" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Space Mail
        </h1>
      </div>
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search in mail"
            className="w-full bg-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
        </div>
      </div>
    </motion.header>
  );
};