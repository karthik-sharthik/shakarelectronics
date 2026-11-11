import { Heart, Star, ShoppingCart, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export default function ProductCard({ product, onAdd, onDetails, featured = false }) {
  const [liked, setLiked] = useState(false)
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return <article className={`product-card group relative overflow-hidden rounded-[20px] border border-[#ece9e1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#dfd9ce] hover:shadow-[0_16px_40px_rgba(38,35,27,.09)] ${featured ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_.95fr]' : ''}`}>
    <div className={`relative m-2.5 flex items-center justify-center overflow-hidden rounded-[15px] bg-[#f5f4ef] ${featured ? 'h-[230px] sm:h-[280px] lg:m-3 lg:h-auto lg:min-h-[300px]' : 'h-[220px]'}`}>
      {featured && <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#dedbd1] sm:h-64 sm:w-64" />}
      {featured && <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 sm:h-48 sm:w-48" />}
      {product.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#494b44]">{product.badge}</span>}
      <button onClick={() => setLiked(!liked)} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={liked} className={`absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm transition ${liked ? 'text-rose-500' : 'text-[#898a82] hover:text-rose-500'}`}><Heart size={15} fill={liked ? 'currentColor' : 'none'} /></button>
      <img src={product.image} alt={product.name} className={`product-image relative z-[1] h-full w-full object-contain mix-blend-multiply ${featured ? 'p-7 sm:p-9' : 'p-5'}`} loading="lazy" />
      {featured && <span className="absolute bottom-3 left-3 z-10 text-[9px] font-bold uppercase tracking-[.18em] text-[#8b8b81]">Featured find</span>}
      <span className="absolute bottom-3 right-3 z-10 rounded-full bg-[#fbe6dc] px-2 py-1 text-[9px] font-bold text-[#d95932]">{discount}% OFF</span>
    </div>
    <div className={`px-4 pb-4 ${featured ? 'lg:flex lg:flex-col lg:justify-center lg:px-7 lg:py-6' : ''}`}>
      <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#e3633b]">{product.brand} <span className="px-1 text-[#c7c4bb]">/</span> {product.category}</p>
      <button onClick={() => onDetails(product)} className="mt-1 flex w-full items-center justify-between gap-2 text-left"><h3 className={`${featured ? 'text-lg sm:text-xl' : 'text-[15px]'} truncate font-bold text-[#292c27]`}>{product.name}</h3><ArrowUpRight size={15} className="shrink-0 text-[#b3b0a7] transition group-hover:text-[#f26a3d]" /></button>
      <p className={`mt-1 line-clamp-2 text-xs leading-5 text-[#77796f] ${featured ? 'min-h-0 lg:mt-3 lg:max-w-sm lg:text-sm lg:leading-6' : 'min-h-10'}`}>{product.description}</p>
      <div className="mt-2 flex items-center gap-1 text-xs"><Star size={12} fill="#f3a332" stroke="#f3a332" /><b className="text-[#343630]">{product.rating}</b><span className="text-[#999a93]">({product.reviews})</span></div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div><b className={`${featured ? 'text-xl sm:text-2xl' : 'text-lg'} font-extrabold text-[#20231f]`}>{money(product.price)}</b><span className="ml-2 text-xs text-[#a2a198] line-through">{money(product.originalPrice)}</span></div>
        <button onClick={() => onAdd(product)} aria-label={`Add ${product.name} to cart`} className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#20231f] px-4 text-white transition hover:bg-[#f26a3d] active:scale-95 ${featured ? 'text-xs font-bold' : 'text-[10px] font-bold'}`}>
          <ShoppingCart size={16} /><span>{featured ? 'Add to cart' : 'Add'}</span>
        </button>
      </div>
    </div>
  </article>
}
