import { getAdvertiserContext } from '@/lib/advertiser'
import { createAdminClient } from '@/lib/supabase/admin'
import { day, money } from '@/lib/format'
import Icon from '@/components/Icon'

export const dynamic = 'force-dynamic'

export default async function BillingPage() {
  const ctx = await getAdvertiserContext()
  if (ctx.error) return null
  const admin = createAdminClient()
  const { data } = await admin.from('ad_payments').select('*').eq('advertiser_id', ctx.advertiser.id).in('status', ['succeeded', 'refunded', 'partially_refunded']).order('paid_at', { ascending: false }).limit(100)
  const pays = data || []
  const ids = Array.from(new Set(pays.map((p) => p.campaign_id)))
  const { data: camps } = ids.length ? await admin.from('ad_campaigns').select('id,name').in('id', ids) : { data: [] }
  const names = new Map((camps || []).map((c) => [c.id, c.name]))

  return (
    <>
      <div className="phead"><h1>Billing</h1></div>
      <p className="lead">Your payments and invoices.</p>
      {pays.length === 0 ? (
        <section className="card empty">
          <span className="logo-mark"><Icon name="receipt" /></span>
          <h2>No payments yet</h2>
          <p className="hint">When you pay for a campaign, your invoice shows up here.</p>
        </section>
      ) : (
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Date</th><th>Campaign</th><th>Invoice</th><th className="num">Amount</th><th></th></tr></thead>
            <tbody>
              {pays.map((p) => (
                <tr key={p.id}>
                  <td className="cell-first" data-label="Date">{day(p.paid_at)}</td>
                  <td data-label="Campaign">{names.get(p.campaign_id) || '—'}</td>
                  <td data-label="Invoice">{p.invoice_number || 'Pending'}</td>
                  <td className="num" data-label="Amount">{money(p.amount_minor, p.currency)}{p.status !== 'succeeded' ? ' (' + p.status.replace('_', ' ') + ')' : ''}</td>
                  <td className="num"><a href={'/invoice/' + p.campaign_id}>Invoice</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
