import { useState } from "react";
import { login, register } from "@/api";

export function useAuthForm() {
  const [form, setForm] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleFormChange = (newForm: "login" | "register") => {
    setForm(newForm);
    setErrors({});
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Regra igual à do backend (backend/src/models/User.cs):
  // 8 a 64 caracteres, com maiúscula, minúscula, número e caractere especial.
  const isValidPassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^\da-zA-Z]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 64;
    return (
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isValidLength
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let hasError = false;
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email é obrigatório.";
      hasError = true;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Por favor, insira um endereço de e-mail válido.";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);

      if (result?.success) {
        window.location.href = "/dashboard";
      } else {
        setErrors({ general: result?.error || "Erro ao realizar login" });
      }
    } catch {
      setErrors({ general: "Erro de conexão com o servidor" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let hasError = false;
    const newErrors: typeof errors = {};

    if (!registerName || registerName.length < 3 || registerName.length > 255) {
      newErrors.name = "O nome deve ter entre 3 e 255 caracteres.";
      hasError = true;
    }

    if (!registerEmail) {
      newErrors.email = "Email é obrigatório.";
      hasError = true;
    } else if (!isValidEmail(registerEmail)) {
      newErrors.email = "Por favor, insira um endereço de e-mail válido.";
      hasError = true;
    }

    if (!registerPassword) {
      newErrors.password = "A senha é obrigatória.";
      hasError = true;
    } else if (!isValidPassword(registerPassword)) {
      newErrors.password =
        "A senha deve ter de 8 a 64 caracteres, com letra maiúscula, minúscula, número e caractere especial.";
      hasError = true;
    }

    if (!agreeTerms) {
      newErrors.general = "Você precisa concordar com a política de uso.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const result = await register(
        registerName,
        registerEmail,
        registerPassword,
      );

      if (result?.success) {
        const loginResult = await login(registerEmail, registerPassword);
        if (loginResult?.success) {
          window.location.href = "/dashboard";
        } else {
          setForm("login");
          setEmail(registerEmail);
          setErrors({});
        }
      } else {
        setErrors({ general: result?.error || "Erro ao criar conta" });
      }
    } catch {
      setErrors({ general: "Erro de conexão com o servidor" });
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
    errors,
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
