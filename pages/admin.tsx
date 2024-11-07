import Main from "../app/components/Main/Main";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Typography,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { getNavBarItems } from "../app/utils/getNavBarItems";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
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
            <TableContainer
              component={Paper}
              style={{
                marginTop: "20px",
                overflowX: isMobile ? "scroll" : "visible",
              }}
            >
              <Table aria-label="users table">
                <TableHead>
                  <TableRow>
                    <TableCell>Användarnamn</TableCell>
                    <TableCell>Antal verk</TableCell>
                    <TableCell>Mejl</TableCell>
                    <TableCell>Namn</TableCell>
                    <TableCell>Skapad</TableCell>
                    <TableCell>Nummer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell component="th" scope="row">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_URL}/profile/@${user.Username}`}
                          target="_self"
                          rel="noopener noreferrer"
                          style={{ fontWeight: "bold" }}
                        >
                          {user.Username}
                        </Link>
                      </TableCell>
                      <TableCell>{user.Artworks}</TableCell>
                      <TableCell>{user.Email}</TableCell>
                      <TableCell>{user.Name}</TableCell>
                      <TableCell>{user.Created.slice(0, 10)}</TableCell>
                      <TableCell>{user?.PhoneNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
      users: users || [],
      ...(await serverSideTranslations(locale, ["header", "footer", "common"])),
    },
  };
}
