import { TextField, Badge, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { EditDialogSection } from "../EditDialogSection/EditDialogSection";
import Button from "../../Button/Button";
import { useTranslation } from "next-i18next";
import { styles } from "./editExhibitions.css";

import { Exhibition } from "../EditProfileDialog";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { addDays } from "date-fns";
import { v4 } from "uuid";

export const EditExhibitions = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation("profile");

  const deleteExhibition = (exhibition: Exhibition) => {
    const newExhibitions = profile.exhibitions.filter((e) => e !== exhibition);
    setProfile({ ...profile, exhibitions: newExhibitions });
  };

  const addExhibition = () => {
    const exhibitions = profile.exhibitions || [];

    exhibitions.push({
      key: v4(),
      from: new Date(),
      to: addDays(new Date(), 2),
    });
    setProfile({ ...profile, exhibitions });
  };

  const setFrom = (exhibition: Exhibition, newFrom: Date) => {
    exhibition.from = newFrom;
    setProfile({ ...profile });
  };

  const setTo = (exhibition: Exhibition, newTo: Date) => {
    exhibition.to = newTo;
    setProfile({ ...profile });
  };

  const setName = (exhibition: Exhibition, newName: string) => {
    exhibition.name = newName;
    setProfile({ ...profile });
  };

  const setPlace = (exhibition: Exhibition, newPlace: string) => {
    exhibition.place = newPlace;
    setProfile({ ...profile });
  };

  return (
    <EditDialogSection title={t("exhibitions")}>
      {profile?.exhibitions?.map((e, i) => (
        <Badge
          key={e.key}
          overlap="rectangular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          classes={{ root: s.badgeRoot }}
          badgeContent={
            <IconButton aria-label="delete" onClick={() => deleteExhibition(e)}>
              <DeleteIcon color="error" />
            </IconButton>
          }
        >
          <div className={s.exhibitionsContainer}>
            <div className={s.fromToContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  label={t("from")}
                  format="dd/MM/yyyy"
                  value={e.from ? e.from : null}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => setFrom(e, date)}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  label={t("to")}
                  format="dd/MM/yyyy"
                  value={e.to ? e.to : null}
                  minDate={e.from}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => setTo(e, date)}
                />
              </MuiPickersUtilsProvider>
            </div>

            <TextField
              label={t("name")}
              defaultValue={e.name}
              onChange={(event) => setName(e, event.target.value)}
              inputProps={{ maxLength: 140 }}
            />

            <TextField
              label={t("place")}
              defaultValue={e.place}
              onChange={(event) => setPlace(e, event.target.value)}
              inputProps={{ maxLength: 140 }}
            />
          </div>
        </Badge>
      ))}
      <Button
        variant="text"
        color="primary"
        startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
        onClick={() => addExhibition()}
      >
        {t("addExhibition")}
      </Button>
    </EditDialogSection>
  );
};
