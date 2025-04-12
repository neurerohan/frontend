import { getSession } from "next-auth/react";

/**
 * Safe fetch wrapper with error handling
 */
export async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options)

    // Check if response is ok
    if (!response.ok) {
      // Try to get error details if possible
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json()
        throw new Error(errorData.detail || errorData.message || `API request failed with status ${response.status}`)
      } else {
        // If not JSON, get text and throw that
        const errorText = await response.text()
        throw new Error(errorText || `API request failed with status ${response.status}`)
      }
    }

    // Check if response is empty
    const contentLength = response.headers.get("content-length")
    if (contentLength === "0" || response.status === 204) {
      return null
    }

    // Check content type
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    } else {
      // Return text for non-JSON responses
      return await response.text()
    }
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

// Check if the API URL is set, especially in production
if (!process.env.NEXT_PUBLIC_API_URL) {
  // In development, a fallback might be acceptable, but warn loudly.
  if (process.env.NODE_ENV === 'development') {
    console.warn('Warning: NEXT_PUBLIC_API_URL is not set. Falling back to default development URL.');
  } else {
    // In production, this is a critical error.
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set.');
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // Fallback ONLY for dev

/**
 * Base API client for making requests to the backend
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`

  // Get the session to access the token
  const session = await getSession();
  const token = session?.user?.accessToken; // Adjust based on where you stored the token in the user object

  // Set default headers
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  // Add Authorization header if token exists
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return safeFetch(url, {
    ...options,
    headers,
  })
}

/**
 * Helper methods for common API operations
 */
export const api = {
  get: (endpoint: string, options: RequestInit = {}) => fetchAPI(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, data: any, options: RequestInit = {}) =>
    fetchAPI(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: (endpoint: string, data: any, options: RequestInit = {}) =>
    fetchAPI(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: (endpoint: string, data: any, options: RequestInit = {}) =>
    fetchAPI(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (endpoint: string, options: RequestInit = {}) => fetchAPI(endpoint, { ...options, method: "DELETE" }),
}
