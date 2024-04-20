"use client";

import { CreateMyFeedListDialog } from "@/features/myFeedLists/components/Dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MyFeedListType } from "@/types/myFeedList";

type FollowDropdownMenuProps = {
  feedId: string;
  myFeedLists: Array<MyFeedListType>;
};

export async function FollowDropdownMenu({
  feedId,
  myFeedLists,
}: FollowDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-emerald-500 font-bold text-emerald-500 hover:text-emerald-600"
        >
          {"FOLLOW"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>{feedId}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {myFeedLists.length &&
          myFeedLists.map((myFeedList) => (
            <div key={`${feedId}-${myFeedList.id}`}>
              <DropdownMenuLabel>{myFeedList.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </div>
          ))}
        <DropdownMenuLabel>
          <CreateMyFeedListDialog />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// const FollowDropdownMenuContent = () => {
//   const { fetchClientMyFeedListAPI } = useMyFeedListAPI();
//   const [myFeedLists, setMyFeedLists] = useState<Array<MyFeedListType>>([]);

//   const fetchMyFeedLists = useCallback(async () => {
//     const res = await fetchClientMyFeedListAPI();
//     setMyFeedLists(res.data.myFeedLists);
//   }, [fetchClientMyFeedListAPI]);

//   useEffect(() => {
//     fetchMyFeedLists();
//   }, [fetchMyFeedLists]);

//   return (
//     <DropdownMenuContent align="end" className="w-[200px]">
//       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//       <DropdownMenuSeparator />

//       <>
//         {myFeedLists.length &&
//           myFeedLists.map((myFeedList) => (
//             <>
//               <DropdownMenuLabel key={myFeedList.id}>
//                 {myFeedList.title}
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//             </>
//           ))}

//         <DropdownMenuLabel>
//           <CreateMyFeedListDialog />
//         </DropdownMenuLabel>
//       </>
//     </DropdownMenuContent>
//   );
// };
