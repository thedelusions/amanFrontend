import "./AboutSafety.css";

const AboutSafety = () => {
  return (
    <main className="about-wrapper">

      <section className="top-row">
        <div className="about-box">

          <div className="about-text">
            <h1>About Aman</h1>
            <p>
              Aman helps build safer, more connected neighborhoods by empowering residents 
              with reliable reporting tools, trusted community leadership, and shared awareness.
            </p>
          </div>

          <div className="about-illustration">
            <img 
              src="https://cdn-icons-png.freepik.com/512/8382/8382785.png"
              alt="Neighborhood Safety"
            />
          </div>

          <div className="bg-shape shape1"></div>
          <div className="bg-shape shape2"></div>
        </div>

        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>
            To create a trustworthy digital space where residents can stay informed, 
            report incidents responsibly, and collaborate with verified leaders — 
            strengthening the safety and unity of every neighborhood.
          </p>
        </div>
      </section>

      <section className="values-section">
        <h2>What We Stand For</h2>

        <div className="values-grid">
          <div className="value-card">
            <img src="https://cdn-icons-png.flaticon.com/512/8148/8148456.png" alt="Trust" />
            <h3>Trust</h3>
            <p>We ensure reliability with verified community leaders reviewing reports.</p>
          </div>

          <div className="value-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3213/3213332.png" alt="Awareness" />
            <h3>Awareness</h3>
            <p>Real-time updates help residents stay informed and alert.</p>
          </div>

          <div className="value-card">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733411.png" alt="Connection" />
            <h3>Connection</h3>
            <p>We strengthen local bonds through unity, kindness, and shared support.</p>
          </div>
        </div>
      </section>

      <section className="tips-section">
        <h2>Safety Tips</h2>

        <div className="tips-grid">
          <div className="tip-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2557/2557108.png" alt="Stay Alert" />
            <h4>Stay Alert</h4>
            <p>Notice unusual movement or vehicles in your area.</p>
          </div>

          <div className="tip-card">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/030/380/871/non_2x/home-security-icon-vector.jpg" 
              alt="Secure Home" 
            />
            <h4>Secure Your Home</h4>
            <p>Lock doors and windows to keep your home protected.</p>
          </div>

          <div className="tip-card">
            <img 
              src="https://cdn3d.iconscout.com/3d/premium/thumb/pet-protection-3d-icon-png-download-12685957.png" 
              alt="Protect Pets"
            />
            <h4>Protect Pets</h4>
            <p>Keep pets tagged, collared, and safe outdoors.</p>
          </div>

          <div className="tip-card">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/17871/17871683.png" 
              alt="Report Clearly" 
            />
            <h4>Report Clearly</h4>
            <p>Share accurate details without assumptions.</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutSafety;
