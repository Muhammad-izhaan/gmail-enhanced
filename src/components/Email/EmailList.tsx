import { motion } from 'framer-motion';
import { Star, StarOff, Paperclip, AlertCircle } from 'lucide-react';
import type { Email } from '../../types/email';

interface EmailListProps {
  emails: Email[];
  onEmailClick: (email: Email) => void;
  onStarClick: (email: Email) => void;
}

export const EmailList = ({ emails, onEmailClick, onStarClick }: EmailListProps) => {
  return (
    <div className="space-y-1">
      {emails.map((email) => (
        <motion.div
          key={email.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className={`group relative flex items-center space-x-4 px-4 py-3 cursor-pointer 
            ${email.read ? 'bg-black/20' : 'bg-black/30'} 
            hover:bg-black/40 backdrop-blur-lg rounded-lg transition-all duration-200`}
          onClick={() => onEmailClick(email)}
        >
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
            initial={false}
            transition={{ duration: 0.2 }}
          />
          
          <div className="flex-shrink-0 w-8">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStarClick(email);
              }}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              {email.starred ? (
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-5 w-5" />
              )}
            </button>
          </div>

          {email.avatar && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
              <img src={email.avatar} alt={email.from} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex-grow min-w-0">
            <div className="flex items-center space-x-2">
              <span className={`font-semibold truncate ${!email.read && 'text-blue-400'}`}>
                {email.from}
              </span>
              {email.important && (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            <div className="text-sm text-gray-300 truncate">{email.subject}</div>
            <div className="text-sm text-gray-400 truncate">{email.preview}</div>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-4">
            {email.attachments && (
              <Paperclip className="h-4 w-4 text-gray-400" />
            )}
            <span className="text-sm text-gray-400">{email.date}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};