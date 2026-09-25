import { useState } from "react";
import { login, register } from "@/api";

export function useAuthForm() {
  const [form, setForm] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleFormChange = (newForm: "login" | "register") => {
    setForm(newForm);
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result?.success) {
        window.location.href = "/dashboard";
      } else {
        setError(result?.error || "Erro ao realizar login");
      }
    } catch {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Você precisa concordar com a política de uso.");
      return;
    }

    setLoading(true);

    try {
      const result = await register(registerName, registerEmail, registerPassword);

      if (result?.success) {
        const loginResult = await login(registerEmail, registerPassword);
        if (loginResult?.success) {
          window.location.href = "/dashboard";
        } else {
          setForm("login");
          setEmail(registerEmail);
          setError("");
        }
      } else {
        setError(result?.error || "Erro ao criar conta");
      }
    } catch {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    registerName,
    setRegisterName,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
    agreeTerms,
    setAgreeTerms,
    handleFormChange,
    handleLogin,
    handleRegister,
  };
}
