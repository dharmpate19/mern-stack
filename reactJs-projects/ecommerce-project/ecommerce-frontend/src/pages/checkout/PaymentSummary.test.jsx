import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";

import  PaymentSummary  from "./PaymentSummary";
import userEvent from "@testing-library/user-event";
import axios from 'axios';

vi.mock('axios')

describe("PaymentSummary Component", () => {
  let paymentSummary;
  let getCartData;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251,
    };

    getCartData = vi.fn();
    user = userEvent.setup();
  });

  it("Displays the payment summary correctly", async() => {
    render(
        <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} getCartData={getCartData} />
        </MemoryRouter>
    )
    expect(screen.getByText('Items (3):')).toBeInTheDocument();
    expect(screen.getByText('$42.75')).toBeInTheDocument();
    expect(screen.getByTestId('payment-summary-shipping-cost')).toHaveTextContent('$4.99');
    expect(screen.getByTestId('payment-summary-total-before-tax')).toHaveTextContent('$47.74');
    expect(screen.getByTestId('payment-summary-tax')).toHaveTextContent('$4.77');
    expect(screen.getByTestId('payment-summary-total')).toHaveTextContent('$52.51');
  });

  it('Place Order', async() => {
    function LocationDisplay() {
        const location = useLocation();
        return <div data-testid="url-path">{location.pathname}</div>;
    }
   render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          getCartData={getCartData}
        />
        <LocationDisplay />
      </MemoryRouter>
    );
    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(getCartData).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    
  })
});
