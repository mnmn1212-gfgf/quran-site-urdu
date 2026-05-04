import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#D8B36A";
const CTA_DARK = "#001E0E";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,#001E0E_0%,#00401A_34%,#071631_68%,#5C4219_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,#001E0E_0%,#00401A_34%,#071631_68%,#5C4219_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.2, 0.45, 0.2],
  scale: [1, 1.03, 1],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass = `border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.24)]`;
const softCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.24)]`;
const gradientOuterCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.24)]`;

const navItems = [
  { label: "ہمارے بارے میں", href: "#about" },
  { label: "خصوصیات", href: "#features" },
  { label: "ہمارا کام", href: "#portfolio" },
  { label: "شراکت دار", href: "#partners" },
  { label: "ہم سے رابطہ کریں", href: "#contact" },
];

const stats = [
  { value: "+100", label: "ہدف عالمی زبانیں" },
  { value: "24/7", label: "مسلسل عالمی رسائی" },
  { value: "114", label: "مکمل سورتیں" },
  { value: "اعلیٰ", label: "اعلیٰ معیار کی آڈیو اور ویڈیو" },
];

const heroCards = [
  { value: "114", label: "سورتیں" },
  { value: "30", label: "قرآن کے پارے" },
  { value: "نفیس", label: "آڈیو ویژول مواد" },
];

const heroBadges = [
  { icon: Sparkles, title: "قرآن کا نور اور حسن" },
  { icon: Globe, title: "دنیا کے لیے پیغام" },
];

const identityCards = [
  {
    icon: Users,
    title: "ہم کون ہیں",
    text: "سنا ایک وقف پر مبنی اقدام ہے، جس کا مقصد قرآن کریم کے معانی کو دنیا تک آڈیو اور ویژول چینلز کے ذریعے پہنچانا ہے۔ یہ چینلز خوبصورت تلاوت کو درست ترجمے کے ساتھ یکجا کرتے ہیں، تاکہ ایک مکمل روحانی تجربہ فراہم ہو جو اللہ کے کلام کو دنیا کی کئی زبانوں میں دلوں کے قریب کر دے۔",
  },
  {
    icon: Eye,
    title: "وژن",
    text: "ہر انسان تک قرآن کریم کے معانی اس کی اپنی زبان میں پہنچانے کے لیے ایک نمایاں عالمی پلیٹ فارم بننا، ایسے جدید انداز کے ذریعے جو حسن، معیار اور جدید ٹیکنالوجی کو یکجا کرتا ہے۔",
  },
  {
    icon: Target,
    title: "مشن",
    text: "ترجمہ شدہ قرآنی آڈیو اور ویژول مواد فراہم کرنا، جو قرآن کریم کے معانی کو واضح اور آسان بنائے، ہدایت کے فروغ میں کردار ادا کرے، اور دنیا کو اللہ کے کلام سے مؤثر اور دلکش انداز میں متعارف کرائے۔",
  },
];

const features = [
  {
    icon: Languages,
    title: "کثیر لسانی تراجم",
    desc: "قرآن کریم کے معانی لوگوں تک ان کی اپنی زبانوں میں واضح اور درست انداز سے پہنچانا، اس طرح کہ اصل پیغام محفوظ رہے۔",
  },
  {
    icon: Headphones,
    title: "مکمل آڈیو ویژول تجربہ",
    desc: "ایسے چینلز جو متحرک تلاوت کو ترجمہ شدہ متن کے ساتھ ایک پرسکون تجربے میں یکجا کرتے ہیں، جو قرآن کی عظمت کے شایانِ شان ہو۔",
  },
  {
    icon: Globe,
    title: "مسلسل عالمی رسائی",
    desc: "ایک ڈیجیٹل اور سیٹلائٹ موجودگی جو براعظموں اور پلیٹ فارمز پر چوبیس گھنٹے رسائی فراہم کرتی ہے۔",
  },
  {
    icon: HeartHandshake,
    title: "اللہ کے لیے وقف",
    desc: "ایک عالمی دعوتی مشن، جس میں ہر مدد کرنے والا، حصہ ڈالنے والا یا فائدہ اٹھانے والا اجر میں شریک ہوتا ہے۔",
  },
];

