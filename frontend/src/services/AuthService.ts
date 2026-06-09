// AuthService — OAuth redirect + session lifecycle (Architecture Doc §5.1.3, §5.4).
// The provider handshake happens server-side; the browser just starts/ends the flow.
const BASE_URL =
  ((import.meta as any).env?.VITE_API_BASE_URL as string) ?? "http://localhost:8080";

export const AuthService = {
  /** Begin the OAuth redirect flow. The server handles the provider exchange. */
  login(provider: string = "google") {
    window.location.href = `${BASE_URL}/api/auth/login?provider=${encodeURIComponent(provider)}`;
  },

  /** End the session server-side (clears the HttpOnly cookie). */
  async logout(): Promise<void> {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },
};
