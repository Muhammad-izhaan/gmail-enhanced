import { motion } from 'framer-motion';
import { X, Paperclip, Minus, Maximize2, Loader2 } from 'lucide-react';
import { useState, useRef, FormEvent } from 'react';

interface ComposeModalProps {
  onClose: () => void;
  onSend: (email: {
    to: string;
    subject: string;
    content: string;
    attachments: File[];
  }) => void;
}

export const ComposeModal = ({ onClose, onSend }: ComposeModalProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    content: ''
  });

  const [errors, setErrors] = useState({
    to: '',
    subject: '',
    content: ''
  });

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {
      to: !formData.to ? 'Recipient is required' : 
          !validateEmail(formData.to) ? 'Invalid email address' : '',
      subject: !formData.subject ? 'Subject is required' : '',
      content: !formData.content ? 'Message content is required' : ''
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setIsSending(true);
    try {
      await onSend({
        ...formData,
        attachments
      });
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? '3rem' : 'auto',
        width: isFullscreen ? '100%' : '600px'
      }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed ${isFullscreen ? 'inset-0' : 'bottom-0 right-24'} 
        bg-black/90 backdrop-blur-xl rounded-t-lg shadow-2xl overflow-hidden`}
    >
      <div className="flex items-center justify-between p-3 bg-black/50">
        <h3 className="text-white font-medium">New Message</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 hover:bg-white/10 rounded-md"
          >
            <Minus className="h-4 w-4 text-white/80" />
          </button>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-white/10 rounded-md"
          >
            <Maximize2 className="h-4 w-4 text-white/80" />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-md">
            <X className="h-4 w-4 text-white/80" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Recipients"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className={`w-full bg-transparent border-b ${
                errors.to ? 'border-red-500' : 'border-white/20'
              } px-2 py-1.5 text-white placeholder-white/50 focus:outline-none focus:border-blue-500`}
            />
            {errors.to && (
              <p className="text-red-500 text-sm mt-1">{errors.to}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={`w-full bg-transparent border-b ${
                errors.subject ? 'border-red-500' : 'border-white/20'
              } px-2 py-1.5 text-white placeholder-white/50 focus:outline-none focus:border-blue-500`}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Compose email"
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className={`w-full bg-transparent ${
                errors.content ? 'border border-red-500' : ''
              } text-white placeholder-white/50 focus:outline-none resize-none`}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 rounded-md p-2">
                  <span className="text-white text-sm truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 bg-black/50">
            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send</span>
              )}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            
            <button
              type="button"
              onClick={handleAttachment}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <Paperclip className="h-5 w-5 text-white/80" />
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};