import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteShell } from "./components/SiteShell";
import { EvidencePage } from "./pages/EvidencePage";
import { HomePage } from "./pages/HomePage";
import { LabPage } from "./pages/LabPage";
import { PaperPage } from "./pages/PaperPage";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/paper" element={<PaperPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  );
}
