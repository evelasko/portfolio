"use client";

import { Button } from "@/components/ui/button";
import { TYPOGRAPHY } from "@/lib/typography";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface WaitlistFormProps {
  translationNamespace?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  variant?: "dark" | "light";
}

export default function WaitlistForm({
  translationNamespace = "home.sections.theHow",
  className,
  inputClassName,
  buttonClassName,
  variant = "dark",
}: WaitlistFormProps) {
  const t = useTranslations(`${translationNamespace}.waitlist`);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("https://cenie.org/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "evelas",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || t("success"));
        setFormData({ full_name: "", email: "" });
      } else {
        setStatus("error");
        setMessage(data.message || data.error || t("error"));
      }
    } catch (error) {
      setStatus("error");
      setMessage(t("networkError"));
    }
  };

  const isDark = variant === "dark";
  const inputBaseClasses = clsx(
    "w-full px-4 py-3 rounded-md border backdrop-blur-sm transition-all",
    TYPOGRAPHY.text16,
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "focus:outline-none focus:ring-2 transition-all",
    isDark
      ? "bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:ring-white/50 focus:border-white/50"
      : "bg-black/5 border-black/20 text-black placeholder:text-black/60 focus:ring-black/50 focus:border-black/50",
    inputClassName
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("w-full space-y-4", className)}
    >
      <div className="space-y-3">
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          value={formData.full_name}
          onChange={e =>
            setFormData({ ...formData, full_name: e.target.value })
          }
          required
          disabled={status === "loading"}
          className={inputBaseClasses}
        />
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          value={formData.email}
          onChange={e =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          disabled={status === "loading"}
          className={inputBaseClasses}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        brightness={isDark ? "dark" : "light"}
        size="lg"
        disabled={status === "loading"}
        className={clsx(
          TYPOGRAPHY.mono18,
          "uppercase w-full",
          status === "success" && isDark && "bg-white/10",
          buttonClassName
        )}
      >
        {status === "loading"
          ? t("submitting")
          : status === "success"
            ? t("submitted")
            : t("submitLabel")}
      </Button>
      {message && (
        <p
          className={clsx(
            TYPOGRAPHY.text14,
            "text-center",
            status === "error"
              ? isDark
                ? "text-red-200"
                : "text-red-600"
              : status === "success"
                ? isDark
                  ? "text-green-200"
                  : "text-green-600"
                : isDark
                  ? "text-white/80"
                  : "text-black/80"
          )}
        >
          {message}
        </p>
      )}
    </form>
  );
}

