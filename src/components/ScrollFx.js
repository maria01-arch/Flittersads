'use client'
import { useEffect } from 'react'

// Scroll animations for the homepage: sections fade up as they appear,
// the floating ad examples drift at different speeds, and the top bar
// fills in once you scroll. All of it is skipped for people who ask their
// phone for reduced motion.
export default function ScrollFx() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = Array.from(document.querySelectorAll('.rv'))
    const nav = document.querySelector('.lp-nav')
    const par = Array.from(document.querySelectorAll('[data-par]'))

    let io = null
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'))
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('in')
              io.unobserve(en.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      )
      items.forEach((el) => io.observe(el))
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (nav) nav.classList.toggle('scrolled', y > 24)
        if (!reduce && y < 1400) par.forEach((el) => el.style.setProperty('--py', (y * Number(el.dataset.par)).toFixed(1)))
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      if (io) io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return null
}
