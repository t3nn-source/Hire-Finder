import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  // Updated fetchCandidates with filtering logic
  const fetchCandidates = async () => {
    try {
      const response = await searchGithub();
      console.log('Github API Response for candidates:', response);

      if (!response || response.length === 0) {
        console.error('No candidates found.');
        setLoading(false);
        return;
      }

      const validCandidates: Candidate[] = [];

      for (const user of response) {
        try {
          const userData = await searchGithubUser(user.login);
          console.log(`Github API Response for user ${user.login}:`, userData);

          if (userData && userData.name) {
            validCandidates.push({
              name: userData.name,
              login: userData.login,
              location: userData.location,
              avatar: userData.avatar_url,
              email: userData.email,
              html_url: userData.html_url,
              company: userData.company,
            });
          }
        } catch (err) {
          console.warn(`Skipping user ${user.login} due to fetch error`, err);
        }
      }

      if (validCandidates.length === 0) {
        console.error('No valid candidates after filtering.');
        setCurrentCandidate(null);
      } else {
        setCandidates(validCandidates);
        setCurrentCandidate(validCandidates[0]);
      }

    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  const skipToNextCandidate = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < candidates.length) {
      setCurrentIndex(nextIndex);
      setCurrentCandidate(candidates[nextIndex]);
    } else {
      console.log('No more candidates to display.');
      setCurrentCandidate(null);
    }
  };

  const saveCandidateAndNext = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
    skipToNextCandidate();
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading) {
    return <h1 className="loading">Loading users...</h1>;
  }

  if (!currentCandidate) {
    return <><h1 className="no-candidates">No candidates available.</h1><p>Refresh the page to see more candidates.</p></>;
  }

  return (
    <div className="candidate-search-container">
      <h1 className="title">Candidate Search</h1>
      <p className="counter">{`Candidate ${currentIndex + 1} of ${candidates.length}`}</p>

      <CandidateCard candidate={currentCandidate} />

      <div className="button-container">
        <button className="skip-button" onClick={skipToNextCandidate}>-</button>
        <button className="save-button" onClick={saveCandidateAndNext}>+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
