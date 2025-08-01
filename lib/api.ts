const BASE_URL = "http://127.0.0.1:8000";
import { VerificationResponse } from "./types";

export async function HelloWorld() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/hello");
    if (!res.ok) {
      throw new Error("Error fetching");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function VerificationResult(
  claim: string
): Promise<VerificationResponse | null> {
  try {
    const res = await fetch(`${BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: claim }),
    });
    if (!res.ok) {
      throw new Error("Failed to POST data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function VerificationResultFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${BASE_URL}/verify-file`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      return error.detail;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
