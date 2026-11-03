import StatusPill from '@/components/StatusPill'
import Icon from '@/components/Icon'
import { day, money } from '@/lib/format'
import { ctr } from '@/lib/stats'

// rows: campaigns, stats: Map(campaignId -> { impressions, clicks })
export default function CampaignTable({ rows, stats }) {
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr><th>Campaign</th><th>Status</th><th>Dates</th><th className="num">Spend</th><th className="num">Views</th><th className="num">Clicks</th><th className="num">CTR</th></tr>
        </thead>
        <tbody>
          {rows.map((c) => {
            const s = stats.get(c.id)
            return (
              <tr key={c.id}>
                <td className="cell-first">
                  <a className="cell-name" href={'/campaigns/' + c.id}>
                    <span className="thumb-sm">{c.image_url ? <img src={c.image_url} alt="" loading="lazy" /> : <Icon name={c.video_url ? 'video' : 'image'} />}</span>
                    <span><strong>{c.name}</strong><small>{c.placement === 'reel' ? 'Reels' : 'Feed'}</small></span>
                  </a>
                </td>
                <td data-label="Status"><StatusPill status={c.status} /></td>
                <td data-label="Dates">{c.start_at ? day(c.start_at) : '—'}{c.days ? ' · ' + c.days + 'd' : ''}</td>
                <td className="num" data-label="Spend">{c.paid_at ? money(c.total_minor, c.currency) : '—'}</td>
                <td className="num" data-label="Views">{s ? s.impressions.toLocaleString('en') : '—'}</td>
                <td className="num" data-label="Clicks">{s ? s.clicks.toLocaleString('en') : '—'}</td>
                <td className="num" data-label="CTR">{ctr(s)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
