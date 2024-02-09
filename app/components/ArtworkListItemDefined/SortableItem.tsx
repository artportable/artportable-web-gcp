import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
// import Link from "next/link";
import ImageContainerProfile from './ImageContainerProfile'

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  const { item, editAction, router, isDragging } = props
  // console.log('item sortable', item);
  
  // Don't use CSS.Transform or images change size when dragging.
  // transform: CSS.Transform.toString(transform),
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    // border: '2px solid green',
  };

  // <Link href={`/art/${item.Id}`}>
  // </Link>
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>

      <ImageContainerProfile
        artwork={item}
        editAction={editAction}
        isDragging={isDragging}
        router={router}
        />
    </div>
  );
}