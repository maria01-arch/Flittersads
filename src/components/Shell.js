'use client'
import { useEffect, useRef, useState } from 'react'
import { getBrowserClient } from '@/lib/supabase/browser'
import ConfirmDialog from '@/components/ConfirmDialog'

const IDLE_MS = 60 * 60 * 1000

export default function Shell({ business, email, nav, children }) {
  const [confirmOut, setConfirmOut] = useState(false)
  const [busy, setBusy] = useState(false)
  const timer = useRef(null)

  async function signOut(reason) {
    setBusy(true)
    try {
      await getBrowserClient().auth.signOut()
    } catch {}
    window.location.href = '/login' + (reason ? '?reason=' + reason : '')
  }

  // Signs out after an hour with no touch, key press or scroll.
  useEffect(() => {
    const reset = () => {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => signOut('idle'), IDLE_MS)
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
      <header className="topbar">
        <div className="topbar-id">
          <strong className="wordmark">Flitters Ads</strong>
          <span className="who">{business} · {email}</span>
        </div>
        <button type="button" className="btn btn-small" onClick={() => setConfirmOut(true)}>Sign out</button>
      </header>
      <nav className="navbar" aria-label="Sections">
        {nav.map((n) =>
          n.soon ? (
            <span key={n.label} className="navitem navitem-soon" aria-disabled="true">{n.label}<small>soon</small></span>
          ) : (
            <a key={n.label} href={n.href} className="navitem navitem-on">{n.label}</a>
          )
        )}
      </nav>
      <main className="main">{children}</main>
      <ConfirmDialog
        open={confirmOut}
        title="Sign out?"
        message="Your campaigns keep running while you are signed out."
        confirmLabel="Sign out"
        busy={busy}
        onConfirm={() => signOut()}
        onCancel={() => setConfirmOut(false)}
      />
    </div>
  )
}
