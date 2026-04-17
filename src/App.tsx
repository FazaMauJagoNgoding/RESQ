/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, User, Lock, Mail, Eye, EyeOff, Wifi, Signal, Battery } from 'lucide-react';

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

const Blob = ({ className }: { className?: string }) => (
  <div className={`absolute -z-10 w-[300px] h-[300px] bg-brand-yellow/20 rounded-full blur-[60px] ${className}`} />
);

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
      <Blob className="-top-20 -left-20" />
      <Blob className="bottom-40 -right-20" />

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
      <Blob className="-top-20 -left-20" />
      <Blob className="bottom-40 -right-20" />

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
      <Blob className="-top-20 -left-20" />
      <Blob className="bottom-40 -right-20" />

      <div className="px-6 pt-12 pb-4 h-20"></div>

      <div className="flex-1 flex flex-col px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-48 h-48 mb-6 relative">
             <div className="absolute inset-0 bg-brand-yellow/10 blur-3xl rounded-full translate-y-4"></div>
             <img 
              src="/asset/rafiki-signin.png" 
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
  const [view, setView] = useState<'onboarding' | 'login' | 'signup' | 'verification' | 'home'>('onboarding');
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
    return <VerificationPage email={userEmail} onVerify={() => setView('home')} />;
  }

  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-cream p-8 text-center max-w-md mx-auto relative overflow-hidden">
        <Blob className="-top-20 -left-20" />
        <Blob className="bottom-40 -right-20" />
        
        <div className="w-48 h-48 mb-6 flex items-center justify-center relative">
           <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full"></div>
           <img 
            src="https://cdn.pixabay.com/animation/2022/12/15/21/04/21-04-14-633_512.gif" 
            alt="Success"
            className="w-32 h-32 object-contain relative z-10"
            referrerPolicy="no-referrer"
           />
        </div>

        <h1 className="text-3xl font-black text-brand-navy mb-4">Verification Success!</h1>
        <p className="text-brand-navy/60 mb-10 leading-relaxed px-4">
          Welcome <span className="font-bold text-brand-navy">{userEmail}</span>. Your account is now fully verified and ready to use.
        </p>
        
        <button 
          onClick={() => setView('login')}
          className="w-full py-4 bg-brand-yellow rounded-[20px] text-brand-navy font-bold text-lg shadow-sm transform transition-all active:scale-95 hover:shadow-brand-yellow/30 hover:shadow-xl"
        >
          Go to Homepage
        </button>

        <div className="mt-auto pt-10 flex justify-center pb-2">
          <div className="w-32 h-1 bg-brand-navy rounded-full opacity-20"></div>
        </div>
      </div>
    );
  }

  return null;
}


