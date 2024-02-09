import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Typography } from "@material-ui/core"
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  // verticalListSortingStrategy,
  // horizontalListSortingStrategy,
  // rectSwappingStrategy,
} from '@dnd-kit/sortable';
import {SortableItem} from './SortableItem';
import { log } from 'console';

export default function ArtworkListSortable({
  items,
  saveOrder,
  editAction,
}) {
  const router = useRouter();
  const [itemIds, setItemIds] = useState<string[]>([]);
  // Saving original order to check if order has changed.
  const [itemIdsOriginal, setItemIdsOriginal] = useState<string[]>([]);
  const [ordersHasChanged, setOrderHasChanged] = useState(false)
  useEffect(() => {
    console.log('USE EFFECT');
    // setItems(artworks.data.map(artwork => artwork.Id))
    const ids = items.map(item => item.Id)
    setItemIds(ids)
    setItemIdsOriginal(ids)
  }, items)

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
    console.log('saveOrderClicked');
    
    let result = null
    try {
      result = await saveOrder(itemIds, items)
      console.log('saveOrderClicked result:', result);
      setOrderHasChanged(false)
    } catch(err) {
      console.log('Error in saveOrderClicked:', err);
    }
  }

  // const checkOrderHasChanged = () => {
    // if (itemIds.length !== itemIdsOriginal.length) return true
  // }

  // console.log('');
  // console.log('saveOrder', saveOrder);
  // console.log('items', items);
  // items.forEach(item => {
  //   console.log(item.Id);
  // })
  // console.log('itemIds', itemIds);
  // itemIds.forEach(id => {
  //   console.log(id);
  // })

  // const arr = [0,1,2,3,4]
  // const arr2 = arrayMove(arr, 2, 1);
  // console.log('arr', arr);
  // console.log('arr2', arr2);

  return (
    <div>
      <button
        onClick={() => saveOrderClicked()}
        style={{
          // color: ordersHasChanged ? 'red' : 'green',
          marginBottom: "20px",
        }}
        disabled={!ordersHasChanged}
        >Spara ordning</button>
      <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
      }}>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={itemIds}
          strategy={rectSortingStrategy}
        >
          {itemIds.map(itemId => {
            let artwork = items.find(
              (a) => a.Id === itemId
            );
            
            if (artwork) {
              return (
                <SortableItem
                  key={itemId}
                  id={itemId}
                  item={artwork}
                  editAction={editAction}
                  isDragging={isDragging}
                  router={router}
                />
              )
            }
          })}
        </SortableContext>
      </DndContext>
      </div>
      </div>
  );
  

  return (
    <div>
      <Typography component="h2" variant={"h2"}>{'START'}</Typography>
      {items.data && items.data.map(item => {
        console.log('item', item);
        
        return (
          <h4>{item.Title}</h4>
        )
      })}
      <Typography component="h2" variant={"h2"}>{'END'}</Typography>
    </div >
  )

  function handleDragStart(event) {
    // console.log('handleDragStart', event);
    setIsDragging(true)
  }

  function handleDragEnd(event) {
    const {active, over} = event;
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

      setOrderHasChanged(true)
    }
    setIsDragging(false)
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