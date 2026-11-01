import { notFound } from 'next/navigation'
import { getAdvertiserContext } from '@/lib/advertiser'
import { createAdminClient } from '@/lib/supabase/admin'
import { day, money } from '@/lib/format'
import StatusPill from '@/components/StatusPill'
import AdPreview from '@/components/AdPreview'
import CancelDraft from '@/components/CancelDraft'

export const dynamic = 'force-dynamic'
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const HINT = {
  draft: 'This is a draft. Finish it, then pay and send it for review (payment opens in the next update).',
  awaiting_payment: 'Waiting for your payment.',
  pending_review: 'We are reviewing your ad. This takes up to 24 hours.',
  approved: 'Approved. It goes live on its start date.',
  live: 'Your ad is live.',
  paused: 'Your ad is paused.',
  completed: 'This campaign has finished.',
  rejected: 'This ad needs changes before it can run.',
}

export default async function CampaignPage({ params }) {
  const ctx = await getAdvertiserContext()
  if (ctx.error) return null
  if (!UUID.test(params.id)) notFound()
  const adv = ctx.advertiser
  const admin = createAdminClient()
  const { data: c } = await admin.from('ad_campaigns').select('*').eq('id', params.id).eq('advertiser_id', adv.id).maybeSingle()
  if (!c || c.status === 'cancelled') notFound()
  const editable = ['draft', 'rejected'].includes(c.status)

  return (
    <>
      <p><a href="/campaigns">← All campaigns</a></p>
      <div className="spread"><h1>{c.name}</h1><StatusPill status={c.status} /></div>
      <p className="lead">{HINT[c.status] || ''}</p>

      {c.status === 'rejected' && c.rejection_reason ? (
        <section className="card card-flat"><span className="pill pill-bad">Reason</span><p>{c.rejection_reason}</p></section>
      ) : null}

      <div className="builder-grid has-preview">
        <div className="stack">
          <section className="card">
            <h2>Details</h2>
            <dl className="kv">
              <dt>Shows in</dt><dd>{c.placement === 'reel' ? 'Reels' : 'The feed'}</dd>
              <dt>Starts</dt><dd>{day(c.start_at)}</dd>
              <dt>Ends</dt><dd>{c.end_at ? day(new Date(new Date(c.end_at).getTime() - 1).toISOString()) : '—'}</dd>
              <dt>Days</dt><dd>{c.days || '—'}</dd>
              <dt>Link</dt><dd>{c.link_url || '—'}</dd>
              {c.paid_at ? (<><dt>Paid</dt><dd>{money(c.total_minor, c.currency)}</dd></>) : null}
            </dl>
          </section>
          {editable ? <a className="btn btn-primary btn-wide" href={'/campaigns/' + c.id + '/edit'}>{c.status === 'rejected' ? 'Fix and resubmit' : 'Continue editing'}</a> : null}
          {c.status === 'draft' ? <CancelDraft id={c.id} /> : null}
        </div>
        <aside className="sticky-preview">
          <small>Preview</small>
          <AdPreview placement={c.placement} business={adv.business_name} content={c.content} ctaText={c.cta_text} imageUrl={c.image_url} videoUrl={c.video_url} />
        </aside>
      </div>
    </>
  )
}
