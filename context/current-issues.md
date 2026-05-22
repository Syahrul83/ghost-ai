1. ~~masalah ketika klik tombol sign out ter redirek ke http://localhost:3000/ bukan ke http://localhost:3000/sign-in~~
   - FIXED: Ditambahkan `afterSignOutUrl="/sign-in"` di `ClerkProvider` pada `app/layout.tsx`
   - Root cause: `afterSignOutUrl` tidak bisa di-set di `UserButton` di versi Clerk ini, hanya bisa di `ClerkProvider` sebagai global option
   - Clerk sign-out default redirect ke `/`, dan redirect chain via home page tidak reliable karena race condition auth state
