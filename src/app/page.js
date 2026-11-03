import { redirect } from 'next/navigation'
import { getAdvertiserContext } from '@/lib/advertiser'
import AdPreview from '@/components/AdPreview'
import Logo from '@/components/Logo'
import Icon from '@/components/Icon'
import ScrollFx from '@/components/ScrollFx'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Flitters Ads: advertise on Flitters' }

const STEPS = [
  ['01', 'Create your account', 'Sign up with your email and tell us about your business. It takes a minute.'],
  ['02', 'Build your ad', 'Choose the feed or Reels, add a picture or video, a short message and your link. Watch a live preview as you go.'],
  ['03', 'Pay securely', 'Pick your dates and see the exact price before you pay. Pay by card through Paystack.'],
  ['04', 'Go live', 'We review your ad within 24 hours. Once approved, it runs on your dates and you follow views and clicks.'],
]

const ABOUT = [
  ['feed', 'Posts and threads', 'People share updates, photos and longer threads, and respond with comments and reposts.'],
  ['video', 'Reels', 'Short vertical videos that people swipe through one after another.'],
  ['user', 'Messages and groups', 'Private chats and group chats, so friends and communities stay in touch.'],
  ['megaphone', 'A feed made for each person', 'The feed leans on who people follow and what they search for, so they see what they care about.'],
]

const IDEAS = [
  ['Flash sale', 'Up to 50% off', 'b1'], ['Now open', 'Come visit us', 'b3'], ['New app', 'Download free', 'b2'],
  ['Event tickets', 'Get yours today', 'b4'], ['Online course', 'Start learning', 'b5'], ['New menu', 'Taste it this week', 'b1'],
  ['Book a slot', 'Salons and studios', 'b3'], ['New release', 'Listen now', 'b2'], ['For rent', 'See the listing', 'b4'],
]

const WHY = [
  ['Pay by the day', 'Choose how many days to run. No contracts and no monthly fees.'],
  ['Clear prices', 'You see the full price, including VAT where it applies, before you pay.'],
  ['Every ad is checked', 'A person reviews every ad, so the feed stays safe for you and for everyone else.'],
  ['See what happens', 'Follow views and clicks for each campaign right in your dashboard.'],
]

const FAQ = [
  ['How can Flitters Ads help my business?', 'Your ad appears while people are scrolling their feed or watching Reels. Use it to announce a sale, promote a product or service, fill seats at an event, get downloads for an app, or grow your brand, and send people straight to your link with one tap.'],
  ['Who will see my ad?', 'People using Flitters see it, in the places you choose: between posts in the feed, or between Reels. We do not promise a number of views, because that depends on how people use the app. Your dashboard shows the views and clicks your campaign really gets.'],
  ['Is it good for a small business?', 'Yes. You choose how many days to run and you see the price first, so you can start small, learn what works, and run another campaign later. There is no contract and no monthly fee.'],
  ['Do I need design skills or a designer?', 'No. You need one picture or one short video, a line of text and your link. The builder shows a live preview of your ad while you work, so you can see how it will look before you pay.'],
  ['What is the difference between Feed and Reels ads?', 'A Feed ad is a picture that sits between posts. It suits offers, announcements and products. A Reels ad is a full-screen vertical video of up to 30 seconds. It suits showing a product in action or telling a short story. You can run either, or both as two campaigns.'],
  ['What can I advertise?', 'Products, services, events, apps, creators and brands, as long as the ad follows our Ad Policy. Anything illegal, misleading, adult or harmful is not allowed. The Ad Policy has the full list.'],
  ['How much does it cost?', 'You pay a price per day for the days you choose, plus VAT where it applies. The price depends on whether you pick the feed or Reels, and on your country. You see the total before you pay, and nothing is charged until you press Pay.'],
  ['How fast can I get started?', 'Most people finish the builder in a few minutes. After you pay, we review your ad within 24 hours. It then goes live on the start date you chose, which can be from tomorrow.'],
  ['How will I know if it is working?', 'Each campaign shows views, clicks and the click rate in your dashboard. Compare campaigns to see which picture, message or format gets more people to act.'],
  ['Why does every ad get reviewed?', 'A person checks each ad against our Ad Policy before it runs. That keeps the feed honest and safe for people, and it protects your brand from sitting beside harmful content.'],
  ['Can I change my ad after it goes live?', 'Once an ad is approved, its picture, text and link are locked, so people see exactly what we reviewed. Check the preview carefully before you pay. If we send an ad back for changes, you can fix it and send it again without paying twice.'],
  ['Is my payment safe?', 'Payments go through Paystack. Your card details go straight to them and are never seen or stored by us. You get an invoice for every campaign in your Billing page.'],
  ['What if I want a refund?', 'In some cases you can get one, for example if you cancel before review, or if your ad is not approved and you do not fix it within 7 days. Read the refund policy for the full rules.'],
]

