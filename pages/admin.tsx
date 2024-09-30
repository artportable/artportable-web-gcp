import Main from "../app/components/Main/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styles } from "../styles/support.css";
import { Typography } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";

import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../app/contexts/user-context";

export default function Admin({ navBarItems, users }) {
  const s = styles();
  const { t } = useTranslation(["support"]);

  const {
    username,
    socialId,
    isSignedIn,
    membership,
    email: userEmail,
    given_name,
    family_name,
  } = useContext(UserContext);
  return (
    <Main navBarItems={navBarItems}>
      {isSignedIn.value && membership.value > 4 && (
        <div>
          <h1>{t("Portfolio Starter")}</h1>
          {users && users.length > 0 ? (
            <ul>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th>Användarnamn</th>
                    <th>Mejl</th>
                    <th>Namn</th>
                    <th>Skapad</th>
                  </tr>
                </thead>
                {users.map((user) => (
                  <tr
                    key={user.email}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <td style={{ padding: "8px" }}>
                      <strong>{user.Username}</strong>
                    </td>
                    <td style={{ padding: "8px" }}>{user.Email}</td>
                    <td style={{ padding: "8px" }}>{user.Name}</td>
                    <td style={{ padding: "8px" }}>
                      {user.Created.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </table>
            </ul>
          ) : (
            <Typography variant="body1">No users found.</Typography>
          )}
        </div>
      )}
    </Main>
  );
}

export async function getServerSideProps({ locale }) {
  const navBarItems = await getNavBarItems();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Admin/usersByProduct/1
    `,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const users = await response.json();

  return {
    props: {
      navBarItems: navBarItems,
      users: users || [], // Pass the users as props
      ...(await serverSideTranslations(locale, ["header", "footer", "common"])),
    },
  };
}
