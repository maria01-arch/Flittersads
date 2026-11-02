import { getAdvertiserContext } from '@/lib/advertiser'
import { createAdminClient } from '@/lib/supabase/admin'
import { statsByCampaign } from '@/lib/stats'
import CampaignTable from '@/components/CampaignTable'
import Icon from '@/components/Icon'

export const dynamic = 'force-dynamic'

const FILTERS = [
  ['', 'All', null],
  ['live', 'Live', ['live']],
  ['review', 'In review', ['pending_review', 'approved']],
  ['attention', 'Needs attention', ['draft', 'rejected', 'awaiting_payment']],
  ['done', 'Finished', ['completed', 'paused', 'refunded']],
]

export default async function CampaignsPage({ searchParams }) {
  const ctx = await getAdvertiserContext()
  if (ctx.error) return null
  const f = FILTERS.find((x) => x[0] === (searchParams && searchParams.f)) || FILTERS[0]
  const admin = createAdminClient()
  let q = admin.from('ad_campaigns').select('*').eq('advertiser_id', ctx.advertiser.id).neq('status', 'cancelled').order('created_at', { ascending: false }).limit(100)
  if (f[2]) q = q.in('status', f[2])
  const { data } = await q
  const rows = data || []
  const stats = await statsByCampaign(admin, rows.map((c) => c.id))

  return (
    <>
      <div className="phead"><h1>Campaigns</h1><a className="btn btn-primary" href="/create"><Icon name="plus" />Create campaign</a></div>
      <div className="seg">
        {FILTERS.map(([v, label]) => <a key={v} href={v ? '/campaigns?f=' + v : '/campaigns'} className={'segitem' + (f[0] === v ? ' on' : '')}>{label}</a>)}
      </div>
      {rows.length === 0 ? (
        <section className="card empty">
          <span className="logo-mark"><Icon name="megaphone" /></span>
          <h2>{f[0] ? 'Nothing here' : 'No campaigns yet'}</h2>
          <p className="hint">{f[0] ? 'No campaigns match this filter.' : 'Create your first ad. It takes about three minutes.'}</p>
          {f[0] ? null : <a className="btn btn-accent" href="/create">Create campaign</a>}
        </section>
      ) : (
        <CampaignTable rows={rows} stats={stats} />
      )}
    </>
  )
}
