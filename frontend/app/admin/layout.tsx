"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Pusher from "pusher-js";

interface AdminNotification {
  id: number; // unique id for stacking
  title: string;
  body: string;
  deep_link: string;
}

let notificationCounter = 0; // for unique IDs

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    let pusher: Pusher | null = null;
    let channel: any = null;
    let canceled = false;

    // ⚠️ IMPORTANT: Please replace this placeholder cluster with your actual Pusher cluster name (e.g., 'mt1', 'us2').
    const PUSHER_APP_KEY = "d5f468bd175c6f0b1ea3";
    const PUSHER_CLUSTER = "dd0133c0def47f34a889"; // 🚨 LIKELY INCORRECT VALUE - MUST BE YOUR CLUSTER
    const ADMIN_CHANNEL_NAME = "admin-notifications";
    const ADMIN_EVENT_NAME = "admin-activity-event";

    try {
      pusher = new Pusher(PUSHER_APP_KEY, {
        cluster: PUSHER_CLUSTER,
        forceTLS: true,
      });

      pusher.connection.bind("connected", () => {
        console.log("Pusher connected for Admin.");
      });

      pusher.connection.bind("error", (err: any) => {
        console.error("Pusher error for Admin:", err);
      });

      channel = pusher.subscribe(ADMIN_CHANNEL_NAME);
      console.log("Subscribed to admin channel:", ADMIN_CHANNEL_NAME);

      channel.bind(ADMIN_EVENT_NAME, (data: any) => {
        console.log("New notification received:", data);
        if (canceled) return;

        const newNotification: AdminNotification = {
          id: notificationCounter++,
          title: data.title,
          body: data.body,
          deep_link: data.deep_link || "#",
        };

        setNotifications((prev) => [newNotification, ...prev]);

        // Auto-remove after 4s using functional state update
        setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((notif) => notif.id !== newNotification.id)
          );
        }, 4000);
      });
    } catch (error) {
      console.error("Failed to initialize Pusher for Admin:", error);
    }

    // Admin authentication check
    axios
      .get("http://localhost:3000/admin/my-profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setLoading(false))
      .catch((err) => {
        if (err.response?.status === 403) {
          alert("Access denied! Only admins can access this page.");
          router.replace("/");
        } else {
          console.error(err);
          router.replace("/login");
        }
      });

    return () => {
      canceled = true;
      if (channel) {
        channel.unbind_all();
        channel.unsubscribe();
      }
      if (pusher) pusher.disconnect();
    };
  }, [router]);

  const currentSection = pathname.split("/").pop() || "dashboard";

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { name: "Users", href: "/admin/users", icon: "👥" },
    { name: "Sellers", href: "/admin/sellers", icon: "🏪" },
    { name: "Products", href: "/admin/products", icon: "📦" },
    { name: "Orders", href: "/admin/orders", icon: "🛒" },
    { name: "Payments", href: "/admin/payments", icon: "💳" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // Using window.location.href to ensure a full page refresh/state clear
    window.location.href = "/login"; 
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200">
      {/* Notifications List (The fixed toast display) */}
      <div className="fixed top-4 right-4 z-[1000] space-y-2 max-w-sm ">
        {notifications.map((notif) => (
          <Link
            key={notif.id}
            href={notif.deep_link}
            className="block bg-white border border-purple-500 p-4 rounded-lg shadow-xl hover:shadow-2xl transition duration-200 cursor-pointer animate-in fade-in slide-in-from-right-10" // Using Tailwind animate-in/out effects
          >
            <p className="font-semibold text-purple-700">{notif.title} 🔔</p>
            <p className="text-sm text-zinc-600">{notif.body}</p>
          </Link>
        ))}
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-black bg-opacity-70">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold text-white">COSMO Admin</h1>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-zinc-700 text-white"
                          : "text-zinc-300 hover:bg-zinc-600 hover:text-white"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-zinc-700 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Logout</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}














// "use client";

// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
// import axios from "axios";
// import Pusher from "pusher-js";

// interface AdminNotification {
//   id: number; // unique id for stacking
//   title: string;
//   body: string;
//   deep_link: string;
// }

// let notificationCounter = 0; // for unique IDs

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [notifications, setNotifications] = useState<AdminNotification[]>([]);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       router.push("/login");
//       return;
//     }




//     let pusher: Pusher | null = null;
//     let channel: any = null;
//     let canceled = false;

//     const PUSHER_APP_KEY = "d5f468bd175c6f0b1ea3";
//     const PUSHER_CLUSTER = "dd0133c0def47f34a889";
//     const ADMIN_CHANNEL_NAME = "admin-notifications";
//     const ADMIN_EVENT_NAME = "admin-activity-event";

//     try {
//       pusher = new Pusher(PUSHER_APP_KEY, {
//         cluster: PUSHER_CLUSTER,
//         forceTLS: true,
//       });

//       pusher.connection.bind("connected", () => {
//         console.log("Pusher connected for Admin.");
//       });

//       pusher.connection.bind("error", (err: any) => {
//         console.error("Pusher error for Admin:", err);
//       });

