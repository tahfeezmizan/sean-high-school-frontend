export type TPlan = {
  id: string;
  planName: string;
  description: string;
  price: number;
  slug:string
  included: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type TUser = {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    role: string
  };

export type TSubscription = {
  id: string;
  userId: string;
  planId: string;
  startDate: string; // ISO Date string
  endDate: string | null; // can be null if not ended
  amount: number;
  stripePaymentId: string;
  paymentStatus: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  user?: TUser;
  plan?: TPlan
};



export type TTestimonialsType = {
  id: string
  userId: string
  review: string
  rating: number
  isOnHomePage: boolean
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    profilePicture: string | null
    role: string
  }
}