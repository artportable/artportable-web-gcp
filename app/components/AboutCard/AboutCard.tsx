import React, { useContext, useEffect, useRef, useState, Fragment } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { styles } from "./aboutCard.css";
import RoomIcon from "@material-ui/icons/Room";
import { useTranslation } from "next-i18next";
import SocialNetworksCard from "../SocialNetworksCard/SocialNetworksCard";
import InspiredByCard from "../InspiredByCard/InspiredByCard";
import { isNullOrUndefined } from "../../utils/util";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function AboutCard({
  data,
  userProfilePicture,
  onUpdateProfilePicture,
  tags,
  isMyProfile,
}) {
  const s = styles();
  const { t } = useTranslation(["profile", "tags"]);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  const fileInput = useRef(null);

  function renderWithLineBreaks(text) {
    return text.split("\n").map((str, index, array) => (
      <Fragment key={index}>
        {str}
        {index === array.length - 1 ? null : <br />}
      </Fragment>
    ));
  }

  const handleFileUpload = (event) => {
    if (isNullOrUndefined(event?.target?.files[0])) {
      return;
    }

    var fr = new FileReader();
    fr.onload = function () {
      var img = new Image();
      img.onload = function () {
        onUpdateProfilePicture(
          event.target.files[0],
          img.width,
          img.height,
          "profile"
        );
      };

      img.src = fr.result.toString(); // is the data URL because called with readAsDataURL
    };
    fr.readAsDataURL(event.target.files[0]);
  };

  return (
    <>
      <div style={{ marginTop: "2vh" }}>
        <div>
          <div
            style={{ display: "flex", marginTop: "20px" }}
            className={s.aboutTextProfilePic}
          >
            {data && (
              <div>
                <div>
                  {data?.ProfilePicture && (
                    <img
                      alt="profile picture"
                      className={s.imgClass}
                      src={`${bucketUrl}${userProfilePicture}`}
                    ></img>
                  )}
                  {!data?.ProfilePicture && (
                    <div className={s.noProfilePic}>
                      <div className={s.noPicBox}>
                        {t("profile:NoProfilePicSet")}
                      </div>
                      {isMyProfile && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px",
                          }}
                        >
                          <button
                            style={{
                              color: "black",
                              border: "1px solid black",
                              borderRadius: "20px",
                              display: "flex",
                              alignItems: "center",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            <div>{t("profile:addProfilePicture")}</div>

                            <input
                              ref={fileInput}
                              onChange={handleFileUpload}
                              type="file"
                              style={{ display: "none" }}
                              multiple={false}
                            />

                            <AddCircleIcon
                              color="primary"
                              onClick={() => fileInput.current.click()}
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {data?.ProfilePicture && (
                    <div
                      className={s.ChangeProfilePicture}
                      onClick={() => fileInput.current.click()}
                    >
                      {isMyProfile && (
                        <div>
                          <button className={s.profilePicBtn}>
                            {t("profile:changeProfilePicture")}

                            <input
                              ref={fileInput}
                              onChange={handleFileUpload}
                              type="file"
                              style={{ display: "none" }}
                              multiple={false}
                            />
                            {isMyProfile && (
                              <AddCircleIcon
                                style={{ margin: "5px" }}
                                color="primary"
                              />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <div className={s.textContainer}>
                      {data?.Title && (
                        <Typography>{`${data?.Title}`}</Typography>
                      )}
                      <div>
                        {/*
                        Headline now displayed in the Hero ProfileNew.tsx
                        {data?.Headline && (
                          <Typography>{`${data?.Headline}`}</Typography>
                        )}
                        */}
                      </div>

                      {data?.City ? (
                        <Typography>
                          {`${data?.Country}, `}
                          {`${data?.State}, `} {`${data?.City}`}
                        </Typography>
                      ) : (
                        <div>
                          {data?.Location ? (
                            <Typography>{`${data?.Location}`}</Typography>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      )}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      {data?.SocialMedia && (
                        <SocialNetworksCard
                          data={data?.SocialMedia}
                        ></SocialNetworksCard>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div style={{ marginLeft: "30px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {!data?.About && (
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    {t("profile:noBioSet")}
                  </p>
                )}
              </div>

              {data?.About && (
                <div className={s.bioText}>
                  <b>
                    {t("profile:aboutArtist")}{" "}
                    <span>
                      {data?.Name} {data?.Surname && data?.Surname}
                    </span>
                    :
                  </b>
                  <Divider></Divider>
                  <br />

                  {renderWithLineBreaks(data?.About)}
                  <Divider style={{ marginTop: "20px" }}></Divider>
                  {data?.InspiredBy && (
                    <InspiredByCard text={data?.InspiredBy}></InspiredByCard>
                  )}
                </div>
              )}
            </div>
          </div>

          {!data?.ProfilePicture && <div className={s.noProfilePic}></div>}
        </div>
        <div></div>
      </div>
    </>
  );
}
