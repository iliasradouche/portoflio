import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiX, HiMail, HiDuplicate, HiCheck, HiChatAlt2, HiGlobeAlt, HiClock, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { CONTACT } from '../data';

const FIELDS = [
  { id: 'name', label: 'your_name', type: 'text', placeholder: 'John Doe' },
  { id: 'email', label: 'your_email', type: 'email', placeholder: 'john@example.com' },
  { id: 'subject', label: 'subject', type: 'text', placeholder: 'Project proposal...' },
];

const ContactMetadata = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00ff41]/5 text-[#00ff41]/60">
      <Icon className="h-4 w-4" />
    </div>
    <div>
      <div className="font-mono text-[9px] uppercase tracking-widest text-[#808080]">{label}</div>
      <div className="font-mono text-xs font-bold text-[#e0e0e0]">{value}</div>
    </div>
  </div>
);

const ContactModal = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const firstRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    setLogIndex(0); // Reset log sequence
    
    // Minimal delay to show the "Encrypting" log
    await new Promise(r => setTimeout(r, 800));

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: form.subject }),
      });
      
      // Even if fast, we wait for visual logs to complete or reach a certain point
      if (res.ok) { 
        setStatus('sent'); 
        setForm({ name: '', email: '', subject: '', message: '' }); 
      } else {
        setStatus('error');
      }
    } catch { 
      setStatus('error'); 
    }
  };

  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    { msg: "Initializing secure handshake...", delay: 400 },
    { msg: "Encrypting message payload (AES-256)...", delay: 700 },
    { msg: "Mapping satellite hops via Casablanca-Node-01...", delay: 600 },
    { msg: "Dispatching encrypted packets to core system...", delay: 800 },
    { msg: "Waiting for acknowledgement...", delay: 1000 },
  ];

  useEffect(() => {
    if (status !== 'sending') return;
    if (logIndex < logs.length - 1) {
      const timer = setTimeout(() => setLogIndex(prev => prev + 1), logs[logIndex].delay);
      return () => clearTimeout(timer);
    }
  }, [status, logIndex]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Center Contact Dispatch"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-[#00ff41]/20 bg-[#0a0a0a] shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#00ff41]/10 bg-[#00ff41]/5 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-2" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#00ff41]">
                  Command Center — Dispatch
                </div>
              </div>
              <button onClick={onClose} aria-label="Close Modal" className="group flex h-8 w-8 items-center justify-center rounded-lg hover:bg-red-500/10 transition-colors">
                <HiX className="h-5 w-5 text-[#808080] group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            <div className="grid grid-cols-1 divide-y divide-white/5 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
              
              {/* Left Column: System Info */}
              <div className="col-span-2 flex flex-col p-8 lg:p-10">
                <div className="mb-10">
                  <div className="page-label mb-2">▶ system_node</div>
                  <h2 className="font-mono text-2xl font-extrabold text-[#e0e0e0]">ILIAS RADOUCHE</h2>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-[#808080]">
                    Full-Stack Engineer specialized in building premium digital products and interactive systems.
                  </p>
                </div>

                <div className="space-y-6">
                  <ContactMetadata label="Status" value="AVAILABLE FOR WORK" icon={HiGlobeAlt} />
                  <ContactMetadata label="Location" value="Casablanca, Morocco" icon={HiLocationMarker} />
                  <ContactMetadata label="Local Time" value={currentTime} icon={HiClock} />
                </div>

                <div className="mt-10">
                  <div className="page-label mb-4">DIRECT_CONTACT</div>
                  <button 
                    onClick={copyEmail}
                    aria-label="Copy Email Address"
                    className="group flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/2 p-4 transition-all hover:border-[#00ff41]/30 hover:bg-[#00ff41]/5"
                  >
                    <div className="flex items-center gap-3">
                      <HiMail className="h-5 w-5 text-[#00ff41]" />
                      <span className="font-mono text-xs font-bold text-[#e0e0e0] group-hover:text-[#00ff41] transition-colors">{CONTACT.email}</span>
                    </div>
                    {copied ? <HiCheck className="h-5 w-5 text-[#00ff41]" /> : <HiDuplicate className="h-4 w-4 text-[#808080] group-hover:text-[#00ff41]" />}
                  </button>
                  
                  <a href="https://wa.me/212708768070" target="_blank" rel="noopener noreferrer"
                    aria-label="Start WhatsApp Chat"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366]/10 px-4 py-3 font-mono text-xs font-bold text-[#25D366] transition-all hover:bg-[#25D366]/20">
                    <FaWhatsapp className="h-4 w-4" /> START WHATSAPP CHAT
                  </a>
                </div>

                <div className="mt-auto pt-10">
                  <div className="flex gap-4">
                    {[
                      { icon: FaLinkedin, href: 'https://linkedin.com/in/ilias-radouche', label: 'LinkedIn' },
                      { icon: FaGithub, href: 'https://github.com/iliasradouche', label: 'GitHub' },
                      { icon: FaTwitter, href: 'https://twitter.com/Radoucheilias', label: 'Twitter' },
                      { icon: FaInstagram, href: 'https://instagram.com/radouche__', label: 'Instagram' },
                    ].map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-[#808080] transition-all hover:border-[#00ff41]/40 hover:text-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.1)]">
                        <s.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Message Form */}
              <div className="col-span-3 p-8 lg:p-10">
                {status === 'sending' ? (
                  <div className="flex h-full flex-col justify-center gap-4 py-10">
                    <div className="page-label animate-pulse tracking-widest text-[#00ff41]">
                      [TRANSMISSION_IN_PROGRESS]
                    </div>
                    <div className="space-y-3 font-mono text-[11px]">
                      {logs.slice(0, logIndex + 1).map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`${i === logIndex ? 'text-[#00ff41]' : 'text-[#808080]'}`}
                        >
                          <span className="mr-2">{i === logIndex ? '▶' : '✔'}</span>
                          {log.msg}
                          {i === logIndex && <span className="ml-1 inline-block animate-blink">_</span>}
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-8 flex items-center gap-3">
                       <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div 
                            className="h-full bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${((logIndex + 1) / logs.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                       </div>
                       <span className="font-mono text-[10px] text-[#00ff41]">
                          {Math.round(((logIndex + 1) / logs.length) * 100)}%
                       </span>
                    </div>
                  </div>
                ) : status === 'sent' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#00ff41]/10 text-3xl shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                      🚀
                    </div>
                    <h3 className="font-mono text-xl font-bold text-[#00ff41]">TRANSMISSION SUCCESSFUL</h3>
                    <p className="mt-3 max-w-xs font-mono text-sm leading-relaxed text-[#808080]">
                      Your message has been encrypted and sent to the core system. Stand by for a response.
                    </p>
                    <button onClick={onClose} className="btn-terminal-solid mt-8 rounded-lg px-8 py-3">
                      CLOSE SESSION
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col h-full gap-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {FIELDS.slice(0, 2).map((f, i) => (
                        <div key={f.id}>
                          <label htmlFor={f.id} className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#808080]">
                            {f.label}
                          </label>
                          <input
                            ref={i === 0 ? firstRef : null}
                            id={f.id} name={f.id} type={f.type} required
                            placeholder={f.placeholder} value={form[f.id]} onChange={handleChange}
                            className="terminal-input !bg-white/2 focus:!bg-white/3"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#808080]">
                        subject
                      </label>
                      <input
                        id="subject" name="subject" type="text" required
                        placeholder="Project proposal..." value={form.subject} onChange={handleChange}
                        className="terminal-input !bg-white/2 focus:!bg-white/3"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-[#808080]">
                        message_body
                      </label>
                      <textarea
                        id="message" name="message" rows={6} required
                        placeholder="Describe your project, question, or idea…"
                        value={form.message} onChange={handleChange}
                        className="terminal-input h-full resize-none !bg-white/2 focus:!bg-white/3"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="font-mono text-xs font-bold text-red-500">
                        ⚠ ERROR: Transmission failed. Internal system error.
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        aria-label="Establish Connection"
                        className="btn-terminal-solid group flex w-full items-center justify-center gap-3 rounded-xl py-4 font-mono text-sm font-bold shadow-[0_10px_30px_rgba(0,255,65,0.2)]"
                      >
                        {status === 'sending' ? (
                          <>ENCRYPTING...</>
                        ) : (
                          <>
                            <HiChatAlt2 className="h-5 w-5" />
                            ESTABLISH CONNECTION →
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
