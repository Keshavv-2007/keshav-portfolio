"use client";

import React, { useState, useEffect } from 'react';
import { 
  Github, Linkedin, Code2, Layers, Cpu, Send, Briefcase, 
  Moon, Sun, Globe, Award, Zap, TrendingUp, Play, BarChart3, Video, Eye, 
  Sparkles, BookOpen, PieChart, ArrowRight, MapPin, X, Maximize2, Gem, 
  Loader2, Wand2, Gamepad2, Tv, MessageSquare, Camera
} from 'lucide-react';

// ==========================================
// KESHAV AGRAWAL'S DATA PROFILE
// ==========================================
const USER_DATA = {
  name: "KESHAV AGRAWAL",
  role: "AI Business Strategist & Creative Lead",
  tagline: "Engineering Intelligent, Data-Aware Business Solutions.",
  description: "BBA Candidate in Finance & Economics at Christ University. I merge financial intelligence with high-fidelity generative AI production, specialized in Gemini Gems orchestration and cinematic brand storytelling.",
  email: "keshavagrawal553@gmail.com",
  cvUrl: "#", 
  socials: {
    linkedin: "https://www.linkedin.com/in/keshav-agrawal-1a1251370/",
    github: "https://github.com/Keshavv-2007/keshav-portfolio",
  },
  metrics: [
    { label: "AI Production", value: "24+" },
    { label: "Commercial Ads", value: "10" },
    { label: "Research Case", value: "05" }
  ],
  skills: [
    { name: "Strategic Finance", icon: <PieChart />, items: ["Market Intel", "Macro-Economics", "Business Strategy"] },
    { name: "AI Production", icon: <Video />, items: ["Ad Motion Gen", "Visual Prompting", "Gemini Gems"] },
    { name: "Tech Automation", icon: <Zap />, items: ["AI Agent Design", "LLM Workflows", "Automated Research"] }
  ],
  projects: [
    // --- COMMERCIAL PRODUCTION ---
    { 
      title: "Spotify Identity Ad", 
      category: "Production", 
      description: "AI-driven motion graphics spot for Spotify, focusing on brand identity synthesis.", 
      tags: ["Commercial", "Motion"], 
      type: "video",
      src: "/Spotify.mp4", 
      thumbnail: "/Camera flatlay.jpeg",
      icon: <Video />
    },
    { 
      title: "Discord Brand Motion", 
      category: "Production", 
      description: "Experimental brand sequence for Discord utilizing custom diffusion motion paths.", 
      tags: ["Social", "AI Ad"], 
      type: "video",
      src: "/Discord.mp4", 
      thumbnail: "/directors cut.jpeg",
      icon: <MessageSquare />
    },
    { 
      title: "PlayStation Visual Hub", 
      category: "Production", 
      description: "High-energy gaming concept commercial exploring 3D-aware latent space generation.", 
      tags: ["Gaming", "Motion"], 
      type: "video",
      src: "/Playstation.mp4", 
      thumbnail: "/futuristic city.jpeg",
      icon: <Gamepad2 />
    },
    { 
      title: "Reddit Community Spot", 
      category: "Production", 
      description: "Dynamic logo reveal and brand identity animation for the Reddit platform.", 
      tags: ["Social", "Identity"], 
      type: "video",
      src: "/Reddit.mp4", 
      thumbnail: "/cheery building.jpeg",
      icon: <Tv />
    },
    { 
      title: "Roam Gear: Outerwear", 
      category: "Production", 
      description: "Outdoor lifestyle commercial generated with high-consistency human-action models.", 
      tags: ["Fashion", "E-comm"], 
      type: "video",
      src: "/ad.mp4", 
      thumbnail: "/cave.jpeg",
      icon: <Video />
    },

    // --- CINEMATIC & NARRATIVE ---
    { 
      title: "Cognitive Overload", 
      category: "Cinematic", 
      description: "A narrative sequence exploring human-tech interaction in server environments.", 
      tags: ["Short Film", "VFX"], 
      type: "video",
      src: "/cognitive overload.mp4",
      thumbnail: "/cinematic bar.jpeg",
      icon: <Play />
    },
    { 
      title: "Blood Moon Protocol", 
      category: "Cinematic", 
      description: "Title sequence concept for a dark sci-fi gaming franchise.", 
      tags: ["Game Dev", "Titles"], 
      type: "video",
      src: "/Game poster.mp4",
      thumbnail: "/coffin.jpeg",
      icon: <Gamepad2 />
    },
    { 
      title: "Ancient Gate Portal", 
      category: "Cinematic", 
      description: "Astronaut exploration sequence merging historical architecture with surrealism.", 
      tags: ["Sci-Fi", "Environment"], 
      type: "video",
      src: "/ancient gate.mp4",
      thumbnail: "/golden rain.jpeg",
      icon: <Globe />
    },
    { 
      title: "Astronaut: Pink Horizon", 
      category: "Cinematic", 
      description: "Visual study of color grading and surrealist composition in 3D environments.", 
      tags: ["Color", "Atmosphere"], 
      type: "video",
      src: "/Astronaut standing.mp4", 
      thumbnail: "/traveller from the past.jpeg",
      icon: <Globe />
    },

    // --- CONCEPTS & STRATEGY ---
    { 
      title: "Product: Frozen 'Breberry'", 
      category: "Concepts", 
      description: "Cinematic beverage visualization with complex ice and texture simulation.", 
      tags: ["Product Art", "Marketing"], 
      type: "image",
      src: "/frozen breberry.jpeg",
      icon: <Eye />
    },
    { 
      title: "Cosmic Flower Market", 
      category: "Concepts", 
      description: "Surrealist environment concept merging astronomical scales with human social spaces.", 
      tags: ["Surrealism", "VFX"], 
      type: "image",
      src: "/COSMIC FLOWER MARKET.jpeg",
      icon: <Sparkles />
    },
    { 
      title: "NVIDIA Strategic Ops", 
      category: "Strategy", 
      description: "B2B visual communication for NVIDIA's sustainable data center and AI tech stack.", 
      tags: ["B2B", "Innovation"], 
      type: "image",
      src: "/Nvidia sustainablity poster.jpg",
      icon: <BarChart3 />
    },
    { 
      title: "Democracy & Economic Growth", 
      category: "Strategy", 
      description: "Financial research piece exploring political systems' impact on national GDP.", 
      tags: ["Economics", "Research"], 
      type: "link",
      src: "https://keshavagrawal553.blogspot.com/2026/01/does-democracy-really-cause-economic.html",
      thumbnail: "/cheery building.jpeg",
      icon: <BookOpen />
    }
  ],
  experience: [
    { company: "Christ University", role: "BBA Finance", period: "2024 - Present" },
    { company: "AI Production Freelance", role: "Lead Strategist", period: "2023 - Present" }
  ]
};

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Production' },
  { id: 'about', label: 'Expertise' },
  { id: 'contact', label: 'Contact' }
];

