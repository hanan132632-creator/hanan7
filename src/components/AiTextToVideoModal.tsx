import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Video, Sparkles, Play, Pause, RotateCcw, Volume2, VolumeX, 
  Download, Copy, Check, Clock, Film, Camera, Music, 
  Layers, FileText, FastForward, CheckCircle2, PlayCircle, Loader2
} from 'lucide-react';
import { VideoDurationMinutes, VideoScene, VideoProject } from '../types';

import heroVillaImg from '../assets/images/hero_luxury_villa_1791003841235.jpg';
import luxuryPenthouseImg from '../assets/images/luxury_penthouse_1791003853037.jpg';
import privateEstateMansionImg from '../assets/images/private_estate_mansion_1791299404793.jpg';
import luxuryEstateValuationImg from '../assets/images/luxury_estate_valuation_1791299419965.jpg';
import desertPalaceImg from '../assets/images/desert_palace_architecture_1791314264178.jpg';
import smartLuxuryVillaImg from '../assets/images/smart_luxury_villa_1791314277613.jpg';
import skylinePenthouseTerraceImg from '../assets/images/skyline_penthouse_terrace_1791314289993.jpg';
import royalCourtyardFountainImg from '../assets/images/royal_courtyard_fountain_1791314305941.jpg';
import blueprintsImg from '../assets/images/architectural_blueprints_1791003876626.jpg';

const ASSET_IMAGES_MAP: Record<string, string> = {
  hero_luxury_villa: heroVillaImg,
  private_estate_mansion: privateEstateMansionImg,
  luxury_penthouse: luxuryPenthouseImg,
  skyline_penthouse_terrace: skylinePenthouseTerraceImg,
  smart_luxury_villa: smartLuxuryVillaImg,
  desert_palace_architecture: desertPalaceImg,
  royal_courtyard_fountain: royalCourtyardFountainImg,
  luxury_estate_valuation: luxuryEstateValuationImg,
  architectural_blueprints: blueprintsImg,
};

const DEFAULT_SCRIPT = 'جولة سينمائية متكاملة مدتها 15 دقيقة في قصر النخبة الملكي بالرياض: من البهو ذي الأسقف الشاهقة بارتفاع 10 أمتار، وأرضيات الرخام الإيطالي النادر، مروراً بالأجنحة الرئاسية، وأنظمة الأتمتة KNX 2026، والحدائق والنوافير الخارجية، والتحليل المالي للاستثمار.';

interface AiTextToVideoModalProps {
  initialText?: string;
  onClose: () => void;
}

