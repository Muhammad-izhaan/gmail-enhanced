import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { EmailList } from './components/Email/EmailList';
import { EmailView } from './components/Email/EmailView';
import { ComposeModal } from './components/Email/ComposeModal';
import { sampleEmails } from './data/sampleEmails';
import type { Email } from './types/email';

function App() {
  const [emails, setEmails] = useState(sampleEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [currentView, setCurrentView] = useState<'inbox' | 'starred' | 'sent' | 'drafts' | 'archive' | 'trash'>('inbox');

  const filteredEmails = emails.filter(email => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase());

    switch (currentView) {
      case 'starred':
        return matchesSearch && email.starred;
      case 'sent':
        return matchesSearch && email.labels.includes('sent');
      case 'drafts':
        return matchesSearch && email.labels.includes('draft');
      case 'archive':
        return matchesSearch && email.labels.includes('archived');
      case 'trash':
        return matchesSearch && email.labels.includes('trash');
      default:
        return matchesSearch && !email.labels.includes('trash') && !email.labels.includes('archived');
    }
  });

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    setEmails(emails.map(e => 
      e.id === email.id ? { ...e, read: true } : e
    ));
  };

  const handleStarClick = (email: Email) => {
    setEmails(emails.map(e => 
      e.id === email.id ? { ...e, starred: !e.starred } : e
    ));
  };

  const handleCloseEmail = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex h-full pt-16">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          onComposeClick={() => setShowCompose(true)}
        />
        
        <main className="flex-1 overflow-hidden pl-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full overflow-y-auto p-4"
          >
            <AnimatePresence mode="wait">
              {selectedEmail ? (
                <EmailView 
                  key="email-view"
                  email={selectedEmail}
                  onClose={handleCloseEmail}
                />
              ) : (
                <EmailList 
                  key="email-list"
                  emails={filteredEmails}
                  onEmailClick={handleEmailClick}
                  onStarClick={handleStarClick}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      <AnimatePresence>
        {showCompose && (
          <ComposeModal onClose={() => setShowCompose(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;