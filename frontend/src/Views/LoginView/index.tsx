"use client";

import { Button, ChangeThemeButton, Input, Logo } from "@/components";
import { LoginViewStyle } from "./LoginView.style";
import { useTheme, useAuthForm } from "@/hooks";
import { resolveTheme } from "@/themes";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

export default function LoginView() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);
  
  const {
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
  } = useAuthForm();

  return (
    <LoginViewStyle theme={currentTheme}>
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
              onClick={() => handleFormChange("login")}
              className={form == "login" ? "active" : "disabled"}
            />
            <Button
              text="Registrar"
              type="button"
              onClick={() => handleFormChange("register")}
              className={form == "register" ? "active" : "disabled"}
            />
          </div>
          {form == "login" ? (
            <form onSubmit={handleLogin} noValidate>
              <Input
                Icon={MdOutlineEmail}
                placeholder="nome@empresa.com"
                labelText="E-mail"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <Input
                Icon={TbLockPassword}
                placeholder="********"
                type="password"
                labelText="Senha"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              {errors.general && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{errors.general}</p>}
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
            <form onSubmit={handleRegister} noValidate>
              <Input
                Icon={MdOutlineEmail}
                placeholder="Seu nome completo"
                labelText="Nome Completo"
                type="text"
                name="name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                error={errors.name}
              />
              <Input
                Icon={MdOutlineEmail}
                placeholder="nome@empresa.com"
                labelText="E-mail"
                type="email"
                name="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                error={errors.email}
              />
              <Input
                Icon={TbLockPassword}
                placeholder="********"
                type="password"
                labelText="Senha"
                name="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                error={errors.password}
              />
              {errors.general && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{errors.general}</p>}
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
                onClick={() => handleFormChange("login")}
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

