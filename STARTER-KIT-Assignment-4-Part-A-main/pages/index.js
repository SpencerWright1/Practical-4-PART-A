import AvailableJobList from "@/components/AvailableJobList";
import NavBar from "@/components/NavBar";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const jobsRes = await fetch('/api/jobs');
      const jobsData = await jobsRes.json();
      const savedRes = await fetch('/api/saved-jobs');
      const savedData = await savedRes.json();
      setJobs(jobsData);
      setSavedJobs(savedData);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const handleSave = async (jobId) => {
    await fetch('/api/saved-jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId }),
    });
    const savedRes = await fetch('/api/saved-jobs');
    const savedData = await savedRes.json();
    setSavedJobs(savedData);
  };

  return (
    <main>
      <NavBar />
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AvailableJobList
            jobs={jobs}
            savedJobs={savedJobs}
            onSave={handleSave}
          />
        )}
      </Container>
    </main>
  );
}
