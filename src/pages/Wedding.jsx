import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, VolumeX, MessageCircle, MapPin, Video, Send, CheckCircle2, ExternalLink } from 'lucide-react';

const GANESH = "https://media.base44.com/images/public/69fedcc55e753ef411990907/8a047269f_image.png";
const ELEPHANTS = "https://media.base44.com/images/public/69fedcc55e753ef411990907/075cc77e3_image.png";

const WEDDING_DATE = new Date(
  '2026-08-28T23:36:00+05:30'
);

function getTimeLeft() {
  const diff = WEDDING_DATE - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const creamYellow = '#FDE8B5';
const cream = '#F3EBE1';
const gold = '#D4AF37';
const goldLight = '#F0D060';
const goldDim = 'rgba(212,175,55,0.55)';
const bg = '#45233a';
const cardBg = 'linear-gradient(90deg, #7a4267 0%, #7a4267 35%, #562c47 35%, #562c47 100%)';

const sectionTitle = { color: cream, fontFamily: "'Playfair Display', serif", textShadow: `0 2px 20px rgba(243,235,225,0.2)` };
const subLabel = { color: gold, fontFamily: "'Cinzel', serif", fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' };
const divider = (
  <div className="flex items-center justify-center gap-3 my-4">
    <div style={{ height: 1, width: 80, background: `linear-gradient(to right, transparent, ${gold})` }} />
    <span style={{ color: gold, fontSize: 18 }}>🪷</span>
    <div style={{ height: 1, width: 80, background: `linear-gradient(to left, transparent, ${gold})` }} />
  </div>
);

function CountdownBox({ value, label }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center rounded-xl border"
        style={{ width: 80, height: 80, background: cardBg, borderColor: goldDim, boxShadow: `0 0 18px rgba(212,175,55,0.12)` }}>
        <span style={{ ...sectionTitle, fontSize: 36, fontWeight: 700 }}>{String(value).padStart(2, '0')}</span>
      </div>
      <p className="mt-2" style={{ ...subLabel, fontSize: 10 }}>{label}</p>
    </div>
  );
}

const events = [
  { icon: '🙏', label: 'SACRED MUHURTAM', name: 'Wedding Ceremony', desc: 'The auspicious wedding ceremony begins at 11:36 PM.', date: 'Friday, 28 Aug · 11:36 PM' },
  { icon: '🍽️', label: 'FAMILY LUNCH', name: 'Lunch', desc: 'Lunch for family and friends at the bride’s residence.', date: 'Friday, 28 Aug · 12:30 PM onwards' },
];

const galleryImages = [
  '/wedding-images/bride.jpeg',
  '/wedding-images/groom.jpeg',
  '/wedding-images/couple.jpeg',
  '/wedding-images/main1.jpeg',
  '/wedding-images/main2.jpeg',
  '/wedding-images/main3.jpeg',
  '/wedding-images/main4.jpeg'
];
export default function Wedding() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [rsvpStatus, setRsvpStatus] = useState(null); // 'accept' | 'decline'
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpMsg, setRsvpMsg] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  const audioRef = useRef(null);
  const coupleRef = useRef(null);

  useEffect(() => {
    if (opened) {
      let scrollInterval;
      
      // First, smoothly scroll to the beginning of the invitation (Couple Section)
      setTimeout(() => {
        if (coupleRef.current) {
          coupleRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        
        // After the initial smooth scroll finishes, start the slow continuous scroll
        setTimeout(() => {
          scrollInterval = setInterval(() => {
            window.scrollBy({ top: 2, left: 0 });
            
            // Stop automatically if we reach the very bottom of the page
            if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
               clearInterval(scrollInterval);
            }
          }, 15); // 15ms interval, 2px scroll = faster, smooth scrolling speed
        }, 1200);

      }, 500);

      // Stop auto-scrolling if the user decides to take control (scrolls, touches, or clicks)
      const stopScrolling = () => clearInterval(scrollInterval);
      window.addEventListener('wheel', stopScrolling, { passive: true });
      window.addEventListener('touchstart', stopScrolling, { passive: true });
      window.addEventListener('mousedown', stopScrolling, { passive: true });

      return () => {
        clearInterval(scrollInterval);
        window.removeEventListener('wheel', stopScrolling);
        window.removeEventListener('touchstart', stopScrolling);
        window.removeEventListener('mousedown', stopScrolling);
      };
    }
  }, [opened]);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = new Audio("/audio/shatamanam_bhavati.mp3");
    audio.loop = true; audio.volume = 0.3; audio.muted = true;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (muted) { audioRef.current.muted = false; audioRef.current.play().catch(() => { }); }
    else { audioRef.current.muted = true; }
    setMuted(!muted);
  };

 const whatsappUrl = `https://wa.me/917396756920?text=${encodeURIComponent("Hi, I want this type of invitation. May I know the details and price?")}`;
  const sendRsvpToBride = () => {
  if (!rsvpStatus) {
    alert("Please select Joyfully Accept or Regretfully Decline.");
    return;
  }

  if (!rsvpName.trim()) {
    alert("Please enter your name.");
    return;
  }

  const rsvpMessage = `💍 Wedding RSVP – Sirisha & Manoj Reddy

👤 Name: ${rsvpName}
💌 RSVP: ${rsvpStatus === 'accept' ? 'Joyfully Accept' : 'Regretfully Decline'}
📝 Message: ${rsvpMsg || 'No message provided'}

📅 Wedding Date: 28 August 2026`;

  const brideWhatsAppUrl =
    `https://wa.me/919390598056?text=${encodeURIComponent(rsvpMessage)}`;

  window.open(brideWhatsAppUrl, "_blank");

  setRsvpDone(true);
};
  const mapUrl =
  "https://maps.app.goo.gl/fVuZy78abAnKBhiP7?g_st=aw";
  const mapUrl=
    "https://www.google.com/maps?q=16.3001242,79.927497&z=17&hl=en";

  return (
    <div style={{ background: bg, minHeight: '100vh', color: cream, fontFamily: "'EB Garamond', serif" }}>

      {/* Fixed Buttons */}
      <button onClick={toggleAudio}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs"
        style={{ background: cardBg, border: `1px solid ${goldDim}`, color: gold, fontFamily: "'Cinzel', serif", letterSpacing: '0.15em' }}>
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        {muted ? 'SOUND OFF' : 'SOUND ON'}
      </button>

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
        style={{ background: `linear-gradient(135deg, ${gold}, #b8860b)`, boxShadow: `0 4px 24px rgba(212,175,55,0.4)` }}>
        <MessageCircle size={24} color={bg} />
      </a>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
        style={{ background: `radial-gradient(ellipse 80% 70% at 50% 50%, #7a4267 0%, ${bg} 100%)` }}>
        {/* geometric lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${gold} 0, ${gold} 1px, transparent 0, transparent 50%)`,
          backgroundSize: '60px 60px'
        }} />
        {/* corner ornaments */}
        {['top-4 left-4 border-t-2 border-l-2 rounded-tl-lg', 'top-4 right-4 border-t-2 border-r-2 rounded-tr-lg',
          'bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg', 'bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg'
        ].map((cls, i) => (
          <div key={i} className={`absolute w-16 h-16 ${cls}`} style={{ borderColor: goldDim }} />
        ))}

        {/* Ganesh */}
        <motion.img src={GANESH} alt="Lord Ganesh"
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 1.8 }}
          className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full mb-2 z-10"
          style={{ filter: `drop-shadow(0 0 30px rgba(212,175,55,0.5)) brightness(1.1) contrast(1.05)`, mixBlendMode: 'screen' }}
        />

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={subLabel} className="mb-1 z-10">Wedding Celebration</motion.p>

        {/* Names in script */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1.2 }} className="text-center z-10 my-2">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(52px,12vw,110px)', fontWeight: 400, color: creamYellow, textShadow: `0 2px 30px rgba(253,232,181,0.3)`, lineHeight: 1.1 }}>
            Manoj Reddy<span style={{ fontWeight: 300, color: creamYellow }}> &amp; </span>Sirisha
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="flex items-center gap-4 my-4 z-10">
          <div style={{ height: 1, width: 60, background: goldDim }} />
          <p style={{ ...subLabel, fontSize: 12 }}>Friday, 28 August 2026 · 11:36 PM · Muhurtham</p>
          <div style={{ height: 1, width: 60, background: goldDim }} />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="text-center italic mb-6 z-10"
          style={{ color: cream, fontFamily: "'EB Garamond', serif", fontSize: 16, maxWidth: 340 }}>
          Together with our families, we joyfully invite you to celebrate our union
        </motion.p>

        {divider}

        {!opened && (
          <motion.button onClick={() => setOpened(true)}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-10 py-3 rounded-full z-10 mt-2"
            style={{ background: creamYellow, color: bg, fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: '0.3em', boxShadow: `0 4px 28px rgba(253,232,181,0.4)` }}>
            OPEN INVITATION
          </motion.button>
        )}

        {opened && (
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-4 z-10">
            <ChevronDown size={24} color={gold} />
            <p style={{ ...subLabel, textAlign: 'center', marginTop: 4 }}>Scroll to Explore</p>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {opened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

            {/* ═══════════════ THE COUPLE ═══════════════ */}
            <section ref={coupleRef} className="py-20 px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                  <p style={subLabel} className="mb-8">The Couple</p>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2 }}
                    className="relative mx-auto flex flex-col items-center justify-center w-full max-w-4xl my-8"
                  >
                    {/* The newly uploaded couple portrait */}
                   <img 
  src="/wedding-images/couple.jpeg"
  alt="Manoj Reddy and Sirisha"
  className="w-full max-w-2xl object-contain drop-shadow-2xl rounded-2xl"
/>
                    
                    {/* Text below the image with love symbol */}
                    <h2 
                      style={{ 
                        fontFamily: "'Playfair Display', serif", 
                        fontSize: 'clamp(36px, 7vw, 64px)', 
                        fontWeight: 600, 
                        color: creamYellow,
                        textShadow: `0 2px 20px rgba(253,232,181,0.4)`,
                        marginTop: '2rem'
                      }}
                      className="leading-none flex items-center justify-center gap-3"
                    >
                      Manoj Reddy
                      <span className="animate-pulse" style={{ fontSize: '0.8em' }}>❤️</span> 
                      Sirisha
                    </h2>
                  </motion.div>

                  <p className="italic mt-8" style={{ color: cream, fontSize: 16 }}>Two families, many traditions, one timeless celebration.</p>
                  {divider}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-10">
                  {/* Groom */}
                  <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
                    className="text-center p-4">
                    <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] mx-auto flex items-center justify-center mb-6">
                      <div className="absolute inset-[10px] rounded-full overflow-hidden shadow-2xl">
                        <img 
 src="/wedding-images/groom.jpeg"
 alt="Groom Manoj Reddy"
 className="w-full h-full object-cover object-top"
/>
                      </div>
                      
                      {/* Simple rotating golden rings */}
                      <motion.div 
                        className="absolute inset-0 rounded-full pointer-events-none" 
                        style={{ border: `2px dashed ${gold}` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-[6px] rounded-full pointer-events-none" style={{ border: `1px solid ${goldDim}` }} />
                    </div>
                    <h3 style={{ ...sectionTitle, fontSize: 26, fontFamily: "'Cinzel', serif", letterSpacing: '0.15em' }}>MANOJ REDDY</h3>
                    <p style={{ ...subLabel, marginTop: 6 }}>Son of</p>
                    <p className="mt-1 italic" style={{ color: cream, fontSize: 15 }}>Sri Shagamreddy Peddireddy &amp; Smt. Ademma</p>
                  </motion.div>

                  {/* Bride */}
                  <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
                    className="text-center p-4">
                    <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] mx-auto flex items-center justify-center mb-6">
                      <div className="absolute inset-[10px] rounded-full overflow-hidden shadow-2xl">
                        <img 
                          src="/wedding-images/bride.jpeg" 
                          alt="Bride Sirisha" 
                          className="w-full h-full object-cover object-top" 
                        />
                      </div>
                      
                      {/* Simple rotating golden rings */}
                      <motion.div 
                        className="absolute inset-0 rounded-full pointer-events-none" 
                        style={{ border: `2px dashed ${gold}` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-[6px] rounded-full pointer-events-none" style={{ border: `1px solid ${goldDim}` }} />
                    </div>
                    <h3 style={{ ...sectionTitle, fontSize: 26, fontFamily: "'Cinzel', serif", letterSpacing: '0.15em' }}>SIRISHA</h3>
                    <p style={{ ...subLabel, marginTop: 6 }}>Daughter of</p>
                    <p className="mt-1 italic" style={{ color: cream, fontSize: 15 }}>Sri Bode Venkateswara Reddy &amp; Smt. Sivaleela</p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ═══════════════ CELEBRATION SCHEDULE ═══════════════ */}
            <section className="py-20 px-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                  <p style={subLabel}>Wedding Events</p>
                  <h2 style={{ ...sectionTitle, fontSize: 'clamp(28px,6vw,52px)', fontWeight: 600 }}>Celebration Schedule</h2>
                  <p className="italic mt-2" style={{ color: cream, fontSize: 15 }}>Every ritual, every moment — beautifully planned for family and friends.</p>
                  {divider}
                  <p style={{ color: goldDim, fontSize: 13, fontFamily: "'Cinzel', serif", letterSpacing: '0.2em' }}>
                    Zuvvaleru Village, Podili Mandal, Markapur District
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {events.map((ev, i) => (
                    <motion.div key={ev.name}
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="rounded-2xl p-6" style={{ background: cardBg, border: `1px solid ${goldDim}` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ fontSize: 22 }}>{ev.icon}</span>
                        <p style={{ ...subLabel, fontSize: 10 }}>{ev.label}</p>
                      </div>
                      <h3 style={{ ...sectionTitle, fontSize: 22, fontFamily: "'Cinzel', serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ev.name}</h3>
                      <p className="italic mt-2 mb-4" style={{ color: cream, fontSize: 14 }}>{ev.desc}</p>
                      <p style={{ color: cream, fontSize: 13, fontFamily: "'Cinzel', serif" }}>{ev.date}</p>
                      <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-4 text-xs" style={{ color: gold, fontFamily: "'Cinzel', serif", letterSpacing: '0.15em' }}>
                        GET DIRECTIONS →
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════ COUNTDOWN ═══════════════ */}
            <section className="py-20 px-4 text-center">
              <p style={subLabel}>Sacred Muhurat</p>
              <h2 style={{ ...sectionTitle, fontSize: 'clamp(28px,5vw,48px)', fontWeight: 600 }}>Countdown to the Big Day</h2>
              <p className="italic mt-2 mb-10" style={{ color: cream, fontSize: 15 }}>The auspicious moment is getting closer.</p>
              <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                {[['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']].map(([k, l]) => (
                  <CountdownBox key={k} value={timeLeft[k]} label={l} />
                ))}
              </div>
              {divider}
            </section>

            {/* ═══════════════ GALLERY ═══════════════ */}
            <section className="py-20 px-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <p style={subLabel}>Captured Chapters</p>
                  <h2 style={{ ...sectionTitle, fontSize: 'clamp(28px,5vw,48px)', fontWeight: 600 }}>Memories in Bloom</h2>
                  <p className="italic mt-2" style={{ color: cream, fontSize: 15 }}>A glimpse of moments leading to our celebration.</p>
                  {divider}
                </div>
                {/* Bento grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 auto-rows-[280px] md:auto-rows-[340px] grid-flow-row-dense">
                  {galleryImages.map((src, i) => (
                    <motion.div key={`b${i}`}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className={`relative overflow-hidden rounded-xl group bg-black/40 ${(i === 0 || i === 4 || i === 8) ? 'col-span-1 sm:col-span-2 row-span-2' : ''}`}
                      style={{ border: `1px solid ${goldDim}` }}>
                      {/* Blurred background layer to fill empty spaces */}
                      <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110" />
                      {/* Actual image contained so faces aren't cut off */}
                      <img src={src} alt={`Moment ${i + 1}`} className="relative z-10 w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════ VENUE & LUNCH ═══════════════ */}
            <section className="py-20 px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <p style={subLabel}>Venue Guide</p>
                  <h2 style={{ ...sectionTitle, fontSize: 'clamp(28px,5vw,48px)', fontWeight: 600 }}>Venue &amp; Lunch</h2>
                  <p className="italic mt-2" style={{ color: cream, fontSize: 15 }}>Save the date and arrive with ease.</p>
                  {divider}
                </div>

                {/* Event tabs style */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {events.map(ev => (
                    <div key={ev.name} className="px-4 py-2 rounded-full text-center" style={{ border: `1px solid ${goldDim}`, minWidth: 140 }}>
                      <p style={{ color: gold, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.1em' }}>{ev.name.toUpperCase()}</p>
                      <p style={{ color: cream, fontSize: 11 }}>{ev.date.split('·')[1]?.trim()}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-2xl p-8 text-center" style={{ background: cardBg, border: `1px solid ${goldDim}` }}>
                    <MapPin size={36} color={gold} className="mx-auto mb-4" />
                    <h3 style={{ ...sectionTitle, fontSize: 22, fontFamily: "'Cinzel', serif" }}>WEDDING VENUE</h3>
                    <p className="mt-3 italic" style={{ color: cream }}>Groom's Residence</p>
                    <p style={{ color: cream, fontSize: 13 }}>Zuvvaleru Village, Podili Mandal, Markapur District</p>
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 px-8 py-3 rounded-full text-xs"
                      style={{ background: `linear-gradient(135deg, ${gold}, #b8860b)`, color: bg, fontFamily: "'Cinzel', serif", letterSpacing: '0.2em' }}>
                      <MapPin size={14} /> OPEN IN MAPS <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="rounded-2xl p-8 text-center" style={{ background: cardBg, border: `1px solid ${goldDim}` }}>
                    <Video size={36} color={gold} className="mx-auto mb-4" />
                    <h3 style={{ ...sectionTitle, fontSize: 22, fontFamily: "'Cinzel', serif" }}>LUNCH VENUE</h3>
                    <p className="mt-3 italic" style={{ color: cream }}>Bride's Residence</p>
                    <p style={{ color: cream, fontSize: 13 }}>V. Reddy Palem Village, Rompicharla Mandal, Palnadu District</p>
                    <p className="mt-5" style={{ color: gold, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.12em' }}>FRIDAY, 28 AUGUST 2026 · 12:30 PM ONWARDS</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════ RSVP ═══════════════ */}
            <section className="py-20 px-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                  <p style={subLabel}>Join the Celebration</p>
                  <h2 style={{ ...sectionTitle, fontSize: 'clamp(28px,5vw,48px)', fontWeight: 600 }}>RSVP &amp; Share</h2>
                  <p className="italic mt-2" style={{ color: cream }}>We would be honored to celebrate this day with you.</p>
                  {divider}
                </div>

                {rsvpDone ? (
                  <div className="text-center py-14 rounded-2xl" style={{ background: cardBg, border: `1px solid ${goldDim}` }}>
                    <CheckCircle2 size={56} color={gold} className="mx-auto mb-4" />
                    <h3 style={{ ...sectionTitle, fontSize: 26 }}>Thank You!</h3>
                    <p className="italic mt-2" style={{ color: cream }}>We look forward to celebrating with you.</p>
                  </div>
                ) : (
                  <div className="rounded-2xl p-8" style={{ background: cardBg, border: `1px solid ${goldDim}` }}>
                    {/* Accept / Decline */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {['accept', 'decline'].map(s => (
                        <button key={s} onClick={() => setRsvpStatus(s)}
                          className="py-3 rounded-lg text-xs transition-all"
                          style={{
                            fontFamily: "'Cinzel', serif", letterSpacing: '0.15em',
                            background: rsvpStatus === s ? `linear-gradient(135deg, ${gold}, #b8860b)` : 'rgba(0,0,0,0.3)',
                            color: rsvpStatus === s ? bg : gold,
                            border: `1px solid ${goldDim}`,
                          }}>
                          {s === 'accept' ? 'Joyfully Accept' : 'Regretfully Decline'}
                        </button>
                      ))}
                    </div>
                    <div className="mb-4">
                      <p style={{ ...subLabel, marginBottom: 8 }}>Your Name</p>
                      <input value={rsvpName} onChange={e => setRsvpName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-lg outline-none"
                        style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${goldDim}`, color: cream, fontFamily: "'EB Garamond', serif", fontSize: 16 }} />
                    </div>
                    <div className="mb-6">
                      <p style={{ ...subLabel, marginBottom: 8 }}>Message</p>
                      <textarea value={rsvpMsg} onChange={e => setRsvpMsg(e.target.value)}
                        placeholder="Blessings for the couple"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                        style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${goldDim}`, color: cream, fontFamily: "'EB Garamond', serif", fontSize: 16 }} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={sendRsvpToBride}
                        className="py-3 rounded-lg text-xs flex items-center justify-center gap-2"
                        style={{ background: `linear-gradient(135deg, #b8860b, #8b6914)`, color: gold, fontFamily: "'Cinzel', serif", letterSpacing: '0.2em' }}>
                        <Send size={14} /> SEND RSVP
                      </button>
                      <button
  onClick={sendRsvpToBride}
  className="py-3 rounded-lg text-xs flex items-center justify-center gap-2"
  style={{
    background: '#25D366',
    color: '#fff',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.15em'
  }}
>
  <MessageCircle size={14} /> SHARE ON WHATSAPP
</button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* ═══════════════ FOOTER ═══════════════ */}
            <footer className="py-12 text-center px-4" style={{ background: 'rgba(0,0,0,0.5)', borderTop: `1px solid ${goldDim}` }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 36, color: cream }}>Sirisha <span style={{ color: gold }}>&amp;</span> Manoj Reddy</p>
              <p className="mt-2" style={{ color: cream, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: '0.3em' }}>
                28 AUGUST 2026 · ZUVVALERU VILLAGE, MARKAPUR DISTRICT
              </p>
              <div style={{ height: 1, background: goldDim, maxWidth: 200, margin: '16px auto' }} />
              <p style={{ color: goldDim, fontSize: 12 }}>#ManojReddyWedsSirisha</p>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
