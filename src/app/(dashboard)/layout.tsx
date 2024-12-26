import { Header } from "@/components/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <div>
        <h1>Dashboard Layout</h1>
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
