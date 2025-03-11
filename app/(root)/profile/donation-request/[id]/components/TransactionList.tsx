"use client";

import { useUpdatePaymentStatusMutation } from "@/services/query/userQuery";
import { TransactionCard } from "./TransactionCard";
import { PaymentStatus } from "@/constants/enums";
import { TransactionType } from "@/models/schema";
// import InfiniteScroll from "@/components/ui/infinite-scroll";

export default function TransactionList({
  donations,
  causeId,
}: {
  donations: TransactionType[];
  causeId: string;
}) {
  const { mutate: updateStatus } = useUpdatePaymentStatusMutation();
  // const groupedDonations =
  //   !!donations &&
  //   donations
  //     ?.transactions!.sort(
  //       (a, b) =>
  //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //     )
  //     .reduce((acc, donation) => {
  //       const date = formatDate(new Date(donation.createdAt));
  //       if (!acc[date]) {
  //         acc[date] = [];
  //       }
  //       acc[date].push(donation);
  //       return acc;
  //     }, {} as Record<string, typeof donations>);

  // console.log(groupedDonations);
  console.log({ donations });

  const onClickAction = (donationId: string, status: PaymentStatus) => {
    console.log(donationId);
    updateStatus({
      causeId,
      donationId,
      status,
    });
  };
  return (
    <section className="flex flex-col gap-y-5 mx-3 sm:mx-auto !max-w-screen-sm  ">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-gray-500">No Donations yet</p>
      </div>
      <div className="flex flex-col gap-5   ">
        {donations?.map((donation) => (
          <TransactionCard
            key={donation.id}
            donation={donation}
            onClickAction={onClickAction}
          />
        ))}
      </div>
    </section>
  );
}

{
  /* {Object.entries(groupedDonations).map(([date, donations]) => (
  <div key={date} className="flex flex-col gap-y-3 rounded-2xl p-4">
    <h3 className="font-bold text-gray-600">
      {date === formatDate(new Date())
        ? "Today"
        : date ===
          formatDate(
            new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
          )
        ? "Yesterday"
        : date}
    </h3>
  </div>
))} */
}
{
  /* <InfiniteScroll
hasMore={true}
isLoading={false}
next={() => {}}
threshold={1}
>
{hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin mx-auto" />}
</InfiniteScroll> */
}
// const InfiniteScrollDemo = () => {
//   const [page, setPage] = React.useState(0);
//   const [loading, setLoading] = React.useState(false);
//   const [hasMore, setHasMore] = React.useState(true);
//   const [products, setProducts] = React.useState<DummyProduct[]>([]);

//   const next = async () => {
//     setLoading(true);

//     /**
//      * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
//      * In your app, you can remove this setTimeout.
//      **/
//     setTimeout(async () => {
//       const res = await fetch(
//         `https://dummyjson.com/products?limit=3&skip=${
//           3 * page
//         }&select=title,price`
//       );
//       const data = (await res.json()) as DummyProductResponse;
//       setProducts((prev) => [...prev, ...data.products]);
//       setPage((prev) => prev + 1);

//       // Usually your response will tell you if there is no more data.
//       if (data.products.length < 3) {
//         setHasMore(false);
//       }
//       setLoading(false);
//     }, 800);
//   };
//   return (
//     <div className="max-h-[300px] w-full  overflow-y-auto px-10">
//       <div className="flex w-full flex-col items-center  gap-3">
//         {products.map((product) => (
//           <Product key={product.id} product={product} />
//         ))}
//         <InfiniteScroll
//           hasMore={hasMore}
//           isLoading={loading}
//           next={next}
//           threshold={1}
//         >
//           {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// };

// export default InfiniteScrollDemo;
