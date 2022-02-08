export const Nav = ({ currentPage, setCurrentPage }) => (
  <nav className="nav__container">
    <h1 className="nav__logo">
      <button
        className="nav__logo-button"
        onClick={() =>
          setCurrentPage((currentPage) =>
            currentPage === "dashboard" ? "dashboard" : "landingPage"
          )
        }
      >
        <span role="img" className="nav__logo-img">
          ⚡
        </span>
        Flash
      </button>
    </h1>
    <ul className="nav__buttons">
      {currentPage === "dashboard" ? (
        <li>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setCurrentPage("logIn")}
          >
            <span role="img">🔓</span> Log out
          </button>
        </li>
      ) : (
        <>
          <li>
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setCurrentPage("logIn")}
            >
              <span role="img">🔐</span> Log in
            </button>
          </li>
          <li>
            <button
              type="button"
              className="button button--primary"
              onClick={() => setCurrentPage("signUp")}
            >
              <span role="img">📝</span> Sign up
            </button>
          </li>
        </>
      )}
    </ul>
  </nav>
);
