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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

/**
 * Base API client for making requests to the backend
 */
export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
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
