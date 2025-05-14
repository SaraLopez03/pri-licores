import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthorizationContext = createContext();

const AuthorizationProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(0);

  const setUserAuthorization = (role) => {
    setUserRole(role);
  };

  return (
    <AuthorizationContext.Provider value={{ userRole, setUserAuthorization }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

AuthorizationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthorizationContext, AuthorizationProvider };
