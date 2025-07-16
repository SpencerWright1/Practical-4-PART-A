import AvailableJobList from "@/components/AvailableJobList";
import NavBar from "@/components/NavBar";

import Container from '@mui/material/Container';


const savedJobs = []

const availableJobs = [
  {
    "id": 1,
    "title": "Database Administrator",
    "date_posted": "2024-04-19",
    "company": "DataTech Enterprises",
    "job_type": "Full-time",
    "location": "Seattle, WA",
    "description": "We're seeking a skilled Database Administrator to manage and optimize our organization's databases for performance and reliability.",
    "qualifications": "Strong problem-solving and troubleshooting skills"
  },
  {
    "id": 2,
    "title": "AI Product Manager",
    "date_posted": "2024-04-18",
    "company": "AI Innovations Ltd.",
    "job_type": "Full-time",
    "location": "San Francisco, CA",
    "description": "We're looking for an experienced AI Product Manager to drive the development and commercialization of our AI-based products.",
    "qualifications": "Excellent communication and leadership skills"
  }
]

export default function Home() {
  return (
    <main>
      <NavBar />
      <Container>
        <AvailableJobList
          jobs={availableJobs}
          savedJobs={savedJobs}
          setSavedJobs={()=> {/* change me! */}}
        />
      </Container>
    </main>
  );
}
