import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Profile } from './profile.model';  // Ensure you have a Profile model defined

@Injectable({
  providedIn: 'root',
})
export class ProfileSettingService {
  private profilesCollection: AngularFirestoreCollection<Profile>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    // Initialize the collection reference for Firestore
    this.profilesCollection = this.afs.collection<Profile>('profiles');
  }

  // Get a single profile by its ID
  getProfile(profileId: string): Observable<Profile | undefined> {
    return this.profilesCollection.doc(profileId).valueChanges();
  }

  // Add or save a new profile with optional profile picture upload
  saveProfile(profile: Profile, profilePicture?: File): Promise<void> {
    if (profilePicture) {
      const filePath = `profile_pictures/${profile.id}_${profilePicture.name}`;
      const fileRef = this.storage.ref(filePath);

      return from(this.storage.upload(filePath, profilePicture)).pipe(
        switchMap(() => fileRef.getDownloadURL()),
        switchMap((url) => {
          profile.profilePicture = url; // Set the download URL for profile picture
          profile.id = this.afs.createId(); // Generate a unique ID for new profile
          return this.profilesCollection.doc(profile.id).set(profile);
        })
      ).toPromise();
    } else {
      // Save profile without a picture
      profile.id = this.afs.createId();
      return this.profilesCollection.doc(profile.id).set(profile);
    }
  }

  // Update an existing profile by ID with optional profile picture update
  updateProfile(profileId: string, profile: Profile, profilePicture?: File): Promise<void> {
    if (profilePicture) {
      const filePath = `profile_pictures/${profileId}_${profilePicture.name}`;
      const fileRef = this.storage.ref(filePath);

      return from(this.storage.upload(filePath, profilePicture)).pipe(
        switchMap(() => fileRef.getDownloadURL()),
        switchMap((url) => {
          profile.profilePicture = url; // Update profile picture URL
          return this.profilesCollection.doc(profileId).update(profile);
        })
      ).toPromise();
    } else {
      // Update profile without changing the profile picture
      return this.profilesCollection.doc(profileId).update(profile);
    }
  }

  // Delete a profile by ID
  deleteProfile(profileId: string): Promise<void> {
    return this.profilesCollection.doc(profileId).delete();
  }
}
