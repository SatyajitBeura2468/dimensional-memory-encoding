import { SiteShell } from "./components/SiteShell";
import { EvidencePage } from "./pages/EvidencePage";
import { HomePage } from "./pages/HomePage";
import { LabPage } from "./pages/LabPage";
import { PaperPage } from "./pages/PaperPage";
import "./styles.css";

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const page =
    path === "/lab" ? (
      <LabPage />
    ) : path === "/evidence" ? (
      <EvidencePage />
    ) : path === "/paper" ? (
      <PaperPage />
    ) : (
      <HomePage />
    );
  return <SiteShell path={path}>{page}</SiteShell>;
}
