"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getInventoryAuthClient } from "@/lib/supabase/inventory-auth";

type AccountNavLinkProps = {
  className?: string;
  onClick?: () => void;
};

export function AccountNavLink({ className, onClick }: AccountNavLinkProps) {
  const [label, setLabel] = useState("Sign In");

  useEffect(() => {
    async function checkSession() {
      const supabase = getInventoryAuthClient();
      const { data } = await supabase.auth.getUser();

      setLabel(data.user ? "Account" : "Sign In");
    }

    checkSession();
  }, []);

  return (
    <Link href="/account" onClick={onClick} className={className}>
      {label}
    </Link>
  );
}
