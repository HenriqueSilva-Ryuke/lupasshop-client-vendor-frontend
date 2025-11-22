import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ proxy: string[] }> }
) {
    return handleProxyRequest(request, await params);
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ proxy: string[] }> }
) {
    return handleProxyRequest(request, await params);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ proxy: string[] }> }
) {
    return handleProxyRequest(request, await params);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ proxy: string[] }> }
) {
    return handleProxyRequest(request, await params);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ proxy: string[] }> }
) {
    return handleProxyRequest(request, await params);
}

async function handleProxyRequest(
    request: NextRequest,
    params: { proxy: string[] }
) {
    try {
        const { proxy } = params;
        const path = proxy.join('/');

        // Build the target URL
        const targetUrl = `${BACKEND_URL}/api/${path}`;

        // Get search params from the original request
        const searchParams = request.nextUrl.searchParams.toString();
        const fullUrl = searchParams ? `${targetUrl}?${searchParams}` : targetUrl;

        // Prepare headers for the backend request
        const headers = new Headers();

        // Forward relevant headers
        const headersToForward = [
            'content-type',
            'authorization',
            'accept',
            'accept-language',
            'user-agent',
        ];

        headersToForward.forEach((header) => {
            const value = request.headers.get(header);
            if (value) {
                headers.set(header, value);
            }
        });

        // Forward cookies from the request
        const cookies = request.headers.get('cookie');
        if (cookies) {
            headers.set('cookie', cookies);
        }

        // Prepare the request body for methods that support it
        let body: BodyInit | null = null;
        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
            const contentType = request.headers.get('content-type');

            if (contentType?.includes('application/json')) {
                body = JSON.stringify(await request.json());
            } else if (contentType?.includes('multipart/form-data')) {
                body = await request.formData();
            } else {
                body = await request.text();
            }
        }

        // Make the request to the backend
        const backendResponse = await fetch(fullUrl, {
            method: request.method,
            headers,
            body,
            credentials: 'include', // Important for cookies
        });

        // Get response body
        const responseBody = await backendResponse.text();

        // Create response with the backend's status and body
        const response = new NextResponse(responseBody, {
            status: backendResponse.status,
            statusText: backendResponse.statusText,
        });

        // Forward relevant response headers
        const responseHeadersToForward = [
            'content-type',
            'cache-control',
            'etag',
            'last-modified',
        ];

        responseHeadersToForward.forEach((header) => {
            const value = backendResponse.headers.get(header);
            if (value) {
                response.headers.set(header, value);
            }
        });

        // Forward Set-Cookie headers (critical for HttpOnly cookies)
        const setCookieHeaders = backendResponse.headers.getSetCookie();
        setCookieHeaders.forEach((cookie) => {
            response.headers.append('set-cookie', cookie);
        });

        return response;
    } catch (error) {
        console.error('Proxy error:', error);

        return NextResponse.json(
            {
                error: 'Proxy request failed',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 502 }
        );
    }
}
