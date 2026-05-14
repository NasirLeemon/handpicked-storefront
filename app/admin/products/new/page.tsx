"use client";

import { useState } from "react";

const categoryOptions = ["Co-ords", "Ethnic", "Tops", "Accessories", "Beauty"];
const availabilityOptions = ["available", "low-stock", "sold-out"];

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NewProductPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Ethnic");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [color, setColor] = useState("");
  const [sizes, setSizes] = useState("S, M, L");
  const [availability, setAvailability] = useState("available");
  const [featured, setFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNameChange(value: string) {
    setName(value);

    if (!slug) {
      setSlug(createSlug(value));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setIsSubmitting(true);

    const images = imageUrls
      .split("\n")
      .map((image) => image.trim())
      .filter(Boolean);

    const parsedSizes = sizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean);

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminPassword,
          name,
          slug,
          price: Number(price),
          category,
          description,
          details,
          images,
          color,
          sizes: parsedSizes,
          availability,
          featured,
          isNewArrival,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "Failed to add product.");
        return;
      }

      setStatus("Product added successfully.");

      setName("");
      setSlug("");
      setPrice("");
      setDescription("");
      setDetails("");
      setImageUrls("");
      setColor("");
      setSizes("S, M, L");
      setAvailability("available");
      setFeatured(false);
      setIsNewArrival(true);
    } catch {
      setStatus("Failed to add product.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory px-4 py-8 text-deep-brown sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
            Admin
          </p>

          <h1 className="mt-2 font-serif-brand text-5xl font-medium tracking-[-0.04em] text-deep-brown">
            Add Product
          </h1>

          <p className="mt-3 text-sm leading-6 text-soft-brown">
            Upload photos to Cloudinary first, then paste the image URLs here.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm sm:p-7"
        >
          <div className="grid gap-4">
            <Field label="Admin Password">
              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                required
                className="admin-input"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product Name">
                <input
                  value={name}
                  onChange={(event) => handleNameChange(event.target.value)}
                  required
                  className="admin-input"
                />
              </Field>

              <Field label="Slug">
                <input
                  value={slug}
                  onChange={(event) => setSlug(createSlug(event.target.value))}
                  required
                  className="admin-input"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Price">
                <input
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                  min="1"
                  className="admin-input"
                />
              </Field>

              <Field label="Category">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="admin-input"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Availability">
                <select
                  value={availability}
                  onChange={(event) => setAvailability(event.target.value)}
                  className="admin-input"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Color">
                <input
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                  required
                  className="admin-input"
                />
              </Field>

              <Field label="Sizes">
                <input
                  value={sizes}
                  onChange={(event) => setSizes(event.target.value)}
                  required
                  placeholder="S, M, L"
                  className="admin-input"
                />
              </Field>
            </div>

            <Field label="Short Description">
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={3}
                className="admin-textarea"
              />
            </Field>

            <Field label="Product Details">
              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                rows={3}
                className="admin-textarea"
              />
            </Field>

            <Field label="Cloudinary Image URLs">
              <textarea
                value={imageUrls}
                onChange={(event) => setImageUrls(event.target.value)}
                required
                rows={5}
                placeholder="Paste one image URL per line"
                className="admin-textarea"
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-[1rem] border border-warm-border bg-ivory px-4 py-3 text-sm text-deep-brown">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                />
                Featured product
              </label>

              <label className="flex items-center gap-3 rounded-[1rem] border border-warm-border bg-ivory px-4 py-3 text-sm text-deep-brown">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(event) => setIsNewArrival(event.target.checked)}
                />
                New arrival
              </label>
            </div>
          </div>

          {status ? (
            <p className="mt-5 rounded-[1rem] border border-muted-gold/30 bg-light-sand p-3 text-sm text-soft-brown">
              {status}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe sm:h-12 sm:text-sm"
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </main>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold tracking-[0.2em] text-muted-gold uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
