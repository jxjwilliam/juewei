/**
 * Get R2 URL for an image path
 * Converts relative path to R2 URL
 */
export function getR2Url(imagePath: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_BASE_URL;
  
  if (!baseUrl) {
    console.warn('NEXT_PUBLIC_R2_BASE_URL not configured, using local path');
    return `/images/${imagePath}`;
  }
  
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Remove trailing slash from baseUrl if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Construct the final URL
  const finalUrl = `${cleanBaseUrl}/${cleanPath}`;
  
  return finalUrl;
}
