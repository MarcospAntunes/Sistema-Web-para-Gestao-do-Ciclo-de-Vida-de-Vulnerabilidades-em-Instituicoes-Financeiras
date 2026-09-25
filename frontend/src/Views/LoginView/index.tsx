"use client";

import { Button, ChangeThemeButton, Input, Logo } from "@/components";
import { LoginViewStyle } from "./LoginView.style";
import { useTheme } from "@/hooks";
import { darkTheme, lightTheme } from "@/themes";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { useState } from "react";
import { login, register } from "@/api";

export default function LoginView() {
  const { theme } = useTheme();
  const [form, setForm] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleForm = (form: "login" | "register") => {
    setForm(form);
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
        // Auto-login após registro bem-sucedido
        const loginResult = await login(registerEmail, registerPassword);

        if (loginResult?.success) {
          window.location.href = "/dashboard";
        } else {
          // Registro ok, redireciona para login
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

  return (
    <LoginViewStyle theme={theme === "dark" ? darkTheme : lightTheme}>
      <section>
        <Logo />
        <div>
          <h1>
            Priorize o que realmente <br /> <span>coloca você em risco</span>.
          </h1>
          <p>
            Centralize relatórios de varredura, classifique por CVSS e exposição
            e acompanhe cada correção até a validação final.
          </p>
        </div>
        <p>TCC · Gestão do ciclo de vida de vulnerabilidades</p>
      </section>
      <section>
        <div>
          <ChangeThemeButton />
        </div>
        <div>
          <div>
            <h2>Entrar na plataforma</h2>
            <p>Use suas credencias corporativas para acessar o painel.</p>
          </div>
          <div className="button-container">
            <Button
              text="Entrar"
              type="button"
              onClick={() => handleForm("login")}
              className={form == "login" ? "active" : "disabled"}
            />
            <Button
              text="Registrar"
              type="button"
              onClick={() => handleForm("register")}
              className={form == "register" ? "active" : "disabled"}
            />
          </div>
          {form == "login" ? (
            <form onSubmit={handleLogin}>
              <Input
                Icon={MdOutlineEmail}
                placeholder="nome@empresa.com"
                labelText="E-mail"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                Icon={TbLockPassword}
                placeholder="********"
                type="password"
                labelText="Senha"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{error}</p>}
              <div>
                <label htmlFor="remember-me-input" id="remember-me-label">
                  <input id="remember-me-input" type="checkbox" />
                  <span>Manter conectado</span>
                </label>
                <a href="#">Esqueci minha senha</a>
              </div>
              <Button text={loading ? "Entrando..." : "Entrar"} type="submit" />
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <Input
                Icon={MdOutlineEmail}
                placeholder="Seu nome completo"
                labelText="Nome Completo"
                type="text"
                name="name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
              <Input
                Icon={MdOutlineEmail}
                placeholder="nome@empresa.com"
                labelText="E-mail"
                type="email"
                name="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <Input
                Icon={TbLockPassword}
                placeholder="********"
                type="password"
                labelText="Senha"
                name="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              {error && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{error}</p>}
              <div>
                <label htmlFor="agree-terms-input" id="remember-me-label">
                  <input
                    id="agree-terms-input"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    Concordo com a política de uso e o tratamento de dados de
                    segurança
                  </span>
                </label>
              </div>
              <Button text={loading ? "Criando conta..." : "Criar conta"} type="submit" />
              <a
                href="#"
                onClick={() => handleForm("login")}
                style={{ width: "100%" }}
              >
                Já possui conta?
              </a>
            </form>
          )}
        </div>
      </section>
    </LoginViewStyle>
  );
}

