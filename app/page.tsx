import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Code2, Layers, Cpu, Send, Briefcase, 
  Moon, Sun, Globe, Award, Zap, TrendingUp, Play, BarChart3, Video, Eye, 
  Sparkles, BookOpen, PieChart, ArrowRight, MapPin, X, Maximize2, Gem, 
  AlertCircle, Download, FileText, Camera, MessageSquare, Loader2, Wand2,
  Lightbulb, CheckCircle2
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
    github: "#",
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
    { 
      title: "Spotify Identity Ad", 
      category: "Production", 
      description: "AI-driven motion graphics spot for Spotify, focusing on brand identity synthesis.", 
      tags: ["Commercial", "Motion"], 
      type: "video",
      src: "Spotify.mp4", 
      thumbnail: "Camera flatlay.jpeg",
      icon: <Video />
    },
    { 
      title: "Discord Brand Motion", 
      category: "Production", 
      description: "Experimental brand sequence for Discord utilizing custom diffusion motion paths.", 
      tags: ["Social", "AI Ad"], 
      type: "video",
      src: "Discord.mp4", 
      thumbnail: "directors cut.jpeg",
      icon: <Video />
    },
    { 
      title: "Democracy & Economic Growth", 
      category: "Strategy", 
      description: "Financial research piece exploring political systems' impact on national GDP.", 
      tags: ["Economics", "Research"], 
      type: "link",
      src: "https://keshavagrawal553.blogspot.com/2026/01/does-democracy-really-cause-economic.html",
      thumbnail: "cheery building.jpeg",
      icon: <BookOpen />
    },
    { 
      title: "NVIDIA Strategic Ops", 
      category: "Strategy", 
      description: "B2B visual communication for NVIDIA's sustainable data center and AI tech stack.", 
      tags: ["B2B", "Innovation"], 
      type: "image",
      src: "Nvidia sustainablity poster.jpg",
      icon: <BarChart3 />
    }
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
const apiKey = "";
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const callGeminiAPI = async (prompt, systemInstruction = "") => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  const fetchWithRetry = async (retries = 5, delay = 1000) => {
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

  const result = await fetchWithRetry();
  return result.candidates?.[0]?.content?.parts?.[0]?.text || "Consultation failed. Please try again.";
};

