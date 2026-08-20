import { createContext, useContext, useState, ReactNode } from 'react';

export type OverlayId =
  | 'spoofing' | 'dpdp' | 'reserve' | 'noise' | 'collision' | 'consensus'
  | 'mic-denied' | 'upload-failed' | 'payment-failed' | 'batch-expired' | 'daily-limit'
  | null;
export type GradingMethodId = 'segmented' | 'pills' | 'arc' | 'keyboard' | 'binary';
/** Home is ONE dashboard with three data states. 'auto' = derive from profile. */
export type HomeStateId = 'auto' | 'empty' | 'pending' | 'live';

interface DevState {
  isPanelOpen: boolean;
  activeOverlay: OverlayId;

  // ── Contributor toggles ──
  homeState: HomeStateId;
  tierLockBypassed: boolean;
  walletEmpty: boolean;
  questsEmpty: boolean;
  forceNoisePause: boolean;

  // ── Validator toggles ──
  validatorHomeEmpty: boolean;
  validatorTasksEmpty: boolean;
  validatorWalletEmpty: boolean;
  gradingMethod: GradingMethodId;
}

type BooleanToggleKey = 'tierLockBypassed' | 'walletEmpty' | 'questsEmpty'
  | 'forceNoisePause' | 'validatorHomeEmpty' | 'validatorTasksEmpty' | 'validatorWalletEmpty';

interface DevContextType extends DevState {
  openPanel: () => void;
  closePanel: () => void;
  launchOverlay: (id: NonNullable<OverlayId>) => void;
  dismissOverlay: () => void;
  setToggle: (key: BooleanToggleKey, value: boolean) => void;
  setGradingMethod: (method: GradingMethodId) => void;
  setHomeState: (state: HomeStateId) => void;
  resetAll: () => void;
}

const DevContext = createContext<DevContextType | null>(null);

const defaultState: DevState = {
  isPanelOpen: false,
  activeOverlay: null,
  homeState: 'auto',
  tierLockBypassed: false,
  walletEmpty: false,
  questsEmpty: false,
  forceNoisePause: false,
  validatorHomeEmpty: false,
  validatorTasksEmpty: false,
  validatorWalletEmpty: false,
  gradingMethod: 'binary',
};

export function DevProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DevState>(defaultState);

  const ctx: DevContextType = {
    ...state,
    openPanel:  () => setState(s => ({ ...s, isPanelOpen: true })),
    closePanel: () => setState(s => ({ ...s, isPanelOpen: false })),
    launchOverlay: (id) => setState(s => ({ ...s, activeOverlay: id, isPanelOpen: false })),
    dismissOverlay: () => setState(s => ({ ...s, activeOverlay: null })),
    setToggle: (key, value) => setState(s => ({ ...s, [key]: value })),
    setGradingMethod: (method) => setState(s => ({ ...s, gradingMethod: method })),
    setHomeState: (state) => setState(s => ({ ...s, homeState: state })),
    resetAll: () => setState({ ...defaultState }),
  };

  return <DevContext.Provider value={ctx}>{children}</DevContext.Provider>;
}

export function useDevContext() {
  const ctx = useContext(DevContext);
  if (!ctx) throw new Error('useDevContext must be used within DevProvider');
  return ctx;
}
