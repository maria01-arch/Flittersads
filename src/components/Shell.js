'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getBrowserClient } from '@/lib/supabase/browser'
import Icon from '@/components/Icon'

const IDLE_MS = 60 * 60 * 1000
const NAV = [
  ['/dashboard', 'Dashboard', 'home'],
  ['/campaigns', 'Campaigns', 'list'],
  ['/billing', 'Billing', 'receipt'],
  ['/account', 'Account', 'user'],
]
const isOn = (path, href) => path === href || path.startsWith(href + '/')

export default function Shell({ business, email, children }) {
  const path = usePathname() || '/'
  const timer = useRef(null)

  // Signs out after an hour with no touch, key press or scroll.
  useEffect(() => {
    const out = async () => {
      try { await getBrowserClient().auth.signOut() } catch {}
      window.location.href = '/login?reason=idle'
    }
    const reset = () => {
      clearTimeout(timer.current)
      timer.current = setTimeout(out, IDLE_MS)
    }
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart']
    events.forEach((ev) => window.addEventListener(ev, reset, { passive: true }))
    reset()
    return () => {
      clearTimeout(timer.current)
      events.forEach((ev) => window.removeEventListener(ev, reset))
    }
  }, [])

  return (
    <div className="shell">
      <aside className="side">
        <a className="brand" href="/dashboard"><span className="logo-mark">F</span>Flitters <b>Ads</b></a>
        <a className="btn btn-accent btn-wide" href="/create"><Icon name="plus" />Create campaign</a>
        <nav className="side-nav" aria-label="Sections">
          {NAV.map(([href, label, icon]) => (
            <a key={href} href={href} className={'side-link' + (isOn(path, href) ? ' on' : '')}><Icon name={icon} />{label}</a>
          ))}
        </nav>
        <div className="side-foot"><strong>{business}</strong><small>{email}</small></div>
      </aside>
      <div className="main-col">
        <header className="appbar">
          <a className="brand" href="/dashboard"><span className="logo-mark">F</span>Flitters <b>Ads</b></a>
          <span className="chipbiz">{business}</span>
        </header>
        <main className="page">{children}</main>
      </div>
      <nav className="tabbar" aria-label="Sections">
        <a href="/dashboard" className={'tab' + (isOn(path, '/dashboard') ? ' on' : '')}><Icon name="home" />Home</a>
        <a href="/campaigns" className={'tab' + (isOn(path, '/campaigns') ? ' on' : '')}><Icon name="list" />Campaigns</a>
        <a href="/create" className="tab tab-new" aria-label="New campaign"><span><Icon name="plus" /></span><em>New</em></a>
        <a href="/billing" className={'tab' + (isOn(path, '/billing') ? ' on' : '')}><Icon name="receipt" />Billing</a>
        <a href="/account" className={'tab' + (isOn(path, '/account') ? ' on' : '')}><Icon name="user" />Account</a>
      </nav>
    </div>
  )
}
