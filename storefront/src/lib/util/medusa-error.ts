export default function medusaError(error: any): never {
  // Medusa SDK v2 FetchError — has .status but no Axios-style .response
  if (typeof error.status === "number") {
    const msg = error.message || error.statusText || "An unknown error occurred"
    console.error(`[Medusa] HTTP ${error.status}: ${msg}`)
    throw new Error(msg.charAt(0).toUpperCase() + msg.slice(1))
  }

  if (error.response) {
    // Legacy Axios-style error
    const message = error.response.data?.message || error.response.data
    console.error("Response data:", error.response.data)
    console.error("Status code:", error.response.status)
    throw new Error(
      typeof message === "string"
        ? message.charAt(0).toUpperCase() + message.slice(1) + "."
        : "An unknown error occurred."
    )
  } else if (error.request) {
    throw new Error("No response received from server.")
  } else {
    throw new Error("Error setting up the request: " + error.message)
  }
}
