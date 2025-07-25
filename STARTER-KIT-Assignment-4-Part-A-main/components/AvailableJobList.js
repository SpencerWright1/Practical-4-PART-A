import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import JobItem from './JobItem';

export default function AvailableJobList({ jobs, savedJobs, onSave }) {
  const [search, setSearch] = useState('');

  return (
    <>
      <Typography variant="h4" sx={{ paddingTop: 2, paddingBottom: 2 }}>
        Currently Open Job Positions
      </Typography>
      <TextField
        label="Search"
        fullWidth
        sx={{ width: '40%', marginBottom: 2 }}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {jobs.filter(job => {
        if (search === '') return true;
        return job.title.toLowerCase().includes(search.toLowerCase());
      }).map(job => (
        <JobItem
          key={job.id}
          job={job}
          isSaved={savedJobs.some(saved => saved.jobid === job.id || saved.jobId === job.id)}
          onSave={onSave}
        />
      ))}
    </>
  );

}