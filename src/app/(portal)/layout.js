import { redirect } from 'next/navigation'
import { getAdvertiserContext } from '@/lib/advertiser'
import Shell from '@/components/Shell'

export const dynamic = 'force-dynamic'

export default async function PortalLayout({ children }) {
  const ctx = await getAdvertiserContext()
  if (ctx.error === 'signed_out') redirect('/login')
  if (ctx.error === 'no_profile') redirect('/onboarding')

  if (ctx.error === 'suspended') {
    return (
      <div className="login">
        <div className="login-box">
          <h1 className="login-title">Account paused</h1>
          <p>This advertiser account is not active. Contact Flitters support if you think this is a mistake.</p>
        </div>
      </div>
    )
  }

  const nav = [
    { label: 'Dashboard', href: '/' },
    { label: 'New campaign', soon: true },
    { label: 'Campaigns', soon: true },
  ]
  return (
    <Shell business={ctx.advertiser.business_name} email={ctx.user.email} nav={nav}>
      {children}
    </Shell>
  )
}
