"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const naam = formData.get("naam")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const bericht = formData.get("bericht")?.toString().trim();

  if (!naam || !email || !bericht) {
    return { status: "error", message: "Vul alle velden in." };
  }

  // TODO: koppel een echte e-mailservice (bv. Resend) zodra Kay een API-key heeft.
  // Nu wordt het bericht alleen gelogd, er wordt nog niets daadwerkelijk verstuurd.
  console.log("Contactformulier ontvangen:", { naam, email, bericht });

  return { status: "success", message: "Bedankt, we nemen zo snel mogelijk contact op." };
}
