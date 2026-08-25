import styled from "styled-components";
import { useState } from "react";

import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";

import { formatCurrency } from "../../utils/helpers";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isPending } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoadingSettings } = useSetting();

  if (isPending || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid: bookingIsPaid,
  } = booking;

  const isPaid = (bookingIsPaid && !addBreakfast) || confirmPaid;
  const isPaymentConfirmationDisabled =
    (bookingIsPaid && !addBreakfast) || isCheckingIn;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleBreakfastChange() {
    setAddBreakfast((current) => !current);

    // Whenever breakfast changes, require payment confirmation again.
    setConfirmPaid(false);
  }

  function handlePaymentConfirmation() {
    setConfirmPaid((current) => !current);
  }

  function handleCheckin() {
    if (!isPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>

        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={handleBreakfastChange}
            disabled={isCheckingIn}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}{" "}
            for {numGuests} guests?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={isPaid}
          onChange={handlePaymentConfirmation}
          disabled={isPaymentConfirmationDisabled}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>

        <Button
          $variation="secondary"
          onClick={moveBack}
          disabled={isCheckingIn}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
