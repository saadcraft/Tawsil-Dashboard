"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser, FaShoppingBag } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Notification from "@/components/windows/notification"
import { useNotificationStore, userInformation } from '@/lib/tools/store/web_socket';
import DropDown from "@/components/windows/drop_down"
import { toast } from 'react-toastify';
import { checkInternet } from '../options/useNetwork';
import { PartenaireInformation } from '@/lib/tools/store/pertnerStore';



// type Notification = {
//   id: number;
//   client__username: string;
//   magasin__name: string;
//   total_price: string;
//   status: string;
//   client__phone_number_1: string;
//   created_at: string;
// };

export default function Header({ user, token, mag }: { user: Users, token: string, mag: Magasin | null }) {

  const [show, setShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { notifications, setNotifications, addNotification, removeNotification, setSocket, setIsConnected } = useNotificationStore();

  const { setUser } = userInformation()
  const { setPertner } = PartenaireInformation()

  useEffect(() => {
    // Initialize Zustand store with user data
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);


  useEffect(() => {
    if (!token || user?.role !== "partener") return; // Ensure token exists before establishing WebSocket connection
    if (mag) {
      setPertner(mag.owner)
    }
    const audio = new Audio("/notification2.mp3");
    let socket: WebSocket; // Declare it in the parent scope
    let reconnectTimeout: NodeJS.Timeout;
    let connectivityInterval: NodeJS.Timeout;
    let loadingToastId: string | number | null = null;
    // Create a new WebSocket connection
    const connectWebSocket = () => {
      socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS_SERVER}/ws/commandes/magasin/?token=${token}`);

      setSocket(socket);

      // Handle WebSocket connection open event
      socket.onopen = () => {
        console.log("✅ Connected to WebSocket server");

        if (loadingToastId) {
          toast.update(loadingToastId, {
            render: "Connexion réussie",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
            onClose: () => {
              // ✅ Clean up after it's actually closed
              loadingToastId = null;
            },
          });
        }

        // ✅ Start connectivity check every 20 seconds
        connectivityInterval = setInterval(async () => {
          const isOnline = await checkInternet();
          if (!isOnline) {
            socket.close(); // triggers onclose and reconnect
            console.warn("❌ No internet connection, closing socket...");
          }
        }, 20000); // every 20 seconds
      };

      // Handle WebSocket message event
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log(data)

        if (Array.isArray(data.message)) {
          setNotifications(data.message);
        } else {
          if (data.message?.status === "pending") {
            audio.play();
            toast(`Nouvelle commande reçue`, {
              autoClose: 4000,
              closeButton: true,
            });
            addNotification(data.message);
          } else {
            if (data.message) removeNotification(data.message.id)
          }

        }
      };

      // Handle WebSocket error event
      socket.onerror = () => {
        console.warn("❌ WebSocket error");
      };

      // Handle WebSocket close event
      socket.onclose = () => {
        console.warn("🔌 Disconnected from WebSocket. Reconnecting...");
        if (!loadingToastId) {
          loadingToastId = toast.loading("Reconnexion ...", {
            position: "top-center",
            hideProgressBar: true,
          });
        }
        clearInterval(connectivityInterval);
        reconnectTimeout = setTimeout(connectWebSocket, 5000);
        setIsConnected(false)
      };
    }

    connectWebSocket();
    // Cleanup when the component unmounts
    return () => {
      clearTimeout(reconnectTimeout);
      clearInterval(connectivityInterval);
      socket.close();
      console.log("WebSocket disconnected on cleanup");
    };
  }, [token, addNotification, setSocket, setNotifications, removeNotification, setIsConnected]);


  return (
    <header className={`fixed top-0 z-30 w-full bg-white  bg-gradient-to-r ${user?.type_account === "premium" ? "from-gold5 via-gold2 to-gold5" : "from-primer to-second"} shadow-md`}>
      <div className="py-2 px-4 text-white mx-auto flex justify-between items-center">
        <Image src="/tawsil.png" className="w-16 ml-10 cursor-pointer" alt="Tawsil" width={100} height={100} />
        <div className='flex items-center gap-2'>
          {user && user.role === "partener" ?
            <button
              className="relative dropdown-toggle flex items-center justify-center text-white transition-colors border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100"
              onClick={() => setShow(true)}
            >
              {notifications.length > 0 &&
                <p className='absolute rounded-full text-sm bg-red-600 w-5 h-5 text-center -top-1.5 text-white -right-1.5'>{notifications.length}</p>
              }
              <span className={`${notifications.length > 0 && "absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"}`}></span>
              <FaShoppingBag />
            </button>
            : ""
          }
          {user ?
            <button
              onClick={() => setIsOpen(pre => !pre)}
              className="flex items-center text-gray-200"
            >
              <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
                <Image
                  width={44}
                  height={44}
                  src={user.image_url ? `${process.env.NEXT_PUBLIC_IMGS_DOMAIN}${user.image_url}` : "/placeholder.svg"}
                  alt="User"
                  className='object-cover h-full'
                />
              </span>

              <span className="block mr-1 md:max-w-32 max-w-20 overflow-hidden line-clamp-1 font-medium text-nowrap">{user.username}</span>

              <MdKeyboardArrowDown className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            : <Link href="/login" className='px-5 py-2 rounded-md flex gap-2 items-center'><FaRegUser className='text-xl' />Compte</Link>}
        </div>
      </div>
      {show &&
        <div>
          <div onClick={() => setShow(false)} className='absolute w-full h-screen top-0 bottom-0 right-0 left-0'></div>
          <div className='absolute z-40 top-16 p-2 md:right-32'>
            <Notification not={notifications} onsub={setShow} />
          </div>
        </div>
      }
      {isOpen &&
        <div>
          <div onClick={() => setIsOpen(false)} className='absolute w-full h-screen top-0 bottom-0 right-0 left-0'></div>
          <div className='absolute z-40 top-16 p-2 right-2'>
            <DropDown onClose={setIsOpen} />
          </div>
        </div>
      }
    </header>
  )
}
