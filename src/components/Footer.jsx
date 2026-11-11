import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'

const mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=76.9358%2C10.9968%2C76.9758%2C11.0368&layer=mapnik&marker=11.0168%2C76.9558'
const directionsUrl = 'https://www.openstreetmap.org/?mlat=11.0168&mlon=76.9558#map=15/11.0168/76.9558'

const faqs = [
  { question: 'Where do you deliver?', answer: 'We deliver across India. Delivery times can vary by location and product.' },
  { question: 'How do I get help with an order?', answer: 'Email hello@shakarelectronics.example or call +91 98765 43210 and our support team can help.' },
  { question: 'Can I return a product?', answer: 'For return and warranty assistance, contact our support team with your order details.' }
]

export default function Footer() {
  return <footer id="footer" className="relative mt-20 overflow-hidden bg-[#20231f] text-white">
    <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-40 h-[420px] w-[420px] rounded-full border border-white/[.06]"/>
    <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-[290px] w-[290px] rounded-full border border-white/[.06]"/>
    <div className="container-shell relative py-12 sm:py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.05fr_.72fr_1.08fr_1.25fr] lg:gap-8">
        <section aria-labelledby="footer-about">
          <a href="#home" className="inline-flex items-center gap-3" aria-label="ShaKar Electronics Store home">
            <img src="/Shakar%20Electronics%20Store%20Logo.png" alt="ShaKar Electronics Store" className="h-14 w-[84px] rounded-lg object-contain sm:h-16 sm:w-24"/>
            <span className="max-w-[155px] text-sm font-extrabold leading-tight tracking-tight text-white sm:text-base">ShaKar<br/>Electronics Store</span>
          </a>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#f26a3d]">About us</p>
          <h2 id="footer-about" className="mt-2 max-w-xs text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">Good technology. A little more extraordinary.</h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#b3b4ad]">We bring together thoughtful tech picks for the everyday moments that matter.</p>
          <div className="mt-5 flex gap-2">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[#d9d9d2] transition hover:border-[#f26a3d] hover:bg-[#f26a3d] hover:text-white"><Instagram size={16}/></a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[#d9d9d2] transition hover:border-[#f26a3d] hover:bg-[#f26a3d] hover:text-white"><Facebook size={16}/></a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X / Twitter" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-[#d9d9d2] transition hover:border-[#f26a3d] hover:bg-[#f26a3d] hover:text-white"><Twitter size={16}/></a>
          </div>
        </section>

        <nav aria-label="Explore ShaKar Electronics Store">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#92948b]">Explore</p>
          <ul className="mt-5 space-y-3.5 text-sm text-[#d0d1cb]">
            <li><a href="#home" className="transition hover:text-[#f26a3d]">About ShaKar</a></li>
            <li><a href="#products" className="transition hover:text-[#f26a3d]">Shop all products</a></li>
            <li><a href="#categories" className="transition hover:text-[#f26a3d]">Browse categories</a></li>
            <li><a href="#products" className="transition hover:text-[#f26a3d]">Offers &amp; deals</a></li>
          </ul>
        </nav>

        <section aria-labelledby="footer-support">
          <p id="footer-support" className="text-[10px] font-bold uppercase tracking-[.2em] text-[#92948b]">Customer support</p>
          <div className="mt-5 space-y-3.5 text-sm text-[#d0d1cb]">
            <a href="mailto:hello@shakarelectronics.example" className="flex items-center gap-3 transition hover:text-[#f26a3d]"><Mail size={15} className="shrink-0 text-[#f26a3d]"/> hello@shakarelectronics.example</a>
            <a href="tel:+919876543210" className="flex items-center gap-3 transition hover:text-[#f26a3d]"><Phone size={15} className="shrink-0 text-[#f26a3d]"/> +91 98765 43210</a>
          </div>
          <div id="faqs" className="mt-6 border-t border-white/10 pt-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#92948b]">FAQs</p>
            {faqs.map((faq,index)=><details key={faq.question} id={`faq-${index}`} className="group border-b border-white/10 py-2.5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-[#d0d1cb] marker:hidden transition hover:text-white">
                {faq.question}<span aria-hidden="true" className="text-[#f26a3d] transition group-open:rotate-45">+</span>
              </summary>
              <p className="pt-2 pr-4 text-[11px] leading-5 text-[#92948b]">{faq.answer}</p>
            </details>)}
          </div>
        </section>

        <section aria-labelledby="footer-location">
          <div className="flex items-start justify-between gap-3">
            <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#92948b]">Come say hello</p><h2 id="footer-location" className="mt-1 text-lg font-extrabold">Find us in Coimbatore</h2></div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f26a3d]/15 text-[#f26a3d]"><MapPin size={17}/></span>
          </div>
          <p className="mt-2 text-xs text-[#b3b4ad]">Coimbatore, Tamil Nadu, India</p>
          <div className="mt-4 overflow-hidden rounded-[18px] border border-white/10 bg-[#30342f]">
            <iframe
              title="ShaKar Electronics Store location in Coimbatore on OpenStreetMap"
              src={mapUrl}
              className="block h-[190px] w-full border-0 sm:h-[210px]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#f26a3d] transition hover:text-[#ff9878]">
            Open map &amp; directions <ArrowUpRight size={14}/>
          </a>
        </section>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container-shell flex flex-col justify-between gap-2 py-5 text-[10px] text-[#92948b] sm:flex-row sm:items-center">
        <span>© 2026 ShaKar Electronics Store. Demo storefront.</span>
        <span>Thoughtful tech for everyday life · Coimbatore, Tamil Nadu</span>
      </div>
    </div>
  </footer>
}
