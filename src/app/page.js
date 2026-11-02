import { redirect } from 'next/navigation'
import { getAdvertiserContext } from '@/lib/advertiser'

export const dynamic = 'force-dynamic'

const STEPS = [
  ['01', 'Create your account', 'Sign up with your email and tell us about your business. It takes a minute.'],
  ['02', 'Build your ad', 'Choose the feed or Reels, add a picture or video, a short message and your link. Watch a live preview as you go.'],
  ['03', 'Pay securely', 'Pick your dates and see the exact price before you pay. Pay by card through Paystack.'],
  ['04', 'Go live', 'We review your ad within 24 hours. Once approved, it runs on your dates and you follow views and clicks.'],
]

const WHY = [
  ['Pay by the day', 'Choose how many days to run. No contracts and no monthly fees.'],
  ['Clear prices', 'You see the full price, including VAT where it applies, before you pay.'],
  ['Every ad is checked', 'A person reviews every ad, so the feed stays safe for you and for everyone else.'],
  ['See what happens', 'Follow views and clicks for each campaign right in your dashboard.'],
]

const FAQ = [
  ['Who can advertise?', 'Any business or creator that follows our Ad Policy and is allowed to advertise for the business they enter.'],
  ['How long does review take?', 'We aim to review every ad within 24 hours, and we email you the decision.'],
  ['What can I upload?', 'Feed ads use one image (JPG, PNG or WebP, up to 4 MB). Reels ads use one MP4 video, up to 30 seconds and 30 MB. Add a short message and a button that opens your link.'],
  ['What if my ad is rejected?', 'We tell you why. Fix it and send it again within 7 days at no extra cost, or ask for a refund.'],
  ['How do I pay?', 'By card through Paystack. We never see or store your card details.'],
  ['Can I get a refund?', 'In some cases, yes. For example, if you cancel before review. Read the refund policy for the full list.'],
]

function PosterArt() {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Example ad picture">
      <rect width="200" height="200" fill="#f7b731" />
      <circle cx="140" cy="70" r="52" fill="#0b0b0e" />
      <rect x="18" y="116" width="96" height="64" fill="#2b6fe8" />
      <rect x="126" y="140" width="56" height="40" fill="#ffffff" />
      <text x="20" y="42" fontSize="22" fontWeight="900" fill="#0b0b0e" fontFamily="sans-serif">YOUR</text>
      <text x="20" y="68" fontSize="22" fontWeight="900" fill="#0b0b0e" fontFamily="sans-serif">BRAND</text>
    </svg>
  )
}

function ReelArt() {
  return (
    <svg className="art" viewBox="0 0 160 284" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="160" height="284" fill="#1b1b22" />
      <circle cx="80" cy="110" r="62" fill="#f7b731" />
      <rect x="20" y="150" width="120" height="14" fill="#2b6fe8" />
      <rect x="20" y="172" width="80" height="14" fill="#ffffff" />
    </svg>
  )
}

export default async function Home() {
  const ctx = await getAdvertiserContext()
  if (ctx.error !== 'signed_out') redirect('/dashboard')

  return (
    <div className="lp">
      <header className="lp-nav">
        <div className="lp-wrap lp-nav-in">
          <a className="lp-logo" href="/"><span className="logo-mark">F</span>Flitters <b>Ads</b></a>
          <nav className="lp-links" aria-label="Page sections">
            <a href="#how">How it works</a>
            <a href="#formats">Ad formats</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="lp-cta">
            <a className="lp-signin" href="/login">Sign in</a>
            <a className="btn btn-accent btn-small" href="/signup">Start advertising</a>
          </div>
        </div>
      </header>

      <section className="lp-hero">
        <div className="lp-wrap lp-hero-in">
          <div>
            <span className="lp-kicker">Flitters Ads</span>
            <h1>Get your business seen on Flitters.</h1>
            <p className="sub">Create an ad in minutes, pay by the day, and reach people in the Flitters feed and Reels. No agency. No contracts.</p>
            <div className="lp-actions">
              <a className="btn btn-accent btn-lg" href="/signup">Start advertising</a>
              <a className="btn btn-ghost-light btn-lg" href="#how">See how it works</a>
            </div>
            <p className="lp-fine">Every ad is reviewed within 24 hours.</p>
          </div>
          <div className="lp-hero-art" aria-hidden="true">
            <div className="lp-ph lp-ph-feed">
              <div className="t"><span className="av">Y</span><span>Your brand<small>Sponsored</small></span></div>
              <PosterArt />
              <div className="b"><span>Shop now</span><span>→</span></div>
            </div>
            <div className="lp-ph lp-ph-reel">
              <ReelArt />
              <div className="info"><b><span className="av">Y</span>Your brand</b><span>Fresh drop, this week only.</span><i>Learn more</i></div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-strip">
        <div className="lp-wrap lp-strip-in">
          <div>Feed and Reels<small>Two places to be seen</small></div>
          <div>Pay by the day<small>No contracts</small></div>
          <div>Reviewed in 24 hours<small>By a real person</small></div>
          <div>Views and clicks<small>In your dashboard</small></div>
        </div>
      </section>

      <section className="lp-sec" id="how">
        <div className="lp-wrap">
          <h2>How it works</h2>
          <p className="intro">From sign-up to live in four steps.</p>
          <div className="lp-steps">
            {STEPS.map(([n, h, p]) => (
              <div className="lp-step" key={n}><span className="n">{n}</span><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec dark" id="formats">
        <div className="lp-wrap">
          <h2>Ad formats</h2>
          <p className="intro">Pick the format that fits your message. Run one or both.</p>
          <div className="lp-formats">
            <div className="lp-format">
              <h3>Feed ads</h3>
              <p>A picture that sits between posts in the home feed.</p>
              <ul><li>One image: JPG, PNG or WebP, up to 4 MB</li><li>Short text and a button</li><li>Square pictures work best</li></ul>
            </div>
            <div className="lp-format">
              <h3>Reels ads</h3>
              <p>A full-screen vertical video between Reels.</p>
              <ul><li>One MP4 video: up to 30 seconds and 30 MB</li><li>Short text and a button</li><li>Vertical (9:16) works best</li></ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-sec" id="why">
        <div className="lp-wrap">
          <h2>Why advertise on Flitters</h2>
          <div className="lp-why">
            {WHY.map(([h, p]) => <div key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="lp-sec alt" id="pricing">
        <div className="lp-wrap">
          <h2>Simple pricing, by the day</h2>
          <p className="intro">The price depends on where your ad shows (feed or Reels) and your country. Advertisers in Nigeria pay in naira. You always see the total, with VAT, before you pay. Nothing is charged until you press Pay.</p>
          <div className="lp-actions"><a className="btn btn-primary btn-lg" href="/signup">Start advertising</a></div>
        </div>
      </section>

      <section className="lp-sec" id="faq">
        <div className="lp-wrap">
          <h2>Questions</h2>
          <div className="lp-faq">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="lp-final">
        <div className="lp-wrap">
          <h2>Ready to get seen?</h2>
          <a className="btn btn-lg" href="/signup">Start advertising</a>
        </div>
      </section>

      <footer className="lp-foot">
        <div className="lp-wrap lp-foot-in">
          <div className="row"><a href="/terms">Terms</a><a href="/ad-policy">Ad policy</a><a href="/refunds">Refunds</a><a href="/privacy">Privacy</a><a href="/login">Sign in</a></div>
          <p>© Xchord Labs. Flitters Ads.</p>
        </div>
      </footer>
    </div>
  )
}
