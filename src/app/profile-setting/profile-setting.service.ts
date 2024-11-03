import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileSettingService {
  private profilesCollection: AngularFirestoreCollection<Profile>;
  private readonly CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dkjm5kubx/image/upload'; // Change to your cloud name
  private readonly UPLOAD_PRESET = 'portfolio-builder'; // Change to your upload preset

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.profilesCollection = this.afs.collection<Profile>('profiles');
  }

  // Method to retrieve profile by ID
  getProfile(profileId: string): Observable<Profile | undefined> {
    return this.profilesCollection.doc<Profile>(profileId).valueChanges().pipe(
      map(profileData => {
        if (profileData) {
          return {
            ...profileData,
            filesAndLinks: {
              files: profileData.filesAndLinks?.files || [],  // Default to empty array if undefined
              externalLinks: profileData.filesAndLinks?.externalLinks || []  // Default to empty array if undefined
            }
          };
        }
        return undefined;
      })
    );
  }

  // Method to upload files to Cloudinary
  private uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET); // Unsigned preset
    formData.append('cloud_name', 'dkjm5kubx');
    return this.http.post<any>(this.CLOUDINARY_URL, formData).toPromise().then(response => {
      console.log(response);
      return response.secure_url; // Return the secure URL of the uploaded file
    });
  }

  // Method to save profile with file uploads
  saveProfile(profile: Profile, files: File[] = []): Promise<void> {
    console.log(files)
    const uploadTasks = files.map(file => this.uploadToCloudinary(file)); // Upload files to Cloudinary
console.log(uploadTasks)
    return Promise.all(uploadTasks).then((fileUrls) => {
      console.log(fileUrls)
      profile.filesAndLinks = {
        files: fileUrls, // Store the uploaded file URLs
        externalLinks: profile.filesAndLinks?.externalLinks || []
      };
      profile.id = this.afs.createId();
      console.log(profile)
      return this.profilesCollection.doc(profile.id).set(profile);
    });
  }

  // Method to update an existing profile
  updateProfile(profileId: string, profile: Profile, files: File[] = []): Promise<void> {
    const uploadTasks = files.map(file => this.uploadToCloudinary(file)); // Upload files to Cloudinary

    return Promise.all(uploadTasks).then((fileUrls) => {
      profile.filesAndLinks = {
        files: fileUrls,
        externalLinks: profile.filesAndLinks?.externalLinks || []
      };
      return this.profilesCollection.doc(profileId).update(profile);
    });
  }

  // Method to delete profile by ID
  deleteProfile(profileId: string): Promise<void> {
    return this.profilesCollection.doc(profileId).delete();
  }
}
