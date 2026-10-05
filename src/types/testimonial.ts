export interface Testimonial {
  id: string;
  customerName: string;
  review: string;
  rating: number; // 1 - 5
  roleOrLocation: string;
  propertyPurchased?: string;
  initials: string;
}
