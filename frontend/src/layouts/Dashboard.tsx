import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import FloatingAI from "../components/FloatingAI";
import Footer from "../components/Footer";

function DashboardLayout() {

    return (

        <div className="layout">

            <main className="content">

                <Outlet />

                <Footer />

            </main>

            <FloatingAI />

        </div>

    );
}

export default DashboardLayout;