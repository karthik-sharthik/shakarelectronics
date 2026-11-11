import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, Headphones, Pause, Play, ShieldCheck, Sparkles, Truck } from 'lucide-react'

const campaigns = [
  {
    eyebrow: 'THE FLAGSHIP DROP · JUST LANDED',
    headline: <>Big ideas.<br/>Brilliant <span>pocket.</span></>,
    description: 'Meet the next generation of mobile. Beautifully bold, ridiculously capable, and ready for wherever today takes you.',
    offer: 'Save up to ₹15,000',
    note: 'On selected flagship phones',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1200&q=90',
    alt: 'Close-up of a premium smartphone',
    theme: '#e9e3d6',
    accent: '#f26a3d',
    label: '01 / POCKET-SIZED WONDER',
    product: 'The next big thing is here.'
  },
  {
    eyebrow: 'MADE FOR BIGGER THINKING',
    headline: <>Ideas, meet<br/>your <span>match.</span></>,
    description: 'Power through your day with a little more room to think. Your next favourite laptop is ready to go wherever you do.',
    offer: 'Up to 20% off',
    note: 'On select creator laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=90',
    alt: 'Slim laptop ready for a day of creative work',
    theme: '#dce3db',
    accent: '#436853',
    label: '02 / ROOM TO CREATE',
    product: 'A fresh perspective, opened.'
  },
  {
    eyebrow: 'YOUR SOUNDTRACK, UPGRADED',
    headline: <>Find your<br/><span>own frequency.</span></>,
    description: 'Tune into the details. Discover feel-good audio picks with immersive sound, thoughtful design, and lovely little prices.',
    offer: 'Save up to 25%',
    note: 'On headphones & speakers',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90',
    alt: 'Wireless headphones in a vivid orange finish',
    theme: '#e8dadd',
    accent: '#a94b68',
    label: '03 / SOUND, REIMAGINED',
    product: 'Press play on something good.'
  }
]

