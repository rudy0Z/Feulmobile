import { createBrowserRouter, Navigate } from "react-router";
import { Onboarding } from "./components/Onboarding";
import { ConsentGate } from "./components/ConsentGate";
import { EarningCelebration } from "./components/EarningCelebration";
import { MainApp } from "./components/MainApp";
import { Home } from "./components/Home";
import { QuestFeed } from "./components/QuestFeed";
import { Wallet } from "./components/Wallet";
import { Rewards } from "./components/Rewards";
import { Profile } from "./components/Profile";
import { Recording } from "./components/Recording";
import { RejectedTask } from "./components/RejectedTask";
import { RoomConsentRollCall } from "./components/RoomConsentRollCall";
import { CoverageFullState } from "./components/CoverageFullState";
import { CampaignClosedHonour } from "./components/CampaignClosedHonour";
import { DialectMismatch } from "./components/DialectMismatch";
import { SessionInterrupted } from "./components/SessionInterrupted";
import { SilentRoomReview } from "./components/SilentRoomReview";
import { CampaignOversubscribed } from "./components/CampaignOversubscribed";
import { QualityGradeDispute } from "./components/QualityGradeDispute";
import { BatteryWarning } from "./components/BatteryWarning";
import { Performance } from "./components/Performance";
import { RoleSelection } from "./components/RoleSelection";
import { ValidatorApplication } from "./components/ValidatorApplication";
import { PayoutFlow } from "./components/PayoutFlow";
import { RewardClaimFlow } from "./components/RewardClaimFlow";
import { ValidatorApp } from "./components/validator/ValidatorApp";
import { ValidatorHome } from "./components/validator/ValidatorHome";
import { ValidatorTasks } from "./components/validator/ValidatorTasks";
import { ValidatorProfile } from "./components/validator/ValidatorProfile";
import { ValidatorWallet } from "./components/validator/ValidatorWallet";
import { ValidatorRewards } from "./components/validator/ValidatorRewards";
import { GradingTask } from "./components/validator/GradingTask";
import { DisagreementEscalation } from "./components/validator/DisagreementEscalation";
import { AccuracyWarning } from "./components/validator/AccuracyWarning";
import { ValidatorQueueEmpty } from "./components/validator/ValidatorQueueEmpty";

export const router = createBrowserRouter([
  // ── Auth (product + sign-in, one screen) ──
  {
    path: "/",
    Component: Onboarding,
  },
  {
    path: "/earning-celebration",
    Component: EarningCelebration,
  },

  // ── Consent gate — a NATIVE ROUTE, not a sheet (owner decision D-3).
  //    Deliberately a sibling of /contributor, so it renders full-screen
  //    with no dock: consent must not look like a step inside the app you
  //    are being asked to trust. This is also the proof URL — open it
  //    signed-out and you get consent, never a microphone.
  {
    path: "/contributor/consent",
    Component: ConsentGate,
  },

  // ── Retired funnel steps → Home-first. Calibration is folded into the
  //    standard LINES capture. ──
  { path: "/first-earning",         element: <Navigate to="/contributor" replace /> },
  { path: "/data-consent",          element: <Navigate to="/contributor/consent" replace /> },
  { path: "/submission-guidelines", element: <Navigate to="/contributor" replace /> },
  { path: "/voice-calibration",     element: <Navigate to="/recording/q-lines-1" replace /> },
  { path: "/profile-setup",         element: <Navigate to="/contributor" replace /> },

  // ── Contributor (Main App) ──
  {
    path: "/contributor",
    Component: MainApp,
    children: [
      { index: true,          Component: Home      },
      { path: "quests",       Component: QuestFeed },
      { path: "wallet",       Component: Wallet    },
      { path: "rewards",      Component: Rewards   },
      { path: "profile",      Component: Profile   },
    ],
  },
  {
    path: "/contributor/performance",
    Component: Performance,
  },
  {
    path: "/recording/:questId",
    Component: Recording,
  },
  {
    path: "/rejected/:questId",
    Component: RejectedTask,
  },

  // ── Contributor edge-case states (P0) ──
  { path: "/contributor/room-consent",    Component: RoomConsentRollCall }, // C-01/C-10
  { path: "/contributor/coverage-full",   Component: CoverageFullState },   // C-02
  { path: "/contributor/campaign-closed", Component: CampaignClosedHonour },// C-03/C-16
  { path: "/contributor/dialect-mismatch",Component: DialectMismatch },     // C-07
  { path: "/contributor/session-interrupted", Component: SessionInterrupted },   // C-04
  { path: "/contributor/silent-room",         Component: SilentRoomReview },     // C-08
  { path: "/contributor/campaign-oversubscribed", Component: CampaignOversubscribed }, // C-21
  { path: "/contributor/quality-dispute",     Component: QualityGradeDispute },  // C-09
  { path: "/contributor/battery-warning",     Component: BatteryWarning },       // C-15

  // ── Contributor: Payout & Rewards Claim Flows ──
  {
    path: "/contributor/payout",
    Component: PayoutFlow,
  },
  {
    path: "/contributor/rewards/claim",
    Component: RewardClaimFlow,
  },

  // ── Pro Role Applications (from Profile) ──
  {
    path: "/validator-apply",
    Component: ValidatorApplication,
  },

  // ── Validator (accessed after approval) ──
  {
    path: "/validator",
    Component: ValidatorApp,
    children: [
      { index: true,         Component: ValidatorHome    },
      { path: "tasks",       Component: ValidatorTasks   },
      { path: "wallet",      Component: ValidatorWallet  },
      { path: "rewards",     Component: ValidatorRewards },
      { path: "profile",     Component: ValidatorProfile },
    ],
  },
  {
    path: "/validator/grading/:taskId",
    Component: GradingTask,
  },

  // ── Validator edge-case states (C-17/18/19) ──
  {
    path: "/validator/disagreement/:taskId?",
    Component: DisagreementEscalation,
  },
  {
    path: "/validator/accuracy-warning",
    Component: AccuracyWarning,
  },
  {
    path: "/validator/queue-empty",
    Component: ValidatorQueueEmpty,
  },

  // ── Validator: Payout & Rewards Claim Flows ──
  {
    path: "/validator/payout",
    Component: PayoutFlow,
  },
  {
    path: "/validator/rewards/claim",
    Component: RewardClaimFlow,
  },

  // ── Quest Creator: retired (dropped from scope, 2026-08-31). Any old
  //    quest-creator link redirects to the contributor app. ──
  { path: "/quest-creator",       element: <Navigate to="/contributor" replace /> },
  { path: "/quest-creator/*",     element: <Navigate to="/contributor" replace /> },
  { path: "/quest-creator-apply", element: <Navigate to="/contributor" replace /> },

  // ── Redirects ──
  { path: "/role-selection", Component: RoleSelection },
  { path: "/app/*",          element: <Navigate to="/contributor" replace /> },
  { path: "*",               element: <Navigate to="/" replace /> },
]);