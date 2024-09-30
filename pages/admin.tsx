import Main from "../app/components/Main/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Typography, useMediaQuery } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../app/contexts/user-context";

export default function Admin({ navBarItems, users }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { t } = useTranslation(["support"]);
  const { isSignedIn, membership } = useContext(UserContext);

  return (
    <Main navBarItems={navBarItems}>
      {isSignedIn.value && membership.value > 4 && (
        <div>
          <Typography variant={isMobile ? "h4" : "h1"}>
            {t("Portfolio Starter")}
          </Typography>
          {users && users.length > 0 ? (
            <div
              style={{
                marginTop: "20px",
                overflowX: isMobile ? "scroll" : "visible",
              }}
            >
              <table
                style={{
                  marginBottom: "20px",
                  borderCollapse: "collapse",
                  width: "100%",
                  minWidth: isMobile ? "600px" : "auto",
                }}
              >
                <thead>
                  <tr>
                    <th>Användarnamn</th>
                    <th>Mejl</th>
                    <th>Namn</th>
                    <th>Skapad</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.email}
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <td style={{ padding: "8px" }}>
                        <strong>
                          <a
                            href={`${process.env.NEXT_PUBLIC_URL}/profile/@${user.Username}`}
                            target="_self"
                            rel="noopener noreferrer"
                          >
                            {user.Username}
                          </a>
                        </strong>
                      </td>
                      <td style={{ padding: "8px" }}>{user.Email}</td>
                      <td style={{ padding: "8px" }}>{user.Name}</td>
                      <td style={{ padding: "8px" }}>
                        {user.Created.slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Typography variant="body1">{t("No users found.")}</Typography>
          )}
        </div>
      )}
    </Main>
  );
}

export async function getServerSideProps({ locale }) {
  const navBarItems = await getNavBarItems();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Admin/usersByProduct/1`,
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
