'use client'
import { useState } from 'react'

export default function OnboardingClient({ email, countries }) {
  const [business, setBusiness] = useState('')
  const [contact, setContact] = useState(email || '')
  const [country, setCountry] = useState('')
  const [agree, setAgree] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/advertiser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_profile', business_name: business, contact_email: contact, country_code: country, accepted_terms: agree }),
      })
      const j = await res.json().catch(() => ({}))
      if (res.status === 401) {
        window.location.href = '/login'
        return
      }
      if (!res.ok) throw new Error(j.error || 'Something went wrong')
      window.location.href = '/'
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="login">
      <div className="login-box">
        <h1 className="login-title">Your business</h1>
        <p className="lead">Tell us who is advertising. This appears on your ads.</p>
        {error ? <p className="err" role="alert">{error}</p> : null}
        <form onSubmit={onSubmit} className="stack">
          <label className="field"><span>Business name</span><input value={business} maxLength={80} onChange={(e) => setBusiness(e.target.value)} required /></label>
          <label className="field">
            <span>Country (sets your price and currency)</span>
            <select value={country} onChange={(e) => setCountry(e.target.value)} required>
              <option value="">Choose…</option>
              {countries.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </label>
          <label className="field"><span>Contact email (for receipts and ad decisions)</span><input type="email" value={contact} onChange={(e) => setContact(e.target.value)} required /></label>
          <label className="permrow">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>I agree to the Flitters Ads terms and ad policy, and I confirm I am allowed to advertise for this business.</span>
          </label>
          <button type="submit" className="btn btn-primary btn-wide" disabled={busy || !agree}>{busy ? 'Saving…' : 'Continue'}</button>
        </form>
      </div>
    </div>
  )
}
