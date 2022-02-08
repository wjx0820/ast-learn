export const LandingPage = ({ setCurrentPage }) => (
  <div className="landing-page__container">
    <h2 className="landing-page__heading">Welcome to Flash!</h2>
    <p className="landing-page__intro">
      A simple app to practice your equations.
    </p>
    <p className="landing-page__intro">
      <button
        className="landing-page__button"
        onClick={() => setCurrentPage("signUp")}
      >
        Sign up
      </button>{" "}
      or{" "}
      <button
        className="landing-page__button"
        onClick={() => setCurrentPage("logIn")}
      >
        log in
      </button>{" "}
      to get started.
    </p>
  </div>
);