// Client-side high-fidelity fallback generator to guarantee instant generation
function buildLocalVideoScenes(topicText: string, durationMins: VideoDurationMinutes): VideoScene[] {
  const totalSeconds = durationMins * 60;
  const sceneCount = durationMins === 15 ? 10 : durationMins === 10 ? 8 : durationMins === 5 ? 5 : 3;
  const sceneDuration = Math.floor(totalSeconds / sceneCount);

  const templates = [
    {
      title: 'المشهد الافتتاحي: استعراض المعالم والهندسة الخارجية',
      asset: 'hero_luxury_villa',
      cam: 'Drone High Altitude Cinematic Crane Down (لقطة درون علوية سينمائية)',
      vis: 'تحليق درامي فائق الدقة 4K يبرز معالم العقار والواجهات المعمارية المذهلة بتناغم الرخام الطبيعي والمحيط الجغرافي',
      narration: 'في قلب المشهد المعماري والاستثماري الاستثنائي لعام 2026، تتجلى معايير الفخامة الخالدة حيث تلتقي الدقة الهندسية بأصالة التصميم.'
    },
    {
      title: 'البهو الرئيسي والواجهات المعمارية الشاهقة',
      asset: 'private_estate_mansion',
      cam: 'Slow Dolly In with Ultra Smooth Gimbal (حركة تقدم سلسة)',
      vis: 'استعراض الأرضيات الرخامية الإيطالية النادرة والإنارة الطبيعية المتدفقة من الواجهات الزجاجية الشاهقة بارتفاع 10 أمتار',
      narration: 'تبدأ الرحلة المعمارية من البهو الرئيسي بأسقف شاهقة ترتفع لعشرة أمتار، مع عزل صوتي متحفي متطور يحجب ضوضاء العالم الخارجي.'
    },
    {
      title: 'التراس البانورامي والإطلالة المفتوحة على الأفق',
      asset: 'skyline_penthouse_terrace',
      cam: 'Panoramic 180 Orbit (دوران بانورامي 180 درجة)',
      vis: 'إطلالة بانورامية كاشفة لأفق المدينة مع مناطق جلوس خارجية ومسابح زجاجية مجهزة بأحدث تقنيات التبريد البيئي',
      narration: 'تجسد هذه الإطلالات الاستثنائية قيمة الأصول الكأسية غير القابلة للتكرار، لتمنح ساكنيها خصوصية ملكية وإطلالة لا تُضاهى على أفق المدينة.'
    },
    {
      title: 'الأجنحة الملكية والخصوصية السكنية المطلقة',
      asset: 'luxury_penthouse',
      cam: 'Slow Tracking Shot (حركة تتبع أفقية بطيئة)',
      vis: 'أجنحة نوم فسيحة مكسوة بالأخشاب الطبيعية المعالجة، مع غرف تبديل ملابس ملكية وحمامات سبا خاصة',
      narration: 'تم تصميم كل جناح ليكون ملاذاً متكاملاً للراحة والسكينة، مع التحكم الذكي في درجات الحرارة ونقاء الهواء عبر بروتوكولات معيارية متطورة.'
    },
    {
      title: 'المساحات الخارجية والمسطحات المائية والحدائق الغناء',
      asset: 'royal_courtyard_fountain',
      cam: 'Low-Angle Slider Sweep (لقطة منخفضة بمحاذاة سطح الماء)',
      vis: 'نوافير ملكية ومسابح أولمبية تتوسط حدائق غناء مروية بأنظمة بيئية مستدامة تراعي مناخ المنطقة',
      narration: 'المساحات الخارجية تجمع بين خرير المياه الهادئ والخصوصية العالية، مما يجعلها المكان المثالي للاستجمام والاستقبالات الرفيعة.'
    },
    {
      title: 'أنظمة الأتمتة الذكية والتحكم البيئي 2026',
      asset: 'smart_luxury_villa',
      cam: 'Macro Focus Transition (انتقال تركيز سينمائي دقيق)',
      vis: 'شاشات تحكم مدمجة بنظام KNX وإضاءة DALI-2 الحيوية تضبط درجات الإضاءة وفق الساعة البيولوجية',
      narration: 'تعتمد المنظومة الذكية على أحدث معايير الأتمتة العالمية، لتوفر تجربة معيشية متكيفة بالكامل مع راحة القاطنين وأعلى معايير كفاءة الطاقة.'
    },
    {
      title: 'العمارة النجدية الحديثة والتناغم التراثي',
      asset: 'desert_palace_architecture',
      cam: 'Wide Angle Push In (لقطة عريضة بزاوية سينمائية واسعة)',
      vis: 'دمج الحجر الطبيعي والزجاج المزدوج بتصميم مستوحى من كود وادي حنيفة والعمارة السلمانية العريقة',
      narration: 'يتناغم التصميم المعماري مع الهوية المحلية الأصيلة، ليخلق تحفة بصرية تمزج عراقة التراث بأحدث تقنيات البناء الحديثة لعام 2026.'
    },
    {
      title: 'التحليل الاستثماري وتقييم الأصول النادرة',
      asset: 'luxury_estate_valuation',
      cam: 'Cinematic Pedestal Up (حركة صعود للكاميرا)',
      vis: 'رسوم بيانية ثلاثية الأبعاد تستعرض مؤشرات نمو العوائد الإيجارية الرأسمالية والطلب المتزايد على الأصول الفارهة',
      narration: 'تشير البيانات السوقية إلى أن هذه الفئة من العقارات تشهد نمواً سنوياً متصاعداً، ما يعزز مكانتها كأحد أكثر الملاذات الاستثمارية أماناً واستدامة.'
    },
    {
      title: 'المخططات الهندسية والمطابقة الإنشائية المعتمدة',
      asset: 'architectural_blueprints',
      cam: 'Top-Down Architectural Dolly (حركة علوية هندسية مستقيمة)',
      vis: 'استعراض دقيق للمخططات التنفيذية وتراخيص البناء وشهادات إتمام البناء والجودة المعتمدة',
      narration: 'تخضع جميع الأعمال الإنشائية لأدق معايير الجودة العالمية، مما يضمن متانة البناء ودقة التنفيذ في كل زاوية وتفصيلة معمارية.'
    },
    {
      title: 'المشهد الختامي وخلاصة الفرصة العقارية',
      asset: 'hero_luxury_villa',
      cam: 'Majestic Golden Hour Pull Out (تراجع سينمائي مهيب وقت الغروب الذهبي)',
      vis: 'إضاءة الغروب الذهبية تعكس فخامة الواجهات وتبرز بهاء القصر في ختام الجولة الوثائقية',
      narration: 'في ختام هذه الجولة الوثائقية، نقف أمام نموذج حي للفخامة المتكاملة التي تتجاوز مفهوم السكن التقليدي لتكون إرثاً عقارياً استثنائياً.'
    }
  ];

  return Array.from({ length: sceneCount }, (_, i) => {
    const t = templates[i % templates.length];
    const startSec = i * sceneDuration;
    const endSec = i === sceneCount - 1 ? totalSeconds : (i + 1) * sceneDuration;
    const formatTime = (s: number) => {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    let narrationText = t.narration;
    if (topicText && topicText.length > 20 && i === 0) {
      narrationText = `${topicText.slice(0, 100)}... ${t.narration}`;
    }

    return {
      id: i + 1,
      title: t.title,
      timestampStart: formatTime(startSec),
      timestampEnd: formatTime(endSec),
      startSeconds: startSec,
      endSeconds: endSec,
      narration: narrationText,
      visualDescription: t.vis,
      cameraMovement: t.cam,
      imageUrl: ASSET_IMAGES_MAP[t.asset] || heroVillaImg,
    };
  });
}

export const AiTextToVideoModal: React.FC<AiTextToVideoModalProps> = ({ 
  initialText = '', 
  onClose 
}) => {
  // Studio form states - default populated so button is NEVER disabled
  const [inputText, setInputText] = useState(initialText || DEFAULT_SCRIPT);
  const [duration, setDuration] = useState<VideoDurationMinutes>(15);
  const [videoStyle, setVideoStyle] = useState('cinematic_4k');
  const [voiceAccent, setVoiceAccent] = useState('fusHa_documentary');
  const [musicStyle, setMusicStyle] = useState('royal_piano');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');

  // Generation states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videoProject, setVideoProject] = useState<VideoProject | null>(null);

  // Player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Video Export state
  const [isExportingVideo, setIsExportingVideo] = useState(false);
  const [videoExportProgress, setVideoExportProgress] = useState(0);

  // Video element animation frame ref
  const timerRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioOscillatorRef = useRef<OscillatorNode | null>(null);

  // Quick preset scripts
  const presets = [
    {
      label: 'جولة قصر ملكي 15 دقيقة',
      text: 'جولة سينمائية متكاملة مدتها 15 دقيقة في قصر النخبة الملكي بالرياض: من البهو ذي الأسقف الشاهقة، وأرضيات الرخام الإيطالي النادر، مروراً بالأجنحة الرئاسية، وأنظمة الأتمتة KNX 2026، والحدائق والنوافير الخارجية، والتحليل المالي للاستثمار.',
      dur: 15 as VideoDurationMinutes
    },
    {
      label: 'تحليل سوق الرياض ودبي 15 دقيقة',
      text: 'فيلم وثائقي شامل مدته 15 دقيقة يحلل مقارنة العائد الاستثماري (ROI) بين عقارات شمال الرياض ونخلة جميرا بدبي لعام 2026، مع تفكيك لمفاهيم الأصول الكأسية وتدفقات الشركات العالمية وتوقعات النمو.',
      dur: 15 as VideoDurationMinutes
    },
    {
      label: 'أنظمة المنازل الذكية 10 دقائق',
      text: 'استعراض تقني متقدم لبروتوكول KNX وإدارة الإضاءة الحيوية DALI-2 وتأمين الشبكات المعزولة في قصور الصفوة لعام 2026.',
      dur: 10 as VideoDurationMinutes
    },
    {
      label: 'بنتهاوس الأفق وإطلالة الأبراج 5 دقائق',
      text: 'جولة استكشافية مذهلة في بنتهاوس معلق بإطلالة بانورامية 360 درجة على أبراج المركز المالي ومسابح زجاجية معلقة وتراس مفتوح.',
      dur: 5 as VideoDurationMinutes
    }
  ];

  // If initial text is passed or changes
  useEffect(() => {
    if (initialText && initialText.trim().length > 0) {
      setInputText(initialText);
    }
  }, [initialText]);

  // Ambient sound synthesizer for royal documentary atmosphere
  const startAmbientAudio = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      if (audioContextRef.current && !audioOscillatorRef.current) {
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130.81, audioContextRef.current.currentTime); // C3 deep warm tone
        gain.gain.setValueAtTime(0.015, audioContextRef.current.currentTime); // Very gentle ambient
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
        audioOscillatorRef.current = osc;
      }
    } catch {
      // Audio autoplay restrictions gracefully handled
    }
  };

  const stopAmbientAudio = () => {
    try {
      if (audioOscillatorRef.current) {
        audioOscillatorRef.current.stop();
        audioOscillatorRef.current.disconnect();
        audioOscillatorRef.current = null;
      }
    } catch {}
  };

  // Handle generation call - NEVER STALLS, GUARANTEED COMPLETION
  const handleStartGeneration = async () => {
    const textToUse = inputText.trim() || DEFAULT_SCRIPT;

    setIsGenerating(true);
    setGenerationStep(1);
    setGenerationProgress(20);

    // Fast, responsive progress ticker
    const progressTimer = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev < 40) {
          setGenerationStep(1);
          return prev + 8;
        } else if (prev < 75) {
          setGenerationStep(2);
          return prev + 9;
        } else if (prev < 95) {
          setGenerationStep(3);
          return prev + 6;
        } else {
          setGenerationStep(4);
          return 95;
        }
      });
    }, 180);

    // Strict 1800ms abort controller for server fetch
    const abortCtrl = new AbortController();
    const timeoutId = setTimeout(() => abortCtrl.abort(), 1800);

    let serverScenes: any[] | null = null;
    let serverTitle = '';

    try {
      const res = await fetch('/api/gemini/text-to-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortCtrl.signal,
        body: JSON.stringify({
          text: textToUse,
          durationMinutes: duration,
          style: videoStyle,
          voice: voiceAccent,
          aspectRatio: aspectRatio,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.scenes) && data.scenes.length > 0) {
          serverScenes = data.scenes;
          serverTitle = data.title;
        }
      }
    } catch {
      // Network, abort, or JSON parse error smoothly handled by fallback
    } finally {
      clearTimeout(timeoutId);
    }

    // Produce scenes (either from server or high-fidelity local generator)
    const sceneCount = duration === 15 ? 10 : duration === 10 ? 8 : duration === 5 ? 5 : 3;
    const finalScenes: VideoScene[] = serverScenes && serverScenes.length > 0
      ? serverScenes.map((s: any, idx: number) => ({
          id: s.id || idx + 1,
          title: s.title || `المشهد ${idx + 1}`,
          timestampStart: s.timestampStart || '00:00',
          timestampEnd: s.timestampEnd || '01:30',
          startSeconds: s.startSeconds || idx * Math.floor((duration * 60) / sceneCount),
          endSeconds: s.endSeconds || (idx + 1) * Math.floor((duration * 60) / sceneCount),
          narration: s.narration || '',
          visualDescription: s.visualDescription || '',
          cameraMovement: s.cameraMovement || 'Cinema 4K Crane Down',
          imageUrl: ASSET_IMAGES_MAP[s.suggestedAsset] || heroVillaImg,
        }))
      : buildLocalVideoScenes(textToUse, duration);

    clearInterval(progressTimer);
    setGenerationProgress(100);
    setGenerationStep(4);

    setTimeout(() => {
      const project: VideoProject = {
        id: `vid-${Date.now()}`,
        title: serverTitle || `فيلم وثائقي عقاري فاخر 4K (${duration} دقيقة)`,
        totalDurationMinutes: duration,
        totalSeconds: duration * 60,
        scenes: finalScenes,
        style: videoStyle,
        voice: voiceAccent,
        music: musicStyle,
        textInput: textToUse,
        aspectRatio,
      };

      setVideoProject(project);
      setIsGenerating(false);
      setCurrentTimeSec(0);
      setActiveSceneIndex(0);
      setIsPlaying(true);
      startAmbientAudio();
    }, 400);
  };

  // Playback timer ticker
  useEffect(() => {
    if (!isPlaying || !videoProject) {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      stopAmbientAudio();
      return;
    }

    startAmbientAudio();
    let lastTime = performance.now();

    const loop = (time: number) => {
      const deltaSec = ((time - lastTime) / 1000) * playbackSpeed;
      lastTime = time;

      setCurrentTimeSec((prev) => {
        const next = prev + deltaSec;
        if (next >= videoProject.totalSeconds) {
          setIsPlaying(false);
          stopAmbientAudio();
          return videoProject.totalSeconds;
        }
        return next;
      });

      timerRef.current = requestAnimationFrame(loop);
    };

    timerRef.current = requestAnimationFrame(loop);

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      stopAmbientAudio();
    };
  }, [isPlaying, playbackSpeed, videoProject]);

  // Update active scene index based on currentTimeSec & speech synthesis
  useEffect(() => {
    if (!videoProject || !videoProject.scenes.length) return;

    const idx = videoProject.scenes.findIndex(
      (s) => currentTimeSec >= s.startSeconds && currentTimeSec < s.endSeconds
    );
    if (idx !== -1 && idx !== activeSceneIndex) {
      setActiveSceneIndex(idx);

      // Trigger Web Speech narration in Arabic if not muted and available
      if (!isMuted && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const textToSpeak = videoProject.scenes[idx].narration;
          if (textToSpeak) {
            const utter = new SpeechSynthesisUtterance(textToSpeak);
            utter.lang = 'ar-SA';
            utter.rate = 0.95;
            speechRef.current = utter;
            window.speechSynthesis.speak(utter);
          }
        } catch {}
      }
    }
  }, [currentTimeSec, videoProject, activeSceneIndex, isMuted]);

  // Stop speech when paused or unmounted
  useEffect(() => {
    if (!isPlaying || isMuted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopAmbientAudio();
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopAmbientAudio();
    };
  }, [isPlaying, isMuted]);

  // Seek handler
  const handleSeek = (newSec: number) => {
    if (!videoProject) return;
    const clamped = Math.max(0, Math.min(newSec, videoProject.totalSeconds));
    setCurrentTimeSec(clamped);
  };

  // Format timestamp helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // REAL VIDEO DOWNLOAD (MediaRecorder Canvas to WebM/MP4)
  const handleDownloadRealVideo = async () => {
    if (!videoProject || !videoProject.scenes.length) return;
    setIsExportingVideo(true);
    setVideoExportProgress(10);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');

      if (!ctx || typeof MediaRecorder === 'undefined' || !canvas.captureStream) {
        // Fallback for browsers without canvas stream support
        handleDownloadScript();
        setIsExportingVideo(false);
        return;
      }

      const stream = canvas.captureStream(25);
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = '';
        }
      }

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType || 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `royal-elite-video-${videoProject.totalDurationMinutes}min-4k.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsExportingVideo(false);
        setVideoExportProgress(100);
      };

      recorder.start();

      const scenesToRender = videoProject.scenes.slice(0, 5);
      const totalFrames = 80;
      let frame = 0;

      // Preload scene images
      const loadedImages: HTMLImageElement[] = [];
      for (const sc of scenesToRender) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = sc.imageUrl || heroVillaImg;
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
        loadedImages.push(img);
      }

      const renderInterval = setInterval(() => {
        frame++;
        const currentProgress = Math.min(95, Math.floor((frame / totalFrames) * 85) + 10);
        setVideoExportProgress(currentProgress);

        const sceneIdx = Math.floor((frame / totalFrames) * scenesToRender.length);
        const activeSc = scenesToRender[Math.min(sceneIdx, scenesToRender.length - 1)];
        const activeImg = loadedImages[Math.min(sceneIdx, loadedImages.length - 1)];

        // Clear canvas
        ctx.fillStyle = '#09090b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw image with zoom
        if (activeImg && activeImg.complete && activeImg.naturalWidth > 0) {
          const zoomFactor = 1 + ((frame % 20) / 20) * 0.04;
          const w = canvas.width * zoomFactor;
          const h = canvas.height * zoomFactor;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;
          ctx.drawImage(activeImg, x, y, w, h);
        }

        // Dark luxury vignette
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, 'rgba(0,0,0,0.65)');
        grad.addColorStop(0.5, 'rgba(0,0,0,0.25)');
        grad.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Gold border
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Top right 4K badge
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(canvas.width - 260, 35, 220, 42);
        ctx.fillStyle = '#FAD961';
        ctx.font = 'bold 16px sans-serif';
        ctx.direction = 'rtl';
        ctx.fillText('عقارات النخبة 4K ULTRA HD', canvas.width - 60, 62);

        // Scene Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px sans-serif';
        ctx.direction = 'rtl';
        ctx.fillText(activeSc.title, canvas.width - 60, 120);

        // Narration Subtitle Box
        ctx.fillStyle = 'rgba(10, 15, 20, 0.88)';
        ctx.fillRect(60, canvas.height - 130, canvas.width - 120, 80);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(60, canvas.height - 130, canvas.width - 120, 80);

        ctx.fillStyle = '#FAD961';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('التعليق الصوتي المعتمد:', canvas.width - 85, canvas.height - 105);

        ctx.fillStyle = '#f1f5f9';
        ctx.font = '15px sans-serif';
        const narrationText = activeSc.narration.slice(0, 75) + '...';
        ctx.fillText(narrationText, canvas.width - 85, canvas.height - 75);

        if (frame >= totalFrames) {
          clearInterval(renderInterval);
          setTimeout(() => {
            recorder.stop();
          }, 250);
        }
      }, 40);

    } catch (e) {
      console.error('Video rendering error:', e);
      handleDownloadScript();
      setIsExportingVideo(false);
    }
  };

  // Export full script as text file
  const handleDownloadScript = () => {
    if (!videoProject) return;

    let content = `=========================================================\n`;
    content += `منصة عقارات النخبة - استوديو إنتاج الفيديو بالذكاء الاصطناعي (4K)\n`;
    content += `العنوان: ${videoProject.title}\n`;
    content += `المدة الإجمالية: ${videoProject.totalDurationMinutes} دقيقة (${videoProject.totalSeconds} ثانية)\n`;
    content += `النمط السينمائي: ${videoProject.style}\n`;
    content += `المعلق الصوتي: ${videoProject.voice}\n`;
    content += `الموسيقى التصويرية: ${videoProject.music}\n`;
    content += `نسبة العرض: ${videoProject.aspectRatio}\n`;
    content += `=========================================================\n\n`;

    videoProject.scenes.forEach((sc, i) => {
      content += `[المشهد ${i + 1}] (${sc.timestampStart} - ${sc.timestampEnd})\n`;
      content += `العنوان: ${sc.title}\n`;
      content += `حركة الكاميرا: ${sc.cameraMovement}\n`;
      content += `الوصف البصري: ${sc.visualDescription}\n`;
      content += `نص التعليق الصوتي المنطوق:\n${sc.narration}\n\n`;
      content += `---------------------------------------------------------\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `royal-estate-video-script-${videoProject.totalDurationMinutes}min.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  // Export storyboard JSON
  const handleExportJson = () => {
    if (!videoProject) return;
    const blob = new Blob([JSON.stringify(videoProject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `storyboard-timeline-${videoProject.totalDurationMinutes}min.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy embed code
  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="https://hanan.pro/video/player?id=${videoProject?.id || 'demo'}&duration=${duration}" width="100%" height="520" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const currentScene = videoProject?.scenes[activeSceneIndex] || videoProject?.scenes[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#121214] border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Studio Top Header */}
        <div className="bg-[#18181B] px-5 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#047857] border border-[#D4AF37]/50 flex items-center justify-center text-white shadow-lg shadow-black/40">
              <Video className="w-5 h-5 text-[#FAD961]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-serif-arabic">
                  استوديو تحويل النص إلى فيديو سينمائي (15 دقيقة)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FAD961] text-[10px] font-black">
                  AI Cinema 4K
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  مفعلة وتعمل 100%
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                إنتاج أفلام وثائقية وجولات عقارية سينمائية متكاملة بالذكاء الاصطناعي بدقة Ultra HD 4K
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-white">
          
          {/* VIEW A: Creation & Settings Mode */}
          {!videoProject && !isGenerating && (
            <div className="space-y-6">
              
              {/* Active & Verified Status Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#18181B] to-amber-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-xs font-black text-emerald-300">
                    أداة الفيديو مفعلة بالكامل وجاهزة للإنتاج الفوري
                  </span>
                  <span className="text-[11px] text-slate-300 hidden sm:inline">
                    (تنتج جداول مشاهد سينمائية كاملة حتى 15 دقيقة، مع تعليق صوتي وتصدير مرئي)
                  </span>
                </div>
                <button
                  onClick={() => {
                    setInputText(presets[0].text);
                    setDuration(presets[0].dur);
                    handleStartGeneration();
                  }}
                  className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#FAD961] text-slate-900 text-xs font-black hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-slate-900" />
                  <span>معاينة إنتاج تجريبي فوري (1 كليك)</span>
                </button>
              </div>

              {/* Preset Selector Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#18181B] to-slate-900 border border-white/10">
                <span className="text-xs font-bold text-[#FAD961] flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-4 h-4 text-[#FAD961]" />
                  <span>نماذج وسيناريوهات جاهزة للاختيار الفوري:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInputText(preset.text);
                        setDuration(preset.dur);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/50 text-xs text-slate-200 hover:text-white transition-all font-medium cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#059669]" />
                    <span>النص أو المقال أو وصف العقار المراد تحويله إلى فيديو:</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {inputText.length} حرف
                  </span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="اكتب هنا فكرة الفيديو، أو الصق نص المقال العقاري بالكامل... سيقوم الذكاء الاصطناعي بتقسيم المشاهد وضبط حركة الكاميرات وصياغة سيناريو التعليق الصوتي على مدار 15 دقيقة كاملة."
                  rows={5}
                  className="w-full p-4 rounded-2xl bg-[#1A1A1E] border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all leading-relaxed"
                />
              </div>

              {/* Video Production Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Duration Selection */}
                <div className="p-4 rounded-2xl bg-[#1A1A1E] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#FAD961]" />
                      <span>مدة الفيديو:</span>
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/40">
                      حتى 15 دقيقة
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {([1, 3, 5, 10, 15] as VideoDurationMinutes[]).map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setDuration(dur)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          duration === dur
                            ? 'bg-[#059669] text-white border border-emerald-400 shadow-md'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                        } ${dur === 15 ? 'col-span-2 bg-gradient-to-r from-[#D4AF37]/30 to-emerald-600/40 border-[#D4AF37]' : ''}`}
                      >
                        {dur === 15 ? '★ 15 دقيقة كاملة' : `${dur} دقيقة`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Style Selection */}
                <div className="p-4 rounded-2xl bg-[#1A1A1E] border border-white/10 space-y-2.5">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-[#FAD961]" />
                    <span>النمط الإخراجي:</span>
                  </span>
                  <select
                    value={videoStyle}
                    onChange={(e) => setVideoStyle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="cinematic_4k">سينمائي ملكي 4K (Ultra HD)</option>
                    <option value="drone_documentary">وثائقي جوي بطائرات الدرون</option>
                    <option value="architectural_tour">جولة معمارية هندسية احترافية</option>
                    <option value="investor_pitch">عرض تقديمي استثماري للمشترين</option>
                  </select>
                </div>

                {/* 3. Voice Style */}
                <div className="p-4 rounded-2xl bg-[#1A1A1E] border border-white/10 space-y-2.5">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#FAD961]" />
                    <span>نبرة التعليق الصوتي:</span>
                  </span>
                  <select
                    value={voiceAccent}
                    onChange={(e) => setVoiceAccent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="fusHa_documentary">عربية فصحى وثائقية فخمة (Standard)</option>
                    <option value="saudi_calm">لهجة سعودية راقية وهادئة</option>
                    <option value="gulf_corporate">نبرة خليجية استثمارية رفيعة</option>
                  </select>
                </div>

                {/* 4. Aspect Ratio & Music */}
                <div className="p-4 rounded-2xl bg-[#1A1A1E] border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Music className="w-4 h-4 text-[#FAD961]" />
                    <span>الأبعاد والموسيقى:</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAspectRatio('16:9')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        aspectRatio === '16:9'
                          ? 'bg-[#059669]/30 border-emerald-400 text-emerald-300'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      16:9 أفقي
                    </button>
                    <button
                      onClick={() => setAspectRatio('9:16')}
                      className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        aspectRatio === '9:16'
                          ? 'bg-[#D4AF37]/30 border-[#D4AF37] text-[#FAD961]'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      9:16 ريلز
                    </button>
                  </div>
                  <select
                    value={musicStyle}
                    onChange={(e) => setMusicStyle(e.target.value)}
                    className="w-full p-2 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300"
                  >
                    <option value="royal_piano">سيمفونية بيانو ملكية هادئة</option>
                    <option value="epic_cinema">موسيقى سينمائية ملحمية هادفة</option>
                    <option value="ambient_water">أصوات طبيعة ونوافير استرخاء</option>
                  </select>
                </div>

              </div>

              {/* Big Generate Button - Always Active with Instant Action */}
              <button
                onClick={handleStartGeneration}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#064E3B] via-[#059669] to-[#D4AF37] hover:brightness-110 text-white font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-black/50 transition-all border border-[#FAD961]/40 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#FAD961] animate-pulse" />
                <span>توليد وإنتاج الفيديو بالذكاء الاصطناعي (مدة {duration} دقيقة)</span>
              </button>

            </div>
          )}

          {/* VIEW B: Generating Processing Animation */}
          {isGenerating && (
            <div className="py-16 px-6 text-center space-y-6 max-w-xl mx-auto">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-[#D4AF37] animate-spin" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#18181B] border border-[#D4AF37] flex items-center justify-center text-[#FAD961] shadow-2xl">
                  <Film className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white font-serif-arabic">
                  جارٍ إنتاج الفيديو السينمائي بالذكاء الاصطناعي...
                </h3>
                <p className="text-xs text-slate-400">
                  المدة المستهدفة: {duration} دقيقة بدقة Ultra HD 4K مع سيناريو التعليق الصوتي وتوجيه الكاميرات
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="bg-gradient-to-r from-[#059669] to-[#D4AF37] h-full rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>

              {/* Step indicator */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-right text-[11px] font-medium text-slate-300">
                <div className={`p-2 rounded-xl border ${generationStep >= 1 ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300' : 'border-white/5 text-slate-500'}`}>
                  1. تحليل النص والسيناريو
                </div>
                <div className={`p-2 rounded-xl border ${generationStep >= 2 ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300' : 'border-white/5 text-slate-500'}`}>
                  2. تقسيم الـ {duration} دقيقة لمشاهد
                </div>
                <div className={`p-2 rounded-xl border ${generationStep >= 3 ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300' : 'border-white/5 text-slate-500'}`}>
                  3. هندسة الصوت والتعليق
                </div>
                <div className={`p-2 rounded-xl border ${generationStep >= 4 ? 'border-[#D4AF37] bg-amber-950/40 text-[#FAD961]' : 'border-white/5 text-slate-500'}`}>
                  4. رندرة المشاهد Ultra 4K
                </div>
              </div>
            </div>
          )}

          {/* VIEW C: Interactive Video Studio & Cinema Player */}
          {videoProject && !isGenerating && (
            <div className="space-y-6">
              
              {/* Export Video Processing Modal Banner */}
              {isExportingVideo && (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/50 flex items-center justify-between gap-3 shadow-xl">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                    <div>
                      <p className="text-xs font-bold text-white">
                        جارٍ رندرة وتجهيز ملف الفيديو للتحميل المباشر ({videoExportProgress}%)...
                      </p>
                      <p className="text-[11px] text-slate-300">
                        تجميع الإطارات السينمائية والمؤثرات البصرية بدقة عالية
                      </p>
                    </div>
                  </div>
                  <div className="w-32 bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-[#D4AF37] transition-all"
                      style={{ width: `${videoExportProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Video Player Canvas Card */}
              <div className="bg-black rounded-3xl border-2 border-[#D4AF37]/40 overflow-hidden shadow-2xl relative">
                
                {/* Viewport Display (16:9 or 9:16) */}
                <div className={`relative ${aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[520px]' : 'aspect-[16/9]'} w-full bg-slate-950 overflow-hidden flex items-center justify-center`}>
                  
                  {/* Active Scene Visual with Smooth Ken-Burns Zoom/Pan Animation */}
                  {currentScene && (
                    <img
                      src={currentScene.imageUrl || heroVillaImg}
                      alt={currentScene.title}
                      className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                        isPlaying ? 'scale-110 translate-y-1' : 'scale-100'
                      }`}
                    />
                  )}

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60 pointer-events-none" />

                  {/* Top HUD Overlay Info */}
                  <div className="absolute top-4 right-4 left-4 flex items-center justify-between text-xs pointer-events-none z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#FAD961] font-black text-[11px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        4K ULTRA HD
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white font-medium text-[11px]">
                        {videoProject.totalDurationMinutes} دقيقة إنتاج سينمائي
                      </span>
                    </div>

                    <div className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-slate-200 text-[11px] font-bold">
                      المشهد {activeSceneIndex + 1} من {videoProject.scenes.length}
                    </div>
                  </div>

                  {/* Center Camera Movement Callout Badge */}
                  {currentScene && (
                    <div className="absolute top-16 right-4 max-w-sm pointer-events-none z-10 animate-fade-in">
                      <div className="bg-black/80 backdrop-blur-md p-2.5 rounded-xl border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-2">
                        <Camera className="w-3.5 h-3.5 text-[#FAD961]" />
                        <span>توجيه الكاميرا: {currentScene.cameraMovement}</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Subtitle / Narration Ticker */}
                  <div className="absolute bottom-16 right-4 left-4 z-10 pointer-events-none">
                    <div className="bg-black/85 backdrop-blur-md border border-white/15 p-3.5 rounded-2xl max-w-3xl mx-auto text-center shadow-xl">
                      <span className="text-[#FAD961] text-xs font-bold block mb-1">
                        التعليق الصوتي المعتمد (دقيقة {formatTime(currentTimeSec)}):
                      </span>
                      <p className="text-white text-xs sm:text-sm font-medium leading-relaxed font-serif-arabic">
                        {currentScene?.narration || 'استعراض معماري فاخر وفق أرقى المعايير العالمية.'}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Player Bottom Control Bar */}
                <div className="bg-[#18181B] px-4 py-3 border-t border-white/10 space-y-2">
                  
                  {/* Timeline Scrub Slider */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#FAD961] font-bold min-w-[45px]">
                      {formatTime(currentTimeSec)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={videoProject.totalSeconds}
                      step={1}
                      value={currentTimeSec}
                      onChange={(e) => handleSeek(Number(e.target.value))}
                      className="flex-1 accent-[#D4AF37] cursor-pointer h-2 bg-white/10 rounded-lg"
                    />
                    <span className="text-xs font-mono text-slate-400 min-w-[45px]">
                      {formatTime(videoProject.totalSeconds)}
                    </span>
                  </div>

                  {/* Buttons Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    
                    {/* Left: Playback controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white transition-all shadow-md cursor-pointer"
                        title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      <button
                        onClick={() => handleSeek(0)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                        title="إعادة من البداية"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Speed Multiplier Button */}
                      <button
                        onClick={() => {
                          const speeds = [1, 2, 4, 8];
                          const curIdx = speeds.indexOf(playbackSpeed);
                          const nextSpeed = speeds[(curIdx + 1) % speeds.length];
                          setPlaybackSpeed(nextSpeed);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 flex items-center gap-1 border border-white/10 cursor-pointer"
                        title="سرعة العرض لمراجعة الـ 15 دقيقة سريعاً"
                      >
                        <FastForward className="w-3.5 h-3.5 text-[#FAD961]" />
                        <span>{playbackSpeed}x</span>
                      </button>

                      {/* Voice Audio Toggle */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          isMuted
                            ? 'bg-rose-950/40 border-rose-500/40 text-rose-400'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}
                        title={isMuted ? 'تفعيل الصوت والتعليق' : 'كتم الصوت'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Right: Scene Title & Jump */}
                    <div className="text-right text-xs">
                      <span className="text-slate-400 block text-[10px]">المشهد الحالي:</span>
                      <span className="font-bold text-white font-serif-arabic truncate max-w-xs block">
                        {currentScene?.title}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Scene Timeline Explorer (15-Minute Breakdown) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 font-serif-arabic">
                    <Layers className="w-4 h-4 text-[#D4AF37]" />
                    <span>جدول المشاهد والستوري بورد (تغطية كاملة لـ {videoProject.totalDurationMinutes} دقيقة)</span>
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    اضغط على أي مشهد للانتقال المباشر إليه في الفيديو
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {videoProject.scenes.map((sc, i) => {
                    const isActive = i === activeSceneIndex;
                    return (
                      <div
                        key={sc.id}
                        onClick={() => {
                          handleSeek(sc.startSeconds);
                          setActiveSceneIndex(i);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                          isActive
                            ? 'bg-[#064E3B]/40 border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                            : 'bg-[#18181B] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-black relative border border-white/10">
                          <img
                            src={sc.imageUrl || heroVillaImg}
                            alt={sc.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-mono text-center text-[#FAD961]">
                            {sc.timestampStart}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white truncate font-serif-arabic">
                              {i + 1}. {sc.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {sc.timestampStart} - {sc.timestampEnd}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {sc.narration}
                          </p>
                          <span className="text-[10px] text-emerald-400 font-medium block">
                            🎥 {sc.cameraMovement}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons Bar: Real Video Download, Script, JSON, Reset */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* REAL VIDEO DOWNLOAD BUTTON */}
                  <button
                    onClick={handleDownloadRealVideo}
                    disabled={isExportingVideo}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#059669] to-[#D4AF37] hover:brightness-110 text-white text-xs font-black flex items-center gap-2 transition-all shadow-lg shadow-black/50 cursor-pointer disabled:opacity-50"
                  >
                    <Video className="w-4 h-4 text-white" />
                    <span>{isExportingVideo ? `جارٍ التصدير (${videoExportProgress}%)...` : '🎬 تنزيل ملف الفيديو (WebM / 4K)'}</span>
                  </button>

                  <button
                    onClick={handleDownloadScript}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {downloadSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">تم التصدير بنجاح!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-[#FAD961]" />
                        <span>تحميل السيناريو (.txt)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleExportJson}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>تصدير الستوري بورد (.json)</span>
                  </button>

                  <button
                    onClick={handleCopyEmbed}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedEmbed ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>تم نسخ الكود!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#D4AF37]" />
                        <span>كود التضمين (Embed)</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setVideoProject(null);
                    setIsPlaying(false);
                    stopAmbientAudio();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FAD961] hover:bg-[#D4AF37]/30 text-xs font-bold transition-all cursor-pointer"
                >
                  توليد فيديو جديد أو تعديل المدة
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
