import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, PackageCheck } from 'lucide-react'
import products from './data/products.json'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import Footer from './components/Footer'

const categories = [
  {name:'All products', emoji:'✦'}, {name:'Mobiles',emoji:'📱'}, {name:'Laptops',emoji:'💻'},
  {name:'Headphones',emoji:'🎧'}, {name:'Smart TVs',emoji:'📺'}, {name:'Cameras',emoji:'📷'},
  {name:'Smartwatches',emoji:'⌚'}, {name:'Accessories',emoji:'🎮'}
]
const money = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n)

function PageIntro({onSkip}){
 return <section className="page-intro fixed inset-0 z-[100] grid min-h-[100svh] place-items-center overflow-hidden bg-[#fffaf6] px-5 text-center text-[#20231f]" role="status" aria-label="ShaKar Electronics Store introduction">
  <div aria-hidden="true" className="intro-orbit intro-orbit-one absolute left-1/2 top-1/2 h-[min(82vw,560px)] w-[min(82vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f26a3d]/10"/>
  <div aria-hidden="true" className="intro-orbit intro-orbit-two absolute left-1/2 top-1/2 h-[min(62vw,420px)] w-[min(62vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f26a3d]/25"/>
  <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f26a3d]/15 blur-[90px]"/>
  <div className="intro-content relative z-10 flex w-full max-w-lg flex-col items-center">
   <img src="/Shakar%20Electronics%20Store%20Logo.png" alt="ShaKar Electronics Store" className="intro-logo h-auto w-[min(76vw,310px)] rounded-2xl object-contain shadow-[0_20px_70px_rgba(0,0,0,.24)]"/>
   <p className="mt-8 text-[10px] font-bold uppercase tracking-[.34em] text-[#d95932]">A better way to discover tech</p>
   <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">ShaKar Electronics Store</h1>
   <p className="mt-3 text-sm text-[#77796f]">Find something made for your everyday.</p>
   <div className="mt-9 h-1 w-44 overflow-hidden rounded-full bg-[#e8e5dc]" role="presentation"><span className="intro-progress block h-full w-full origin-left rounded-full bg-[#f26a3d]"/></div>
   <button onClick={onSkip} className="mt-7 rounded-full border border-[#e1ddd3] px-4 py-2 text-[10px] font-semibold text-[#65675e] transition hover:border-[#f26a3d] hover:text-[#d95932]">Skip intro <ArrowRight size={12} className="ml-1 inline"/></button>
  </div>
 </section>
}

