"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Crown, LogOut, ShieldCheck, ShoppingBag, UserRound } from "lucide-react";
import { getInventoryAuthClient } from "@/lib/supabase/inventory-auth";

const dashboardUrl =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ||
  "https://handpicked-dashboard.vercel.app";

type AdminUser = {
  email: string;
  role: string;
  active: boolean;
};

type CustomerProfile = {
  full_name: string | null;
  phone: string | null;
  default_address: string | null;
};

type AuthMode = "sign-in" | "sign-up";

export default function AccountPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    async function loadSession() {
      const supabase = getInventoryAuthClient();
      const { data } = await supabase.auth.getUser();

      if (data.user?.email) {
        setUserId(data.user.id);
        setUserEmail(data.user.email);
        await checkAdminAccess(data.user.email);
        await loadCustomerProfile(data.user.id, data.user.email);
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

  async function loadCustomerProfile(activeUserId: string, activeEmail: string) {
    const supabase = getInventoryAuthClient();

    const { data } = await supabase
      .from("customer_profiles")
      .select("full_name, phone, default_address")
      .eq("user_id", activeUserId)
      .single();

    if (data) {
      const profile = data as CustomerProfile;
      setFullName(profile.full_name || "");
      setPhone(profile.phone || "");
      setDefaultAddress(profile.default_address || "");
      return;
    }

    await supabase.from("customer_profiles").insert({
      user_id: activeUserId,
      email: activeEmail,
      full_name: "",
      phone: "",
      default_address: "",
    });
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

      setUserId(data.user.id);
      setUserEmail(data.user.email);
      await checkAdminAccess(data.user.email);
      await loadCustomerProfile(data.user.id, data.user.email);
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
        setUserId(data.user.id);
        setUserEmail(data.user.email);
        await checkAdminAccess(data.user.email);
        await loadCustomerProfile(data.user.id, data.user.email);
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

  async function handleSaveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId || !userEmail) {
      setIsSuccessMessage(false);
      setMessage("Please sign in before saving your profile.");
      return;
    }

    setIsProfileSaving(true);
    setMessage("");
    setIsSuccessMessage(false);

    try {
      const supabase = getInventoryAuthClient();

      const { error } = await supabase.from("customer_profiles").upsert(
        {
          user_id: userId,
          email: userEmail,
          full_name: fullName.trim(),
          phone: phone.trim(),
          default_address: defaultAddress.trim(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

      if (error) {
        setMessage(error.message);
        return;
      }

      setIsSuccessMessage(true);
      setMessage("Profile saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsProfileSaving(false);
    }
  }

  async function handleSignOut() {
    const supabase = getInventoryAuthClient();
    await supabase.auth.signOut();

    setUserId("");
    setUserEmail("");
    setAdminUser(null);
    setEmail("");
    setPassword("");
    setFullName("");
    setPhone("");
    setDefaultAddress("");
    setAuthMode("sign-in");
    setIsSuccessMessage(true);
    setMessage("Signed out successfully.");
  }

  const displayName = fullName.trim() || userEmail.split("@")[0] || "there";

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
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[2rem] border border-warm-border bg-soft-white px-6 py-7 shadow-sm sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-gold">
            Handpicked Account
          </p>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif-brand text-5xl font-medium tracking-[-0.05em] text-deep-brown sm:text-6xl">
                {userEmail ? `Welcome, ${displayName}` : "Your Handpicked profile"}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-soft-brown sm:text-base">
                Save your delivery details, manage your account, and continue
                shopping with a smoother checkout experience.
              </p>
            </div>

            {userEmail ? (
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-warm-border bg-ivory px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-soft-brown">
                {adminUser ? <ShieldCheck className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
                {adminUser ? `${adminUser.role} access` : "Customer account"}
              </div>
            ) : null}
          </div>
        </div>

        {!userEmail ? (
          <div className="mx-auto max-w-xl rounded-[2rem] border border-warm-border bg-soft-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-warm-border bg-ivory text-deep-brown">
              <UserRound className="h-6 w-6" strokeWidth={1.7} />
            </div>

            <h2 className="mt-5 text-center font-serif-brand text-4xl font-medium tracking-[-0.04em]">
              {authMode === "sign-in" ? "Sign in" : "Create account"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-6 text-soft-brown">
              {authMode === "sign-in"
                ? "Access your saved details and continue shopping faster."
                : "Create a Handpicked account to save your delivery details for future orders."}
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
              <AccountInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />

              <AccountInput
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                required
                minLength={6}
                helper={authMode === "sign-up" ? "Use at least 6 characters." : undefined}
              />

              {message ? (
                <AccountMessage message={message} isSuccess={isSuccessMessage} />
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold uppercase tracking-[0.16em] !text-[#FFFDF9] shadow-sm transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe"
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
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.35fr]">
            <aside className="space-y-5">
              <div className="rounded-[2rem] border border-warm-border bg-soft-white p-6 shadow-sm">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4A3327] text-xl font-semibold uppercase text-[#FFFDF9]">
                  {displayName.slice(0, 1)}
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-gold">
                  Signed In
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-deep-brown">
                  {displayName}
                </h2>

                <p className="mt-2 break-all text-sm leading-6 text-soft-brown">
                  {userEmail}
                </p>

                <div className="mt-5 rounded-[1.25rem] border border-warm-border bg-ivory p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-deep-brown">
                    {adminUser ? (
                      <>
                        <Crown className="h-4 w-4 text-muted-gold" />
                        Admin access
                      </>
                    ) : (
                      <>
                        <UserRound className="h-4 w-4 text-muted-gold" />
                        Customer profile
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-soft-brown">
                    {adminUser
                      ? `You have ${adminUser.role} access to the Handpicked dashboard.`
                      : "Your saved details will help us process your order faster."}
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  {adminUser ? (
                    <a
                      href={dashboardUrl}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#4A3327] px-6 text-xs font-semibold uppercase tracking-[0.16em] !text-[#FFFDF9] shadow-sm transition hover:bg-[#6F5A49]"
                    >
                      Open Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}

                  <a
                    href="/shop"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold uppercase tracking-[0.16em] text-deep-brown shadow-sm transition hover:bg-light-sand"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Continue Shopping
                  </a>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-warm-border bg-ivory px-6 text-xs font-semibold uppercase tracking-[0.16em] text-soft-brown shadow-sm transition hover:bg-light-sand"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            <section className="rounded-[2rem] border border-warm-border bg-soft-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-gold">
                Saved Delivery Details
              </p>

              <h2 className="mt-3 font-serif-brand text-4xl font-medium tracking-[-0.04em] text-deep-brown">
                Profile details
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-soft-brown">
                These details will be used to fill your checkout form
                automatically when you are signed in.
              </p>

              <form onSubmit={handleSaveProfile} className="mt-7 grid gap-5">
                <AccountInput
                  label="Full Name"
                  value={fullName}
                  onChange={setFullName}
                />

                <AccountInput
                  label="Phone Number"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                />

                <label className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-brown">
                    Default Delivery Address
                  </span>

                  <textarea
                    rows={5}
                    value={defaultAddress}
                    onChange={(event) => setDefaultAddress(event.target.value)}
                    className="resize-none rounded-[1.25rem] border border-warm-border bg-ivory px-4 py-3 text-sm leading-6 text-deep-brown outline-none transition focus:border-muted-gold"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isProfileSaving}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold uppercase tracking-[0.16em] !text-[#FFFDF9] shadow-sm transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe"
                >
                  {isProfileSaving ? "Saving..." : "Save Profile"}
                </button>

                {message ? (
                  <AccountMessage message={message} isSuccess={isSuccessMessage} />
                ) : null}
              </form>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

type AccountInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  minLength?: number;
  helper?: string;
};

function AccountInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  minLength,
  helper,
}: AccountInputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-soft-brown">
        {label}
      </span>

      <input
        type={type}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[1.25rem] border border-warm-border bg-ivory px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
      />

      {helper ? (
        <span className="text-xs leading-5 text-soft-brown">{helper}</span>
      ) : null}
    </label>
  );
}

function AccountMessage({
  message,
  isSuccess,
}: {
  message: string;
  isSuccess: boolean;
}) {
  return (
    <p
      className={[
        "rounded-[1rem] border p-3 text-sm leading-6",
        isSuccess
          ? "border-[#D9E0CE] bg-[#F5F7F0] text-[#5B654A]"
          : "border-muted-gold/30 bg-light-sand text-soft-brown",
      ].join(" ")}
    >
      {message}
    </p>
  );
}