export default function Hero({ onShop }) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const campaign = campaigns[active]
  const showCampaign = index => setActive((index + campaigns.length) % campaigns.length)

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      setActive(index => (index + 1) % campaigns.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [isPaused])

  return <section id="home" className="container-shell pt-5 sm:pt-8">
    <div
      className="relative isolate overflow-hidden rounded-[26px] transition-colors duration-700"
      style={{ backgroundColor: campaign.theme }}
      aria-roledescription="carousel"
      aria-label="Featured electronics and offers"
    >
      <div className="grid min-h-[680px] grid-cols-1 lg:min-h-[550px] lg:grid-cols-[.95fr_1.05fr]">
        <div key={`copy-${active}`} className="hero-copy relative z-10 flex flex-col items-start justify-center px-7 pb-5 pt-9 sm:px-12 sm:pb-7 sm:pt-12 lg:py-14 lg:pl-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3 py-2 text-[9px] font-bold uppercase tracking-[.15em] text-[#55584f] sm:text-[10px]">
            <Sparkles size={13} style={{ color: campaign.accent }}/> {campaign.eyebrow}
          </span>
          <h1 className="mt-6 max-w-[540px] font-['Manrope'] text-[clamp(3.2rem,7vw,6.1rem)] font-extrabold leading-[.91] tracking-[-.075em] text-[#20231f]">
            {campaign.headline}
          </h1>
          <p className="mt-5 max-w-[390px] text-sm leading-7 text-[#65675e] sm:text-base">{campaign.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button onClick={onShop} className="inline-flex items-center gap-3 rounded-full bg-[#20231f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#f26a3d]">
              Shop the offer <ArrowRight size={16}/>
            </button>
            <span className="flex flex-col"><b className="text-sm font-extrabold" style={{ color: campaign.accent }}>{campaign.offer}</b><small className="mt-0.5 text-[10px] text-[#77796f]">{campaign.note}</small></span>
          </div>
          <div className="mt-8 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#77796f] sm:flex lg:mt-10">
            <span className="h-px w-9 bg-[#aaa99f]"/> Scroll to discover <ArrowDownRight size={14}/>
          </div>
        </div>

        <div className="hero-art relative min-h-[290px] overflow-hidden sm:min-h-[370px] lg:min-h-[550px]" style={{ backgroundColor: campaign.accent }}>
          <div className="hero-orbit absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full border border-white/30 sm:-right-16 sm:top-1/2 sm:h-[500px] sm:w-[500px] sm:-translate-y-1/2"/>
          <div className="hero-orbit hero-orbit-delayed absolute -right-5 top-4 h-[260px] w-[260px] rounded-full border border-white/25 sm:right-[-5px] sm:top-1/2 sm:h-[390px] sm:w-[390px] sm:-translate-y-1/2"/>
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/20"/>
          <div key={`image-${active}`} className="hero-image-enter absolute inset-0">
            <img src={campaign.image} alt={campaign.alt} className="hero-campaign-image h-full w-full object-cover"/>
          </div>
          <span className="absolute left-5 top-5 z-10 rounded-full border border-white/40 bg-black/15 px-3 py-2 text-[9px] font-bold tracking-[.16em] text-white backdrop-blur-md sm:left-8 sm:top-8">{campaign.label}</span>
          <div key={`tag-${active}`} className="hero-tag-enter absolute bottom-5 right-5 z-10 max-w-[230px] rounded-2xl border border-white/50 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:bottom-9 sm:right-9 sm:max-w-[260px] sm:p-5">
            <p className="text-[9px] font-bold uppercase tracking-[.15em]" style={{ color: campaign.accent }}>A little something special</p>
            <p className="mt-1 text-sm font-extrabold text-[#20231f] sm:text-base">{campaign.product}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-7 z-20 flex items-center gap-2 sm:bottom-6 sm:left-12 lg:bottom-7 lg:left-16">
        {campaigns.map((item, index) => <button
          key={item.label}
          onClick={() => showCampaign(index)}
          aria-label={`Show offer ${index + 1}: ${item.eyebrow}`}
          aria-current={index === active ? 'true' : undefined}
          className={`hero-indicator h-1.5 rounded-full transition-all duration-500 ${isPaused ? 'hero-indicator-paused' : ''} ${index === active ? 'w-10 bg-[#20231f]' : 'w-4 bg-[#20231f]/25 hover:bg-[#20231f]/50'}`}
        />)}
        <span className="ml-1 text-[10px] font-bold tabular-nums text-[#66685f]">0{active + 1} <span className="mx-1 text-[#a6a59c]">/</span> 0{campaigns.length}</span>
        <button onClick={() => setIsPaused(paused => !paused)} className="ml-1 grid h-8 w-8 place-items-center rounded-full text-[#55584f] transition hover:bg-black/5" aria-label={isPaused ? 'Play promotional banners' : 'Pause promotional banners'}>
          {isPaused ? <Play size={13} fill="currentColor"/> : <Pause size={13}/>}
        </button>
        <span className="hidden items-center gap-1 sm:flex">
          <button onClick={() => showCampaign(active - 1)} className="grid h-8 w-8 place-items-center rounded-full text-[#55584f] transition hover:bg-black/5" aria-label="Previous offer"><ArrowLeft size={15}/></button>
          <button onClick={() => showCampaign(active + 1)} className="grid h-8 w-8 place-items-center rounded-full text-[#55584f] transition hover:bg-black/5" aria-label="Next offer"><ArrowRight size={15}/></button>
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-3">
      {[{icon:Truck,title:'Free delivery',desc:'On orders over ₹2,000'},{icon:ShieldCheck,title:'Easy & secure',desc:'Checkout without the worry'},{icon:Headphones,title:'Here to help',desc:'Real people, ready to help'}].map(({icon:Icon,title,desc})=><div key={title} className="flex items-center gap-3 rounded-2xl border border-[#ebe8df] bg-white/70 p-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f8e9e1] text-[#e65e34]"><Icon size={18}/></span><span><b className="block text-sm text-[#292c27]">{title}</b><small className="text-xs text-[#85877f]">{desc}</small></span></div>)}
    </div>
  </section>
}
