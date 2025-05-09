import { useDeleteReview } from '@/lib/apis/review';

interface ReviewItemProps {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
}

export const ReviewItem = ({ id, content, rating, createdAt }: ReviewItemProps) => {
  const { mutate: deleteReview, isPending } = useDeleteReview(id);

  const handleDelete = () => {
    if (confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
      deleteReview();
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">{'★'.repeat(rating)}</span>
            <span className="text-gray-400 text-sm">{new Date(createdAt).toLocaleDateString()}</span>
          </div>
          <p className="mt-2 text-gray-700">{content}</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </div>
  );
}; 