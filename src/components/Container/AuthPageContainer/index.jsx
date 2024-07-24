import ContainerRow from "../ContainerRow";
import { Link } from "react-router-dom";

function AuthPageContainer({ children, error, path, text, title }) {
  const renderError = () => {
    if (typeof error === 'string') {
      return <li>{error}</li>;
    } else if (Array.isArray(error)) {
      return error.map((err, index) => <li key={index}>{err}</li>);
    } else if (typeof error === 'object' && error !== null) {
      return Object.entries(error).map(([key, value]) => (
        <li key={key}>{`${key}: ${value}`}</li>
      ));
    }
    return null;
  };

  console.log(renderError())

  return (
    <div className="auth-page">
      <ContainerRow type="page">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">{title}</h1>
          <p className="text-xs-center">
            <Link to={path}>{text}</Link>
          </p>

            <ul className="error-messages">
              {renderError()}
            </ul>

          {children}
        </div>
      </ContainerRow>
    </div>
  );
}

export default AuthPageContainer;