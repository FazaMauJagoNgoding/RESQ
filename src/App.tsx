/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, User, Lock, Mail, Eye, EyeOff, Wifi, Signal, Battery, 
  MapPin, ChevronDown, Bell, Search, SlidersHorizontal, Star, Heart,
  Milk, Beef, Croissant, LogOut
} from 'lucide-react';

const STEPS = [
  {
    title: "Save delicious surplus meals effortlessly",
    description: "Get tasty surplus dishes from nearby restaurants at lower prices while helping reduce food waste.",
    image: "/asset/chef.png",
  },
  {
    title: "Delicious Deals Greener Impact",
    description: "Get quality meals at lower prices and help the planet by choosing delicious surplus dishes that reduce waste and support a more sustainable lifestyle.",
    image: "/asset/earth.png",
  },
  {
    title: "Easy Orders Big Savings",
    description: "Enjoy quality surplus meals with a simple tap — fast, affordable, and good for the planet. Find nearby dishes and order in seconds.",
    image: "/asset/phone.png",
    buttonText: "Get Started"
  }
];

const CATEGORIES = [
  { name: 'Dairy', image: '/asset/Dairy.png' },
  { name: 'Meat', image: '/asset/Meat.png' },
  { name: 'Bread', image: '/asset/Bread.png' },
  { name: 'Vegetables', image: '/asset/vegatables.png' },
  { name: 'Fruits', image: '/asset/vegatables.png' },
  { name: 'Snacks', image: '/asset/Dairy.png' },
  { name: 'Drinks', image: '/asset/lonceng.png' },
];

const POPULAR_RESTAURANTS = [
  {
    name: "Starbucks Purwokerto",
    address: "Jl. Overste Isdiman No.11, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114",
    rating: 4.6,
    distance: "4 KM",
    image: "https://picsum.photos/seed/starbucks/400/300"
  },
  {
    name: "Holland Bakery",
    address: "Jl. Overste Isdiman No.11, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114",
    rating: 4.6,
    distance: "4 KM",
    image: "https://picsum.photos/seed/holland/400/300"
  },
  {
    name: "Sushi Hiro",
    address: "Jl. Overste Isdiman No.11, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114",
    rating: 4.6,
    distance: "4 KM",
    image: "https://picsum.photos/seed/sushihi/400/300"
  },
  {
    name: "Rita Super Mall",
    address: "Jl. Overste Isdiman No.11, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114",
    rating: 4.6,
    distance: "4 KM",
    image: "https://picsum.photos/seed/mall/400/300"
  }
];

const TOP_PICKS = [
  {
    name: "Sushi",
    brand: "Sushi Hiro",
    price: 3.5,
    rating: 4.5,
    tag: "Pick up today",
    image: "https://picsum.photos/seed/sushi/300/300"
  },
  {
    name: "Vegatables",
    brand: "Rita Super Mall",
    price: 1.5,
    rating: 4.5,
    tag: "Pick up tomorrow",
    image: "https://picsum.photos/seed/veg/300/300"
  },
  {
    name: "Hazelnut",
    brand: "Starbucks Pur",
    price: 1.2,
    rating: 4.5,
    tag: "Pick up today",
    image: "https://picsum.photos/seed/coffee/300/300"
  }
];

const BackgroundBlob = ({ className }: { className?: string }) => (
  <div className={`absolute -z-10 w-[300px] h-[300px] bg-brand-yellow/20 rounded-full blur-[60px] ${className}`} />
);

