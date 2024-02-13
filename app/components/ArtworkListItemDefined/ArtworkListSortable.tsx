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
    console.log("useEffect ArtworkListSortable");
    const ids = items ? items.map((item) => item.Id) : [];
    setItemIds(ids);
    setItemIdsOriginal(ids);
  }, items);

  const [isDragging, setIsDragging] = useState(false);

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
        "http://localhost:5001/api/Artworks/updateOrderIndices",
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
          color="red"
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
          color="red"
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
                  />
                );
              }
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  return (
    <div>
      <Typography component="h2" variant={"h2"}>
        {"START"}
      </Typography>
      {items.data &&
        items.data.map((item) => {
          console.log("item", item);

          return <h4>{item.Title}</h4>;
        })}
      <Typography component="h2" variant={"h2"}>
        {"END"}
      </Typography>
    </div>
  );

  function handleDragStart(event) {
    // console.log('handleDragStart', event);
    setIsDragging(true);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    // console.log('handleDragEnd');
    // console.log('active', active);
    // console.log('over', over);

    if (active.id !== over.id) {
      // console.log('UPDAte ORDER');

      setItemIds((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        // console.log('oldIndex', oldIndex);
        // console.log('newIndex', newIndex);

        return arrayMove(items, oldIndex, newIndex);
      });

      setOrderHasChanged(true);
    }
    setIsDragging(false);
    // checkOrderHasChanged()
  }
  /*function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }*/
}
