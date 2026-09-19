export interface Listing {
  id: string;
  source: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  listedDate: string;
  status: string;
  description: string;
  relevanceScore: number;
}

export interface SearchResponse {
  totalResults: number;
  page: number;
  pageSize: number;
  totalPages: number;
  results: Listing[];
}

export interface ApiError {
  status: number;
  error: string;
  detail: string;
}