function posterSvg() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#5b9cf6"/><circle cx="140" cy="70" r="52" fill="#0b0b0e"/><rect x="18" y="116" width="96" height="64" fill="#ffffff"/><rect x="126" y="140" width="56" height="40" fill="#36e7ff"/><text x="20" y="42" font-size="22" font-weight="900" fill="#0b0b0e" font-family="sans-serif">YOUR</text><text x="20" y="68" font-size="22" font-weight="900" fill="#0b0b0e" font-family="sans-serif">BRAND</text></svg>'
}
const POSTER = 'data:image/svg+xml,' + encodeURIComponent(posterSvg())

function ReelArt() {
  return (
    <svg className="art" viewBox="0 0 160 284" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="160" height="284" fill="#12121a" />
      <circle cx="80" cy="110" r="62" fill="#5b9cf6" />
      <rect x="20" y="150" width="120" height="14" fill="#36e7ff" />
      <rect x="20" y="172" width="80" height="14" fill="#ffffff" />
    </svg>
  )
}

const rv = (ms) => ({ '--d': ms + 'ms' })

export default async function Home() {
  const ctx = await getAdvertiserContext()
  if (ctx.error !== 'signed_out') redirect('/dashboard')

  return (
    <div className="lp">
      <noscript><style>{'.rv{opacity:1!important;transform:none!important}'}</style></noscript>
      <ScrollFx />

      <header className="lp-nav">
        <div className="lp-wrap lp-nav-in">
          <a className="lp-logo" href="/"><Logo />Flitters <b>Ads</b></a>
          <nav className="lp-links" aria-label="Page sections">
            <a href="#about">About Flitters</a>
            <a href="#how">How it works</a>
            <a href="#formats">Ad formats</a>
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
          <div className="rv in">
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
            <div className="lp-par lp-pos-t1 par hide-sm" data-par="-0.12"><div className="lp-tpl tpl-blue float hide-sm" style={{ '--fd': '0s', '--r': '-5deg' }}><small>Sponsored</small><b>FLASH<br />SALE</b><span className="bar2" /><span className="btn2">Shop now</span></div></div>
            <div className="lp-par lp-pos-t2 par" data-par="-0.2"><div className="lp-tpl tpl-white float" style={{ '--fd': '1.2s', '--r': '4deg' }}><small>Sponsored</small><b>NOW<br />OPEN</b><span className="bar2" /><span className="btn2">Visit us</span></div></div>
            <div className="lp-par lp-pos-feed par" data-par="-0.07">
              <div className="lp-ph lp-ph-feed float" style={{ '--fd': '0.4s', '--r': '-6deg' }}>
                <div className="t"><span className="av">Y</span><span>Your brand<small>Sponsored</small></span></div>
                <img src={POSTER} alt="" width="206" height="206" style={{ width: '100%', height: 'auto', borderRadius: 10, display: 'block' }} />
                <div className="b"><span>Shop now</span><span>→</span></div>
              </div>
            </div>
            <div className="lp-par lp-pos-reel par" data-par="-0.15">
              <div className="lp-ph lp-ph-reel float" style={{ '--fd': '1.6s', '--r': '5deg' }}>
                <ReelArt />
                <div className="info"><b><span className="av">Y</span>Your brand</b><span>Fresh drop, this week only.</span><i>Learn more</i></div>
              </div>
            </div>
            <div className="lp-par lp-pos-t3 par hide-sm" data-par="-0.25"><div className="lp-tpl tpl-dark float hide-sm" style={{ '--fd': '2.2s', '--r': '3deg' }}><small>Sponsored</small><b>NEW<br />APP</b><span className="bar2" /><span className="btn2">Get it</span></div></div>
            <div className="lp-par lp-pos-t4 par" data-par="-0.1"><div className="lp-tpl tpl-cyan float" style={{ '--fd': '0.8s', '--r': '-4deg' }}><small>Sponsored</small><b>LIVE<br />EVENT</b><span className="bar2" /><span className="btn2">Tickets</span></div></div>
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

      <section className="lp-sec" id="about">
        <div className="lp-wrap lp-about">
          <div className="rv">
            <span className="lp-badge">About Flitters</span>
            <h2>What is Flitters?</h2>
            <p className="intro">Flitters is a social app made by Xchord Labs. People share posts and short videos, follow friends and creators, and chat in private and group messages. It runs on Android and on the web.</p>
            <p className="intro" style={{ marginTop: 14 }}>When you advertise on Flitters, your ad sits inside the same feed and Reels that people open to see what their friends and favourite creators are up to.</p>
            <div className="lp-actions"><a className="btn btn-primary" href="https://xchord.space" target="_blank" rel="noreferrer">Open Flitters on the web</a></div>
          </div>
          <div className="lp-about-grid">
            {ABOUT.map(([icon, h, p], i) => (
              <div className="lp-tile rv" style={rv(i * 90)} key={h}><span className="ic"><Icon name={icon} /></span><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec alt" id="how">
        <div className="lp-wrap">
          <h2 className="rv">How it works</h2>
          <p className="intro rv">From sign-up to live in four steps.</p>
          <div className="lp-steps">
            {STEPS.map(([n, h, p], i) => (
              <div className="lp-step rv" style={rv(i * 100)} key={n}><span className="n">{n}</span><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec dark" id="ideas">
        <div className="lp-wrap">
          <h2 className="rv">Ad ideas to get you started</h2>
          <p className="intro rv">Examples of what businesses promote. You build yours in minutes, with your own picture or video.</p>
        </div>
        <div className="lp-marquee rv" aria-hidden="true">
          <div className="lp-track">
            {[...IDEAS, ...IDEAS].map(([t, s, c], i) => (
              <div className="idea" key={i}>
                <div className={'top ' + c}><small>Sponsored</small>{t}</div>
                <div className="low"><span>{s}</span><span>→</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-sec" id="formats">
        <div className="lp-wrap">
          <h2 className="rv">Ad formats</h2>
          <p className="intro rv">Pick the format that fits your message. Run one or both.</p>
          <div className="lp-formats2">
            <div className="lp-format2 rv">
              <div className="stack">
                <h3>Feed ads</h3>
                <p className="hint">A picture that sits between posts in the home feed.</p>
                <ul><li>One image: JPG, PNG or WebP, up to 4 MB</li><li>Short text and a button</li><li>Square pictures work best</li></ul>
              </div>
              <AdPreview placement="feed" business="Your brand" content="Fresh arrivals this week." ctaText="Shop now" imageUrl={POSTER} />
            </div>
            <div className="lp-format2 rv" style={rv(120)}>
              <div className="stack">
                <h3>Reels ads</h3>
                <p className="hint">A full-screen vertical video between Reels.</p>
                <ul><li>One MP4 video: up to 30 seconds and 30 MB</li><li>Short text and a button</li><li>Vertical (9:16) works best</li></ul>
              </div>
              <AdPreview placement="reel" business="Your brand" content="Fresh drop, this week only." ctaText="Learn more" />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-sec alt" id="why">
        <div className="lp-wrap">
          <h2 className="rv">Why advertise on Flitters</h2>
          <div className="lp-why">
            {WHY.map(([h, p], i) => <div className="rv" style={rv(i * 90)} key={h}><h3>{h}</h3><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="lp-sec" id="pricing">
        <div className="lp-wrap">
          <h2 className="rv">Simple pricing, by the day</h2>
          <p className="intro rv">The price depends on where your ad shows (feed or Reels) and your country. Advertisers in Nigeria pay in naira. You always see the total, with VAT, before you pay. Nothing is charged until you press Pay.</p>
          <div className="lp-actions rv"><a className="btn btn-primary btn-lg" href="/signup">Start advertising</a></div>
        </div>
      </section>

      <section className="lp-sec alt" id="faq">
        <div className="lp-wrap lp-faqwrap">
          <div className="head rv">
            <span className="lp-badge">FAQ</span>
            <h2>How Flitters Ads helps you grow</h2>
            <p className="intro">Straight answers to what advertisers ask us most.</p>
            <div className="lp-actions"><a className="btn btn-primary" href="/signup">Start advertising</a></div>
          </div>
          <div className="lp-faq big rv">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="lp-final">
        <div className="lp-wrap rv">
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
