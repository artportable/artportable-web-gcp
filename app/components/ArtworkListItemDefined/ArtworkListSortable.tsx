import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Typography } from "@material-ui/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import clsx from "clsx";
import { SortableItem } from "./SortableItem";
import Button from "../../../app/components/Button/Button";
import { styles } from "./artworkListItemDefined.css";

export default function ArtworkListSortable({ items, editAction, t }) {
  const s = styles();
  const router = useRouter();
  const [itemIds, setItemIds] = useState<string[]>([]);
  // Saving original order to be able to reset sort changes.
  const [itemIdsOriginal, setItemIdsOriginal] = useState<string[]>([]);
  const [ordersHasChanged, setOrderHasChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const ids = items ? items.map((item) => item.Id) : [];
    setItemIds(ids);
    setItemIdsOriginal(ids);
  }, items);
  const [isDragging, setIsDragging] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Set distance on PointerSensor so it does not start dragging immediately.
  // Makes onClick on ImageContainerProfile possible.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const saveOrderClicked = async () => {
    setIsSaving(true);

    try {
      const response = await fetch(
        `${apiBaseUrl}/api/Artworks/updateOrderIndices`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            itemIds.map((artworkId, orderIndex) => ({ artworkId, orderIndex }))
          ),
        }
      );

      if (response.ok) {
        setOrderHasChanged(false);
        setItemIdsOriginal(itemIds);
      } else {
        // Handle error here
        console.error("Failed to save order:", response.statusText);
      }
    } catch (err) {
      console.log("Error in saveOrderClicked:", err);
    }

    setIsSaving(false);
  };

  const resetOrder = () => {
    setItemIds(itemIdsOriginal);
    setOrderHasChanged(false);
  };

  return (
    <div>
      <div
        className={clsx(s.sortButtons, {
          [s.sortButtonsHidden]: !ordersHasChanged,
        })}
      >
        <Button
          aria-label="edit"
          className={s.saveSortChangesButton}
          variant="contained"
          rounded
          disabled={!ordersHasChanged || isSaving}
          onClick={() => saveOrderClicked()}
        >
          {t("profile:saveSort")}
        </Button>
        <Button
          aria-label="edit"
          className={s.discardSortChangesButton}
          variant="contained"
          rounded
          disabled={!ordersHasChanged || isSaving}
          onClick={() => resetOrder()}
        >
          {t("profile:resetSort")}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={itemIds} strategy={rectSortingStrategy}>
            {itemIds.map((itemId) => {
              let artwork = items.find((a) => a.Id === itemId);

              if (artwork) {
                return (
                  <SortableItem
                    key={itemId}
                    id={itemId}
                    item={artwork}
                    editAction={editAction}
                    isDragging={isDragging}
                    router={router}
                    dragDisabled={isSaving}
                    isSaving={isSaving}
                    isSorting={ordersHasChanged}
                  />
                );
              }
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  function handleDragStart(event) {
    setIsDragging(true);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItemIds((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });

      setOrderHasChanged(true);
    }
    setIsDragging(false);
  }
}
