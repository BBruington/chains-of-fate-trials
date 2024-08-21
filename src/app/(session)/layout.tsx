import Script from 'next/script'
 
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://js.pusher.com/5.0/pusher.min.js" />
      <Script src="main.js" />
    </>
  )
}