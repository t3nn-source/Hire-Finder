import {Link, useLocation} from "react-router-dom";
const Nav = () => {
  const location = useLocation();
  // TODO: Add necessary code to display the navigation bar and link between the pages
  // Two Links: Candidate Search and Saved Candidates
  // The return should conditionally render the className based on the current page
  return (
    <div className="nav">
      <Link className={`nav-item ${location.pathname === "/" ? "active nav-link" : ""}`} to="/">Home</Link>
      <Link className={`nav-item ${location.pathname === "/SavedCandidates" ? "active nav-link" : ""}`} to="/SavedCandidates">Potential Candidates</Link>
    </div>
  );
};

export default Nav;
