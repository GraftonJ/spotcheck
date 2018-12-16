
export const avgRating(aComments) {
  if (!aComments.length)
    return 0;

  const sum = aComments.reduce((sum, comment) => sum + comment.rating)
  return sum / aComments.length;
}
