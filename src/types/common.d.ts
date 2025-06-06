export interface ApiError extends Error {
  mssage?: string;
  code?: number;
}
