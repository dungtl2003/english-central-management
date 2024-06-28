// import React, {ReactElement} from "react";
// import {format} from "date-fns";
// import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
// import {ScrollArea} from "@/components/ui/scroll-area";
// import CalendarSession from "./calendar-session";
// import {SessionCalendarData} from "./types";

// interface CalendarTabRightProps {
//     selectedDay: Date;
//     selectedDaySessions: SessionCalendarData[];
// }

// const CalendarTabRight = ({
//     selectedDay,
//     selectedDaySessions,
// }: CalendarTabRightProps): ReactElement => {
//     return (
//         <CardHeader className="col-span-11">
//             <section className="mt-12 md:mt-0">
//                 <div className="flex items-center h-[40px]">
//                     <CardTitle>
//                         Sessions on{" "}
//                         <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
//                             {format(selectedDay, "dd/MM/yyyy")}
//                         </time>
//                     </CardTitle>
//                 </div>
//                 <ScrollArea className="mt-4 space-y-1 h-[340px] text-sm leading-6">
//                     {selectedDaySessions.length > 0 ? (
//                         selectedDaySessions.map((session) => (
//                             <CalendarSession
//                                 session={session}
//                                 key={session.id}
//                             />
//                         ))
//                     ) : (
//                         <CardDescription>
//                             No meetings for today.
//                         </CardDescription>
//                     )}
//                 </ScrollArea>
//             </section>
//         </CardHeader>
//     );
// };

// export default CalendarTabRight;

// Comment vào để push lên
