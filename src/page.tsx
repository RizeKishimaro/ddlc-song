import DiagonalInfiniteDots from './diagonal-infinite-dots'

export default function YourPage() {
  return (
    <div className="relative min-h-screen">
      <DiagonalInfiniteDots />
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center pt-10">Your Page Content</h1>
        {/* Other components */}
      </div>
    </div>
  )
}