// ==========================================
// ANIMATED PAGE WRAPPER
// ==========================================
const PageWrapper = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
    {children}
  </div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoError, setVideoError] = useState(false);
  
  // Gemini State
  const [consultantOpen, setConsultantOpen] = useState(false);
  const [consultantQuery, setConsultantQuery] = useState("");
  const [consultantResponse, setConsultantResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pitchIndustry, setPitchIndustry] = useState("");
  const [customPitch, setCustomPitch] = useState("");
  const [projectInsights, setProjectInsights] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleConsultantSubmit = async (e) => {
    e.preventDefault();
    if (!consultantQuery.trim()) return;
    setIsLoading(true);
    const systemPrompt = `You are the AI version of Keshav Agrawal, a BBA Finance student at Christ University and an AI Strategist. 
    Respond to business inquiries with a mix of financial data awareness and creative AI strategy. 
    Keep it professional, innovative, and concise. Your goal is to show how Keshav's skills in Gemini Gems and AI production can solve the user's problem.`;
    
    try {
      const response = await callGeminiAPI(consultantQuery, systemPrompt);
      setConsultantResponse(response);
    } catch (err) {
      setConsultantResponse("Connection to my strategy brain timed out. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePitch = async () => {
    if (!pitchIndustry.trim()) return;
    setIsLoading(true);
    const prompt = `Generate a one-sentence high-impact elevator pitch for Keshav Agrawal (BBA Finance, AI Strategist) targeted specifically at the ${pitchIndustry} industry. Explain how his unique blend of financial intelligence and AI production creates value. Use a professional but visionary tone.`;
    try {
      const response = await callGeminiAPI(prompt);
      setCustomPitch(response);
    } catch (err) {
      setCustomPitch("Strategy error. Try another industry.");
    } finally {
      setIsLoading(false);
    }
  };

  const getProjectInsight = async (projectTitle, projectDesc) => {
    if (projectInsights[projectTitle]) return;
    setIsLoading(true);
    const prompt = `Analyze this project: "${projectTitle}". Description: "${projectDesc}". Provide a 2-sentence breakdown of its potential business ROI and strategic value for a brand. Use bullet points for the two sentences.`;
    try {
      const response = await callGeminiAPI(prompt);
      setProjectInsights(prev => ({ ...prev, [projectTitle]: response }));
    } catch (err) {
      setProjectInsights(prev => ({ ...prev, [projectTitle]: "Unable to generate insights at this time." }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectClick = (project) => {
    if (project.type === 'video') {
      setVideoError(false);
      setSelectedVideo(project.src);
    } else if (project.type === 'link') {
      window.open(project.src, '_blank');
    }
  };

  const Home = () => (
    <PageWrapper>
      <section className="pt-20 pb-32">
        <div className="max-w-6xl mx-auto px-8 relative">
          <div className="absolute -top-10 -right-20 w-[500px] h-[500px] opacity-20 pointer-events-none">
            <img src="golden rain.jpeg" className="w-full h-full object-cover blur-md rounded-full" alt="" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8">
            <Sparkles className="w-3 h-3" /> BBA Finance x AI Producer
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-10 tracking-tighter leading-none">
            DATA<br />
            <span className="text-blue-600">STORY.</span>
          </h1>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-12 max-w-2xl backdrop-blur-md">
            <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Wand2 className="w-4 h-4" /> ✨ Instant Professional Pitch
            </h3>
            <div className="flex gap-3 mb-4">
              <input 
                type="text" 
                placeholder="Enter your industry (e.g. Fintech, Fashion)..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition-all"
                value={pitchIndustry}
                onChange={(e) => setPitchIndustry(e.target.value)}
              />
              <button 
                onClick={generatePitch}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "✨ Generate"}
              </button>
            </div>
            {customPitch && (
              <p className="text-sm italic text-blue-400 font-medium animate-in fade-in slide-in-from-left-2 duration-500">
                "{customPitch.replace(/"/g, '')}"
              </p>
            )}
            {!customPitch && (
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {USER_DATA.tagline}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-8 mb-16 max-w-2xl">
            {USER_DATA.metrics.map((m, i) => (
              <div key={i} className="group">
                <div className="text-3xl font-black mb-1 transition-colors group-hover:text-blue-500">{m.value}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => setCurrentPage('work')} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-600/30 flex items-center gap-3 group">
              View Production <Play className="w-4 h-4 fill-current" />
            </button>
            <button onClick={() => window.open(USER_DATA.cvUrl)} className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2">
              Download CV <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );

  const Work = () => {
    const categories = ['all', 'Production', 'Cinematic', 'Concepts', 'Strategy'];
    const [filter, setFilter] = useState('all');
    
    const filtered = filter === 'all' 
      ? USER_DATA.projects 
      : USER_DATA.projects.filter(p => p.category === filter);

    return (
      <PageWrapper>
        <section className="pt-20 pb-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-5xl font-black mb-4 tracking-tighter">Case Studies</h2>
                <div className="flex flex-wrap gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, idx) => (
                <div key={idx} className="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/40 transition-all flex flex-col">
                  <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => handleProjectClick(project)}>
                    <img 
                      src={project.type === 'image' ? project.src : project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800"; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                        {project.type === 'video' ? <Play className="w-6 h-6 text-white fill-current" /> : project.type === 'link' ? <BookOpen className="w-6 h-6 text-white" /> : <Eye className="w-6 h-6 text-white" />}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">{project.category}</div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-black">{project.title}</h3>
                      <button 
                        onClick={() => getProjectInsight(project.title, project.description)}
                        className="p-2 bg-white/5 hover:bg-blue-500/20 rounded-lg text-blue-500 transition-all border border-blue-500/10"
                        title="✨ Gemini Insights"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {projectInsights[project.title] ? (
                      <div className="mb-6 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="text-[10px] font-black uppercase text-blue-400 mb-2 flex items-center gap-2">
                           ✨ Strategic ROI Insight
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          {projectInsights[project.title]}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-black uppercase border border-white/10 px-2 py-1 rounded-md text-slate-500">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageWrapper>
    );
  };

  const About = () => (
    <PageWrapper>
      <section className="pt-20 pb-32 px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-black mb-12 tracking-tighter">Expertise</h2>
            <div className="space-y-8 text-slate-400 text-lg leading-relaxed font-medium">
              <p>
                My background in <span className="text-blue-500 font-bold tracking-tighter italic underline decoration-blue-500/30">BBA Finance & Economics</span> provides a structured analytical lens through which I view generative technology.
              </p>
              <p>
                I am not just building visuals; I am engineering <span className="text-white">AI-driven workflows</span> that decrease cost-to-production for brands while increasing visual fidelity and market relevance.
              </p>
            </div>
            
            <div className="mt-16 space-y-10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 flex items-center gap-3">
                <Briefcase className="w-4 h-4" /> Career Journey
              </h3>
              {USER_DATA.experience.map((job, i) => (
                <div key={i} className="border-l border-white/10 pl-8 relative pb-8">
                  <div className="absolute -left-[5px] top-0 w-[10px] h-[10px] bg-blue-600 rounded-full" />
                  <div className="text-xs font-black text-slate-600 mb-1 uppercase tracking-widest">{job.period}</div>
                  <div className="text-xl font-bold mb-1">{job.role}</div>
                  <div className="text-slate-500 text-sm">{job.company}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 mb-10">
              <img src="directors cut.jpeg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Behind the scenes" />
            </div>
            {USER_DATA.skills.map((skill, idx) => (
              <div key={idx} className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl group hover:bg-blue-600/5 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-blue-500">{skill.icon}</div>
                  <h3 className="text-sm font-black uppercase tracking-widest">{skill.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      
      {/* AI Consultant Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] z-[110] transition-transform duration-500 ease-in-out transform ${consultantOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full bg-slate-900 border-l border-white/10 flex flex-col shadow-2xl">
          <div className="p-8 border-b border-white/10 flex justify-between items-center bg-slate-950/50 backdrop-blur-md">
            <div>
              <h3 className="text-2xl font-black tracking-tighter flex items-center gap-2">
                <Gem className="w-6 h-6 text-blue-500" /> ✨ AI Consultant
              </h3>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Powered by Gemini 2.5 Flash</p>
            </div>
            <button onClick={() => setConsultantOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400"><X /></button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-8 space-y-6">
            <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-3xl">
              <p className="text-sm text-blue-100 leading-relaxed font-medium">
                "Hello! I am Keshav's Digital Twin. Ask me how we can integrate AI Agent orchestration or cinematic workflows into your business strategy."
              </p>
            </div>
            
            {consultantResponse && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
                  <CheckCircle2 className="w-3 h-3" /> Strategy Recommendation
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                  {consultantResponse}
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="flex items-center gap-3 text-slate-500 p-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest">Consulting Market Data...</span>
              </div>
            )}
          </div>
          
          <div className="p-8 border-t border-white/10 bg-slate-950/30">
            <form onSubmit={handleConsultantSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Ask about AI strategy..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-sm outline-none focus:border-blue-600 transition-all font-medium"
                value={consultantQuery}
                onChange={(e) => setConsultantQuery(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-10">
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black flex items-center justify-center relative border border-white/10">
            {!videoError ? (
              <video 
                src={selectedVideo} 
                className="w-full h-full" 
                controls 
                autoPlay 
                playsInline
                onError={() => setVideoError(true)}
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-slate-400 p-8 text-center">
                <AlertCircle className="w-16 h-16 text-blue-500 mb-2" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Media Preview Restricted</h3>
                <p className="max-w-md opacity-80 text-sm">
                  Sandbox restrictions may block direct video playback. Once deployed and files are in <strong>/public</strong>, this will work.
                </p>
                <div className="mt-6 flex gap-3">
                  <div className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold font-mono">/public/{selectedVideo}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating AI Bubble */}
      <button 
        onClick={() => setConsultantOpen(true)}
        className="fixed bottom-10 right-10 z-[105] w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/50 hover:scale-110 transition-all hover:bg-blue-500 group animate-bounce-slow"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
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
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-blue-500/50 transition-all backdrop-blur-xl shadow-xl">
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {currentPage === 'home' && <Home />}
        {currentPage === 'work' && <Work />}
        {currentPage === 'about' && <About />}
        {currentPage === 'contact' && <div className="p-20 text-center"><h2 className="text-6xl font-black">LET'S CONNECT</h2><p className="mt-4 text-slate-500 font-bold text-2xl">{USER_DATA.email}</p><a href={USER_DATA.socials.linkedin} target="_blank" className="mt-10 inline-block px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all">LinkedIn Profile</a></div>}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom { from { transform: translateY(1.5rem); } to { transform: translateY(0); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-in { animation-duration: 800ms; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom, fade-in; animation-fill-mode: both; }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
      `}} />

      <footer className="py-20 px-8 opacity-20 hover:opacity-100 transition-opacity text-center border-t border-white/5">
        <div className="text-[9px] font-black uppercase tracking-[1em]">
          © 2026 KESHAV AGRAWAL — AI STRATEGIST
        </div>
      </footer>
    </div>
  );
};

export default App;