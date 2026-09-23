import { RouterProvider } from 'react-router';
import { router } from './routes';
import { PhoneFrame } from './components/PhoneFrame';
import { DevProvider } from './lib/DevContext';
import { DevPanel, DevOverlayHost } from './components/DevPanel';
import { isEmbed } from './lib/chrome';

/** Debug tooling ships only in dev — never in the production/portfolio embed. */
const DEV = import.meta.env.DEV;

export default function App() {
  /* ?embed=1 → bare router. No phone shell, no DEV button, no dev panel.
     This is stripped at the App level (not with CSS) so the chrome never
     mounts at all — see 08-PHASE-4 §4.6. */
  if (isEmbed()) {
    return (
      <DevProvider>
        <RouterProvider router={router} />
      </DevProvider>
    );
  }

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
