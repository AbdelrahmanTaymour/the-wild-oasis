import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabins";
import Table from "../../ui/Table";
import type { CabinData } from "../../types/capinData";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isPending, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  const filteredValue = searchParams.get("discount") || "all";
  console.log(filteredValue);

  let filteredCabins;
  if (filteredValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  else if (filteredValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  else filteredCabins = cabins;

  console.log(filteredCabins);
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredCabins}
          render={(cabin: CabinData) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
