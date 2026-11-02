import { getAdvertiserContext } from '@/lib/advertiser'
import { createAdminClient } from '@/lib/supabase/admin'
import { statsByCampaign, ctr } from '@/lib/stats'
import CampaignTable from '@/components/CampaignTable'
import Icon from '@/components/Icon'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const ctx = await getAdvertiserContext()
  if (ctx.error) return null
  const adv = ctx.advertiser
  const admin = createAdminClient()
  const { data } = await admin.from('ad_campaigns').select('*').eq('advertiser_id', adv.id).neq('status', 'cancelled').order('created_at', { ascending: false }).limit(100)
  const rows = data || []
  const stats = await statsByCampaign(admin, rows.map((r) => r.id))
  const n = (...st) => rows.filter((r) => st.includes(r.status)).length
  const total = { impressions: 0, clicks: 0 }
  stats.forEach((s) => { total.impressions += s.impressions; total.clicks += s.clicks })

  return (
    <>
      <div className="phead">
        <div><h1>Dashboard</h1><p className="hint">{adv.business_name}</p></div>
        <a className="btn btn-primary" href="/create"><Icon name="plus" />Create campaign</a>
      </div>

      <section className="stats" aria-label="Summary">
        <div className="stat"><strong>{n('live')}</strong><span>Live campaigns</span></div>
        <div className="stat"><strong>{n('pending_review', 'approved')}</strong><span>In review or scheduled</span></div>
        <div className="stat"><strong>{total.impressions.toLocaleString('en')}</strong><span>Views</span></div>
        <div className="stat"><strong>{total.clicks.toLocaleString('en')}</strong><span>Clicks</span></div>
        <div className="stat"><strong>{ctr(total)}</strong><span>Click rate</span></div>
      </section>

      {rows.length === 0 ? (
        <section className="card empty">
          <span className="logo-mark"><Icon name="megaphone" /></span>
          <h2>Create your first campaign</h2>
          <p className="hint">Pick feed or Reels, add your picture or video, choose your dates, and pay. It takes about three minutes.</p>
          <a className="btn btn-accent" href="/create">Create campaign</a>
        </section>
      ) : (
        <>
          <div className="spread"><h2>Recent campaigns</h2><a href="/campaigns">See all</a></div>
          <CampaignTable rows={rows.slice(0, 5)} stats={stats} />
          {n('draft', 'rejected') > 0 ? <p className="hint">{n('draft', 'rejected')} campaign(s) need your attention. Open them to finish or fix.</p> : null}
        </>
      )}
    </>
  )
}
