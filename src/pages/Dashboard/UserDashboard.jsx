import { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchDashboardData } from "../../redux/dashboard/dashboardActions";

import AccountInfo from "../../components/dashboard/AccountInfo";
import MarketData from "../../components/dashboard/MarketData";
import LoadingScreen from "../../components/common/LoadingScreen";

const PurchaseHistory = lazy(() =>
  import("../../components/dashboard/PurchaseHistory")
);
const RewardHistory = lazy(() =>
  import("../../components/dashboard/RewardHistory")
);

export default function Dashboard() {
  const dispatch = useDispatch();

  const loginUser = useMemo(() => {
    const storedUser = localStorage.getItem("authUser");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      console.warn("Invalid authUser format in localStorage");
      return null;
    }
  }, []);

  const { user, cryptos, purchaseHistory, rewardHistory, status, error } =
    useSelector((state) => state.dashboard, shallowEqual);

  useEffect(() => {
    if (loginUser?.email) {
      dispatch(fetchDashboardData(loginUser.email));
    }
  }, [dispatch, loginUser?.email]);

  if (status === "loading") {
    return <LoadingScreen message="Loading dashboard..." />;
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-center">
        <p>Error loading dashboard: {error || "Unknown error"}</p>
      </div>
    );
  }

  if (!loginUser?.email || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-center">
        <p>Please log in to continue.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen text-white px-4 py-6 md:px-8 lg:px-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl lg:text-[56px] font-grifter font-bold mb-2">
          Manage your Rewards and Payments
        </h1>
        <p className="text-sm font-aeonik text-gray-500">Pay with Crypto</p>
      </header>

      <main className="max-w-screen-2xl mx-auto">
        {/* Top Section - Account & Market Data */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AccountInfo user={user} />
          <MarketData cryptos={cryptos} />
        </section>

        {/* Bottom Section - Purchase & Reward History Side by Side */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="w-full">
            <Suspense fallback={<LoadingScreen message="Loading purchases..." />}>
              <PurchaseHistory data={purchaseHistory} />
            </Suspense>
          </div>
          
          <div className="w-full">
            <Suspense fallback={<LoadingScreen message="Loading rewards..." />}>
              <RewardHistory data={rewardHistory} />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}