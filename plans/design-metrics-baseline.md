# Design metrics baseline

Generated: 2026-09-15T13:53:40.863Z

| Metric | Count | Target (issue map) |
|---|---|---|
| Distinct font sizes | 25 | 11 (approved scale) |
| Text instances <= 12px | 241 | ~60 (captions only) |
| 1px solid borders | 188 | < 15 |
| box-shadow usages | 116 | < 10 |
| gradients | 26 | 2 |
| raw hex in components | 17 | 0 |
| emoji in code strings | 0 | 0 |
| brand strings (Feul/Grain) | 0 | 0 |
| heuristic targets < 44px | 19 | 0 |

Sizes in use: 9px x11, 10px x20, 11px x84, 12px x126, 13px x149, 14px x98, 15px x66, 16px x41, 17px x10, 18px x16, 19px x1, 20px x16, 22px x24, 24px x15, 25px x1, 26px x16, 28px x10, 30px x9, 32px x1, 34px x1, 36px x1, 38px x3, 44px x1, 52px x1, 72px x1

Off-scale sizes: 72px x1, 52px x1, 44px x1, 36px x1, 34px x1, 32px x1, 25px x1, 22px x24, 19px x1, 17px x10, 15px x66, 13px x149, 10px x20, 9px x11

## Examples: brand strings

## Examples: emoji

## Examples: raw hex
- src\app\components\DevPanel.tsx:52 #FFFFFF
- src\app\components\DevPanel.tsx:263 #0F1117
- src\app\components\DevPanel.tsx:285 #FFFFFF
- src\app\components\DevPanel.tsx:360 #FFFFFF
- src\app\components\DevPanel.tsx:513 #F87171
- src\app\components\DevPanel.tsx:520 #F87171
- src\app\components\DevPanel.tsx:527 #F87171
- src\app\components\DevPanel.tsx:534 #CA8A04
- src\app\components\DevPanel.tsx:562 #E53E3E
- src\app\components\DevPanel.tsx:569 #CA8A04
- src\app\components\DevPanel.tsx:576 #E53E3E
- src\app\components\DevPanel.tsx:583 #B8860B
- src\app\components\PhoneFrame.tsx:64 #1C2434
- src\app\components\PhoneFrame.tsx:248 #1a1a1a
- src\app\components\PhoneFrame.tsx:262 #F8F9FA
- src\app\components\PhoneFrame.tsx:281 #000000
- src\imports\FeulLogo-142-1329.tsx:5 #24231f

## Examples: small targets
- src\app\components\BatteryWarning.tsx:19
- src\app\components\CampaignClosedHonour.tsx:25
- src\app\components\CampaignOversubscribed.tsx:27
- src\app\components\CoverageFullState.tsx:33
- src\app\components\DevPanel.tsx:290
- src\app\components\DevPanel.tsx:301
- src\app\components\DialectMismatch.tsx:20
- src\app\components\QualityGradeDispute.tsx:44
- src\app\components\Recording.tsx:592
- src\app\components\RoomConsentRollCall.tsx:82
- src\app\components\RoomConsentRollCall.tsx:199
- src\app\components\RoomConsentRollCall.tsx:216
- src\app\components\SessionInterrupted.tsx:24
- src\app\components\SilentRoomReview.tsx:45
- src\app\components\SpoofingVerificationHold.tsx:84
- src\app\components\ui\NotificationsPanel.tsx:207
- src\app\components\ui\NotificationsPanel.tsx:358
- src\app\components\validator\GradingTask.tsx:410
- src\app\components\validator\GradingTask.tsx:446