const channels = [
  {
    icon: Radio,
    title: "سیٹلائٹ اور ریڈیو چینلز",
    desc: "قرآن کریم کے معانی کو آڈیو اور ویژول چینلز کے ذریعے نشر کرنا، تاکہ مختلف ممالک کے لوگ انہیں اپنی زبانوں میں سن اور سمجھ سکیں۔",
  },
  {
    icon: MonitorPlay,
    title: "سوشل میڈیا پلیٹ فارمز اور ویب سائٹس",
    desc: "ایک فعال ڈیجیٹل موجودگی جو قرآنی مواد تک رسائی اور اسے وسیع پیمانے پر شیئر کرنا آسان بناتی ہے۔",
  },
  {
    icon: Layers3,
    title: "ایپلی کیشنز اور متنوع ڈیجیٹل میڈیا",
    desc: "ایک جدید اور لچکدار تجربہ جو صارفین کو مختلف ڈیوائسز اور پلیٹ فارمز کے مطابق قرآنی مواد کی پیروی کی سہولت دیتا ہے۔",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "شرعی ادارے اور اسلامی مؤسسات",
    desc: "جنہوں نے قرآن کے معانی کے مستند تراجم فراہم کیے، تاکہ درستگی اور مضبوط علمی بنیاد یقینی بن سکے۔",
  },
  {
    icon: Mic2,
    title: "خوبصورت آوازوں والے مؤثر قاری حضرات",
    desc: "جنہوں نے عاجزانہ اور دل کو چھو لینے والی تلاوتوں سے اس منصوبے کو مالا مال کیا، جو دلوں تک محبوب اور پُرکشش انداز میں پہنچتی ہیں۔",
  },
  {
    icon: Headphones,
    title: "آڈیو پروڈکشن اور تکنیکی کمپنیاں",
    desc: "جنہوں نے اعلیٰ معیار کی ریکارڈنگز اور پیشہ ورانہ آڈیو ویژول پروسیسنگ فراہم کی۔",
  },
  {
    icon: Users,
    title: "پروڈیوسرز اور رضاکار",
    desc: "جنہوں نے مواد کی تیاری، ترقی اور اشاعت میں حصہ ڈالا تاکہ یہ دنیا بھر میں زیادہ سے زیادہ لوگوں تک پہنچ سکے۔",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "عالمی رسائی",
    desc: "قرآن کریم کا پیغام مختلف ممالک کے گھروں تک متعدد زبانوں کے ذریعے پہنچا، جو لوگوں سے ان کی مادری زبان میں مخاطب ہوتی ہیں۔",
  },
  {
    icon: Languages,
    title: "قابل اعتماد تراجم",
    desc: "قرآنی معانی کے درست تراجم معتبر علمی اداروں کی نگرانی میں فراہم کیے گئے تاکہ صحت و درستی یقینی رہے۔",
  },
  {
    icon: Headphones,
    title: "مکمل تجربہ",
    desc: "ایسا مواد جو عاجزانہ تلاوت کو بصری ترجمے کے ساتھ ملاتا ہے، تاکہ ایک مؤثر اور آسان فہم روحانی تجربہ پیدا ہو۔",
  },
  {
    icon: Send,
    title: "جاری رہنے والا پیغام",
    desc: "یہ منصوبہ ہدایت پھیلانے اور دنیا کو اللہ کے کلام سے جدید انداز میں متعارف کرانے میں کردار ادا کرتا ہے، جو مختلف سامعین تک پہنچتا ہے۔",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon
        className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
        style={{ color: ACCENT }}
      />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT + mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [
    HALF_BARS,
    MAX_BAR_HEIGHT,
    MIN_BAR_HEIGHT,
    idleBars,
    isPlaying,
    isMobile,
  ]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-[rgba(0,30,14,0.52)] p-3 sm:p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-[linear-gradient(135deg,#001E0E_0%,#00401A_34%,#071631_68%,#5C4219_100%)] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "توقف" : "چلائیں"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="پیچھے"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="دوبارہ چلائیں"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="آگے"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="آواز"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(135deg,#001E0E_0%,#00401A_34%,#071631_68%,#5C4219_100%)]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-l from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D8B36A]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(0,30,14,0.52)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-l from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D8B36A]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/10 bg-[rgba(0,30,14,0.52)] px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-l from-white/5 to-white/10 px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D8B36A]/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[rgba(0,30,14,0.52)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({ video, index, isMobile }) {
  const videoRef = useRef(null);
  const videoIdRef = useRef(`portfolio-video-${index}`);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      setIsPlaying(true);
      window.dispatchEvent(
        new CustomEvent("sana-video-play", {
          detail: { id: videoIdRef.current },
        })
      );
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onOtherVideoPlay = (event) => {
      if (event.detail?.id !== videoIdRef.current && !element.paused) {
        element.pause();
      }
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);
    window.addEventListener("sana-video-play", onOtherVideoPlay);

    return () => {
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
      window.removeEventListener("sana-video-play", onOtherVideoPlay);
    };
  }, []);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    playVideo();
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="metadata"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition hover:bg-black/10"
            aria-label="ویڈیو چلائیں"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_28px_rgba(216,179,106,0.14)] sm:h-18 sm:w-18">
              <Play className="mr-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "پیش منظر تیار ہے" : "پیش منظر لوڈ ہو رہا ہے"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-[rgba(0,30,14,0.52)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="آواز بند یا بحال کریں"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="دوبارہ چلائیں"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "توقف" : "چلائیں"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(135deg,#001E0E_0%,#00401A_34%,#071631_68%,#5C4219_100%)]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="rtl"
        lang="ur"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,179,106,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(0,64,26,0.24),transparent_26%),radial-gradient(circle_at_20%_80%,rgba(7,22,49,0.36),transparent_30%),linear-gradient(180deg,#000905_0%,#001E0E_36%,#071631_74%,#0B0F1F_100%)]" />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D8B36A]/12 blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D8B36A]/20 bg-white/10 shadow-[0_0_16px_rgba(216,179,106,0.10)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="سنا قرآنی چینلز کا لوگو"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  سنا قرآنی چینلز
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[#D8B36A]/30 hover:bg-white/10 hover:text-[#F7E6B1]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div
                className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}
              >
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8B36A]/20 bg-white/10 px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>سنا... تمام جہانوں کے لیے پیغام</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="overflow-visible pb-5 pt-2 text-3xl font-black leading-[1.6] sm:pb-6 sm:pt-3 sm:text-5xl sm:leading-[1.55] lg:text-7xl lg:leading-[1.5]"
              >
                <span className="inline-block overflow-visible bg-[linear-gradient(135deg,#F7E6B1_0%,#D8B36A_42%,#FFFFFF_72%,#B8892C_100%)] bg-clip-text pb-2 text-transparent drop-shadow-[0_8px_22px_rgba(216,179,106,0.24)]">
                  سنا قرآنی چینلز
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                قرآن کے معانی کے تراجم کے لیے آڈیو اور ویژول چینلز،
                تمام عالمی زبانوں میں — اللہ کے لیے وقف۔
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(216,179,106,0.24)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  پلیٹ فارم دریافت کریں
                </a>

                <a
                  href="https://www.youtube.com/@SANA-Eng-s2u"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[#D8B36A]/20 hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  ہمارا چینل دیکھیں
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:p-4"
                  >
                    <div
                      className="text-xl font-black sm:text-2xl"
                      style={{ color: ACCENT }}
                    >
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={
                  isMobile
                    ? {}
                    : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${softCard}`}
              >
                <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">
                        موجودہ زبان
                      </p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        اردو میں قرآن
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-[#D8B36A]/25 bg-[#D8B36A]/12 px-4 py-2 text-xs text-[#F7E6B1] sm:text-sm">
                      براہ راست نشریات
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[rgba(0,24,13,0.72)] p-4 sm:mt-8 sm:p-6">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[#D8B36A] sm:mt-0" />
                      <span>
                        تلاوت سنیں اور قرآن کے معانی کا بصری اظہار دیکھیں
                      </span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{
                              width: [`${w - 14}%`, `${w}%`, `${w - 8}%`],
                            }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-[linear-gradient(135deg,#001E0E_0%,#00401A_34%,#071631_68%,#5C4219_100%)]"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="flex min-h-[108px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-2 py-3 sm:min-h-[120px] sm:p-4"
                        >
                          <div
                            className="text-[13px] font-bold leading-tight sm:text-lg"
                            style={{ color: ACCENT }}
                          >
                            {item.value}
                          </div>
                          <div className="mt-2 text-[10px] leading-4 text-white/65 sm:text-xs sm:leading-5">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge
                icon={BookOpen}
                text="عالمی قرآنی شناخت"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge
                icon={Building2}
                text="عملدرآمد اور نگرانی"
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-white/[0.025]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(0,30,14,0.44)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        قابل اعتماد عملی شراکت
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        منصوبہ{" "}
                        <span className="font-bold text-white">
                          سنا قرآنی چینلز
                        </span>{" "}
                        کو{" "}
                        <span
                          className="font-bold"
                          style={{ color: ACCENT }}
                        >
                          سعودی اردنی سیٹلائٹ براڈکاسٹنگ کمپنی (JASCO)
                        </span>{" "}
                        کی جانب سے عمان، اردن میں نافذ کیا جا رہا ہے، جہاں میڈیا
                        پروڈکشن اور براڈکاسٹنگ کے شعبے میں نمایاں مہارت موجود ہے۔
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-[rgba(0,24,13,0.70)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <div className="text-sm text-white/60">
                        سرکاری ویب سائٹ
                      </div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">
                        جاسکو میڈیا سٹی
                      </div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-[#D8B36A]/25 bg-[#D8B36A]/10 px-5 py-3 text-sm text-[#F7E6B1] transition hover:bg-[#D8B36A]/18 sm:text-base"
                      >
                        جاسکو ویب سائٹ دیکھیں
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "پلیٹ فارم کی خصوصیات")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                سنا... تمام جہانوں کے لیے پیغام
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                ایک قرآنی پلیٹ فارم جو جدید ترین طریقوں کے ذریعے قرآن کریم کے معانی
                دنیا تک پہنچاتا ہے، ایسے انداز میں جو مستند علمی بنیاد
                اور جدید ٹیکنالوجی کو یکجا کرتا ہے۔
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "اشاعت اور رسائی کے چینلز")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                موجودگی کے متعدد چینلز
              </h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "ہمارا کام")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                ہمارے کام کے نمونے
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                قرآن کی خوبصورت تلاوتیں اور قرآنی معانی کے تراجم
                مختلف عالمی زبانوں میں — سنا... تمام جہانوں کے لیے پیغام۔
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "منصوبے کا اثر")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                دنیا بھر میں منصوبے کا اثر اور رسائی
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                ایک عالمی قرآنی پیغام جو قابل اعتماد تراجم فراہم کرتا ہے،
                ایک روح پرور تجربہ پیش کرتا ہے، اور قرآن کریم کے معانی کو
                دنیا بھر کے گھروں تک پہنچانے میں مدد دیتا ہے۔
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "کامیابی کے شراکت دار")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                تعاون سے بننے والی کامیابی
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                یہ منصوبہ ممتاز اداروں کے تعاون سے کامیاب ہوا،
                جن میں علمی، میڈیا، پروڈکشن اور رضاکارانہ شراکت دار شامل ہیں۔
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles
                    className="h-5 w-5 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <span>ہم سے رابطہ کریں</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  سنا ایک عالمی دعوتی پیغام ہے، اور ہمیں آپ کے سوالات، تجاویز
                  اور شراکت کے مواقع واضح اور براہ راست انداز میں وصول کر کے خوشی ہوتی ہے۔
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-white/10 bg-[rgba(0,24,13,0.70)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">
                      رابطے میں رہیں
                    </div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm sm:text-base">
                        ہماری ٹیم آپ کی مدد کر کے اور جلد از جلد جواب دے کر خوش ہوگی۔
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[#D8B36A]/25 bg-[#D8B36A]/10 px-4 py-3 text-center text-sm font-semibold text-[#F7E6B1] transition hover:bg-[#D8B36A]/18 sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        ای میل بھیجیں
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div
              className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${glass}`}
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-white/10 p-4 text-center sm:p-6 ${INNER_GRADIENT}`}
                >
                  <div className="flex h-full min-h-[420px] flex-col items-center justify-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                      <img
                        src={sanaLogo}
                        alt="سنا لوگو"
                        className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="mt-4">
                      <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                        سنا قرآنی چینلز
                      </span>
                    </div>

                    <div
                      className="mt-4 text-2xl font-black sm:text-3xl"
                      style={{ color: ACCENT }}
                    >
                      سنا... تمام جہانوں کے لیے پیغام
                    </div>

                    <p className="mx-auto mt-4 max-w-xl rounded-[1.4rem] border border-[#D8B36A]/20 bg-white/5 px-4 py-4 text-sm leading-7 text-white/90 sm:px-5 sm:text-base sm:leading-8">
                      قرآن کے معانی کے تراجم کے لیے آڈیو اور ویژول چینلز
                      تمام عالمی زبانوں میں، ایک وقف منصوبے کے طور پر جو
                      پیشکش کے حسن، معنی کی درستگی اور پیغام کے اخلاص کو یکجا کرتا ہے۔
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-[1.6rem] border border-white/10 p-4 sm:p-5 text-center flex h-full flex-col items-center justify-center ${INNER_GRADIENT}`}
                >
                  <div className="mb-5 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#D8B36A]/20 bg-white/5 shadow-[0_0_24px_rgba(216,179,106,0.12)] backdrop-blur-md">
                      <MessageCircle
                        className="relative z-10 h-7 w-7 sm:h-8 sm:w-8"
                        style={{ color: ACCENT }}
                      />
                    </div>
                    <div className="text-lg font-bold sm:text-xl">
                      ہماری تفصیلات
                    </div>
                  </div>

                  <div className="w-full space-y-4 text-white/72 flex flex-col items-center">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex w-full items-center justify-center gap-3 break-all rounded-2xl border border-white/10 bg-[rgba(0,30,14,0.50)] px-4 py-3 text-sm text-center transition hover:bg-white/10 sm:text-base"
                    >
                      <Mail
                        className="h-5 w-5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      <span className="text-center">snachannel159@gmail.com</span>
                    </a>

                    <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[rgba(0,30,14,0.50)] px-4 py-3 text-sm text-center sm:text-base">
                      <MapPin
                        className="h-5 w-5 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      <span>عمان - اردن</span>
                    </div>
                  </div>

                  <div className="mt-5 w-full rounded-[1.4rem] border border-white/10 bg-[rgba(0,30,14,0.44)] p-4 text-center">
                    <a
                      href="https://www.facebook.com/share/1Aknq4ChQg/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10"
                    >
                      <Globe className="h-5 w-5" style={{ color: ACCENT }} />
                      فیس بک پر ہمیں فالو کریں
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      اپنا قرآنی سفر ابھی شروع کریں
                    </p>
                  </div>
                </div>

                <div
                  className={`rounded-[1.8rem] border border-white/10 p-4 backdrop-blur-md sm:p-5 text-center flex h-full flex-col items-center justify-center ${INNER_GRADIENT}`}
                >
                  <div className="mb-5 flex flex-col items-center justify-center gap-3 text-white">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.35rem] border border-[#D8B36A]/20 bg-white/5 shadow-[0_0_24px_rgba(216,179,106,0.12)] backdrop-blur-md">
                      <Link2
                        className="relative z-10 h-7 w-7 sm:h-8 sm:w-8"
                        style={{ color: ACCENT }}
                      />
                    </div>
                    <div className="text-lg font-bold sm:text-xl">
                      ایپ لنکس
                    </div>
                  </div>

                  <div className="w-full rounded-[1.4rem] border border-white/10 bg-[rgba(0,30,14,0.44)] p-4 text-center">
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      ایپ ڈاؤن لوڈ کریں اور سرکاری پلیٹ فارمز کے ذریعے
                      آسانی سے قرآنی مواد کی پیروی شروع کریں۔
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D8B36A]/10 text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            گوگل پلے
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D8B36A]/10 text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            ایپ اسٹور
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[rgba(0,24,13,0.60)] p-4 text-center">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>★</span> 4.9 ریٹنگ
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>🌍</span> 100+
                          ممالک
                        </span>
                      </div>

                      <a
                        href="https://www.youtube.com/@SANA-Eng-s2u"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D8B36A]/25 bg-[#D8B36A]/10 py-3 text-sm font-bold text-[#F7E6B1] transition hover:scale-[1.01] hover:bg-[#D8B36A]/18"
                      >
                        <Sparkles className="h-4 w-4" />
                        ابھی شروع کریں
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                تمام حقوق محفوظ ہیں © سنا قرآنی چینلز۔
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
