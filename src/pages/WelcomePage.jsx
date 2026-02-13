import logo from "../assets/logo.png";

export default function WelcomePage() {
  const tagline = "Browse and rent IoT devices for your projects"; // variable

  return (
    <>
      <header style={{ padding: 16 }}>
        <h1 style={{ margin: 0 }}>UniRent</h1>
      </header>

      <main style={{ padding: 20, textAlign: "center" }}>
        <section>
          <img
            src={logo}
            alt="UniRent logo"
            style={{ width: "90%", maxWidth: 520, height: "auto" }}
          />
          <p style={{ fontWeight: 600 }}>{tagline}</p>
        </section>

        <section style={{ marginTop: 30 }}>
          <button style={{ margin: 8, padding: "10px 16px" }}>Get Started</button>
          <button style={{ margin: 8, padding: "10px 16px" }}>Create Account</button>
        </section>
      </main>

      <footer style={{ padding: 16, textAlign: "center", opacity: 0.7 }}>
        © 2026 UniRent
      </footer>
    </>
  );
}
