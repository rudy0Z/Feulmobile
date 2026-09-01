import { RouterProvider } from 'react-router';
import { router } from './routes';
import { PhoneFrame } from './components/PhoneFrame';
import { DevProvider } from './lib/DevContext';
import { DevPanel, DevOverlayHost } from './components/DevPanel';

/** Debug tooling ships only in dev — never in the production/portfolio embed. */
const DEV = import.meta.env.DEV;

export default function App() {
  return (
    <DevProvider>
      <PhoneFrame>
        <RouterProvider router={router} />
        {DEV && <DevOverlayHost />}
      </PhoneFrame>
      {DEV && <DevPanel />}
    </DevProvider>
  );
}
