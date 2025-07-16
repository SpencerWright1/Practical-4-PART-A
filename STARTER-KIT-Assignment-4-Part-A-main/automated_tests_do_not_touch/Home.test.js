import 'isomorphic-fetch' // needed for no "fetch is not defined errors
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'


import { http, HttpResponse  } from 'msw'; // this will essentially mock the rest calls.
import { setupServer } from 'msw/node'; // we'll set up a "mocked" server

import allJobsJson from '../prisma-backend-tools/jobs.json'

import { BASE_URL } from '../utils/api/jobs.js';  

import Home from '../pages/index.js';
import JobItem from '../components/JobItem';

const allEndpoints = [
  http.get(`${BASE_URL}/api/jobs`, (req, res, ctx) => {
    // respond using a mocked JSON body
    return HttpResponse.json(
      allJobsJson["job_postings"]
    )
  }),
  http.get(`${BASE_URL}/api/saved-jobs`, (req, res, ctx) => {
    // respond using a mocked JSON body
    // this is a mock of the last two jobs in the list being saved.
    return HttpResponse.json(
      [
        {
          "id": 26,
          "jobId": 35,
          "createdAt": "2024-05-28T16:59:58.879Z"
        },
        {
          "id": 27,
          "jobId": 36,
          "createdAt": "2024-05-28T16:59:59.598Z"
        }
      ]
    )
  }),
  http.post(`${BASE_URL}/api/saved-jobs`, (req, res, ctx) => {
    return HttpResponse.json(
      {id: 22, jobId: 2, createdAt: '2024-05-28T16:05:58.206Z'}
    )
  })
]

const server = setupServer(
  ...allEndpoints
);

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

test("Home Renders all the cards from the backend properly", async () => {
  let { container } = render(<Home />)
  
  await waitFor(() => {
    let jobCards = container.querySelectorAll('.MuiCard-root')
    // console.log(jobCards.length)
    expect(jobCards.length).toBeGreaterThan(20)
  })
})

test("JobItem Saves a job properly", async () => {
  let { container } = render(<Home />)
  await waitFor(() => {
    let saveButton = container.querySelector('.MuiCard-root .MuiButton-root')
    fireEvent.click(saveButton)
    expect(saveButton).toHaveTextContent(/Saved/i)
    expect(saveButton).toBeDisabled()
  })
})

test("JobItem disables the buttons on load.", async () => {
  // render a single job button.
  let { container } = render(<JobItem
    job={allJobsJson["job_postings"][35]}
    savedJobs={[
      {
        "id": 26,
        "jobId": 35,
        "createdAt": "2024-05-28T16:59:58.879Z"
      },
      {
        "id": 27,
        "jobId": 36,
        "createdAt": "2024-05-28T16:59:59.598Z"
      }
    ]}
    setSavedJobs={jest.fn()}  
    
  />)
  
  await waitFor(() => {
    const savedButton = container.querySelector('.MuiButton-root')
    expect(savedButton).toHaveTextContent(/Saved/i)
    expect(savedButton).toBeDisabled()
  })
})