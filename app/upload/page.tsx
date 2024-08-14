'use client'

import CSVUploader from '@/components/CSVUploader'

export default function UploadPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload CSV</h1>
      <CSVUploader />
    </div>
  )
}