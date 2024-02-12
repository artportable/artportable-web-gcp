import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import ImageContainerProfile from './ImageContainerProfile'

export function SortableItem(props) {
  const { item, editAction, router, isDragging, dragDisabled } = props
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: props.id,
    disabled: dragDisabled,
  });
  
  // Don't use CSS.Transform or images change size when dragging.
  // transform: CSS.Transform.toString(transform),
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

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