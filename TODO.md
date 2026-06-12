# TODO

- [ ] Update `src/Pages/AdminDashboard.jsx` data loading to:
  - [ ] Add detailed error logging for each failed request (admin fetch error + response payload).
  - [ ] Replace `Promise.all()` with `Promise.allSettled()` so packages and bookings load independently.
  - [ ] Handle each response independently (use `[]` fallback when request fails).
  - [ ] Log exact payloads for successful paths (Packages/Bookings arrays).
  - [ ] Ensure stats calculations guard against non-arrays using `Array.isArray`.
  - [ ] Only show toast "Failed to load data" if both requests fail.
- [ ] Verify dashboard renders packages even when bookings request fails.
- [ ] Verify console logs show which request failed and include response data.

