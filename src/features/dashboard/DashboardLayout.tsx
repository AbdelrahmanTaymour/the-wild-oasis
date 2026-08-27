import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending: isLoading1 } = useRecentBookings();
  const { isPending: isLoading2, stays, confirmedStays } = useRecentStays();

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
