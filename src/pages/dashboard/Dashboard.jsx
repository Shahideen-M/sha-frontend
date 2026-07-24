import Layout from "../../components/layout/Layout";
import './Dashboard.css';

function Dashboard() {
  return (
    <>
    <Layout>
      <section className="hero">
        <h1>Welcome to SHA</h1>
        <p>Your AI assistant is ready to help you!</p>
      </section>

      <section className="status-cards">
        <div className="card">
          <h3>Backend</h3>
          <p>🟢 Online</p>
          </div>

        <div className="card">
          <h3>AI Provider</h3>
          <p>Gemini</p>
        </div>

        <div className="card">
          <h3>Local AI</h3>
          <p>Offline</p>
        </div>

        <div className="card">
          <h3>Skills</h3>
          <p>1 Active</p>
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>

        <div className="actions">
          <button>Open Chat</button>
          <button>Trade Calculator</button>
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-card">
          <p>No Recent Activity</p>
        </div>
      </section>
    </Layout>
    </>
  );
}

export default Dashboard;