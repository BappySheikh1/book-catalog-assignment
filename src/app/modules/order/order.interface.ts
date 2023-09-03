type OrderedBook = {
  bookId: string;
  quantity: string;
};

export type IOrderPayload = {
  orderedBooks: OrderedBook[];
};