//       channel = pusher.subscribe(ADMIN_CHANNEL_NAME);
//       console.log("Subscribed to admin channel:", ADMIN_CHANNEL_NAME);

//       channel.bind(ADMIN_EVENT_NAME, (data: any) => {
//         console.log("New notification received:", data);
//         if (canceled) return;

//         const newNotification: AdminNotification = {
//           id: notificationCounter++,
//           title: data.title,
//           body: data.body,
//           deep_link: data.deep_link || "#",
//         };

//         setNotifications((prev) => [newNotification, ...prev]);

//         // Auto-remove after 4s
//         setTimeout(() => {
//           setNotifications((prev) =>
//             prev.filter((notif) => notif.id !== newNotification.id)
//           );
//         }, 4000);
//       });
//     } catch (error) {
//       console.error("Failed to initialize Pusher for Admin:", error);
//     }

//     // Admin authentication check
//     axios
//       .get("http://localhost:3000/admin/my-profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(() => setLoading(false))
//       .catch((err) => {
//         if (err.response?.status === 403) {
//           alert("Access denied! Only admins can access this page.");
//           router.replace("/");
//         } else {
//           console.error(err);
//           router.replace("/login");
//         }
//       });

//     return () => {
//       canceled = true;
//       if (channel) {
//         channel.unbind_all();
//         channel.unsubscribe();
//       }
//       if (pusher) pusher.disconnect();
//     };
//   }, [router]);

//   const currentSection = pathname.split("/").pop() || "dashboard";

//   const navigation = [
//     { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
//     { name: "Users", href: "/admin/users", icon: "👥" },
//     { name: "Sellers", href: "/admin/sellers", icon: "🏪" },
//     { name: "Products", href: "/admin/products", icon: "📦" },
//     { name: "Orders", href: "/admin/orders", icon: "🛒" },
//     { name: "Payments", href: "/admin/payments", icon: "💳" },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     window.location.href = "/login";
//   };

//   if (loading) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200">

//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <div className="hidden md:flex md:w-64 md:flex-col">
//           <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-black bg-opacity-70">
//             <div className="flex items-center flex-shrink-0 px-4">
//               <h1 className="text-2xl font-bold text-white">COSMO Admin</h1>
//             </div>
//             <div className="mt-5 flex-grow flex flex-col">
//               <nav className="flex-1 px-2 pb-4 space-y-1">
//                 {navigation.map((item) => {
//                   const isActive = pathname === item.href;
//                   return (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
//                         isActive
//                           ? "bg-zinc-700 text-white"
//                           : "text-zinc-300 hover:bg-zinc-600 hover:text-white"
//                       }`}
//                     >
//                       <span className="mr-3">{item.icon}</span>
//                       {item.name}
//                     </Link>
//                   );
//                 })}
//               </nav>
//             </div>
//             <div className="flex-shrink-0 flex border-t border-zinc-700 p-4">
//               <button
//                 onClick={handleLogout}
//                 className="flex-shrink-0 w-full group block"
//               >
//                 <div className="flex items-center">
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-white">Logout</p>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex flex-col flex-1 overflow-hidden">
//           <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
//             <div className="max-w-7xl mx-auto">{children}</div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }






























// "use client";

// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Link from 'next/link';

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const currentSection = pathname.split('/').pop() || 'dashboard';

//   const navigation = [
//     { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
//     { name: 'Users', href: '/admin/users', icon: '👥' },
//     { name: 'Sellers', href: '/admin/sellers', icon: '🏪' },
//     { name: 'Products', href: '/admin/products', icon: '📦' },
//     { name: 'Orders', href: '/admin/orders', icon: '🛒' },
//     { name: 'Payments', href: '/admin/payments', icon: '💳' },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     window.location.href = '/login';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200">
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <div className="hidden md:flex md:w-64 md:flex-col">
//           <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-black bg-opacity-70">
//             <div className="flex items-center flex-shrink-0 px-4">
//               <h1 className="text-2xl font-bold text-white">COSMO Admin</h1>
//             </div>
//             <div className="mt-5 flex-grow flex flex-col">
//               <nav className="flex-1 px-2 pb-4 space-y-1">
//                 {navigation.map((item) => {
//                   const isActive = pathname === item.href;
//                   return (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
//                         isActive
//                           ? 'bg-zinc-700 text-white'
//                           : 'text-zinc-300 hover:bg-zinc-600 hover:text-white'
//                       }`}
//                     >
//                       <span className="mr-3">{item.icon}</span>
//                       {item.name}
//                     </Link>
//                   );
//                 })}
//               </nav>
//             </div>
//             <div className="flex-shrink-0 flex border-t border-zinc-700 p-4">
//               <button
//                 onClick={handleLogout}
//                 className="flex-shrink-0 w-full group block"
//               >
//                 <div className="flex items-center">
//                   <div className="ml-3">
//                     <p className="text-sm font-medium text-white">Logout</p>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="flex flex-col flex-1 overflow-hidden">
//           <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
//             <div className="max-w-7xl mx-auto">
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }