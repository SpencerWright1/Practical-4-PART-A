import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

export default function JobItem({ job, isSaved, onSave }) {
  const [saved, setSaved] = useState(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = async () => {
    await onSave(job.id);
    setSaved(true);
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2, width: "90%" }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h6" component="div">
            {job.title}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary" component="div">
            {job.job_type} • {job.location}
          </Typography>

        </Stack>
        <Typography variant="body1">Description</Typography>
        <Typography color="text.secondary" variant="body2">{job.description}</Typography>
        <Typography sx={{ marginTop: 1 }} variant="body1">Qualifications</Typography>
        <Typography color="text.secondary" variant="body2">{job.qualifications}</Typography>
        <CardActions sx={{ justifyContent: 'flex-end', padding: 0, marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saved}
            sx={{ minWidth: 160 }}
          >
            {saved ? 'Saved' : 'Save for Later'}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
