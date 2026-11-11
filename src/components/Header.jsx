import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

export default function Header({ search, setSearch, cartCount, onCart, onHome }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return <>
    <div className="bg-[#1d211e] px-4 py-2 text-center text-[10px] font-semibold tracking-[.12em] text-white sm:text-[11px]">
      GOOD THINGS, DELIVERED FREE ON ORDERS OVER ₹2,000 <span className="mx-2 text-orange-300">✳</span> UP TO 40% OFF SELECTED TECH
    </div>
    <header className="sticky top-0 z-40 border-b border-[#e9e6de] bg-[#f7f6f1]/95 backdrop-blur-xl">
      <div className="container-shell flex h-[76px] items-center justify-between gap-5">
        <button onClick={onHome} aria-label="ShaKar Electronics Store home" className="flex shrink-0 items-center gap-2 text-left">
          <img src="/Shakar%20Electronics%20Store%20Logo.png" alt="" className="h-10 w-[60px] rounded-md object-contain sm:h-12 sm:w-[72px]"/>
          <span className="flex max-w-[105px] flex-col text-[11px] font-extrabold leading-tight tracking-tight text-[#20231f] sm:max-w-[130px] sm:text-sm"><span>ShaKar</span><span>Electronics Store</span></span>
        </button>
        <nav className={`${menuOpen ? 'absolute left-0 right-0 top-[76px] flex flex-col border-b border-[#e9e6de] bg-[#f7f6f1] p-5 shadow-xl' : 'hidden'} items-center gap-8 text-[13px] font-semibold text-[#565951] md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          <a href="#home" onClick={() => setMenuOpen(false)} className="transition hover:text-[#f26a3d]">Home</a>
          <a href="#products" onClick={() => setMenuOpen(false)} className="transition hover:text-[#f26a3d]">Shop all</a>
          <a href="#categories" onClick={() => setMenuOpen(false)} className="transition hover:text-[#f26a3d]">Categories</a>
          <a href="#footer" onClick={() => setMenuOpen(false)} className="transition hover:text-[#f26a3d]">Our story</a>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-3">
          <label className="hidden max-w-[230px] flex-1 items-center gap-2 rounded-full border border-[#e6e3db] bg-white/70 px-4 py-2.5 sm:flex">
            <Search size={16} className="text-[#85877f]"/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your next favourite" className="w-full bg-transparent text-xs outline-none placeholder:text-[#999a93]"/>
          </label>
          <button onClick={onCart} className="relative grid h-10 w-10 place-items-center rounded-full text-[#292c27] transition hover:bg-[#ece9e1]" aria-label="Open cart">
            <ShoppingBag size={19}/>{cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f26a3d] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
          </button>
          <a href="#products" className="hidden items-center gap-1 rounded-full bg-[#20231f] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#f26a3d] lg:flex">Shop now <ArrowUpRight size={14}/></a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full bg-[#ece9e1] md:hidden" aria-label="Toggle menu">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
        </div>
      </div>
      <div className="container-shell pb-3 sm:hidden">
        <label className="flex items-center gap-2 rounded-full border border-[#e6e3db] bg-white/70 px-4 py-2.5"><Search size={16} className="text-[#85877f]"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your next favourite" className="w-full bg-transparent text-sm outline-none"/></label>
      </div>
    </header>
  </>
}
