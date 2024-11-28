import { motion } from 'framer-motion';
import { ArrowLeft, Star, StarOff, Trash2, Archive, Reply, Forward } from 'lucide-react';
import type { Email } from '../../types/email';

interface EmailViewProps {
  email: Email;
  onClose: () => void;
}

export const EmailView = ({ email, onClose }: EmailViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-black/30 backdrop-blur-xl rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <button
          onClick={onClose}
          className="flex items-center space-x-2 text-white/90 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/10 rounded-full">
            <Reply className="h-5 w-5 text-white/90" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <Forward className="h-5 w-5 text-white/90" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <Archive className="h-5 w-5 text-white/90" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <Trash2 className="h-5 w-5 text-white/90" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{email.subject}</h2>
            <div className="flex items-center space-x-2">
              <img src={email.avatar} alt="" className="w-8 h-8 rounded-full" />
              <div>
                <div className="text-white font-medium">{email.from}</div>
                <div className="text-white/60 text-sm">{email.fromEmail}</div>
              </div>
            </div>
          </div>
          <div className="text-white/60 text-sm">{email.date}</div>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-white/80 leading-relaxed">
            {email.preview}
            {/* Add more content here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>

        {email.attachments && (
          <div className="mt-6 p-4 rounded-lg bg-white/5">
            <h3 className="text-sm font-medium text-white/90 mb-3">Attachments ({email.attachments})</h3>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: email.attachments }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer">
                  <div className="w-10 h-10 rounded bg-white/10" />
                  <div>
                    <div className="text-sm font-medium text-white/90">Document {i + 1}</div>
                    <div className="text-xs text-white/60">PDF • 2.3 MB</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};