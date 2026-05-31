# Emberlight Sanctum v5.1 Complete Build

This package is based on the current working GitHub source and replaces the older room-based prototype with the locked Sanctum architecture.

## Public experience

- Homepage with Hero, Ember Altar, Burning Bright, immersive Archive entry, Write to the Archivist, and footer.
- Separate `/archives` room with search and filters.
- Individual record URLs at `/records/<slug>`.
- Record pages with The Premise, Granted Entry Because, Featured Quote, Lingering Echoes, Hidden Ember, Hidden Beyond the Veil, Listening Companion, Seek the Record, Share Your Thoughts, and Decree.
- Empty sections do not render.
- Audio toggle uses 🔉 / 🔇 and remembers visitor preference.
- Footer supports Return to the Threshold and SoftEmberTales phoenix logo.

## Admin

Admin page: `/admin.html`

Sections:

- Dashboard
- Records
- Imports
- Ember Altar
- Atmospheres & Audio
- Settings

Saves are immediate to the shared Netlify Blob store. There is no global Save Changes to Site button.

## Required Netlify environment variables

```text
ADMIN_KEY
NETLIFY_SITE_ID
NETLIFY_AUTH_TOKEN
MAILERLITE_API_KEY
MAILERLITE_GROUP_NAME
```

Optional:

```text
MAILERLITE_GROUP_ID
NETLIFY_BLOBS_TOKEN
```

`NETLIFY_AUTH_TOKEN` is enough for Blobs if `NETLIFY_SITE_ID` is set.

## Import schema

CSV/XLSX columns:

```text
title, author, coverUrl, decree, publicationStatus,
premise, grantedEntryBecause, featuredQuote, lingeringEchoes,
hiddenEmber, hiddenBeyondTheVeil,
atmosphere, overlayColor, overlayOpacity, spotifyUrl, customAudioUrl,
altarStatus, customSlug, sortOrder,
amazonUS, amazonCA, amazonUK, amazonIN, amazonAU,
bookshopUS, bookshopUK, indigo, goodreads, authorWebsite,
customLink1Label, customLink1Url,
customLink2Label, customLink2Url,
customLink3Label, customLink3Url
```

Use `||` to separate multiple Lingering Echoes.

## Deployment advice

Test this on a preview branch before merging to main.

1. Create branch `v51-preview` from `main`.
2. Upload the full contents of this ZIP to that branch.
3. Create a pull request.
4. Test Netlify Deploy Preview.
5. Merge only after testing.

## Notes

The data function reads from the new `sanctum-state-v51` Blob key and falls back to legacy `sanctum-state-v31`, so existing saved data should load and migrate in the browser.