function HomePage({ onLogout }: { onLogout: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('Dairy');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#FDFDFD] max-w-md mx-auto relative pb-28 overflow-x-hidden"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="px-6 pt-12 flex justify-between items-start">
        <div className="">
          <div className="flex items-center gap-1 text-sm text-gray-400 font-bold mb-0.5">
            Current location <ChevronDown size={14} className="text-gray-400" />
          </div>
          <h2 className="text-brand-yellow font-black text-2xl tracking-tight leading-tight">Purwokerto Selatan</h2>
        </div>
        <div className="pt-1">
          <img src="/asset/lonceng.png" alt="Notifications" className="w-8 h-8 object-contain" />
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="px-6 mt-8">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <img src="/asset/search.png" alt="Search" className="w-5 h-5 object-contain" />
          </div>
          <input 
            type="text"
            placeholder="Search here..."
            className="w-full py-3.5 pl-12 pr-12 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-[20px] focus:outline-none text-sm placeholder:text-gray-300"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <img src="/asset/filter.png" alt="Filter" className="w-5 h-5 object-contain" />
          </button>
        </div>
      </motion.div>

      {/* Promo Banner */}
      <motion.div variants={itemVariants} className="px-6 mt-8">
        <div className="bg-brand-yellow rounded-[40px] px-10 py-6 relative overflow-hidden flex min-h-[180px] w-full max-w-[390.28px] mx-auto shadow-xl shadow-brand-yellow/10">
          <div className="absolute right-0 top-0 h-full w-[65%] z-0 pointer-events-none opacity-40">
             <img 
              src="/asset/half-elipse-special-offers.png" 
              alt="Decoration"
              className="w-full h-full object-cover"
             />
          </div>
          <div className="absolute -right-4 -top-2 h-[120%] w-[60%] z-10 pointer-events-none">
             <img 
              src="/asset/croissant-special-offers.png" 
              alt="Croissant"
               className="w-full h-full object-contain drop-shadow-2xl translate-x-4"
             />
          </div>

          <div className="flex-1 space-y-3 z-20 relative flex flex-col justify-center">
            <h3 className="text-white font-black text-3xl leading-[1.1] drop-shadow-sm">
              Exclusive Black<br />Friday Sale
            </h3>
            <p className="text-brand-navy font-black text-2xl tracking-tight">Buy 1 Get 1</p>
            <button className="bg-brand-navy text-brand-yellow font-black py-4 px-10 rounded-[25px] active:scale-95 transition-transform text-base shadow-lg shadow-brand-navy/20 w-fit mt-1">
              Get The Deal
            </button>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants} className="mt-10">
        <div className="px-6 mb-6">
          <h3 className="font-black text-brand-navy text-2xl tracking-tight">Categories</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-2">
          {CATEGORIES.map((cat, i) => {
            const isActive = activeCategory === cat.name;
            return (
              <motion.button 
                key={i} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-3 p-1.5 pr-8 rounded-full flex-shrink-0 transition-all duration-300 ${
                  isActive ? 'bg-brand-yellow' : 'bg-gray-200'
                }`}
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden p-2.5">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
                </div>
                <span className={`text-xl font-bold tracking-tight text-brand-navy`}>
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Around You */}
      <motion.div variants={itemVariants} className="mt-10 px-6">
        <h3 className="font-black text-brand-navy text-2xl tracking-tight mb-6">Around You</h3>
        <div className="bg-white rounded-[35px] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-4">
          <div className="w-36 h-28 overflow-hidden rounded-[25px] flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80" 
              alt="Starbucks"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 py-1 flex flex-col justify-between">
            <div>
              <h4 className="font-black text-brand-navy text-xl leading-tight mb-1">Starbucks Purwokerto</h4>
              <p className="text-[9px] text-brand-navy/60 font-medium leading-tight line-clamp-3">
                Jl. Overste Isdiman No.11, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 bg-brand-yellow px-2.5 py-1 rounded-md shadow-sm">
                <Star size={10} fill="currentColor" className="text-brand-navy" />
                <span className="text-[10px] font-black text-brand-navy">4,6</span>
              </div>
              <div className="flex items-center gap-1 bg-brand-yellow px-2.5 py-1 rounded-md shadow-sm">
                <MapPin size={10} className="text-brand-navy" />
                <span className="text-[10px] font-black text-brand-navy">4 KM</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top Picks */}
      <motion.div variants={itemVariants} className="mt-12">
        <div className="px-6 mb-6">
          <h3 className="font-black text-brand-navy text-2xl tracking-tight">Top Picks</h3>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 no-scrollbar pb-6">
          {[
            { name: 'Sushi', brand: 'Sushi Hiro', price: '3.5', rating: '4.5', tag: 'Pick up today', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80' },
            { name: 'Vegetables', brand: 'Rita Super Mall', price: '1.5', rating: '4.5', tag: 'Pick up tomorrow', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80' },
            { name: 'Hazeln...', brand: 'Starbucks Pur...', price: '1.2', rating: '4.5', tag: 'Pick up today', img: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&w=400&q=80' }
          ].map((pick, i) => (
            <motion.div 
              key={i} 
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 w-44 bg-white rounded-[35px] p-3 shadow-[0_10px_35px_rgba(0,0,0,0.04)] border border-gray-50 relative"
            >
              <div className="rounded-[25px] overflow-hidden aspect-square mb-3 relative">
                <img src={pick.img} alt={pick.name} className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/40 backdrop-blur-md rounded-full shadow-sm">
                  <Heart size={14} className="text-white" />
                </button>
              </div>
              <div className="px-1 space-y-0.5">
                <h4 className="font-black text-brand-navy text-base leading-tight">{pick.name}</h4>
                <p className="text-[10px] text-gray-300 font-bold mb-1">{pick.brand}</p>
                <span className="text-brand-yellow font-black text-xl leading-none">${pick.price}</span>
                <div className="flex gap-1.5 pt-2">
                  <div className="flex items-center gap-0.5 bg-brand-navy text-white px-2 py-1 rounded-md text-[9px] font-black">
                    <Star size={8} fill="currentColor" className="text-brand-yellow" />
                    {pick.rating}
                  </div>
                  <div className="bg-brand-navy text-white px-2 py-1 rounded-md text-[9px] font-black">
                    {pick.tag}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Popular Restaurants */}
      <motion.div variants={itemVariants} className="mt-8 px-6 pb-12">
        <h3 className="font-black text-brand-navy text-2xl tracking-tight mb-6">Popular Restaurants</h3>
        <div className="space-y-6">
          {[
            { name: 'Starbucks Purwokerto', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80' },
            { name: 'Holland Bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80' },
            { name: 'Sushi Hiro', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80' },
            { name: 'Rita Super Mall', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80' }
          ].map((res, i) => (
            <div key={i} className="bg-white rounded-[35px] p-3 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-4">
              <div className="w-32 h-24 overflow-hidden rounded-[25px] flex-shrink-0">
                <img src={res.img} alt={res.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-brand-navy text-xl leading-tight mb-1">{res.name}</h4>
                  <p className="text-[9px] text-brand-navy/60 font-medium leading-tight line-clamp-2">
                    Jl. Overste Isdiman No.11, Jatiwinangun, Purwokerto Lor, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53114
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 bg-brand-yellow px-2.5 py-1 rounded-md shadow-sm">
                    <Star size={10} fill="currentColor" className="text-brand-navy" />
                    <span className="text-[10px] font-black text-brand-navy">4,6</span>
                  </div>
                  <div className="flex items-center gap-1 bg-brand-yellow px-2.5 py-1 rounded-md shadow-sm">
                    <MapPin size={10} className="text-brand-navy" />
                    <span className="text-[10px] font-black text-brand-navy">4 KM</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Footer / Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-12 py-8 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <motion.button whileTap={{ scale: 0.9 }}>
          <img src="/asset/home-navbar.png" alt="Home" className="w-9 h-9 object-contain" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="opacity-30">
          <img src="/asset/history-navbar.png" alt="History" className="w-9 h-9 object-contain" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="opacity-30">
          <img src="/asset/love-navbar.png" alt="Favorites" className="w-9 h-9 object-contain" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={onLogout} className="opacity-30">
          <img src="/asset/user-navbar.png" alt="Profile" className="w-9 h-9 object-contain" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function VerificationPage({ email, onVerify }: { email: string, onVerify: () => void }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: code.join('') })
      });
      const data = await response.json();
      if (data.success) {
        onVerify();
      } else {
        setError(data.error || 'Invalid code');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(60);
    setError('');
    try {
      const resp = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error || 'Failed to resend email');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-brand-cream max-w-md mx-auto relative overflow-hidden"
    >
      <BackgroundBlob className="-top-20 -left-20" />
      <BackgroundBlob className="bottom-40 -right-20" />

      {/* Status Bar Mockup */}
      <div className="flex justify-between items-center px-8 pt-4 pb-2">
        <span className="text-sm font-bold">9:41</span>
        <div className="flex items-center gap-1.5 font-bold">
          <Signal size={14} strokeWidth={3} />
          <Wifi size={14} strokeWidth={3} />
          <Battery size={18} className="rotate-0 text-brand-navy" />
        </div>
      </div>

      <div className="px-8 mt-16 space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-black text-brand-navy">Enter the verification code</h1>
          <p className="text-brand-navy/80 text-lg leading-snug">
            A verification code has been sent to <span className="font-bold text-brand-navy">{email}</span>
          </p>
        </div>

        <div className="flex gap-4 pt-6">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-16 h-20 text-center text-2xl font-bold bg-white/70 border rounded-[15px] focus:outline-none transition-all shadow-sm ${
                error ? 'border-red-500' : 'border-brand-navy/10 focus:border-brand-yellow focus:bg-white'
              }`}
              maxLength={1}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-xs font-bold px-1 whitespace-pre-wrap">{error}</p>}

        <div className="pt-2">
          <button 
            disabled={timer > 0}
            onClick={handleResend}
            className={`font-bold transition-all px-2 py-1 rounded-md ${
              timer > 0 
                ? 'text-brand-navy/60 cursor-not-allowed' 
                : 'text-brand-navy bg-brand-yellow/30 hover:bg-brand-yellow'
            }`}
          >
            {timer > 0 ? `Re-send code (${timer}s)` : 'Re-send code'}
          </button>
        </div>

        <div className="pt-4">
          <button 
            disabled={!code.every(d => d !== '') || loading}
            onClick={handleVerify}
            className={`w-full py-4 rounded-[20px] font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2 ${
              code.every(d => d !== '') 
                ? 'bg-brand-yellow text-brand-navy shadow-brand-yellow/30' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? <div className="w-5 h-5 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin"></div> : "Proceed"}
          </button>
        </div>

        <div className="pt-4 max-w-[280px]">
          <p className="text-xs text-brand-navy/60 leading-relaxed">
            By Proceeding, you are indicating that you have reed and agree our{' '}
            <span className="text-brand-yellow font-bold cursor-pointer">privacy & policy</span>
          </p>
        </div>
      </div>

      <div className="mt-auto flex justify-center pb-2">
        <div className="w-32 h-1 bg-brand-navy rounded-full"></div>
      </div>
    </motion.div>
  );
}

function Onboarding({ onComplete, onSkip }: { onComplete: () => void, onSkip: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const step = STEPS[currentStep];

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream max-w-md mx-auto relative overflow-hidden">
      <div className="px-6 pt-12 pb-4 h-20"></div>

      <div className="flex justify-end px-6 h-8">
        {currentStep < STEPS.length - 1 && (
          <button 
            onClick={onSkip}
            className="text-brand-navy font-bold text-lg hover:opacity-70 transition-opacity"
          >
            Skip
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full aspect-square flex items-center justify-center mb-12">
              <div className="relative w-full h-full max-w-[320px]">
                 <img 
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${currentStep}/600/600`;
                    }}
                 />
              </div>
            </div>

            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold leading-tight px-4 text-brand-navy">
                {step.title}
              </h1>
              <p className="text-brand-navy/60 text-base leading-relaxed px-6">
                {step.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 pb-12">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="w-full py-4 bg-brand-yellow rounded-[20px] text-brand-navy font-bold text-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2"
        >
          {step.buttonText || "Next"}
          {!step.buttonText && <ChevronRight size={20} />}
        </motion.button>
        
        <div className="flex justify-center gap-2 mt-8">
          {STEPS.map((_, i) => (
            <div 
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? 'w-8 bg-brand-yellow' : 'w-2 bg-brand-navy/20'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-brand-navy rounded-full"></div>
      </div>
    </div>
  );
}

function LoginPage({ onSignUp, onLogin }: { onSignUp: () => void, onLogin: (email: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      onLogin(email);
    } catch (err) {
      console.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-brand-cream max-w-md mx-auto relative overflow-hidden"
    >
      <BackgroundBlob className="-top-20 -left-20" />
      <BackgroundBlob className="bottom-40 -right-20" />

      <div className="px-6 pt-12 pb-4 h-20"></div>

      <div className="flex-1 flex flex-col px-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-48 h-48 mb-6 relative">
             <div className="absolute inset-0 bg-brand-yellow/10 blur-3xl rounded-full translate-y-4"></div>
             <img 
              src="/asset/burger-signin.png" 
              alt="Sign In Illustration"
              className="w-full h-full object-contain relative z-10"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/burger/400/400";
              }}
            />
          </div>
          <h2 className="text-3xl font-black text-brand-navy mb-2">Sign in</h2>
          <p className="text-brand-navy/60 text-sm">Enter Valid password & username</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40" size={20} />
            <input 
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-white/70 border border-brand-navy/10 rounded-[15px] focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40" size={20} />
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full py-4 pl-12 pr-12 bg-white/70 border border-brand-navy/10 rounded-[15px] focus:outline-none focus:border-brand-yellow transition-colors"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 hover:text-brand-navy"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-end">
            <button className="text-xs font-semibold text-brand-navy hover:text-brand-yellow transition-colors">
              Forget Password
            </button>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!email || loading}
          className="w-full mt-8 py-4 bg-brand-yellow rounded-[20px] text-brand-navy font-bold text-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <div className="w-5 h-5 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin"></div> : "Login"}
        </button>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[1px] bg-brand-navy/10"></div>
          <span className="text-xs text-brand-navy/40 font-medium">Or Continue With</span>
          <div className="flex-1 h-[1px] bg-brand-navy/10"></div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-navy rounded-[10px] text-white text-xs font-semibold transition-transform active:scale-95">
             <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 rounded-full bg-white p-[2px]" />
             Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-navy rounded-[10px] text-white text-xs font-semibold transition-transform active:scale-95">
             <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[10px] font-bold">W</div>
             WhatsApp
          </button>
        </div>

        <div className="mt-auto pb-12 text-center">
          <p className="text-brand-navy/60 text-sm">
            Dont have an account? {' '}
            <button onClick={onSignUp} className="text-brand-yellow font-bold">Sign up</button>
          </p>
        </div>
      </div>

      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-brand-navy rounded-full"></div>
      </div>
    </motion.div>
  );
}

function SignUpPage({ onSignIn, onSignUpComplete }: { onSignIn: () => void, onSignUpComplete: (email: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      onSignUpComplete(email);
    } catch (err) {
      console.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-brand-cream max-w-md mx-auto relative overflow-hidden"
    >
      <BackgroundBlob className="-top-20 -left-20" />
      <BackgroundBlob className="bottom-40 -right-20" />

      <div className="px-6 pt-12 pb-4 h-20"></div>

      <div className="flex-1 flex flex-col px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-48 h-48 mb-6 relative">
             <div className="absolute inset-0 bg-brand-yellow/10 blur-3xl rounded-full translate-y-4"></div>
             <img 
              src="/asset/rafiki-signup.png" 
              alt="Sign Up Illustration"
              className="w-full h-full object-contain relative z-10"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/seed/folder/400/400";
              }}
            />
          </div>
          <h2 className="text-3xl font-black text-brand-navy mb-2">Sign Up</h2>
          <p className="text-brand-navy/60 text-sm text-center px-4">Use proper information to continue</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40" size={20} />
            <input 
              type="text"
              placeholder="Name"
              className="w-full py-4 pl-12 pr-4 bg-white/70 border border-brand-navy/10 rounded-[15px] focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40" size={20} />
            <input 
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-white/70 border border-brand-navy/10 rounded-[15px] focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/40" size={20} />
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full py-4 pl-12 pr-12 bg-white/70 border border-brand-navy/10 rounded-[15px] focus:outline-none focus:border-brand-yellow transition-colors"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-navy/40 hover:text-brand-navy"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="px-1 text-center">
            <p className="text-[10px] text-brand-navy/40 leading-relaxed">
              By signing up, You are agree to our {' '}
              <span className="text-brand-yellow font-semibold">Terms & Conditions and Privacy Policy</span>
            </p>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!email || loading}
          className="w-full mt-8 py-4 bg-brand-yellow rounded-[20px] text-brand-navy font-bold text-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <div className="w-5 h-5 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin"></div> : "Create account"}
        </button>

        <div className="mt-auto pb-12 text-center">
          <p className="text-brand-navy/60 text-sm">
            Already have an account? {' '}
            <button onClick={onSignIn} className="text-brand-yellow font-bold">Sign in</button>
          </p>
        </div>
      </div>

      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-brand-navy rounded-full"></div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [view, setView] = useState<'onboarding' | 'login' | 'signup' | 'verification' | 'success' | 'home'>('onboarding');
  const [userEmail, setUserEmail] = useState('');

  const handleAuthStep = (email: string) => {
    setUserEmail(email);
    setView('verification');
  };

  if (view === 'onboarding') {
    return <Onboarding onComplete={() => setView('login')} onSkip={() => setView('login')} />;
  }

  if (view === 'login') {
    return <LoginPage onSignUp={() => setView('signup')} onLogin={handleAuthStep} />;
  }

  if (view === 'signup') {
    return <SignUpPage onSignIn={() => setView('login')} onSignUpComplete={handleAuthStep} />;
  }

  if (view === 'verification') {
    return <VerificationPage email={userEmail} onVerify={() => setView('success')} />;
  }

  if (view === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-cream p-8 text-center max-w-md mx-auto relative overflow-hidden">
        <BackgroundBlob className="-top-20 -left-20" />
        <BackgroundBlob className="bottom-40 -right-20" />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-36 h-36 mb-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] flex items-center justify-center relative group"
        >
           <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 relative z-10">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="4" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
           </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-black text-brand-navy mb-4">Verification Success!</h1>
          <p className="text-brand-navy/60 mb-10 leading-relaxed px-4 text-base">
            Welcome back <span className="font-bold text-brand-navy underline decoration-brand-yellow/30">{userEmail}</span>. Your account is verified and ready to help save the planet.
          </p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView('home')}
          className="w-full py-5 bg-brand-yellow rounded-[25px] text-brand-navy font-black text-lg shadow-xl shadow-brand-yellow/20 transition-all hover:shadow-brand-yellow/40 active:translate-y-1"
        >
          Go to Homepage
        </motion.button>

        <div className="mt-auto pt-10 flex justify-center pb-2">
          <div className="w-32 h-1.5 bg-brand-navy rounded-full opacity-10"></div>
        </div>
      </div>
    );
  }

  if (view === 'home') {
    return <HomePage onLogout={() => setView('login')} />;
  }

  return null;
}


