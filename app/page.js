import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-5">NextAuthApp</h1>
            <p className="lead">A minimal scalable Next.js app with JWT authentication, Express backend, and a notes dashboard.</p>
            <div className="mt-4">
              <Link href="/register" className="btn btn-primary me-2">Get Started</Link>
              <Link href="/login" className="btn btn-outline-secondary">Login</Link>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Features</h5>
                <ul>
                  <li>Register / Login with JWT</li>
                  <li>Profile view & update</li>
                  <li>CRUD notes with search</li>
                  <li>SQLite for local dev (Prisma)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
