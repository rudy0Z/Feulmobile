import { createBrowserRouter, Navigate } from "react-router";
import { Onboarding } from "./components/Onboarding";
import { EarningCelebration } from "./components/EarningCelebration";
import { MainApp } from "./components/MainApp";
import { Home } from "./components/Home";
import { QuestFeed } from "./components/QuestFeed";
import { Wallet } from "./components/Wallet";
import { Rewards } from "./components/Rewards";
import { Profile } from "./components/Profile";
import { Recording } from "./components/Recording";
import { RejectedTask } from "./components/RejectedTask";
import { Performance } from "./components/Performance";
import { RoleSelection } from "./components/RoleSelection";
import { ValidatorApplication } from "./components/ValidatorApplication";
import { QuestCreatorApplication } from "./components/QuestCreatorApplication";
import { PayoutFlow } from "./components/PayoutFlow";
import { RewardClaimFlow } from "./components/RewardClaimFlow";
import { ValidatorApp } from "./components/validator/ValidatorApp";
import { ValidatorHome } from "./components/validator/ValidatorHome";
import { ValidatorTasks } from "./components/validator/ValidatorTasks";
import { ValidatorProfile } from "./components/validator/ValidatorProfile";
import { ValidatorWallet } from "./components/validator/ValidatorWallet";
import { ValidatorRewards } from "./components/validator/ValidatorRewards";
import { GradingTask } from "./components/validator/GradingTask";
import { QuestCreatorApp } from "./components/quest-creator/QuestCreatorApp";
import { QuestCreatorDashboard } from "./components/quest-creator/QuestCreatorDashboard";
import { QuestCreatorCampaigns } from "./components/quest-creator/QuestCreatorCampaigns";
import { QuestCreatorProfile } from "./components/quest-creator/QuestCreatorProfile";

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

  // ── Retired funnel steps → Home-first. Consent is now a lazy sheet;
  //    calibration is folded into the standard LINES capture. ──
  { path: "/first-earning",         element: <Navigate to="/contributor" replace /> },
  { path: "/data-consent",          element: <Navigate to="/contributor" replace /> },
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
  {
    path: "/quest-creator-apply",
    Component: QuestCreatorApplication,
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

  // ── Validator: Payout & Rewards Claim Flows ──
  {
    path: "/validator/payout",
    Component: PayoutFlow,
  },
  {
    path: "/validator/rewards/claim",
    Component: RewardClaimFlow,
  },

  // ── Quest Creator (accessed after approval) ──
  {
    path: "/quest-creator",
    Component: QuestCreatorApp,
    children: [
      { index: true,           Component: QuestCreatorDashboard },
      { path: "campaigns",     Component: QuestCreatorCampaigns },
      { path: "profile",       Component: QuestCreatorProfile   },
    ],
  },

  // ── Redirects ──
  { path: "/role-selection", Component: RoleSelection },
  { path: "/app/*",          element: <Navigate to="/contributor" replace /> },
  { path: "*",               element: <Navigate to="/" replace /> },
]);