import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

import { useAuth } from "../contexts/auth.context";
import AuthenticatedStacks from "./stacks/AuthenticatedStacks";
import UnauthenticatedStacks from "./stacks/UnauthenticatedStacks";
import { useEffect } from "react";

const ConfigRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          {user?.userId && isAuthenticated ? (
            <AuthenticatedStacks />
          ) : (
            <UnauthenticatedStacks />
          )}
        </main>
        {/* <footer>
          <Footer />
        </footer> */}
      </div>
    </Router>
  );
};

export { ConfigRoutes };
