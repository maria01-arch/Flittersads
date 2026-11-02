export default function AuthShell({ children }) {
  return (
    <div className="auth">
      <aside className="auth-hero">
        <a className="brand" href="/"><span className="logo-mark">F</span>Flitters <b>Ads</b></a>
        <div className="auth-hero-in">
          <h1>Reach people on Flitters.</h1>
          <p>Build an ad, pay by the day, and go live in the feed or Reels.</p>
          <ul className="auth-points">
            <li>Image or video ads</li>
            <li>See the price before you pay</li>
            <li>Every ad reviewed within 24 hours</li>
          </ul>
        </div>
      </aside>
      <main className="auth-main">
        <div className="auth-card">{children}</div>
      </main>
    </div>
  )
}
