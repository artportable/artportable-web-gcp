import { TextField, Badge, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import { EditDialogSection } from "../EditDialogSection/EditDialogSection";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Button from "../../Button/Button";
import { useTranslation } from "next-i18next";
import { styles } from "./editEducation.css";
import { Education } from "../EditProfileDialog";
import { subYears } from "date-fns";
import { v4 } from "uuid";

export const EditEducation = ({ profile, setProfile }) => {
  const s = styles();
  const { t } = useTranslation("profile");

  const deleteEducation = (education: Education) => {
    const newEducations = profile.educations.filter((e) => e !== education);
    setProfile({ ...profile, educations: newEducations });
  };

  const addEducation = () => {
    const educations = profile.educations || [];
    educations.push({ key: v4() });
    setProfile({ ...profile, educations });
  };

  const setFrom = (education: Education, newFrom: Date) => {
    education.from = newFrom?.getFullYear();
    setProfile({ ...profile });
  };

  const setTo = (education: Education, newTo: Date) => {
    education.to = newTo?.getFullYear();
    setProfile({ ...profile });
  };

  const setName = (education: Education, newName: string) => {
    education.name = newName;
    setProfile({ ...profile });
  };

  return (
    <EditDialogSection title={t("education")}>
      {profile?.educations?.map((e, i) => (
        <Badge
          key={e.key}
          overlap="rectangular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          classes={{ root: s.badgeRoot }}
          badgeContent={
            <IconButton aria-label="delete" onClick={() => deleteEducation(e)}>
              <DeleteIcon color="error" />
            </IconButton>
          }
        >
          <div className={s.educationContainer}>
            <div className={s.fromToContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  label={t("from")}
                  views={["year"]}
                  minDate={subYears(new Date(), 70)}
                  maxDate={subYears(new Date(), 0)}
                  value={e.from ? new Date(e.from, 0, 1) : null}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => setFrom(e, date)}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  label={t("to")}
                  views={["year"]}
                  value={e.to ? new Date(e.to, 0, 1) : null}
                  minDate={new Date(e.from, 0, 1)}
                  maxDate={subYears(new Date(), -10)}
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) => setTo(e, date)}
                />
              </MuiPickersUtilsProvider>
            </div>

            <TextField
              label={t("education")}
              defaultValue={e.name}
              onChange={(event) => setName(e, event.target.value)}
              inputProps={{ maxLength: 140 }}
              helperText={t("maxLength")}
            />
          </div>
        </Badge>
      ))}
      <Button
        variant="text"
        color="primary"
        startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
        onClick={() => addEducation()}
      >
        {t("addEducation")}
      </Button>
    </EditDialogSection>
  );
};
