import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 })
    }

    // Here you would typically process the file
    // For now, we'll just log some information about it
    console.log(`Received file: ${file.name}, size: ${file.size} bytes`)

    // In a real application, you might save the file to disk or process its contents here

    return NextResponse.json({ success: true, message: 'File uploaded successfully' })
  } catch (error) {
    console.error('Error processing upload:', error)
    return NextResponse.json({ success: false, message: 'Error processing upload' }, { status: 500 })
  }
}