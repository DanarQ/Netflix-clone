import { useState } from "react";
import { useSearchParams } from "react-router";
import AccountIcon from "../../components/AccountIcon";

export const plans = [
  { name: "Basic", quality: "720p", description: "Good video quality", devices: "1 device at a time" },
  { name: "Standard", quality: "1080p", description: "Great video quality", devices: "2 devices at a time" },
  { name: "Premium", quality: "4K + HDR", description: "Best video quality", devices: "4 devices at a time" },
] as const;

export type MembershipState = { plan: string; cancelled: boolean };
const storageKey = "myflix-demo-membership";

export function readMembership(): MembershipState {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (
      value &&
      plans.some((plan) => plan.name === value.plan) &&
      typeof value.cancelled === "boolean"
    ) {
      return { plan: value.plan, cancelled: value.cancelled };
    }
  } catch {
    /* Start with the demo plan if storage is unavailable. */
  }
  return { plan: "Premium", cancelled: false };
}

export default function MembershipView() {
  const [membership, setMembership] = useState(readMembership);
  const [selected, setSelected] = useState(membership.plan);
  const [params, setParams] = useSearchParams();
  const view = params.get("view");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const plan = plans.find((item) => item.name === membership.plan)!;

  function save(next: MembershipState, feedback: string) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setMembership(next);
      setMessage(feedback);
      setError("");
      setParams({});
    } catch {
      setError("Your changes couldn't be saved. Allow browser storage and try again.");
    }
  }

  function open(next: string) {
    setSelected(membership.plan);
    setMessage("");
    setError("");
    setParams({ view: next });
  }

  return (
    <>
      <div className="account-title">
        <h1>Membership</h1>
        <p>Manage your plan and payment details.</p>
      </div>
      {message && <p className="account-feedback" role="status">✓ {message}</p>}
      {error && <p className="account-error" role="alert">{error}</p>}
      {view === "plans" ? (
        <section aria-labelledby="change-plan-title">
          <h2 id="change-plan-title" className="account-section-title">
            Change plan
          </h2>
          <p className="account-description">
            Choose the plan that's right for you. These are demo options, with no payment required.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              save({ plan: selected, cancelled: false }, `Your demo plan is now ${selected}.`);
            }}
          >
            <fieldset className="account-plans">
              <legend className="account-sr-only">Select a demo plan</legend>
              {plans.map((option) => (
                <label
                  className={`account-plan-option ${selected === option.name ? "is-selected" : ""}`}
                  key={option.name}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={option.name}
                    checked={selected === option.name}
                    onChange={() => setSelected(option.name)}
                  />
                  <span className="account-plan-option__top">
                    <strong>{option.name}</strong>
                    <span>{option.quality}</span>
                  </span>
                  <span className="account-plan-option__body">
                    <span>{option.description}</span>
                    <span>{option.devices}</span>
                    <span>{option.name === membership.plan ? "Current plan" : "Demo plan"}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <p className="account-description">
              Plan selection is a preview. Video quality and device limits are not enforced in this demo.
            </p>
            <div className="account-actions">
              <button className="account-button account-button--primary" type="submit">
                Confirm change
              </button>
              <button className="account-button" type="button" onClick={() => setParams({})}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : (
        <>
          <section aria-labelledby="plan-details-title">
            <h2 id="plan-details-title" className="account-section-title">
              Plan details
            </h2>
            <div className="account-card">
              <div className="account-ribbon">
                {membership.cancelled ? "Cancelled demo membership" : "Demo membership"}
              </div>
              <div className="account-card-body account-plan-summary">
                <div>
                  <h3>{plan.name}</h3>
                  <p>
                    {plan.description}. {plan.devices}.
                  </p>
                </div>
                <span className="account-quality">{plan.quality}</span>
              </div>
              <button className="account-row" onClick={() => open("plans")}>
                <span>Change plan</span>
                <AccountIcon type="arrow" />
              </button>
            </div>
          </section>

          <section className="account-section" aria-labelledby="payment-info-title">
            <h2 id="payment-info-title">Payment info</h2>
            <div className="account-card">
              <div className="account-card-body">
                <h3>No payment method added</h3>
                <p>This demo membership is free. There is no upcoming payment.</p>
              </div>
              <button className="account-row" onClick={() => open("payment")}>
                <AccountIcon type="card" />
                <span>Manage payment method</span>
                <AccountIcon type="arrow" />
              </button>
              <button className="account-row" onClick={() => open("history")}>
                <span>View payment history</span>
                <AccountIcon type="arrow" />
              </button>
            </div>
          </section>

          {(view === "payment" || view === "history") && (
            <section className="account-inline-panel" aria-labelledby="payment-panel-title">
              <h2 id="payment-panel-title">
                {view === "payment" ? "Manage payment method" : "Payment history"}
              </h2>
              <p>
                {view === "payment"
                  ? "Payments are not available in this demo. No card or billing information is needed."
                  : "No payments yet. Your demo account has not been charged."}
              </p>
              <button className="account-button" onClick={() => setParams({})}>
                Done
              </button>
            </section>
          )}

          {view === "cancel" ? (
            <section className="account-inline-panel" aria-labelledby="cancel-title">
              <h2 id="cancel-title">Cancel your demo membership?</h2>
              <p>Your profiles will be kept. This only changes your demo membership status.</p>
              <div className="account-actions">
                <button
                  className="account-button account-button--primary"
                  onClick={() =>
                    save(
                      { ...membership, cancelled: true },
                      "Your demo membership has been cancelled."
                    )
                  }
                >
                  Finish cancellation
                </button>
                <button className="account-button" onClick={() => setParams({})}>
                  Keep membership
                </button>
              </div>
            </section>
          ) : (
            <button
              className="account-button account-membership-action"
              onClick={() =>
                membership.cancelled
                  ? save(
                      { ...membership, cancelled: false },
                      "Your demo membership has restarted."
                    )
                  : open("cancel")
              }
            >
              {membership.cancelled ? "Restart membership" : "Cancel membership"}
            </button>
          )}
        </>
      )}
    </>
  );
}

