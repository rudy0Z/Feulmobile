# Clay render drop-zone

Place generated clay PNGs here (transparent background, exported at 2× the size
listed in `src/app/lib/clayAssets.ts`).

To activate an asset, edit `src/app/lib/clayAssets.ts`:
1. add an import at the top, e.g.  `import wallet from '../assets/clay/wallet.png';`
2. set that entry's `src:` to the import (replace `null`).

Suggested filenames match the asset keys, e.g. `wallet.png`, `tier-flame.png`,
`prop-cafe.png`, `reward-coins.png`, etc.
