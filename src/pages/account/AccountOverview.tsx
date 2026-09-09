import { Link } from "react-router";
import AccountIcon from "../../components/AccountIcon";
import { readMembership } from "./MembershipView";

export default function AccountOverview() {
  const membership = readMembership();

  return (
    <>
      <div className="account-title">
        <h1>Account</h1>
        <p>Membership details</p>
      </div>
      <section className="account-card" aria-label="Membership details">
        <div className="account-ribbon">Demo membership</div>
        <div className="account-card-body">
          <h2>{membership.plan}</h2>
          <p>
            {membership.cancelled
              ? "Membership cancelled"
              : "Enjoy your Myflix demo membership"}
          </p>
        </div>
        <Link className="account-row" to="/account/membership">
          <span>Manage membership</span>
          <AccountIcon type="arrow" />
        </Link>
      </section>
      <section className="account-section">
        <h2>Quick links</h2>
        <div className="account-card">
          <Link className="account-row" to="/account/membership?view=plans">
            <AccountIcon type="membership" />
            <span>Change plan</span>
            <AccountIcon type="arrow" />
          </Link>
          <Link className="account-row" to="/account/membership?view=payment">
            <AccountIcon type="card" />
            <span>Manage payment method</span>
            <AccountIcon type="arrow" />
          </Link>
          <Link className="account-row" to="/account/profiles">
            <AccountIcon type="profiles" />
            <span>Manage profiles</span>
            <AccountIcon type="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}