// ==========================================
// GEMINI API UTILITIES
// ==========================================
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GEMINI_API_KEY) || "";
  } catch (e) {
    return "";
  }
};

const apiKey = getApiKey();
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const callGeminiAPI = async (prompt: string, systemInstruction: string = ""): Promise<string> => {
  if (!apiKey) return "AI Strategy module is currently in 'Local Preview' mode. Once deployed with an API key, this feature will be fully active.";
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  const fetchWithRetry = async (retries: number = 5, delay: number = 1000): Promise<any> => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise(res => setTimeout(res, delay));
        return fetchWithRetry(retries - 1, delay * 2);
      }
      throw error;
    }
  };

  try {
    const result = await fetchWithRetry();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "Consultation failed. Please try again.";
  } catch (error) {
    return "Failed to connect to AI engine.";
  }
};

// ==========================================
// ANIMATED PAGE WRAPPER
// ==========================================
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
    {children}
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<boolean>(false);
  
  const [consultantOpen, setConsultantOpen] = useState<boolean>(false);
  const [consultantQuery, setConsultantQuery] = useState<string>("");
  const [consultantResponse, setConsultantResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pitchIndustry, setPitchIndustry] = useState<string>("");
  const [customPitch, setCustomPitch] = useState<string>("");
  const [projectInsights, setProjectInsights] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleConsultantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultantQuery.trim()) return;
    setIsLoading(true);
    const systemPrompt = `You are the AI version of Keshav Agrawal, a BBA Finance student at Christ University and an AI Strategist. Respond to business inquiries with financial data awareness and creative AI strategy.`;
    
    try {
      const response = await callGeminiAPI(consultantQuery, systemPrompt);
      setConsultantResponse(response);
    } catch (err) {
      setConsultantResponse("Strategy brain timed out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePitch = async () => {
    if (!pitchIndustry.trim()) return;
    setIsLoading(true);
    const prompt = `Generate a high-impact one-sentence elevator pitch for Keshav Agrawal for the ${pitchIndustry} industry.`;
    try {
      const response = await callGeminiAPI(prompt);
      setCustomPitch(response);
    } catch (err) {
      setCustomPitch("Strategy error. Try another industry.");
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectInsight = async (projectTitle: string, projectDesc: string) => {
    if (projectInsights[projectTitle]) return;
    setIsLoading(true);
    const prompt = `Analyze project ROI for: "${projectTitle}". Description: ${projectDesc}`;
    try {
      const response = await callGeminiAPI(prompt);
      setProjectInsights(prev => ({ ...prev, [projectTitle]: response }));
    } catch (err) {
      setProjectInsights(prev => ({ ...prev, [projectTitle]: "Unable to generate insights." }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectClick = (project: any) => {
    if (project.type === 'video') {
      setVideoError(false);
      setSelectedVideo(project.src);
    } else if (project.type === 'link') {
      window.open(project.src, '_blank');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* AI Consultant Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] z-[110] transition-transform duration-500 ease-in-out transform ${consultantOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full bg-slate-900 border-l border-white/10 flex flex-col shadow-2xl">
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-slate-950/50 backdrop-blur-md">
            <div>
              <h3 className="text-2xl font-black tracking-tighter flex items-center gap-2"><Gem className="w-6 h-6 text-blue-500" /> ✨ AI Consultant</h3>
            </div>
            <button onClick={() => setConsultantOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400"><X /></button>
          </div>
          <div className="flex-grow overflow-y-auto p-8 space-y-6">
            <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-3xl text-sm text-blue-100 italic">"Hello! I am Keshav's Digital Twin. How can AI elevate your brand?"</div>
            {consultantResponse && <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-sm text-slate-300 leading-relaxed font-medium">{consultantResponse}</div>}
            {isLoading && <div className="flex items-center gap-3 text-slate-500 p-4"><Loader2 className="w-5 h-5 animate-spin" /></div>}
          </div>
          <div className="p-8 border-t border-white/10 bg-slate-950/30">
            <form onSubmit={handleConsultantSubmit} className="relative">
              <input type="text" placeholder="Ask about AI strategy..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-sm outline-none focus:border-blue-600 transition-all text-white" value={consultantQuery} onChange={(e) => setConsultantQuery(e.target.value)} />
              <button type="submit" disabled={isLoading} className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all"><ArrowRight className="w-4 h-4 text-white" /></button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating AI Bubble */}
      <button onClick={() => setConsultantOpen(true)} className="fixed bottom-10 right-10 z-[105] w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      {/* Navbar */}
      <nav className="fixed w-full z-50 py-8 px-8 flex justify-between items-center pointer-events-none">
        <div onClick={() => setCurrentPage('home')} className="flex items-center gap-3 group cursor-pointer pointer-events-auto bg-slate-900/50 backdrop-blur-xl p-2 pr-5 rounded-2xl border border-white/10">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white text-xl">K</div>
          <div className="text-sm font-black tracking-tighter uppercase opacity-80 group-hover:opacity-100 transition-opacity">KESHAV</div>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="hidden md:flex gap-2 p-1.5 bg-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-xl">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentPage === item.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-200'}`}>
                {item.label}
              </button>
            ))}
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-blue-500/50 transition-all shadow-xl">
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {currentPage === 'home' && (
          <PageWrapper>
            <section className="pt-20 pb-32">
              <div className="max-w-6xl mx-auto px-8 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8">
                  <Sparkles className="w-3 h-3" /> BBA Finance x AI Producer
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none italic">DATA<br /><span className="text-blue-600 not-italic">STORY.</span></h1>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 max-w-2xl backdrop-blur-md">
                  <div className="flex gap-3 mb-4">
                    <input type="text" placeholder="Enter industry (e.g. Fintech)..." className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none" value={pitchIndustry} onChange={(e) => setPitchIndustry(e.target.value)} />
                    <button onClick={generatePitch} className="px-6 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase text-white">{isLoading ? "..." : "✨ Pitch"}</button>
                  </div>
                  {customPitch ? <p className="text-sm italic text-blue-400 font-medium">"{customPitch}"</p> : <p className="text-sm text-slate-400 font-medium">{USER_DATA.tagline}</p>}
                </div>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setCurrentPage('work')} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3">View Production <Play className="w-4 h-4 fill-current" /></button>
                </div>
              </div>
            </section>
          </PageWrapper>
        )}
        {currentPage === 'work' && (
          <PageWrapper>
            <section className="pt-20 pb-32 px-8">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-black mb-16 tracking-tighter">Case Studies</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {USER_DATA.projects.map((project, idx) => (
                    <div key={idx} className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col">
                      <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => handleProjectClick(project)}>
                        <img src={project.type === 'image' ? project.src : project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                            {project.type === 'video' ? <Play className="w-6 h-6 text-white fill-current" /> : project.type === 'link' ? <BookOpen className="w-6 h-6 text-white" /> : <Eye className="w-6 h-6 text-white" />}
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-2xl font-black">{project.title}</h3>
                          <Sparkles className="w-4 h-4 text-blue-500 cursor-pointer" onClick={() => getProjectInsight(project.title, project.description)} />
                        </div>
                        {projectInsights[project.title] && <p className="text-xs text-blue-300 italic mb-4">{projectInsights[project.title]}</p>}
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </PageWrapper>
        )}
        {currentPage === 'about' && (
          <PageWrapper>
            <section className="pt-20 pb-32 px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl font-black mb-12">Expertise</h2>
                <p className="text-xl text-slate-400 leading-relaxed mb-16">{USER_DATA.description}</p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                  {USER_DATA.skills.map((skill, idx) => (
                    <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h4 className="font-black mb-4 uppercase text-blue-500 text-xs">{skill.name}</h4>
                      <ul className="text-sm text-slate-400 space-y-2">{skill.items.map(i => <li key={i}>{i}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </PageWrapper>
        )}
        {currentPage === 'contact' && (
          <div className="p-20 text-center">
            <h2 className="text-6xl font-black mb-6">CONNECT</h2>
            <p className="text-2xl text-slate-500 font-bold mb-10">{USER_DATA.email}</p>
            <a href={USER_DATA.socials.linkedin} target="_blank" className="px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase text-white hover:bg-blue-500 transition-all">LinkedIn</a>
          </div>
        )}
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[120] bg-black/90 flex items-center justify-center p-8">
          <X className="absolute top-8 right-8 text-white cursor-pointer" onClick={() => setSelectedVideo(null)} />
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black flex items-center justify-center relative border border-white/10">
            {!videoError ? <video src={selectedVideo} className="w-full h-full" controls autoPlay playsInline onError={() => setVideoError(true)} /> : (
              <div className="flex flex-col items-center gap-4 text-slate-400 p-8 text-center">
                <AlertCircle className="w-16 h-16 text-blue-500" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Media Preview Restricted</h3>
                <p className="max-w-md opacity-80 text-sm">Sandbox restrictions may block direct video playback. Once deployed and files are in <strong>/public</strong>, this will work.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="py-20 px-8 text-center opacity-20 text-[9px] font-black uppercase tracking-[1em]">© 2026 KESHAV AGRAWAL</footer>
      
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-in { animation: slide-in-from-bottom 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;