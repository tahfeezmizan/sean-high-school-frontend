export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
      accessToken: string;
    };
  }
  
  export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    profilePicture?: string | null;
    isOnline: boolean;
    createdAt: string;
  }
  
  export interface RegisterRequest {
   name:string
    email: string;
    password: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
      message: string;
    };
  }