function CartDrawer({cart,onClose,onQty,onRemove}){
 const [checkout,setCheckout] = useState(false)
 const subtotal = cart.reduce((s,p)=>s+p.price*p.qty,0)
 const delivery = subtotal===0 || subtotal>=2000 ? 0 : 99
 const savings = cart.reduce((sum,p)=>sum+(p.originalPrice-p.price)*p.qty,0)
 const itemCount = cart.reduce((sum,p)=>sum+p.qty,0)
 return <div className="fixed inset-0 z-[60] flex justify-end bg-[#20231f]/55 p-0 backdrop-blur-sm sm:p-3 lg:p-5" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
  <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="flex h-full w-full max-w-6xl flex-col overflow-hidden bg-[#f7f6f1] shadow-2xl sm:rounded-[28px]">
   <header className="flex items-center justify-between border-b border-[#e7e4dc] bg-[#fffefa] px-5 py-4 sm:px-8 sm:py-5">
    <div className="flex items-center gap-3 sm:gap-4"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#20231f] text-[#f26a3d]"><ShoppingBag size={20}/></span><div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#f26a3d]">Your selection</p><h2 id="cart-title" className="mt-0.5 text-xl font-extrabold tracking-tight text-[#20231f] sm:text-2xl">{checkout?'Order preview':'Your cart'}</h2></div></div>
    <div className="flex items-center gap-3"><span className="hidden rounded-full bg-[#f1efe8] px-3 py-1.5 text-[10px] font-bold text-[#65675e] sm:block">{itemCount} {itemCount===1?'item':'items'}</span><button onClick={onClose} aria-label="Close cart" className="grid h-10 w-10 place-items-center rounded-full border border-[#e8e5dc] bg-white text-[#565951] transition hover:bg-[#f5f4ef]"><X size={18}/></button></div>
   </header>
   {checkout ? <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 text-center">
    <span className="grid h-20 w-20 place-items-center rounded-[28px] bg-[#e8efe7] text-[#436853]"><PackageCheck size={34}/></span><p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#436853]">Everything looks good</p><h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[#20231f]">Order preview ready!</h3><p className="mt-3 max-w-md text-sm leading-6 text-[#77796f]">This is a storefront demo. Connect a payment gateway and backend to complete real orders.</p><div className="mt-6 rounded-2xl bg-white px-6 py-4"><span className="text-xs text-[#77796f]">Estimated total</span><p className="mt-1 text-2xl font-extrabold text-[#20231f]">{money(subtotal+delivery)}</p></div><button onClick={()=>{setCheckout(false);onClose()}} className="mt-6 rounded-full bg-[#20231f] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#f26a3d]">Continue shopping</button>
   </div> :
   <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_340px] lg:grid-rows-1 lg:overflow-hidden">
    <section className="flex flex-col px-4 py-5 sm:px-8 sm:py-7 lg:min-h-0">
     <div className="mb-4 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f26a3d]">The good stuff</p><h3 className="mt-1 text-lg font-extrabold text-[#20231f]">Your bag, your picks</h3></div><span className="text-[10px] text-[#999a93]">Prices include taxes</span></div>
     <div className="space-y-3 pr-1 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
      {cart.length===0?<div className="flex min-h-[300px] h-full flex-col items-center justify-center rounded-[24px] border border-dashed border-[#d9d6cd] bg-[#fffefa] px-6 text-center"><span className="grid h-16 w-16 place-items-center rounded-[22px] bg-[#f1efe8] text-[#898a82]"><ShoppingBag size={27}/></span><h3 className="mt-4 text-lg font-extrabold text-[#292c27]">A little space for something good.</h3><p className="mt-1 max-w-xs text-sm leading-6 text-[#999a93]">Your cart is empty. Add a favourite from the collection and it’ll show up here.</p><button onClick={onClose} className="mt-5 rounded-full bg-[#20231f] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#f26a3d]">Explore the collection <ArrowRight size={14} className="ml-1 inline"/></button></div>:
       cart.map((p,index)=><article key={p.id} className="grid grid-cols-[76px_minmax(0,1fr)] items-center gap-3 rounded-[20px] border border-[#e9e6de] bg-[#fffefa] p-3 sm:grid-cols-[28px_96px_minmax(0,1fr)_auto] sm:gap-4 sm:p-4">
        <span className="hidden text-[10px] font-bold tabular-nums text-[#b3b0a7] sm:block">{String(index+1).padStart(2,'0')}</span>
        <div className="grid h-[76px] w-[76px] place-items-center overflow-hidden rounded-2xl bg-[#f5f4ef] sm:h-24 sm:w-24"><img src={p.image} alt={p.name} className="h-full w-full object-contain p-2"/></div>
        <div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[.14em] text-[#e3633b]">{p.brand} · {p.category}</p><h4 className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-[#292c27] sm:text-sm">{p.name}</h4><div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1"><div className="inline-flex items-center gap-2 rounded-full border border-[#e8e5dc] bg-white px-2 py-1"><button onClick={()=>onQty(p.id,-1)} aria-label={`Decrease ${p.name} quantity`} className="grid h-5 w-5 place-items-center rounded-full text-[#77796f] transition hover:bg-[#f1efe8]"><Minus size={12}/></button><span className="min-w-4 text-center text-[10px] font-bold tabular-nums">{p.qty}</span><button onClick={()=>onQty(p.id,1)} aria-label={`Increase ${p.name} quantity`} className="grid h-5 w-5 place-items-center rounded-full text-[#77796f] transition hover:bg-[#f1efe8]"><Plus size={12}/></button></div><button onClick={()=>onRemove(p.id)} aria-label={`Remove ${p.name} from cart`} className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#999a93] transition hover:text-rose-600"><Trash2 size={12}/> Remove</button></div></div>
        <div className="col-span-2 flex items-center justify-between border-t border-[#f0eee8] pt-2 sm:col-span-1 sm:block sm:border-0 sm:pt-0 sm:text-right"><span className="text-[10px] text-[#999a93] sm:hidden">{money(p.price)} each</span><div><span className="block text-sm font-extrabold tabular-nums text-[#20231f]">{money(p.price*p.qty)}</span><span className="hidden text-[9px] text-[#999a93] sm:block">{p.qty>1?`${p.qty} × ${money(p.price)}`:'1 item'}</span></div></div>
       </article>)}
     </div>
     {cart.length>0&&<div className="mt-4 flex items-center justify-between border-t border-[#e7e4dc] pt-4"><p className="text-[10px] text-[#999a93]">Need to change your mind?</p><button onClick={onClose} className="text-[10px] font-bold text-[#565951] transition hover:text-[#f26a3d]">Keep browsing <ArrowRight size={12} className="ml-1 inline"/></button></div>}
    </section>
    <aside className="flex flex-col border-t border-[#e7e4dc] bg-[#eeece5] p-5 sm:p-7 lg:border-l lg:border-t-0">
     <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f26a3d]">Order summary</p><h3 className="mt-1 text-xl font-extrabold tracking-tight text-[#20231f]">The numbers</h3>
     <div className="mt-6 space-y-4 text-xs"><div className="flex justify-between text-[#77796f]"><span>Items ({itemCount})</span><span className="font-semibold text-[#343630]">{money(subtotal)}</span></div><div className="flex justify-between text-[#77796f]"><span>Delivery</span><span className={`font-bold ${cart.length&&delivery===0?'text-[#436853]':'text-[#343630]'}`}>{cart.length===0?'—':delivery===0?'On us':money(delivery)}</span></div>{savings>0&&<div className="flex justify-between text-[#436853]"><span>You’re saving</span><span className="font-bold">− {money(savings)}</span></div>}</div>
     <div className="my-5 border-t border-dashed border-[#d2cfc5]"/>
     <div className="flex items-end justify-between"><span className="text-xs font-bold text-[#565951]">Total due</span><span className="text-2xl font-extrabold tracking-tight tabular-nums text-[#20231f]">{money(subtotal+delivery)}</span></div>
     <div className="mt-5 rounded-2xl bg-[#20231f] p-4 text-white"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-white/60">Little extra</span><span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold text-[#b8d0b6]">{cart.length===0?'WAITING':delivery===0?'FREE DELIVERY':'IN PROGRESS'}</span></div><p className="mt-2 text-xs leading-5 text-white/80">{cart.length===0?'Add a product to see your delivery details.':delivery===0?'Your order ships free. Good choice.':`Add ${money(2000-subtotal)} for free delivery.`}</p></div>
     <button disabled={!cart.length} onClick={()=>setCheckout(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#f26a3d] py-3.5 text-sm font-bold text-white transition hover:bg-[#d95932] disabled:cursor-not-allowed disabled:bg-[#c8c6bf]">Continue to checkout <ArrowRight size={17}/></button>
     <p className="mt-3 text-center text-[9px] leading-5 text-[#999a93]">Secure checkout · Free delivery over ₹2,000</p>
    </aside>
   </div>}
  </aside>
 </div>
}

export default function App(){
 const [introVisible,setIntroVisible] = useState(true)
 const [search,setSearch] = useState('')
 const [category,setCategory] = useState('All products')
 const [sort,setSort] = useState('featured')
 const [maxPrice,setMaxPrice] = useState(150000)
 const [cart,setCart] = useState([])
 const [cartOpen,setCartOpen] = useState(false)
 const [selected,setSelected] = useState(null)
 useEffect(()=>{
  if(!introVisible) return undefined
  const timer=window.setTimeout(()=>setIntroVisible(false),5000)
  return ()=>window.clearTimeout(timer)
 },[introVisible])
 const cartCount = cart.reduce((s,p)=>s+p.qty,0)
 const filtered = useMemo(()=>{
  let list = products.filter(p=>(category==='All products'||p.category===category) && (p.name+' '+p.brand+' '+p.description).toLowerCase().includes(search.toLowerCase()) && p.price<=maxPrice)
  if(sort==='low') list.sort((a,b)=>a.price-b.price)
  if(sort==='high') list.sort((a,b)=>b.price-a.price)
  if(sort==='rating') list.sort((a,b)=>b.rating-a.rating)
  return list
 },[category,search,sort,maxPrice])
 const addToCart = product => setCart(old=>{const found=old.find(p=>p.id===product.id);return found?old.map(p=>p.id===product.id?{...p,qty:p.qty+1}:p):[...old,{...product,qty:1}]})
 const updateQty = (id,delta)=>setCart(old=>old.map(p=>p.id===id?{...p,qty:p.qty+delta}:p).filter(p=>p.qty>0))
 const scrollProducts = ()=>document.getElementById('products')?.scrollIntoView({behavior:'smooth'})
 const groupedProducts = categories.slice(1).map(({name,emoji})=>({
  name,
  emoji,
  items:filtered.filter(product=>product.category===name)
 })).filter(group=>group.items.length>0)
 const productCard = (product,index,featured=false)=> <div key={product.id} className={`category-product-enter ${featured?'lg:col-span-2':''}`} style={{animationDelay:`${index*90}ms`}}><ProductCard product={product} onAdd={addToCart} onDetails={setSelected} featured={featured}/></div>
 return <>
  {introVisible&&<PageIntro onSkip={()=>setIntroVisible(false)}/>}
  <Header search={search} setSearch={setSearch} cartCount={cartCount} onCart={()=>setCartOpen(true)} onHome={()=>window.scrollTo({top:0,behavior:'smooth'})}/>
  <Hero onShop={scrollProducts}/>
  <main className="container-shell pt-8">
   <section id="categories" className="scroll-mt-28">
    <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-600">A good place to start</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Find your next <span className="gradient-text">favourite.</span></h2></div><span className="hidden text-xs text-slate-400 sm:block">Curated tech for every day</span></div>
    <div className="mt-6 flex gap-2 overflow-x-auto pb-3">{categories.map(c=>{
      const count=c.name==='All products'?products.length:products.filter(product=>product.category===c.name).length
      return <button key={c.name} onClick={()=>{setCategory(c.name);scrollProducts()}} aria-pressed={category===c.name} className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition ${category===c.name?'border-[#20231f] bg-[#20231f] text-white shadow-lg shadow-slate-300/30':'border-[#e8e5dc] bg-white/70 text-slate-600 hover:-translate-y-0.5 hover:border-[#f26a3d]/50 hover:bg-white'}`}><span className={`grid h-9 w-9 place-items-center rounded-xl text-lg ${category===c.name?'bg-white/10':'bg-[#f1efe8]'}`}>{c.emoji}</span><span className="flex flex-col"><span className="text-xs font-bold">{c.name}</span><span className={`mt-0.5 text-[9px] ${category===c.name?'text-white/60':'text-slate-400'}`}>{count} {count===1?'item':'items'}</span></span></button>
    })}</div>
   </section>
   <section id="products" className="scroll-mt-28 pt-14">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-600">The good stuff</p><h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Meet your new favourites</h2><p className="mt-2 text-sm text-slate-500">Thoughtful picks. Brilliant technology. Better everyday.</p></div></div>
    <div className="mt-6 overflow-hidden rounded-[24px] bg-[#20231f] p-4 text-white shadow-[0_18px_40px_rgba(32,35,31,.12)] sm:p-5">
     <div className="flex flex-col gap-3 lg:flex-row">
      <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl bg-white px-4 text-[#77796f] transition focus-within:ring-2 focus-within:ring-[#f26a3d]">
       <Search size={18} className="shrink-0 text-[#f26a3d]"/>
       <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, brands, or features..." aria-label="Search products" className="min-w-0 flex-1 bg-transparent text-sm text-[#292c27] outline-none placeholder:text-[#aaa99f]"/>
       {search&&<button type="button" onClick={()=>setSearch('')} aria-label="Clear search" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f1efe8] text-[#77796f] hover:bg-[#ece9e1]"><X size={14}/></button>}
      </label>
      <label className="flex min-h-12 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 text-xs font-semibold text-white/65 lg:min-w-[220px]">
       <span>Sort by</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products" className="max-w-[155px] bg-transparent text-right text-sm font-bold text-white outline-none"><option className="text-[#292c27]" value="featured">Featured</option><option className="text-[#292c27]" value="low">Price: low to high</option><option className="text-[#292c27]" value="high">Price: high to low</option><option className="text-[#292c27]" value="rating">Top rated</option></select>
      </label>
     </div>
     <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
       <div className="flex items-center justify-between gap-4 text-xs"><span className="inline-flex items-center gap-2 font-semibold text-white/70"><SlidersHorizontal size={14} className="text-[#f26a3d]"/> Maximum price</span><span className="font-bold tabular-nums text-white">{money(maxPrice)}<span className="ml-1 font-normal text-white/45">and under</span></span></div>
       <input type="range" min="4000" max="150000" step="1000" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} aria-label="Maximum product price" className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#f26a3d]"/>
       <div className="mt-1 flex justify-between text-[9px] text-white/40"><span>₹4,000</span><span>₹1,50,000</span></div>
      </div>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
       <p className="text-xs text-white/55"><span className="font-bold text-white">{filtered.length}</span> {filtered.length===1?'match':'matches'} found</p>
       {(search||category!=='All products'||maxPrice<150000||sort!=='featured')&&<button onClick={()=>{setSearch('');setCategory('All products');setMaxPrice(150000);setSort('featured')}} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-[10px] font-bold text-white/75 transition hover:border-[#f26a3d] hover:text-white"><X size={12}/> Reset</button>}
      </div>
     </div>
    </div>
    <div className="mt-5 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">{category==='All products'?'Browsing all departments':`Filtered by ${category}`}</p>{category!=='All products'&&<button onClick={()=>setCategory('All products')} className="text-xs font-bold text-violet-600">Clear category ×</button>}</div>
    {filtered.length ? category==='All products'
      ? <div className="mt-8 space-y-14">{groupedProducts.map(group=><section key={group.name} aria-label={`${group.name} products`} className="category-section">
        <div className="mb-5 flex flex-col items-start gap-3 min-[480px]:flex-row min-[480px]:items-end min-[480px]:justify-between">
         <div><p className="text-xs font-bold uppercase tracking-[.18em] text-violet-600">Good things for every day</p><h3 className="mt-1 flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#292c27] sm:text-2xl"><span aria-hidden="true">{group.emoji}</span>{group.name}<span className="rounded-full bg-[#ece9e1] px-2 py-1 text-[10px] font-bold text-[#72746b]">{group.items.length} picks</span></h3></div>
         <button onClick={()=>setCategory(group.name)} className="shrink-0 rounded-full border border-[#e3dfd5] bg-white/70 px-4 py-2 text-[11px] font-bold text-[#484a43] transition hover:border-violet-300 hover:text-violet-700">Shop {group.name} <ArrowRight size={13} className="ml-1 inline"/></button>
        </div>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">{group.items.map((product,index)=>productCard(product,index,group.items.length>1&&index===0))}</div>
       </section>)}</div>
      : <div className="mt-4 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map((product,index)=>productCard(product,index,filtered.length>1&&index===0))}</div>
      : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center"><p className="text-3xl">🔎</p><h3 className="mt-3 font-bold">No products found</h3><p className="mt-1 text-sm text-slate-400">Try another search or clear your filters.</p><button onClick={()=>{setSearch('');setCategory('All products');setMaxPrice(150000)}} className="mt-4 rounded-full bg-violet-600 px-5 py-2.5 text-xs font-bold text-white">Reset search</button></div>}
   </section>
   <section className="mt-16 overflow-hidden rounded-[26px] bg-violet-50 px-6 py-8 sm:flex sm:items-center sm:justify-between sm:px-10"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-600">A little extra</p><h2 className="mt-2 text-2xl font-extrabold">Good tech. Great energy.</h2><p className="mt-2 text-sm text-slate-500">Sign up for product drops and offers worth opening.</p></div><form onSubmit={e=>{e.preventDefault();e.currentTarget.reset();alert('Thanks for subscribing!')}} className="mt-5 flex max-w-md rounded-full bg-white p-1.5 shadow-sm sm:mt-0"><input type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"/><button className="shrink-0 rounded-full bg-violet-600 px-5 py-3 text-xs font-bold text-white hover:bg-violet-700">Subscribe</button></form></section>
  </main>
  <Footer/>
  {selected&&<ProductModal product={selected} onClose={()=>setSelected(null)} onAdd={addToCart}/>}
  {cartOpen&&<CartDrawer cart={cart} onClose={()=>setCartOpen(false)} onQty={updateQty} onRemove={id=>setCart(c=>c.filter(p=>p.id!==id))}/>}
 </>
}
