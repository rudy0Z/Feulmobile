import { RouterProvider } from 'react-router';
import { router } from './routes';
import { PhoneFrame } from './components/PhoneFrame';
import { DevProvider } from './lib/DevContext';
import { DevPanel, DevOverlayHost } from './components/DevPanel';

export default function App() {
  return (
    <DevProvider>
      <PhoneFrame>
        <RouterProvider router={router} />
        <DevOverlayHost />
      </PhoneFrame>
      <DevPanel />
    </DevProvider>
  );
}
