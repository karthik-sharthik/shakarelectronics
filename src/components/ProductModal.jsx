import { X, Star, ShoppingCart, Truck, ShieldCheck } from 'lucide-react'

const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)

export default function ProductModal({ product, onClose, onAdd }) {
  if (!product) return null

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)
  const savings = product.originalPrice - product.price

  return <div onMouseDown={e => e.target === e.currentTarget && onClose()} className="fixed inset-0 z-50 grid place-items-center bg-[#20231f]/55 p-3 backdrop-blur-sm sm:p-6">
    <section role="dialog" aria-modal="true" aria-labelledby="product-details-title" className="relative grid max-h-[92vh] w-full max-w-4xl gap-0 overflow-y-auto rounded-[26px] border border-[#ece9e1] bg-[#fffefa] shadow-2xl sm:grid-cols-[.95fr_1.05fr]">
      <button onClick={onClose} aria-label="Close product details" className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[#e8e5dc] bg-white/90 text-[#565951] transition hover:bg-[#f5f4ef]"><X size={18}/></button>

      <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-[#f5f4ef] p-8 sm:min-h-[520px] sm:p-10">
        <span aria-hidden="true" className="absolute h-56 w-56 rounded-full border border-[#e0ddd4] sm:h-72 sm:w-72"/>
        <span aria-hidden="true" className="absolute h-40 w-40 rounded-full bg-white/70 sm:h-56 sm:w-56"/>
        <img src={product.image} alt={product.name} className="relative z-[1] max-h-[300px] w-full object-contain mix-blend-multiply sm:max-h-[400px]"/>
        <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#565951]">{product.category}</span>
        <span className="absolute bottom-4 right-4 rounded-full bg-[#fbe6dc] px-3 py-1.5 text-[10px] font-bold text-[#d95932]">Save {discount}%</span>
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e3633b]">{product.brand} <span className="px-1 text-[#c7c4bb]">/</span> Product details</p>
        <h2 id="product-details-title" className="mt-2 pr-8 text-2xl font-extrabold tracking-tight text-[#20231f] sm:text-3xl">{product.name}</h2>
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          <Star size={15} fill="#f3a332" stroke="#f3a332"/>
          <b className="text-[#343630]">{product.rating}</b>
          <span className="text-[#999a93]">({product.reviews} reviews)</span>
        </div>

        <section aria-label="Description" className="mt-6 border-t border-[#ece9e1] pt-5">
          <h3 className="text-xs font-bold uppercase tracking-[.14em] text-[#77796f]">Overview</h3>
          <p className="mt-2 text-sm leading-6 text-[#65675e]">{product.description}</p>
        </section>

        <section aria-label="Pricing" className="mt-5 rounded-2xl bg-[#f5f4ef] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#77796f]">Today’s price</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <b className="text-2xl font-extrabold tracking-tight text-[#20231f]">{money(product.price)}</b>
            <span className="text-sm text-[#999a93] line-through">{money(product.originalPrice)}</span>
            <span className="rounded-full bg-[#fbe6dc] px-2 py-1 text-[10px] font-bold text-[#d95932]">{money(savings)} off</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-[#77796f]">
            <span className="inline-flex items-center gap-1.5"><Truck size={13} className="text-[#e3633b]"/> Free delivery over ₹2,000</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#e3633b]"/> Secure checkout</span>
          </div>
        </section>

        <section aria-label="Specifications" className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-[.14em] text-[#77796f]">Specifications</h3>
          <dl className="mt-2 grid grid-cols-1 gap-x-5 sm:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => <div key={key} className="flex justify-between gap-3 border-b border-[#ece9e1] py-2.5 text-xs">
              <dt className="text-[#999a93]">{key}</dt>
              <dd className="text-right font-semibold text-[#343630]">{value}</dd>
            </div>)}
          </dl>
        </section>

        <button onClick={() => { onAdd(product); onClose() }} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#20231f] py-3.5 text-sm font-bold text-white transition hover:bg-[#f26a3d]">
          <ShoppingCart size={17}/> Add to cart
        </button>
      </div>
    </section>
  </div>
}
