export default function formatUrl(url) {
  const match = url.match(/\/([^\/]+)$/); // Extract last part of URL
  if (!match) return null;

  return match[1]
    .split("-") // Split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize
    .join(" "); // Join with spaces
}
