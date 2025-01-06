import ReportMainPage from '@/components/dashboard/reports-main-page'
import { WeeklyReport } from '@/components/dashboard/weekly-report'
import React from 'react'
import { date } from 'zod';

async function page() {

  const sampleData = [
    {
      "Name": "43",
      "Quantity": 6,
      "Type": "Non-recyclable",
      "Weight": 0.4,
      "Created_At": "2025-01-04T05:07:08.820Z"
    },
    {
      "Name": "gfbg",
      "Quantity": 1,
      "Type": "Recyclable",
      "Weight": 0.1,
      "Created_At": "2025-01-04T05:08:24.710Z"
    },
    {
      "Name": "fgdgfd",
      "Quantity": 4,
      "Type": "Recyclable",
      "Weight": 0.1,
      "Created_At": "2025-01-04T05:08:24.728Z"
    },
    {
      "Name": "wqdewf",
      "Quantity": 19,
      "Type": "Single-use",
      "Weight": 0.5,
      "Created_At": "2025-01-04T05:10:27.324Z"
    },
    {
      "Name": "rfrwf",
      "Quantity": 21,
      "Type": "Non-recyclable",
      "Weight": 0.1,
      "Created_At": "2025-01-04T05:10:56.939Z"
    },
    {
      "Name": "2333",
      "Quantity": 4,
      "Type": "Single-use",
      "Weight": 0.1,
      "Created_At": "2025-01-04T06:10:27.781Z"
    }
  ];
  
  return (
    <div>
      {/* <ReportMainPage />
       */}
      <WeeklyReport  data={sampleData}/>
    </div>
  )
}

export default page