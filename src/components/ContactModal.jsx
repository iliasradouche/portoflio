import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiX } from 'react-icons/hi';
import { useState } from 'react';
import { CONTACT } from '../data';

const FIELDS = [
  { id: 'name',    label: 'your_name',    type: 'text',     placeholder: 'John Doe'             },
  { id: 'email',   label: 'your_email',   type: 'email',    placeholder: 'john@example.com'     },
  { id: 'subject', label: 'subject',      type: 'text',     placeholder: 'Project proposal...'  },
];

const ContactModal = ({ open, onClose }) => {
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' });
  const [status,  setStatus]  = useState('idle'); // idle | sending | sent | error
  const firstRef = useRef(null);

  /* Trap focus + close on Escape */
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

  const handleChange = e =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: form.subject }),
      });
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', subject: '', message: '' }); }
      else         setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Contact Ilias"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[61] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
            style={{
              border:     '1px solid rgba(0,255,65,0.2)',
              background: '#0d0d0d',
              boxShadow:  '0 0 60px rgba(0,255,65,0.08), 0 24px 64px rgba(0,0,0,0.8)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[rgba(0,255,65,0.1)] px-6 py-4"
              style={{ background: 'rgba(0,255,65,0.03)' }}>
              <div>
                <div className="font-mono text-[10px] text-[#00ff41]/50">▶ ssh ilias@radouche</div>
                <h2 className="font-mono text-lg font-bold text-[#e0e0e0]">Contact</h2>
              </div>
              <button onClick={onClose} aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded border border-[rgba(0,255,65,0.2)] text-[#808080] transition-colors hover:border-[#00ff41] hover:text-[#00ff41]">
                <HiX className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {status === 'sent' ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 py-8 text-center">
                  <span className="text-3xl">✅</span>
                  <p className="font-mono text-sm text-[#00ff41]">Message transmitted successfully.</p>
                  <p className="font-mono text-xs text-[#808080]">I'll get back to you soon.</p>
                  <button onClick={onClose}
                    className="btn-terminal-solid mt-4 rounded px-6 py-2 font-mono text-sm font-bold">
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {FIELDS.map((f, i) => (
                    <div key={f.id}>
                      <label htmlFor={f.id}
                        className="mb-1.5 block font-mono text-[11px] text-[#808080]">
                        <span className="text-[#00ff41]/60">$ </span>{f.label}
                      </label>
                      <input
                        ref={i === 0 ? firstRef : null}
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        value={form[f.id]}
                        onChange={handleChange}
                        className="terminal-input"
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message"
                      className="mb-1.5 block font-mono text-[11px] text-[#808080]">
                      <span className="text-[#00ff41]/60">$ </span>message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe your project, question, or idea…"
                      value={form.message}
                      onChange={handleChange}
                      className="terminal-input resize-none"
                    />
                    <div className="mt-1 text-right font-mono text-[10px] text-[#808080]/60">
                      {form.message.length}/800
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="font-mono text-xs text-red-400">
                      Transmission failed. Try emailing directly: {CONTACT.email}
                    </p>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button type="button" onClick={onClose}
                      className="btn-terminal flex-1 rounded py-2.5 font-mono text-sm">
                      Cancel
                    </button>
                    <button type="submit" disabled={status === 'sending'}
                      className="btn-terminal-solid flex-1 rounded py-2.5 font-mono text-sm font-bold disabled:opacity-60">
                      {status === 'sending' ? 'Sending…' : 'Send →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
