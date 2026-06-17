import { Outlet } from "react-router-dom";
import Header from "./header/Header";

function DefaultLayout() {
  return (
    <div className="default-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
