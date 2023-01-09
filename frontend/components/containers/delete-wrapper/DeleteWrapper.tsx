import SwipeToDelete from 'react-swipe-to-delete-ios';

const DeleteWrapper = ({
  children,
  handleDelete,
  height,
}: {
  children: any;
  handleDelete: () => void;
  height?: number;
}) => {
  return (
    <SwipeToDelete
      onDelete={handleDelete}
      height={height || 80}
      transitionDuration={250}
      deleteWidth={75}
      // deleteColor="linear-gradient(to left, rgb(255, 107, 99), rgb(186, 69, 63))"
      deleteColor="white"
      deleteComponent={<div className="bg-red-300 rounded-lg">Delete</div>}
      deleteText="Delete"
      id="swiper-1"
      className="my-swiper rounded-lg overflow-hidden"
      onDeleteConfirm={(onSuccess: any) => {
        // onSuccess();
        handleDelete();
      }}
    >
      {children}
    </SwipeToDelete>
  );
};

export default DeleteWrapper;
