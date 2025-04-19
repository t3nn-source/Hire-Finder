import { Candidate } from "../interfaces/Candidate.interface";

type CandidateProp = {
  candidate: Candidate;
};

const CandidateCard = ({ candidate }: CandidateProp) => {
  // Helper function to render optional fields
  const renderField = (label: string, value: string | null | undefined) => {
    return (
      <p>
        <strong>{label}:</strong> {value?.trim() ? value : "N/A"}
      </p>
    );
  };

  return (
    <div className="card">
      <img src={candidate.avatar} alt={`Avatar for ${candidate.login}`} />
      <div className="info">
      <h3>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        {candidate.name || candidate.login}
        </a>{" "}
        <i>({candidate.login})</i>
          </h3>
        {renderField("Location", candidate.location)}
        {renderField ("Email", candidate.email)}
        {renderField("Company", candidate.company)}
      </div>
    </div>
  );
};

export default CandidateCard;
