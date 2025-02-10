import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "recetario-876ba", appId: "1:449964547567:web:fd74fc9c5e38aa1eef6a1a", storageBucket: "recetario-876ba.firebasestorage.app", apiKey: "AIzaSyDIe6o5x0MZpHEhkB4zLLeweVPc_9yWq7g", authDomain: "recetario-876ba.firebaseapp.com", messagingSenderId: "449964547567" })), provideFirestore(() => getFirestore())]
};
