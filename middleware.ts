import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const USER = process.env.BASIC_AUTH_USER ?? 'demo'
const PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? '030digital'

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      try {
        const decoded = atob(encoded)
        const idx = decoded.indexOf(':')
        const user = decoded.slice(0, idx)
        const pass = decoded.slice(idx + 1)
        if (user === USER && pass === PASSWORD) {
          return NextResponse.next()
        }
      } catch {
        // fall through to 401
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Preview"',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
