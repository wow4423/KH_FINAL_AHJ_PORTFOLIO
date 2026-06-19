import { Navigate, Route, Routes } from "react-router-dom";
import DefaultLayout from "./app/layouts/DefaultLayout";
import HomePage from "./pages/home/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Navigate to="home?section=intro" replace />} />
        <Route path="home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
