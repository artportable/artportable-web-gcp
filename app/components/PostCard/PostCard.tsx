import { Avatar, Box, Card, CardContent, CardHeader, Link } from "@material-ui/core";
import { useTranslation } from "next-i18next";
import { styles } from "./postCard.css"
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { getTimePassed } from "../../hooks/dataFetching/Artworks";

export default function PostCard({ 
    userProfile
}) {

    const s = styles();
    const { t } = useTranslation([""]);
    const data = userProfile?.data;
    const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

    const timePassed = getTimePassed(data?.Published, t);

    return (
        <>
        <Card className={s.cardLayout}>
            <Link href={`/profile/@${data?.Owner.Username}`}>
                <a>
                    <div className={s.cardHeaderContainer}>
                        <CardHeader
                          className={s.cardHeader}
                          avatar={
                            data?.ProfilePicture ? (
                              <Avatar
                                src={`${bucketUrl}${data?.ProfilePicture}`}
                                alt="Profile picture"
                                style={{ height: "40px", width: "40px" }}
                              />
                            ) : (
                              <AccountCircleIcon
                                color="secondary"
                                style={{ fontSize: 48 }}
                              />
                            )
                          }
                          title={`${data?.Owner?.Name} ${data?.Owner?.Surname}`}
                          subheader={
                            <Box>
                              {data?.Owner?.Location && (
                                <span>
                                  {data?.Owner?.Location}
                                  <br />
                                  {timePassed.Time} {timePassed.Unit}
                                </span>
                              )}
                            </Box>
                          }
                        />
                    </div>
                </a>
            </Link>
            <CardContent className={s.cardContent}>
                <Box>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </Box>
            </CardContent>
        </Card>
        </>
    )

}