import Image from "next/image";
// import Link from "next/link";
import { i18n, useTranslation } from "next-i18next";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import BrushSharpIcon from "@mui/icons-material/BrushSharp";
import clsx from "clsx";
import Button from "../Button/Button";
import TagChip from "../TagChip/TagChip";
import { getPriceFormatter } from "../../utils/formatUtils";
import { styles } from "./artworkListItemDefined.css";
import { profileStyles } from "../../../styles/[username]";
import ArtworkListItemDefinedSkeleton from "../../../app/components/ArtworkListItemDefinedSkeleton/ArtworkListItemDefinedSkeleton";

export default function ImageContainerProfile({
  artwork,
  editAction,
  isDragging,
  router,
  isSaving,
  isSorting,
}) {
  const s = styles();
  const ps = profileStyles();
  
  const { t } = useTranslation(["art", "common"]);
  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_URL;
  const languageCode = i18n.language;
  const priceFormatter = getPriceFormatter(artwork, languageCode)
  const formattedPrice = priceFormatter.format(artwork.Price);

  const topActions = editAction ? (
    <Button
      aria-label="edit"
      className={ps.editButton}
      variant="contained"
      rounded
      disabled={isSaving}
      onClick={() =>
        editAction(artwork)
      }
      startIcon={<BrushSharpIcon />}
    ></Button>
  ) : null

  // Putting Link around SortableItem does not work, use click instead.
  const cardClicked = (evt) => {
    // If order has changed (isSorting), don't let users click on a card. They will go to that artworks page
    // and when they return to sorting page the sort order has been reset.
    if (!isSaving && !isSorting) {
      router.push(`/art/${artwork.Id}`)
    }
  }

  return (
    <div className={clsx(s.sortableImageContainer, {
      [s.sortIsSaving]: isSaving,
    })}>
      <div
        className={s.sortableImageContent}
        onClick={cardClicked}>
        <img
          width={artwork.PrimaryFile.Width}
          height={artwork.PrimaryFile.Height}
          alt={'Title'}
          key={1}
          src={`${bucketUrl}${artwork.PrimaryFile.Name}`}
          className={s.sortableImage}
          style={{
            opacity: !isSaving ? 1 : 0,
          }}
        />
        <div className={clsx(s.infoHover, {
          'is-dragging': isDragging,
        })}>
          <div className={s.infoWrapper}>
            <div className={s.titleHover}>
              {artwork.Title ? artwork.Title : t("untitled")}
            </div>
            <div className={s.priceHover}>
              {artwork.SoldOut ? (
                <>
                  <div />
                  {t("common:words.sold")}{" "}
                </>
              ) : artwork.Price && artwork.Price !== "0" ? (
                formattedPrice.replace(/,/g, "")
              ) : (
                t("priceOnRequest")
              )}
            </div>
            <EastOutlinedIcon style={{ marginBottom: "12px" }} />
          </div>
          <div className={s.tagsWrapper}>
            {Array.from(artwork.Tags)
              .slice(
                0,
                artwork.Tags.some((tag) => tag.length > 8) ? 2 : 4
              )
              .map((tag: string) => (
                <TagChip
                  key={tag}
                  title={tag}
                  onChipClick={null}
                  limitReached
                  variant="outlined"
                  isSmall
                />
              ))}
          </div>
        </div>
        { isSaving &&
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
            <ArtworkListItemDefinedSkeleton grow={1} />
          </div>
        }
      </div>
      <div className={s.desktopEditButton}>
        {topActions && (
          <div className={s.likeButton}>
            <div>{topActions}</div>
          </div>
        )}
      </div>
    </div>
  )
}