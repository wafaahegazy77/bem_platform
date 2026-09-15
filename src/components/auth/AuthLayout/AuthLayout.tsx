"use client";

import Navbar from "@/components/layout/Navbar";
import "./_AuthLayout.scss";

const AuthLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className="auth-layout">
            <Navbar auth />

            <div className="auth-content">
                <div className="container">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default AuthLayout;