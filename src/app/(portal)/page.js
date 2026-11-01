import { getAdvertiserContext } from '@/lib/advertiser'
import { createAdminClient } from '@/lib/supabase/admin'
import { countryName } from '@/lib/countries'

export const dynamic = 'force-dynamic'

const LABEL = {
  draft: 'Draft', awaiting_payment: 'Awaiting payment', pending_review: 'In review', approved: 'Approved',
  live: 'Live', paused: 'Paused', completed: 'Completed', rejected: 'Needs changes', refunded: 'Refunded', cancelled: 'Cancelled',
}

export default async function Dashboard() {
  const ctx = await getAdvertiserContext()
  if (ctx.error) return null
  const adv = ctx.advertiser

  const admin = createAdminClient()
  const { data: rows } = await admin.from('ad_campaigns').select('status').eq('advertiser_id', adv.id)
  const counts = {}
  ;(rows || []).forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1 })
  const total = (rows || []).length

  return (
    <>
      <h1>Welcome, {adv.business_name}</h1>
      <p className="lead">Run ads in the Flitters feed and Reels. You pay up front, we review within 24 hours, then your ad goes live on its start date.</p>

      <section className="card">
        <h2>Your campaigns</h2>
        {total === 0 ? (
          <p>No campaigns yet. Creating campaigns arrives in the next update.</p>
        ) : (
          <ul className="chips">
            {Object.entries(counts).map(([s, n]) => <li key={s} className="chip">{LABEL[s] || s}: {n}</li>)}
          </ul>
        )}
      </section>

      <section className="card">
        <h2>Your business</h2>
        <dl className="kv">
          <dt>Name</dt><dd>{adv.business_name}</dd>
          <dt>Country</dt><dd>{countryName(adv.country_code)}</dd>
          <dt>Contact email</dt><dd>{adv.contact_email}</dd>
        </dl>
      </section>
    </>
  )
}
