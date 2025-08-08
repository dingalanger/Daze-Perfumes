export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-serif font-bold mb-4">Thank you!</h1>
        <p className="text-white/70 mb-6">Your payment was successful. We’ll send you an email confirmation shortly.</p>
        <a href="/" className="btn-outline-light inline-block">Back to home</a>
      </div>
    </main>
  )
} 