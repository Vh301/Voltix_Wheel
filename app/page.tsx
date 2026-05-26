import { LandingPage } from "@/components/landing-page";
import { LanguageProvider } from "@/components/language-provider";

export default function Home() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  );
}
