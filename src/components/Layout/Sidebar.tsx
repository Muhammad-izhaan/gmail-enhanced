import { motion } from 'framer-motion';
import { Inbox, Send, File, Star, Tag, Archive, Trash2, Settings } from 'lucide-react';
import { HolographicButton } from '../UI/HolographicButton';
import { ComposeButton } from '../UI/ComposeButton';

interface SidebarProps {
  currentView: 'inbox' | 'starred' | 'sent' | 'drafts' | 'archive' | 'trash';
  onViewChange: (view: 'inbox' | 'starred' | 'sent' | 'drafts' | 'archive' | 'trash') => void;
  onComposeClick: () => void;
}

export const Sidebar = ({ currentView, onViewChange, onComposeClick }: SidebarProps) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-black/20 backdrop-blur-xl p-4 flex flex-col border-r border-white/10"
    >
      <div className="mb-6">
        <ComposeButton onClick={onComposeClick} />
      </div>
      
      <div className="space-y-1 flex-1">
        <HolographicButton 
          icon={<Inbox className="h-5 w-5" />} 
          label="Inbox" 
          active={currentView === 'inbox'}
          onClick={() => onViewChange('inbox')}
        />
        <HolographicButton 
          icon={<Star className="h-5 w-5" />} 
          label="Starred" 
          active={currentView === 'starred'}
          onClick={() => onViewChange('starred')}
        />
        <HolographicButton 
          icon={<Send className="h-5 w-5" />} 
          label="Sent" 
          active={currentView === 'sent'}
          onClick={() => onViewChange('sent')}
        />
        <HolographicButton 
          icon={<File className="h-5 w-5" />} 
          label="Drafts" 
          active={currentView === 'drafts'}
          onClick={() => onViewChange('drafts')}
        />
        <HolographicButton 
          icon={<Archive className="h-5 w-5" />} 
          label="Archive" 
          active={currentView === 'archive'}
          onClick={() => onViewChange('archive')}
        />
        <HolographicButton 
          icon={<Trash2 className="h-5 w-5" />} 
          label="Trash" 
          active={currentView === 'trash'}
          onClick={() => onViewChange('trash')}
        />
      </div>

      <div className="mt-auto pt-4 border-t border-white/10">
        <HolographicButton 
          icon={<Settings className="h-5 w-5" />} 
          label="Settings" 
          onClick={() => {}}
        />
      </div>
    </motion.div>
  );
};