import React from "react";

export const LogIn = ({ setCurrentPage }) => {
  const [error, setError] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = event.currentTarget;

    if (username.value && password.value) {
      setCurrentPage("dashboard");
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <h2 className="form__heading">Log in</h2>
      {error ? (
        <div role="alert" className="form__error">
          {error}
        </div>
      ) : null}
      <label className="form__label">
        Username
        <input
          type="text"
          name="username"
          className="form__input"
          autoComplete="off"
        />
      </label>
      <label className="form__label">
        Password
        <input type="password" name="password" className="form__input" />
      </label>
      <button type="submit" className="button button--secondary button--block">
        <span role="img">🔐</span> Log In
      </button>
      <p className="form__help-text">
        Note: this is a dummy form and won't persist anything. Fill the fields
        with any value to continue.
      </p>
    </form>
  );
};
