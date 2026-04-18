import PageHeader from "@/components/dashboard/analytics/PageHeader";
import StatsRow from "@/components/dashboard/analytics/StatsRow";
import ClicksOverTimeChart from "@/components/dashboard/analytics/ClickOverTimeChart";
import TopPerformingLinks from "@/components/dashboard/analytics/TopPerformingLinks";
import TrafficSources from "@/components/dashboard/analytics/TrafficSources";
import GlobalReach from "@/components/dashboard/analytics/GlobalReach";
import DeviceDistribution from "@/components/dashboard/analytics/DeviceDistribution";

export default function AnalyticsPage() {
  return (
    <div className="px-8 py-8 pb-12">
      <PageHeader />
      <StatsRow />
      <ClicksOverTimeChart />

      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-7">
          <TopPerformingLinks />
        </div>
        <div className="col-span-5">
          <TrafficSources />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7">
          <GlobalReach />
        </div>
        <div className="col-span-5">
          <DeviceDistribution />
        </div>
      </div>
    </div>
  );
}
