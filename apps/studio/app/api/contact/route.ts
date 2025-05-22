import { NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Get the Payload CMS backend URL
    const payloadUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
    const submitEndpoint = `${payloadUrl}/api/contact-submissions/submit`;

    // Create the JSON payload as a string
    const jsonPayload = JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      message: data.message,
    });

    // Make the request to the backend with proper content type and no cache
    const response = await fetch(submitEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: jsonPayload,
      cache: 'no-store',
    });

    // Parse the response
    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      void error; // Use variable to satisfy linter
      // Just set a default message on parsing error
      responseData = { message: 'Invalid response from server' };
    }

    // Return success or error based on the response
    if (response.ok) {
      return NextResponse.json({
        success: true,
        message:
          responseData.message ||
          "Thank you for your message. We'll be in touch soon.",
      });
    } else {
      return NextResponse.json(
        { error: responseData.message || 'Something went wrong' },
        { status: response.status }
      );
    }
  } catch (err) {
    void err; // Use variable to satisfy linter
    return NextResponse.json(
      { error: 'Server error processing your request' },
      { status: 500 }
    );
  }
}
