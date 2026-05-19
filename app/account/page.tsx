"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Crown,
  LogOut,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";
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
      <main className="min-h-screen bg-ivory px-4 py-8 text-deep-brown">
        <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] p-6 shadow-sm">
          <p className="text-sm text-soft-brown">Checking account...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory px-4 py-6 text-deep-brown sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
          <div className="relative px-5 py-5 sm:px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.74))]" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
                  <UserRound className="h-4.5 w-4.5" strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-gold uppercase">
                    Handpicked Account
                  </p>

                  <h1 className="mt-1 text-3xl font-semibold tracking-[-0.045em] text-deep-brown sm:text-[2rem]">
                    {userEmail ? `Welcome, ${displayName}` : "Your Handpicked profile"}
                  </h1>
                </div>
              </div>

              <div className="max-w-md border-t border-warm-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <p className="text-sm leading-6 text-soft-brown">
                  Save your delivery details and enjoy a smoother checkout
                  experience.
                </p>

                {userEmail ? (
                  <p className="mt-1 text-xs font-medium tracking-[0.14em] text-muted-gold uppercase">
                    {adminUser ? `${adminUser.role} access` : "Customer account"}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {!userEmail ? (
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-warm-border bg-[#FFFDF9] shadow-[0_22px_70px_rgba(47,33,24,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.14),transparent_36%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.76))]" />

              <div className="relative p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
                  <Sparkles className="h-5 w-5" strokeWidth={1.7} />
                </div>

                <p className="mt-7 text-xs font-semibold tracking-[0.28em] text-muted-gold uppercase">
                  Member Experience
                </p>

                <h2 className="mt-3 text-4xl font-medium leading-tight tracking-[-0.05em] text-deep-brown sm:text-5xl">
                  A smoother way to shop Handpicked.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-soft-brown sm:text-base">
                  Create an account to keep your delivery details ready for
                  future orders. Your checkout becomes faster, cleaner, and more
                  personal.
                </p>

                <div className="mt-8 grid gap-3">
                  <AccountBenefit
                    icon={<Truck className="h-4 w-4" strokeWidth={1.7} />}
                    title="Faster checkout"
                    description="Saved name, phone, and delivery address."
                  />

                  <AccountBenefit
                    icon={<ShoppingBag className="h-4 w-4" strokeWidth={1.7} />}
                    title="Easy order requests"
                    description="Submit your selected pieces with less typing."
                  />

                  <AccountBenefit
                    icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.7} />}
                    title="Admin access protected"
                    description="Only approved owners/admins can open dashboard."
                  />
                </div>
              </div>
            </div>

            <AuthCard
              authMode={authMode}
              setAuthMode={setAuthMode}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSignIn={handleSignIn}
              handleSignUp={handleSignUp}
              isLoading={isLoading}
              message={message}
              isSuccessMessage={isSuccessMessage}
              clearMessage={() => {
                setMessage("");
                setIsSuccessMessage(false);
              }}
            />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <aside className="relative overflow-hidden rounded-[2rem] border border-warm-border bg-[#FFFDF9] shadow-[0_22px_70px_rgba(47,33,24,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

              <div className="relative p-5 sm:p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3F2A20] text-xl font-semibold uppercase text-[#FFFDF9] shadow-[0_14px_30px_rgba(63,42,32,0.16)]">
                  {displayName.slice(0, 1)}
                </div>

                <p className="mt-5 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
                  Signed In
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-deep-brown">
                  {displayName}
                </h2>

                <p className="mt-2 break-all text-sm leading-6 text-soft-brown">
                  {userEmail}
                </p>

                <div className="mt-5 rounded-[1.5rem] border border-warm-border bg-white/50 p-4">
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
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435]"
                    >
                      Open Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}

                  <a
                    href="/shop"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-warm-border bg-white/45 px-6 text-xs font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Continue Shopping
                  </a>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full text-xs font-semibold tracking-[0.16em] text-taupe uppercase transition hover:text-deep-brown"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            <section className="relative overflow-hidden rounded-[2rem] border border-warm-border bg-[#FFFDF9] shadow-[0_22px_70px_rgba(47,33,24,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.10),transparent_34%)]" />

              <form onSubmit={handleSaveProfile} className="relative">
                <div className="border-b border-warm-border px-5 py-5 sm:px-7">
                  <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
                    Saved Delivery Details
                  </p>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-soft-brown">
                    These details will automatically fill your checkout form
                    when you are signed in.
                  </p>
                </div>

                <div className="grid gap-5 px-5 py-6 sm:px-7">
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

                  <AccountTextarea
                    label="Default Delivery Address"
                    value={defaultAddress}
                    onChange={setDefaultAddress}
                    rows={4}
                  />
                </div>

                {message ? (
                  <div className="px-5 sm:px-7">
                    <AccountMessage message={message} isSuccess={isSuccessMessage} />
                  </div>
                ) : null}

                <div className="px-5 pb-6 pt-2 sm:px-7">
                  <button
                    type="submit"
                    disabled={isProfileSaving}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435] disabled:cursor-not-allowed disabled:bg-[#D8CAB9] disabled:shadow-none"
                  >
                    {isProfileSaving ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

type AuthCardProps = {
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSignIn: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSignUp: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  message: string;
  isSuccessMessage: boolean;
  clearMessage: () => void;
};

function AuthCard({
  authMode,
  setAuthMode,
  email,
  setEmail,
  password,
  setPassword,
  handleSignIn,
  handleSignUp,
  isLoading,
  message,
  isSuccessMessage,
  clearMessage,
}: AuthCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-warm-border bg-[#FFFDF9] shadow-[0_22px_70px_rgba(47,33,24,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.12),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

      <div className="relative p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
              {authMode === "sign-in" ? "Welcome Back" : "Create Profile"}
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-deep-brown">
              {authMode === "sign-in" ? "Sign in" : "Create account"}
            </h2>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
            <UserRound className="h-5 w-5" strokeWidth={1.7} />
          </div>
        </div>

        <p className="mt-3 max-w-md text-sm leading-6 text-soft-brown">
          {authMode === "sign-in"
            ? "Access your saved delivery details and continue shopping faster."
            : "Save your delivery details for a faster Handpicked checkout."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-warm-border bg-white/45 p-1">
          <button
            type="button"
            onClick={() => {
              setAuthMode("sign-in");
              clearMessage();
            }}
            className={[
              "h-10 rounded-full text-xs font-semibold uppercase tracking-[0.16em] transition",
              authMode === "sign-in"
                ? "bg-[#3F2A20] text-[#FFFDF9] shadow-sm"
                : "text-soft-brown hover:text-deep-brown",
            ].join(" ")}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode("sign-up");
              clearMessage();
            }}
            className={[
              "h-10 rounded-full text-xs font-semibold uppercase tracking-[0.16em] transition",
              authMode === "sign-up"
                ? "bg-[#3F2A20] text-[#FFFDF9] shadow-sm"
                : "text-soft-brown hover:text-deep-brown",
            ].join(" ")}
          >
            Create Account
          </button>
        </div>

        <form
          onSubmit={authMode === "sign-in" ? handleSignIn : handleSignUp}
          className="mt-6 grid gap-5"
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
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435] disabled:cursor-not-allowed disabled:bg-[#D8CAB9] disabled:shadow-none"
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
    </div>
  );
}

function AccountBenefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-[1.35rem] border border-warm-border bg-white/45 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-deep-brown">{title}</p>
        <p className="mt-1 text-xs leading-5 text-soft-brown">{description}</p>
      </div>
    </div>
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
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-muted-gold uppercase">
        {label}
      </span>

      <input
        type={type}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full border-b border-warm-border bg-transparent px-0 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
      />

      {helper ? (
        <span className="mt-2 block text-xs leading-5 text-soft-brown">
          {helper}
        </span>
      ) : null}
    </label>
  );
}

function AccountTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-muted-gold uppercase">
        {label}
      </span>

      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none border-b border-warm-border bg-transparent px-0 py-2 text-sm leading-6 text-deep-brown outline-none transition focus:border-muted-gold"
      />
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
        "rounded-[1rem] border px-4 py-3 text-sm leading-6",
        isSuccess
          ? "border-[#D9E0CE] bg-[#F5F7F0] text-[#5B654A]"
          : "border-muted-gold/30 bg-light-sand text-soft-brown",
      ].join(" ")}
    >
      {message}
    </p>
  );
}
