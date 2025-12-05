import dynamic from 'next/dynamic';

const ElonScene = dynamic(() => import('../components/ElonScene'), {
  ssr: false,
  loading: () => <div className="visual-wrapper" />
});

export default function Page() {
  return (
    <main className="page-container">
      <div className="hero">
        <div className="content">
          <div className="badge">Immersive Tribute</div>
          <h1>Elon Musk Interactive 3D Showcase</h1>
          <p className="lead">
            Explore a stylized digital sculpture inspired by Elon Musk. Rotate the model, discover subtle
            details, and experience an ambient space-age atmosphere crafted for curiosity and exploration.
          </p>
          <div className="specs">
            <div>
              <span>Controls:</span> Drag to orbit, scroll to zoom, hover to activate dynamic pose.
            </div>
            <div>
              <span>Experience:</span> Real-time lighting, cinematic environment, responsive motion.
            </div>
            <div>
              <span>Technology:</span> Next.js, React Three Fiber, Three.js, Procedural geometry.
            </div>
          </div>
          <div className="cta-grid">
            <div className="cta">
              <strong>Interactive Pose</strong>
              <small>Hover to unlock a subtle hero stance animation.</small>
            </div>
            <div className="cta">
              <strong>Orbital Controls</strong>
              <small>Rotate freely to view the sculpture in full 360°.</small>
            </div>
            <div className="cta">
              <strong>Galactic Mood</strong>
              <small>Immersive skybox with dynamic starfield and cinematic lights.</small>
            </div>
          </div>
        </div>
        <div className="visual-wrapper">
          <ElonScene />
        </div>
      </div>
    </main>
  );
}
