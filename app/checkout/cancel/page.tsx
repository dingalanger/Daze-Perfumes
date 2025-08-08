export default function CancelPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-serif font-bold mb-4">Payment canceled</h1>
        <p className="text-white/70 mb-6">Your payment was canceled. You can try again anytime.</p>
        <a href="/checkout" className="btn-outline-light inline-block">Return to checkout</a>
      </div>
    </main>
  )
} 