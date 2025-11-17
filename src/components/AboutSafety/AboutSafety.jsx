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

    </main>
  );
};

export default AboutSafety;
