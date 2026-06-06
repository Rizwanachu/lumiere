export function proxyImg(unsplashUrl: string): string {
  return `/api/img-proxy?url=${encodeURIComponent(unsplashUrl)}`;
}
