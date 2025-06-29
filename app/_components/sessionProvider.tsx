"use client";

import { useAuthStore } from "@/store/auth-store";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setAuthenticated, clearUser } = useAuthStore();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data: userData } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/me`,
          { withCredentials: true },
        );

        console.log("Dados do usuário recebidos do backend:", userData);

        // ✅ CORREÇÃO: A condição agora verifica por 'userId', que é o que o backend envia.
        if (userData && userData.userId) {
          // ✅ CORREÇÃO: Mapeamos os dados recebidos para o formato que o seu store espera.
          const formattedUser = {
            id: userData.userId, // Mapeia 'userId' para 'id'
            email: userData.email,
            // Adiciona um nome padrão se o backend não enviar um.
            name: userData.name,
            image: userData.image || null,
          };

          setUser(formattedUser);
          setAuthenticated(true);
        } else {
          console.log(
            "Resposta do backend não continha dados de usuário válidos.",
          );
          clearUser();
          setAuthenticated(false);
        }
      } catch (error) {
        console.log("Sessão não encontrada, limpando usuário." + error);
        clearUser();
        setAuthenticated(false);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkAuthStatus();
  }, [setUser, setAuthenticated, clearUser]);

  if (isCheckingSession) {
    return <div>Verificando sua sessão, aguarde...</div>;
  }

  return <>{children}</>;
}
