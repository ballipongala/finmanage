'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'

const CSVUploader = () => {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setMessage(null)
      setIsError(false)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file')
      setIsError(true)
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || 'File uploaded successfully')
        setIsError(false)
      } else {
        setMessage(data.message || 'Error uploading file')
        setIsError(true)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setMessage('Error uploading file. Please try again.')
      setIsError(true)
    }
  }

  return (
    <div className="space-y-4">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload CSV</Button>
      {message && (
        <Alert variant={isError ? "destructive" : "default"}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default CSVUploader