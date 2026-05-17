"use client";

import { useEffect, useState } from "react";
import { getInventoryAuthClient } from "@/lib/supabase/inventory-auth";

const dashboardUrl =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ||
  "https://handpicked-dashboard.vercel.app";

type AdminUser = {
  email: string;
  role: string;
  active: boolean;
};

type AuthMode = "sign-in" | "sign-up";

export default function AccountPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const supabase = getInventoryAuthClient();
      const { data } = await supabase.auth.getUser();

      if (data.user?.email) {
        setUserEmail(data.user.email);
        await checkAdminAccess(data.user.email);
      }

      setIsCheckingSession(false);
    }

    loadSession();
  }, []);

  async function checkAdminAccess(activeEmail: string) {
    const supabase = getInventoryAuthClient();

    const { data } = await supabase
      .from("admin_users")
      .select("email, role, active")
      .eq("email", activeEmail)
      .eq("active", true)
      .single();

    setAdminUser(data || null);
  }

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsSuccessMessage(false);
    setIsLoading(true);

    try {
      const supabase = getInventoryAuthClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user?.email) {
        setMessage(error?.message || "Login failed.");
        return;
      }

      setUserEmail(data.user.email);
      await checkAdminAccess(data.user.email);
      setIsSuccessMessage(true);
      setMessage("Signed in successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsSuccessMessage(false);
    setIsLoading(true);

    try {
      const supabase = getInventoryAuthClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.user?.email && data.session) {
        setUserEmail(data.user.email);
        await checkAdminAccess(data.user.email);
        setIsSuccessMessage(true);
        setMessage("Account created successfully.");
        return;
      }

      setIsSuccessMessage(true);
      setMessage(
        "Account created. Please check your email to confirm your account, then sign in."
      );
      setAuthMode("sign-in");
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    const supabase = getInventoryAuthClient();
    await supabase.auth.signOut();

    setUserEmail("");
    setAdminUser(null);
    setEmail("");
    setPassword("");
    setAuthMode("sign-in");
    setIsSuccessMessage(true);
    setMessage("Signed out successfully.");
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen bg-ivory px-4 py-10 text-deep-brown">
        <div className="mx-auto max-w-xl rounded-[1.75rem] border border-warm-border bg-soft-white p-6 shadow-sm">
          <p className="text-sm text-soft-brown">Checking account...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory px-4 py-10 text-deep-brown sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
        <section className="w-full rounded-[1.75rem] border border-warm-border bg-soft-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-gold">
            Handpicked Account
          </p>

          <h1 className="mt-3 font-serif-brand text-5xl font-medium tracking-[-0.04em] text-deep-brown">
            Account
          </h1>

          {!userEmail ? (
            <>
              <p className="mt-4 text-sm leading-7 text-soft-brown">
                Sign in or create an account to manage your Handpicked profile.
                Approved admins will also see dashboard access here.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2 rounded-full border border-warm-border bg-ivory p-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("sign-in");
                    setMessage("");
                    setIsSuccessMessage(false);
                  }}
                  className={[
                    "h-10 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition",
                    authMode === "sign-in"
                      ? "bg-[#4A3327] text-[#FFFDF9]"
                      : "text-soft-brown hover:bg-soft-white",
                  ].join(" ")}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("sign-up");
                    setMessage("");
                    setIsSuccessMessage(false);
                  }}
                  className={[
                    "h-10 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition",
                    authMode === "sign-up"
                      ? "bg-[#4A3327] text-[#FFFDF9]"
                      : "text-soft-brown hover:bg-soft-white",
                  ].join(" ")}
                >
                  Create Account
                </button>
              </div>

              <form
                onSubmit={authMode === "sign-in" ? handleSignIn : handleSignUp}
                className="mt-7 grid gap-4"
              >
                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-brown">
                    Email
                  </span>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-11 rounded-[1rem] border border-warm-border bg-ivory px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-brown">
                    Password
                  </span>

                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-11 rounded-[1rem] border border-warm-border bg-ivory px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
                  />

                  {authMode === "sign-up" ? (
                    <span className="text-xs leading-5 text-soft-brown">
                      Use at least 6 characters.
                    </span>
                  ) : null}
                </label>

                {message ? (
                  <p
                    className={[
                      "rounded-[1rem] border p-3 text-sm leading-6",
                      isSuccessMessage
                        ? "border-[#D9E0CE] bg-[#F5F7F0] text-[#5B654A]"
                        : "border-muted-gold/30 bg-light-sand text-soft-brown",
                    ].join(" ")}
                  >
                    {message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold uppercase tracking-[0.16em] !text-[#FFFDF9] shadow-sm transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe"
                >
                  {isLoading
                    ? authMode === "sign-in"
                      ? "Signing in..."
                      : "Creating..."
                    : authMode === "sign-in"
                      ? "Sign In"
                      : "Create Account"}
                </button>
              </form>
            </>
          ) : (
            <div className="mt-7 space-y-4">
              <div className="rounded-[1.5rem] border border-warm-border bg-ivory p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-gold">
                  Signed In
                </p>

                <p className="mt-2 text-lg font-semibold text-deep-brown">
                  {userEmail}
                </p>

                <p className="mt-2 text-sm leading-6 text-soft-brown">
                  {adminUser
                    ? `Admin access: ${adminUser.role}`
                    : "Customer account"}
                </p>
              </div>

              {adminUser ? (
                <a
                  href={dashboardUrl}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold uppercase tracking-[0.16em] !text-[#FFFDF9] shadow-sm transition hover:bg-[#6F5A49]"
                >
                  Open Dashboard
                </a>
              ) : null}

              <a
                href="/shop"
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold uppercase tracking-[0.16em] text-deep-brown shadow-sm transition hover:bg-light-sand"
              >
                Continue Shopping
              </a>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold uppercase tracking-[0.16em] text-deep-brown shadow-sm transition hover:bg-light-sand"
              >
                Sign Out
              </button>

              {message ? (
                <p
                  className={[
                    "rounded-[1rem] border p-3 text-sm leading-6",
                    isSuccessMessage
                      ? "border-[#D9E0CE] bg-[#F5F7F0] text-[#5B654A]"
                      : "border-muted-gold/30 bg-light-sand text-soft-brown",
                  ].join(" ")}
                >
                  {message}
                </p>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
