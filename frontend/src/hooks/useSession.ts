import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/ApiClient";
import { AuthService } from "../services/AuthService";
import { useSessionStore } from "../stores/sessionStore";

// useSession — current user, kept in the global store and refreshed via the cache.
// (Architecture Doc §5.1.3 stores/hooks.)
export function useSession() {
  const { user, setUser, clear } = useSessionStore();

  const query = useQuery({
    queryKey: ["session"],
    queryFn: () => apiClient.getCurrentUser(),
    retry: false,
  });

  useEffect(() => {
    if (query.data) setUser(query.data);
  }, [query.data, setUser]);

  return {
    user: user ?? query.data ?? null,
    isLoading: query.isLoading,
    login: AuthService.login,
    logout: async () => {
      await AuthService.logout();
      clear();
    },
  };
}
