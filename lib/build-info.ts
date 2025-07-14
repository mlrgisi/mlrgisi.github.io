// Build information utility
export interface BuildInfo {
  buildTime: string;
  isDevelopment: boolean;
}

export function getBuildInfo(): BuildInfo {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    // In development, always return current time
    return {
      buildTime: new Date().toISOString(),
      isDevelopment: true
    };
  } else {
    // In production, return the build time that was set during build
    return {
      buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString(),
      isDevelopment: false
    };
  }
}

export function formatBuildTime(buildTime: string): string {
  const date = new Date(buildTime);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
}
