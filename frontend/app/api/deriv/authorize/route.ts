import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, status: 'mock api', route: '/api/deriv/authorize' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, appId, serverUrl } = body ?? {};

    // Basic validation to mimic real backend behavior
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    // Return a mocked success response
    return NextResponse.json({
      data: {
        email: 'mock.user@example.com',
        appId: appId ?? '1',
        serverUrl: serverUrl ?? null
      },
      message: 'Mock authorization successful'
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
