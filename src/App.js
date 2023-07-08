import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import CanvasPage from './CanvasPage'
import CanvasPageTwo from './CanvasPageTwo'
import GlassFlower from './GlassFlower'
import Loading from './Loading'
import { Suspense, useState } from 'react'

function Overlay() {
  const [hidden, setHidden] = useState(false)

  return (
    <div
      style={{
        // pointerEvents: 'none', use this to allow clicking through the div
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        ...(hidden && { display: 'none' })
      }}>
      <div style={{ background: 'white', position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        <Link to="/">home</Link> {'    '}
        <Link to="/other">instances</Link> {'    '}
        <Link to="/flower">flower</Link>
      </div>
      {/* <a href="/other" style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}>
        pmnd.rs
        <br />
        dev collective
      </a> */}
      <div style={{ background: 'white', position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>
        ok — <span onClick={() => setHidden(true)}>HIDE</span>
      </div>
      <div style={{ background: 'white', position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>SKKKKKK/////</div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div style={{ height: '100%' }}>
        <Suspense fallback={<Loading />}>
          <CanvasPage />
        </Suspense>
        <Overlay />
      </div>
    )
  },
  {
    path: '/other',
    element: (
      <div style={{ height: '100%' }}>
        <Suspense fallback={<Loading />}>
          <CanvasPageTwo />
        </Suspense>
        <Overlay />
      </div>
    )
  },
  {
    path: '/flower',
    element: (
      <div style={{ height: '100%' }}>
        <Suspense fallback={<Loading />}>
          <GlassFlower />
        </Suspense>
        <Overlay />
      </div>
    )
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
