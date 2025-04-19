import {useState} from 'react';
const SavedCandidates = () => {
  // Renders all of the saved candidates (candidates are saved in local storage)
  const [savedCandidates, setSavedCandidates] = useState(
    JSON.parse(localStorage.getItem('savedCandidates') || '[]')
  ); 
  const handleReject = (login: string) => {
    const updatedCandidates = savedCandidates.filter((c: any) => c.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };
      
  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <h2>No canidates to display currently</h2>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
  {savedCandidates.map((candidate: any) => (
    <tr key={candidate.login}>
      <td>
        <img
          className="saved-image"
          src={candidate.avatar || 'https://via.placeholder.com/150'}
          alt={candidate.name || 'Candidate'}
        />
      </td>
      <td>
  {candidate.name === null ? (
    <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
      {candidate.login}
    </a>
  ) : (
    <>
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        {candidate.name}
      </a>{' '}
      ({candidate.login})
    </>
  )}
</td>
      <td>{candidate.location || 'N/A'}</td>
      <td className="email">{candidate.email || 'N/A'}</td>
      <td>{candidate.company || 'N/A'}</td>
      <td>
        <button onClick={() => handleReject(candidate.login)}>-</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </>
  );
};

export default SavedCandidates;
