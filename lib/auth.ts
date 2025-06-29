export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3300/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include", // Garantir que os cookies são enviados
  });

  if (!res.ok) {
    throw new Error("Falha no login");
  }

  return await res.json(); // Retorna o usuário e o token
}

export async function logout() {
  const res = await fetch("http://localhost:3300/logout", {
    method: "POST",
    credentials: "include", // garante envio do cookie
  });

  if (!res.ok) {
    throw new Error("Falha no logout");
  }

  return await res.json(); // opcional, caso seu backend envie uma mensagem
}
