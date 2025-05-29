// export const cadrData = [
//   {
//     title: "CSPM Executive Dashboard",
//     data: [
//       {

import type { CadrData } from "../utils/CategoryTypes";

      
//         subtitle: "111",
//         chartData: {
//           labels: ["Housing", "Food", "Transportation", "Other"],
//           datasets: [
//             {
//               data: [45, 25, 20, 10],
//               backgroundColor: ["#3b82f6", "#14b8a6", "#f97316", "#8b5cf6"],
//               hoverBackgroundColor: [
//                 "#2563eb",
//                 "#0d9488",
//                 "#ea580c",
//                 "#7c3aed",
//               ],
//             },
//           ],
//         },
//       },
//       {
        
//         subtitle: "222",
//         chartData: {
//           labels: ["Work", "Sleep", "Exercise", "Leisure"],
//           datasets: [
//             {
//               data: [40, 30, 10, 20],
//               backgroundColor: ["#34d399", "#60a5fa", "#facc15", "#f472b6"],
//               hoverBackgroundColor: [
//                 "#10b981",
//                 "#3b82f6",
//                 "#eab308",
//                 "#ec4899",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         subtitle: "Name",
//         text: "hello",
//       },

//       //   {
//       //     labels: ["Work", "Sleep", "Exercise", "Leisure"],
//       //     datasets: [
//       //       {
//       //         data: [40, 30, 10, 20],
//       //         backgroundColor: ["#34d399", "#60a5fa", "#facc15", "#f472b6"],
//       //         hoverBackgroundColor: ["#10b981", "#3b82f6", "#eab308", "#ec4899"],
//       //       },
//       //     ],
//       //   },
//     ],
//   },
// ];





export const cadrData:CadrData = {
  categories: [
    {
      id: "cat1",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "wid1",
          widgetName: "Threat Summary",
          widgetText: "This shows threat levels by type.",
          chartData: {
            labels: ["Housing", "Food", "Transportation", "Other"],
            datasets: [
              {
                data: [45, 25, 20, 10],
                backgroundColor: ["#3b82f6", "#14b8a6", "#f97316", "#8b5cf6"],
                hoverBackgroundColor: [
                  "#2563eb",
                  "#0d9488",
                  "#ea580c",
                  "#7c3aed",
                ],
              },
            ],
          },
          isVisible:true
        },
        {
          id: "wid2",
          widgetName: "Compliance Overview",
          widgetText: "Compliance activity breakdown.",
          chartData: {
            labels: ["Work", "Sleep", "Exercise", "Leisure"],
            datasets: [
              {
                data: [40, 30, 10, 20],
                backgroundColor: ["#34d399", "#60a5fa", "#facc15", "#f472b6"],
                hoverBackgroundColor: [
                  "#10b981",
                  "#3b82f6",
                  "#eab308",
                  "#ec4899",
                ],
              },
            ],
          },
          isVisible:true
        },
        {
          id: "wid3",
          widgetName: "General Notes",
          widgetText: "Random insights go here.",
          isVisible:true
        },
        {
          id: "wid4",
          widgetName: "General Notes",
          widgetText: "Random insights go here.",
          isVisible:true
        },
      ],
    },
    {
      id: "cat2",
      name: "Infrastructure Monitoring",
      widgets: [
        {
          id: "wid4",
          widgetName: "CPU Usage",
          widgetText: "Average usage: 65%.",
          isVisible: true
        },
        {
          id: "wid5",
          widgetName: "Memory Status",
          widgetText: "Free memory: 2.1 GB.",
          isVisible: true
        },
        {
          id: "wid6",
          widgetName: "Disk Space",
          widgetText: "90% disk usage on Server A.",
          isVisible:true
        },
      ],
    },
    {
      id: "cat3",
      name: "Network Dashboard",
      widgets: [
        {
          id: "wid7",
          widgetName: "Bandwidth Monitor",
          widgetText: "Shows current bandwidth usage.",
          chartData: {
            labels: ["Download", "Upload"],
            datasets: [
              {
                data: [120, 50],
                backgroundColor: ["#60a5fa", "#f472b6"],
                hoverBackgroundColor: ["#3b82f6", "#ec4899"],
              },
            ],
          },
          isVisible:true
        },
        {
          id: "wid8",
          widgetName: "Packet Loss",
          widgetText: "Packet loss: 0.2%.",
          isVisible:true
        },
      ],
    },
  ],
};
