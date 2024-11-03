export interface Profile {
    id: string;
    basicInfo: {
      firstName: string;
      lastName: string;
      gender?: string;
      dob?: string;
    };
    contactInfo: {
      email: string;
      phone?: string;
    };
    professionalDetails?: {
      profession?: string;
      organization?: string;
      experience?: string;
    };
    socialLinks?: {
      linkedin?: string;
      github?: string;
      twitter?: string;
      website?: string;
    };
    bio?: string;
    profilePicture?: string;
    filesAndLinks?: {
      files: string[];
      externalLinks?: string[]; // Made optional
    };
}
