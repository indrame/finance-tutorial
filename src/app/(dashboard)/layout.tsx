import { Header } from "@/components/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      <div className="px-3 lg:px-14">{children}</div>
    </>
  );
};

export default DashboardLayout;
